#include "iwdg.h"

//��ʼ���������Ź�
//prer:��Ƶ��:0~7(ֻ�е�3λ��Ч!)
//rlr:�Զ���װ��ֵ,0~0XFFF.
//��Ƶ����=4*2^prer.�����ֵֻ����256!
//rlr:��װ�ؼĴ���ֵ:��11λ��Ч.
//ʱ�����(���):Tout=((4*2^prer)*rlr)/32 (ms).
//prerȡ3��rlrȡ1000��ʱ�����Ϊ4*2^3*1000/32=1000ms=1s
void IwdgInit(unsigned char prer, unsigned int rlr)
{
	IWDG_WriteAccessCmd(IWDG_WriteAccess_Enable); //ʹ�ܶ�IWDG->PR IWDG->RLR��д
	IWDG_SetPrescaler(prer);					  //����IWDG��Ƶϵ��
	IWDG_SetReload(rlr);						  //����IWDGװ��ֵ
	IWDG_ReloadCounter();						  //reload
	IWDG_Enable();								  //ʹ�ܿ��Ź�
}

//ι�������Ź�
void IwdgFeed(void)
{
	IWDG_ReloadCounter(); //reload
}
