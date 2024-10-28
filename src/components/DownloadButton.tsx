import { useState } from 'react';
import { API_BASE } from '@/services/api';  // 导入 API_BASE

export function DownloadButton() {
    const [isLoading, setIsLoading] = useState(false);

    const handleDownload = async () => {
        const download_url = API_BASE + '/download/db';

        try {
            setIsLoading(true);

            // 发起GET请求获取文件
            const response = await fetch(download_url);

            if (!response.ok) {
                throw new Error('下载失败');
            }

            // 获取文件名（如果服务器提供）
            const contentDisposition = response.headers.get('content-disposition');
            let filename = 'safc.db';  // 默认文件名
            if (contentDisposition) {
                const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition);
                if (matches != null && matches[1]) {
                    filename = matches[1].replace(/['"]/g, '');
                }
            }

            // 创建blob并触发下载
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;

            // 触发下载
            document.body.appendChild(link);
            link.click();

            // 清理
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error('下载失败:', error);
            alert('下载失败，请稍后重试');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleDownload}
            disabled={isLoading}
            className="flex items-center gap-1 px-2 py-1 text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-md transition-colors shadow-sm"
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>下载中...</span>
                </>
            ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>下载sqlite数据库</span>
                </>
            )}
        </button>
    );
}
