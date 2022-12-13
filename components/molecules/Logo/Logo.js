import Image from '@/components/atoms/Image'

export default function Logo() {
  return (
    <Image
      className={'w-full'}
      src={'/images/logo.png'}
      width={200}
      height={100}
      alt={'American Firearms'}
    />
  )
}
