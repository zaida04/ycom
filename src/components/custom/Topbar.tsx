import RegisterModal from "@/components/custom/RegisterModal";
import LoginModal from "@/components/custom/LoginModal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { LoaderIcon } from "lucide-react";
import { useUser } from "@/lib/user";
import { trpc } from "@/lib/trpc";

export default function Topbar() {
    const user = useUser();
    const logout = trpc.user.logout.useMutation();

    return <div className="fixed top-8 right-8">
        {user === null ?
            <>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="default" size="lg" className="mr-2">Register</Button>
                    </DialogTrigger>
                    <RegisterModal />
                </Dialog>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="lg">Log In</Button>
                    </DialogTrigger>
                    <LoginModal />
                </Dialog>
            </> :
            user === false ?
                <LoaderIcon /> :
                <Button variant="default" size="lg" onClick={async () => {
                    await logout.mutateAsync();
                    window.location.reload();
                }}>Log Out</Button>
        }
    </div>
}