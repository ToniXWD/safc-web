import './globals.css'

export const metadata = {
    title: 'SAFC - Web',
    description: '元平台、分布式——不只是评价导师',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="zh" suppressHydrationWarning>
            <body className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                {children}
            </body>
        </html>
    )
}
