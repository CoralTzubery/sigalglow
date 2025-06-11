"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const http_1 = require("http");
const app_1 = require("./app");
const mongoose_1 = __importDefault(require("mongoose"));
const server = (0, http_1.createServer)(app_1.app);
const port = process.env.PORT || 300;
async function init() {
    try {
        await mongoose_1.default.connect(process.env.CONNECTION_STRING, {
            dbName: process.env.DB_NAME,
        });
        server.listen(port, () => {
            console.log(`🚀 Server running on http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}
init();
