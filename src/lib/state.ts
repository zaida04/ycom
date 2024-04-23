import { atom } from "jotai";
import { MongoConvertObjIdToString, SafePost } from "./types";

export const postsAtom = atom<MongoConvertObjIdToString<SafePost>[]>([]);