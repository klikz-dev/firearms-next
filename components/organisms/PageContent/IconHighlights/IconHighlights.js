import Container from '@/components/atoms/Container'
import Image from '@/components/atoms/Image'
import Title from '@/components/molecules/Title'

export default function IconHighlights({ title, icons }) {
  return (
    <div className={'py-20'}>
      <Container className={'text-center'}>
        <Title className={'mb-12'}>
          <h2>{title}</h2>
        </Title>

        <div className={'grid grid-cols-3 gap-3 pt-16'}>
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
