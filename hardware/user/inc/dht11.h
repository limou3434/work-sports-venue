#ifndef _DHT11_H
#define _DHT11_H

#include "includes.h"
#include "delay.h"
#include "stdio.h"


#define DHT11_DATA_H PBout(3)=1
#define DHT11_DATA_L PBout(3)=0
#define DHT11_DATA_IN PBin(3)

extern float Hu;
extern float Te;

void Dht11_Init(void);
u8 Dht11_DataIntergration(float *te,float *hu);


#endif
