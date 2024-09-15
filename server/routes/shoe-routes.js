import {Router} from 'express';
import * as shoeController from '../controllers/shoe-controller.js';

const shoeRouter = new Router();

shoeRouter.route('/:shoeId').get(shoeController.shoeGet).put(
    shoeController.shoeUpdatePut).delete(
    shoeController.shoeRemoveDelete);


shoeRouter.post('/', shoeController.shoeCreatePost);
export default shoeRouter;