import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import logo from '@/images/logo.png'

export default function Logo() {
  return (
    <div className={'w-48'}>
      <Link href={'/'}>
        <Image src={logo} alt={'American Firearms'} />
      </Link>
    </div>
  )
}
