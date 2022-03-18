---
title: 案例~C++多态思想(制作饮品)
author: 小杨呀
top: false
cover: false
toc: true
mathjax: false
index_img: 'https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/thumb-1920-96803.jpg'
tags:
  - 多态
categories:
  - C++课程笔记
abbrlink: cb6c
date: 2022-03-08 17:14:01
---

制作饮品

```cpp
#include <iostream>
#include <string>
using namespace std;
 
class Drink
{
public:
	//煮水
	virtual void Boil() = 0;
	//冲泡
	virtual void Brew() = 0;
	//倒入杯子
	virtual void PutInCap() = 0;
	//加入辅料
	virtual void Accessory() = 0;
	//制作饮品
	virtual void MakeDrink()
	{
		Boil();
		Brew();
		PutInCap();
		Accessory();
	}
};
//制作咖啡
class Coffee :public Drink
{
public:
	//煮水
	virtual void Boil()
	{
		cout << "煮农夫山泉" << endl;
	}
	//冲泡
	virtual void Brew()
	{
		cout << "冲泡咖啡" << endl;
	}
	//倒入杯子
	virtual void PutInCap()
	{
		cout << "倒入杯子" << endl;
	}
	//加入辅料
	virtual void Accessory()
	{
		cout << "加入糖和牛奶" << endl;
	}
};
//制作茶
class Tea :public Drink
{
public:
	//煮水
	virtual void Boil()
	{
		cout << "煮开水" << endl;
	}
	//冲泡
	virtual void Brew()
	{
		cout << "冲泡茶叶" << endl;
	}
	//倒入杯子
	virtual void PutInCap()
	{
		cout << "倒入茶壶" << endl;
	}
	//加入辅料
	virtual void Accessory()
	{
		cout << "加入辣椒粉" << endl;
	}
};
//制作函数
void doWork(Drink* object)
{
	object->MakeDrink();
	delete object;
}
void test()
{
	//制作咖啡
	doWork(new Coffee);
	//制作茶
	cout << endl;
	doWork(new Tea);
}
int main()
{
	test();
	
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bgthwD.png)
