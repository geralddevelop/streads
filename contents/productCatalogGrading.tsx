// This file show the grading image of the product catalog page in shein.com.
import { ProductDetailModalMessage } from "@/background/ports/openProductDetailModal"
import grade1 from "data-base64:~_assets/grading/1.png"
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
// document.querySelectorAll("div.product-card__top-wrapper")

const ProductCatalogGrading = ({ anchor, i }) => {
  const openProductDetailModalPort = usePort("openProductDetailModal")
  const children =
    anchor.element.offsetParent.offsetParent.offsetParent.offsetParent
      .children[1].children
  const productKeywords = []
  for (let i = 0; i < children.length; i++) {
    productKeywords.push(...children[i].innerText.toLowerCase().split(" "))
  }

  const imageSrc =
    anchor.element.offsetParent.children[0].tagName === "SPAN"
      ? anchor.element.offsetParent.children[0].children[0].getAttribute("src")
      : ""

  async function handleGradingClick() {
    console.log("sending command")

    // Should open grading modal in productDetailModal
    openProductDetailModalPort.send({
      productId: "world from grading",
      keywords: productKeywords,
      productName: children[0].innerText ?? "Item",
      productImageSrc: imageSrc,
      productGrading: 1,
      productBrand: "SHEIN"
    } as ProductDetailModalMessage)
  }

  return (
    <button
      className="bg-transparent h-16 w-16 rounded-full m-4 absolute right-0 top-0 z-50 "
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()

        handleGradingClick()
      }}>
      <img
        className="hover:filter hover:brightness-90 transition duration-100"
        src={grade1}
        alt="grading"
      />
    </button>
  )
}

export default ProductCatalogGrading
