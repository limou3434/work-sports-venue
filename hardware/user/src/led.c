#include "led.h"

/*
��������Led_Init
�������ܣ�LED��ʼ��
����ֵ��void
�βΣ�void
˵����
�������̣�
1��	��ʱ�ӣ�GPIOA��GPIOB��
2��	��ʼ��PB11��PB14��PA11

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

