import { classNames } from "@utils/constants"

export const Tabs = ({
  tabs,
  onTabClick,
  indexSelected
}: {
  tabs: string[]
  onTabClick: (index: number) => void
  indexSelected: number
}) => {
  return (
    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => onTabClick(i)}
          className={classNames(
            indexSelected === i
              ? "border-brand-green text-black"
              : "border-transparent text-gray-600 hover:text-gray-800",
            "whitespace-nowrap border-b-4 px-1 py-4 font-semibold text-md"
          )}>
          {tab}
        </button>
      ))}
    </nav>
  )
}
