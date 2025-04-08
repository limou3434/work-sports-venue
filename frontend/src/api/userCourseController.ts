// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** 此处后端没有提供注释 POST /user_course/add */
export async function userCourseAdd(
  body: API.UserCourseAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean>("/user_course/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user_course/delete */
export async function userCourseDelete(
  body: API.UserCourseDeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean>("/user_course/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user_course/search */
export async function userCourseSearch(
  body: API.UserCourseSearchRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListUserCourse>("/user_course/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user_course/update */
export async function userCourseUpdate(
  body: API.UserCourseUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseUserCourse>("/user_course/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
