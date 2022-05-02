import Link from 'next/link'
import useAuth from '../hooks/useAuth'
import { BellIcon, SearchIcon } from '@heroicons/react/solid'
import { useState, useEffect } from 'react'
import BasicMenu from './BasicMenu'

function Header() {
  // manages scrollbar
  const [isScrolled, setIsScrolled] = useState(false)
  const { logout } = useAuth()

  /** This will ONLY run when the header mounts (run on a single mount) **/
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={`${isScrolled && 'bg-[#141414]'}`}>
      {/* Left Side */}
      <div className="flex items-center space-x-2 md:space-x-10">
        {/* LOGO */}
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />

        {/* Menu bar for smaller devices */}
        <BasicMenu />

        {/* Links */}
        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">TV</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4 text-sm font-light">
        {/* Icons */}
        <SearchIcon className="hidden h-6 w-6 sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6" />

        {/* Account icon */}
        <Link href="/account">
          <img
            src="https://rb.gy/g1pwyx"
            alt=""
            // onClick={logout}
            className="cursor-pointer rounded"
          />
        </Link>
      </div>
    </header>
  )
}

export default Header
