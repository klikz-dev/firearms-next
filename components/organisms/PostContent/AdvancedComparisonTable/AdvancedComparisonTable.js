import Button from '@/components/atoms/Button'
import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import Slider from '@/components/molecules/Slider'
import Title from '@/components/molecules/Title'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import TableStats from './TableStats'

export default function AdvancedComparisonTable({ item, ctas }) {
  const sliderRef = useRef(null)

  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideWidth, setSlideWidth] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(1)

  const handleMoveLeft = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)
  }

  const handleMoveRight = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)
  }

  useEffect(() => {
    setSlideWidth(sliderRef.current.offsetWidth)
  }, [])

  useEffect(() => {
    setSlidesPerView(slideWidth > 640 ? 4 : slideWidth > 510 ? 3 : 2)
  }, [slideWidth])

  const tables = item
    .map((table) => {
      const cta = ctas?.filter(
        (cta) =>
          cta.title?.toLowerCase() === table.ctaId?.toLowerCase() &&
          cta.productSlug
      )?.[0]

      return { ...table, cta: cta }
    })
    ?.filter((table) => table.cta)

  const Table = ({ cta, award, description }) => (
    <div className={'w-full'}>
      <div className={'p-2 h-36 border'}>
        <div className={'w-full h-20 relative'}>
          <Image
            src={cta.image?.sourceUrl}
            alt={cta.image?.altText}
            layout='fill'
            className={'object-contain'}
          />
        </div>

        <Link
          href={cta.link}
          className={'text-sm text-red-700 hover:underline'}
        >
          {cta.title}
        </Link>
      </div>

      <div className='p-2 h-20 border'>
        {award === 'editors_choice' ? (
          <Image
            src={'/images/editors-choice.png'}
            alt='Badge'
            width={125}
            height={57}
          />
        ) : award === 'top_pick' ? (
          <Image
            src={'/images/top-pick.png'}
            alt='Badge'
            width={125}
            height={57}
          />
        ) : (
          <Image
            src={'/images/best-buy.png'}
            alt='Badge'
            width={125}
            height={57}
          />
        )}
      </div>

      <div className={'p-2 h-14 border'}>
        <p className='text-sm text-sky-700 line-clamp-1'>{`$${
          cta.price
        } ${cta.buttonText?.replace('View', '').trim()}`}</p>

        <Link
          href={`#${cta.productSlug}`}
          className={'text-sm underline hover:text-red-700'}
        >
          Jump to Details
        </Link>
      </div>

      <TableStats
        description={description}
        cta={cta}
        productSlug={cta.productSlug}
      />
    </div>
  )

  const TableMenu = () => (
    <div className={'border-collapse'}>
      {[
        { text: '', height: 'h-36' },
        { text: 'Awards', height: 'h-20' },
        { text: 'Price', height: 'h-14' },
        { text: 'Overall Rating', height: 'h-12' },
        { text: 'Description', height: 'h-32 sm:h-36' },
        { text: 'Rating Categories', height: 'h-16' },
        { text: 'Accuracy', height: 'h-12' },
        { text: 'Ergonomics', height: 'h-12' },
        { text: 'Features', height: 'h-12' },
        { text: 'Fit & Finish', height: 'h-12' },
        { text: 'Reliability', height: 'h-12' },
        { text: 'Value', height: 'h-12' },
      ].map((menu, index) => (
        <div
          key={index}
          className={classNames(
            menu.height,
            'w-full flex items-center bg-zinc-50 border p-2'
          )}
        >
          <p className={'text-xs text-left'}>{menu.text}</p>
        </div>
      ))}
    </div>
  )

  const slides = tables?.map((table, index) => <Table key={index} {...table} />)

  return (
    <div className={'mb-8'}>
      <div className={'flex flex-row justify-between items-center'}>
        <Title>
          <h4>Our Top Picks</h4>
        </Title>

        <p className={'text-sm font-display'}>{`Displaying ${
          currentSlide + 1
        } - ${currentSlide + slidesPerView} of ${slides.length}`}</p>

        <div>
          <Button
            color='white'
            size='icon'
            onClick={handleMoveLeft}
            disabled={currentSlide < 1}
            className={'mr-2'}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>

          <Button
            color='white'
            size='icon'
            onClick={handleMoveRight}
            disabled={currentSlide > slides.length - 1 - slidesPerView}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </div>
      </div>

      <div className={'flex flex-row'}>
        <div className={'w-28'}>
          <TableMenu />
        </div>

        <Slider
          sliderRef={sliderRef}
          currentSlide={currentSlide}
          slideWidth={slideWidth}
          slidesPerView={slidesPerView}
          slides={slides}
        />
      </div>
    </div>
  )
}
