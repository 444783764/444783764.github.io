---
title: C++~第九课---文件操作
author: 小杨呀
top: false
cover: false
toc: true
mathjax: false
index_img: 'https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/thumb-1920-375187.jpg'
tags:
  - 文件操作
categories:
  - C++课程笔记
abbrlink: '9257'
date: 2022-03-08 17:17:13
---

## 1.  文件操作

- 包含头文件<font color='orange'><fstream></font>
- 文件类型分两种：

①文本文件:  文件以文本的<font color='orange'>ASCII码</font>形式存储在计算机中

②二进制文件:  文件以文本的<font color='orange'>二进制</font>形式存储在计算机中，用户一般不能直接读懂它们

## 2.  文本文件

<font color='red'>写文件步骤如下：</font>
①<font color='orange'>包含头文件</font>
\#include <fstream>
②<font color='orange'>创建流对象</font>
ofstream ofs;
③<font color='orange'>打开文件</font>
ofs.open("文件路径",打开方式);
④<font color='orange'>写数据</font>
ofs << "写入的数据";
⑤<font color='orange'>关闭文件</font>
ofs.close();

```cpp
#include <iostream>
#include <string>
#include <fstream>//包含头文件
using namespace std;
int main()
{
	//1.包含头文件
	//2.创建流对象
	ofstream ofs;
	//3.指定打开方式
	ofs.open("1.txt", ios::out);//如果没有文件自己会先创建文件
	//4.写入数据
	ofs << "2021年2月6日" << endl;//换行符也有用
	ofs << "姓名：张三" << endl;
	ofs << "电话：1234567" << endl;
	//5.关闭文件
	ofs.close();
	return 0;
}
```

文件打开方式：

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bgNKpR.png)

<font color='orange'> 注意：文件打开方式可以配合使用，利用 |  操作符</font>

读文件步骤如下：
①<font color='orange'>包含头文件</font>
\#include <fstream>
② <font color='orange'>创建流对象</font>
ifstream ifs;
③<font color='orange'>打开文件并判断文件是否打开成功</font>
ifs.open("文件路径",打开方式);
④<font color='orange'>读数据</font>
四种方式读取
⑤<font color='orange'>关闭文件</font>
ifs.close();

```cpp
#include <iostream>
#include <string>
#include <fstream>//包含头文件
using namespace std;
int main()
{
	//1.包含头文件
	//2.创建流对象
	ifstream ifs;
	//3.指定打开方式
	ifs.open("1.txt", ios::in);
	if (!ifs.is_open())
	{
		cout << "文件打开失败" << endl;
		exit(0);
	}
	//4.读取数据(4重方式)
	char buf2[1024] = { 0 };
	while (ifs.getline(buf2, 1024))
	{
		cout << buf2<<endl;//需要手动添加换行
	}
	//5.关闭文件
	ifs.close();
	return 0;
}
```

读取文件<font color='red'>4</font>种方式：

```cpp
//第一种(遇到空格会换行)空格都被endl回车代替了
	char buf[1024] = { 0 };
	while (ifs>>buf)
	{
		cout << buf<<endl;
	}
```

```cpp
//第二种(空格也会输出)
	char buf2[1024] = { 0 };
	while (ifs.getline(buf2, 1024))
	{
		cout << buf2<<endl;//需要手动添加换行
	}
```

```cpp
//第三种(跟第二种一样，参数不同罢了)
	string buf3;
	while (getline(ifs, buf3))
	{
		cout << buf3 << endl;//需要手动添加换行
	}
```

```cpp
//第四种
	char c;
	while ((c = ifs.get()) != EOF)
	{
		cout << c;//一个个字符读，不需要手动加换行，但是效率低
	}
```

## 3.  二进制文件

- 打开方式指定为 <font color='orange'>ios :: binary</font>

二进制方式写文件主要利用流对象调用成员函数<font color='orange'>write</font>

<font color='orange'>函数原型：</font>

```cpp
//字符指针buffer指向内存中一段存储空间;len是读写的字节数
ostream& write(const char *buffer,int len);
```

- <font color='orange'>把string写入文件中，需要先转换为char\*再写进去</font>

  

<font color='cornflowerblue'>写文件：</font>

```cpp
#include <iostream>
#include <string>
#include <fstream>//包含头文件
using namespace std;
class MM
{
public:
    char name[20];
	int age;
};
int main()
{
	//1.包含头文件
	//2.创建流对象并且打开文件
	ofstream ofs("1.txt", ios::out | ios::binary);//两步合一步，不用再写open
	//4.写入文件
	MM mm={ "小芳",11 };
	ofs.write((const char*)&mm,sizeof(MM));
	ofs.close();
	return 0;
}
```

<font color='cornflowerblue'>读文件：</font>

```cpp
#include <iostream>
#include <string>
#include <fstream>//包含头文件
using namespace std;
class MM
{
public:
    char name[20];
	int age;
};
int main()
{
	//1.包含头文件
	//2.创建流对象
	ifstream ifs;
	//打开文件并且判断是否成功打开
	ifs.open("1.txt", ios::in | ios::binary);
	if (!ifs.is_open())
	{
		cout << "打开文件失败" << endl;
		exit(0);
	}
	//4.读文件
	MM mm;
	ifs.read((char*)&mm, sizeof(mm));
	cout << mm.name<<" "<<mm.age << endl;
	//关闭文件
	ifs.close();
	return 0;
}
```

## 4.  文件指针定位

- ifstream类的对象

<font color='orange'>istream& seekg(long int pos);</font>

<font color='orange'>istream& seekg(long int pos,ios_base::seekdir position);</font>

- ofstream类的对象

<font color='orange'>ostream& seekg(long int pos);</font>

<font color='orange'>ostream& seekg(long int pos,ios_base::seekdir position);</font>

- ios_base::seekdir:

1. ios::beg 文件开始位置
2. ios::end 文件结束位置
3. ios::cur  文件当前位置

```cpp
#include <iostream>
#include <string>
#include <fstream>//包含头文件
using namespace std;
void test(const char* fileName)
{
	fstream fread(fileName, ios::in);
	if (!fread)
	{
		cout << "打开文件失败" << endl;
	}
	char c = fread.get();
	cout << c;
	fread.seekg(4,ios::beg);//打印第4个（文件一开始是在第一个字符上所以读出来是第五个）
	c = fread.get();
	cout << c;
	fread.seekg(-4,ios::end);//打印倒数第四个
	c = fread.get();
	cout << c << endl;
}
int main()
{
	test("1.txt");
	return 0;
}
```

