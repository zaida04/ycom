import { TRPCClientErr, trpc } from "@/lib/trpc";
import { Button } from "../ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import ModalInput from "./ModalInput";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import { Alert, AlertDescription } from "../ui/alert";

interface LoginModalFormInputs {
    username: string;
    password: string;
}
export default function LoginModal() {
    const { register, handleSubmit, formState } = useForm<LoginModalFormInputs>();
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const login = trpc.login.useMutation();

    return (
        <DialogContent className="sm:max-w-[45rem]">
            <DialogHeader>
                <DialogTitle>Login to your account</DialogTitle>
                <DialogDescription>
                    Get in here.
                </DialogDescription>
            </DialogHeader>
            {error && <Alert variant="destructive">
                <AlertDescription>
                    {error}
                </AlertDescription>
            </Alert>}

            <form className="grid gap-4 py-4" onSubmit={handleSubmit(async (data) => {
                try {
                    const created = await login.mutateAsync(data);
                    setError(null);

                    if (created) {
                        router.reload();
                    }
                } catch (e) {
                    setError((e as TRPCClientErr).message);
                }
            })}>
                <ModalInput
                    label="Username"
                    placeholder="deeznufs"
                    error={formState.errors.username?.message}
                    formState={register("username")}
                />
                <ModalInput
                    label="Password"
                    type="password"
                    placeholder="Your password"
                    error={formState.errors.password?.message}
                    formState={register("password")}
                />

                <Button type="submit">Log In</Button>
            </form>
        </DialogContent>
    )
}
