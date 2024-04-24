import React from "react";
import { AxeIcon, CircleUserIcon, GithubIcon, LucideIcon, MailQuestionIcon, NotebookIcon, PackageIcon, PaintbrushIcon, PencilIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "@/lib/user";

export default function DefaultLayout(props: { children: React.ReactNode }) {
    const user = useUser();

    return <div className="grid grid-cols-[auto,1fr]">
        <div className="flex flex-col gap-8 px-12 py-8 w-[23rem] border-r-2 h-screen sticky top-0">
            <h1 className="font-bold text-4xl">Y.com</h1>
            <div className="flex flex-col gap-4 text-2xl">
                <MenuItem icon={NotebookIcon} link="/" text="All Posts" />
                <MenuItem icon={UserIcon} link="/search" text="Search Users" />
                <MenuItem icon={PaintbrushIcon} link="/drawing" text="Drawing Board" />
                {user && <MenuItem icon={CircleUserIcon} link={user ? `/users/${user!._id}` : ""} text="Your Profile" />}
                <MenuItem icon={PencilIcon} link="/your-profile" text="Edit Profile" />
                <MenuItem icon={GithubIcon} link="https://github.com/zaida04" text="Follow me for a cookie :p" />
                <MenuItem icon={PackageIcon} link="https://nico.engineer" text="Mandatory self-promo" />
            </div>
        </div>

        <div className="m-8">
            {props.children}
        </div>
    </div>
}

function MenuItem(props: { icon: LucideIcon; link: string; text: string; }) {
    const router = useRouter();
    const isCurrent = router.pathname === props.link;

    return (
        <Link href={props.link}>
            <span className={`flex flex-row gap-4 items-center rounded-xl px-2 py-2 ${isCurrent ? "bg-slate-600" : "hover:bg-slate-600 transition-all"}`}>
                <props.icon />
                <p className="font-medium underline underline-offset-4 decoration-slate-700">
                    {props.text}
                </p>
            </span>
        </Link>

    );
}