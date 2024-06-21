import { SustainableChart } from "@components/sustainableRating"
import { classNames } from "@utils/constants"

export const ClothingItem = ({
  name,
  imageSrc,
  brand,
  labels,
  price,
  link,
  sustainableScoring,
  haveDividerBelow,
  showScoringOnImage,
  clickable = true
}: {
  name: string
  imageSrc: string
  brand?: string
  labels?: string[]
  price?: number
  link?: string
  sustainableScoring?: number
  haveDividerBelow?: boolean
  showScoringOnImage?: boolean
  clickable?: boolean
}) => {
  return (
    <div
      className={classNames(
        clickable ? "cursor-pointer hover:brightness-95" : "",
        "rounded-md text-left"
      )}
      onClick={() => {
        if (link === undefined) return
        window.open(link, "_blank")
      }}>
      <div className="flex gap-8">
        <img src={imageSrc} width={"100"} className="rounded-md mt-4 max-h-48" alt={name} />

        <div className="flex flex-col gap-6">
          <div>
            <p className="text-md">{name}</p>
            {brand && <p className="font-semibold text-sm">{brand}</p>}
          </div>

          {sustainableScoring && !showScoringOnImage && (
            <SustainableChart score={sustainableScoring} />
          )}

          <div className="flex gap-1 flex-wrap">
            {labels?.map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-800">
                {label}
              </span>
            ))}
          </div>

          {price && <p className="font-semibold text-lg">${price}</p>}
        </div>
      </div>
      {haveDividerBelow && (
        <div
          style={{
            height: "1px"
          }}
          className="w-full bg-gray-200 my-4"
        />
      )}
    </div>
  )
}
