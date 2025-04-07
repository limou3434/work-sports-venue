#include "dht11.h"


/*
��������Dht11_Init
�������ܣ���ʪ�ȳ�ʼ��
����ֵ��void
�βΣ�void
˵����
DHT11_DATA --- PB3 --- ͨ�ÿ�©��� --- Ĭ�ϸ�����JTAG-DP --- ��ӳ�䣨ӳ���
�ر�JTAG ����SW  --- �ȴ� 1S ��Խ�����ȶ�״̬����ʱ1s��--- ����DATA��

*/

void Dht11_Init(void)
{
	GPIO_InitTypeDef GPIO_InitStruct={0};
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOB, ENABLE);
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_AFIO, ENABLE);
	 
	GPIO_PinRemapConfig(GPIO_Remap_SWJ_JTAGDisable, ENABLE);//PB3�ض���

	GPIO_InitStruct.GPIO_Mode=GPIO_Mode_Out_OD;//��©���
	GPIO_InitStruct.GPIO_Pin=GPIO_Pin_3;
	GPIO_InitStruct.GPIO_Speed=GPIO_Speed_50MHz;
	GPIO_Init(GPIOB, &GPIO_InitStruct);
	
	delay_ms(1000);
	
	DHT11_DATA_H;//����
}




/*
��������Dht11_Star
�������ܣ���ʼ�ź�
����ֵ��void
�βΣ�void
˵����
����DATA�� --- ���ִ���18ms��20ms��ʱ��--- ����DATA��

*/


void Dht11_Star(void)
{
	DHT11_DATA_L;
	delay_ms(20);//���ִ���18ms��ʱ
	DHT11_DATA_H;
	
}


/*
��������Dht11_Response
�������ܣ���Ӧ�ź�
����ֵ��void
�βΣ�void
˵����
�ȴ��ߵ�ƽ���� --- ��ʱ������100us������ --- �ȴ�83us�͵�ƽ���� --- �ȴ�87us�ߵ�ƽ����

*/


u8 Dht11_Response(void)
{
		u8 cnt = 0;
	while(DHT11_DATA_IN)//�ȴ��ߵ�ƽ�������ȴ���Ӧ�źŵĿ�ʼ
	{
		delay_us(20);
		cnt++;
		if(cnt > 5)
		{
			return 1;
		}
	}
	while(!DHT11_DATA_IN);//�ȴ�83us�͵�ƽ����
	while(DHT11_DATA_IN);//�ȴ�87us�ߵ�ƽ����
	
	return 0;
}



/*
��������Dht11_Receive
�������ܣ�����8bit���ݣ��ж�����0  ����1��
����ֵ��void
�βΣ�void
˵����
8��ѭ������ --- �ȴ�54us�͵�ƽ���� --- ��ʱ40us --- 
IO���յ͵�ƽΪ����0/IO���յ��ߵ�ƽΪ����1 --- �ȴ��ߵ�ƽ����
*/


u8 Dht11_Receive(void)
{
	u8 i;
	u8 data = 0;
	
	for(i=0;i<8;i++)
	{
		while(!DHT11_DATA_IN);//�ȴ�54us�͵�ƽ����
		
		delay_us(40);
		data <<= 1;
		if(DHT11_DATA_IN)
		{
			
			data |= 1;
		}
		while(DHT11_DATA_IN);//�ȴ��ߵ�ƽ����,׼����һλ���ݵĽ���
		
	}
	
	return data;
}




/*
��������Dht11_DataIntegration
�������ܣ���������
����ֵ��void
�βΣ�void
˵����
��ʼ�ź�  --- �ж��Ƿ�������Ӧ --- ����5��8bit���� --- У������ --- ���ݴ���
*/

float Hu = 0;
float Te = 0;
u8 Dht11_DataIntergration(float *te,float *hu)
{
	u8 data[5];
	Dht11_Star();//��ʼ�ź�
	
	if(Dht11_Response() != 0)//�ж��Ƿ�������Ӧ
	{
		return 1;
	}
	
	data[0] = Dht11_Receive();//ʪ������
	data[1] = Dht11_Receive();//ʪ��С��
	data[2] = Dht11_Receive();//�¶�����
	data[3] = Dht11_Receive();//�¶�С��
	data[4] = Dht11_Receive();//У��λ
	
	if(data[4] == ((data[0] + data[1] +data[2] + data[3])&0xff))
	{
		*te = data[2]*1.0f + data[3]/10.0f;
		*hu = data[0]*1.0f + data[1]/10.0f;
		return 0;	
	}
	
	return 2;
	
}











































