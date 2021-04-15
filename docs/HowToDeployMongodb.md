## 配置 mongodb 源
```
vim /etc/yum.repos.d/mongodb-org-3.4.repo

[mongodb-org-3.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.4.asc
```

## 下载安装 mongodb
```
yum -y install mongodb-org
```
## 启动 mongodb 命令
```
service mongod status //查看状态
service mongod start //开启服务
service mongod stop //关闭服务
```

## 创建一个数据库
第一次直接进入mongodb
```
mongo
```
在进入mongodb之后可以通过`show dbs`查看目前已有的数据
```
> show dbs
admin   0.000GB
config  0.000GB
```
`use xxx` 为切换到某个数据库或创建一个数据库
```
> use runoob
switched to db runoob
> db
runoob
> 
```
这时候注意该数据没有内容是不会在`show dbs`时展示出来的

要显示它，我们需要向 runoob 数据库插入一些数据
```
> db.runoob.insert({"name":"hello world"})
WriteResult({ "nInserted" : 1 })
> show dbs
admin   0.000GB
config  0.000GB
runoob  0.000GB
```

## 创建一个用户
第一次直接进入mongodb
```
mongo
```
在进入mongodb之后先切换到我们需要创建用户的数据库
```
> use test
```
创建用户
```
> db.createUser({user: "root", pwd: "123456", roles: [{ role: "dbOwner", db: "test" }]})
```

## mongodb conf
```
vim /etc/mongod.conf
``` 
```
#日志文件位置
logpath=/data/db/journal/mongodb.log　　（这些都是可以自定义修改的）

# 以追加方式写入日志
logappend=true

# 是否以守护进程方式运行
fork = true

# 默认27017
#port = 27017

# 数据库文件位置
dbpath=/data/db

# 启用定期记录CPU利用率和 I/O 等待
#cpu = true

# 是否以安全认证方式运行，默认是不认证的非安全方式
#noauth = true
#auth = true

# 详细记录输出
#verbose = true

# Inspect all client data for validity on receipt (useful for
# developing drivers)用于开发驱动程序时验证客户端请求
#objcheck = true

# Enable db quota management
# 启用数据库配额管理
#quota = true
# 设置oplog记录等级
# Set oplogging level where n is
#   0=off (default)
#   1=W
#   2=R
#   3=both
#   7=W+some reads
#diaglog=0

# Diagnostic/debugging option 动态调试项
#nocursors = true

# Ignore query hints 忽略查询提示
#nohints = true
# 禁用http界面，默认为localhost：28017
#nohttpinterface = true

# 关闭服务器端脚本，这将极大的限制功能
# Turns off server-side scripting.  This will result in greatly limited
# functionality
#noscripting = true
# 关闭扫描表，任何查询将会是扫描失败
# Turns off table scans.  Any query that would do a table scan fails.
#notablescan = true
# 关闭数据文件预分配
# Disable data file preallocation.
#noprealloc = true
# 为新数据库指定.ns文件的大小，单位:MB
# Specify .ns file size for new databases.
# nssize =

# Replication Options 复制选项
# in replicated mongo databases, specify the replica set name here
#replSet=setname
# maximum size in megabytes for replication operation log
#oplogSize=1024
# path to a key file storing authentication info for connections
# between replica set members
#指定存储身份验证信息的密钥文件的路径
#keyFile=/path/to/keyfile
```
