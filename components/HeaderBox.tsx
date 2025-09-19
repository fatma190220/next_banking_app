const HeaderBox = ({ type = "title", title, subtext, user }: HeaderBoxProps) => {
  return (
    <div className="flex flex-col gap-2 mb-8">
     <h1 className="text-[24px] lg:text-[30px] font-semibold text-gray-900">

        {title}
        {type === 'greeting' && (
          <span className="text-bankGradient">
            &nbsp;{user}
          </span>
        )}
      </h1>
      <p className="text-[18px] lg:text-[20px] font-normal text-gray-600">
        {subtext}
      </p>
    </div>
  )
}

export default HeaderBox