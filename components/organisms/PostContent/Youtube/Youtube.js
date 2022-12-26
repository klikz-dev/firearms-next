export default function Youtube({ url }) {
  return (
    <div className='relative mb-8' style={{ paddingTop: '56.25%' }}>
      {url && (
        <iframe
          width='100%'
          height='100%'
          src={url.replace('watch?v=', 'embed/')}
          frameBorder='0'
          allow='accelerometer; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          className='absolute left-0 top-0'
        />
      )}
    </div>
  )
}
