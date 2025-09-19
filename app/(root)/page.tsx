import BalanceBox from '@/components/BalanceBox';
import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecentTransactions';
import Rightbar from '@/components/Rightbar';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';

import React from 'react'


const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
   const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ 
    userId: loggedIn.$id 
  })

  if(!accounts) return;
  
  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId })

  return (
     <div className='h-full flex flex-row py-4 lg:px-12 lg:py-8'>
      <div className='flex-1 pr-4 lg:pr-8 h-full overflow-y-auto'>
        <header >
      <HeaderBox 
        type="greeting"
        title="Welcome,"
  user={`${loggedIn?.firstName ?? ''} ${loggedIn?.lastName ?? ''}`.trim() || 'Guest'}
        subtext="Access and manage your account and transactions efficiently."  />

        <BalanceBox 
          accounts={accountsData} 
            totalBanks={accounts?.totalBanks || 0} 
            totalCurrentBalance={accounts?.totalCurrentBalance || 0}        
        />

       
        </header>
       <RecentTransactions accounts={accountsData} transactions={account?.transactions} appwriteItemId={appwriteItemId} page={currentPage}/>
      </div>

      <Rightbar 
        user={loggedIn } 
        transactions={account?.transactions || []} 
        banks={accountsData?.slice(0, 2) || []}
      />    
    </div>
  )
}

export default Home