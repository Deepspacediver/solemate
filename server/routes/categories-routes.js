import {Router} from 'express';
import * as categoriesController
    from "../controllers/categories-controllers.js";


const categoriesRouter = new Router();

categoriesRouter.get('/', categoriesController.categoriesGet)
    .post(
        '/category/add', categoriesController.categoryCreatePost)
    .put(
        '/:categoryId', categoriesController.categoryUpdatePost)
    .get(
        '/:categoryId', categoriesController.shoesWithCategoryGet)
    .get('/categoryless/list', categoriesController.shoesWithoutCategoriesGet)
    .delete(
        '/:categoryId',
        categoriesController.categoryRemoveDelete);


export default categoriesRouter;