// This file show quick environmental details at the bottom of the product catalog page in shein.com.

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
    <div className="bg-green-700 p-2 rounded-md w-full h-12 flex justify-center items-center z-10">
        {/* ! No idea why but when the text is not text-sm, not showing */}
      <p className="text-white text-sm text-center align-middle">Some environment information</p>
    </div>
  )
}

export default ProductCatalogQuick
