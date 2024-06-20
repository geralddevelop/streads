import type { PlasmoMessaging } from "@plasmohq/messaging"

export const OPEN_PRODUCT_DETAIL_MODAL = "openProductDetailModal"
export type ProductDetailModalMessage = {
  productId: string
  keywords: string[]
  productName: string
  productImageSrc: string
  productGrading: number
  productBrand: string
}

const handler: PlasmoMessaging.PortHandler = async (req, res) => {
  res.send(req.body)
}

export default handler
