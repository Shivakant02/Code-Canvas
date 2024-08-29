import { connect } from "mongoose";

const dbConnect = async () => {
  try {
    const { connection } = await connect(process.env.MONGO_URI);
    if (connection) {
      console.log(`connected to db : ${connection.host}`);
    }
  } catch (error) {
    console.log("failed to connect database");
  }
};

export default dbConnect;
