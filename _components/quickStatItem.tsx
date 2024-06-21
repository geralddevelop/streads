import { classNames } from "@utils/constants"

export const QuickStatItem = ({
  title,
  status
}: {
  title: string
  status: "good" | "bad"
}) => {
  return (
    <div
      className={classNames(
        status === "good"
          ? "border-white text-white"
          : "border-brand-red text-brand-red",
        "p-1 px-2 rounded-3xl flex justify-center items-center z-10 border-2 font-semibold"
      )}>
      {/* ! No idea why but when the text is not text-sm, not showing */}
      <p className="text-[10px] text-center align-middle">{title}</p>
    </div>
  )
}
