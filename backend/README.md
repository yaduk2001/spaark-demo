# NFT Backend

This is the backend for the NFT Marketplace, built with Node.js and Express.

## Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file based on `.env.example`:
    ```bash
    cp .env.example .env
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```

## Environment Variables

- `PORT`: The port on which the server will run (default: 5000).
- `NODE_ENV`: The environment (development/production).

## API Endpoints

- `GET /api/health`: Check if the server is up.
- `GET /api/nfts`: Get a list of sample NFTs.
