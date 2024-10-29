'use client';

import { useState } from 'react';
import SelectionForm from '@/components/SelectionForm';
import CommentList from '@/components/CommentList';
import { Comment } from '@/types';
import { DownloadButton } from '@/components/DownloadButton';
import Footer from '@/components/Footer'
import ApiStatus from '@/components/ApiStatus';
import Header from '@/components/Header';

export default function Home() {
    const [comments, setComments] = useState<Comment[]>([]);

    return (
        <main className="container mx-auto px-4 py-4">
            <Header />
            <DownloadButton />
            <ApiStatus />
            <SelectionForm onCommentsUpdate={setComments} />
            <CommentList comments={comments} />
            <Footer />
        </main>
    );
}
