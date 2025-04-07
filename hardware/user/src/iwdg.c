#include "iwdg.h"

//初始化独立看门狗
//prer:分频数:0~7(只有低3位有效!)
//rlr:自动重装载值,0~0XFFF.
//分频因子=4*2^prer.但最大值只能是256!
//rlr:重装载寄存器值:低11位有效.
//时间计算(大概):Tout=((4*2^prer)*rlr)/32 (ms).
//prer取3，rlr取1000，时间计算为4*2^3*1000/32=1000ms=1s
void IwdgInit(unsigned char prer, unsigned int rlr)
{
	IWDG_WriteAccessCmd(IWDG_WriteAccess_Enable); //使能对IWDG->PR IWDG->RLR的写
	IWDG_SetPrescaler(prer);					  //设置IWDG分频系数
	IWDG_SetReload(rlr);						  //设置IWDG装载值
	IWDG_ReloadCounter();						  //reload
	IWDG_Enable();								  //使能看门狗
}

//喂独立看门狗
void IwdgFeed(void)
{
	IWDG_ReloadCounter(); //reload
}
