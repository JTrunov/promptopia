import '@styles/globals.css'
import {  ReactNode } from 'react'

export const metadata = {
  title: 'Promptopia',
  description: 'Discover & share AI prompts'
}

const RootLayout = ({children}: {children: ReactNode}) => {
  return (
    <html lang='en'>
      <body>
        <div className='main'>
          <div className='gradient' />
        </div>
        <main className='app'>
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout