'use client';

import { useState, useEffect } from 'react';
import { api } from '@/services/api';
import SelectionForm from '@/components/SelectionForm';
import CommentList from '@/components/CommentList';
import { Comment } from '@/types';
import { DownloadButton } from '@/components/DownloadButton';

export default function Home() {
    const [dbStatus, setDbStatus] = useState<string>('连接数据库中...');
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        api.getStatus()
            .then(status => setDbStatus(status))
            .catch(() => setDbStatus('😢 可能后端服务器出故障了'));
    }, []);

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-2">🏛️</h1>
                <h1 className="text-4xl font-bold mb-4">SAFC - Web</h1>
                <p className="italic mb-4">元平台、分布式——不只是评价导师</p>
                <div className="space-x-4">
                    <a href="https://t.me/SAFC_bak_bot" className="text-blue-500 hover:underline">Telegram 机器人</a>
                    <a href="https://t.me/SAFC_group" className="text-blue-500 hover:underline">群组社区</a>
                    <a href="https://github.com/framist/SAFC-bot" className="text-blue-500 hover:underline">GitHub</a>
                </div>
            </div>
            
            <div className="w-full max-w-4xl mx-auto flex justify-center mb-6">
                <DownloadButton />
            </div>

            <SelectionForm onCommentsUpdate={setComments} />
            <CommentList comments={comments} />
        </main>
    );
}
