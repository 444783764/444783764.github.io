---
title: 爬取ip地址
author: 小杨呀
top: false
cover: false
toc: true
mathjax: false
index_img: 'https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/thumb-1920-91659.jpg'
tags:
  - ip
  - C语言
categories:
  - 实用教程
abbrlink: 654d
date: 2022-03-06 17:57:31
---

## 1.  代码获取ip

首先安装Wireshark软件，安装网站：https://www.wireshark.org/about-sharkfest.html

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bDDuvV.png)

然后安装打开：

可能这个弹窗会弹很多次，这是正常的一直点是就行了，点完进去就是看到很多接口，有波浪状的就行

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bDDYCR.png)

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bDDIaQ.png)

建议顺便下载Notepad++，这个软件还是不错的：

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bDD7Ps.png)

然后编写一个C代码帮我们从抓的数据找出地址

```cpp
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
 
int main()
{
	char line[1024] = { '\0' };
	char ip[16] = { '\0' };
	FILE* pFile = NULL;
	int count = 0;
	printf("请输入捕获的包文件名：\n");
	scanf("%s", line);
	printf("你输入的文件名是：%s,开始查询好友IP...\n", line);
	pFile = fopen(line, "r");
	if (pFile == NULL)
	{
		printf("打开文件失败！原因是%s\n", strerror(errno));
		system("pause");
		return 0;
	}
	while (!feof(pFile))
	{
		fgets(line, 1024, pFile);//执行读取数据
		if (strstr(line, "Len=72") && strstr(line, "UDP	114"))
		{
			if (count < 3)
			{
				int no = 0;
				char time[16] = { '\0' };
				char myIP[32] = { '\0' };
				char friendIP[32] = { '\0' };
				sscanf(line, "%d %s %s %s", &no, time, myIP, friendIP);
				if (strncmp(friendIP, "192.", 4) == 0 || strncmp(friendIP, "10.", 3) == 0)
				{
					continue;
				}
				count++;
				printf("你的IP是：%s  你的好友IP是：%s\n", myIP, friendIP);
			}
			else
			{
				break;
			}
		}
	}
	fclose(pFile);
	return 0;
		
}
```

CTRL+A全部选择，然后点编辑->复制->As Plain Txt,然后在刚刚写的代码所在文件那新建一个1.txt,用Notepad++打开，把刚刚复制的粘贴上去然后保存文件，回到代码里点运行就可以，原理就是找Len=72的那些数据，具体为什么我也不太清楚...

![](https://gitee.com/zhen-wang-yang/drawing-bed/raw/master/imge/bDrCGR.png)

查询ip网站：https://ip.cn/ip/42.48.247.141.html

此教程纯属技术交流

## 2.  火绒剑获取ip

<iframe src="//player.bilibili.com/player.html?aid=467353301&bvid=BV11L411P72b&cid=549528716&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" width="740px" height="480px" allowfullscreen="true"> </iframe>

详细教程都在里面了，实践见真理！

顺便放个眼：就是提取网页视频，上面的视频也是这样获取的（因为实在找不到下载视频按钮）

[网页视频在线下载（在线网页视频提取） - 好的plus (haodeplus.com)](https://www.haodeplus.com/article/1668369.html)

