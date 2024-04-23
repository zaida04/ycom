import { trpc } from "@/lib/trpc";
import { Button } from "../ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import ModalInput from "./ModalInput";
import { useForm } from "react-hook-form";

interface RegisterFormInputs {
    name: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}
export default function RegisterModal() {
    const { register, handleSubmit, formState, watch } = useForm<RegisterFormInputs>();
    watch(["name", "email", "username", "password", "confirmPassword"]);
    const mutation = trpc.register.useMutation();

    return (
        <DialogContent className="sm:max-w-[45rem]">
            <DialogHeader>
                <DialogTitle>Create your account</DialogTitle>
                <DialogDescription>
                    Join us, or perish.
                </DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4" onSubmit={handleSubmit(
                async (data) => {
                    const created = await mutation.mutateAsync(data);
                })
            }>
                <ModalInput
                    id="name"
                    label="Display Name"
                    placeholder="Zaid Arshad"
                    error={formState.errors.name?.message}
                    {...register("name", { required: "Name is required" })}
                />
                <ModalInput
                    id="email"
                    label="Email"
                    placeholder="you@email.com"
                    error={formState.errors.email?.message}
                    {...register("email", { required: "Email is required" })}
                />
                <ModalInput
                    id="username"
                    label="Username"
                    placeholder="@deeznufs"
                    error={formState.errors.username?.message}
                    {...register("username", { required: "Username is required" })}
                />
                <ModalInput
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="T@stpass1"
                    error={formState.errors.password?.message}
                    {...register("password", { required: "Password is required" })}
                />
                <ModalInput
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    placeholder="T@stpass1"
                    error={formState.errors.confirmPassword?.message}
                    {...register("confirmPassword", { required: "Confirm Password is required" })}
                />
                <Button type="submit">Create Account</Button>
            </form>
        </DialogContent>
    )
}