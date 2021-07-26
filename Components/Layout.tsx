import React from 'react'
import styles from '../styles/Layout.module.css'
import Header from './Header'
import Meta from './Meta'
import CowingtonNavbar from './Nav'
import NewNavbar from './NewNavbar'
export const Layout = ({ children }) => {
    return (
        <>
            <Meta />
            {/* <CowingtonNavbar /> */}
            <NewNavbar></NewNavbar>
            <div className={styles.container}>
                <main className={styles.main}>
                    {/* <Header /> */}
                    {children}
                </main>
            </div>
            {/* <Footer></Footer> */}
            {/* <Footer></Footer> */}
        </>
    )
}
export default Layout
