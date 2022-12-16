import classNames from 'classnames'
import styles from './HTMLContent.module.scss'

export default function HTMLContent({ children, className }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: children }}
      className={classNames(styles.root, className)}
    />
  )
}
