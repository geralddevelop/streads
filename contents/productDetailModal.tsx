import cssText from "data-text:~_styles/style.css"
import { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import React from "react"

import { usePort } from "@plasmohq/messaging/hook"

export const config: PlasmoCSConfig = {
  matches: ["https://sg.shein.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector("div.product-card__bottom-wrapper")

const ProductDetailModal = () => {
  const [show, setShow] = React.useState(false)
  const openProductDetailModalPort = usePort("openProductDetailModal")

  React.useEffect(() => {
    openProductDetailModalPort.listen(async (msg) => {
      console.log("ProductDetailModal")
      console.log("msg", msg)

      setShow(true)
    })
  })

  if (show) {
    return (
      <div className="bg-purple-500 p-2 rounded-md w-full h-12 flex justify-center items-center">
        {/* ! No idea why but when the text is not text-sm, not showing */}
        <p className="text-white text-sm text-center align-middle">
          This is just some stuff
        </p>
      </div>
    )
  } else {
    return <></>
  }
}

export default ProductDetailModal
