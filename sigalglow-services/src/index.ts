import "dotenv/config";

import { createServer } from "http";
import { app } from "./app";
import mongoose from "mongoose";

const server = createServer(app);
const port = Number(process.env.PORT || 300);

async function init() {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING!, {
      dbName: process.env.DB_NAME,
    });

    server.listen(port, '0.0.0.0' ,() => {
      console.log(`🚀 Server running on port ${port}`);
    }); 
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

init();