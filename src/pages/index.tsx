import LoginModal from "@/components/custom/LoginModal";
import Post from "@/components/custom/Post";
import RegisterModal from "@/components/custom/RegisterModal";
import DefaultLayout from "@/components/layout/Default";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

export default function Home() {
  return (
    <DefaultLayout>
      <div className="flex flex-row gap-2 justify-end mb-8 mx-8">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" size="lg">Register</Button>
          </DialogTrigger>
          <RegisterModal />
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="lg">Log In</Button>
          </DialogTrigger>
          <LoginModal />
        </Dialog>
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
