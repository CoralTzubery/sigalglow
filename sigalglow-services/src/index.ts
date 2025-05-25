import app from "./app";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL!;

mongoose.connect(MONGO_URL).then(() => {
  console.log("✅ Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
