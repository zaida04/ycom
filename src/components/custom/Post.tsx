import { HeartIcon, ShareIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { IPost } from "@/db/Post"

export default function Post(props: Pick<IPost, "title" | "content" | "likes">) {
    return <div className="w-[45rem] border-2 px-6 py-8 rounded-xl">
        <div className="flex flex-row gap-4">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>ZA</AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-row justify-between">
                    <h2 className="text-3xl font-semibold">{props.title}</h2>
                    <div className="flex gap-3 items-center">
                        <ShareIcon className="text-slate-500" />

                        <div className="flex flex-row gap-2 items-center border p-2 rounded-xl">
                            <HeartIcon className="text-slate-500" />
                            <p>{props.likes?.length ?? 0}</p>
                        </div>
                    </div>
                </div>
                <p>{props.content}</p>
            </div>
        </div>
    </div>
}