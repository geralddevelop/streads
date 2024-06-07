// This file show quick environmental details at the bottom of the product catalog page in shein.com.

import { classNames } from "@utils/constants"
import cssText from "data-text:~_styles/style.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchorList } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://sg.shein.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getInlineAnchorList: PlasmoGetInlineAnchorList = () =>
  document.querySelectorAll("div.product-card__bottom-wrapper")

const ProductCatalogQuick = () => {
  return (
    <div className="grid grid-cols-3 gap-2">
      <QuickItem title="Chemical Free" status="good" />
      <QuickItem title="No Eco Packaging" status="bad" />
      <QuickItem title="13.66KG C02" status="bad" />
    </div>
  )
}

const QuickItem = ({
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
          ? "border-green-800 text-green-800"
          : "border-red-800 text-red-800",
        "p-2 rounded-3xl w-full h-12 flex justify-center items-center z-10 border-green-800 border-2"
      )}>
      {/* ! No idea why but when the text is not text-sm, not showing */}
      <p className="text-sm text-center align-middle">{title}</p>
    </div>
  )
}

export default ProductCatalogQuick
