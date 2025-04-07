#ifndef _LED_H
#define _LED_H

#include "includes.h"
#include "io_bit.h"

#define LED1 PCout(13)
#define LED2 PBout(14)
#define LED3 PAout(11)

void Led_Init(void);
void Led_OFF(void);
void Led_ON(void);

#endif
