import { useForm } from "react-hook-form";
import { TRPCClientErr, trpc } from "@/lib/trpc";
import { useEffect, useMemo, useState } from "react";

import DefaultLayout from "@/components/layout/Default";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ModalInputProps } from "@/components/custom/ModalInput";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { no_refetch } from "@/lib/utils";

interface ProfileFormInputs {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function MyProfile() {
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();
    const existing = trpc.user.getCurrentUser.useQuery(undefined, no_refetch);
    const { register, handleSubmit, formState, reset } = useForm<ProfileFormInputs>();
    const mutation = trpc.user.updateProfile.useMutation();

    const onSubmit = async (data: ProfileFormInputs) => {
        try {
            await mutation.mutateAsync({
                name: data.name,
                username: data.username,
                email: data.email,
                password: data.password || undefined,
                confirmPassword: data.confirmPassword || undefined
            });
            setError(null);
            toast({
                title: "Profile updated",
                description: "Your profile has been updated successfully",
                variant: "default",
            });
        } catch (error) {
            setError((error as TRPCClientErr).message);
        }
    };

    useEffect(() => {
        reset({
            name: existing.data?.name ?? "",
            username: existing.data?.username ?? "",
            email: existing.data?.email ?? "",
        });
    }, [existing.data]);

    return (
        <DefaultLayout>
            {error && <Alert variant="destructive">
                <AlertDescription>
                    {error}
                </AlertDescription>
            </Alert>}

            <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                <h1 className="text-4xl font-bold mb-6">Your Profile</h1>

                <div className="flex items-center gap-4 mb-8">
                    <Avatar className="w-24 h-24">
                        <AvatarImage src="https://github.com/shadcn.png" alt="Profile Image" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" className="py-2 px-4">Change Photo</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
                    <ProfileInput
                        label="Display Name"
                        error={formState.errors.name?.message}
                        formState={register("name")}
                    />
                    <ProfileInput
                        label="Username"
                        error={formState.errors.username?.message}
                        formState={register("username")}
                    />
                    <ProfileInput
                        label="Email"
                        type="email"
                        error={formState.errors.email?.message}
                        formState={register("email")}
                    />
                    <div className="md:col-span-2 grid grid-cols-2 gap-6">
                        <ProfileInput
                            label="New Password"
                            type="password"
                            placeholder="New Password"
                            error={formState.errors.password?.message}
                            formState={register("password")}
                        />
                        <ProfileInput
                            label="Confirm New Password"
                            type="password"
                            placeholder="Confirm Password"
                            error={formState.errors.confirmPassword?.message}
                            formState={register("confirmPassword", {
                                validate: (value, other) => value === other.password || "Passwords do not match"
                            })}
                        />
                    </div>
                </div>

                <Button type="submit" className="py-2 px-4 mt-4">Update Profile</Button>
            </form>
        </DefaultLayout>
    );
}

function ProfileInput({ label, error, formState, ...rest }: ModalInputProps) {
    return (
        <div className="flex flex-col">
            <Label htmlFor={rest.name} className="pb-2">
                {label}
            </Label>
            <Input {...formState} {...rest} />
            <p className="inline text-xs text-red-500 text-right pt-1 h-[1rem]">{error ?? ""}</p>
        </div>
    );
}
