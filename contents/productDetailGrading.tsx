// This file show the grading image of the product catalog page in shein.com.

import {
  OPEN_PRODUCT_DETAIL_MODAL,
  ProductDetailModalMessage
} from "@/background/ports/openProductDetailModal"
import { getRandomWeighted } from "@utils/functions"
import grade1 from "data-base64:~_assets/grading/1.png"
import grade2 from "data-base64:~_assets/grading/2.png"
import grade3 from "data-base64:~_assets/grading/3.png"
import grade4 from "data-base64:~_assets/grading/4.png"
import grade5 from "data-base64:~_assets/grading/5.png"
import cssText from "data-text:~_styles/style.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import { useState } from "react"

import { usePort } from "@plasmohq/messaging/hook"

export const config: PlasmoCSConfig = {
  matches: ["https://sg.shein.com/*html*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const findBackgroundImages = (anchor: HTMLElement): string[] => {
  const images: string[] = []
  const elements = anchor.querySelectorAll("[data-background-image]")

  elements.forEach((element) => {
    const backgroundImage = element.getAttribute("data-background-image")
    if (backgroundImage) {
      images.push(backgroundImage)
    }
  })

  return images
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector("div.product-intro__main")

const ProductDetailGrading = ({ anchor }) => {
  console.log("ProductDetailGrading")

  const openProductDetailModalPort = usePort(OPEN_PRODUCT_DETAIL_MODAL)
  const [grading] = useState(
    getRandomWeighted([
      { value: 1, weight: 5 },
      { value: 2, weight: 3 },
      { value: 3, weight: 1 },
      { value: 4, weight: 0.5 },
      { value: 5, weight: 0.5 }
    ])
  )

  const anchorElement = document.querySelector(
    ".product-intro__main"
  ) as HTMLElement

  const children =
    anchor.element.offsetParent.offsetParent.offsetParent.children[1]
      .children[0].children
  const productKeywords = []
  for (let i = 0; i < children.length; i++) {
    productKeywords.push(...children[i].innerText.toLowerCase().split(" "))
  }

  async function handleGradingClick() {
    console.log("sending command")

    // Should open grading modal in productDetailModal
    openProductDetailModalPort.send({
      productId: "world from grading",
      keywords: productKeywords,
      productName: children[0].innerText.split("\n")[0] ?? "Item",
      productImageSrc: findBackgroundImages(anchorElement)[0],
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

export default ProductDetailGrading
