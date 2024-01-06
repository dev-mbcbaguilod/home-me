import mongoose from 'mongoose';

export const connectDatabase = () => {
    let DB_URI = "";

    if(process.env.NODE_ENV === 'DEVELOPMENT') DB_URI = process.env.DB_URI;
    if(process.env.NODE_ENV === 'PRODUCTION') DB_URI = process.env.DB_URI;

    mongoose.connect(DB_URI).then((con) => {
        if (con && con.connection && con.connection.host) {
            console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
        } else {
            console.log("MongoDB Database connected, but unable to determine host.");
        }
    });    
}