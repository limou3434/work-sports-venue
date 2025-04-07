#include "main.h"
#include "adc.h"
// 全局变量定义
float angle = 0.0; // 舵机角度
uint16_t ad =0;
float adc =0;
float adc_average = 0;
int num_samples = 10;  // 采样次数
//主函数
int main()
{
	SystemInit();         //72M	  SYSCLK_FREQ_72MHz
	delay_init(72); 
	delay_ms(1000);
	NVIC_PriorityGroupConfig(NVIC_PriorityGroup_2);//设置中断优先级分组为组2：2位抢占优先级，2位响应优先级 
	TIM2_Int_Init(500-1,7200-1);//50ms 
	Led_Init();
	//Dht11_Init(); //温度传感器初始化
	PWM_Init(); 
	USART1_Init(9600); 
	//Beep_Init(); //蜂鸣器初始化
	IwdgInit(3, 5000);//2s
	AD_Init();
	Servo_SetAngle(0);//0-200  引脚PA6 
	
	while(1)
	{ 
	

	for (int i = 0; i < num_samples; i++) {
		int ad = ADC_Trans();  // 获取一次ADC采样
		adc_average += ad;     // 累加
		delay_ms(100);         // 延时，避免采样过快
	}

	adc_average /= num_samples;  // 计算平均值

// 将平均值转换为0-99的范围
	adc = adc_average * 99.0 / 4096.0;  
		
		
		
	}
}
