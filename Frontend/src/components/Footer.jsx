import React from 'react'

export default function Footer() {
  return (
      <footer className="bg-gray-100 text-gray-600 py-4 border-t ">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
              <p>&copy; {new Date().getFullYear()} SC Partners. All rights reserved.</p>
              <div className="flex space-x-4 mt-2 md:mt-0">
                  <a href="#" className="hover:text-green-600 transition">Privacy Policy</a>
                  <a href="#" className="hover:text-green-600 transition">Terms of Service</a>
              </div>
          </div>
      </footer>
  )
}
