'use client';

import { useState } from 'react';
import SelectionForm from '@/components/SelectionForm';
import CommentList from '@/components/CommentList';
import { Comment } from '@/types';
import { DownloadButton } from '@/components/DownloadButton';
import Footer from '@/components/Footer'
import ApiStatus from '@/components/ApiStatus';
import Header from '@/components/Header';
import CreateCommentForm from '@/components/CreateCommentForm';

export default function Home() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [activeTab, setActiveTab] = useState<'query' | 'create'>('query');

    return (
        <main className="min-h-screen p-4 md:p-8">
            <Header />
            <DownloadButton />
            <ApiStatus />
            {/* 选项卡导航 */}
            <div className="w-full md:w-[800px] mx-auto flex justify-center border-b border-gray-200 mb-6">
                <button
                    className={`px-4 py-2 font-medium ${activeTab === 'query'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                    onClick={() => setActiveTab('query')}
                >
                    查询评论
                </button>
                <button
                    className={`px-4 py-2 font-medium ${activeTab === 'create'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                    onClick={() => setActiveTab('create')}
                >
                    新增评论
                </button>
            </div>

            {/* 选项卡内容 */}
            <div>
                {activeTab === 'query' ? (
                    <div>
                        <SelectionForm onCommentsUpdate={setComments} />
                        <CommentList comments={comments} />
                    </div>
                ) : (
                    <div>
                        <CreateCommentForm />
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}
