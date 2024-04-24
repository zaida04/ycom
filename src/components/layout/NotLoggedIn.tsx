import Link from "next/link";
import DefaultLayout from "./Default";

export default function NotLoggedIn() {
    return <DefaultLayout>
        <div className="flex flex-col w-full h-full justify-center items-center">
            <h1>Sorry! You gotta be logged in to see this page.</h1>
            <Link href="/" className="text-2xl underline mt-2">How about we go home instead?</Link>
        </div>
    </DefaultLayout>
}