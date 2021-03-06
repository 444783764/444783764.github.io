---
title: C++第八课---虚函数和多态
author: 小杨呀
top: false
cover: false
toc: true
mathjax: false
index_img: 'https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/thumb-1920-96477.jpg'
tags:
  - 虚函数
  - override
  - final
categories:
  - C++课程笔记
abbrlink: 8c51
date: 2022-03-08 16:20:37
---

## 1.  虚函数和虚函数表

- 什么是虚函数？用<font color='orange'>virtual</font>修饰的成员函数叫做虚函数
- 虚函数对于类的影响

增加一个指针的内存，<font color='orange'>32位4个字节，64位8个字节</font>

- 虚函数表

<font color='orange'>就是一个指针存储所有虚函数的首地址</font>

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bguapF.png)

```cpp
#include <iostream>
#include <string>
using namespace std;
class A
{
public:
	void print()
	{
		cout << "函数" << endl;
	}
	virtual void print2()
	{
		cout << "虚函数1" << endl;
	}
	virtual void print3()
	{
		cout << "虚函数2" << endl;
	}
	virtual void print4();
};
void A::print4()//virtual在类中声明，类外实现不需要virtual修饰，只需类名限定
{
	cout << "虚函数3" << endl;
}
void Size()
{
	//C语言不允许存在空的结构体
	//类中的普通函数不影响内存，虚函数影响
	//有了数据那1字节就不存在了
	//cout <<sizeof(A) << endl;//空的类或者结构体占用1字节,虚函数占4字节，多个虚函数也是4字节
 
	A a;
	int** vptr = (int**)&a;//类型转换
	typedef void(*PF)();
	PF func = (PF)vptr[0][0];
	func();//调用虚函数1
	func = (PF)vptr[0][1];
	func();//调用虚函数2
	func = (PF)vptr[0][2];
	func();//调用虚函数3
}
int main()
{
	Size();
	
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bguW1e.png)

## 2.  虚函数和多态

- 多态定义：<font color='orange'>同一种行为（调用）导致的不同的结果</font>
- 多态的必要性原则：

①必须父类存在<font color='orange'>虚函数</font>

②子类必须采用<font color='orange'>public</font>继承

③必须存在<font color='orange'>指针或者引用</font>（使用）

```cpp
#include <iostream>
#include <string>
using namespace std;
class Man
{
public:
	void WC1()
	{
		cout << "男人上厕所" << endl;
	}
	virtual void WC2()//父类必须要有virtual
	{
		cout << "龌龊男人上厕所" << endl;
	}
protected:
	
};
 
class Woman:public Man
{
public:
	void WC1()
	{
		cout << "女人上厕所" << endl;
	}
	void WC2()
	{
		cout << "上厕所" << endl;
	}
protected:
};
void test()
{
	//正常访问不存在多态
	cout << "正常访问，就近原则" << endl;
	Man pm;
	pm.WC1();
	pm.WC2();
	Woman wm;
	wm.WC1();
	wm.WC2();
	cout << endl<<"指针访问，就近原则" << endl;
	Man* p1 = new Man;
	p1->WC1();
	p1->WC2();
	Woman* p2 = new Woman;
	p2->WC1();
	p2->WC2();
	cout << endl << "指针非正常赋值，子类对象初始化父类指针"<<endl;
	Man* m1 = new Woman;
	//有virtual看对象，没virtual看指针类型
	m1->WC1();//普通函数
	m1->WC2();//虚函数(调用子类的)
	m1 = new Man;
	m1->WC1();//调用父类的
	m1 = new Woman;
	m1->WC2();//调用子类的
}
int main()
{
	test();
	
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bguf6H.png)

-  <font color='orange'>静态多态</font>：如果函数地址在编译阶段就能确定，那么静态联编
- <font color='orange'>动态多态</font>：如果函数地址在运行阶段才能确定，就是动态联编
- 多态满足<font color='orange'>条件</font>：

①有继承关系        

②子类重写父类的虚函数

- 多态使用：<font color='orange'>父类指针或者引用指向子类对象</font>
- 重写：<font color='orange'>函数返回值类型 函数名 参数列表 完全一致</font>

```cpp
#include <iostream>
#include <string>
using namespace std;
 
class Shape
{
public:
	virtual void Draw()
	{
		cout << "绘制过程" << endl;
	}
protected:
};
class Rect :public Shape
{
public:
	virtual void Draw()
	{
		cout << "绘制矩形" << endl;
	}
protected:
};
class Circle :public Shape
{
public:
	virtual void Draw()
	{
		cout << "绘制圆" << endl;
	}
protected:
};
//降低因为变化而要修改代码
//采用增加代码方式满足新需求
//统一接口
class Tool
{
public:
	void draw(Shape* parent)
	{
		parent->Draw();
	}
protected:
};
 
int main()
{
	Tool* pTool = new Tool;
	pTool->draw(new Rect);
	pTool->draw(new Circle);
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bguRpD.png)

## 3.  纯虚函数和ADT

- 纯虚函数也是虚函数只是纯虚函数是没有函数体的

```cpp
virtual void print() = 0;//在类中函数这样写
```

- 抽象类：具有至少一个纯虚函数的类，叫做抽象类

<font color='orange'>抽象类不能构造对象；抽象类可以构建对象指针；派生类继承后也不能实例化出对象，只有重写纯虚函数，派生类才能实例化出对象。</font>

```cpp
//抽象类
class Parent
{
public:
	virtual void print() = 0;//不能在类外写
protected:
};
void test()
{
	//Parent p;//错误(活动)	E0322	不允许使用抽象类类型 "Parent" 的对象
	Parent* p=nullptr;//但是可以构建指针
}
```

- <font color='orange'>纯虚函数没有被重写，无论被继承多少次都是纯虚函数，虚函数无论被继承多少次都是虚函数</font>

```cpp
#include <iostream>
#include <string>
using namespace std;
 
//纯虚函数就是做ADT(abstract data type 抽象数据类型)过程
class stack
{
public:
	//父类中所有的操作描述好
	virtual void push(int data) = 0;//入栈
	virtual void pop() = 0;//出栈
	virtual int top()const = 0;//
	virtual bool empty()const = 0;
	virtual int size()const = 0;
protected:
};
//子类想要创建对象，必须重写父类的纯虚函数
//ADT:具有强迫性，所有子类重写函数必须和父类的一模一样
class arrayStack :public stack
{
public:
//重写
	void push(int data)
	{
 
	}
	void pop()
	{
 
	}
	int top()const
	{
		return 1;
	}
	bool empty()const
	{
		return true;
	}
	int size()const
	{
		return 1;
	}
	//可以增加别的函数
	//可以增加别的成员
protected:
	int* array;
};
struct Node
{
	int data;
	Node* next;
};
class listStack :public stack
{
public:
	void push(int data)
	{
 
	}
	void pop()
	{
 
	}
	int top()const
	{
		return 1;
	}
	bool empty()const
	{
		return false;
	}
	int size()const
	{
		return 1;
	}
	//可以增加别的函数
	//可以增加别的成员
protected:
	Node* headNode;
};
 
void test(stack* pstack)
{
	pstack->push(1);
	while (!pstack->empty())
	{
		cout << pstack->top();
		pstack->pop();
	}
}
int main()
{
	test(new arrayStack);
	test(new listStack);
 
	return 0;
}
```

## 4.  虚析构函数

```cpp
#include <iostream>
#include <string>
using namespace std;
 
class A
{
public:
	virtual ~A()
	{
		cout << "父类析构" << endl;
	 }
	void print() {}
protected:
	
};
class B :public A
{
public:
	virtual ~B()
	{
		cout << "子类析构" << endl;
	}
	void print() {}
protected:
};
int main()
{
	//在用子类对象初始化父类指针，父类需要虚析构函数做内存释放
	A* p = new B;
	p->print();
	delete p;
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bgugfO.png)

## 5.  override和final

final:修饰虚函数，表示该虚函数<font color='orange'>不能再被重写</font>

override ：检查函数是否重写了父类的某一个虚函数，<font color='orange'>强制重写</font>；(<font color='red'>跟final没半毛钱关系</font>)

```cpp
#include <iostream>
#include <string>
using namespace std;
 
class A
{
public:
	//final:禁止重写
	//final子类不能存在同名函数
	virtual void func()final
	{
		cout << "重写" << endl;
	}
	virtual void print(){}
protected:
	
};
class B :public A
{
public:
	//限制子类不能写这个函数
	/*void func()
	{
	}*/
	void print()override//强制重写，标识作用，用来检查父类是否存在当前的虚函数
	{
		cout << "override" << endl;
	}
protected:
};
int main()
{
	B b;
	b.func();//子类可以调用功能，但是不能改
	return 0;
}
```

## 6.  C++类型转换

### 6.1.  const_cast

const_cast:<font color='orange'>去掉const属性或者加上const属性</font>

- const_cast<目标类型>（标识符）:目标类型只能是指针或者引用

```cpp
#include <iostream>
#include <string>
using namespace std;
/*
	const_cast<要转换的类型>(要转换的目标)
	1.去掉const属性(提供一个可以修改的接口去操作cinst属性的变量)
	2.加上const属性(用的比较少)
*/
 
class A
{
public:
	A(const char* str) :str(const_cast<char*>(str))//这样就可以转换了
	{
		//this->str = str;//错误
		this->str = const_cast<char*>(str);
		cout << str << endl;
	}
protected:
	char* str;
};
 
int main()
{
	const int num = 9;
	//去掉const属性
	//int* pnum = &num;//错误"const int *" 类型的值不能用于初始化 "int *" 类型的实体
	//1.作用普通指针
	int* pnum = const_cast<int*>(&num);
	*pnum = 88;
	cout << *pnum << endl;
	//2.操作类中的char*类型指针
	A a("常量");//传常量可以
	char pp[] = "变量";
	A a2(pp);//传变量
	//3.操作常量引用
	const int& pk =7;
	int& ppk = const_cast<int&>(pk);
	cout << ppk << endl;
	//加上const属性
	int aa = 9;
	const int* pa = &aa;
	const int* paa =const_cast<const int*>(pa);
	return 0;
}
```

### 6.2.  static_cast

- static_cast<要转换的类型>（要转换的目标）

```cpp
#include <iostream>
#include <string>
using namespace std;
/*
	static_cast<要转换的类型>(要转换的目标)
	1.基本数据类型转换(类似C语言强制类型转换)
	2.把空指针转换成目标类型指针
	3.把任何类型的变量转换成void类型
	4.用在类上面的转换(基类和派生类对象之间的转换)
		4.1进行上行转换(从子到父 指针或者引用转换) 安全
		4.2进行下行转换(从父到子 指针或者引用转换) 不安全
	注意点：static_cast不能转换const
*/
 
class Parent
{
public:
	virtual void print()
	{
		cout << "Parent" << endl;
	}
protected:
	
};
 
class Son :public Parent
{
public:
	 void print()
	{
		cout << "Son" << endl;
	}
protected:
};
 
int main()
{
	//1.基本数据类型,转不转都一样会自动隐式转换
	char cNum = 'A';
	int iNum = static_cast<int>(cNum);
	cout << iNum << endl;
	//2.空类型指针
	double* pd = new double;
	void* pvoid = static_cast<void*>(pd);
	//3.const类型转换
	int x = 0;
	const int constNum =static_cast<const int>(x);
	//4.错误用法
	const int xx = 0;
	//int* p = static_cast<int*>(&xx);//去掉const 必须用const_cast
	//5.从子到父
	Parent* p1 = new Son;
	p1->print();
	Son* s1 = new Son;
	p1 = static_cast<Parent*>(s1);
	p1->print();
	//6.从父到子
	Parent* parent;
	Son* son;
	//son = parent;//错误
	Parent* p2 = new Parent;
	Son* s2 = static_cast<Son*>(p2);//不安全
	s2->print();
 
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bguctK.png)

### 6.3.  dynamic_cast

- dynamic_cast<要转换的类型>（要转换的目标）

- dynamic_cast要<font color='orange'>检查转换后指针情况，是否为空</font>；static_cast不需要，但是要<font color='orange'>心中有数</font>

  

```cpp
#include <iostream>
#include <string>
using namespace std;
/*
	dynamic_cast<要转换的类型>(要转换的目标)
	1.上行转换 和static_cast一样
	2.下行转换 dynamic_cast更安全
	3.交叉转换 多继承
*/
 
class MM
{
public:
	MM(string mmName = "父类") :mmName(mmName)
	{
		cout << mmName << endl;
	}
	virtual void print()
	{
		cout << "MM" << endl;
	}
protected:
	string mmName;
	
};
 
class Son :public MM
{
public:
	Son(string sName="子类") :sName(sName)
	{
		cout << sName << endl;
	}
	  void print()
	{
		cout << "Son" << endl;
	}
	 void printData()
	 {
		 cout << "printData" << endl;
	 }
protected:
	string sName;
};
 
class A
{
public:
	virtual void print()
	{
		cout << "A" << endl;
	}
protected:
};
class B :public A
{
public:
	virtual void print()
	{
		cout << "B" << endl;
	}
protected:
};
class C :public A, public B
{
public:
	virtual void print()
	{
		cout << "C" << endl;
	}
protected:
};
 
 
int main()
{
	MM* pM = new MM;
	Son* sS = new Son;
	//1.上行转换
	MM* pSM = static_cast<MM*>(sS);
	MM* pSM2 = dynamic_cast<MM*>(sS);
	pSM->print();
	cout << endl;
	pSM2->print();
	//2.下行转换
	Son* pSS = static_cast<Son*>(pM);//不存在virtual 不会报错
	//Son* pSS2 = dynamic_cast<Son*>(pM);//不存在virtual 会报错
	pSS->print();//父类不存在virtual子类存在virtual会中断
	cout << endl;
	//下行转换，调用子类中父类没有的函数会报错
	//pSS2->print();
	
	//3.交叉转换
	A* a = new C;
	B* b = dynamic_cast<B*>(a);
	b->print();//C
	//C* cc = new B;//错误
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bguhXd.png)

### 6.4.  reinterpret_cast

-  reinterpret_cast<要转换的类型>（要转换的目标）
- 从指针类型到一个足够大的整数类型
- 从整数类型或者枚举类型到指针类型
- 用来辅助哈希函数

```cpp
#include <iostream>
#include <string>
using namespace std;
int Max(int a, int b)
{
	return a > b ? a : b;
}
int main()
{
	int num = reinterpret_cast<int>(Max);
	cout << num << endl;//打印数字：16322875
	cout << Max << endl;//打印地址：00F9113B
	auto pMax= reinterpret_cast<int(*)(int, int)>(num);//auto pMax等效于int(*pMax)(int,int)
	cout << pMax(3, 8) << endl;
	return 0;
}
```

