import { HeartIcon, ShareIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export default function Post() {
    return <div className="w-[45rem] border-2 px-6 py-8 rounded-xl">
        <div className="flex flex-row gap-4">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>ZA</AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between">
                    <h2 className="text-3xl font-semibold">Title here</h2>
                    <div className="flex gap-3">
                        <HeartIcon className="text-slate-500" />
                        <ShareIcon className="text-slate-500" />
                    </div>
                </div>
                <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum </p>
            </div>
        </div>
    </div>
}