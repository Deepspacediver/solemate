import {ZodError} from "zod";

const getAllMessagesFromZod = (errorIssues) => {
    return errorIssues.map((issue) => issue.message).join(', ');
};

const zodMiddleware = (err, req, res, _next) => {
    if (err instanceof ZodError) {
        const messages = getAllMessagesFromZod(err.issues);
        return res.status(400).json({error: messages});

    }
    if (err instanceof Error) {
        return res.status(err.statusCode ?? 400).json({
            error: err.message
        });
    }
    return res.status(500).json({error: 'Internal Server Error'});
};

export default zodMiddleware;