"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const logger = winston_1.default.createLogger({
    level: 'info',
    transports: [
        new winston_1.default.transports.File({ filename: `${app_root_path_1.default}/logs/app.log` }),
    ],
});
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.simple(),
    }));
}
exports.default = logger;
