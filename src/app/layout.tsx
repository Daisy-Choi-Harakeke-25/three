"use client"
import './globals.css'
import Nav from '../components/Nav'


const Layout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <title>ThreeBarFifty</title>

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        
        <footer className='text-center'>
          <p>© 2025 Daisy Choi</p>
        </footer>
      </body>
    </html>
  )
}

export default Layout