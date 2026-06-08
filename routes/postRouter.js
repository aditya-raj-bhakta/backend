import express from 'express';
import postController from '../controller/posts/postController.js';

const postRouter = express.Router();
postRouter.get("/", postController);
export { postRouter };
