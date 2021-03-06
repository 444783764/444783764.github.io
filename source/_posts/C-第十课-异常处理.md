---
title: C++第十课---异常处理
author: 小杨呀
top: false
cover: false
toc: true
mathjax: false
index_img: 'https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/thumb-1920-738230.jpg'
tags:
  - 异常
categories:
  - C++课程笔记
abbrlink: b3c7
date: 2022-03-08 17:53:38
---

## 1.  基本的异常处理

- 异常处理机制：暂缓问题处理，不在当前函数中处理，在他调用者中处理

- 什么是异常？ 任何东西都可以认为是异常，错误只是异常中的一种

- 异常一旦抛出，不做处理，如果引发中断，会调用默认<font color='orange'>abort</font>终止程序

- 捕获和处理异常



① <font color='orange'>throw </font>抛出异常（可以理解为返回值，值是任何类型都可以，是我们处理异常一个参照）

② <font color='orange'>try</font>(检查，捕获)

③ <font color='orange'>catch</font>(处理异常)

- 由于 <font color='orange'>catch(...)</font> 能匹配任何类型的异常，它后面的 catch 块实际上就不起作用，因此<font color='orange'>不要将它写在其他 catch 块前面。</font>

  ```cpp
  //try与catch必须是一起出现，并且他们{}不能省略
  try
  {
  	//正常要检查是否存在异常代码
  }
  catch (类型)//理解为switch中case语句
  {
  	//处理是根据抛出数据类型决定如何处理
  }
  //一个try可以对应多个catch
  catch (int){}
  catch (double){}
  catch (string){}
  //catch和if else_if 执行机制一样的，只能执行一个匹配项
  ```

  ```cpp
   
  int Div(int a, int b)
  {
  	if (b == 0)
  	{
  		throw 0;//抛出异常
  	}
  	return a / b;
  }
  void print(int a,int b)
  {
  	cout << Div(a,b);
  }
  int main()
  {
  	try
  	{
  		print(5, 0);
  	}
  	catch (int)
  	{
  		cout << "除数不能为0" << endl;
  	}
  	//不能存在两个相同类型的catch
  	/*catch (int)
  	{
  		cout << "除数不能为0!!" << endl;
  	}*/
   
  	//删减符 ...  任何类型异常都捕获
  	catch (...)//同样不能存在两个...catch
  	{
  		cout << "除数不能为0" << endl;
  	}
  	return 0;
  }
  ```

- 不存在异常的描述

<font color='orange'>throw()</font>

<font color='orange'>noexcept</font>（c++11新增关键字）

表示告诉别人这个函数<font color='red'>不存在异常</font>

```cpp
void print()throw()
{
	cout << "当前函数不存在抛出异常操作" << endl;
}
void print2()noexcept//新标准
{
	cout << "新的描述：不存在抛出异常" << endl;
	//throw 0;//不能存在抛出操作，会报错
}
```



## 2.  异常处理中的传参

- catch(int a) //隐藏了一个传参操作
- 想要处理抛出字符串的异常处理，注意<font color='orange'>string</font>类型和<font color='orange'>const char* </font>类型的区别
- 异常处理传参类型<font color='orange'>很严格</font>

```cpp
#include <iostream>
#include <string>
using namespace std;
 
int Div(int a, int b)
{
	if (b == 0)
		throw "除数不能为0";
	if (b == 1)
		throw "除数不能为1";
	if (b == 2)
		throw string("除数不能为2");//string类型
	return a / b;
}
void print(int a,int b)
{
	cout << Div(a,b);
}
int main()
{
	try
	{
		print(5, 2);
	}
	catch (const char* str)
	{
		cout << str << endl;
	}
	catch (string str)
	{
		cout << str << endl;
	}
	return 0;
}
```

```cpp
#include <iostream>
#include <string>
using namespace std;
 
class Error
{
public:
	Error(string str="未知错误"):str(str){}
	const char* what()const
	{
		return str.c_str();
	}
	/*string getstr()
	{
		return str;
	}*/
protected:
	string str;
};
void insertArray(int array[], int* curNum, int data, int maxLength)
{
	if (*curNum >= maxLength)
	{
		throw Error("数组下标溢出");
	}
	array[(*curNum)] = data;
	(*curNum)++;
}
 
int main()
{
	try
	{
		int array[3] = { 0,0,0 };
		int curNum = 0;
		for (int i = 0; i <4; i++)
		{
			insertArray(array, &curNum, i, 3);
		}
	}
	catch (Error str)
	{
		//cout << str.getstr()<< endl;
		cout << str.what()<< endl;
	}
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bgDJM9.png)

## 3.  标准库中的异常类

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bgDUVx.png)

```cpp
#include <iostream>
#include <exception>//头文件
#include <string>
using namespace std;
 
class Exception
{
public:
	Exception(const char* ptr="UNKNOW"):ptr(const_cast<char*>(ptr)){}
	virtual const char* what()const
	{
		return ptr;
	}
protected:
	char* ptr;
};
class Bad_alloc :public Exception
{
public:
	Bad_alloc(const char* _Message="bad exception"):Exception(_Message){}
protected:
};
int main()
{
	try
	{
		while (1)
		{
			int* p = new int[1024 * 1024];
		}
	}
	catch (bad_alloc& object)
	{
		cout << object.what() << endl;//内存申请失败
	}
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bgDYrR.png)

## 4.  自定义异常类

<font color='orange'>继承标准库中的异常类；通过重写what方法</font>

```cpp
#include <iostream>
#include <exception>
#include <string>
using namespace std;
//继承标准库中的异常类
//通过重写what方法
class myException :public exception
{
public:
	myException(string str):exception(str.c_str()){}
};
void insert(int a)
{
	if (a >= 4)
		throw myException("数组满了");
	cout << "插入成功" << endl;
}
void del(int a)
{
	if (a <= 0)
		throw myException("数组为空，无法删除");
	cout << "删除成功" << endl;
}
int main()
{
	try
	{
		insert(1);
		insert(4);
	}
	catch (myException& str)
	{
		cout << str.what() << endl;
	}
	try
	{
		del(1);
		del(0);
	}
	catch (myException& str)
	{
		cout << str.what() << endl;
	}
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bgDtq1.png)
