**Vue CRM ElementUI Project （Baidu Method Failed, You need to try the bilibili method) **



## toggle bar, close the item section, load the data

1.close the section, when other section is open

2. 2.Have  a button to close the aside bar
3. 3.data load, change the fake data to the api data

##  Process

1.Toggle side bar

1.1UI Write

1.2 Copllase attrbute,change: a  click function, a 

1.3 dynamic change the width value: condition change

1.4 closse the close animation close



2.Toggle side bar item section

3.Data load axios



## Report Data Section

The report section can show the data map



## Process

1.install the E chars package

2.Then render the data in the page

## Router Page UI 

Build a data table component, so the every view component can use it



## Process

1.The parent Component will send the data props to the child component

2.The Parent Component has the State Component, and UI Component(index), a folder

3.Put the Function things(Action) into the vuex

## 

## ## Login, token session save, router path render, message

1.login to the account, then redirect to the home page

2.save the token into the session 

3.router guard to process visit the home pgae

4.home page router render

5.login height css fix (CSS value fix)

6.pop up message inform the user login success

## Process

1. 1.redirect to the home page
2. 1.1 axios use global
3. 1.2 When you submit the form data, this one will be used in the 
4. method, axios call the api
5. Save the token into the session
6. 1.3 Vuex manage the user information(Mixiu form, typescript,)

## Dynamic render the icon

1.parent icon need to be unique

2.child icon use the tools icon

## Process

Define a obect data in the data section:

id and icon

this data will be rendered into the UI Icon section

Dynamic get the icon from the data section





## Login page and side bar build

1.Vue Side Bar render

1.1.Logic:(Base OA)

similiar like the Ant design:

define the json data of the toggle title and path, then render it in the el sumenu(element UI component)

1. jing Ge, Udemy OA system, REACT ADMIN, React Travel

1.header

2.side bar

3.right side content

1.2 UI, CSS, JS ,DATA



2.Login and page(UI)

2.1 background color

2.2 login section

2.3 form:

input: user nama(icon, field), password(icon, field)

two buttons:Login and reset

2.4 logo build

2.5 When you click the login button, it will trigger the login section and go to the home view section, or shows the erros

2.6 When you click the reset button it will reset the field value



## Process

initial value: 

1.model

2.props

3.other





Vue Start:

Start the environment:(mixiu fourm project) mvn export download the single project

0.Git ignore file add

0.1 structure use the typescript project structure(mixiu fourm)

1.page build, router build(App.js is responsible for the router)

## Vue2 use the Element UI

1.install the package

```
npm i element-ui -S
```



2. 2.configure the component import

3. ```
   npm i @babel/preset-env -D
   
   Add the code snipate to the babel.config.js
   module.exports = {
     presets: [
       '@vue/cli-plugin-babel/preset',
       ["@babel/preset-env", { "modules": false }]
     ],
     "plugins": [
       [
         "component",
         {
           "libraryName": "element-ui",
           "styleLibraryName": "theme-chalk"
         }
       ]
     ]
   }
   
   
   ```

4. [element-ui按需引入报错 Error: Cannot find module ‘babel-preset-es2015‘](https://blog.csdn.net/zy21131437/article/details/108029284)

[Vue2 use the Element UI](https://www.cnblogs.com/jshare/p/7403339.html)

[vue2.0项目中使用element-ui步骤](https://www.jianshu.com/p/864920ff12d4)



## Less and less loader

```
npm i less-loader@5.0.0 less
```

[dependece:](https://github.com/GlennOu66304/Full-Stack-Development/blob/master/Project%20%20%20building/React+antd%E6%90%AD%E5%BB%BA%E5%90%8E%E5%8F%B0%E5%89%8D%E7%AB%AF%E8%84%9A%E6%89%8B%E6%9E%B6.md)



1.2 Data Fetch and Update(Axios Project)

2.Login and Register, Logout

3.Private Route

4.Vuext

1.Goal

2.process:

2.1Logic

2.2 function, condition, loop, array,Object

2.3 UI, CSS, JS, DATA





Tutorial Video

[Vue实战项目：电商管理系统（Element-UI）](https://www.bilibili.com/video/BV1E7411c7M8?p=3)

Demo:

1.API

api doc

[ 1. 电商管理后台 API 接口文档](https://gitee.com/wBekvam/vueShop-api-server/blob/master/api%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3.md)

2.Front End

[欢迎登录到电商后台管理系统!](http://admin.lianghj.top/#/welcome)



Source Code:

前端代码(vue_shop) 和 后端代码(vue_shop_server)   :  
github: 	https://github.com/lysimportant
gitee:		https://gitee.com/lysimportant



Back end server:

[Vue Shop Server](https://github.dev/lysimportant/vue_shop_server)

Node + Express + MySql 

DAO to process the data betwee Mysql and express (Like mongodb)

