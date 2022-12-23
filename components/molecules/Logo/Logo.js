import Image from '@/components/atoms/Image'
import logo from '@/images/logo.png'

export default function Logo() {
  return (
    <div className={'w-48'}>
      <Image src={logo} alt={'American Firearms'} />
    </div>
  )
}
