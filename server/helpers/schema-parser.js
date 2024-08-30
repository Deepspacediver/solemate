import {z, ZodError} from 'zod';
import {BadRequestError} from "../partials/custom-error.js";


export const zParse = (schema, req) => {
    schema.parse({
        body: req.body,
        params: req.params,
        query: req.query
    });
};

