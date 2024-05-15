import mongoose from "mongoose";

const connectDB = async() => {

    try {

        await mongoose.connect(process.env.MONGO_DB)
        
    } catch (error) {

        console.log('error', error);
        
    }

}

export {connectDB};