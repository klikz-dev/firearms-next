import Title from '@/components/molecules/Title'
import convertToSlug from '@/functions/convertToSlug'

export default function Heading({ text }) {
  return (
    <div className={'mt-12 mb-4'} id={convertToSlug(text)}>
      <Title>
        <h2>{text}</h2>
      </Title>
    </div>
  )
}
