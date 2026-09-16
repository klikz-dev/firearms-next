import { useEffect, useRef, useState } from 'react'

const SWIPE_THRESHOLD = 40

/**
 * Minimal horizontal slider. Measures its own width, supports a gap between
 * slides and swipe navigation on touch devices.
 */
export default function Slider({
  currentSlide = 0,
  slidesPerView = 1,
  slides = [],
  gap = 24,
  onPrev,
  onNext,
}) {
  const ref = useRef(null)
  const touchStart = useRef(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const update = () => setWidth(el.offsetWidth)
    update()

    const observer =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null
    observer?.observe(el)
    window.addEventListener('resize', update)

    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  const perView = Math.max(1, slidesPerView)
  const step = width > 0 ? (width + gap) / perView : 0
  const slideWidth = step > 0 ? `${step - gap}px` : `${100 / perView}%`

  const handleTouchStart = (event) => {
    touchStart.current = event.touches[0]?.clientX ?? null
  }

  const handleTouchEnd = (event) => {
    if (touchStart.current === null) return
    const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStart.current
    touchStart.current = null

    if (delta <= -SWIPE_THRESHOLD) onNext?.()
    if (delta >= SWIPE_THRESHOLD) onPrev?.()
  }

  return (
    <div
      ref={ref}
      className={'w-full overflow-hidden'}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={'flex transition-transform ease-out duration-300'}
        style={{
          gap: `${gap}px`,
          transform: `translateX(-${currentSlide * step}px)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={'flex-shrink-0'}
            style={{ width: slideWidth }}
          >
            {slide}
          </div>
        ))}
      </div>
    </div>
  )
}
