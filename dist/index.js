"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const twitter_1 = require("./app/routes/twitter");
const app = (0, express_1.default)();
const port = 3005;
app.use(express_1.default.json());
app.use(twitter_1.accountRouter);
app.use(twitter_1.postRouter);
app.use(twitter_1.followRouter);
app.use(twitter_1.spaceRouteur);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map