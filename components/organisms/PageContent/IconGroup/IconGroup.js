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
        grayBackground && 'bg-zinc-200/60',
        paddingTop > 19 && `pt-10 lg:pt-20`,
        paddingTop > 9 && paddingTop < 20 && `pt-5 lg:pt-10`,
        paddingTop < 10 && `pt-2 lg:pt-4`,
        paddingBottom > 19 && `pb-10 lg:pb-20`,
        paddingBottom > 9 && paddingBottom < 20 && `pb-5 lg:pb-10`,
        paddingBottom < 10 && `pb-2 lg:pb-4`
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
            columns == 5 && 'lg:grid-cols-5',
            columns == 4 && 'lg:grid-cols-4',
            columns == 3 && 'lg:grid-cols-3',
            `grid grid-cols-2 gap-3`
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
