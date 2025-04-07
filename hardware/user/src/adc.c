#include "adc.h"



void AD_Init(void)
{
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_ADC1,ENABLE);
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA,ENABLE);
	
	RCC_ADCCLKConfig(RCC_PCLK2_Div6);	//6��Ƶ ��Ƶ֮��ADCCLK = 72MHz / 6 = 12MHz
	
	GPIO_InitTypeDef GPIO_InitStructure;
	GPIO_InitStructure.GPIO_Mode  = GPIO_Mode_AIN;	
	//��AINģʽ�� GPIO������Ч�� �Ͽ�GPIO�ڷ�ֹ���������ģ���ѹ��ɸ��� AINģʽ����ADC��ר��ģʽ
	GPIO_InitStructure.GPIO_Pin   = GPIO_Pin_0;
	GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
	GPIO_Init(GPIOA,&GPIO_InitStructure);	
	
	//ѡ������������ͨ��
	ADC_RegularChannelConfig(ADC1,ADC_Channel_0,1,ADC_SampleTime_55Cycles5);
	//Ŀǰֻ��PA0һ��ͨ�� ʹ�õ��Ƿ�ɨ��ģʽ ����ָ����ͨ���ͷ�������1��λ��
	//��Ҫ���ת����ѡ��С�Ĳ��� ��Ҫ�ȶ���ѡ������ ûҪ������ѡ ��ʱ����ʱ��Ϊ55.5��ADCCLK������
	
	//�����Ҫ������2��λ��д������ͨ�� �Ǿ͸��ƴ�������������� ÿ��һ������������+1 ��ָ����Ҫ��ͨ��
	//ADC_RegularChannelConfig(ADC1,ADC_Channel_0,2,ADC_SampleTime_55Cycles5);
	//ÿ��ͨ������ѡ��һ���Ĳ���ʱ�� �޸����һ����������
	
	//��ʼ��ADC
	ADC_InitTypeDef ADC_InitStructure;
	ADC_InitStructure.ADC_ContinuousConvMode = DISABLE;
	//ѡ������ת��or����ת�� enable������ģʽ disable�ǵ���ģʽ
	ADC_InitStructure.ADC_DataAlign	= ADC_DataAlign_Right;	//���ݶ���
	ADC_InitStructure.ADC_ExternalTrigConv = ADC_ExternalTrigConv_None;
	//�ⲿ����ת��ѡ�� ���ﲻ�����ⲿ���� none ʹ���������
	ADC_InitStructure.ADC_Mode = ADC_Mode_Independent;//ѡ�����ڶ���ģʽ����˫ADCģʽ
	ADC_InitStructure.ADC_NbrOfChannel = 1;	//ͨ����Ŀ ָ����ɨ��ģʽ�»��õ�����ͨ�� 
	//���������ɨ��ģʽ����Ҫ�� ��ɨ��ģʽ�������б�ֻ�е�һ��������Ч д���ٶ�û��
	ADC_InitStructure.ADC_ScanConvMode = DISABLE; 
	//ɨ��ģʽor��ɨ��ģʽ enable��ɨ��ģʽ disable�Ƿ�ɨ��ģʽ
	ADC_Init(ADC1,&ADC_InitStructure);
	
	//����ADC�ĵ�Դ
	ADC_Cmd(ADC1,ENABLE);
	
	//����ADC_Cmd��������У׼����ǰ���ǶԵģ�up���������ֲ���2010�귭��ģ��Ǵ����
	// 2017��������ֲ��Ѹ�����ʵ������ȷ�ı���Ӧ���ǣ�ADC�ϵ�������������ڲ���У׼
	
	
	ADC_ResetCalibration(ADC1);	//��λУ׼
	while(ADC_GetResetCalibrationStatus(ADC1) == SET);	//��ȡ��λУ׼״̬
	//����whileѭ�� ���û��У׼��ɾ���while��ѭ����ȴ�
	//һ����־λ��Ӳ����0 �����ѭ�����Զ�����
	ADC_StartCalibration(ADC1);	//��ʼУ׼
	while(ADC_GetCalibrationStatus(ADC1) == SET);	//��ȡ��ʼУ׼״̬
	//�ⲿ�ֺ�����ADC��ʼ�����֮�����ε��ü���
}
uint16_t AD_GetValue(void)
{
	ADC_SoftwareStartConvCmd(ADC1,ENABLE);//�������ת������
	while(ADC_GetFlagStatus(ADC1,ADC_FLAG_EOC) == RESET);//�ڶ������� ������ת����ɱ�־λ
	//��������ʱ����㣺ͨ���Ĳ���������55.5 ת�������ǹ̶���12.5 ����һ����68������
	//ǰ�����õ�ADCCLK��72MHz��6��Ƶ ����12MHz 12MHz����68�����ڲ���ת�����
	//���յ�ʱ���� 1/12M * 68 = 5.6us �������whileѭ����Լ��ȴ�5.6us
	return ADC_GetConversionValue(ADC1); //����ֵ��ADC1��ת�����
	
}
 

u16 ADC_Trans(void)
{
	u16 adc_value = 0;
	u8 i = 0;
	
	for(i = 0; i < 50; i++)
	{ 
		//��ʼת��
		ADC_SoftwareStartConvCmd(ADC1,ENABLE);
		
		//ת���Ƿ����
		while(ADC_GetFlagStatus(ADC1,ADC_FLAG_EOC) != SET);
		adc_value = adc_value + ADC_GetConversionValue(ADC1);//��ADC�е�ֵ
	}
	
	return adc_value / 50;//ȡ��50�ε�ƽ��ֵ
}

