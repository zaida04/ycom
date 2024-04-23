import CreatePost from "@/components/custom/CreatePost";
import Post from "@/components/custom/Post";
import Topbar from "@/components/custom/Topbar";
import DefaultLayout from "@/components/layout/Default";
import { IPost } from "@/db/Post";
import { trpc } from "@/lib/trpc";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const getPosts = trpc.getPosts.useQuery();
  trpc.postSubscription.useSubscription(undefined, {
    onData: (data) => {
      console.log(data);
      setPosts((prev) => [...prev, data.post as IPost]);
    },
  });

  useEffect(() => {
    setPosts(getPosts.data ?? []);
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
