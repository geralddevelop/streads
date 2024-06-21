// This file show the button to quick access modal on the right.
import { OPEN_CART_MODAL } from "@/background/ports/openCartModal"
import { classNames } from "@utils/constants"
import dragIcon from "data-base64:~_assets/icons/drag.svg"
import cssText from "data-text:~_styles/quickModalButton.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"

import { usePort } from "@plasmohq/messaging/hook"

export const config: PlasmoCSConfig = {
  matches: ["https://sg.shein.com/*"],
  exclude_matches: ["https://sg.shein.com/cart"],
  css: ["font.css"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const QuickModalButton = () => {
  const openCartModalPort = usePort(OPEN_CART_MODAL)
  const [cartNum, setCartNum] = useState(0)
  async function handleClick() {
    openCartModalPort.send(undefined)
  }

  useEffect(() => {
    setInterval(() => {
      const anchorElement = document.querySelector(".cart-num") as HTMLElement
      if (anchorElement) {
        setCartNum(Number(anchorElement.textContent))
      }
    }, 1000)
  }, [])

  return (
    <div className="absolute top-0 right-0 flex flex-col items-end">
      <div className="bg-gray-100 rounded-tl-md rounded-bl-md w-[300px]">
        <div className="text-white bg-brand-green py-2 px-4 rounded-tl-md text-center">
          <p className="font-semibold text-[10px]">
            Brand Social Image Insights: SHEIN
          </p>
        </div>

        <div className="px-4 py-2 flex flex-col gap-2">
          <div className="grid grid-cols-3 text-center gap-8">
            <div className="flex flex-col gap-1">
              <p className="text-[24px] font-semibold text-brand-green">7%</p>
              <p className="font-medium text-[8px]">Transparency Score</p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[24px] font-semibold text-brand-green">E</p>
              <p className="font-medium text-[8px]">Living wage paid score</p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[24px] font-semibold text-brand-green">1/5</p>
              <p className="font-medium text-[8px]">
                supply chain transparency score
              </p>
            </div>
          </div>

          <p
            onClick={() =>
              window.open(
                "https://fashionchecker.org/brand-profile.html?q=7452173",
                "_blank"
              )
            }
            className="text-[8px] underline text-blue-600 hover:text-blue-800 text-right cursor-pointer">
            Find out more about insights
          </p>
        </div>
      </div>
      <button
        className={classNames(
          cartNum > 5
            ? "bg-brand-red"
            : cartNum > 4
              ? "bg-brand-orange"
              : cartNum > 3
                ? "bg-brand-yellow"
                : cartNum > 2
                  ? "bg-brand-grass-green"
                  : "bg-brand-green",
          "w-[170px] rounded-tl-md rounded-bl-md flex justify-between gap-4 items-center px-4 py-4 z-50 hover:brightness-90 cursor-pointer"
        )}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          e.nativeEvent.stopImmediatePropagation()

          handleClick()
        }}>
        <div className="flex flex-col text-left">
          <p className="font-bold text-sm text-white">we're streads</p>
          <p className="text-xs text-white">
            <b>{cartNum} Item(s)</b> in Cart
          </p>
        </div>
        <img src={dragIcon} alt="drag icon" />
      </button>
    </div>
  )
}

export default QuickModalButton
