export default function Slider({
  sliderRef,
  currentSlide,
  slideWidth,
  slidesPerView,
  slides,
}) {
  return (
    <div className={'w-full overflow-hidden'} ref={sliderRef}>
      <div
        className={'flex transition ease-out duration-200'}
        style={{
          transform: `translateX(-${
            (currentSlide * slideWidth) / slidesPerView
          }px)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={'flex-shrink-0'}
            style={{
              width: `${slideWidth / slidesPerView}px`,
            }}
          >
            {slide}
          </div>
        ))}
      </div>
    </div>
  )
}
