'use client'
import './styles/globals.css'
import Nav from '../components/Nav'
import Footer from '@/components/Footer'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Nav /> 
        <main>{children}</main>
        <footer className="text-center">
          <Footer />
          <p>© 2025 Daisy Choi</p>
        </footer>
      </body>
    </html>
  )
}

export default Layout
