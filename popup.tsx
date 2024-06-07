import { useState } from "react"

import { sendToContentScript } from "@plasmohq/messaging"

function IndexPopup() {
  const [disemvoweled, setDisemvoweled] = useState(false)

  // async function handleClick(command) {
  //   console.log("sending command")
  //   const resp = await sendToContentScript({ name: command })

  //   if (resp === "disemvoweled") {
  //     setDisemvoweled(true)
  //   } else if (resp === "reset") {
  //     setDisemvoweled(false)
  //   }
  // }

  return (
    <div>
      <p>hi</p>
      {/* <button
        disabled={disemvoweled}
        color="primary"
        onClick={() => handleClick("disemvowel")}>
        Disemvowel
      </button>
      <button
        disabled={!disemvoweled}
        color="secondary"
        onClick={() => handleClick("reset")}>
        Reset
      </button> */}
    </div>
  )
}

export default IndexPopup


// import { useMessage } from "@plasmohq/messaging/hook"
// import { useState } from "react";

// const VOWELS = new Set(["a", "e", "i", "o", "u"]);

// const removeVowels = (text: string): string => {
//     return text.split("").filter(char => !VOWELS.has(char.toLowerCase())).join("");
// }

// const disemvowel = (node: Node, ancestors: number[], lookup: Map<string, string>) => {
//     if (node.nodeType === Node.TEXT_NODE) {
//         const nodeId = ancestors.join(".");
//         if (!lookup.has(nodeId)) {
//             lookup.set(nodeId, node.textContent);
//         }
//         node.textContent = removeVowels(node.textContent);
//     } else {
//         node.childNodes.forEach((child, key) => disemvowel(child, [...ancestors, key], lookup));
//     }
// };

// const reset = (node: Node, ancestors: number[], lookup: Map<string, string>) => {
//     if (node.nodeType === Node.TEXT_NODE) {
//         const nodeId = ancestors.join(".");
//         node.textContent = lookup.get(nodeId) ?? "";
//     } else {
//         node.childNodes.forEach((child, key) => reset(child, [...ancestors, key], lookup));
//     }
// }

// const Disemvowel = () => {
//     const [lookup, setLookup] = useState<Map<string, string>>(new Map<string, string>());
//     useMessage<string, string>(async (req, res) => {
//         const {name} = req;
//         if (name === "disemvowel") {
//             disemvowel(document.body, [], lookup);
//             setLookup(lookup);
//             res.send("disemvoweled");
//         } else if (name === "reset") {
//             if (lookup !== null) {
//                 reset(document.body, [], lookup);
//                 res.send("reset");
//             }
//         }
//     })
// }

// export default Disemvowel;