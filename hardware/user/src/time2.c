#include "time2.h"
#include "iwdg.h"
#include "usart1.h"
#include "main.h"
#include "string.h"

unsigned char Ms50_Flag = 0;//主函数50ms标志位，在主函数中置0

extern float adc;

//通用定时器3中断初始化
//这里时钟选择为APB1的2倍，而APB1为36M
//arr：自动重装值。
//psc：时钟预分频数
//这里使用的是定时器2
void TIM2_Int_Init(u16 arr,u16 psc)
{
  TIM_TimeBaseInitTypeDef  TIM_TimeBaseStructure;
	NVIC_InitTypeDef NVIC_InitStructure;

	RCC_APB1PeriphClockCmd(RCC_APB1Periph_TIM2, ENABLE); //时钟使能
	TIM_DeInit(TIM2);	

	//定时器TIM2初始化
	TIM_TimeBaseStructure.TIM_Period = arr; //设置在下一个更新事件装入活动的自动重装载寄存器周期的值	
	TIM_TimeBaseStructure.TIM_Prescaler =psc; //设置用来作为TIMx时钟频率除数的预分频值
	TIM_TimeBaseStructure.TIM_ClockDivision = TIM_CKD_DIV1; //设置时钟分割:TDTS = Tck_tim
	TIM_TimeBaseStructure.TIM_CounterMode = TIM_CounterMode_Up;  //TIM向上计数模式
	TIM_TimeBaseInit(TIM2, &TIM_TimeBaseStructure); //根据指定的参数初始化TIMx的时间基数单位
 
	TIM_ITConfig(TIM2,TIM_IT_Update,ENABLE ); //使能指定的TIM2中断,允许更新中断

	//中断优先级NVIC设置
	NVIC_InitStructure.NVIC_IRQChannel = TIM2_IRQn;  //TIM2中断
	NVIC_InitStructure.NVIC_IRQChannelPreemptionPriority = 0;  //先占优先级0级
	NVIC_InitStructure.NVIC_IRQChannelSubPriority = 0;  //从优先级0级
	NVIC_InitStructure.NVIC_IRQChannelCmd = ENABLE; //IRQ通道被使能
	NVIC_Init(&NVIC_InitStructure);  //初始化NVIC寄存器


	TIM_Cmd(TIM2, ENABLE);  //使能TIMx	
	TIM_ClearITPendingBit(TIM2, TIM_IT_Update  );				 
}
//定时器2中断服务程序
short Tim_cnt = 0;
char SendBluetoothHu[8] = {0xFE,0x09,0x00,0x00,0xFE,0x08,0x00,0x00};
char SendBluetoothTe[4] = {0xFE,0x09,0x00,0x00};
float tempC = 0;
float tempD = 0;
char buffer[50]; // A buffer to hold the formatted string
void TIM2_IRQHandler(void)   //TIM3中断
{
	static unsigned short WDCounter = 0;
	static unsigned short TimCounter = 0;
	if (TIM_GetITStatus(TIM2, TIM_IT_Update) != RESET)  //检查TIM3更新中断发生与否
	{
			TIM_ClearITPendingBit(TIM2, TIM_IT_Update);  //清除TIMx更新中断标志 
			Ms50_Flag = 1;
			if(++ WDCounter >= 10) //500ms喂狗
			{
				WDCounter = 0;
				IwdgFeed();
				
//				if(RecBTBuf[0] == 0x01 && RecBTBuf[1] == 0x01)
//				{
//					angle  = 50;
//				}
//				else if(RecBTBuf[0] == 0x02 && RecBTBuf[1] == 0x01)
//				{
//					angle  = 100;
//				}
//				else if(RecBTBuf[0] == 0x03 && RecBTBuf[1] == 0x01)
//				{
//					angle  = 150;
//				}
//				else if(RecBTBuf[0] == 0x04 && RecBTBuf[1] == 0x01)
//				{
//					angle  = 190;
//				}
//				else
//				{
//					angle = 0;
//				}
    
    

    // Format the float value into the buffer as "PPM:10.123"
    snprintf(buffer, sizeof(buffer), "PPM:%.3f\r\n", adc);  // .3f will limit the float to 3 decimal places

    // Send the formatted string via USART
    USART1DMASendBuff(buffer, strlen(buffer));
			}
			
			if(++TimCounter >= 20) //1s
			{
				TimCounter = 0;
				Tim_cnt += 1;
				/*
				SendBluetoothHu[2] = (unsigned char)Hu;
				tempC = Hu - SendBluetoothHu[2];
				SendBluetoothHu[3] = (unsigned char)(tempC * 100);
				
				SendBluetoothHu[6] = (unsigned char)Te;
				tempD = Te - SendBluetoothHu[6];
				SendBluetoothHu[7] = (unsigned char)(tempD * 100);
				
				USART1DMASendBuff(SendBluetoothHu,sizeof(SendBluetoothHu));
				*/
			}

	}
}
