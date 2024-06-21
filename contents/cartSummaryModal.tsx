import {
  CartModalMessage,
  OPEN_CART_MODAL
} from "@/background/ports/openCartModal"
import { EqualCard } from "@components/cartModal/equalCard"
import { HeaderCountCard } from "@components/cartModal/headerCountCard"
import { ClothingItem } from "@components/detailModal/clothingItem"
import { Spinner } from "@components/spinner"
import { XMarkIcon } from "@heroicons/react/20/solid"
import { useGetAllAlternatives } from "@hooks/alternatives"
import { withQueryClient } from "@libs/react-query/react-query"
import cartModalBanner from "data-base64:~_assets/banners/cart-modal-banner.png"
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

const CartSummaryModal = () => {
  const [show, setShow] = React.useState(false)
  const openCartModalPort = usePort(OPEN_CART_MODAL)
  const { data: alternatives, isLoading, isError } = useGetAllAlternatives()
  const [cartNum, setCartNum] = React.useState(0)

  React.useEffect(() => {
    openCartModalPort.listen(async (msg: CartModalMessage | undefined) => {
      setShow(true)
    })

    setInterval(() => {
      const anchorElement = document.querySelector(".cart-num") as HTMLElement
      if (anchorElement) {
        setCartNum(Number(anchorElement.textContent))
      }
    }, 2000)
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
          <HeaderCountCard
            grading={
              cartNum > 5
                ? 1
                : cartNum > 4
                  ? 2
                  : cartNum > 3
                    ? 3
                    : cartNum > 2
                      ? 4
                      : 5
            }
            itemCount={cartNum}>
            <button
              type="button"
              className="m-8 rounded-full p-2 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              onClick={() => setShow(false)}>
              <XMarkIcon className="h-8 w-8" aria-hidden="true" />
            </button>
          </HeaderCountCard>

          <div className="m-8 mx-16">
            <EqualCard
              grading={
                cartNum > 5
                  ? 1
                  : cartNum > 4
                    ? 2
                    : cartNum > 3
                      ? 3
                      : cartNum > 2
                        ? 4
                        : 5
              }
              co2Kg={cartNum * 7}
              plasticBags={cartNum * 35}
            />
          </div>

          <div className="p-8 pt-0">
            <div className="flex flex-col gap-4 text-left">
              <div className="flex items-center gap-2">
                <p className="text-md font-semibold">Try these instead</p>
              </div>

              <div className="flex flex-col">
                {alternatives.map((alternative, i) => (
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
          </div>
          <img
            src={cartModalBanner}
            alt="Modal Banner"
            width={"500px"}
            className="pt-4"
          />
        </div>
      </div>
    )
  } else {
    return <></>
  }
}
export default withQueryClient(CartSummaryModal)
