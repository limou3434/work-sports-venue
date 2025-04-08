// @ts-ignore
/* eslint-disable */
import request from "@/libs/request";

/** 此处后端没有提供注释 POST /course/add */
export async function courseAdd(
  body: API.CourseAddRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean>("/course/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /course/cancel */
export async function coursesCancel(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>("/course/cancel", {
    method: "POST",
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /course/delete */
export async function courseDelete(
  body: API.CourseDeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean>("/course/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /course/search */
export async function courseSearch(
  body: API.CourseSearchRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseListCourse>("/course/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /course/submit */
export async function coursesSubmit(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>("/course/submit", {
    method: "POST",
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /course/update */
export async function courseUpdate(
  body: API.CourseUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseCourse>("/course/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
