import {Router} from 'express';
import * as shoeController from '../controllers/shoe-controller.js';

const shoeRouter = new Router();

shoeRouter.route('/:shoeId').get(shoeController.shoeByIdGet).put(
    shoeController.shoeUpdatePut).delete(
    shoeController.shoeRemoveDelete);


shoeRouter.route('/').get(shoeController.shoesGet).post(
    shoeController.shoeCreatePost);
export default shoeRouter;