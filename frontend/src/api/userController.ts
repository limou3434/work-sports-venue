// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** 此处后端没有提供注释 POST /user/add */
export async function userAdd(
  body: API.UserAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean>("/user/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/add/batch */
export async function userAddBatch(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>("/user/add/batch", {
    method: "POST",
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/delete */
export async function userDelete(
  body: API.UserDeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean>("/user/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/delete/batch */
export async function userDeleteBatch(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>("/user/delete/batch", {
    method: "POST",
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/login */
export async function userLogin(
  body: API.UserLoginRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLoginUserVO>("/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/login/wx */
export async function userLoginWx(options?: { [key: string]: any }) {
  return request<API.BaseResponseLoginUserVO>("/user/login/wx", {
    method: "POST",
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/logout */
export async function userLogout(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>("/user/logout", {
    method: "POST",
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user/logout/wx */
export async function userLogoutWx(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>("/user/logout/wx", {
    method: "GET",
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/register */
export async function userRegister(
  body: API.UserRegisterRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean>("/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/register/wx */
export async function userRegisterWx(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>("/user/register/wx", {
    method: "POST",
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/search */
export async function userSearch(
  body: API.UserSearchRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListLoginUserVO>("/user/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/search/page */
export async function userSearchPagegit(
  body: API.UserSearchRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListLoginUserVO>("/user/search/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user/status */
export async function userStatus(options?: { [key: string]: any }) {
  return request<API.BaseResponseLoginUserVO>("/user/status", {
    method: "GET",
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/status/wx */
export async function userStatusWx(options?: { [key: string]: any }) {
  return request<API.BaseResponseLoginUserVO>("/user/status/wx", {
    method: "POST",
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/update */
export async function userUpdate(
  body: API.UserUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLoginUserVO>("/user/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/update/self */
export async function userUpdateSelf(
  body: API.UserUpdataSelfRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseLoginUserVO>("/user/update/self", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
