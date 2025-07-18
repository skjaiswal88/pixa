import "@/app/globals.css"; // or correct relative path like "../styles/globals.css"

import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="auth">{children}</main>
  )
}

export default Layout