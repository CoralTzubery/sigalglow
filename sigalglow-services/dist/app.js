"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./auth");
const about_route_1 = require("./routers/about.route");
const appointment_route_1 = require("./routers/appointment.route");
const review_route_1 = require("./routers/review.route");
const contact_route_1 = require("./routers/contact.route");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
exports.app.use((req, _, next) => {
    console.log(new Date(), req.method, req.url);
    next();
});
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.static("public"));
(0, auth_1.useAuth)(exports.app);
exports.app.use("/api/about", about_route_1.router);
exports.app.use("/api/appointments", appointment_route_1.router);
exports.app.use("/api/reviews", review_route_1.router);
exports.app.use("/api/contact", contact_route_1.router);
