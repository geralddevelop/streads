import type { PlasmoMessaging } from "@plasmohq/messaging"

export const OPEN_PROMO_MODAL = "openPromoModal"
export type PromoModalMessage = {
  link: string
  src: string
}

const PromoModalMessageHandler: PlasmoMessaging.PortHandler = async (
  req,
  res
) => {
  console.log("PromoModalMessageHandler")
  res.send(req.body)
}

export default PromoModalMessageHandler
