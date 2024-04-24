import { dbUrl } from '@/env';
import mongoose from 'mongoose';

const options: mongoose.ConnectOptions = {
    connectTimeoutMS: 5000,
    retryWrites: true,
    retryReads: true,
    waitQueueTimeoutMS: 5000,
    socketTimeoutMS: 5000,
};

mongoose.connect(dbUrl, options);