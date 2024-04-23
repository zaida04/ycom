import { TRPCClientErr, trpc } from "@/lib/trpc";
import { Button } from "../ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import ModalInput from "./ModalInput";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Alert, AlertDescription } from "../ui/alert";
import { useRouter } from "next/router";

interface RegisterFormInputs {
    name: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}
export default function RegisterModal() {
    const { register, handleSubmit, formState } = useForm<RegisterFormInputs>();
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const mutation = trpc.user.register.useMutation();

    return (
        <DialogContent className="sm:max-w-[45rem]">
            <DialogHeader>
                <DialogTitle>Create your account</DialogTitle>
                <DialogDescription>
                    Join us, or perish.
                </DialogDescription>
            </DialogHeader>
            {error && <Alert variant="destructive">
                <AlertDescription>
                    {error}
                </AlertDescription>
            </Alert>}

            <form className="grid gap-4 py-4" onSubmit={handleSubmit(
                async (data) => {
                    try {
                        const created = await mutation.mutateAsync(data);
                        setError(null);

                        if (created) {
                            router.reload();
                        }
                    } catch (e) {
                        setError((e as TRPCClientErr).message);
                    }
                })
            }>
                <ModalInput
                    label="Display Name"
                    placeholder="Zaid Arshad"
                    error={formState.errors.name?.message}
                    formState={register("name", {
                        required: "This field is required."
                    })}
                />
                <ModalInput
                    label="Email"
                    placeholder="you@email.com"
                    error={formState.errors.email?.message}
                    formState={register("email", {
                        required: "This field is required."

                    })}
                />
                <ModalInput
                    label="Username"
                    placeholder="@deeznufs"
                    error={formState.errors.username?.message}
                    formState={register("username", {
                        required: "This field is required."

                    })}
                />
                <ModalInput
                    label="Password"
                    type="password"
                    placeholder="T@stpass1"
                    autoComplete="false"
                    error={formState.errors.password?.message}
                    formState={register("password", {
                        required: "This field is required.",
                    })}
                />
                <ModalInput
                    label="Confirm Password"
                    type="password"
                    placeholder="T@stpass1"
                    autoComplete="false"
                    error={formState.errors.confirmPassword?.message}
                    formState={register("confirmPassword", {
                        required: "This field is required.",
                        validate: (value, others) => others.password === value || "Passwords do not match."
                    })}
                />
                <Button type="submit">Create Account</Button>
            </form>
        </DialogContent>
    )
}