'use client';

import { API_BASE } from '@/services/api';
import { useEffect, useState } from 'react';

export default function ApiStatus() {
    const [apiData, setApiData] = useState<string>('加载中...');
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_BASE);
                const data = await response.text();
                setApiData(data);
                setIsError(false);
            } catch (error) {
                console.error('API 请求失败:', error);
                setApiData('API 连接失败');
                setIsError(true);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto mb-1 p-1">
            {/* 如果 isError 是 false ,条件渲染另一个div*/}
            {isError ? (
                <div className="text-center text-red-500">
                    <p className="font-mono">
                        😢 可能后端服务器出故障了 🐎 速速拷打
                        <a 
                            href="https://t.me/SAFC_admin" 
                            className="mx-1 px-2 py-0.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                        >
                            管理员
                        </a>
                    </p>
                </div>
            ) : (
                <div className="text-center text-gray-700">
                    <p className="font-mono">{apiData}</p>
                </div>
            )}
        </div>
    );
} 
