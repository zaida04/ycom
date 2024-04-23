import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { trpc } from "./trpc";
import { no_refetch } from "./utils";

// false means not loaded
// null means not logged
// IUser means logged
export const userAtom = atom<{ username: string; email: string; name: string; _id: string } | false | null>(false);

export function useUser() {
    const [user, setUser] = useAtom(userAtom);
    const isLogged = trpc.user.isLogged.useQuery(undefined, no_refetch);

    useEffect(() => {
        if (isLogged.data?.logged && isLogged.data?.user) {
            setUser(isLogged.data.user as { username: string; email: string; name: string; _id: string });
        } else {
            setUser(null);
        }
    }, [isLogged]);

    return user;
}