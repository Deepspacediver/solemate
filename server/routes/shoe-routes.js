import {Router} from 'express';
import * as shoeController from '../controllers/shoe-controller.js';

const shoeRouter = new Router();

shoeRouter.route('/:shoeId').get(shoeController.shoeGet).post(
    shoeController.shoeCreatePost).put(shoeController.shoeUpdatePut).delete(
    shoeController.shoeRemoveDelete);

export default shoeRouter;