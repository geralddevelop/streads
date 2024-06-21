import {
  OPEN_PRODUCT_DETAIL_MODAL,
  ProductDetailModalMessage
} from "@/background/ports/openProductDetailModal"
import { ClothingItem } from "@components/detailModal/clothingItem"
import { ImpactInfoCard } from "@components/detailModal/impactInfoCard"
import { ImpactItem } from "@components/detailModal/impactItem"
import { HighlightedNumberText } from "@components/highlightItemText"
import { Spinner } from "@components/spinner"
import { Tabs } from "@components/tabs"
import { XMarkIcon } from "@heroicons/react/20/solid"
import { useGetAllAlternatives } from "@hooks/alternatives"
import { withQueryClient } from "@libs/react-query/react-query"
import modalBanner from "data-base64:~_assets/banners/modal-banner.png"
import logo from "data-base64:~_assets/logo-colored.svg"
import cssText from "data-text:~_styles/style.css"
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

const ProductDetailModal = () => {
  const [show, setShow] = React.useState(false)
  const openProductDetailModalPort = usePort(OPEN_PRODUCT_DETAIL_MODAL)
  const [tabIndex, setTabIndex] = React.useState(0)
  const { data: alternatives, isLoading, isError } = useGetAllAlternatives()
  const [alternativeKeywords, setAlternativeKeywords] = React.useState<
    string[]
  >([])
  const [product, setProduct] =
    React.useState<ProductDetailModalMessage>(undefined)

  React.useEffect(() => {
    openProductDetailModalPort.listen(
      async (msg: ProductDetailModalMessage | undefined) => {
        setShow(true)
        setTabIndex(0)

        if (msg === null) {
          setAlternativeKeywords([])
          setProduct(undefined)
          return
        }

        setAlternativeKeywords(...[msg.keywords])
        setProduct(msg)
      }
    )
  }, [])

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
          setShow(false)
        }}>
        <div
          className="modal-content z-50 max-h-screen overflow-y-auto shadow-xl rounded-tl-xl rounded-tr-xl"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}>
          <div className="flex justify-between items-center p-8 pb-0">
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
              className="rounded-full p-2 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              onClick={() => setShow(false)}>
              <XMarkIcon className="h-8 w-8" aria-hidden="true" />
            </button>
          </div>

          <img
            src={modalBanner}
            alt="Modal Banner"
            width={"500px"}
            className="pt-4"
          />

          <div className="p-8 pt-4">
            {product && (
              <>
                <p
                  onClick={() =>
                    window.open(
                      "https://streads-landing-sljp.vercel.app/",
                      "_blank"
                    )
                  }
                  className="underline text-blue-600 hover:text-blue-800 text-right cursor-pointer">
                  Find out more about the grading
                </p>
                <div className="p-6 pt-4 pb-0">
                  <ClothingItem
                    clickable={false}
                    name={product.productName}
                    brand={product.productBrand}
                    imageSrc={product.productImageSrc}
                    sustainableScoring={product.productGrading}
                    labels={["No sustainable fabric", "Low worker Welfare"]}
                  />
                </div>
              </>
            )}

            <div className="flex justify-center">
              <Tabs
                tabs={["Alternatives", "Impact"]}
                indexSelected={tabIndex}
                onTabClick={(index) => setTabIndex(index)}
              />
            </div>
            <div className="pt-8">
              {tabIndex === 0 ? (
                <div className="flex flex-col gap-4 text-left">
                  <div className="flex items-center gap-2">
                    <HighlightedNumberText
                      num={
                        alternatives.filter((alternative) => {
                          const keywords = alternative.keywords.map((keyword) =>
                            keyword.toLowerCase()
                          )

                          if (alternativeKeywords.length === 0) return true
                          return alternativeKeywords.some((keyword) =>
                            keywords.includes(keyword)
                          )
                        }).length
                      }
                    />

                    <p className="text-sm">sustainable alternatives found</p>
                  </div>

                  <div className="flex flex-col">
                    {alternatives
                      .filter((alternative) => {
                        const keywords = alternative.keywords.map((keyword) =>
                          keyword.toLowerCase()
                        )
                        if (alternativeKeywords.length === 0) return true
                        return alternativeKeywords.some((keyword) =>
                          keywords.includes(keyword)
                        )
                      })
                      .map((alternative, i) => (
                        <ClothingItem
                          key={alternative.name}
                          name={alternative.name}
                          imageSrc={alternative.image_src}
                          brand={alternative.brand}
                          labels={["Sustainable fabric", "Worker Welfare"]}
                          link={alternative.src}
                          price={alternative.price}
                          haveDividerBelow={i !== alternatives.length - 1}
                        />
                      ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 text-left">
                  <div className="px-4">
                    <ImpactInfoCard grading={product.productGrading} />
                  </div>
                  <ImpactItem
                    title="Eco Impact"
                    description="Choosing sustainable options helps protect natural resources and reduce pollution"
                  />
                  <ImpactItem
                    title="Health Impact"
                    description="Eco-friendly products support better health by cutting down on harmful pollution."
                  />
                  <ImpactItem
                    title="Social Impact"
                    description="Supporting ethical brands ensures fair labor practices and better worker welfare."
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return <></>
  }
}
export default withQueryClient(ProductDetailModal)
