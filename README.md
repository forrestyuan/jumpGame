# jumpGame 跳一跳-极简模式

never lose Jump Game

## 简述

微信跳一跳，longlongago的一个小游戏，火爆连天，想想我也不妨实现一个只胜不败的跳一跳【kuzhuai】，哈哈哈，说些就写，噼里啪啦噼里啪啦，具有极简代码风的"跳一跳"终于出炉。

## 效果图

![跳一跳效果图](http://photo.forrestyuan.cn/jumpjump.gif)

## 实现流程

- 基本布局
- 角色跳动
- 跳台生成
- 背景移动
需要注意的就是，角色在跳跃时有一个需要翻转的动画效果，起初用的是setInterval,发现很不流畅，卡顿很明显，便采用了requestAnimationFrame来实现动画的效果。
