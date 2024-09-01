export const parseRequestZod = (schema, req) => {
    console.log(req.params);
    schema.parse({
        body: req.body,
        params: req.params,
        query: req.query
    });
};

