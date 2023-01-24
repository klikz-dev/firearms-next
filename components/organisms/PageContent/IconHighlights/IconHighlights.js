import Container from '@/components/atoms/Container'
import Image from '@/components/atoms/Image'
import Title from '@/components/molecules/Title'
import classNames from 'classnames'

export default function IconHighlights({ title, icons, style }) {
  const { grayBackground, paddingBottom, paddingTop } = style ?? {}

  return (
    <div
      className={classNames(
        grayBackground && 'bg-zinc-200/60',
        `pt-${paddingTop / 2} lg:pt-${paddingTop} pb-${
          paddingBottom / 2
        } lg:pb-${paddingBottom}`
      )}
    >
      <Container className={'text-center'}>
        <Title className={'mb-12'}>
          <h2>{title}</h2>
        </Title>

        <div className={'grid lg:grid-cols-3 gap-24 lg:gap-4 pt-16'}>
          {icons?.map((icon, index) => (
            <div
              key={index}
              className={
                'h-full p-8 flex flex-col justify-center items-center border border-red-600 relative'
              }
            >
              <div className={'absolute -top-20 bg-white'}>
                <Image
                  src={icon.icon?.sourceUrl}
                  width={icon.icon?.mediaDetails?.width || 140}
                  height={icon.icon?.mediaDetails?.height || 140}
                  alt={icon.icon?.altText}
                  className={'object-contain'}
                />
              </div>

              {icon.label && (
                <h3 className={'mt-8 text-5xl mb-4'}>{icon.label}</h3>
              )}

              {icon.text && (
                <h5 className={'text-gray-600 font-normal'}>{icon.text}</h5>
              )}
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
