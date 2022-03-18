---
title: 51单片机~点亮LED并实现流水灯
top: false
cover: false
toc: true
mathjax: false
author: 小杨呀
index_img: 'https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/thumb-1920-71068.jpg'
tags:
  - stc51
  - 点灯
categories:
  - 单片机
abbrlink: 1d37
date: 2022-03-03 16:34:25
---

今天是寒假的第二天，之前通过某宝买了51单片机板想学学单片机但是在校没时间现在放寒假了终于可以尽情的学习单片机了虽然大二才有单片机课程，但是我想提前学习，昨天边看教程边耍，感觉还不错。由于没有数电模电基础所以电路看不懂但是教程视频里说不会影响只要有C语言基础就能，等以后学了数电模电再看前面的电路视频不迟。

记录一下昨天学过的东西

![](bY6zAx.png)

 点亮LED还是挺简单的，因为是<font color='orange'>正极</font>流进来所以要给P20<font color='orange'>低电平</font>就行了

```cpp
#include "reg52.h"
sbit LED1=P2^0;
void main()
{
    LED1=0;
    while(1);
}
```

然后是流水灯：

```cpp
#include "reg52.h"
typedef unsigned int u16;
#define LED_PORT	P2

void delay_10us(u16 ten_us)
{
	while(ten_us--);
}
void main()
{
	int i=0;
    while(1)
	{
			for(i=0;i<8;i++)
	     {
			LED_PORT=~(0x01<<i);//流水灯
			delay_10us(50000);
 		 }
	}
	
	
	while(1);
}
```

还有一种流水灯的做法是用库函数：<font color='red'>#include "intrins.h"</font>

```cpp
#include "reg52.h"
#include "intrins.h"
typedef unsigned int u16;
#define LED_PORT	P2
 
void delay_10us(u16 ten_us)
{
	while(ten_us--);
}
void main()
{
	int i=0;
	LED_PORT=~0x01;//首先第一个LED亮
	delay_10us(50000);//延时480毫秒左右
	while(1)
	{
				for(i=0;i<7;i++)
			{
					LED_PORT=_crol_(LED_PORT,1);//LED左边开始每次移动1位
					delay_10us(50000);
			}
				for(i=0;i<7;i++)
			{
					LED_PORT=_cror_(LED_PORT,1);
					delay_10us(50000);
			}	
	}
	
	
	while(1);
}
```

<font color='orange'>_crol_和_cror_</font>都是库函数，<font color='orange'>每次移动后不会自动补0而是把前面移出去的补到后面去</font>

![](bYg1JK.md.png)

 **视频实验：**

<iframe src="//player.bilibili.com/player.html?aid=680507409&bvid=BV1dS4y1T7Tq&cid=480480018&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" width="740px" height="480px" allowfullscreen="true"> </iframe>

