import type { PlasmoMessaging } from "@plasmohq/messaging"

export const OPEN_DID_IT_HELP_MODAL = "openDidItHelpModal"
export type CartModalMessage = {}

const openDidItHelpModalHandler: PlasmoMessaging.PortHandler = async (req, res) => {
  console.log("openDidItHelpModal")
  res.send(req.body)
}

export default openDidItHelpModalHandler
