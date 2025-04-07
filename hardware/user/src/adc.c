#include "adc.h"



void AD_Init(void)
{
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_ADC1,ENABLE);
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA,ENABLE);
	
	RCC_ADCCLKConfig(RCC_PCLK2_Div6);	//6分频 分频之后ADCCLK = 72MHz / 6 = 12MHz
	
	GPIO_InitTypeDef GPIO_InitStructure;
	GPIO_InitStructure.GPIO_Mode  = GPIO_Mode_AIN;	
	//在AIN模式下 GPIO口是无效的 断开GPIO口防止输入输出对模拟电压造成干扰 AIN模式算是ADC的专属模式
	GPIO_InitStructure.GPIO_Pin   = GPIO_Pin_0;
	GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
	GPIO_Init(GPIOA,&GPIO_InitStructure);	
	
	//选择规则组的输入通道
	ADC_RegularChannelConfig(ADC1,ADC_Channel_0,1,ADC_SampleTime_55Cycles5);
	//目前只有PA0一个通道 使用的是非扫描模式 所以指定的通道就放在序列1的位置
	//需要快的转换就选择小的参数 需要稳定的选择大参数 没要求则任选 此时采样时间为55.5个ADCCLK的周期
	
	//如果需要在序列2的位置写入其他通道 那就复制代码把序列数递增 每多一个序列数递增+1 并指定想要的通道
	//ADC_RegularChannelConfig(ADC1,ADC_Channel_0,2,ADC_SampleTime_55Cycles5);
	//每个通道可以选择不一样的采样时间 修改最后一个参数即可
	
	//初始化ADC
	ADC_InitTypeDef ADC_InitStructure;
	ADC_InitStructure.ADC_ContinuousConvMode = DISABLE;
	//选择连续转换or单次转换 enable是连续模式 disable是单次模式
	ADC_InitStructure.ADC_DataAlign	= ADC_DataAlign_Right;	//数据对齐
	ADC_InitStructure.ADC_ExternalTrigConv = ADC_ExternalTrigConv_None;
	//外部触发转换选择 这里不适用外部触发 none 使用软件触发
	ADC_InitStructure.ADC_Mode = ADC_Mode_Independent;//选择工作在独立模式还是双ADC模式
	ADC_InitStructure.ADC_NbrOfChannel = 1;	//通道数目 指定在扫描模式下会用到几个通道 
	//这个参数在扫描模式下需要用 非扫描模式下整个列表只有第一个序列有效 写多少都没用
	ADC_InitStructure.ADC_ScanConvMode = DISABLE; 
	//扫描模式or非扫描模式 enable是扫描模式 disable是非扫描模式
	ADC_Init(ADC1,&ADC_InitStructure);
	
	//开启ADC的电源
	ADC_Cmd(ADC1,ENABLE);
	
	//这里ADC_Cmd函数放在校准函数前面是对的，up给的数据手册是2010年翻译的，是错误的
	// 2017年的数据手册已更正，实际上正确的表述应该是：ADC上电后最少两个周期才能校准
	
	
	ADC_ResetCalibration(ADC1);	//复位校准
	while(ADC_GetResetCalibrationStatus(ADC1) == SET);	//获取复位校准状态
	//加上while循环 如果没有校准完成就在while空循环里等待
	//一旦标志位被硬件清0 这个空循环会自动跳出
	ADC_StartCalibration(ADC1);	//开始校准
	while(ADC_GetCalibrationStatus(ADC1) == SET);	//获取开始校准状态
	//这部分函数在ADC初始化完成之后依次调用即可
}
uint16_t AD_GetValue(void)
{
	ADC_SoftwareStartConvCmd(ADC1,ENABLE);//软件触发转换函数
	while(ADC_GetFlagStatus(ADC1,ADC_FLAG_EOC) == RESET);//第二个参数 规则组转换完成标志位
	//具体配置时间计算：通道的采样周期是55.5 转换周期是固定的12.5 加在一起是68个周期
	//前面配置的ADCCLK是72MHz的6分频 就是12MHz 12MHz进行68个周期才能转换完成
	//最终的时间是 1/12M * 68 = 5.6us 所以这个while循环大约会等待5.6us
	return ADC_GetConversionValue(ADC1); //返回值是ADC1的转换结果
	
}
 

u16 ADC_Trans(void)
{
	u16 adc_value = 0;
	u8 i = 0;
	
	for(i = 0; i < 50; i++)
	{ 
		//开始转换
		ADC_SoftwareStartConvCmd(ADC1,ENABLE);
		
		//转换是否结束
		while(ADC_GetFlagStatus(ADC1,ADC_FLAG_EOC) != SET);
		adc_value = adc_value + ADC_GetConversionValue(ADC1);//读ADC中的值
	}
	
	return adc_value / 50;//取样50次的平均值
}

