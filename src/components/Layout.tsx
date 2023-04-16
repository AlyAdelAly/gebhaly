import React, { PropsWithChildren } from 'react'
import NavBar from './Navbar'

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <NavBar />
            {children}
        </>
    )
}

export default Layout