import { Button } from "../ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import ModalInput from "./ModalInput";

export default function RegisterModal() {
    return (
        <DialogContent className="sm:max-w-[45rem]">
            <DialogHeader>
                <DialogTitle>Create your account</DialogTitle>
                <DialogDescription>
                    Join us, or perish.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <ModalInput id="name" label="Display Name" placeholder="Zaid Arshad" />
                <ModalInput id="email" label="Email" placeholder="you@email.com" />
                <ModalInput id="username" label="Username" placeholder="@deeznufs" />
                <ModalInput id="password" label="Password" type="password" placeholder="T@stpass1" />
                <ModalInput id="confirm-password" label="Confirm Password" type="password" placeholder="T@stpass1" />
            </div>

            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Create Account</Button>
            </DialogFooter>
        </DialogContent>
    )
}