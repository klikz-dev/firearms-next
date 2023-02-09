import classNames from 'classnames'
import styles from './HTMLContent.module.scss'
import parse, { attributesToProps, domToReact } from 'html-react-parser'

export default function HTMLContent({ children, className }) {
  const options = {
    replace: (domNode) => {
      if (domNode.attribs && domNode.name === 'a') {
        const props = attributesToProps(domNode.attribs)
        return (
          <a {...props} target='_blank' rel='noreferrer'>
            {domToReact(domNode.children, options)}
          </a>
        )
      }
    },
  }

  const html = parse(children, options)

  return <div className={classNames(styles.root, className)}>{html}</div>
}
