---
title: 案例~C++多态(电脑组装)
author: 小杨呀
top: false
cover: false
toc: true
mathjax: false
index_img: 'https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/thumb-1920-689452.jpg'
tags:
  - 多态
categories:
  - C++课程笔记
abbrlink: 37fb
date: 2022-03-08 17:10:55
---

电脑组装

```cpp
#include <iostream>
#include <string>
using namespace std;
//抽象不同零件类
//抽象CPU类
class CPU
{
public:
	//抽象的计算函数
	virtual void calculate() = 0;
};
//抽象显卡类
class VideoCard
{
public:
	//抽象的显示函数
	virtual void display() = 0;
};
//抽象内存条类
class Memory
{
public:
	//抽象的存储函数
	virtual void storage() = 0;
};
 
//电脑类
class Computer
{
public:
	Computer(CPU* cpu, VideoCard* vc, Memory* mem):cpu(cpu),vc(vc),mem(mem){}
	//提供工作的函数
	void work()
	{
		//让零件工作起来调用接口
		cpu->calculate();
		vc->display();
		mem->storage();
	}
	~Computer()
	{
		if (cpu != nullptr)
		{
			delete cpu;
			cpu = nullptr;
			cout << "虚析构CPU" << endl;
		}
		 if (vc != nullptr)
		{
			delete vc;
			vc = nullptr;
			cout << "虚析构VC" << endl;
		}
		if (mem != nullptr)
		{
			delete mem;
			mem = nullptr;
			cout << "虚析构Mem" << endl;
		}
	}
protected:
	CPU* cpu;//CPU零件
	VideoCard* vc;//显卡零件
	Memory* mem;//内存条零件
};
 
//具体厂商
//Intel
class IntelCPU:public CPU
{
public:
	virtual void calculate()
	{
		cout << "Intel的CPU开始计算了" << endl;
	}
};
class IntelVC :public VideoCard
{
public:
	virtual void display()
	{
		cout << "Intel的显卡开始显示了" << endl;
	}
};
class IntelMem:public Memory
{
public:
	virtual void storage()
	{
		cout << "Intel的内存条开始储存了" << endl;
	}
};
//Lenovo
class LenovoCPU :public CPU
{
public:
	virtual void calculate()
	{
		cout << "Lenovo的CPU开始计算了" << endl;
	}
};
class LenovoVC :public VideoCard
{
public:
	virtual void display()
	{
		cout << "Lenovo的显卡开始显示了" << endl;
	}
};
class LenovoMem :public Memory
{
public:
	virtual void storage()
	{
		cout << "Lenovo的内存条开始储存了" << endl;
	}
};
void test()
{
	//创建电脑
	cout << "电脑1：" << endl;
	CPU* intelCpu = new IntelCPU;
	VideoCard* intelCard = new IntelVC;
	Memory* intelMem = new IntelMem;
	Computer* computer1 = new Computer(intelCpu, intelCard, intelMem);
	computer1->work();
	delete computer1;
	cout<< "--------------------------" << endl;
	cout << "电脑2："<<endl;
	computer1 = new Computer(new LenovoCPU, new LenovoVC, new LenovoMem);
	computer1->work();
	delete computer1;
	computer1 = nullptr;
}
 
int main()
{
	test();
	
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bgtkIH.png)
