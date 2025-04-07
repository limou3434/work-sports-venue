#include "pwm.h" 

void PWM_Init(void) //PWM初始化
{
	//GPIO的结构体定义，定义一个GPIO类型的结构体，名字为GPIO_InitStructure
	GPIO_InitTypeDef GPIO_InitStructure;
	//TIM_TimeBase的结构体定义，定义一个TIM_TimeBase类型的结构体，名字为TIM_TimeBaseInitStructure
	TIM_TimeBaseInitTypeDef TIM_TimeBaseInitStructure;
	//TIM_OC的结构体定义，定义一个TIM_OC类型的结构体，名字为TIM_OCInitStructure
	TIM_OCInitTypeDef TIM_OCInitStructure;
	
	//开启定时器3的时钟，注意是APB1（GPIO的是APB2）
	RCC_APB1PeriphClockCmd(RCC_APB1Periph_TIM3, ENABLE);
	//开启GPIO的时钟，注意是APB2
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);
	
	//GPIO引脚的重映射，TIM3_CH1重映射引脚到PB4
	//RCC_APB2PeriphClockCmd(RCC_APB2Periph_AFIO, ENABLE);
	//GPIO_PinRemapConfig(GPIO_PartialRemap1_TIM3, ENABLE);
	//GPIO_PinRemapConfig(GPIO_Remap_SWJ_JTAGDisable, ENABLE);
	
	GPIO_InitStructure.GPIO_Mode = GPIO_Mode_AF_PP;
	GPIO_InitStructure.GPIO_Pin = GPIO_Pin_6;		//GPIO_Pin_4;TIM3_CH1重映射引脚到PB4
	GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
	GPIO_Init(GPIOA, &GPIO_InitStructure); //GPIO_Init(GPIOB, &GPIO_InitStructure); //PB4
	
	//选择定时器的内部时钟源  TIM3
	TIM_InternalClockConfig(TIM3);
	
	//配置定时器时基单元：TIM_TimeBase
	//选择时钟分频，可以选择1分频、2分频和4分频
	TIM_TimeBaseInitStructure.TIM_ClockDivision = TIM_CKD_DIV1; //TIM_CKD_DIV1：1分频
	//选择定时器计数方式，可选择向上计数、向下计数、中心对齐计数
	TIM_TimeBaseInitStructure.TIM_CounterMode = TIM_CounterMode_Up; //TIM_CounterMode_Up：向上计数
	//设置ARR，即定时器周期：TIM_Period，取值0-65535
	TIM_TimeBaseInitStructure.TIM_Period = 20000 - 1;		//ARR
	//设置PSC，即定时器预分频器的值：TIM_Prescaler，取值0-65535
	TIM_TimeBaseInitStructure.TIM_Prescaler = 72 - 1;		//PSC
	//高级定时器才用的到，重复计算器，先用不上赋值为0
	TIM_TimeBaseInitStructure.TIM_RepetitionCounter = 0;
	//TIM_TimeBase初始化
	TIM_TimeBaseInit(TIM3, &TIM_TimeBaseInitStructure);
	
	//初始化配置定时器输出比较单元：TIM_OC
	//设置输出比较的模式：TIM_OCMode_PWM1，PWM1模式
	TIM_OCInitStructure.TIM_OCMode = TIM_OCMode_PWM1;
	//设置输出比较的极性：TIM_OCPolarity_High;高极性：有效电平为高电平
	TIM_OCInitStructure.TIM_OCPolarity = TIM_OCPolarity_High;
	//设置输出使能
	TIM_OCInitStructure.TIM_OutputState = TIM_OutputState_Enable;
	//设置捕获比较寄存器 CCR 的值
	TIM_OCInitStructure.TIM_Pulse = 0;		//CCR
	//初始化定时器3通道1
	TIM_OC1Init(TIM3, &TIM_OCInitStructure);
	
	//使能定时器3
	TIM_Cmd(TIM3, ENABLE);
}

void PWM_SetCompare1(uint16_t Compare)
{
	TIM_SetCompare1(TIM3, Compare); //设置捕获比较寄存器 CCR 的值
}

void Servo_SetAngle(float Angle) //输入需要设置的角度
{
	PWM_SetCompare1(Angle / 180 * 2000 + 500); //舵机角度转换
}
