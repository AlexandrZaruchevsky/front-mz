import ui from "./ui";
import entities from "./entities";
import OverlayZ from "./OverlayZ.vue"
import appbar from "./appbar"

export default [
  ...ui,
  ...entities,
  ...appbar,
  OverlayZ
]