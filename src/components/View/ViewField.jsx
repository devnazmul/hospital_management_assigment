export default function ViewField({ Icon, title, value, dataAuto }) {
  return (
    <div className={`flex items-start gap-x-2`}>
      {!!Icon && (
        <div
          className={`flex justify-center items-center w-10 h-10 rounded-full bg-primary-content`}
        >
          <Icon className={`text-lg text-primary`} />
        </div>
      )}
      <div className={`flex flex-col ${Icon ? "w-[calc(100%-2.5rem)]" : ""} `}>
        <span
          data-auto={`title-${dataAuto}`}
          className={`font-normal text-gray-400 text-sm`}
        >
          {title}
        </span>
        <span data-auto={`value-${dataAuto}`} className={`font-bold`}>
          {value}
        </span>
      </div>
    </div>
  );
}
