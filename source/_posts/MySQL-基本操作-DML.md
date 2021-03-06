---
title: MySQL~基本操作---DML
author: 小杨呀
top: false
cover: false
toc: true
mathjax: false
abbrlink: 41c5
date: 2022-03-09 12:42:54
index_img: 'https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/thumb-1920-65078.jpg'
tags:
 - MySQL
 - DML
categories:
 - 数据库
---

## 1.  DML解释

DML是指数据库操作语言，英文全称是Data Manipulation Language,用来对数据库中表的数据记录进行更新。

- <font color='orange'>插入insert</font>
- <font color='orange'>删除delete</font>
- <font color='orange'>更新update</font>

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/b2Rly8.png)

## 2.  数据插入

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bRQATs.png)

```sql
-- DML操作

-- 1.数据的插入,插入多行用,隔开
insert into stu(sid,name,gender,age,birth,address,score)
										values(1002,'张三','男',18,'2022-3-9','中山',69.4),
									(1003,'李四','男',19,'2022-3-9','中山',80.4),
										(1004,'李四','男',19,'2022-3-9','中山',80.4);

insert into stu(sid)values(1008);
insert into stu(age,address)values(50,'江门');
```

<font color='grey'>(由于一开始失误，多运行了所以有重复)</font>

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bR3K6f.png)

```sql
-- 2.格式2
insert into stu values(999,'小美','女',20,'2001-5-20','黑龙江',80);
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bfVTV1.png)

## 3.  数据修改

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bfVqPK.png)

```sql
-- 1.将所有学生地址修改为重庆
update stu set address = '重庆';
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bfZoQg.png)

```sql
-- 2.将id为1004的学生的地址修改为北京
update stu set address = '北京' where sid = 1004;
update stu set address = '北京' where sid > 1004;# 大于1004的都被改成北京
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bfeXBd.png)

```sql
-- 3.将id为999的学生的地址修改为北京，成绩修改为100
update stu set address = '北京',score = 100 where sid = 999;
```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bfmEHs.png)

## 4.  数据删除

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bfm5rQ.png)

```sql
-- 删除数据
-- 1.删除sid为1004的学生数据
delete from stu where sid = 1004;
-- 2.删除表所有数据
delete from stu;
-- 3.清空表数据
truncate table stu;
-- 等效于上面
truncate stu;
```

## 5.  总结

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bfuuXF.png)

## 6.  小练习

```sql
-- 1.创建表
/*
创建员工表employee,字段如下：
id(员工编号)，name(员工名字),gender(员工性别)，salary(员工薪资)
*/
-- use student;
create table if not exists student.employee(
id int,
name varchar(20),
gender varchar(10),
salary double
);
-- 2.插入数据
/*
1.1,'张三'，'男'，'2000'
2.2,'李四'，'男'，'1000'
3.3,'王五'，'女'，'4000'
*/
insert into employee values
(1,'张三','男',2000),
(2,'李四','男',1000),
(3,'王五','女',4000);

-- 3.修改表数据
-- 3.1将所有员工薪水修改成5000元
update employee set salary = 5000; 
-- 3.2将姓名为‘张三’的员工薪水修改成3000元
update employee set salary = 3000 where name = '张三';
-- 3.3将姓名为‘李四’的员工薪水修改为4000元，gender改为女
update employee set salary = 4000 where name = '李四'
-- 3.4将王五的薪水在原有基础上增加1000元
update employee set salary = salary+1000 where name = '王五';

```

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/b5jpCj.png)

