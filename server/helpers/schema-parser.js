export const parseRequestZod = (schema, req) => {
    schema.parse({
        body: req.body,
        params: req.params,
        query: req.query
    });
};

