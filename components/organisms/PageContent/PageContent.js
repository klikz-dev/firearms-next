import Authors from './Authors'
import CategorySection from './CategorySection'
import ContactForm from './ContactForm'
import Gallery from './Gallery'
import IconGroup from './IconGroup'
import IconHighlights from './IconHighlights'
import LatestPosts from './LatestPosts'
import Taxonomy from './Taxonomy'
import Text from './Text'
import TwoColImageText from './TwoColImageText'

export default function PageContent({ content }) {
  return (
    <>
      {content?.map((section, index) => {
        switch (section?.__typename) {
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

          case 'Page_Pagecontent_Content_CategorySection':
            return <CategorySection key={index} index={index} {...section} />

          case 'Page_Pagecontent_Content_ContactForm':
            return <ContactForm key={index} {...section} />

          case 'Page_Pagecontent_Content_Taxonomy':
            return <Taxonomy key={index} {...section} />

          case 'Page_Pagecontent_Content_Gallery':
            return <Gallery key={index} {...section} />

          default:
            return <div key={index}></div>
        }
      })}
    </>
  )
}
