import React from 'react';
import { useRouter } from 'next/router';
import DefaultLayout from '@/components/layout/Default';
import { trpc } from '@/lib/trpc';
import { IPost } from '@/db/Post';
import Post from '@/components/custom/Post';
import Link from 'next/link';
import { SafePost } from '@/lib/types';

export default function PostPage() {
    const router = useRouter();
    const { postId } = router.query;
    const post = trpc.post.getPost.useQuery(postId as string);
    const data = post.data as SafePost;

    if (post.isLoading) {
        return <p>Loading...</p>;
    }

    if (post.isError || !post) {
        return <p>Error loading the post or post not found.</p>;
    }

    return (
        <DefaultLayout>
            <Link href="/">← Go back</Link>

            <div className="flex flex-col gap-4 px-8 mt-8">
                <Post {...data} />
            </div>
        </DefaultLayout>
    );
}
