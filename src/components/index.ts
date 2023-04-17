import ui from "./ui";
import entities from "./entities";
import OverlayZ from "./OverlayZ.vue"
import OverlayZV1 from "./OverlayZV1.vue"
import appbar from "./appbar"
import sidebarMain from "./sidebar-main";

export default [
  ...ui,
  ...entities,
  ...appbar,
  ...sidebarMain,
  OverlayZ,
  OverlayZV1
]