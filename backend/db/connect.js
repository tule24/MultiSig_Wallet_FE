import mongoose from "mongoose"
const connection = {}

const connectDB = async () => {
    if (connection.isConnected) {
        console.log("is connected")
        return;
    }
    mongoose.set('strictQuery', false)
    await mongoose.connect(process.env.MONGO_URI)
        .then((db) => {
            console.log("CONNECT TO THE DB...")
            connection.isConnected = db.connections[0].readyState
        })
        .catch((err) => console.log(err))
}

export default connectDB