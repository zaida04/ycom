import CreatePost from "@/components/custom/CreatePost";
import Post from "@/components/custom/Post";
import Topbar from "@/components/custom/Topbar";
import DefaultLayout from "@/components/layout/Default";
import { postsAtom } from "@/lib/state";
import { trpc } from "@/lib/trpc";
import { SafePost } from "@/lib/types";
import { useUser } from "@/lib/user";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function Home() {
  const [posts, setPosts] = useAtom(postsAtom);
  const user = useUser();
  const getPosts = trpc.post.getPosts.useQuery();
  trpc.post.postSubscription.useSubscription(undefined, {
    onData: (data) => {
      setPosts((prev) => [...prev, data.post as SafePost]);
    },
  });

  useEffect(() => {
    setPosts(getPosts.data as SafePost[] ?? []);
  }, [getPosts.data]);

  return (
    <DefaultLayout>
      <Topbar />

      <div className="flex flex-col gap-4 px-8">
        {user ?
          <CreatePost /> :
          <div className="px-6 py-8 border-4 border-dashed rounded-xl w-[45rem]">
            <h1 className="text-3xl font-bold">Sign in to create a post</h1>
            <p>It's fun, I promise.</p>
          </div>}

        {posts.map((post) => (
          <Post key={post._id} showLink={true} {...post} />
        ))}
      </div>
    </DefaultLayout>
  );
}
