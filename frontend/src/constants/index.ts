// ./src/constants/index.ts

// 一些常量可以放在这里, 如果常量之间具有明显的分类关系, 就可以在 constants/ 下开始分文件导出, 并且统一使用 index 和外界进行导出

// 权限角色
export const ACCESS_ENUM = {
  NOT_LOGIN: -1,
  USER: 0,
  ADMIN: 1,
};

// 默认用户
export const DEFAULT_USER: API.LoginUserVO = {
  userAccount: "未登录",
  userProfile: "暂无简介",
  userAvatar: "/assets/not_login_user.svg",
  userRole: ACCESS_ENUM.NOT_LOGIN,
};
