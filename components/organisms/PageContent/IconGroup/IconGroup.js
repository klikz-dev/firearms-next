import Container from '@/components/atoms/Container'
import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import Title from '@/components/molecules/Title'
import classNames from 'classnames'

export default function IconGroup({ title, icon, columns, style }) {
  const { grayBackground, paddingBottom, paddingTop } = style ?? {}

  return (
    <div
      className={classNames(
        'py-10 lg:py-20',
        grayBackground && 'bg-zinc-200/60',
        `pt-${paddingTop / 2} lg:pt-${paddingTop} pb-${
          paddingBottom / 2
        } lg:pb-${paddingBottom}`
      )}
    >
      <Container>
        <div className={'text-center'}>
          <Title className={'mb-12'}>
            <h2>{title}</h2>
          </Title>
        </div>

        <div
          className={classNames(
            `grid grid-cols-2 lg:grid-cols-${columns} gap-3`
          )}
        >
          {icon?.map((icon, index) => (
            <Link key={index} href={icon.link} className={'border-t border-b'}>
              <div
                className={
                  'h-full p-4 lg:p-8 flex flex-col justify-center items-center bg-white border-t border-b-8 border-white hover:border-red-700 hover:shadow-lg'
                }
              >
                <div className={'relative'}>
                  <Image
                    src={icon.image?.sourceUrl}
                    width={icon.image?.mediaDetails?.width || 80}
                    height={icon.image?.mediaDetails?.height || 80}
                    alt={icon.image?.altText}
                    className={'object-contain'}
                  />
                </div>

                {icon.label && <h5 className={'mt-3 mb-1'}>{icon.label}</h5>}

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
