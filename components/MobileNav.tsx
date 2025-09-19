"use client"

import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import Image from "next/image"
import Link from "next/link"
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Footer from './Footer'

const MobileNav =  ({ user }: MobileNavProps) => {
   
    const pathname = usePathname();
  return (
    <div className="w-fulll !max-w-[164px]">
        <Sheet>
  <SheetTrigger>
    <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
 </SheetTrigger>
  <SheetContent  side="left" className="border-none bg-white">

 <div className="mobilenav-sheet">
    <nav className="flex flex-col gap-4">
         <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
          <Image
            src="/icons/logo.jpg"
            width={50}
            height={50}
            alt="Horizon logo" 
             className="brown-600"/>
            <h1 className="text-[26px] font-ibm-plex-serif font-bold text-black-1"><span className='text-brown-600'>KIWI</span>BANK</h1>
        </Link>


        {sidebarLinks.map((item) =>{ 
         const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
          return(
             <SheetClose asChild key={item.route}>
                 <Link href={item.route} key={item.label} 
            className={cn('mobilenav-link', { 'bg-bank-gradient': isActive })}>
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
            <p className={cn("text-16 font-semibold text-black-2", { "!text-white": isActive })}>{item.label}</p>
          </Link>
             </SheetClose>
         
        )})}
      </nav>

      <Footer user={user} type="mobile"/>
 </div>
   
   
  </SheetContent>
</Sheet>
    </div>
  )
}

export default MobileNav