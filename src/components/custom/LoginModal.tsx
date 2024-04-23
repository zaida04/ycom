import { Button } from "../ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import ModalInput from "./ModalInput";

export default function LoginModal() {
    return (
        <DialogContent className="sm:max-w-[45rem]">
            <DialogHeader>
                <DialogTitle>Login to your account</DialogTitle>
                <DialogDescription>
                    Get in here.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <ModalInput id="email" label="Email" placeholder="you@email.com" />
                <ModalInput id="password" label="Password" type="password" placeholder="Your password" />
            </div>

            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Log In</Button>
            </DialogFooter>
        </DialogContent>
    )
}
