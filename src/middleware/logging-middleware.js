export default function loggingMiddleware() {
    return next => action => {
        const { type, data, meta } = action;
        if (process.env.NODE_ENV === 'development') {
            console.log({
                type,
                ...data,
                ...meta,
            });
        }

        next(action);
    };
}
