import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'

export default function Logo() {
  return (
    <div className={'w-48'}>
      <Link href={'/'}>
        <Image
          src='/images/logo.png'
          width={330}
          height={129}
          alt={'American Firearms'}
        />
      </Link>
    </div>
  )
}
