#include "dht11.h"


/*
函数名：Dht11_Init
函数功能：温湿度初始化
返回值：void
形参：void
说明：
DHT11_DATA --- PB3 --- 通用开漏输出 --- 默认复用在JTAG-DP --- 重映射（映射表）
关闭JTAG 开启SW  --- 等待 1S 以越过不稳定状态（延时1s）--- 拉高DATA线

*/

void Dht11_Init(void)
{
	GPIO_InitTypeDef GPIO_InitStruct={0};
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOB, ENABLE);
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_AFIO, ENABLE);
	 
	GPIO_PinRemapConfig(GPIO_Remap_SWJ_JTAGDisable, ENABLE);//PB3重定设

	GPIO_InitStruct.GPIO_Mode=GPIO_Mode_Out_OD;//开漏输出
	GPIO_InitStruct.GPIO_Pin=GPIO_Pin_3;
	GPIO_InitStruct.GPIO_Speed=GPIO_Speed_50MHz;
	GPIO_Init(GPIOB, &GPIO_InitStruct);
	
	delay_ms(1000);
	
	DHT11_DATA_H;//拉高
}




/*
函数名：Dht11_Star
函数功能：起始信号
返回值：void
形参：void
说明：
拉低DATA线 --- 保持大于18ms（20ms延时）--- 拉高DATA线

*/


void Dht11_Star(void)
{
	DHT11_DATA_L;
	delay_ms(20);//保持大于18ms延时
	DHT11_DATA_H;
	
}


/*
函数名：Dht11_Response
函数功能：响应信号
返回值：void
形参：void
说明：
等待高电平结束 --- 超时操作（100us跳出） --- 等待83us低电平结束 --- 等待87us高电平结束

*/


u8 Dht11_Response(void)
{
		u8 cnt = 0;
	while(DHT11_DATA_IN)//等待高电平结束，等待响应信号的开始
	{
		delay_us(20);
		cnt++;
		if(cnt > 5)
		{
			return 1;
		}
	}
	while(!DHT11_DATA_IN);//等待83us低电平结束
	while(DHT11_DATA_IN);//等待87us高电平结束
	
	return 0;
}



/*
函数名：Dht11_Receive
函数功能：接收8bit数据（判断数据0  数据1）
返回值：void
形参：void
说明：
8次循环接收 --- 等待54us低电平结束 --- 延时40us --- 
IO接收低电平为数据0/IO接收到高电平为数据1 --- 等待高电平结束
*/


u8 Dht11_Receive(void)
{
	u8 i;
	u8 data = 0;
	
	for(i=0;i<8;i++)
	{
		while(!DHT11_DATA_IN);//等待54us低电平结束
		
		delay_us(40);
		data <<= 1;
		if(DHT11_DATA_IN)
		{
			
			data |= 1;
		}
		while(DHT11_DATA_IN);//等待高电平结束,准备下一位数据的接收
		
	}
	
	return data;
}




/*
函数名：Dht11_DataIntegration
函数功能：数据整合
返回值：void
形参：void
说明：
起始信号  --- 判断是否正常响应 --- 接收5次8bit数据 --- 校验数据 --- 数据处理
*/

float Hu = 0;
float Te = 0;
u8 Dht11_DataIntergration(float *te,float *hu)
{
	u8 data[5];
	Dht11_Star();//起始信号
	
	if(Dht11_Response() != 0)//判断是否正常响应
	{
		return 1;
	}
	
	data[0] = Dht11_Receive();//湿度整数
	data[1] = Dht11_Receive();//湿度小数
	data[2] = Dht11_Receive();//温度整数
	data[3] = Dht11_Receive();//温度小数
	data[4] = Dht11_Receive();//校验位
	
	if(data[4] == ((data[0] + data[1] +data[2] + data[3])&0xff))
	{
		*te = data[2]*1.0f + data[3]/10.0f;
		*hu = data[0]*1.0f + data[1]/10.0f;
		return 0;	
	}
	
	return 2;
	
}











































