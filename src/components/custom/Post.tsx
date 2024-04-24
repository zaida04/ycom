import { ArrowRight, ExternalLinkIcon, HeartIcon, LinkIcon, ShareIcon, TrashIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { useUser } from "@/lib/user"
import { trpc } from "@/lib/trpc"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { SafePost } from "@/lib/types"
import { useSetAtom } from "jotai"
import { postsAtom } from "@/lib/state"
import Link from "next/link"
import { useToast } from "../ui/use-toast"
import { useRouter } from "next/router"

export default function Post(props: Pick<SafePost, "_id" | "title" | "content" | "likes" | "author_id"> & { showLink?: boolean }) {
    const setPosts = useSetAtom(postsAtom);
    const user = useUser();
    const like = trpc.post.likePost.useMutation();
    const deletePost = trpc.post.deletePost.useMutation();
    const router = useRouter();
    const { toast } = useToast();

    return <div className="w-[45rem] border-2 px-6 py-8 rounded-xl">
        <div className="flex flex-row gap-4">
            <Avatar>
                <AvatarImage src="/pfp.png" alt="@shadcn" />
                <AvatarFallback>ZA</AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-row justify-between">
                    <h2 className="text-3xl font-semibold">{props.title}</h2>
                    <div className="flex gap-3 items-center">
                        {user && user._id === props.author_id &&
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={async () => {
                                    await deletePost.mutateAsync(props._id);
                                    if (router.pathname !== "/") {
                                        router.push("/");
                                    } else {
                                        setPosts((prev) => prev.filter((post) => post._id !== props._id));
                                    }
                                }}>
                                <TrashIcon />
                            </Button>}

                        <Link href={`/posts/${props._id}`}>
                            <Button variant="outline" size="sm">
                                <ExternalLinkIcon className="text-slate-500" />
                            </Button>
                        </Link>


                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                navigator.clipboard.writeText(`${window.location.origin}/posts/${props._id}`);
                                toast({
                                    title: "Copied link to your clipboard!",
                                    description: `You can now share with your friends.`,
                                    duration: 5000
                                })
                            }}
                        >
                            <LinkIcon
                                className="text-slate-500"
                            />
                        </Button>

                        <Tooltip delayDuration={50}>
                            <TooltipTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className="flex flex-row gap-2 items-center border p-2 rounded-xl bg-rose-600 text-white w-[4rem]"
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