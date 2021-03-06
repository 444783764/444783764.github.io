---
title: C++~第六课---类的组合
author: 小杨呀
top: false
cover: false
toc: true
mathjax: false
tags:
  - 构造顺序
  - 封装
categories:
  - C++课程笔记
index_img: 'https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/thumb-1920-658326.jpg'
abbrlink: fa3b
date: 2022-03-07 20:20:59
---

## 1.  类的组合

- 以另一个类的对象为数据成员

构造函数的写法，<font color='orange'>必须采用初始化参数列表的写法</font>

```cpp
#include<iostream>
#include <string>
using namespace std;
class MM
{
public:
	MM(string name,int age) :name(name),age(age){}
	void print()
	{
		cout << name << " " << age << endl;
	}
protected:
	void print2(){}
	string name;
	int age;
};
class GG
{
public:
	GG(string MMname, int MMage, string ggname):m(MMname,MMage)
	{
		this->name = ggname;
	}
	void printdata()
	{
		m.print();
		cout << name << endl;
		//m.print2();//不可访问，m对于MM是类外，不可直接访问
	}
protected:
	string name;
	MM m;
};
int main()
{
	GG gg("男生", 11, "妹妹");
	gg.printdata();
 
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/b69H2T.png)

## 2.  类的组合构造顺序

<font color='orange'>跟参数列表无关，跟定义顺序有关 </font>

```cpp
#include<iostream>
#include <string>
using namespace std;
class A
{
public:
	A(string str):str(str){
		cout << str;
	}
protected:
	string str;
};
class B
{
public:
	B(string str) :str(str) {
		cout << str;
	}
protected:
	string str;
};
class C
{
public:
	C(string str) :str(str) {
		cout << str;
	}
protected:
	string str;
 
};
class D
{
public:
	D(string stra, string strb, string strc) :a(stra), b(strb), c(strc)
	{
		cout << "D" << endl;
	}
protected:
	C c;//跟这里有关
	A a;
	B b;
};
int main()
{
	D d("a", "b", "c");
//析构顺序相反
 
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/b69bxU.png)

## 3.  类中类

<font color='orange'>依旧受权限限定</font>，访问方式：<font color='orange'>需要类名限定  ::</font>

```cpp
#include<iostream>
#include <string>
using namespace std;
struct Node
{
	int data;
	Node* next;
	Node()
	{
		this->next = nullptr;
	}
	Node(int data)
	{
		this->next = nullptr;
		this->data = data;
	}
};
class List
{
public:
	List()
	{
		headNode = new Node;
	}
	void push_front(int data)
	{
		Node* newNode = new Node(data);
		newNode->next = headNode->next;
		headNode->next = newNode;
	}
	
protected:
	Node* headNode;
public:
	//迭代器——类模仿指针行为
	class interator
	{
	public:
		interator(Node* pMove = nullptr) :pMove(pMove){}
		//重载=号
		void operator =(Node* pMove)
		{
			this->pMove = pMove;
		}
		//重载!=号
		bool operator !=(Node* pMove)
		{
			return this->pMove!=pMove;
		}
		//重载++
		interator operator ++()
		{
			pMove = pMove->next;
			return interator(pMove);
		}
		//重载*号
		Node* operator*()
		{
			return pMove;
		}
	protected:
		Node* pMove;
	};
	Node* begin()
	{
		return headNode->next;
	}
	Node* end()
	{
		return nullptr;
	}
};
//类中的枚举类型
class A
{
public:
	//公有的可以访问
protected:
	enum data { mon, year, day };
	//类中的枚举类型也受权限限定
};
 
 
int main()
{
	List list;//创建链表
	for (int i = 0; i < 3; i++)
	{
		list.push_front(i);
	}
	List::interator iter;
	for(iter = list.begin();iter!=list.end(); ++iter)
	{
		cout << (*iter)->data;
	}
	//cout << A::data::mon << endl;//不可访问
 
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/b697GV.png)

## 4.  C++类中默认的函数

- 默认构造函数
- 默认拷贝函数
- 默认析构函数
- 默认赋值运算

```cpp
class A
{
public:
	A() = default;
	A(A& object) = default;
	~A() = default;
	A& operator=(A& object) = default;
```

## 5.  封装Array

```cpp
#include <iostream>
#include <string>
using namespace std;
class Array
{
public:
	Array() = default;
	Array(int arraySize)
	{
		this->arraySize = arraySize;
		memory = new int[arraySize];
	}
	int size()
	{
		return arraySize;
	}
	//重载[]
	int& operator[](int index)
	{
		return memory[index];
	}
	//重载输入
	friend istream& operator>>(istream& in, Array& object)
	{
		for (int i = 0; i < object.arraySize; i++)
		{
			in >> object.memory[i];
		}
		return in;
	}
	//重载输出
	friend ostream& operator<<(ostream& out, Array& object)
	{
		for (int i = 0; i < object.arraySize; i++)
		{
			out << object.memory[i] << " ";
		}
		out << endl;
		return out;
	}
	Array& operator+(Array& object)
	{
		Array* temp = new Array(this->size() + object.size());
		int count = 0;
		for (int i = 0; i < this->size(); i++)
		{
			temp->memory[count++] = this->memory[i];
		}
		for (int i = 0; i < object.size(); i++)
		{
			temp->memory[count++] = object.memory[i];
		}
		return *temp;
	}
	
protected:
	int arraySize;
	int* memory;
};
int main()
{
	Array array(4);
	for (int i = 0; i < array.size(); i++)
	{
		cin >> array[i];
	}
	for (int i = 0; i < array.size(); i++)
	{
		cout << array[i];
	}
	//实现数组连接
	Array one(3);//输入1 2 3
	cin >> one;
	Array two(4);//输入2 3 4 5
	cin >> two;
	Array sum = one + two;
	cout << sum << endl;//打印1 2 3 2 3 4 5
	Array num;
	num = sum;
	cout << num << endl;
	return 0;
}
```

