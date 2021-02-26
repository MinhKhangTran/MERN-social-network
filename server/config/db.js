import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    });
    console.log(`Verbunden mit DB ${conn.connection.host}`.cyan.bold);
  } catch (error) {
    console.log(`ERROR: ${error} `.red.underline);
    process.exit(1);
  }
};
export default connectDB;
