import React from 'react';
import { useRouter } from 'next/router';
import DefaultLayout from '@/components/layout/Default';
import { trpc } from '@/lib/trpc';
import Post from '@/components/custom/Post';
import Link from 'next/link';
import { SafePost } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function UserPage() {
    const router = useRouter();
    const { userId } = router.query;
    const user = trpc.user.getUser.useQuery(userId as string);

    if (user.isLoading) {
        return <p>Loading...</p>;
    }

    if (user.isError || !user) {
        return <p>Error loading the user or user not found.</p>;
    }

    return (
        <DefaultLayout>
            <Link href="/">← Go back</Link>

            <div className="flex flex-col gap-4 px-8 mt-8">
                <div className='w-[49rem] border-2 p-8 rounded-xl'>
                    <Avatar>
                        <AvatarImage src="/pfp.png" alt="@shadcn" />
                        <AvatarFallback>ZA</AvatarFallback>
                    </Avatar>

                    <div className='mt-4'>
                        <h2 className="text-xl font-bold">{user.data?.name}</h2>
                        <p className="text-gray-500">@{user.data?.username}</p>
                    </div>

                    <div className='mt-8'>
                        <h2 className='mb-4'>Posts</h2>

                        <div className="flex flex-col gap-4">
                            {(user.data?.posts as SafePost[])?.map((post) => (
                                <Post key={post._id} {...post} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
