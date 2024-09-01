import {Router} from 'express';
import * as categoriesController
    from "../controllers/categories-controllers.js";

const categoriesRouter = new Router();

categoriesRouter.get('/', categoriesController.categoriesGet)
    .post(
        '/:categoryId', categoriesController.categoryCreatePost)
    .put(
        '/:categoryId', categoriesController.categoryUpdatePost)
    .get(
        '/:categoryId', categoriesController.shoesWithCategoryGet)
    .delete(
        '/:categoryId',
        categoriesController.categoryRemoveDelete);


export default categoriesRouter;