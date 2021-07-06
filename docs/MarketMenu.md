<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<div class="help-menu pos-f">目录</div>

- [开发目录规范](#%E5%BC%80%E5%8F%91%E7%9B%AE%E5%BD%95%E8%A7%84%E8%8C%83)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 开发目录规范

项目必须指定组件目录（默认为packages），一个组件目录下可以有多个组件，组件以文件夹为单位，在开发组件时，请遵循以下规范。
以组件文件夹（e-hello ）为例

> 每个组件必须包含一个`index.js`入口文件
>
> 每个组件必须包含一个`custom.vue`视图文件
>
> 每个组件必须有`index.component.ts/js`配置文件

```
|- lib                             // 上传目录
|- |- h-hello                      // 组件英文名
|- └---- h-hello-1.0.0.umd.min.js  // 打包文件
|- examples                        // 本地开发演示主目录
|- |- App.vue                      // 组件容器，包含截图等附加功能
|- |- main.ts                      // 入口ts文件
|- |- shims-tsx.d.ts               // ts相关配置
|- |- shims-vue.d.ts               // ts相关配置
|- |- shims-vue.d.ts               // ts相关配置
|- └- vue.d.ts                     // ts相关配置
|- packages                        // 开发主目录
|- |- e-hello                      // 单个组件目录
|- |- |- custom.vue                // ★自定义组件
|- |- |- index.component.ts        // ★自定义组件配置文件
|- └---- index.js                  // 打包文件
|- public                          // 网站静态文件
|- |- |-  ……                      
|- └- index.html           
|- esp-config.js                   // ★eslinkv-cli配置文件   
```
