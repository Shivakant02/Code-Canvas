import mongoose from "mongoose";
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "CodeCanvas",
    });
    console.log("connected to database");
  } catch (error) {
    console.log("error in connecting database", error);
  }
};

export default dbConnect;
