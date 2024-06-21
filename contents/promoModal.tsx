import { count } from "console"
import { OPEN_PROMO_MODAL } from "@/background/ports/openPromoModal"
import { XMarkIcon } from "@heroicons/react/20/solid"
import { withQueryClient } from "@libs/react-query/react-query"
import { classNames } from "@utils/constants"
import grading5 from "data-base64:~_assets/grading/5.png"
import logo from "data-base64:~_assets/logo-colored.svg"
import cssText from "data-text:~_styles/modal.css"
import { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import React from "react"

import { usePort } from "@plasmohq/messaging/hook"

export const config: PlasmoCSConfig = {
  matches: ["https://sg.shein.com/*"],
  css: ["font.css"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector("body")

const PromoModal = () => {
  const [show, setShow] = React.useState(false)
  const openPromoModalPort = usePort(OPEN_PROMO_MODAL)
  const [promoCode, setPromoCode] = React.useState("#streadsloveyou")
  const [brand, setBrand] = React.useState("")
  const [countdown, setCountdown] = React.useState(0)
  const [src, setSrc] = React.useState(undefined)
  const [tmpSrc, setTmpSrc] = React.useState(undefined)

  React.useEffect(() => {
    openPromoModalPort.listen(async (msg) => {
      setPromoCode(`#streadslove${msg.brand}`)
      setBrand(msg.brand)
      setSrc(msg.src)
      setShow(true)
      setCountdown(5)
    })
  }, [])

  React.useEffect(() => {
    console.log("countdown: ", countdown)
    if (src === undefined) {
      return
    }

    if (countdown === 0) {
      window.open(src, "_blank")
      setTmpSrc(src)
      setSrc(undefined)
    } else {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  return (
    <div
      className={classNames(
        show ? "translate-x-0" : "translate-x-full",
        "modal-overlay z-50 h-screen transition-transform transform duration-500"
      )}
      onClick={() => {
        setShow(false)
      }}>
      <div
        className="modal-content-small z-50 overflow-y-auto shadow-xl rounded-tl-xl rounded-tr-xl"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}>
        <div className="flex justify-between items-center p-8 pb-0">
          <button
            className="text-md"
            onClick={() =>
              window.open("https://streads-landing-sljp.vercel.app/", "_blank")
            }>
            <img src={logo} alt="Streads Logo" />
          </button>

          <button
            type="button"
            className="rounded-full p-2 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            onClick={() => setShow(false)}>
            <XMarkIcon className="h-8 w-8" aria-hidden="true" />
          </button>
        </div>
        <div className="flex justify-center">
          <img src={grading5} width={97} height={97} className="my-4" />
        </div>
        <p className="font-medium text-[20px]">Before you go to</p>
        <p className="font-bold text-[20px] text-brand-green">{brand}</p>

        <div className="flex flex-col gap-1 p-4 m-4 bg-brand-green text-white rounded-md">
          <p className="text-sm font-normal">Snag your discount</p>
          <p className="text-md font-extrabold">{promoCode}</p>
        </div>
        {countdown === 0 ? (
          <p className="text-sm text-gray-500 mt-1">Hope this was helpful!</p>
        ) : (
          <p className="text-sm text-gray-500 mt-1">
            Redirecting in {countdown} seconds
          </p>
        )}
        <p
          onClick={() => {
            if (countdown === 0) {
              window.open(tmpSrc, "_blank")
            } else {
              setCountdown(0)
            }
          }}
          className="text-sm underline text-blue-600 hover:text-blue-800 cursor-pointer mt-1">
          Click here to get redirected now
        </p>
      </div>
    </div>
  )
}

export default withQueryClient(PromoModal)
