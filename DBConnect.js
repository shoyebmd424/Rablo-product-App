import mongoose from "mongoose";

const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DB_URL);
    console.log("DB is Connected");
  } catch (error) {
    throw error;
  }
  mongoose.connection.on("disconnected", () => {
    console.log("database is disconnected");
  });
};
export default connect;
