import type { PlasmoMessaging } from "@plasmohq/messaging"

export const OPEN_CART_MODAL = "openCartModal"
export type CartModalMessage = {}

const openCartModalHandler: PlasmoMessaging.PortHandler = async (req, res) => {
  console.log("openCartModal")
  res.send(req.body)
}

export default openCartModalHandler
