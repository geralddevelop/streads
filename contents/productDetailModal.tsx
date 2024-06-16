import {
  OPEN_PRODUCT_DETAIL_MODAL,
  ProductDetailModalMessage
} from "@/background/ports/openProductDetailModal"
import { AlternativeInfoCard } from "@components/alternatives/AlternativeInfoCard"
import { Spinner } from "@components/spinner"
import { XMarkIcon } from "@heroicons/react/20/solid"
import { useGetAllAlternatives } from "@hooks/alternatives"
import { withQueryClient } from "@libs/react-query/react-query"
import { classNames } from "@utils/constants"
import logo from "data-base64:~_assets/logo-colored.svg"
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
  const openProductDetailModalPort = usePort(OPEN_PRODUCT_DETAIL_MODAL)
  const [tabIndex, setTabIndex] = React.useState(0)
  const { data: alternatives, isLoading, isError } = useGetAllAlternatives()
  const [alternativeKeywords, setAlternativeKeywords] = React.useState<
    string[]
  >([])

  React.useEffect(() => {
    openProductDetailModalPort.listen(
      async (msg: ProductDetailModalMessage) => {
        console.log("ProductDetailModal")
        console.log("keywords", msg.keywords)
        console.log("productId", msg.productId)
        setAlternativeKeywords(...[msg.keywords])
        setShow(true)
      }
    )
  }, [])

  React.useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [show])

  if (show) {
    if (isLoading) {
      return <Spinner />
    }

    if (isError || alternatives === undefined || alternatives.length === 0) {
      return <></>
    }

    return (
      <div
        className="modal-overlay z-50 h-screen"
        onClick={() => {
          console.log("clicked")
          setShow(false)
        }}>
        <div
          className="modal-content w-3/6 z-50 max-h-screen overflow-y-auto"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}>
          <div className="flex justify-between items-center">
            <button
              className="text-md"
              onClick={() =>
                window.open(
                  "https://streads-landing-sljp.vercel.app/",
                  "_blank"
                )
              }>
              <img src={logo} alt="Streads Logo" />
            </button>

            <button
              type="button"
              className="rounded-full p-2 hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              onClick={() => setShow(false)}>
              <XMarkIcon className="h-8 w-8" aria-hidden="true" />
            </button>
          </div>

          <div className="py-4">
            <h3 className="text-5xl">We rate it as badd!</h3>
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
              <div className="flex flex-col gap-4 text-left">
                <AlternativeInfoCard />

                <h4 className="text-2xl font-bold">
                  Consider Trying These Alternatives
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {alternatives
                    .filter((alternative) => {
                      const keywords = alternative.keywords.map((keyword) =>
                        keyword.toLowerCase()
                      )
                      return alternativeKeywords.some((keyword) =>
                        keywords.includes(keyword)
                      )
                    })
                    .map((alternative) => (
                      <div
                        className="cursor-pointer p-4 border border-gray-200 rounded-md hover:border-green-800 hover:shadow-md transition-all duration-200 ease-in-out"
                        key={alternative.id}
                        onClick={() => {
                          window.open(alternative.src, "_blank")
                        }}>
                        <img
                          src={alternative.image_src}
                          className="rounded-md"
                        />
                        <p className="font-semibold text-xl mt-2">
                          {alternative.name}
                        </p>
                        {alternative.brand && (
                          <p className="font-semibold text-lg text-gray-600 mt-2">
                            By {alternative.brand}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
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

export default withQueryClient(ProductDetailModal)
