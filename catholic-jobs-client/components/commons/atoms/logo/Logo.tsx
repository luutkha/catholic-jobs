import classNames from 'classnames'
import { Color } from '../../../../constants/common'
import styles from './Logo.module.css'

const { container, logoTitleClass, quoteClass } = styles
const Logo = () => {
    return (
        <div className={classNames(container)}>
            <div className={classNames(logoTitleClass)}>KHA<span style={{ color: Color.DEFAULT_PRIMARY_COLOR }}>TL</span></div>
            <div className={classNames(quoteClass)}>Just a normal dev</div>
        </div>
    )
}

export default Logo