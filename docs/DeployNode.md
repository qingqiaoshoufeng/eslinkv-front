<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<div class="help-menu pos-f">目录</div>

- [下载安装 node](#%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85-node)
- [配置环境变量](#%E9%85%8D%E7%BD%AE%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F)
- [刷新环境变量](#%E5%88%B7%E6%96%B0%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F)
- [检测是否安装成功](#%E6%A3%80%E6%B5%8B%E6%98%AF%E5%90%A6%E5%AE%89%E8%A3%85%E6%88%90%E5%8A%9F)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 下载安装 node

```
mkdir /usr/local/download
wget http://nodejs.org/dist/v14.15.1/node-v14.15.1-linux-x64.tar.gz
mkdir -p /usr/local/nodejs/nodejs-v14.15.1
tar --strip-components 1 -xzvf node-v* -C /usr/local/nodejs/nodejs-v14.15.1
```

## 配置环境变量

```
vim /etc/profile
vim ~/.bash_profile // 当前用户的环境变量
export NODE_HOME=/usr/local/nodejs/nodejs-v14.15.1
export PATH=${PATH}:${NODE_HOME}/bin
```

## 刷新环境变量

```
source /etc/profile
```

## 检测是否安装成功

```
node -v
npm -v
```
