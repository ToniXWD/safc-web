import { Comment } from '@/types';

interface CommentListProps {
    comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
                <div className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    检索到 {comments.length} 条评论
                </div>
            </div>

            <div className="space-y-6">
                {comments.map((comment, index) => (
                    <div key={comment.id}
                        className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transition-all hover:shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                                <span className="font-medium">{index + 1}</span>
                                <span>›</span>
                                <span className="text-blue-600 dark:text-blue-400">{comment.comment_type}</span>
                                <span>›</span>
                                <span className="font-bold">{comment.supervisor}</span>
                                <span>›</span>
                                <span className="text-gray-500">{comment.date}</span>
                            </div>
                            <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                                {comment.object}
                            </code>
                        </div>

                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                            来自 {comment.source_cate} 的评价
                        </div>

                        <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                            <CommentText text={comment.description} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function CommentText({ text }: { text: string }) {
    // 将<br><br>替换为换行符
    const formattedText = text.replace(/<br\s*\/?>/g, '\n');

    return (
        <div className="whitespace-pre-wrap">
            {formattedText}
        </div>
    );
}
