import React from 'react'
import headerStyles from '../styles/Header.module.css'
const Header = () => {
    return (
        <div>
            <h1 className={headerStyles.title}>
                <span>
                    <span>Cow</span> News
                </span>
            </h1>
            <p className={headerStyles.description}>
                Keep up to date with the latest cow news.
            </p>
        </div>
    )
}
export default Header
