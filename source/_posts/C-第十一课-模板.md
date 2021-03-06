---
title: C++~第十一课---模板
author: 小杨呀
top: false
cover: false
toc: true
mathjax: false
index_img: 'https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/thumb-1920-344752.jpg'
tags:
  - 模板
categories:
  - C++课程笔记
abbrlink: 40be
date: 2022-03-08 18:20:20
---

## 1.  模板的概念

模板就是建立<font color='orange'>通用的模具</font>，大大提高<font color='orange'>复用性</font>

- 模板不可以直接使用，它只是一个框架
- 模板的通用并不是万能的
- c++提供两种模板机制：<font color='orange'>函数模板和类模板</font>

## 2.  函数模板

函数模板的作用：建立一个通用函数，其函数返回值类型和形参类型可以不具体制定，用一个<font color='orange'>虚拟的类型</font>来代表。

语法：

```cpp
template<typename T>//声明一个模板，告诉编译器后面代码中紧跟着的T不要报错
```

- <font color='orange'>template</font>----声明创建模板

- <font color='orange'>typename</font>----表明其后面的符号是一种数据类型，可以用<font color='orange'>class</font>代替

- <font color='orange'>T</font>----通用的数据类型，名称可以替换，通常为<font color='orange'>大写字母</font>

- ```cpp
  template<typename T>
  void mySwap(T& a, T& b)
  {
  	T temp = a;
  	a = b;
  	b = temp;
  }
  int main()
  {
  	int a = 10;
  	int b = 20;
  	//利用函数模板实现两个数交换
  	//两种方式使用函数模板
  	
  	//1.自动类型推导
  	mySwap(a, b);
  	cout << "a:" << a << "\t" << "b:" << b << endl;
   
  	//2.显示指定类型
  	mySwap<int>(a, b);
  	cout << "a:" << a << "\t" << "b:" << b << endl;
   
   
  	return 0;
  }
  ```

  ```cpp
  //size_t:unsigned int 的别名
  template<class T1,size_t size=3>//缺省
  void func(T1 arry)
  {
  	for (int i = 0; i < size; i++)
  	{
  		cout << arry[i];
  	}
  }
   
  void test()
  {
  	//函数模板的缺省，显示调用，可以不用传类型，但是参数不能少
  	int arry[3] = { 1,2,3 };
  	//没有做缺省必须显示调用
  	func<int*, 3>(arry);
  	//做了缺省可以隐式调用
  	func(arry);
  	//不能传入变量，只能传入常量，函数模板如果存在变量的情况下
  	/*int size = 3;
  	func<int*,size>(arry);*/ //错误
  }
  ```

  小结：

  - 函数模板利用关键字<font color='orange'>template</font>
  - 使用函数模板有两种方式：<font color='orange'>自动类型推导、显示指定类型</font>
  - 模板的目的是为了提高复用性，将类型参数化

## 3.  函数模板注意事项

- 自动类型推导，必须推导出一致的数据类型 T 才可以使用
- 模板必须要确定出 T 的数据类型才可以使用
- 当 T 是一个类，而这个类又有子类(假设名为 innerClass) 时，应该用 <font color='orange'>template</font><typename>

```cpp
#include <iostream>
#include <string>
#include <fstream>//包含头文件
using namespace std;
 
//1.自动类型推导，必须推导出一致的数据类型T才可以使用
template<class T>
void mySwap(T& a, T& b)
{
	T temp = a;
	a = b;
	b = temp;
}
void test()
{
	int a = 10;
	int b = 20;
	char c = 30;
	mySwap(a, b);//正确
	//mySwap(a, c);//错误！推导不出一致的T类型，一个int一个char类型
	cout << a<<endl;
	cout << b << endl;
}
//2.模板必须要确定出T的数据类型才可以使用
template<typename T>
void func()
{
	cout << "func调用", , endl;
}
int main()
{
	test();
	//func();//错误，没有指定T的数据类型不能使用
	func<int>();//正确，随便给个数据类型告诉编译器T的类型至于你函数用不用没关系
	return 0;
}
```



## 4.  普通函数与函数模板区别

区别：

- 普通函数调用时<font color='orange'>可以发生自动类型转换（隐式类型转换）</font>
- 函数模板调用时，如果利用<font color='orange'>自动类型推导，不会发生隐式类型转换</font>
- 如果利用<font color='orange'>显示指定类型</font>的方式，<font color='orange'>可以发生隐式类型转换 </font>     （<font color='red'>推荐平时写这种</font>）

```cpp
//普通函数
int Add(int a, int b)
{
	return a + b;
}
 
template<class T>
int Add2(T a, T b)
{
	return a + b;
}
 
void test()
{
	int a = 10;
	int b = 20;
	char c = 'c';//c---99
	//普通函数
	cout << Add(a, c) << endl;//自动类型转换，但是函数形参是引用则不能转换
 
	//自动类型推导
	//cout << Add2(a, c) << endl;//不会发生隐式类型转换
 
	//显示指定类型
	cout << Add2<int>(a, c) << endl;//会发生隐式类型转换
}
```



## 5.  普通函数与函数模板的调用规则

调用规则如下:

- 如果函数模板和普通函数都可以实现，<font color='orange'>优先调用普通函数</font>
- 可以通过空模板参数列表来<font color='orange'>强制调用函数模板</font>

```cpp
func<>(a, b);//调用函数模板
```

- 函数模板也可以发生<font color='orange'>重载</font>
- 如果函数模板可以产生更好的匹配，<font color='orange'>优先调用函数模板</font>

```cpp
void func(int a, int b)
{
	cout << "普通函数" << endl;
}
 
template<typename T>
void func(T a, T b)
{
	cout << "函数模板" << endl;
}
 
template<typename T>
void func(T a, T b,T c)
{
	cout << "函数重载模板" << endl;
}
 
 
void test()
{
	int a = 1;
	int b = 2;
	func(a,b);//不管func是否实现都是调用普通函数，但是只声明不实现会报错
	
	func<>(a, b);//调用函数模板
 
	func(a, b, 12);//可以重载
 
	//如果函数模板产生更好的匹配，优先调用函数模板
	char c1 = 'a';
	char c2 = 'b';
	func(c1, c2);//如果不需要隐式类型转换就调用普通函数否则优先调用模板
}
```

小结：

<font color='orange'>既然提供了函数模板，最好就不要提供普通函数，否则容易出现二义性。</font>

## 6.  模板的局限性

<font color='orange'>既然提供了函数模板，最好就不要提供普通函数，否则容易出现二义性。</font>

```cpp
template<>bool myCompare(类名& 对象名, 类名& 对象名)
```

```cpp
class Person
{
public:
    //创建构造函数
	Person(string name, int age)
	{
		this->name = name;
		this->age = age;
	}
	string name;
	int age;
};
 
template<typename T>
bool myCompare(T& a, T& b)
{
	if (a == b)
		return true;
	else
		return false;
}
 
//利用具体化Person的版本实现代码，具体化优先调用
template<>bool myCompare(Person& p1, Person& p2)
{
	if (p1.name == p2.name && p1.age == p2.age)
		return true;
	else
		return false;
}
 
void test1()
{
	Person p1("Tom", 12);
	Person p2("Tom", 2);
	bool ret = myCompare(p1, p2);
	if (ret)
		cout << "p1==p2" << endl;
	else
		cout << "p1!=p2" << endl;
}
```

小结：

- <font color='orange'>利用具体化的模板，可以解决自定义类型的通用化</font>
- <font color='orange'>学习模板并不是为了写模板，而是在STL能够运用系统提供的模板</font>



## 7.  类模板

类模板和函数模板语法相似，在声明模板template后面加类，此类称为类模板

```cpp
//类模板
template<class NameType,class AgeType>
class Person
{
public:
	Person(NameType name, AgeType age):name(name),age(age){}
	void print()
	{
		cout << this->name << " " << this->age << endl;
	}
	NameType name;
	AgeType age;
};
 
void test1()
{//类名<形参数据类型1,形参数据类型2>对象名(数据);
	Person<string, int>p1("你好", 12);
	p1.print();
}
```

- <font color='orange'>类模板如果函数在类中声明，类外实现需要加模板</font>

  

  ```cpp
  template<class T1,class T2>//类模板
  class Person
  {
  public:
      Person(){}
  	//类中声明
  	void fun();
  };
   
  //类外实现，要加模板
  template<class T1, class T2>
  void Person<T1,T2>::fun()
  {
      //如果要创建对象也要按照模板类型写<>
      //Person m;//错误
      Person<int,int> m;//正确
  	cout << "你好";
  }
  ```

  

## 8.  类模板例子

```cpp
class MM
{
public:
	MM(string name, int age):name(name),age(age){}
	friend ostream& operator<<(ostream& out,  MM& mm)
	{
		cout << mm.name << "\t" << mm.age;
		return out;
	}
	string name;
	int age;
};
 
template<class T1>
class Node
{
public:
	Node(T1 data,Node<T1>* next):data(data),next(next){}
	T1 getData()
	{
		return data;
	}
	Node<T1>* getNext()
	{
		return next;
	}
protected:
	 T1 data;
	Node<T1>* next;//类型都要加模板
	//正常写法：Node* next
};
 
template<class T1>
class List
{
public:
	List()
	{
		headNode = nullptr;
	}
	void insertList(T1 data)
	{
		headNode = new Node<T1>(data, headNode);
	}
	void print()
	{
		Node<T1>* pMove = headNode;
		if (pMove == nullptr)
			cout << "空链表";
		while (pMove != nullptr)
		{
			cout << pMove->getData()<< "\t";
			pMove = pMove->getNext();
		}
		cout << endl;
	}
protected:
	Node<T1>* headNode;
};
 
void test()
{
	List<int> list;
	list.insertList(1);
	list.insertList(2);
	list.insertList(3);
	List<MM> mm;
	mm.insertList(MM("妹妹", 1));
    mm.insertList(MM("哥哥", 4));
	list.print();
	mm.print();
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bgg6sg.png)

## 9.  类模板和函数模板区别

- <font color='orange'>类模板没有自动类型推导的使用方式，只能用显示指定类型方式</font>
- 类模板在模板参数列表中<font color='orange'>可以有默认参数</font>

```cpp
//可以有默认参数，但是一定要尾部开始
template<class NameType,class AgeType=int>
class Person
{
public:
	Person(NameType name,AgeType age):name(name),age(age){}
	void print()
	{
		cout << this->name << " " << this->age << endl;
	}
	NameType name;
	AgeType age;
};
 
//1.类模板没有自动类型推导使用方式
void test()
{
	//Person p("上完课", 11);//错误，无法使用自动类型推导
	Person<string, int>p("test1", 11);//正确,只能用显示指定类型
	p.print();
}
 
//2.类模板在模板参数列表中可以有默认参数
void test1()
{
	Person<string>p("test2", 22);
	p.print();
}
```



## 10.  类模板中成员函数创建时机

- 普通类中的成员函数一开始就可以创建
- 类模板中的成员函数在调用时才创建

```cpp
//类1
class Person1
{
public:
	void func1()
	{
		cout << "Person1" << endl;
	}
};
//类2
class Person2
{
public:
	void func2()
	{
		cout << "Person2" << endl;
	}
};
//类3
template<class T>
class My
{
public:
	T obj;
	//类成员中的成员函数
	void print1()
	{
		obj.func1();
	}
	void print2()
	{
		obj.func2();
	}
};
 
void test()
{
	My<Person1>p;//根据<>中的类名去调用属于它本身的成员函数
	p.print1();
 
	//p.print2()属于Person2的
	//p.print2();//编译错误，说明函数调用才会去创建成员函数
}
```



## 11.  类模板对象做函数参数

- 类模板实例化出的对象，向函数传参的方式，一共3种方式：

①<font color='orange'>指定传入的类型</font>font> ----直接显示对象的数据类型

②<font color='orange'>参数模板化</font>    ----将对象中的参数变为模板进行传递

③<font color='orange'>整个类模板化</font>  ----将这个对象类型模板化进行传递

```cpp
template<class T1,class T2>
class Person
{
public:
	Person():name(name),age(age){}
	Person(T1 name,T2 age):name(name),age(age){}
	void print()
	{
		cout << this->name << " " << this->age << endl;
	}
	T1 name;
	T2 age;
};
 
//1.指定传入类型
void printShow1(Person<string, int>&p)//记得传引用
{
	p.print();
}
 
//2.参数模板化
template<class T1,class T2>
void printShow2(Person<T1,T2>&p)
{
	p.print();
	//查看类型  关键字：typeid(类型名).name()
	cout << "T1类型：" << typeid(T1).name() << endl;
	cout << "T2类型：" << typeid(T2).name() << endl;
}
 
//3.整个类模板化
template<class T>
void printShow3(T& p)
{
	p.print();
	//查看类型  关键字：typeid(类型名).name()
	cout << "T类型：" << typeid(T).name() << endl;
}
void test()
{
	Person<string, int>p1("孙悟空", 12);
	printShow1(p1);
 
	Person<string, int>p2("猪八戒", 111);
	printShow2(p2);
 
	Person<string, int>p3("唐三", 233);
	printShow3(p3);
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bgg4J0.png)

 小结：

- <font color='orange'>使用广泛的是第一种：指定传入的类型</font>

## 12.  类模板与继承

当类模板遇到继承时，需要注意几点：

- 当子类继承的父类是一个类模板时，子类在声明时要指定出父类中T的类型
- 如果不指定，编译器无法给子类分配内存
- 如果想要灵活指定出父类中T的类型，子类也需变成类模板

```cpp
template<class T>
class MM
{
public:
	T one;
};
 
template<class T1,class T2>
class GG :public MM<T2>
{
public:
	GG()
	{
		cout << "T1类型：" << typeid(T1).name() << endl;
		cout << "T2类型：" << typeid(T2).name() << endl;
	}
	T1 two;
};
void test()
{
	GG<int,string> g;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bgghiq.png)

## 13.  类模板分文件编写

- 类模板中的成员函数创建时机是在调用阶段，导致分文件编写时链接不到

<font color='red'>第一种解决方式：</font>直接包含<font color='orange'>.cpp</font>文件

<font color='red'>第二种解决方式：</font>将 <font color='orange'>.h</font> 和 <font color='orange'>.cpp</font> 的内容写在一起，将文件后缀名改成<font color='orange'> .hpp </font>文件 （<font color='red'>常用的做法</font>）

## 14.  类模板与友元

- 全局函数类内实现---直接在类内声明友元即可
- 全局函数类外实现---需要提前让编译器指定全局函数的存在

```cpp
//声明,提前让编译器知道
template<class T1, class T2>
class GG;
 
//类外实现
template<class T1, class T2>
void print2(GG<T1, T2>p)
{
	cout << "类外实现：";
	cout << p.one << " " << p.two << endl;
}
 
template<class T1,class T2>
class GG
{
	friend void print(GG<T1, T2>p)
	{
		cout << "全局函数类内实现：";
		cout << p.one << " " << p.two << endl;
	}
	//全局函数类内声明
	//加空模板参数列表
	friend void print2<>(GG<T1, T2>p);
public:
	GG(T1 one,T2 two):one(one),two(two){}
protected:
	T1 one;
	T2 two;
};
 
void test()
{
	GG<string, int>p("张三", 122);
	print(p);
	print2(p);
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bggWon.png)

## 15.  类模板特化

- 局部特化
- 完全特化

<font color='orange'>局部特化</font>

```cpp
//两个未知类型
template<class T1,class T2>
class MM
{
public:
	MM(T1 one,T2 two):one(one),two(two){}
	void print()
	{
		cout << "普通" << endl;
		cout << one + two << endl;//相加
	}
protected:
	T1 one;
	T2 two;
};
 
//局部特化,特殊化
template<class T>
class MM<T, T>//特化产生类，类名要用：类名<类型>方式使用
{
public:
	MM(T one, T two) :one(one), two(two) {}
	void print()
	{
		cout << "特化" << endl;
		cout << one << " " << two << endl;//不相加
	}
protected:
	T one;
	T two;
};
 
void test()
{
	//针对不同数据做不同处理
	MM<int, int>m1(1, 2);
	MM<int, double>m2(3, 4);
	m1.print();
	m2.print();
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bggRds.png)

<font color='orange'>完全特化</font>

```cpp
//完全特化
template<>
class MM<string, string>
{
public:
	MM(string n1,string n2):n1(n1),n2(n2){}
	void print()
	{
		cout << n1 << " " << n2;
	}
protected:
	string n1;
	string n2;
};
 
void test()
{
	MM<string, string>m1("张三", "李四");
	m1.print();
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bgg2Zj.png)
