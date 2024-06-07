// This file show the grading image of the product catalog page in shein.com.
import gradingBad from "data-base64:~_assets/grading/bad.png"
import cssText from "data-text:~_styles/style.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchorList } from "plasmo"

import { usePort } from "@plasmohq/messaging/hook"

export const config: PlasmoCSConfig = {
  matches: ["https://sg.shein.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getInlineAnchorList: PlasmoGetInlineAnchorList = () =>
  document.querySelectorAll("div.crop-image-container>div")

const ProductCatalogGrading = () => {
  const openProductDetailModalPort = usePort("openProductDetailModal")

  async function handleGradingClick() {
    console.log("sending command")
    // Should open grading modal in productDetailModal
    openProductDetailModalPort.send({
      productId: "world from grading"
    })
  }

  return (
    <button
      className="bg-transparent h-16 w-16 rounded-full absolute top-0 right-0 m-4 z-50"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()

        handleGradingClick()
      }}>
      <img src={gradingBad} alt="grading" />
    </button>
  )
}

export default ProductCatalogGrading
