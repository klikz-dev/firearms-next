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
                  'p-8 flex flex-col justify-center items-center bg-white border-t border-b-8 border-white hover:border-red-700 hover:shadow-lg'
                }
              >
                <div
                  className={
                    'relative w-32 h-32 mb-3 rounded-full overflow-hidden'
                  }
                >
                  <Image
                    src={icon.image?.sourceUrl}
                    fill={true}
                    cover={true}
                    alt={icon.image?.altText}
                  />
                </div>

                <h6>{icon.label}</h6>
                <p className={'text-xs text-gray-600'}>{icon.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  )
}
