---
title: C++~第五课---运算符重载
author: 小杨呀
top: false
cover: false
toc: true
mathjax: false
tags:
  - 友元重载
  - 运算符重载
categories:
  - C++课程笔记
index_img: 'https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/323912.jpg'
abbrlink: 556b
date: 2022-03-07 19:40:41
---

## 1.  运算符重载概念

- 运算符重载概念：对已有的运算符重新进行定义，赋予其另一种功能，以适应不同的数据类型。
- 运算符的实质：运算符重载的实质本身就是<font color='orange'>函数调用</font>
- 运算符重载函数的写法：<font color='orange'>函数返回值      函数名（函数参数）</font>
- <font color='orange'>五个不能重载的运算符</font>：

① .(成员访问运算符)

② *(成员指针访问运算符)

③ ::(域运算符)

④ sizeof(大小运算符)

⑤ ? : (条件运算符)

<font color='orange'>函数返回值</font>  ：运算完成后的值决定的

<font color='orange'>函数名</font>  ：operator加上重载运算符组成函数名

<font color='orange'>参数</font>  ：看运算符的操作数，具体参数个数是要看你重载函数形式是什么

<font color='orange'>函数体</font>  ：写运算符具体想要的操作

## 2.  友元重载与类成员运算符重载

友元重载：参数个数就是操作数据

```cpp
#include<iostream>
#include <string>
#include <cstdio>
using namespace std;
class MM
{
public:
	MM() = default;
	MM(int a, int b) :a(a), b(b)
	{
 
	}
	void print()
	{
		cout << a << " " << b << endl;
	}
	friend MM operator+ (MM one, MM two);
	//类成员函数重载，参数个数等于操作数-1
	bool operator>(MM object)
	{
		if (this->a > object.a)
			return true;
		else if (this->a == object.a && this->b > object.b)
			return true;
		else
			return false;
	}
protected:
	int a;
	int b;
};
MM operator+ (MM one, MM two)
{
	return MM(one.a + two.a, two.a + two.b);
}
int main()
{
	MM one(9, 2);
	MM two(3, 50);
	MM three;
	three = one + two;//重载函数的隐式调用
	//显示调用
	//three = operator+(one,two);
	three.print();
	//隐式调用
	if (one > two)
	{
		cout << "one  大" << endl;
	}
	//显示调用，上面的相当于下面
	if (one.operator>(two))
	{
		cout << "one  大" << endl;
	}
 
 
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/byXz1H.png)



## 3.  特殊运算符重载



### 3.1  流运算符重载

cin类型：istream类对象

cout类型：ostream类对象

流运算符>> <<

<font color='orange'>必须采用友元函数形式重载</font>

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/byjScd.png)

```cpp
friend ostream& operator<<(ostream& out,类名& 对象)//连续输出时
{
  //需要实现的函数
    return out;
}
 
friend void 类名限定 operator<<(ostream& out,类名& 对象)//输出单个
{
  //需要实现的函数
}
```

```cpp
#include<iostream>
#include <string>
#include <cstdio>
using namespace std;
class MM
{
public:
	MM(string name = " ", int age=11) :name(name), age(age){}
	friend istream& operator>>(istream& in, MM& mm);
	friend ostream& operator<<(ostream& out, MM& mm);
protected:
	string name;
	int age;
};
istream& operator>>(istream& in, MM& mm)
{
	in >> mm.name >> mm.age;
	return in;
}
 
ostream& operator<<(ostream& out, MM& mm)
{
	out << mm.name << " " << mm.age << endl;
	return out;
}
int main()
{
	MM mm;
	MM aa;
	//输入输出一个的时候
	cin >> mm;//void MM operator>>(istream& in,MM& mm)
	cout << mm;//void MM operator<<(ostream& out,MM& mm)
	//cin >> mm >> aa;//但是发现不能连续输入，只有cin>>mm这部分返回一个cin类型才能继续
 
	//输入输出多个
	cin >> mm >> aa;
	cout << mm << aa;
	return 0;
}
```



### 3.2  三目运算符重载

三目运算符重载只需重载“>”号

### 3.3  ++与--运算符重载

解决问题：前置和后置的问题,增加无用参数 <font color='orange'>int</font> 去表示当前运算符重载是<font color='orange'>后置操作</font>

```cpp
#include<iostream>
#include <string>
#include <cstdio>
#include <thread>
using namespace std;
class MM
{
public:
	MM(int age):age(age){}
	friend ostream& operator<<(ostream& out,MM& mm)
	{
		out << mm.age;
		return out;
	}
	//++
	MM operator++(int)
	{
		return MM(age++);
	}
	MM operator--()
	{
		return MM(--age);
	}
	//类的对象隐式转换
	operator int()//int是想要转换的类型，没有函数参数
	{
		return age;
	}
 
protected:
	int age;
};
int main()
{
	MM mm(10);
	cout <<"mm初始值："<<mm << endl;//10
	MM m2 = mm++;
	cout <<m2 << "\t" << mm << endl;//10 11
	MM m3 = --mm;
	cout << m3<< "\t" << mm << endl;//10 10
	//this_thread::sleep_for(3s);//(3s)就是文本重载
	//cout << "3秒结束" << endl;
	
	MM gg(9);
	int flag = gg;
	cout << flag << endl;//9
 
	return 0;
}
```

### 3.4  文本重载

```cpp
//固定格式
unsigned long long operator"" _h(unsigned long long num)
{
	return 60 * 60 * num;
}
 
int main()
{
    int num = 1_h;
	cout << num <<"s" << endl;//3600s
}
```

### 3.5  隐式转换

```cpp
//类的对象隐式转换
	operator int()//int是想要转换的类型，没有函数参数
	{
		return age;
	}
 
int main()
{
    MM gg(9);
	int flag = gg;
	cout << flag << endl;//9
}
```

### 3.6  关系运算符‘=’重载

```cpp
bool operator==(MM& m)
	{
		if (this->name == m.name && this->age == m.age)
			return true;
		else
			return false;
	}
 
MM m1("哭脸", 14);
	MM m2("哭", 14);
	if (m1 == m2)
	{
		cout << "m1和m2相同" << endl;
	}
	else
		cout << "m1和m2不相同" << endl;
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/byXjhD.png)

### 3.7  函数调用运算符（）重载

- 函数调用运算符（）也可以重载
- 由于重载后使用的方式非常像函数的调用，因此称为仿函数
- 仿函数没有固定写法，非常灵活

```cpp
#include<iostream>
#include <string>
using namespace std;
class MM
{
public:
	MM()= default;
	MM(string name,int age):name(name),age(age){}
 
	int operator()(int a, int b)
	{
		return a + b;
	}
	
protected:
	string name;
	int age;
};
int main()
{
	MM m3;//因为已经构造了两个参数的构造函数所以默认构造函数需要手动定义
	int ret=m3(1, 2);
	cout << ret << endl;
	//如果不想创建对象，可以匿名对象
	cout << MM()(99, 44) << endl;
	
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/byjpjA.png)



## 4.  赋值运算符:(深浅拷贝)

c++编译器至少给一个类添加4个函数：

①<font color='orange'>默认构造函数（无参，函数体为空）</font>

②<font color='orange'>默认析构函数（无参，函数体为空）</font>

③<font color='orange'>默认拷贝构造函数，对属性进行值拷贝</font>

④<font color='orange'>赋值运算符 operator= 对属性进行值拷贝</font>

如果类中有属性指向<font color='orange'>堆区</font>，做赋值操作时也会<font color='orange'>出现深浅拷贝问题</font>

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/byXx9e.png)

<font color='orange'>浅拷贝，P1和P2都指向同一段内存，当P2调用析构释放后，在P1释放时就会产生重复释放的问题 </font>

解决方案：<font color='orange'>利用深拷贝解决</font>

```cpp
#include<iostream>
#include <string>
#include <cstdio>
#include <thread>
using namespace std;
class MM
{
public:
	MM(int age)
	{
		this->age=new int(age);
	}
	void print()
	{
		cout << *age << " " << endl;
	}
	//重载 赋值运算符
	MM& operator=(MM& mm)
	{
		if (age != nullptr)
		{
			delete age;
			age = nullptr;
		}
		age = new int(*mm.age);
		return *this;
	}
	~MM()
	{
		if (age != nullptr)
		{
			delete age;
			age = nullptr;
		}
	}
 
//protected:
	int* age;
};
int main()
{
	MM m1 =10;
	MM m2 = 20;
	MM m3 = 30;
	m1 = m2=m3;
	cout << *m1.age << " " << *m2.age << " " << *m3.age << endl;
	
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/byXXtO.png)
