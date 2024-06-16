import type { PlasmoMessaging } from "@plasmohq/messaging"

export const OPEN_PRODUCT_DETAIL_MODAL = "openProductDetailModal"
export type ProductDetailModalMessage = {
  productId: string
  keywords: string[]
}

const handler: PlasmoMessaging.PortHandler = async (req, res) => {
  res.send(req.body as ProductDetailModalMessage)
}

export default handler
