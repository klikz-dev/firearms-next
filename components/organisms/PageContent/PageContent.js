import Authors from './Authors'
import Hero from './Hero'
import IconGroup from './IconGroup'
import IconHighlights from './IconHighlights'
import LatestPosts from './LatestPosts'
import Text from './Text'
import TwoColImageText from './TwoColImageText'

export default function PageContent({ content }) {
  return (
    <>
      {content?.map((section, index) => {
        switch (section?.__typename) {
          case 'Page_Pagecontent_Content_Hero':
            return <Hero key={index} {...section} />

          case 'Page_Pagecontent_Content_LatestPosts':
            return <LatestPosts key={index} {...section} />

          case 'Page_Pagecontent_Content_2ColImageText':
            return <TwoColImageText key={index} {...section} />

          case 'Page_Pagecontent_Content_IconGroup':
            return <IconGroup key={index} {...section} />

          case 'Page_Pagecontent_Content_Text':
            return <Text key={index} {...section} />

          case 'Page_Pagecontent_Content_IconHighlights':
            return <IconHighlights key={index} {...section} />

          case 'Page_Pagecontent_Content_Authors':
            return <Authors key={index} {...section} />

          default:
            return <div key={index}></div>
        }
      })}
    </>
  )
}
