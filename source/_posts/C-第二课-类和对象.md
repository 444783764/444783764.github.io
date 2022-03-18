---
title: C++~第二课---类和对象
author: 小杨呀
top: false
cover: false
toc: true
mathjax: false
tags:
  - 对象
  - 类
categories:
  - C++课程笔记
index_img: 'https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/thumb-1920-121826.jpg'
abbrlink: 1c69
date: 2022-03-07 18:33:52
---

## 1.  类和对象的基本概念

<font color='red'>什么是类？</font>

- 一系列事物的抽象，万物皆可为类。
- 属性：事物的特征--->数据类型描述
- 行为：事物的操作--->函数描述
- 类的特点：<font color='orange'>封装，继承/派生，多态</font>
- C++的struct是兼容C语言的,所以C++的struct可以当作结构体去使用,另外struct还可以用来定义类,和class定义类是一样的,<font color='orange'>区别是struct定义类默认访问权限是公有的,class定义类默认访问权限是私有的</font>

<font color='red'>什么是对象？</font>

类的具体化，类的实例化.

## 2.  类的定义

- 创建语法

```cpp
//创建一个类
class GirlFriend
{
public:
	//共有属性
	//成员函数
	void print()
	{
		cout << m_name << m_age << endl;
	}
protected:
	//保护属性
	//数据成员
	string m_name;
	int m_age;
private:
	//当前类不做继承处理，数据成员写成私有属性
};// 类的成员可以是其他类的对象，但不能以类自身的对象作为本类的成员，而类自身的指针和引用可以作为类    
  //  的成员。  类定义必须以分号“;”结束  。
```

- 权限限定  作用

<font color='orange'>类外只能访问public属性下面的内容，习惯把public属性 叫做 类外的接口</font>

- 类的两种定义方式 

①<font color='orange'>声明和定义全部放在类内</font>

②<font color='orange'>声明和定义分开,声明在类内,定义在类外,在类外定义的时候记得加上域作用限定符</font>

③<font color='orange'>访问限定符 :</font> <font color='red'>public,protected,private</font>:

⑴  <font color='orange'>public</font>修饰的成员在类外可以<font color='orange'>直接被访问</font>
⑵  <font color='orange'>protected和private</font>修饰的成员在类外<font color='orange'>不能直接被访问</font>(此处<font color='orange'>protected和private是类似的</font>),但是 可以<font color='orange'>通过提供共有接口间接访问</font>
⑶  <font color='orange'>访问权限作用域从该访问限定符出现的位置开始直到下一个访问限定符出现时为止</font>
⑷  class的<font color='orange'>默认访问权限为private</font>，<font color='orange'>struct为public</font>(因为struct要兼容C)

- 类外访问类中的数据，只能通过对象访问，当然<font color='orange'>static</font>成员除外

- 权限限定词，只是用来限定类外的访问，并不是限定类中的访问

  

```cpp
#include <iostream>
#include <string>
#include <cstdio>
using namespace std;
class GirlFriend
{
public:
	//共有属性
	//成员函数
	//声明实现全部放类里
	void print()
	{
		cout << m_name << m_age << endl;
	}
	//为了访问不能访问的部分，通常提供一些接口
	void initdata(string name, int age);//类中声明
protected:
	//保护属性
	//数据成员
	string m_name;
	int m_age;
private:
	//当前类不做继承处理，数据成员写成私有属性
};
//类外实现，注意要加类名限定
void GirlFriend::initdata(string name, int age)//表示initdata是属于GirlFriend的
{
	m_name = name;
	m_age = age;
}
int main()
{
	GirlFriend Lisa;
	Lisa.initdata("丽萨", 20);
	Lisa.print();
	//Lisa.m_name; //错误写法:E0265	成员 "GirlFriend::m_name"  不可访问
	//类外只能访问public
	return 0;
}
```

## 3.  域作用符补充

<font color='orange'>::</font> 是运算符中等级最高的，它分为三种:

⑴ global scope(<font color='orange'>全局作用域符</font>），用法（::name)。

⑵ class scope(<font color='orange'>类作用域符</font>），用法(class::name)。

⑶ namespace scope(<font color='orange'>命名空间作用域符</font>），用法(namespace::name)。

## 4.  对象的创建

- 普通对象
- 对象数组
- new一个对象

```cpp
#include <iostream>
#include <string>
#include <cstdio>
using namespace std;
class MM
{
public://公有
	void print()
	{
		cout << name << "\t" << age << endl;
	}
	void initData(string nname, int nage)
	{
		name = nname;
		age = nage;
	}
protected://保护
	//新标准，可以在类中给数据直接初始化
	string name="默认值";
	int age=333;
 
};
int main()
{
	//没有写构造函数的情况下，和C语言创建方式一样的
	MM mm;
	mm.print();
	MM mmArr[10];//一般很少用对象数组
	for (int i = 0; i < 10; i++)
	{
		mmArr[i].initData(string("name") + to_string(i), i + 19);//+表示连接
		mmArr[i].print();
	}
	MM* p = new MM;
	p->initData("李四", 14);
	p->print();
	delete p;
	p = nullptr;
 
	return 0;
}
```

初始化

```cpp
#include <iostream>
#include <string>
#include <cstdio>
using namespace std;
class MM
{
public://公有
	void print()
	{
		cout << name << "\t" << age << endl;
	}
	//传参方式
	void initData(string nname, int nage)
	{
		name = nname;
		age = nage;
	}
	//返回引用
	string& getname()
	{
		return name;
	}
	int& getage()
	{
		return age;
	}
protected://保护
	//新标准，可以在类中给数据直接初始化
	string name="默认值";
	int age=333;
	//不初始化是垃圾值
};
int main()
{
	MM mm;
	mm.getname() = "小红";
	mm.getage() = 44;
	mm.print();
	
 
	return 0;
}
```

## 5.  C++封装链表

```cpp
#include <iostream>
#include <string>
#include <cstdio>
using namespace std;
 
class Node
{
public:
	int& getdata()//返回引用
	{
		return data;
	}
	Node*& getnext()
	{
		return next;
	}
protected :
	int data;
	Node* next;
};
class List
{
public:
	void creat()
	{
		headNode = new Node;
		headNode->getnext() = nullptr;
	}
	void insertData(int data)
	{
		Node* newNode = new Node;
		newNode->getnext() = nullptr;
		newNode->getdata() = data;
 
		newNode->getnext()= headNode->getnext();
		headNode->getnext() = newNode;
	}
	void print()
	{
		Node* pMove = headNode->getnext();
		while (pMove != nullptr)
		{
			cout << pMove->getdata() << "\t";
			pMove = pMove->getnext();
		}
		cout << endl;
	}
protected:
	Node* headNode;
};
void test()
{
	List* list = new List;
	list->creat();
	list->insertData(10);
	list->insertData(100);
	list->insertData(1000);
	list->print();
 
}
int main()
{
	test();
 
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/by5e5n.png)
