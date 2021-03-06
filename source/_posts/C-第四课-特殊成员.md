---
title: C++~第四课---特殊成员
author: 小杨呀
top: false
cover: false
toc: true
mathjax: false
tags:
  - const
  - 友元
  - this指针
categories:
  - C++课程笔记
index_img: 'https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/815873.jpg'
abbrlink: aec3
date: 2022-03-07 19:16:16
---

## 1.  const成员

- const数据成员

const类型变量是<font color='orange'>不可以修改，只读模式</font>

<font color='orange'>必须采用初始化参数列表方式初始化</font>

- const成员函数

写法上，<font color='orange'>const写在函数后面</font>

常成员函数是<font color='orange'>不能够修改数据成员，只读数据成员</font>

常成员函数可以和普通函数<font color='orange'>同时存在</font>

普通对象和常成员函数<font color='orange'>同时存在</font>，普通对象<font color='orange'>优先调用普通函数</font>

普通对象可以调用常成员函数

```cpp
//同时存在
class MM
{
  void print()
	{
		//num = 0;//错误，不能修改只读模式
		cout <<"普通函数"<< endl;
	}
	void print()const
	{
		//name = "修改";//不能修改
		//num = 9;
		cout << "const成员函数" << endl;
	}
}
int main()
{
	MM mm("你好", 11);
	mm.print();
 
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/byHRu6.png)

- const对象

const修饰的对象

常对象只能调用常成员函数

```cpp
#include <iostream>
#include <string>
using namespace std;
class MM
{
public:
	MM(string name, int num) :num(num)
	{
		//MM::num = 0;不能直接在里面初始化必须要参数列表
		MM::name = name;//可以不用，可以用初始化参数列表
	}
	void print()
	{
		//num = 0;//错误，不能修改只读模式
		cout <<"普通函数" << endl;
	}
	//常成员函数
	void print()const
	{
		//name = "修改";//不能修改
		//num = 9;
		cout << "const成员函数" << endl;
	}
	void print2()
	{
		//num = 0;//错误，不能修改只读模式
		cout << "普通函数" << endl;
	}
protected:
	string name;
	const int num;//const数据成员
};
int main()
{
	MM mm("你好", 11);
	mm.print();//普通对象调用普通函数
	const MM mm2("常对象", 111);
	mm2.print();//常对象调用常成员函数
	//mm2.print2();//错误，常对象只能调用常成员函数
 
	return 0;
}
```

## 2.  static成员

<font color='orange'>static成员不属于对象，是属于类的，意味着是所有对象共有的，调用可以不需要对象，也开头用对象调用，static成员依旧受权限限定</font>

- static数据成员

必须在类外初始化,类外初始化，<font color='orange'>不再需要static修饰</font>，但是需要<font color='orange'>类名限定</font>

类中初始化是错误的，以及<font color='orange'>不能采用初始化参数列表初始化</font>

```cpp
#include <iostream>
#include <string>
using namespace std;
class MM
{
public:
	MM(string name=" ")
	{
		num++;
	}
protected:
	string name;
public://需要把权限改成公有
	static int num;
	//static int num=0;//类中初始化是错误的
};
//类外初始化，不再需要static修饰，但是需要类名限定
int MM::num = 1001;
int main()
{
	//静态成员成员访问，可以不需要对象
	cout << MM::num << endl;//1001
	//什么叫共有？
	MM mm("mm");
	//静态数据成员可以通过对象去访问
	cout << mm.num << endl;//此时num=1002
	MM arr[4];
	MM* p = new MM("newNum");
	cout << MM::num << endl;//1007
	cout << p->num << endl;//1007
	cout << mm.num << endl;//1007
	delete p;
	p = nullptr;
 
 
	return 0;
}
```

- static成员函数

<font color='orange'>static写在函数前面,调用非静态成员必须指定对象</font>

```cpp
#include <iostream>
#include <string>
using namespace std;
class MM
{
public:
	MM(string name=" ")
	{
		num++;
	}
	static void printData();
	static void printData2(MM& mm)
	{
		cout << mm.name << " " << mm.num << endl;
	}
protected:
	string name="你好";
public://需要把权限改成公有
	static int num;
	//static int num=0;//类中初始化是错误的
};
//类外初始化，不再需要static修饰，但是需要类名限定
int MM::num = 1001;
void MM::printData()
{
	//调用非静态成员必须要指定对象
	//cout << name << endl;//当这个函数不采用对象去调用，name没有来源
	cout << num << endl;//静态函数调用静态数据，没什么要求
	cout << "非静态成员" << endl;
}
 
int main()
{
	//静态成员成员访问，可以不需要对象
	cout << MM::num << endl;//1001
	//什么叫共有？
	MM mm("mm");
	//静态数据成员可以通过对象去访问
	cout << mm.num << endl;//此时num=1002
	MM arr[4];
	MM* p = new MM("newNum");
	cout << MM::num << endl;//1007
	cout << p->num << endl;//1007
	cout << mm.num << endl;//1007
	delete p;
	p = nullptr;
	mm.printData2(mm);
	MM::printData2(mm);
	
 
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/byHfHO.png)

- static对象

<font color='orange'>释放是最后释放的</font>

## 3.  友元

用<font color='red'>friend</font>描述的关系，友元只是提供一个场所，赋予对象具有打破类的权限限定（<font color='red'>无视权限</font>）

- 友元函数

普通友元函数充当友元函数

```cpp
#include <iostream>
#include <string>
using namespace std;
void printData();
class MM
{
public:
	MM(string name, int age) :name(name), age(age)
	{
 
	}
	void print()
	{
		cout << name << " " << age << endl;
	}
	friend void printData()//无参的友元函数类中实现需要前面声明
	{
		//cout << name << age << endl;//错误的不属于类，不能直接访问成员
		MM m2("无视权限", 14);
		//友元函数提供一个场所，让对象无视权限
		cout << m2.name << " " << m2.age << endl;
	}
protected:
	string name;
private:
	int age;
	friend void printData2(MM& mm);
};
//类外实现不需要friend修饰，不需要类名限定
void printData2(MM& mm)
{
	cout << mm.name << mm.age << endl;
}
 
 
int main()
{
	MM mm("美女", 18);
	mm.print();
	printData2(mm);//直接调用
	printData();
 
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/byHWDK.png)

以另一个类的成员函数

步骤:B类-->A类---->A类的友元函数(B类的成员函数)

```cpp
//类外实现不需要friend修饰，不需要类名限定
void printData2(MM& mm)
{
	cout << mm.name << mm.age << endl;
}
 
class B
{
public:
	void printA();
 
protected:
};
class A
{
public:
	friend void B::printA();
protected:
	string name = "a";
};
 
//成员函数实现，一定是另一个类的下面实现
void B::printA()
{
	A a;
	cout << a.name << endl;
}
int main()
{
	
	B b;
	b.printA();//输出a
	return 0;
}
```

- 友元类

```cpp
#include <iostream>
#include <string>
using namespace std;
 
class MM
{
	friend class GG;
public:
	MM(string name, int age) :name(name), age(age)
	{
		
	}
 
protected:
	string name;
	int age;
 
};
class GG
{
public:
	void print()
	{
		MM mm("你好", 14);
		cout << mm.name << " " << mm.age;
	}
	void print2(MM& mm)
	{
		cout << mm.name << " " << mm.age;
	}
	MM& returnMM(MM& mm)
	{
		return mm;
	}
protected:
 
};
int main()
{
	MM mm("阿拉蕾", 444);
	GG gg;
	gg.print();
	gg.print2(mm);
	//cout<< gg.returnMM(mm) << endl;//错误，出了友元类，没有权限
	return 0;
}
```

互为友元

```cpp
#include <iostream>
#include <string>
using namespace std;
//互为友元
class A
{
	friend class B;
public:
	void print();
protected:
	string data = "A";
};
 
class B
{
public:
	friend class A;
	void print()
	{
		A a;
		cout << a.data << endl;
	}
protected:
	string data = "B";
};
void A::print()
{
	B b;
	cout << b.data << endl;
}
int main()
{
	B b;
	b.print();
	A a;
	a.print();
	return 0;
}
```

## 4.  this指针与explicit

### 4.1  explicit

explicit修饰构造函数使用，不让隐式转换构造

```cpp
#include <iostream>
using namespace std;
 
class MM
{
public:
	explicit MM(int age) :age(age)
	{
		cout << age << endl;
	}
protected:
	int age;
};
int main()
{
	//隐式构造函数
	//explicit限制隐式构造
	MM mm = 111;
	MM mm = 1.23;//会自动把小数隐式转换成整数
	return 0;
}
```

### 4.2.  this指针

- <font color='orange'>避免形参名和数据成员同名</font>，通指对象的地址,<font color='orange'>类外是没有this指针</font>

- <font color='orange'>充当函数返回值，返回对象本身</font>，用<font color='orange'>*this</font>表示对象本身.

- <font color='orange'>静态成员函数中是不能使用this指针的</font>

  

```cpp
#include <iostream>
using namespace std;
 
class MM
{
public:
	 MM(int age) :age(age){}
	 //普通函数不存在初始化参数列表
	// void initData(int age) : age(age){}//错误写法
	 void initData(int age)
	 {
		 MM::age=age;//类名限定方式,帮助计算机识别
		 this->age=age;//this指针方式
	 }
	 void print()
	 {
		 cout << this->age << endl;
	 }
	 MM returnMM()
	 {
		 return *this;//返回对象本身
	 }
	 //这种写法错误的,static没有this指针
	/*static MM rerurnMM2()
	 {
		cout << this->age << endl;
	 }*/
 
protected:
	int age;
};
int main()
{
	MM mm(111);
	mm.print();
	mm.initData(222);
	mm.print();
	mm.returnMM().print();
	
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/byHgjx.png)

## 5.  实现string

```cpp
#include <iostream>
#include <string>
#include <cstring>
using namespace std;
class mystring
{
public:
	mystring(const char* str=" ")
	{
		strSize = strlen(str) + 1;
		mystring::str = new char[strSize];
		strcpy_s(this->str,strSize, str);
	}
	mystring(const mystring& object)
	{
		strSize = object.strSize;
		str = new char[strSize];
		strcpy_s(str, strSize, object.str);
	}
	char* c_str()
	{
		return str;
	}
	char* data()
	{
		return str;
	}
	mystring append(const mystring& object)
	{
		mystring temp;
		temp.strSize = mystring::strSize + object.strSize-1;
		temp.str = new char[temp.strSize];
		memset(temp.str, 0, temp.strSize);
		strcat_s(temp.str, temp.strSize, str);
		strcat_s(temp.str, temp.strSize, object.str);
		return temp;
	}
	int compare(const mystring& object)
	{
		return strcmp(str, object.str);
	}
	~mystring()
	{
		delete[] str;
		str = nullptr;
	}
 
protected:
	char* str;
	int strSize;
};
 
 
int main()
{
	//1.实现string中创建方式
	mystring str1;
	mystring str2("ILOVEYOU");
	mystring str3(str1);
	mystring str4 = str2;
	//2.通过实现data和c_str函数  打印字符串
	cout << str2.c_str() << endl;//打印ILOVEYOU
	cout << str2.data() << endl;//打印ILOVEYOU
	//3.实现append实现字符串的连接
	mystring strOne = "one";
	mystring strTwo = "two";
	mystring strThree = strOne.append(strTwo);
	cout << strThree.data() << endl;//onetwo
	//实现字符串比较
	cout << strOne.compare(strOne) << endl;//0
	//5.手写构造函数释放内存
 
 
 
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/byHcg1.png)
