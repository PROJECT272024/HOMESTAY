import mongoose from "mongoose";

let isConnected = false

const connectDB = async ()=>{
    mongoose.set('strictQuery',true);
    //if db is already connected do not connect again
    if(isConnected){
        console.log('Mongo db already connected');
        return;
    }
    //try to connect db
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true
        console.log('Mongodb Connected')
    } catch (error) {
        console.log(error)
    } 
};

export default connectDB;

 