import { IPost } from "@/db/Post";
import type mongoose from "mongoose";

export type MongoConvertObjIdToString<T> = {
    [K in keyof T]: T[K] extends mongoose.Types.ObjectId[] ? string[] :
    T[K] extends mongoose.Types.ObjectId ? string :
    T[K] extends Date ? string :
    T[K];
};

export type SafePost = MongoConvertObjIdToString<IPost>;