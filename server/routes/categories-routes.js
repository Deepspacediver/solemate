import {Router} from 'express';
import * as categoriesController
    from "../controllers/categories-controllers.js";

const categoriesRouter = new Router();

categoriesRouter.get('/', categoriesController.categoriesGet);

categoriesRouter.post('/:categoryId', categoriesController.categoryUpdatePost);


export default categoriesRouter;