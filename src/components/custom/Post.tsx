import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export default function Post() {
    return <div className="w-[45rem] border-2 px-6 py-8 rounded-xl">
        <div className="flex flex-row gap-4">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>ZA</AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-semibold">Title here</h2>
                <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum </p>
            </div>
        </div>
    </div>
}