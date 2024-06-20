// This file show the button to quick access modal on the right.
import { ProductDetailModalMessage } from "@/background/ports/openProductDetailModal"
import dragIcon from "data-base64:~_assets/icons/drag.svg"
import cssText from "data-text:~_styles/quickModalButton.css"
import type { PlasmoCSConfig } from "plasmo"

import { usePort } from "@plasmohq/messaging/hook"

export const config: PlasmoCSConfig = {
  matches: ["https://sg.shein.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const QuickModalButton = () => {
  const openProductDetailModalPort = usePort("openProductDetailModal")

  async function handleClick() {
    openProductDetailModalPort.send(undefined)
  }

  return (
    // top-1/2
    <button
      className="absolute top-0 right-0 w-[170px] bg-brand-green rounded-tl-md rounded-bl-md flex justify-between gap-4 items-center px-4 py-4 z-50 hover:brightness-90"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()

        handleClick()
      }}>
      <p className="font-bold text-sm text-white">we're streads</p>
      <img src={dragIcon} alt="drag icon" />
    </button>
  )
}

export default QuickModalButton
