const nodemailer = require('nodemailer');

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
};

// Send password reset email
const sendPasswordResetEmail = async (email, resetToken, fullName) => {
    const transporter = createTransporter();
    
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    
    const mailOptions = {
        from: `"Spaark Support" <${process.env.SMTP_USER}>`,
        to: email,
        subject: '🔐 Password Reset Request - Spaark',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; background-color: #080808; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                    <!-- Header -->
                    <div style="text-align: center; margin-bottom: 40px;">
                        <h1 style="color: #ffffff; font-size: 32px; font-weight: 800; margin: 0; letter-spacing: -1px;">
                            SPAARK
                        </h1>
                        <p style="color: #8b5cf6; font-size: 12px; text-transform: uppercase; letter-spacing: 3px; margin-top: 8px;">
                            Founders Circle
                        </p>
                    </div>
                    
                    <!-- Main Card -->
                    <div style="background: linear-gradient(145deg, rgba(20,20,20,1) 0%, rgba(10,10,10,1) 100%); border: 1px solid rgba(139, 92, 246, 0.2); border-radius: 20px; padding: 40px; box-shadow: 0 20px 60px rgba(0,0,0,0.5);">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <div style="display: inline-block; padding: 16px; background: rgba(139, 92, 246, 0.1); border-radius: 16px; border: 1px solid rgba(139, 92, 246, 0.2);">
                                <span style="font-size: 40px;">🔐</span>
                            </div>
                        </div>
                        
                        <h2 style="color: #ffffff; font-size: 24px; font-weight: 700; text-align: center; margin: 0 0 16px 0;">
                            Password Reset Request
                        </h2>
                        
                        <p style="color: #a1a1aa; font-size: 14px; line-height: 1.6; text-align: center; margin: 0 0 30px 0;">
                            Hey ${fullName || 'there'},<br><br>
                            We received a request to reset your password. Click the button below to create a new password. This link will expire in <strong style="color: #8b5cf6;">1 hour</strong>.
                        </p>
                        
                        <!-- CTA Button -->
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${resetUrl}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; border-radius: 12px; box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);">
                                Reset Password
                            </a>
                        </div>
                        
                        <!-- Alternative Link -->
                        <p style="color: #71717a; font-size: 12px; text-align: center; margin: 20px 0; word-break: break-all;">
                            Or copy this link:<br>
                            <a href="${resetUrl}" style="color: #8b5cf6; text-decoration: none;">${resetUrl}</a>
                        </p>
                        
                        <!-- Warning -->
                        <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 12px; padding: 16px; margin-top: 30px;">
                            <p style="color: #fca5a5; font-size: 12px; margin: 0; text-align: center;">
                                ⚠️ If you didn't request this, please ignore this email. Your password will remain unchanged.
                            </p>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div style="text-align: center; margin-top: 40px;">
                        <p style="color: #52525b; font-size: 11px; margin: 0;">
                            © 2026 Spaark. All rights reserved.
                        </p>
                        <p style="color: #3f3f46; font-size: 10px; margin-top: 8px; text-transform: uppercase; letter-spacing: 1px;">
                            This is an automated message. Please do not reply.
                        </p>
                    </div>
                </div>
            </body>
            </html>
        `
    };
    
    return transporter.sendMail(mailOptions);
};

// Send password changed confirmation email
const sendPasswordChangedEmail = async (email, fullName) => {
    const transporter = createTransporter();
    
    const mailOptions = {
        from: `"Spaark Support" <${process.env.SMTP_USER}>`,
        to: email,
        subject: '✅ Password Changed Successfully - Spaark',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; background-color: #080808; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                    <!-- Header -->
                    <div style="text-align: center; margin-bottom: 40px;">
                        <h1 style="color: #ffffff; font-size: 32px; font-weight: 800; margin: 0; letter-spacing: -1px;">
                            SPAARK
                        </h1>
                        <p style="color: #8b5cf6; font-size: 12px; text-transform: uppercase; letter-spacing: 3px; margin-top: 8px;">
                            Founders Circle
                        </p>
                    </div>
                    
                    <!-- Main Card -->
                    <div style="background: linear-gradient(145deg, rgba(20,20,20,1) 0%, rgba(10,10,10,1) 100%); border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 20px; padding: 40px; box-shadow: 0 20px 60px rgba(0,0,0,0.5);">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <div style="display: inline-block; padding: 16px; background: rgba(34, 197, 94, 0.1); border-radius: 16px; border: 1px solid rgba(34, 197, 94, 0.2);">
                                <span style="font-size: 40px;">✅</span>
                            </div>
                        </div>
                        
                        <h2 style="color: #ffffff; font-size: 24px; font-weight: 700; text-align: center; margin: 0 0 16px 0;">
                            Password Changed Successfully
                        </h2>
                        
                        <p style="color: #a1a1aa; font-size: 14px; line-height: 1.6; text-align: center; margin: 0 0 30px 0;">
                            Hey ${fullName || 'there'},<br><br>
                            Your password has been changed successfully. You can now log in with your new password.
                        </p>
                        
                        <!-- Warning -->
                        <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 12px; padding: 16px; margin-top: 30px;">
                            <p style="color: #fca5a5; font-size: 12px; margin: 0; text-align: center;">
                                ⚠️ If you didn't make this change, please contact support immediately.
                            </p>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div style="text-align: center; margin-top: 40px;">
                        <p style="color: #52525b; font-size: 11px; margin: 0;">
                            © 2026 Spaark. All rights reserved.
                        </p>
                    </div>
                </div>
            </body>
            </html>
        `
    };
    
    return transporter.sendMail(mailOptions);
};

module.exports = {
    sendPasswordResetEmail,
    sendPasswordChangedEmail
};
