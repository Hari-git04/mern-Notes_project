import React from 'react'
import { PlusIcon } from 'lucide-react'
import { Link } from 'react-router'

function Navbar() {
  return (
    <nav className="navbar shadow-[0_4px_24px_0_rgba(255,255,255,0.4)] px-4 md:px-8">
      <div className="flex w-full items-center justify-between">
        {/* Left: Logo/Brand */}
        <a className="text-xl font-bold tracking-tight px-2 md:px-12 mx-2 md:mx-8 pr-2 md:pr-8 text-green-500 whitespace-nowrap">
          NOTEBoard
        </a>
        {/* Right: Create Button */}
        <Link
          to="/create"
          className="btn px-4 md:px-6 mx-2 md:mx-8 bg-green-500 text-black hover:text-white hover:bg-green-500 flex items-center gap-2 min-w-fit"
        >
          <PlusIcon className="size-5" />
          <span className="hidden sm:inline">Create Note</span>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar