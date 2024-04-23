import { HeartIcon, ShareIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { IPost } from "@/db/Post"
import { Button } from "../ui/button"
import { useUser } from "@/lib/user"
import { trpc } from "@/lib/trpc"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { SafePost } from "@/lib/types"
import { useSetAtom } from "jotai"
import { postsAtom } from "@/lib/state"

export default function Post(props: Pick<SafePost, "_id" | "title" | "content" | "likes">) {
    const setPosts = useSetAtom(postsAtom);
    const user = useUser();
    const like = trpc.post.likePost.useMutation();

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

                        <Tooltip delayDuration={50}>
                            <TooltipTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className="flex flex-row gap-2 items-center border p-2 rounded-xl bg-rose-600 text-white"
                                    onClick={async () => {
                                        if (!user) return;
                                        const data = await like.mutateAsync(props._id);
                                        setPosts((prev) => {
                                            return prev.map((post) => {
                                                if (post._id === props._id) {
                                                    const newState = data.liked ? [...post.likes, user._id] : post.likes.filter((id) => id !== user._id);
                                                    return { ...post, likes: newState };
                                                }

                                                return post;
                                            });
                                        })
                                    }}
                                >
                                    <HeartIcon fill={user && props.likes.includes(user._id) ? "#FFFFFF" : "#e11d48"} />
                                    <p>{props.likes.length ?? 0}</p>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-xl">{user ? "Like" : "Login to like"}</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
                <p>{props.content}</p>
            </div>
        </div>
    </div>
}