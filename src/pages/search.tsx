import DefaultLayout from "@/components/layout/Default";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { no_refetch } from "@/lib/utils";
import { skipToken } from "@tanstack/react-query";
import { useState } from "react";
import Link from "next/link";

export default function SearchUsers() {
    const [input, setInput] = useState("");
    const search = trpc.user.search.useQuery(input ? { "username": input } : skipToken, no_refetch);
    const results = search.data?.results ?? [];

    return (
        <DefaultLayout>
            <div className="p-8">
                <h1 className="text-4xl font-bold mb-2">Search for a user</h1>
                <Input className="text-xl w-3/4" onChange={(e) => {
                    setInput(e.target.value);
                }} />

                <div className="flex flex-col gap-4 mt-4">
                    {results.length ? results.map((user) => (
                        <UserItem key={user._id} name={user.name} username={user.username} id={user._id} avatar="/pfp.png" />
                    )) :
                        <h1>No results</h1>
                    }
                </div>
            </div>


        </DefaultLayout>
    );
}

function UserItem(props: {
    name: string;
    username: string;
    id: string;
    avatar: string;
}) {
    return (
        <div className="flex items-center gap-4 border-2 p-3 rounded-xl">
            <Avatar>
                <AvatarImage src="/pfp.png" alt="@shadcn" />
                <AvatarFallback>ZA</AvatarFallback>
            </Avatar>

            <div>
                <Link href={`/users/${props.id}`} className="underline underline-offset-2">
                    <h2 className="text-xl font-bold">{props.name}</h2>
                </Link>
                <p className="text-gray-500">@{props.username}</p>
            </div>
        </div>
    );
}
