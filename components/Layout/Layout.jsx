import React from 'react'
import TopNavigation from '../TopNavigation/Navigation'
import Footer from '../Footer/Footer'

const Layout = ({children}) => {
  return (
    <>
    <TopNavigation />
    {children}
    <Footer />
    </>
  )
}

export default Layout