import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-green-700 py-4 mt-auto">
      <div
        className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4"
      >
       
        <div
          className="flex flex-wrap justify-center md:justify-start mb-4 md:mb-0"
        >
          <ul className="flex space-x-4">
            <li><Link href="/properties.html" className="text-white font-semibold">Properties</Link></li>
            <li><Link href="/terms.html" className="text-white font-semibold">Terms of Service</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm text-white font-semibold mt-2 md:mt-0">
            &copy; 2024 Sikkim HomeStay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer