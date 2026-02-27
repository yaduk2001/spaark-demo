import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!, { bufferCommands: false }).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export async function GET() {
  try {
    await dbConnect();
    const db = mongoose.connection.db;

    if (!db) throw new Error("Database connection failed");

    // 1. Check for manual override in 'settings' collection
    let manualOverride = null;
    try {
      const settingsDoc = await db.collection('settings').findOne({ _id: 'manualUserCount' as any });
      if (settingsDoc && typeof settingsDoc.count === 'number') {
        manualOverride = settingsDoc.count;
      }
    } catch (err) {
      console.warn("Failed to check settings collection for manual user count override. It might not exist yet.");
    }

    if (manualOverride !== null) {
      return NextResponse.json({ count: manualOverride, isManual: true }, { status: 200 });
    }

    // 2. Fallback to actual users count
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);

    if (!collectionNames.includes('users')) {
      console.error("ERROR: 'users' collection not found! Is the DB name correct?");
      return NextResponse.json({ count: 0 }, { status: 200 });
    }

    const count = await db.collection('users').countDocuments();
    return NextResponse.json({ count: count, isManual: false }, { status: 200 });
  } catch (error: any) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Allow admin to set or remove manual count override
export async function POST(req: Request) {
  try {
    await dbConnect();
    const db = mongoose.connection.db;
    if (!db) throw new Error("Database connection failed");

    const body = await req.json();
    const { count, action } = body;

    if (action === "set") {
      if (typeof count !== 'number' || count < 0) {
        return NextResponse.json({ error: "Invalid count value" }, { status: 400 });
      }
      await db.collection('settings').updateOne(
        { _id: 'manualUserCount' as any },
        { $set: { count: count, updatedAt: new Date() } },
        { upsert: true }
      );
      return NextResponse.json({ message: "Manual count updated successfully", count }, { status: 200 });
    } else if (action === "reset") {
      await db.collection('settings').deleteOne({ _id: 'manualUserCount' as any });
      return NextResponse.json({ message: "Manual count override removed" }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

  } catch (error: any) {
    console.error("Admin Settings Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
