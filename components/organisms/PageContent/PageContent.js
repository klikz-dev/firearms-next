import Hero from './Hero'
import IconGroup from './IconGroup'
import LatestPosts from './LatestPosts'
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

          default:
            return <div key={index}></div>
        }
      })}
    </>
  )
}
