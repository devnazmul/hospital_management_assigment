export default function ViewTableRow({ title, value }) {
  return (
    <div className={`flex items-start gap-x-2`}>
      <div className={`flex flex-col`}>
        <span className={`font-normal text-primary text-sm`}>{title}</span>
        <span className={`font-bold`}>{value}</span>
      </div>
    </div>
  );
}
