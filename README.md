# gitops应用端前端项目

## 运行和部署

### 前置项

#### 全局安装yarn

```bash
npm install -g yarn
```

其它安装方式：https://yarnpkg.com/zh-Hans/docs/install

#### 全局安装umi

```bash
yarn global add umi
```

`umi`官方文档：https://umijs.org/zh/

### 本地运行

```bash
yarn start
```

默认启动端口为`8000`，启动成功后，请访问：http://localhost:8000

### 打包部署

```
yarn build
```

构建完成后，将项目根目录下的 `dist` 目录部署至服务器即可。

## 项目介绍

该项目完全遵循`umi`的使用规范，技术栈为`umi + dva + antd`，除此之外添加了一些公用文件便于统一开发，代码结构如下：

```
├── config                 // 多环境的配置目录
|  ├── config.dev.js            
|  ├── config.js           // 默认配置文件
|  └── theme.js            // less主题变量，可替换antd默认主题变量
├── jsconfig.json          // 兼容vscode的代码跳转
├── mock                   // mock数据文件
|  └── user.js
├── package.json      
├── README.md              // 项目说明文件
├── src
|  ├── app.js              // 运行时的配置文件，见https://umijs.org/zh/guide/runtime-config.html
|  ├── assets              // 静态图片资源
|  |  └── yay.jpg
|  ├── components          // 通用组件
|  |  └── loading
|  ├── constants           
|  |  ├── common.js        // 公共常量文件
|  |  └── config.js        // 接收不同环境打包构建时define配置的参数
|  ├── global.css          // 全局统一样式
|  ├── layouts
|  |  ├── index.js         // 全局统一布局文件
|  |  └── index.less
|  ├── locales             // 多语言文件目录
|  |  ├── en-US.js
|  |  └── zh-CN.js
|  ├── models              // dva中使用的model文件
|  |  └── global.js
|  ├── pages               // 路由对应的文件，本项目采用约定式路由，不需要额外再配置
|  |  ├── index.js
|  |  └── index.less
|  ├── styles
|  |  ├── assets.less      // 图片资源引入文件
|  |  ├── util.less        // less工具文件
|  |  └── variable.less    // less全局变量定义文件
|  └── utils               // js工具文件
|     └── base.js
├── webpack.config.js      // 兼容webstorm和intellij idea代码跳转
└── yarn.lock              // 需提交至代码管理，统一依赖的安装版本
```

## 开发规范

### 命名规范

该项目采用如下规范：

- 文件和文件夹：`Kebab Case`
- 常量命名规范： `Upper Case Snake Case`
- 变量命名规范：`Camel Case`
- js类名、组件名：`Pascal Case`
- css类名：`Kebab Case`

常用命名规范示例如下：

命名规范 | 示例
-|-
Original Variable | some awesome var |
Camel Case | someAwesomeVar |
Snake Case | some_awesome_var |
Kebab Case | some-awesome-var |
Pascal Case | SomeAwesomeVar |
Upper Case Snake Case | SOME_AWESOME_VAR |

命名规范详情参考：https://www.chaseadams.io/most-common-programming-case-types/#camelcase

css书写应尽量满足`BEM`规范，即：`block-name__element-name_modifier-name`

`BEM`规范地址：https://en.bem.info/methodology/quick-start/

### 添加多个环境配置

所有的配置文件放在`config/`，默认配置文件为`config/config.js`。添加一套环境配置，只需在config下添加配置文件，并在运行或打包时设置对应的环境变量，如：

```bash
# 添加配置文件config/config.prod.js

# 启动
cross-env UMI_ENV=prod umi dev
# 打包
cross-env UMI_ENV=prod umi build

# 配置会浅合并config/config.prod.js和config/config.js
```

配置文件中支持的配置项请参考：https://umijs.org/zh/config

### 全局变量/常量

#### 不同环境提供的变量

不同环境提供的变量由config目录下配置文件中的`define`来配置，比如不同环境下的后端地址`API_HOST`不一样，则配置方式如下：

```js
// config/config.dev.js
export default {
  define: {
    'process.env.API_HOST': 'http://dev_host',
  }
}
// config/config.prod.js
export default {
  define: {
    'process.env.API_HOST': 'http://prod_host',
  }
}

// src/constants/config.js
export const API_HOST = `${process.env.API_HOST}`;
```

实际代码中使用`API_HOST`都从`src/constants/config.js`中引入，如需自定义其它不同环境下的变量，与上述操作一致。

#### js中的全局常量

所有的js全局常量都放在`src/constants`下，`common.js`文件主要存放一些通用的常量，如日期格式、常用正则等。可根据情况按常量类别在`src/constants`下添加常量文件。

#### less中的全局变量

为方便后续的多主题扩展，所有的全局less变量都在`src/styles/variable.less`中定义，在该文件中，也引入了antd默认主题的变量，可直接使用。

```
// src/styles/variable.less
@global-header-height: 80px;

// src/pages/index.less
@import '~@/styles/variable.less';
.header {
  height: @global-header-height; // 自定义变量
  border: 1px solid @border-color-base; // antd变量
}
```

antd默认主题变量：https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less

### 静态图片处理

静态图片资源应放在`src/assets`下，在js或css引用图片采用如下方式，在打包图片时会自动优化。

#### css中引入图片

```
// src/assets/yay.jpg

// 为避免pages下文件嵌套过深而导致相对路径引入图片混乱的问题，统一在src/styles/assets.less文件中定义图片变量

// src/styles/assets.less
@image-yay: url(../assets/yay.jpg);

// src/pages/index.less
@import '~@/styles/assets.less';
.header {
  background: @image-yay no-repeat center 0;
}
```

#### js中引入图片

```js
import yayImg from '@/assets/yay.jpg';


export default function() {
  return (
    <img src={yayImg} alt="test" />
  );
}
```

### 图标使用

#### antd官方图标库

请尽量使用官方图标库中的图标，见 https://ant-design.gitee.io/components/icon-cn/

使用方式如下：

```js
import { Icon } from 'antd'

export default function() {
  return (
    <Icon type="double-left" />
  );
}
```

#### 从iconfont自定义图标库

从iconfont添加一个新图标流程如下：

1. 从 [iconfont官网](https://www.iconfont.cn/) 上选择一个图标
2. 将图标添加至iconfont项目
3. 生成新的图标库链接
4. 替换项目中`src/components/icon-font/index.js`中的`scriptUrl`

代码中使用自定义图标库中的图标如下：

```js
import IconFont from '@/components/icon-font'

export default function() {
  return (
    <IconFont type="heart" />
  );
}
```

> iconfont项目已经建好，如需添加自定义图标，请先联系项目上管理人员添加项目。

#### 本地静态图标

使用`Icon`组件的`component`属性来实现，如下：

```js
import { Icon } from 'antd';

const HeartSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);
const HeartIcon = props => <Icon component={HeartSvg} {...props} />;
```

> 本地静态图标尽量使用svg格式，才可通过组件调整图标的样式

> 自定义图标统一放在`src/components/icon`下，便于管理和复用

`Icon`组件的更多用法，请参考：https://ant-design.gitee.io/components/icon-cn/

### 多语言（待完善）

### 代码检查

本项目使用`eslint`来规范代码，规则采用`eslint-config-umi`，建议在本地开发时开启eslint插件，可实时查看不符合规范的地方进行修改。另外每次代码提交时会自动执行`eslint --fix`来检验本次提交的代码是否符合规范。

`eslint-config-umi`包含的规则如下：

```js
import reactAppConfig from 'eslint-config-react-app';
export default {
  ...reactAppConfig,
  rules: {
    ...reactAppConfig.rules,
    strict: [0],
    'no-sequences': [0],
    'no-mixed-operators': [0],
    'react/react-in-jsx-scope': [0],
    'no-useless-escape': [0],
  },
  settings: {
    react: {
      version: '16.8',
    },
  },
};
```

> 请不要随意修改eslint规则

### git提交规范

本项目采用如下规则

```bash
[操作][空格][描述]
```

`[操作]`类型如下

```bash
[IMP] 提升改善正在开发或者已经实现的功能

[FIX] 修正BUG

[REF] 重构一个功能，对功能重写

[ADD] 添加实现新功能

[REM] 删除不需要的文件
```

`[描述]`请详细填写修改内容

例如

```bash
[FIX] 修复IE11浏览器进入首页报错的问题
```

> 每次提交记录应尽量保证内容单一，以便描述能准确地反映提交内容，对于大型复杂的开发项应拆分成小的单元分多次提交。
