import { API_BASE } from '@/services/api';  // 导入 API_BASE

export function DownloadButton() {
    return (
        <div className="w-full max-w-4xl mx-auto flex justify-center mb-6">
            <a
                href={API_BASE + '/download/db'}
                download="safc.db"
                className="flex items-center gap-1 px-2 py-1 text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-md transition-colors shadow-sm cursor-pointer"
            >

                <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>下载 sqlite 数据库</span>
                </>
            </a>
        </div>
    );
}
