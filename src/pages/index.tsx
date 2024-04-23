import Post from "@/components/custom/Post";
import DefaultLayout from "@/components/layout/Default";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <DefaultLayout>
      <div className="flex flex-row gap-2 justify-end mb-8 mx-8">
        <Button variant="default" size="lg">Register</Button>
        <Button variant="outline" size="lg">Log In</Button>
      </div>

      <div className="flex flex-col gap-4">
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
