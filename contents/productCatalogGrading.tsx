// This file show the grading image of the product catalog page in shein.com.
import { ProductDetailModalMessage } from "@/background/ports/openProductDetailModal"
import { getRandomInt, getRandomWeighted } from "@utils/functions"
import grade1 from "data-base64:~_assets/grading/1.png"
import grade2 from "data-base64:~_assets/grading/2.png"
import grade3 from "data-base64:~_assets/grading/3.png"
import grade4 from "data-base64:~_assets/grading/4.png"
import grade5 from "data-base64:~_assets/grading/5.png"
import cssText from "data-text:~_styles/style.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchorList } from "plasmo"
import { useState } from "react"

import { usePort } from "@plasmohq/messaging/hook"

export const config: PlasmoCSConfig = {
  matches: ["https://sg.shein.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

let count = 12

export const getInlineAnchorList: PlasmoGetInlineAnchorList = () =>
  document.querySelectorAll("div.crop-image-container>div")
// document.querySelectorAll("section.product-card")

const ProductCatalogGrading = ({ anchor }) => {
  // ! THIS IS A BUG, NEED TO GET ONLY THE FIRST ITEM.
  if (
    anchor.element.offsetParent.getAttribute("style") !==
      "padding-bottom:calc(1.33 * 100%);" &&
    count > 0
  ) {
    count = count - 1
    return null
  }

  const openProductDetailModalPort = usePort("openProductDetailModal")
  const [grading] = useState(
    getRandomWeighted([
      { value: 1, weight: 5 },
      { value: 2, weight: 3 },
      { value: 3, weight: 1 },
      { value: 4, weight: 0.5 },
      { value: 5, weight: 0.5 }
    ])
  )

  const children =
    anchor.element.offsetParent.offsetParent.offsetParent.offsetParent
      .children[1].children
  const productKeywords = []
  for (let i = 0; i < children.length; i++) {
    productKeywords.push(...children[i].innerText.toLowerCase().split(" "))
  }

  // This is a bug, image hidden behind image.
  const imageSrc =
    anchor.element.offsetParent.children[0].tagName === "SPAN"
      ? anchor.element.offsetParent.children[0].children[0].getAttribute("src")
      : anchor.element.offsetParent.children[0].tagName === "IMG"
        ? anchor.element.offsetParent.children[0].getAttribute("src")
        : ""

  async function handleGradingClick() {
    console.log("sending command")
    console.log(imageSrc)
    // Should open grading modal in productDetailModal
    openProductDetailModalPort.send({
      productId: "world from grading",
      keywords: productKeywords,
      productName: children[0].innerText ?? "Item",
      productImageSrc: imageSrc,
      productGrading: grading,
      productBrand: "SHEIN"
    } as ProductDetailModalMessage)
  }

  return (
    <div className="flex flex-col items-center absolute right-0 top-0 z-50 m-4">
      <button
        className="bg-transparent h-16 w-16 rounded-full"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          e.nativeEvent.stopImmediatePropagation()

          handleGradingClick()
        }}>
        <img
          className="hover:filter hover:brightness-90 transition duration-100"
          src={
            grading === 1
              ? grade1
              : grading === 2
                ? grade2
                : grading === 3
                  ? grade3
                  : grading === 4
                    ? grade4
                    : grade5
          }
          alt="grading"
        />
      </button>
      <div className="bg-black rounded-md p-2 mt-1">
        <p className="text-white text-[10px] font-semibold">
          {grading === 1
            ? "Avoid"
            : grading === 2
              ? "Progressing"
              : grading === 3
                ? "Moderate"
                : grading === 4
                  ? "Strong"
                  : "Leading"}
        </p>
      </div>
    </div>
  )
}

export default ProductCatalogGrading
