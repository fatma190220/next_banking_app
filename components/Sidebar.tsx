"use client"
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Footer from './Footer'
import PlaidLink from './PlaidLink'

const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();
  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
          <Image
            src="/icons/logo.jpg"
            width={50}
            height={50}
            alt="kiwi logo" 
             className="brown-600"/>
            <h1 className="sidebar-logo"><span className='text-brown-600'>KIWI</span>BANK</h1>
        </Link>

        {sidebarLinks.map((item) =>{ 
         const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
          return(
          <Link href={item.route} key={item.label} 
            className={cn('sidebar-link', { 'bg-bank-gradient': isActive })}>
            <div className="relative ">
              <Image 
                src={item.imgURL}
                alt={item.label}
                width={24}
                height={24}
                 className={cn({
                    'brightness-[4] invert-0': isActive
                  })}
              />
            </div>
            <p className={cn("sidebar-label", { "!text-white": isActive })}>{item.label}</p>
          </Link>
        )})}

        <PlaidLink user={user}/>
      </nav>

      <Footer user={user} />
    </section>
  )
}

export default Sidebar