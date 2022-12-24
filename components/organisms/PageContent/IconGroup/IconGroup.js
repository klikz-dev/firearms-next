import Container from '@/components/atoms/Container'
import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import Title from '@/components/molecules/Title'

export default function IconGroup({ title, icon }) {
  return (
    <div className={'bg-zinc-200/60 py-20'}>
      <Container>
        <Title className={'mb-12'}>
          <h3>{title}</h3>
        </Title>

        <div className={'grid grid-cols-5 gap-3'}>
          {icon?.map((icon, index) => (
            <Link key={index} href={icon.link} className={'border-t border-b'}>
              <div
                className={
                  'h-full p-8 flex flex-col justify-center items-center bg-white border-t border-b-8 border-white hover:border-red-700 hover:shadow-lg'
                }
              >
                <div className={'relative rounded-full overflow-hidden'}>
                  <Image
                    src={icon.image?.sourceUrl}
                    width={icon.image?.mediaDetails?.width}
                    height={icon.image?.mediaDetails?.height}
                    alt={icon.image?.altText}
                    className={'object-contain'}
                  />
                </div>

                {icon.label && <h6 className={'my-3'}>{icon.label}</h6>}

                {icon.text && (
                  <p className={'text-xs text-gray-600'}>{icon.text}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  )
}
