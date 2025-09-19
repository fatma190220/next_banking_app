
import Image from 'next/image'
import React from 'react'
import BankCard from './BankCard'
import Link from 'next/link'

const Rightbar = ({user, transactions, banks}: RightSidebarProps) => {
  return (
   <aside className="right-sidebar">
      <section className="flex flex-col pb-8">
        <div className="h-[120px] w-full bg-gradient-mesh bg-cover bg-no-repeat" />
        <div className="relative flex px-6 max-xl:justify-center">
          <div className="flex-center absolute -top-10 p-[28px] rounded-full bg-gray-100 border-7 border-brown-100  shadow-profile">
            <span className="text-5xl font-bold text-brown-500">{user?.firstName[0]}</span>
          </div>

          <div className="flex flex-col mt-[100px] gap-2">
            <h1 className='text-[24px] font-semibold text-gray-900'>
              {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-[16px] font-normal text-gray-600">
             fatma@gmaol
            </p>
          </div>
        </div>
      </section>

      <section className="ml-4">
         <div className="flex w-full justify-between">
  <h2 className="text-lg font-semibold text-gray-800">My Banks</h2>
  <Link href="/" className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700">
    <Image 
      src="/icons/plus.svg"
      width={20}
      height={20} 
      alt="plus"
    />
    <span>Add Bank</span>
  </Link>
</div>


         {banks?.length > 0 && (
                  <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
                    <div className='relative z-10'>
                      <BankCard 
                        key={banks[0].$id}
                        account={banks[0]}
                        userName={`${user.firstName} ${user.lastName}`}
                        showBalance={false}
                      />
                    </div>
                    {banks[1] && (
                      <div className="absolute right-0 top-8 z-0 w-[90%]">
                        <BankCard 
                          key={banks[1].$id}
                          account={banks[1]}
                          userName={`${user.firstName} ${user.lastName}`}
                          showBalance={false}
                        />
                      </div>
                    )}
                  </div>
                )}
      </section>
</aside>
  )
}

export default Rightbar