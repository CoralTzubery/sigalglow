import "dotenv/config";

import { createServer } from "http";
import { app } from "./app";
import mongoose from "mongoose";

const server = createServer(app);
const port = process.env.PORT || 300;

async function init() {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING!, {
      dbName: process.env.DB_NAME,
    });

    server.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    }); 
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

init();




// const PORT = process.env.PORT || 3000;
// const MONGO_URL = process.env.MONGO_URL!;

// mongoose.connect(MONGO_URL).then(() => {
//   console.log("✅ Connected to MongoDB");
//   app.listen(PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);
//   });
// });
