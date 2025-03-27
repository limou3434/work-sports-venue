// ./src/stores/loginUser.ts: 用户登陆状态(相当于一个数据表)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_USER } from "@/constants";

// 可以理解为 createSlice() 创建了一个数据表
export const loginUserSlice = createSlice({
  name: "loginUser", // 表名
  initialState: DEFAULT_USER, // 初始
  reducers: { // 操作
    // 设置用户登陆状态(不过最好只使用状态中的 id 值来请求用户的信息, 否则就有可能在一些实时要求强的场景下)
    setLoginUser: (
        state, // state 表示当前切片的状态, 即尚未修改之前的状态
        action: PayloadAction<API.LoginUserVO> // action 表示触发的动作对象, 包含 type 和 payload 属性, 其中 payload 是传递的数据, PayloadAction<API.LoginUserVO> 表示 action 对象的 payload 属性应符合 API.LoginUserVO 类型
      ) => {
      // state 是还没修改之前的状态, 这里暂时没用到, 可以考虑使用 _ 替代, 也可以考虑使用 { ...state, ...action.payload } 达到部分或全部的字段覆盖
      // 用户登陆后就需要使用 setLoginUser() 修改登陆状态
      console.log("执行一次 setLoginUser()");
      console.log(state);
      return {
        ...action.payload,
      }; // 使用 {} 代表返回链一个副本, 避免污染状态
    },
  },
}); // 导出数据表

export const { setLoginUser } = loginUserSlice.actions; // 导出操作

export default loginUserSlice.reducer; // 导出注册
