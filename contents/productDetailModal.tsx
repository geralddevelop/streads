import cssText from "data-text:~_styles/style.css"
import { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import React, { useState } from "react"

import { useMessage, usePort } from "@plasmohq/messaging/hook"

export const config: PlasmoCSConfig = {
  matches: ["https://sg.shein.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const VOWELS = new Set(["a", "e", "i", "o", "u"])

const removeVowels = (text: string): string => {
  return text
    .split("")
    .filter((char) => !VOWELS.has(char.toLowerCase()))
    .join("")
}

const disemvowel = (
  node: Node,
  ancestors: number[],
  lookup: Map<string, string>
) => {
  if (node.nodeType === Node.TEXT_NODE) {
    const nodeId = ancestors.join(".")
    if (!lookup.has(nodeId)) {
      lookup.set(nodeId, node.textContent)
    }
    node.textContent = removeVowels(node.textContent)
  } else {
    node.childNodes.forEach((child, key) =>
      disemvowel(child, [...ancestors, key], lookup)
    )
  }
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector("div.crop-image-container")

const ProductDetailModal = () => {
  const [lookup, setLookup] = useState<Map<string, string>>(
    new Map<string, string>()
  )
  const [show, setShow] = React.useState(false)

  const factPort = usePort("facts")

  // useMessage<string, string>(async (req, res) => {
  //   const { name } = req
  //   console.log("name", name)
  //   // check if name contain grading_.
  //   if (name.includes("grading_")) {
  //     disemvowel(document.body, [], lookup)
  //     setLookup(lookup)
  //     setShow(true)
  //   }
  // })

  if (show) {
    return (
      <div className="bg-purple-500 text-white p-2 rounded-md">
        This is just some stuff
      </div>
    )
  } else {
    return <></>
  }
}

export default ProductDetailModal
