import Link from 'next/link'

export default function Footer() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <br></br>
      <i>
        web 端现只提供基本的查看功能，数据约滞后一日<br />
        增加导师、增加评价、查看与增加嵌套评价等更多功能请使用
        <Link
          href="https://t.me/SAFC_bak_bot"
          className="px-2 py-0.5 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors font-medium"
        >
          bot
        </Link>
        ！
      </i>
      <br />

      <Link href="https://hits.seeyoufarm.com">
        <img
          src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fframist.github.io%2Fsafc%2F&count_bg=%23E83E8C&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=views&edge_flat=true"
          alt="SAFC views"
          title="SAFC views"
        />
      </Link>
    </div>
  )
} 