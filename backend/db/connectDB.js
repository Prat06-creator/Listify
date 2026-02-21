import mongoose from 'mongoose'
export const connectDb = async()=>{
    try {
        console.log("Mongo URI:", process.env.MONGO_URI); 
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected")
    } catch (error) {
        console.log("error connecting to database",error)
        process.exit(1);
    }
}