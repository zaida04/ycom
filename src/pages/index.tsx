import Post from "@/components/custom/Post";
import Topbar from "@/components/custom/Topbar";
import DefaultLayout from "@/components/layout/Default";

export default function Home() {
  return (
    <DefaultLayout>
      <Topbar />

      <div className="flex flex-col gap-4 p-8">
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
