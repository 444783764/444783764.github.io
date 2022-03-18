---
title: C++~第三课---构造函数
author: 小杨呀
top: false
cover: false
toc: true
mathjax: false
tags:
  - 构造函数
  - 析构
  - 深浅拷贝
categories:
  - C++课程笔记
index_img: 'https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/thumb-1920-688439.jpg'
abbrlink: '469'
date: 2022-03-07 18:53:45
---

## 1.  构造函数概念

- 构造函数概念

一个类的对象被创建的时候，编译系统对象分配内存空间，并自动调用该构造函数，由构造函数完成成员的初始化工作。因此，构造函数的核心作用就是，<font color='orange'>初始化对象的数据成员</font>

- 构造函数长什么样的？
  <font color='orange'> 函数名和类名相同</font>

 <font color='orange'>没有返回值(连void也没有)</font>

如果不写构造函数，<font color='orange'>任何类中都存在一个默认的构造函数</font>

- 默认的构造函数是无参的。
  <font color='orange'>构造函数在构造对象的时候调用</font>

<font color='orange'>delete</font>可以删掉默认的函数

<font color='orange'>指定使用默认的无参构造函数，用default说明</font>

允许构造函数调用另一个构造函数,只是要用<font color='orange'>初始化参数列表</font>的写法

初始化参数列表：<font color='orange'>只有构造函数有：构造函数(参数1，参数2...):成员1(参数1),成员2(参数2),...{}</font>

<font color='red'>作用：避免形参名和数据成员名相同导致的问题</font>

<font color='orange'>当我们自己写了构造函数，默认的构造函数就不存在</font>

- 构造函数干嘛的？
  <font color='orange'>构造函数用来构造对象</font>

构造函数更多是用来<font color='orange'>初始化数据成员</font>

- 构造函数重载为了什么？
  为了<font color='orange'>构造不同长相的对象</font>

```cpp
class MM
{
public:
	MM() = delete;//删除默认构造函数
	void print()
	{
		cout << name << age << endl;
	}
protected:
	string name;
	int age;
 
};
int main()
{
	MM mm;//E1790	无法引用 "MM" 的默认构造函数 -- 它是已删除的函数
 
 
	return 0;
}
```

## 2.  构造有参，无参，重载函数

```cpp
#include <iostream>
#include <string>
#include <cstdio>
using namespace std;
class MM
{
public:
	//MM() = delete;//删掉默认构造函数
	void print()
	{
		cout << name << age << endl;
	}
	//有参构造函数
	MM(string mmName, int mmAge)
	{
		name = mmName;
		age = mmAge;
		cout << mmName << mmAge << endl;
	}
	//无参构造函数
	MM()
	{
		cout << "无参函数" << endl;
	}
	//MM() = default;//使用的是默认无参构造函数
protected:
	string name;
	int age=1;
 
};
//为了能够构造不同长相的对象，我们会给构造函数缺省处理
class boy
{
public:
	//如果出错：没有与之匹配的构造函数  原因：没构造函数
	/*boy(string Bname=" ", int Bage=20)
	{
		name = Bname;
		age = Bage;
		cout << Bname << "\t" << Bage << endl;
	}*/
	//上面函数等效下面三个函数功能
	boy(){}
	boy(string Bname) { name = Bname; }
	boy(string Bname, int Bage) { name = Bname; age = Bage; }
	void print()
	{
		cout << name << "\t" << age << endl;
	}
protected:
	string name="默认值";
	int age=11;
 
};
int main()
{
	//构造无参的对象，需要无参构造函数
	//MM mm;//E1790	无法引用 "MM" 的默认构造函数 -- 它是已删除的函数
	MM mm("大聪明", 22);
	MM m2;
	boy b1;
	b1.print();
	boy b2("熊出没");
	b2.print();
	boy b3("小狗", 66);
	b3.print();
	return 0;
}
```

## 3.  初始化列表

在定义带参构造函数时，可以两种写法，都可以进行传参：

（1）<font color='orange'>正常写法</font>（2）<font color='orange'>初始化列表写法</font>

```cpp
class boy
{
public:
	//初始化参数列表
	boy(string Bname, int Bage) :name(Bname), age(Bage)//不一定是源自于左边的参数，也可以是外部的参数类型一样即可
	{
		cout <<"初始化参数列表" << endl;
		//继承和类的组合必须采用初始化参数列表写法
	}
	//正常写法
	boy(string Bname, int Bage)
	{
		name = Bname;
		age = Bage;
		cout << "正常" << endl;
 
	}
```

构造函数调用另一个构造函数初始化数据

```cpp
#include <iostream>
#include <string>
#include <cstdio>
using namespace std;
class boy
{
public:
	//初始化参数列表
	boy(string Bname, int Bage) :name(Bname), age(Bage)//不一定是源自于左边的参数，也可以是外部的参数类型一样即可
	{
		cout <<"初始化参数列表" << endl;
		//继承和类的组合必须采用初始化参数列表写法
	}
	//正常写法
	boy(string Bname, int Bage)
	{
		name = Bname;
		age = Bage;
		cout << "正常" << endl;
 
	}
	void print()
	{
		cout << name << "\t" << age << endl;
	}
protected:
	string name="默认值";
	int age=11;
};
//构造函数蓝羽调用另一个构造函数初始化数据
class TT
{
public:
	TT(string name, int age) :name(name), age(age){}//形参实参名字可以一样系统会自动识别
	//委托构造
	TT():TT("默认",11){}
	void print()
	{
		cout << name << "\t" << age << endl;
	}
protected:
	string name;
	int age;
};
```

## 4.  析构函数

- 析构函数长什么样子？
  ①<font color='orange'>无返回值</font>

  ②<font color='orange'>无参数</font>

  ③<font color='orange'>函数名:~类名</font>

  ④<font color='orange'>不写的话会存在默认的析构函数</font>

  ⑤<font color='orange'>析构函数不需要直接调用，对象死亡之前会调用析构函数</font>

- 析构函数用来干嘛？
  <font color='orange'>什么时候需要自己手动写析构函数；</font>当类中的数据成员是<font color='orange'>指针</font>，<font color='orange'>并且动态申请类内存</font>就需要手动写析构；析构函数用来<font color='orange'>释放数据成员申请动态内存</font>（一个对象出生的时候，使用构造函数，死掉的时候，使用析构函数。）

```cpp
#include <iostream>
#include <string>
#include <cstdio>
using namespace std;
class MM
{
public:
	MM(const char* pstr, int age) :age(age)
	{
		str = new char[strlen(pstr) + 1];
		strcpy(str, pstr);
	}
	void print()
	{
		cout << str << "\t" << age << endl;
	}
	~MM();
protected:
	char* str;
	int age;
};
MM::~MM()
{
	cout << "我是析构函数" << endl;
	delete[] str;
}
int main()
{
	{
		MM mm("张三", 111);
		mm.print();
		//mm.~MM();//可以手动调但是会引发二次释放问题引发中断
	}//出作用域前调用析构函数
	cout << "主函数" << endl;
	//new一个对象的时候，只有delete 才会调用析构函数
	{
		MM* pp = new MM("你好", 99);
		pp->print();
		delete pp;
		pp = nullptr;
	}
 
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/byoWDS.png)

## 5.  拷贝构造函数

- 拷贝构造函数也是构造函数，长相和构造函数一样的，只是参数是固定
- 拷贝构造函数唯一的参数是对对象引用

- 不写拷贝构造函数，也存在一个默认的拷贝构造函数

- 拷贝构造函数作用：通过一个对象去初始化另一个对象
- 问题：
  <font color='orange'>什么时候调用？</font>

答：当通过一个对象去创建出来类一个新的对象时候需要调用拷贝。

<font color='orange'>拷贝构造什么时候需要加const修饰参数？</font>

答:当存在<font color='orange'>匿名对象赋值操作</font>的时候，必须要<font color='orange'>const</font>修饰。

```cpp
#include <iostream>
#include <string>
#include <cstdio>
using namespace std;
class MM
{
public:
	MM(string name, int age) :name(name), age(age)
	{
		cout << "拷贝构造" << endl;
	}
	void print()
	{
		cout << name << "\t" << age << endl;
	}
	//拷贝构造
	MM(const MM& mm)//相当于MM girl(mm);
	{
		name = mm.name;//相当于girl.name=mm.name;
		age = mm.age;//相当于girl.age=mm.age;
		cout << "拷贝构造" << endl;
	}
	MM(){}
	//MM(MM&& mm)
	//{
	//	name = mm.name;//相当于girl.name=mm.name;
	//	age = mm.age;//相当于girl.age=mm.age;
	//	cout << "右值引用" << endl;
	//}
	
protected:
	string name;
	int age;
 
};
//第一种调用形态
void printData(MM mm)//MM mm=实参
{
	//调用拷贝构造
	mm.print();
}
void printData2(MM& mm)//不存在拷贝本(这里形参就是实参),不会调用拷贝构造
{
	mm.print();
}
 
int main()
{
	MM mm("效果", 11);
	mm.print();
	//默认拷贝构造函数
	//显示调用
	MM girl(mm);//通过一个对象创建另一个对象
	girl.print();
	cout << "显示调用" << endl;
	//隐式调用
	MM girl2 = mm;//拷贝构造
	girl2.print();
	cout << "隐式调用" << endl << endl;;
	//运算符重载,需要建个无参默认函数，不然会报错(运算符重载不会调用拷贝构造)
	MM girl3;
	girl3 = mm;
	girl3.print();
	//函数传参
	cout << endl;
	cout << "第一种调用形态" << endl;
	printData(mm);
	cout << "第二种调用形态" << endl;
	printData2(mm);
 
	//无名对象(匿名对象),在创建对象时，拷贝构造移动要加const修饰
	//MM temp = MM("匿名", 11);//不能调用拷贝构造,但是可以加const就可以
	cout << endl;
	MM temp;
	temp = MM("匿名", 11);
	temp.print();
 
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/byofHg.png)

## 6.  深浅拷贝

值是没深浅拷贝的说法，<font color='orange'>只有指针有影响</font>。

<font color='orange'>浅拷贝</font>：默认的拷贝构造叫做浅拷贝

<font color='orange'>深拷贝</font>：拷贝构造函数中做了<font color='orange'>new</font>内存操作，并且做了<font color='orange'>拷贝赋值操作</font>（把值拷贝到新的内存里）

```cpp
#include <iostream>
#include <string>
#include <cstdio>
using namespace std;
class MM
{
public:
	MM(const char* mname, int age):age(age)
	{
		name = new char[strlen(mname) + 1];
		strcpy(name, mname);
	}
	MM(const MM& object)
	{
		//name = object.name;
		name = new char[strlen(object.name) + 1];
		strcpy(name,object.name);
		//name = object.name;//屏蔽上面这一句只new一个内存也不叫深拷贝，还是浅拷贝
		age = object.age;
	}
	~MM()
	{
		delete[] name;
	}
	void print()
	{
		cout << name << "\t" << age << endl;
	}
protected:
	char* name;
	int age;
 
};
int main()
{
	//浅拷贝
	MM mm("熊出没", 444);//一起运行会崩溃因为调用了三次析构
	MM girl(mm);
	MM girl2 = mm;
 
	return 0;
}
```

## 7.  构造和析构顺序问题

- <font color='red'>普通对象，</font><font color='orange'>构造顺序和析构顺序是相反的</font>

- <font color='orange'>new出来的对象，delete会直接调用析构函数</font>

- <font color='orange'>static对象，当程序关闭的时候，生命周期才结束，所以是最后释放</font>

  

```cpp
#include <iostream>
#include <string>
#include <cstdio>
using namespace std;
class MM
{
public:
	MM(string name = "x"):name(name)
	{
		cout << name;
	}
	~MM()
	{
		cout << name;
	}
protected:
	string name;
};
int main()
{
	{
		MM mm1("A");//A
		static MM mm2("B");//B，是程序结束生命周期才结束
		MM* p = new MM("C");//C
		MM mm4[4];//xxx
		delete p;//C,delete是直接调用析构的
	}
	
 
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/byoRu8.png)

## 8.  C++结构体

```cpp
#include <iostream>
#include <string>
#include <cstdio>
using namespace std;
struct MM
{
	//结构体默认公有属性
	//类中默认私有
//protected:
	string name;
	int age;
 
	MM(string name) :name(name)
	{
		cout << "构造函数" << endl;
	}
 
	MM(const MM& object)
	{
		name = object.name;
		age = object.age;
		cout << "拷贝函数" << endl;
	}
};
int main()
{
	//采用创建时候赋值方式，也是调用构造函数
	//MM object = { "你好",11};  //错误，因为没有两个参数的构造函数
	MM object = { "你好" };
	cout << object.name << "\t" << object.age << endl;
	//c++结构体一旦写了构造函数，就必须按照c++类的方式去用
	MM mm(object);
 
	return 0;
}
```

