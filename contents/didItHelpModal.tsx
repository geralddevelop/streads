import { stat } from "fs"
import { OPEN_DID_IT_HELP_MODAL } from "@/background/ports/openDidItHelpModal"
import { XMarkIcon } from "@heroicons/react/20/solid"
import { withQueryClient } from "@libs/react-query/react-query"
import { classNames } from "@utils/constants"
import noIcon from "data-base64:~_assets/did-it-help/no.png"
import unselectedIcon from "data-base64:~_assets/did-it-help/unselected.png"
import yesIcon from "data-base64:~_assets/did-it-help/yes.png"
import grading5 from "data-base64:~_assets/grading/5.png"
import logo from "data-base64:~_assets/logo-colored.svg"
import cssText from "data-text:~_styles/modal.css"
import { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import React from "react"

import { usePort } from "@plasmohq/messaging/hook"

export const config: PlasmoCSConfig = {
  matches: ["https://sg.shein.com/cart"],
  css: ["font.css"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector("body")

const DidItHelpModal = () => {
  const [show, setShow] = React.useState(false)
  const openDidItHelpModalPort = usePort(OPEN_DID_IT_HELP_MODAL)
  const [state, setState] = React.useState<"yes" | "no" | "unselected">(
    "unselected"
  )

  React.useEffect(() => {
    openDidItHelpModalPort.listen(async (msg) => {
      setShow(true)
      setState("unselected")
    })
  }, [])

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

        {state === "unselected" ? (
          <UnselectedView
            onNo={() => {
              setState("no")
            }}
            onYes={() => {
              setState("yes")
            }}
          />
        ) : state === "yes" ? (
          <YesView
            onShare={() => {
              window.open("https://streads-landing-sljp.vercel.app/", "_blank")
            }}
          />
        ) : (
          <NoView />
        )}

        <p className="my-4 text-right text-sm font-semibold">#streads💚you</p>
      </div>
    </div>
  )
}

const UnselectedView = ({
  onNo,
  onYes
}: {
  onNo: () => void
  onYes: () => void
}) => {
  return (
    <>
      <p className="font-bold text-[20px] mt-4">
        Did <span className="text-brand-green">Streads</span> helped you to
        rethink your purchase
      </p>

      <div className="flex justify-center my-8">
        <img src={unselectedIcon} width={116} height={116} />
      </div>

      <div className="flex justify-center gap-4">
        <button
          className="w-[115px] flex justify-center items-center text-center rounded-md p-4 hover:brightness-90 cursor-pointer border-2 border-brand-green"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            e.nativeEvent.stopImmediatePropagation()

            onNo()
          }}>
          <p className="font-bold text-sm text-brand-green">No</p>
        </button>

        <button
          className="w-[115px] flex justify-center items-center text-center rounded-md p-4 hover:brightness-90 cursor-pointer bg-brand-green"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            e.nativeEvent.stopImmediatePropagation()

            onYes()
          }}>
          <p className="font-bold text-sm text-white">Yes</p>
        </button>
      </div>
    </>
  )
}

const YesView = ({ onShare }: { onShare: () => void }) => {
  return (
    <>
      <p className="font-bold text-[20px] mt-4">
        You're among 1 of 100 friends
      </p>
      <p className=" text-sm mt-1">who have embraced a new lifestyle </p>

      <div className="flex justify-center my-8">
        <img src={yesIcon} width={150} height={160} />
      </div>

      <div className="flex justify-center gap-4">
        <button
          className="w-[150px] flex justify-center items-center text-center rounded-md p-4 hover:brightness-90 cursor-pointer border-2 border-brand-green"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            e.nativeEvent.stopImmediatePropagation()

            onShare()
          }}>
          <p className="font-bold text-sm text-brand-green">Share your wins!</p>
        </button>
      </div>
    </>
  )
}

const NoView = () => {
  return (
    <>
      <p className="font-bold text-[20px] mt-4">Sorry we missed you! </p>
      <p className=" text-sm mt-1">Join us the next time!</p>

      <div className="flex justify-center my-8">
        <img src={noIcon} width={109} height={109} />
      </div>

      <div className="round-md bg-gray-100">
        <div className="bg-brand-green p-4 rounded-tl-md rounded-tr-md">
          <p className="text-white font-semibold text-sm">
            💚Streads community achievement💚
          </p>
        </div>

        <div className="grid grid-cols-3 p-4 py-8">
          <div className="flex flex-col text-center">
            <p
              className={classNames(
                "font-semibold text-[24px] text-brand-green"
              )}>
              150
              <span className="font-medium text-md text-gray-400"> pcs</span>
            </p>
            <p className="font-medium text-gray-400 text-xs">items removed</p>
          </div>

          <div className="flex flex-col text-center">
            <p
              className={classNames(
                "font-semibold text-[24px] text-brand-green"
              )}>
              200
              <span className="font-medium text-md text-gray-400"> kg</span>
            </p>
            <p className="font-medium text-gray-400 text-xs">CO2e saved</p>
          </div>

          <div className="flex flex-col text-center">
            <p
              className={classNames(
                "font-semibold text-[24px] text-brand-green"
              )}>
              1000
              <span className="font-medium text-md text-gray-400"> pcs</span>
            </p>
            <p className="font-medium text-gray-400 text-xs">
              plastic bags saved
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default withQueryClient(DidItHelpModal)
