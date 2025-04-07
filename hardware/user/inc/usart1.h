#ifndef _USART1_H
#define _USART1_H

#include "stm32f10x.h"


#define RxBufLength 500 //(2068)//(64+6)//视实际情况定
#define TxBufLength 50 //发送数据长度

extern void Usart1DMASendData(void);
extern char RecBTBuf[2];//蓝牙接收数组 

void USART1DMASendBuff(const char *buff, unsigned int lenth);
void Usart1DMA1Init(void);
void USART1_Init(u32 Baud);
void BluetoothAnalyze(unsigned short Length,const unsigned char *ReceiveBuff,void *OutPutStruct);


#endif
