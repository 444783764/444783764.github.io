---
title: 案例~C++多态思想(计算加减乘除例子)
author: 小杨呀
top: false
cover: false
toc: true
mathjax: false
index_img: 'https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/thumb-1920-553683.jpg'
tags:
  - 多态
  - 例子
categories:
  - C++课程笔记
abbrlink: 982a
date: 2022-03-08 17:04:00
---

普通写法

```cpp
#include <iostream>
#include <string>
using namespace std;
//普通写法
class Counter
{
public:
	int Count(string symbol)
	{
		if (symbol == "+")
		{
			return num1 + num2;
		}
		else if (symbol == "-")
		{
			return num1 - num2;
		}
		else if (symbol == "*")
		{
			return num1 * num2;
		}
		else if (symbol == "/");
		{
			return num1 / num2;
		}
        //如果想扩展新功能，需要修改源码
        //在真实开发中提倡  开闭原则
        //开闭原则：对扩展进行开放，对修改进行关闭
	}
	int& getNum1()
	{
		return num1;
	}
	int& getNum2()
	{
		return num2;
	}
	
protected:
	int num1;
	int num2;
};
void test1()
{
	Counter c;
	c.getNum1() = 10;
	c.getNum2() = 20;
	cout << c.getNum1() << "+" << c.getNum2() << "=" << c.Count("+") << endl;
	cout << c.getNum1() << "-" << c.getNum2() << "=" << c.Count("-") << endl;
	cout << c.getNum1() << "*" << c.getNum2() << "=" << c.Count("*") << endl;
	cout << c.getNum1() << "/" << c.getNum2() << "=" << c.Count("/") << endl;
}
int main()
{
	test1();
 
 
 
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bgYCNj.png)

多态写法：

多态好处：

- <font color='orange'>组织结构清晰</font>
- <font color='orange'>可读性强</font>
- <font color='orange'>对于前期和后期扩展以及维护性高</font>

```cpp
#include <iostream>
#include <string>
using namespace std;
//多态
//实现计算器抽象类
class Counter
{
public:
	virtual int count()
	{
		return 0;
	}
	
	int& getNum1()
	{
		return num1;
	}
	int& getNum2()
	{
		return num2;
	}
	
protected:
	int num1;
	int num2;
};
//加法
class Add :public Counter
{
public:
	int count()
	{
		return getNum1()+getNum2();
	}
};
//减法
class Sub :public Counter
{
public:
	int count()
	{
		return getNum1() - getNum2();
	}
};
//乘法
class Mul :public Counter
{
public:
	int count()
	{
		return getNum1() * getNum2();
	}
};
//除法
class Mod :public Counter
{
public:
	int count()
	{
		return getNum1() / getNum2();
	}
};
 
void test()
{
	//多态使用条件
	//父类指针或者引用指向子类对象
	//加法
	Counter* abc = new Add;
	abc->getNum1() = 10;
	abc->getNum2() = 20;
	cout << abc->getNum1() << "+" << abc->getNum2() << "=" << abc->count() << endl;
	delete abc;
	//减法
	abc = new Sub;
	abc->getNum1() = 30;
	abc->getNum2() = 10;
	cout << abc->getNum1() << "-" << abc->getNum2() << "=" << abc->count() << endl;
    delete abc;
	//乘法
	abc = new Mul;
	abc->getNum1() = 40;
	abc->getNum2() = 30;
	cout << abc->getNum1() << "*" << abc->getNum2() << "=" << abc->count() << endl;
    delete abc;
	//除法
	abc = new Mod;
	abc->getNum1() = 64;
	abc->getNum2() = 8;
	cout << abc->getNum1() << "/" << abc->getNum2() << "=" << abc->count() << endl;
    delete abc;
}
int main()
{
	test();
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bgYSHg.png)
