import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://admin:admin123@cluster0.vccfj4c.mongodb.net/?retryWrites=true&w=majority");
        console.log(">>> DB is connected");
    } catch (error) {
        console.log(error);
    }
};