import CreatePost from "@/components/custom/CreatePost";
import Post from "@/components/custom/Post";
import Topbar from "@/components/custom/Topbar";
import DefaultLayout from "@/components/layout/Default";
import { IPost } from "@/db/Post";
import { postsAtom } from "@/lib/state";
import { trpc } from "@/lib/trpc";
import { SafePost } from "@/lib/types";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function Home() {
  const [posts, setPosts] = useAtom(postsAtom);
  const getPosts = trpc.post.getPosts.useQuery();
  trpc.post.postSubscription.useSubscription(undefined, {
    onData: (data) => {
      console.log(data);
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
        <CreatePost />

        {posts.map((post) => (
          <Post key={post._id} {...post} />
        ))}
      </div>
    </DefaultLayout>
  );
}
