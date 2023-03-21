import Button from '@/components/atoms/Button'
import Slider from '@/components/molecules/Slider'
import Title from '@/components/molecules/Title'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import TableColumn from './TableColumn'
import TableMenu from './TableMenu'

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

  const slides = tables?.map((table, index) => (
    <TableColumn key={index} {...table} />
  ))

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
          <TableMenu productSlug={tables?.[0]?.cta?.productSlug} />
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
