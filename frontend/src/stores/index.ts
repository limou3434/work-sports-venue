// ./src/stores/createShowMessage.ts: 状态管理库(相当于一个数据库)

import { configureStore } from "@reduxjs/toolkit";
import loginUser from "@/stores/loginUser";

// 可以理解为而 configureStore() 创建了一个数据库
/*
引入数据表并且配置好数据库后
(1)获取状态实例
const 数据表名 = useSelector((state: RootState) => {state.<数据表名>})
(2)触发状态操作
const dispatch = useDispatch<AppDispatch>(); dispatch(操作名(值对象));
 */
const store = configureStore({
  // 在这里注册状态
  reducer: {
    loginUser, // ...
  },
});

export type RootState = ReturnType<typeof store.getState>; // 用于类型推断和提示

export type AppDispatch = typeof store.dispatch; // 用于类型推断和提示

export default store; // 导出数据库
