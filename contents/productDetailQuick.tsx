// This file show quick environmental details at the bottom of the product catalog page in shein.com.

import { QuickStatItem } from "@components/quickStatItem"
import { Spinner } from "@components/spinner"
import { useGetAllFacts } from "@hooks/facts"
import { withQueryClient } from "@libs/react-query/react-query"
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

  if (
    isError ||
    facts === undefined ||
    facts.length === 0 ||
    facts.filter((fact) => {
      const factKeywords = fact.keywords.map((keyword) => keyword.toLowerCase())
      return productKeywords.some((keyword) => factKeywords.includes(keyword))
    }).length === 0
  ) {
    return <></>
  }

  return (
    <div className="flex w-full gap-2 p-2 items-center">
      <p className="text-brand-green font-semibold text-[10px]">
        Streads says:
      </p>

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
          <QuickStatItem title={fact.title} status="bad" key={fact.id} />
        ))}
    </div>
  )
}

export default withQueryClient(ProductDetailQuick)
