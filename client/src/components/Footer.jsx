import React from 'react'
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-700 via-green-800 to-green-900 text-white p-6 mt-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <h3 className="text-lg font-bold mb-3 md:mb-0">📞 ബന്ധപ്പെടുക</h3>
        
        <div className="space-y-2 text-center md:text-left">
          <p className="flex items-center justify-center md:justify-start gap-2">
            <FaPhoneAlt className="text-green-300" />
            <a 
              href="tel:+919747785512" 
              className="underline hover:text-green-300 transition-colors"
            >
              +91 97477 85512
            </a>
          </p>

          <p className="flex items-center justify-center md:justify-start gap-2">
            <FaWhatsapp className="text-green-300" />
            <a
              href="https://wa.me/919747785512"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-green-300 transition-colors"
            >
              +91 97477 85512
            </a>
          </p>
        </div>
      </div>

      <p className="text-center text-sm mt-6 opacity-80">
        © 2025 Copyright. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
