---
title: 案例~C++模板---数组排序，数组类封装
author: 小杨呀
top: false
cover: false
toc: true
mathjax: false
index_img: 'https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/thumb-1920-311970.jpg'
tags:
  - 封装
categories:
  - C++课程笔记
abbrlink: a767
date: 2022-03-08 19:19:45
---

## 1.  数组排序

- 利用模板将char类型数组和int类型数组进行排序

```cpp
#include <iostream>
#include <string>
#include <fstream>//包含头文件
using namespace std;
/*
	实现通用 对数组进行排序的函数
	规则：从大到小
	算法：选择排序
	测试：char数组、int数组
*/
 
//元素交换模板
template<typename T>
void mySwap(T& a, T& b)
{
	T temp = a;
	a = b;
	b = temp;
}
 
//数组排序模板
template<typename T>
void mySort(T arr[], int len)
{
	for (int i = 0; i < len; i++)
	{
		int max = i;
		for (int j = i + 1; j < len; j++)
		{
			if (arr[j] > arr[max])
			{
				max = j;
			}
		}
		//交换
		if (i != max)
		{
			mySwap(arr[max], arr[i]);
		}
	}
}
 
//打印数组模板
template<typename T>
void print(T arr[],int len)
{
	for (int i = 0; i < len; i++)
	{
		cout << arr[i] << "\t";
	}
	cout << endl;
}
void test1()
{
	//测试char数组
	char charArr[] = "aabcdef";
	int len = sizeof(charArr) / sizeof(charArr[0]);
	mySort(charArr, len);
	print(charArr, len);
}
 
void test2()
{
	//测试int数组
	int intArr[] = { 1,1,2,4,5,8,7,3 };
	int len = sizeof(intArr) / sizeof(intArr[0]);
	mySort(intArr, len);
	print(intArr, len);
}
 
int main()
{
	test1();
	test2();
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bg4kGR.png)

## 2.  数组类封装

普通框架

```cpp
#pragma once
#include <iostream>
#include <string>
using namespace std;
 
template<class T>
class MyArray
{
public:
 
	//有参构造  参数 容量
	MyArray(int capacity)
	{
		this->m_Capacity = capacity;
		this->m_size = 0;
		this->pAddress = new T[this->m_Capacity];
		cout << "有参构造调用" << endl;
	}
 
	//拷贝构造
	MyArray(const MyArray& arr)
	{
		this->m_Capacity = arr.m_Capacity;
		this->m_size = arr.m_size;
		//this->pAddress = arr.pAddress;//错误，这是浅拷贝
		this->pAddress = new T[arr.m_Capacity];
		//将arr中的数据也拷贝过去
		for (int i = 0; i < this->m_size; i++)
		{
			this->pAddress[i] = arr.pAddress[i];
		}
		cout << "拷贝构造调用" << endl;
	}
 
	//operator= 防止浅拷贝
	MyArray& operator=(const MyArray& arr)
	{
		//先判断原来堆区是否有数据，如果有先释放
		if (this->pAddress != nullptr)
		{
			delete[] this->pAddress;
			pAddress = nullptr;
		}
		//深拷贝
		this->m_Capacity = arr.m_Capacity;
		this->m_size = arr.m_size;
		this->pAddress = new T[arr.m_Capacity];
		for (int i = 0; i < this->m_size; i++)
		{
			this->pAddress[i] = arr.pAddress[i];
		}
		cout << "operator=调用" << endl;
		return *this;
	}
 
	//析构
	~MyArray()
	{
		if (this->pAddress == nullptr)
		{
			delete[] pAddress;
			pAddress = nullptr;
		}
		cout << "析构调用" << endl;
	}
 
protected:
	T* pAddress;//指针指向堆区开辟的真实数组
	int m_Capacity;//数组容量
	int m_size;//数组大小
};
```

```cpp
#include <iostream>
#include <string>
#include "Myarry.hpp"
using namespace std;
 
void test()
{
	MyArray <int>arr(5);//构造
	MyArray <int>arr2(arr);//拷贝
	MyArray<int>arr3(100);//构造
	arr3 = arr;//赋值操作
}
 
int main()
{
	test();
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bg4Exx.png)

### 2.1.  全部代码

<font color='orange'>Myarray.hpp</font>

```cpp
#pragma once
#include <iostream>
#include <string>
using namespace std;
 
template<class T>
class MyArray
{
public:
 
	//有参构造  参数 容量
	MyArray(int capacity)
	{
		this->m_Capacity = capacity;
		this->m_size = 0;
		this->pAddress = new T[this->m_Capacity];
	}
 
	//拷贝构造
	MyArray(const MyArray& arr)
	{
		this->m_Capacity = arr.m_Capacity;
		this->m_size = arr.m_size;
		//this->pAddress = arr.pAddress;//错误，这是浅拷贝
		this->pAddress = new T[arr.m_Capacity];
		//将arr中的数据也拷贝过去
		for (int i = 0; i < this->m_size; i++)
		{
			this->pAddress[i] = arr.pAddress[i];
		}
	}
 
	//operator= 防止浅拷贝
	MyArray& operator=(const MyArray& arr)
	{
		//先判断原来堆区是否有数据，如果有先释放
		if (this->pAddress != nullptr)
		{
			delete[] this->pAddress;
			pAddress = nullptr;
		}
		//深拷贝
		this->m_Capacity = arr.m_Capacity;
		this->m_size = arr.m_size;
		this->pAddress = new T[arr.m_Capacity];
		for (int i = 0; i < this->m_size; i++)
		{
			this->pAddress[i] = arr.pAddress[i];
		}
		return *this;
	}
 
	//尾插法
	void Push(const T& val)
	{
		//判断容量是否等于大小
		if (this->m_Capacity == this->m_size)
			return;
		this->pAddress[this->m_size] = val;
		this->m_size++;
	}
 
	//尾删
	void Pop()
	{
		//让用户访问不到最后一个元素
		if (this->m_size == 0)
			return;
		this->m_size--;
	}
 
	//通过下标访问数组元素
	T& operator[](int index)//返回&引用就是可修改的左值，例如：arr[1]=8;
	{
		return this->pAddress[index];
	}
 
	//返回容量大小
	int getCapacity()
	{
		return this->m_Capacity;
	}
 
	//返回数组大小
	int getSize()
	{
		return this->m_size;
	}
 
	//析构
	~MyArray()
	{
		if (this->pAddress == nullptr)
		{
			delete[] pAddress;
			pAddress = nullptr;
		}
	}
 
protected:
	T* pAddress;//指针指向堆区开辟的真实数组
	int m_Capacity;//数组容量
	int m_size;//数组大小
};
```

<font color='orange'>main.cpp</font>

```cpp
#include <iostream>
#include <string>
#include "Myarry.hpp"
using namespace std;
 
template<class T>
void print(MyArray<T>& arr)
{
	for (int i = 0; i < arr.getSize(); i++)
	{
		cout << arr[i] << "\t";
	}
	cout << endl << "arr容量：" << arr.getCapacity() << endl;
	cout << "arr大小：" << arr.getSize() << endl << endl;
}
void test()
{
	MyArray<int>arr1(16);
	for (int i = 0; i <6; i++)
	{
		arr1.Push(i);//头插
	}
	arr1[0] = 999;
 
	MyArray<int>arr2(arr1);
 
	MyArray<int>arr3(2);
 
	arr3 = arr1;
 
	arr3.Pop();
 
	print(arr1);
	print(arr2);
	cout << "arr3尾删后："<<endl;
	print(arr3);
}
 
//测试自定义数据类型
class Person
{
public:
	Person() {}
	Person(string name, int age) :name(name), age(age) {}
	//重载<<
	friend ostream& operator<<(ostream& out, Person& p)
	{
		cout << p.name <<" " << p.age<<"\t";
		return out;
	}
	string name;
	int age;
};
 
void test2()
{
	MyArray<Person>arr4(4);
	Person p1("张三", 77);
	Person p2("李四", 66);
	Person p3("王五", 22);
	Person p4("傻六", 33);
 
	//将数据插入数组
	arr4.Push(p1);
	arr4.Push(p2);
	arr4.Push(p3);
	arr4.Push(p4);
	print(arr4);
	arr4.Pop();
	cout << "arr4尾删后："<<endl;
	print(arr4);
}
 
int main()
{
	test();
	test2();
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bg4AR1.png)
