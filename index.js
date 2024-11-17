import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import connectDb from "./utils/db.js";
import userRoute from "./route/user.route.js"
import companyRoute from "./route/company.route.js"
import jobRoute from "./route/job.route.js"
import applicationRoute from "./route/application.route.js"


dotenv.config({});

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const corsOption = {
    origin: 'http://localhost:5173', 
    credentials: true,
};
app.use(cors(corsOption));


const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRoute)
app.use("/api/v1/company", companyRoute)
app.use("/api/v1/job", jobRoute)
app.use("/api/v1/application", applicationRoute);


app.listen(PORT, () => {

    connectDb();
    console.log(`Server running at port ${PORT}`);
});
