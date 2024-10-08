import {Router} from 'express';
import * as categoriesController
    from "../controllers/categories-controllers.js";


const categoriesRouter = new Router();

categoriesRouter.get('/', categoriesController.categoriesGet)
    .post(
        '/category/add', categoriesController.categoryCreatePost)
    .put(
        '/:categoryId', categoriesController.categoryUpdatePost).get(
    '/category-data/:categoryId', categoriesController.categoryGet)
    .get(
        '/:categoryId', categoriesController.shoesWithCategoryGet)
    .get('/categoryless/list',
        categoriesController.shoesWithoutCategoriesGet).get(
    '/category-with-shoes/:categoryId',
    categoriesController.categoryWithShoesGet)
    .delete(
        '/:categoryId',
        categoriesController.categoryRemoveDelete);


export default categoriesRouter;