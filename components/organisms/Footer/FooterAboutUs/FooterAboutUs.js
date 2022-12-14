
import { socialIcons } from '@/const/setting/social'
import Link from '@/components/atoms/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function FooterAboutUs() {
  return (
    <div className="lg:w-1/4 md:w-1/2 w-full px-4 mb-10">
      <h2 className="text-black font-bold mb-3 text-lg text-left"><p className='border-y-2 border-red-700 lg:w-1/4 w-1/5'>ABOUT US</p></h2>
      <p className="text-black mt-6 text-left roboto">American Firearms was established by firearm fans for firearm fans as a modern-day take on all things that go BOOM. We’re reader-supported, which means we may earn a small part of the sale from links to any products or services on this site. You do not pay anything extra and your purchase helps support our work.
      </p>
      <div className={'flex flex-row gap-2 w-80 my-4'}>
        {socialIcons.map((social, index) => (
          <Link
            key={index}
            href={social.link}
            className={
              'w-8 h-8 rounded border border-red-800 flex flex-row justify-center items-center hover:bg-red-50'
            }
          >
            <FontAwesomeIcon
              icon={social.icon}
              className={'text-red-700'}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}