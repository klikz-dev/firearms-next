import Link from '@/components/atoms/Link'
import FooterAboutUs from '../FooterAboutUs'
import { browse, company, learn } from '@/const/setting/footer'

export default function FooterMenu() {
  const menus = [browse, company, learn]

  return (
    <div className="container px-1 pt-24 lg:pb-24 mx-auto">
      <div className="flex flex-wrap text-left order-first lg:text-sm text-xs">
        <FooterAboutUs />
        {menus.map((menu) => (
          <div className="lg:w-1/4 md:w-1/2 w-full px-4 font-bold lg:pl-24">
            <h2 className="text-black font-bold mb-3 flex align-center text-lg"><p className={menu.className}>{menu.name}</p></h2>
            <nav className="list-none mb-10">
              {menu.items?.map((item) => (
                <li key={item.name} className='pt-3'>
                  <Link href={item.href} className="text-black hover:text-gray-800">
                    {item.name}
                  </Link>
                </li>
              ))}
            </nav>
          </div>
        ))}
      </div>
    </div>
  )
}