import CreatePost from "@/components/custom/CreatePost";
import Post from "@/components/custom/Post";
import Topbar from "@/components/custom/Topbar";
import DefaultLayout from "@/components/layout/Default";

export default function Home() {
  return (
    <DefaultLayout>
      <Topbar />

      <div className="flex flex-col gap-4 px-8">
        <CreatePost />

        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </DefaultLayout>
  );
}
