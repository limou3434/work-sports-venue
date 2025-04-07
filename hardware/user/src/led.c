#include "led.h"

/*
函数名：Led_Init
函数功能：LED初始化
返回值：void
形参：void
说明：
代码流程：
1、	打开时钟（GPIOA、GPIOB）
2、	初始化PB11、PB14、PA11

*/

void Led_Init(void)
{
	
	GPIO_InitTypeDef GPIO_InitStruct={0};
	
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOC, ENABLE);
	
	
	GPIO_InitStruct.GPIO_Mode=GPIO_Mode_Out_PP;
	GPIO_InitStruct.GPIO_Pin=GPIO_Pin_13;
	GPIO_InitStruct.GPIO_Speed=GPIO_Speed_50MHz;
	GPIO_Init(GPIOC, &GPIO_InitStruct);
	
	
	
}



void Led_ON(void)
{
	GPIO_SetBits(GPIOC,GPIO_Pin_13);
}

void Led_OFF(void)
{
	GPIO_ResetBits(GPIOC,GPIO_Pin_13);
}

