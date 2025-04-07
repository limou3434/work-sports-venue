#include "usart1.h"
#include "string.h"
#include "main.h"

u8 TxUsart1DMABuffer[TxBufLength];
u8 RcUsart1DMABuffer[RxBufLength];

//DMA初始化函数
//MemoryBaseAddrSend为从内存中发送数据的地址
//MemoryBaseAddrRec为接收数据的地址
void Usart1DMA1Init(void)
{
	//DMA配置 串口1接收用的是 DMA1  channel5
	//        串口1发送用的是 DMA1  channel4
	DMA_InitTypeDef DMA_InitStructure;
	RCC_AHBPeriphClockCmd(RCC_AHBPeriph_DMA1, ENABLE);

	//配置串口1接收DMA Rx
	DMA_DeInit(DMA1_Channel5);
	DMA_InitStructure.DMA_PeripheralBaseAddr	= (uint32_t)&USART1->DR;                         /* DMA外设ADC基地址 */
	DMA_InitStructure.DMA_MemoryBaseAddr		= (u32)RcUsart1DMABuffer;                         /* DMA内存基地址 */
	DMA_InitStructure.DMA_DIR			= DMA_DIR_PeripheralSRC;       														 /* 数据传输方向，从串口到内存 */
	DMA_InitStructure.DMA_BufferSize		= RxBufLength;                         											  /* DMA通道的DMA缓存的大小 */
	DMA_InitStructure.DMA_PeripheralInc		= DMA_PeripheralInc_Disable;                     /* 外设地址寄存器不变 */
	DMA_InitStructure.DMA_MemoryInc			= DMA_MemoryInc_Enable;                            /* 内存地址寄存器递增 */
	DMA_InitStructure.DMA_PeripheralDataSize	= DMA_PeripheralDataSize_Byte;               /* 数据宽度为8位 */
	DMA_InitStructure.DMA_MemoryDataSize		= DMA_MemoryDataSize_Byte;                     /* 数据宽度为8位 */
	DMA_InitStructure.DMA_Mode			= DMA_Mode_Normal;                                     /* 工作在正常缓存模式 */
	DMA_InitStructure.DMA_Priority			= DMA_Priority_High;                             /* DMA通道 x拥有中优先级 */
	DMA_Init( DMA1_Channel5, &DMA_InitStructure ); 
	DMA_Cmd(DMA1_Channel5, ENABLE);

	//配置串口1 DMA发送 TX
	DMA_DeInit(DMA1_Channel4);
	DMA_InitStructure.DMA_PeripheralBaseAddr = (uint32_t)&USART1->DR;
	DMA_InitStructure.DMA_MemoryBaseAddr = (u32)TxUsart1DMABuffer;
	DMA_InitStructure.DMA_DIR = DMA_DIR_PeripheralDST;
	DMA_InitStructure.DMA_MemoryDataSize = DMA_MemoryDataSize_Byte;
	DMA_InitStructure.DMA_PeripheralDataSize = DMA_MemoryDataSize_Byte;
	DMA_InitStructure.DMA_BufferSize = TxBufLength;
	DMA_InitStructure.DMA_PeripheralInc = DMA_PeripheralInc_Disable;
	DMA_InitStructure.DMA_Mode = DMA_Mode_Normal;
	DMA_InitStructure.DMA_Priority = DMA_Priority_High;
	DMA_Init(DMA1_Channel4, &DMA_InitStructure);
	DMA_Cmd(DMA1_Channel4, ENABLE);
}


void USART1_Init(u32 Baud)
{ 
  //GPIO端口设置
  GPIO_InitTypeDef GPIO_InitStructure;
	USART_InitTypeDef USART_InitStructure;
	NVIC_InitTypeDef NVIC_InitStructure;
	 
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_USART1|RCC_APB2Periph_GPIOA, ENABLE);	//使能USART1，GPIOA时钟
  
	//USART1_TX   GPIOA.9
  GPIO_InitStructure.GPIO_Pin = GPIO_Pin_9; //PA.9
  GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
  GPIO_InitStructure.GPIO_Mode = GPIO_Mode_AF_PP;	//复用推挽输出
  GPIO_Init(GPIOA, &GPIO_InitStructure);//初始化GPIOA.9
   
  //USART1_RX	  GPIOA.10初始化
  GPIO_InitStructure.GPIO_Pin = GPIO_Pin_10;//PA10
  GPIO_InitStructure.GPIO_Mode = GPIO_Mode_IN_FLOATING;//浮空输入
  GPIO_Init(GPIOA, &GPIO_InitStructure);//初始化GPIOA.10  

 
   //USART 初始化设置

	USART_InitStructure.USART_BaudRate = Baud;//串口波特率
	USART_InitStructure.USART_WordLength = USART_WordLength_8b;//字长为8位数据格式
	USART_InitStructure.USART_StopBits = USART_StopBits_1;//一个停止位
	USART_InitStructure.USART_Parity = USART_Parity_No;//无奇偶校验位
	USART_InitStructure.USART_HardwareFlowControl = USART_HardwareFlowControl_None;//无硬件数据流控制
	USART_InitStructure.USART_Mode = USART_Mode_Rx | USART_Mode_Tx;	//收发模式
	USART_Init(USART1, &USART_InitStructure);
	USART_Cmd(USART1, ENABLE);

  //Usart1 NVIC 配置
  NVIC_InitStructure.NVIC_IRQChannel = USART1_IRQn;
	NVIC_InitStructure.NVIC_IRQChannelPreemptionPriority = 0 ;//抢占优先级0
	NVIC_InitStructure.NVIC_IRQChannelSubPriority = 1;		//子优先级1
	NVIC_InitStructure.NVIC_IRQChannelCmd = ENABLE;			//IRQ通道使能
	NVIC_Init(&NVIC_InitStructure);	//根据指定的参数初始化VIC寄存器


	USART_ITConfig(USART1, USART_IT_TC, DISABLE);	//使能USART1传输完成中断
	USART_ITConfig(USART1, USART_IT_RXNE, DISABLE); //禁止USART1接收不为空中断
	USART_ITConfig(USART1, USART_IT_TXE, DISABLE);	//禁止USART1发送空中断
	USART_ITConfig(USART1, USART_IT_IDLE, ENABLE);	//开启USART1空闲中断
	USART_DMACmd(USART1, USART_DMAReq_Tx, ENABLE);
	USART_DMACmd(USART1, USART_DMAReq_Rx, ENABLE);
	

	Usart1DMA1Init();
	USART_Cmd(USART1, ENABLE); //使能串口
}

char RecBTBuf[2] = {0};
void USART1_IRQHandler(void)
{
	u8 res;
	u16 len;
	if (USART_GetITStatus(USART1, USART_IT_IDLE) != RESET) //若有空闲中断
	{
		DMA_Cmd(DMA1_Channel5, DISABLE); //关闭DMA2通道
		//清除空闲中断
		res = USART1->SR;
		res = USART1->DR;
		
		len = RxBufLength - DMA_GetCurrDataCounter(DMA1_Channel5);
		
		BluetoothAnalyze(len,RcUsart1DMABuffer,RecBTBuf);

		//开启DMA通道5传输                                                                  /*处理*/
		DMA_ClearFlag(DMA1_FLAG_GL5 | DMA1_FLAG_TC5 | DMA1_FLAG_HT5 | DMA1_FLAG_TE5);
		DMA_SetCurrDataCounter(DMA1_Channel5, RxBufLength); 
		DMA_Cmd(DMA1_Channel5, ENABLE);
	}
}
	
	
void Usart1DMASendData(void)
{
	//开启DMA通道4传输 
	DMA_Cmd(DMA1_Channel4, DISABLE);
	//DMA_ClearFlag(1);
	DMA_ClearFlag(DMA1_FLAG_GL4 | DMA1_FLAG_TC4 | DMA1_FLAG_HT4 | DMA1_FLAG_TE4);
	DMA_SetCurrDataCounter(DMA1_Channel4, TxBufLength);
	DMA_Cmd(DMA1_Channel4, ENABLE);
}


void USART1DMASendBuff(const char *buff, unsigned int lenth)
{
	memcpy(TxUsart1DMABuffer, buff, lenth);
	//开启DMA1传输通道
	DMA_Cmd(DMA1_Channel4,DISABLE);
	DMA_ClearFlag(DMA1_FLAG_GL4 | DMA1_FLAG_TC4 | DMA1_FLAG_HT4 | DMA1_FLAG_TE4);
	DMA_SetCurrDataCounter(DMA1_Channel4, lenth);
	DMA_Cmd(DMA1_Channel4, ENABLE);
//	while(DMA_GetFlagStatus(DMA1_FLAG_TC4) == RESET);
}

 

void BluetoothAnalyze(unsigned short Length,const unsigned char *ReceiveBuff,void *OutPutStruct)
{
    if(Length < 6) return;  // 命令长度至少为6个字符
    
    if(strncmp((const char*)ReceiveBuff, "door:", 5) != 0) return;  // 检查前缀
    
    // 根据命令字符设置舵机角度
    if(ReceiveBuff[5] == '1')
    {
        angle = 100;
//        USART1DMASendBuff("Door opened\r\n", 12);
    }
    else if(ReceiveBuff[5] == '0')
    {


        angle = 0;
//        USART1DMASendBuff("Door closed\r\n", 12);
    }
    Servo_SetAngle(angle);  // 更新舵机位置
    
}
