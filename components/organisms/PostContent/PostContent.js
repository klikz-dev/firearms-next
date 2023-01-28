import PostInnerMenu from '@/components/molecules/PostInnerMenu'
import convertToSlug from '@/functions/convertToSlug'
import AmazonProduct from './AmazonProduct'
import CTA from './CTA'
import FAQ from './FAQ'
import FeatureList from './FeatureList'
import Heading from './Heading'
import PostImage from './Image'
import PerformanceScoreboard from './PerformanceScoreboard'
import Table from './Table'
import Text from './Text'
import Youtube from './Youtube'

export default function PostContent({ contents }) {
  const menus = contents
    .filter(
      (content) => content.__typename === 'Post_Postcontent_Contents_Heading'
    )
    .map((content) => ({
      id: convertToSlug(content.text),
      label: content.text,
    }))

  return (
    <>
      {menus?.length > 0 && <PostInnerMenu menus={menus} />}

      {contents?.map((section, index) => {
        switch (section.__typename) {
          case 'Post_Postcontent_Contents_Heading':
            return <Heading key={index} {...section} />

          case 'Post_Postcontent_Contents_Text':
            return <Text key={index} {...section} />

          case 'Post_Postcontent_Contents_Image':
            return <PostImage key={index} {...section} />

          case 'Post_Postcontent_Contents_Table':
            return <Table key={index} {...section} />

          case 'Post_Postcontent_Contents_PerformanceScoreboard':
            return <PerformanceScoreboard key={index} {...section} />

          case 'Post_Postcontent_Contents_Youtube':
            return <Youtube key={index} {...section} />

          case 'Post_Postcontent_Contents_Cta':
            return <CTA key={index} {...section} />

          case 'Post_Postcontent_Contents_AmazonProduct':
            return <AmazonProduct key={index} {...section} />

          case 'Post_Postcontent_Contents_Faq':
            return <FAQ key={index} {...section} />

          case 'Post_Postcontent_Contents_FeatureList':
            return <FeatureList key={index} {...section} />

          default:
            return <div key={index}></div>
        }
      })}
    </>
  )
}
