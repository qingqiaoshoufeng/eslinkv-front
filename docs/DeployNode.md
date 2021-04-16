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
