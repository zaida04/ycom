import { ModalInputProps } from "@/components/custom/ModalInput";

import DefaultLayout from "@/components/layout/Default";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function MyProfile() {
    return (
        <DefaultLayout>
            <div className="p-8">
                <h1 className="text-4xl font-bold mb-6">Your Profile</h1>

                <div className="flex items-center gap-4 mb-8">
                    <Avatar className="w-24 h-24">
                        <AvatarImage src="https://github.com/shadcn.png" alt="Profile Image" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" className="py-2 px-4">Change Photo</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProfileInput id="fullName" label="Full Name" type="text" placeholder="Your full name" />
                    <ProfileInput id="username" label="Username" type="text" placeholder="Username" />
                    <ProfileInput id="email" label="Email" type="email" placeholder="your-email@example.com" />

                    <div className="md:col-span-2 grid grid-cols-2 gap-6">
                        <ProfileInput id="password" label="New Password" type="password" placeholder="New Password" />
                        <ProfileInput id="confirmPassword" label="Confirm New Password" type="password" placeholder="Confirm Password" />
                    </div>
                </div>

                <Button className="py-2 px-4 mt-4">Update Profile</Button>
            </div>
        </DefaultLayout>
    );
}


function ProfileInput({ label, ...rest }: ModalInputProps) {
    return (
        <div className="flex flex-col">
            <Label className="pb-2" htmlFor={rest.id}>
                {label}
            </Label>
            <Input className="col-span-3" {...rest} />
        </div>
    );
};
