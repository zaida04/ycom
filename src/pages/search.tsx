import DefaultLayout from "@/components/layout/Default";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export default function SearchUsers() {
    return (
        <DefaultLayout>
            <div className="p-8">
                <h1 className="text-4xl font-bold mb-2">Search for a user</h1>
                <Input className="text-xl w-3/4"></Input>

                <div className="flex flex-col gap-4 mt-4">
                    <UserItem username="shadcn" id="@shadcn" avatar="https://github.com/shadcn.png" />
                    <UserItem username="shadcn" id="@shadcn" avatar="https://github.com/shadcn.png" />
                    <UserItem username="shadcn" id="@shadcn" avatar="https://github.com/shadcn.png" />
                    <UserItem username="shadcn" id="@shadcn" avatar="https://github.com/shadcn.png" />
                    <UserItem username="shadcn" id="@shadcn" avatar="https://github.com/shadcn.png" />
                    <UserItem username="shadcn" id="@shadcn" avatar="https://github.com/shadcn.png" />
                    <UserItem username="shadcn" id="@shadcn" avatar="https://github.com/shadcn.png" />
                    <UserItem username="shadcn" id="@shadcn" avatar="https://github.com/shadcn.png" />

                </div>
            </div>


        </DefaultLayout>
    );
}

function UserItem(props: {
    username: string;
    id: string;
    avatar: string;
}) {
    return (
        <div className="flex items-center gap-4 border-2 p-3 rounded-xl">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>ZA</AvatarFallback>
            </Avatar>

            <div>
                <h2 className="text-xl font-bold">{props.username}</h2>
                <p className="text-gray-500">{props.id}</p>
            </div>
        </div>
    );
}
