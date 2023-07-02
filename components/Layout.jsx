import React from 'react'

const Layout = ({children}) => {
  return (
    <div className='max-w-3xl mx-auto mt-10 bg-gradient grid lg:grid-cols-2'>
      <div></div>
      <div>
      {children}
      </div>
    </div>
  )
}

export default Layout