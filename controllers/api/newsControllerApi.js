import env from "dotenv/config";

import { catchAsync } from "../../utils/catchAsync.js";
import { getNewsBreaker } from "../../services/newsService.js";

export const getNews = catchAsync(async (req, res) => {
    const resNews = await getNewsBreaker(req.query.size);

    return res.status(200).json({
        success: true,
        message: "Data news fetched successfully",
        data: resNews
    })
})