export const apiErrorHandler = (err, req, res, next) => {
    if (!req.originalUrl.startsWith("/api")) return next(err);
    if (res.headersSent) return next(err);

    if (err.isAxiosError) {
        return res.status(err.response?.status || 500).json({
            success: false, 
            message: err.response?.data?.message || "External API error"
        })
    }
    
    return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
}