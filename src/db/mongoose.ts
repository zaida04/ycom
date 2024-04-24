import mongoose from 'mongoose';

const options: mongoose.ConnectOptions = {
    connectTimeoutMS: 5000,
    retryWrites: true,
    retryReads: true,
    waitQueueTimeoutMS: 5000,
    socketTimeoutMS: 5000,
};

mongoose.connect(process.env.DATABASE_URL ?? "mongodb://webcrawlers:blah@localhost:27017/", options);