"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.About = void 0;
const mongoose_1 = require("mongoose");
const AboutSchema = new mongoose_1.Schema({
    id: String,
    title: String,
    content: String,
});
exports.About = (0, mongoose_1.model)("About", AboutSchema);
