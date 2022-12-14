import FooterCopyright from './FooterCopyright'
import FooterMenu from './FooterMenu'

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-100 oswald">
        <FooterMenu />
        <FooterCopyright />
      </footer>
    </>
  )
}
