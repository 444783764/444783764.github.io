---
title: C++~第七课---继承和派生
author: 小杨呀
top: false
cover: false
toc: true
mathjax: false
index_img: 'https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/thumb-1920-323913.jpg'
tags:
  - 继承
  - 派生
categories:
  - C++课程笔记
abbrlink: 48ad
date: 2022-03-07 20:29:35
---

## 1.  继承方式与权限问题

- 继承的写法：

  ```cpp
  class 子类 ：继承方式 父类
  ```

  

- 父类也称为<font color='orange'>基类</font>；子类也称为<font color='orange'>派生类</font>

- 继承的实质：<font color='orange'>父类的数据和成员子类中有一份</font>

- 权限问题：<font color='orange'>继承方式只会增强父类属性在子类中的权限显示</font>

- <font color='orange'>接口：</font>

```cpp
 //接口
    int& getNum()
    {
        return c;
    }
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/b6PocT.png)

```cpp
#include <iostream>
#include <string>
using namespace std;
//父类
class parent
{
public:
	int a;
    //接口
    int& getNum()
    {
        return c;
    }
protected:
	int b;
private:
	int c;
};
//公有继承
class son1 :public parent
{
public:
	void func()
	{
		a = 10;//父类中的公共权限成员，到子类中依然是 公共权限
		b = 20;//父类中的保护权限成员，到子类中依然是 保护权限
		//c = 30;//父类中的私有权限成员，子类访问不到
 
	}
};
//保护继承
class son2 :protected parent
{
public:
	void func()
	{
		a = 100;//父类中的公共权限成员，到子类中是 保护权限
		b = 200;//父类中的保护权限成员，到子类中依然是 保护权限
		//c = 30;//父类中的私有权限成员，子类访问不到
        //但是可以通过接口访问私有
        cout<<getNum()<<endl;
	}
};
//私有继承
class son3 :private parent
{
public:
	void func()
	{
		a = 1000;//父类中的公共权限成员，到子类中是 私有权限
		b = 2000;//父类中的保护权限成员，到子类中是 私有权限
		//c = 30;//父类中的私有权限成员，子类访问不到
	}
};
//孙子
class GrandSon :public son3
{
public:
	void func()
	{
		//a = 10000;//到了son3中 a，b变成私有，即使是儿子，也是访问不到
		//b = 20000;
	}
};
void test1()
{
	son1 s1;
	s1.a = 10;
	//s1.b = 20;//到son1中b是保护权限  类外访问不到
}
void test2()
{
	son2 s2;
	//s2.a = 10;//到son2中a是保护权限  类外访问不到
	//s1.b = 20;//到son2中b是保护权限  类外访问不到
}
void test3()
{
	son3 s3;
	//s3.a = 10;//到son2中a是私有权限  类外访问不到
	//s3.b = 20;//到son2中b是私有权限  类外访问不到
}
int main()
{
	return 0;
}
```

- 派生类中的成员，包含<font color='orange'>两大部分</font>：

  ①一类是<font color='orange'>从基类继承过来</font>的，一类是<font color='orange'>自己增加的成员</font>

  ②从基类继承过来的表现其<font color='orange'>共性</font>，而新增的成员体现了其<font color='orange'>个性</font>

- 继承的好处：<font color='orange'>减少重复代码</font>

- 父类所有<font color='orange'>非静态成员属性</font>都会被子类继承下去，父类中私有成员属性是被<font color='orange'>编译器隐藏了因此访问不到</font>，<font color='orange'>但是确实被继承下去了</font>

  

<font color='red'>注：</font>

①打开“VS 2019的开发人员命令提示符”(“选择Developer Command Prompt for VS2019”)工具

②输入"<font color='orange'>cd </font>"文件所在路径

③输入"<font color='orange'>dir</font>"

④输入"<font color='orange'>cl /d1 reportSingleClassLayout子类名 .cpp文件名</font>"就可以查看了

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/b6PfNn.png)

```cpp
class A
{
public:
	int a;
protected:
	int b;
private:
	int c;
};
class B : public  A
{
public:
 
protected:
	int d;
};
 
cout << sizeof(B) << endl;//输出结果：16
```

### 1.1  例子

```cpp
#include <iostream>
#include <string>
using namespace std;
//父类
class Common
{
public:
	void header()
	{
		cout << "首页，公开课，登陆，注册...（公共头部）" << endl;
	}
	void footer()
	{
		cout << "帮助中心，交流合作，站内地图...（公共底部）" << endl;
	}
	void left()
	{
		cout << "Java,Python,C++,...（公共分类列表）" << endl;
	}
};
class Java :public Common
{
public:
	void content()
	{
		cout << "Java学科视频"<<endl;
	}
};
class Python :public Common
{
public:
	void content()
	{
		cout << "Python学科视频" << endl;
	}
};
void test1()
{
	cout << "Java下载视频页面如下：" << endl;
	Java ja;
	ja.header();
	ja.footer();
	ja.left();
	ja.content();
}
void test2()
{
	cout << "Python下载视频页面如下：" << endl;
	Python py;
	py.header();
	py.footer();
	py.left();
	py.content();
}
int main()
{
	test1();
	test2();
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/b6PI3V.png)

## 2.  继承中的构造函数

- 父类的属性通过父类的构造函数初始化

- 子类中的构造函数，必须要<font color='orange'>调用父类构造函数</font>，<font color='orange'>必须采用初始化参数列表的方式</font>

- 单继承和多继承
  单继承：<font color='orange'>只有一个父类  </font>                     

 多继承：<font color='orange'>两个或者两个以上的父类</font>

- 继承的属性，无论被继承多少次，一直都存在，所以类一般不会被继承很多层，会导致<font color='orange'>类的臃肿</font>

- 继承中的构造和析构顺序：
  <font color='orange'>单继承</font>：<font color='orange'>先构造父类，再构造子类</font>，析构的顺序与构造顺序相反

  <font color='orange'>多继承</font>：<font color='orange'>构造顺序和继承顺序一致，析构相反</font>；任何构造顺序问题都和<font color='orange'>初始化参数列表无关</font>

```cpp
//继承的属性一直都在
class A
{
public:
	A(int a):a(a){}
	int a;
};
 
class B:public A
{
public:
	B(int a,int b) :A(a),b(b){}
	int b;
};
 
class C:public B
{
public:
	C(int a,int b,int c):B(a,b),c(c) {}
	int c;
};
 
class D :public C
{
public:
	D(int a, int b, int c,int d) :C(a,b,c), d(d) {}
	int d;
};
```

```cpp
//单继承
#include <iostream>
#include <string>
using namespace std;
//父类
class Parent
{
public:
	Parent() { cout << "父类无参构造函数" << endl; }
	Parent(string Fname,string Sname):Fname(Fname),Sname(Sname){}
 
	
protected:
	string Fname;
	string Sname;
};
//子类
class Son :public Parent
{
public:
	Son() { cout << "子类无参构造函数" << endl; } //指针写法，父类必须存在无参的构造函数，缺省也可以
	Son(string Fname, string Sname, string sonSname):Parent(Fname,Sname)
	{
		//自己的属性用什么办法初始化都行
		this->sonFname = Fname;
		this->sonSname = sonSname;
	}
	void print()
	{
		cout << "父亲：" << Fname + Sname << endl;
		cout << "儿子：" << sonFname + sonSname << endl;
	}
protected:
	string sonFname;
	string sonSname;
};
 
int main()
{
	Son s1;//子类构造对象，优先调用父类构造函数
	Son son1("李", "狗", "猪");
	son1.print();
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/b6P590.png)

```cpp
//多继承
#include <iostream>
#include <string>
using namespace std;
//父类1
class MM
{
public:
	MM() = default;
	MM(string mmFname, string mmSname)
	{
		this->mmFname = mmFname;
		this->mmSname = mmSname;
	}
protected:
	string mmFname;
	string mmSname;
};
//父类2
class GG
{
public:
	//GG() = default;
	GG(string ggFname, string ggSname)
	{
		this->ggFname = ggFname;
		this->ggSname = ggSname;
	}
protected:
	string ggFname;
	string ggSname;
};
//子类
class Girl:public MM,public GG
{
public:
	//Girl(){}//需要两个父类都有无参构造函数
	//如果没有默认默认构造函数，需要用参数列表初始化，有则不需要
	Girl(string mmFname, string mmSname, string ggFname, string ggSname)
		:MM(mmFname,mmSname),GG(ggFname,ggSname)
	{
		girlFname = mmFname + ggFname;
		girlSname = mmSname + ggSname;
	}
	void print()
	{
		cout << "MM名字：" << mmFname + mmSname << endl;
		cout << "GG名字：" << ggFname + ggSname << endl;
		cout << "Girl名字：" << girlFname + girlSname << endl;
	}
protected:
	string girlFname;
	string girlSname;
 
};
int main()
{
	Girl k("洋", "子", "欧", "文");
	k.print();
	
	return 0;
}
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/b6Phhq.png)

## 3.  继承中同名问题

- 数据成员同名
- 成员函数同名

①<font color='orange'>子类对象可以直接访问到子类中同名成员</font>

②<font color='orange'>子类对象加作用域可以访问到父类同名成员</font>

③当子类与父类拥有同名的成员函数，<font color='orange'>子类会隐藏父类中同名成员函数</font>，加作用域可以访问到父类中同名函数

- <font color='orange'>静态</font>成员处理方式和<font color='orange'>非静态</font>处理方式一样，只不过有两种访问方式：（<font color='orange'>通过对象和通过类名</font>）

```cpp
#include <iostream>
#include <string>
using namespace std;
class MM
{
public:
	MM(string name,int age):name(name),age(age){}
	void print()
	{
		cout << "父类打印" << endl;
	}
 
protected:
	string name;
	int age;
};
 
class Girl :public MM
{
public:
	Girl(string name,int age):MM("父类",88),name(name), age(age) {}
	void print()
	{
		//不做特别处理，就近原则
		cout << name << " " << age << endl;
		//用类名限定，就可以打印父类的数据
		cout << MM::name << " " << MM::age << endl;
		MM::print();//函数也是一样不做特别处理也是就近原则，所以要加类名限定
	}
 
protected:
	string name;
	int age;
};
 
int main()
{
	//正常对象调用
	Girl m("子类",44);
	m.print();
	MM mm("mm", 11);
	mm.print();
 
	//正常指针调用
	//就近原则
	Girl* pG = new Girl("newGirl", 23);
	pG->print();
	pG->MM::print();//这样也可以
	MM* mG = new MM("newMM", 32);
	mG->print();
 
	//非正常的指针
	//允许子类对象初始化父类指针
	MM* pMM = new Girl("newGirl", 999);
	//那pMM的print是MM类还是Girl?
	//在没有virtual情况下，看指针类型，有则看赋值对象
	pMM->print();
 
	//父类对象初始化子类指针，不安全
	//Girl* pGG = new MM("newMM", 5550);//错误
	
	//引发中断
	//Girl* pgg = (Girl*)mG;
	//pgg->print();
	return 0;
}
```

## 4.  菱形继承

- 菱形继承带来的主要问题是<font color='orange'>子类继承两份相同的数据，导致资源浪费以及毫无意义</font>

- 利用<font color='orange'>虚继承可以解决菱形继承问题</font>

  

```cpp
#include <iostream>
#include <string>
using namespace std;
class A
{
public:
	A(int a):a(a){}
 
protected:
	int a;
};
class B :virtual public  A
{
public:
	B(int a,int b):A(a),b(b){}
	void print2()
	{
		cout << a << endl;
	}
protected:
	int b;
};
class C :virtual public  A
{
public:
	C(int a, int c) :A(a),c(c){}
protected:
	int c;
};
class D :public  B,public C
{
public:
	//菱形继承，必须调用祖父的构造函数
	D() :B(1, 2), C(3, 4), A(9) {}//和B类，C类无关
	void print()
	{
		//只有一份，所以打印都是一样的
		cout << a << endl;
		cout << B::a << endl;
		cout << C::a << endl;
		print2();//间接访问也是一样的
	}
protected:
	
};
int main()
{
	D dd;
	dd.print();
	
	return 0;
}
```

