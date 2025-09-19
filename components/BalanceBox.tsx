import DoughnutChart from "./DoughnutChart";
import AnimatedCounter from "./AnimatedCounter"



const BalanceBox = ({
  accounts = [], totalBanks, totalCurrentBalance
}: TotalBalanceBoxProps) => {
  return (
    <section className="w-full flex gap-5 items-center  bg-white p-6 rounded-lg shadow-chart mb-8">
      <div >
         <DoughnutChart accounts={accounts}/>

      </div>

      <div className="flex flex-col gap-6">
        <h2 className="header-2">
          Bank Accounts: {totalBanks}
        </h2>
        <div className="flex flex-col gap-2">
          <p className="total-balance-label">
            Total Current Balance
          </p>

          <div className="total-balance-amount flex-center gap-2">
           <AnimatedCounter amount={totalCurrentBalance} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default BalanceBox