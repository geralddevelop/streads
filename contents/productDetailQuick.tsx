// This file show quick environmental details at the bottom of the product catalog page in shein.com.

import { Spinner } from "@components/spinner"
import { useGetAllFacts } from "@hooks/facts"
import { withQueryClient } from "@libs/react-query/react-query"
import { classNames } from "@utils/constants"
import cssText from "data-text:~_styles/style.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchorList } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://sg.shein.com/*html*"],
  css: ["font.css"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getInlineAnchorList: PlasmoGetInlineAnchorList = () =>
  document.querySelectorAll(
    "div.product-intro__head>div.ProductIntroHeadPrice>div"
  )

const ProductDetailQuick = ({ anchor }) => {
  const productKeywords = []
  for (let i = 0; i < anchor.element.offsetParent.children.length; i++) {
    productKeywords.push(
      ...anchor.element.offsetParent.children[i].innerText
        .toLowerCase()
        .split(" ")
    )
  }

  const { data: facts, isLoading, isError } = useGetAllFacts()

  if (isLoading) {
    return <Spinner />
  }

  if (isError || facts === undefined || facts.length === 0) {
    return <></>
  }

  return (
    <div className="flex w-full gap-2 bg-brand-green p-2 items-center">
      <p className="text-white font-semibold text-[10px]">We're streads</p>

      {facts
        .filter((fact) => {
          const factKeywords = fact.keywords.map((keyword) =>
            keyword.toLowerCase()
          )
          return productKeywords.some((keyword) =>
            factKeywords.includes(keyword)
          )
        })
        .map((fact) => (
          <QuickItem title={fact.title} status="good" key={fact.id} />
        ))}
    </div>
  )
}

const QuickItem = ({
  title,
  status
}: {
  title: string
  status: "good" | "bad"
}) => {
  return (
    <div
      className={classNames(
        status === "good"
          ? "border-white text-white"
          : "border-red-800 text-red-800",
        "p-2 px-4 rounded-3xl flex justify-center items-center z-10 border-2 font-semibold"
      )}>
      {/* ! No idea why but when the text is not text-sm, not showing */}
      <p className="text-[10px] text-center align-middle">{title}</p>
    </div>
  )
}

export default withQueryClient(ProductDetailQuick)
