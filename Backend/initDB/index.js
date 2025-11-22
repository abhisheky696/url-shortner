import mongoose from "mongoose"

const connectDB  = async () => {
  try {
    await mongoose.connect(process.env.mongoURL);
    console.log(process.env.mongoURL)
    console.log("database connected successfully!!!")
  }
  catch(error) {
    console.log("some error occured while connecting to DB!!");
  }
  
}

export default connectDB;