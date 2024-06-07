import { classNames } from "@utils/constants"
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
  document.querySelector("body")

const ProductDetailModal = () => {
  const [show, setShow] = React.useState(false)
  const openProductDetailModalPort = usePort("openProductDetailModal")
  const [tabIndex, setTabIndex] = React.useState(0)

  React.useEffect(() => {
    openProductDetailModalPort.listen(async (msg) => {
      console.log("ProductDetailModal")
      console.log("msg", msg)

      setShow(true)
    })
  }, [])

  React.useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [show])

  if (show) {
    return (
      <div
        className="modal-overlay z-50"
        onClick={() => {
          console.log("clicked")
          setShow(false)
        }}>
        <div
          className="modal-content w-3/6 z-50"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}>
          <div className="flex justify-between">
            <button className="text-md" onClick={() => setShow(false)}>
              We are Streads
            </button>
            <button className="text-md" onClick={() => setShow(false)}>
              Close
            </button>
          </div>

          <div className="py-4">
            <h3 className="text-5xl">We rate it as bad!</h3>
          </div>

          <div className="hidden sm:block">
            <div className="flex justify-center">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {["Eco-Impacts", "Alternative"].map((tab, i) => (
                  <button
                    key={tab}
                    onClick={() => setTabIndex(i)}
                    className={classNames(
                      tabIndex === i
                        ? "border-green-700 text-green-800"
                        : "border-transparent text-black hover:border-green-600 hover:text-green-800",
                      "whitespace-nowrap border-b-2 px-1 py-4 font-medium text-xl"
                    )}>
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
          </div>
          <div className="p-8">
            {tabIndex === 0 ? (
              <div className="flex flex-col gap-4 text-left">
                <div>
                  <h4 className="text-2xl font-semibold">
                    Eco-Impact of Your Choices
                  </h4>
                  <DetailItem title="Jeans require 70L of freshwater per wear" />
                  <DetailItem
                    title="Dyeing them tends to add 0.004 kg CO2 to the environment per
                    wear"
                  />
                </div>

                <div>
                  <h4 className="text-2xl font-semibold">Materials</h4>
                  <DetailItem title="Releases microplastics into waterways during washing" />
                  <DetailItem title="Takes hundreds of years to decompose" />
                </div>
              </div>
            ) : (
              <h4 className="text-2xl">You Can Look for Alternatives</h4>
            )}
          </div>
        </div>
      </div>
    )
  } else {
    return <></>
  }
}

const DetailItem = ({
  title,
  content
}: {
  title: string
  content?: string
}) => {
  return (
    <div className="flex items-center justify-between gap-2 py-2">
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 bg-green-800 rounded-full"></div>
        <p className="text-lg">{title} </p>
      </div>

      <div className="h-4 w-4 bg-black rounded-full"></div>
    </div>
  )
}

export default ProductDetailModal
