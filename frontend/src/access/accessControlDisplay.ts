// ./src/access/accessControlDisplay.ts: 权限控显方法

import checkAccess from "@/access/checkAccess";
import menus from "../app/menus";

const accessControlDisplay = (
  loginUser: API.LoginUserVO,
  menuItems = menus
) => {
  return menuItems.filter((item) => {
    if (!checkAccess(loginUser, item.access)) {
      return false;
    }
    if (item.children) {
      item.children = accessControlDisplay(loginUser, item.children);
    }
    return true;
  });
};

export default accessControlDisplay;
