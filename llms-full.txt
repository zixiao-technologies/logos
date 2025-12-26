# 概述

让我们通过 mdui 的 CDN 和一个最简单的页面模板来开始使用 mdui。

> 你正在阅读的是 mdui 2 的文档！
>
> 若要阅读 mdui 1 的文档，请访问 [www.mdui.org/docs/](https://www.mdui.org/docs/)。

## 快速入门 {#getting-started}

使用 mdui 最简单的方式是直接从 CDN 引入 CSS 和 JS 文件。

如果你想使用 npm 安装 mdui，请参考 [安装](/zh-cn/docs/2/getting-started/installation) 章节。

**引入文件**

将下面代码添加到页面的 `<head>` 标签中：

```html
<link rel="stylesheet" href="https://unpkg.com/mdui@2/mdui.css" />
<script src="https://unpkg.com/mdui@2/mdui.global.js"></script>
```

如果你需要使用组件的图标属性（例如 `<mdui-button icon="search"></mdui-button>` 中的 `icon` 属性），则还需要引入图标的 CSS 文件，参见 [使用 Material Icons 图标](/zh-cn/docs/2/components/icon#usage-material-icons)。

mdui 不依赖任何第三方库，引入上述文件后，就能正常工作了。

## 最简单的页面模板 {#template}

下面是一个最简单的页面模板，你可以在其中添加更多组件和内容，来构建一个网站。

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no"/>
    <meta name="renderer" content="webkit"/>

    <link rel="stylesheet" href="https://unpkg.com/mdui@2/mdui.css">
    <script src="https://unpkg.com/mdui@2/mdui.global.js"></script>
    <!-- 如果使用了组件的 icon 属性，还需要引入图标的 CSS 文件 -->

    <title>Hello, world!</title>
  </head>
  <body>
    <mdui-button>Hello, world!</mdui-button>
  </body>
</html>
```

# 安装

你可以选择通过 npm 安装 mdui，或者从 CDN 引入 mdui。推荐使用 npm 进行安装。

## npm 安装 {#npm}

```bash
npm install mdui --save
```

### 全量导入 {#full-import}

在项目的入口文件中导入下面两个文件，即可使用所有 mdui 组件：

```js
import 'mdui/mdui.css';
import 'mdui';
```

也可以直接从 mdui 导入需要使用的函数。例如，要导入 [`snackbar`](/zh-cn/docs/2/functions/snackbar) 函数，可以这样做：

```js
import { snackbar } from 'mdui';
```

<mdui-collapse>
  <mdui-collapse-item>
    <mdui-button slot="header" variant="text">显示所有支持从 mdui 导入的函数</mdui-button>
    <pre class="language-js"><code>import {
  $,
  dialog,
  alert,
  confirm,
  prompt,
  snackbar,
  getTheme,
  setTheme,
  getColorFromImage,
  setColorScheme,
  removeColorScheme,
  loadLocale,
  setLocale,
  getLocale,
  throttle,
  observeResize,
  breakpoint
} from 'mdui';</code></pre>
  </mdui-collapse-item>
</mdui-collapse>

### 按需导入 {#cherry-picking}

为了优化项目体积，可以仅导入需要的组件和函数。例如，如果你只需要使用 [`<mdui-button>`](/zh-cn/docs/2/components/button) 组件和 [`snackbar`](/zh-cn/docs/2/functions/snackbar) 函数，可以按照以下方式导入：

```js
// CSS 文件始终需要导入
import 'mdui/mdui.css';
// 导入 <mdui-button> 组件
import 'mdui/components/button.js';
// 导入 snackbar 函数
import { snackbar } from 'mdui/functions/snackbar.js';
```

每个组件或函数的文档页面都会详细说明如何进行按需导入。

<mdui-collapse>
  <mdui-collapse-item>
    <mdui-button slot="header" variant="text">显示所有支持按需导入的组件和函数</mdui-button>
    <pre class="language-js"><code>import 'mdui/components/avatar.js';
import 'mdui/components/badge.js';
import 'mdui/components/bottom-app-bar.js';
import 'mdui/components/button.js';
import 'mdui/components/button-icon.js';
import 'mdui/components/card.js';
import 'mdui/components/checkbox.js';
import 'mdui/components/chip.js';
import 'mdui/components/circular-progress.js';
import 'mdui/components/collapse/collapse.js';
import 'mdui/components/collapse/collapse-item.js';
import 'mdui/components/dialog.js';
import 'mdui/components/divider.js';
import 'mdui/components/dropdown.js';
import 'mdui/components/fab.js';
import 'mdui/components/icon.js';
import 'mdui/components/layout.js';
import 'mdui/components/layout-item.js';
import 'mdui/components/layout-main.js';
import 'mdui/components/linear-progress.js';
import 'mdui/components/list-item.js';
import 'mdui/components/list-subheader.js';
import 'mdui/components/list.js';
import 'mdui/components/menu-item.js';
import 'mdui/components/menu.js';
import 'mdui/components/navigation-bar-item.js';
import 'mdui/components/navigation-bar.js';
import 'mdui/components/navigation-drawer.js';
import 'mdui/components/navigation-rail.js';
import 'mdui/components/navigation-rail-item.js';
import 'mdui/components/radio.js';
import 'mdui/components/radio-group.js';
import 'mdui/components/range-slider.js';
import 'mdui/components/ripple.js';
import 'mdui/components/segmented-button.js';
import 'mdui/components/segmented-button-group.js';
import 'mdui/components/select.js';
import 'mdui/components/slider.js';
import 'mdui/components/snackbar.js';
import 'mdui/components/switch.js';
import 'mdui/components/tab.js';
import 'mdui/components/tab-panel.js';
import 'mdui/components/tabs.js';
import 'mdui/components/text-field.js';
import 'mdui/components/tooltip.js';
import 'mdui/components/top-app-bar-title.js';
import 'mdui/components/top-app-bar.js';
import { $ } from 'mdui/jq.js';
import { alert } from 'mdui/functions/alert.js';
import { breakpoint } from 'mdui/functions/breakpoint.js';
import { confirm } from 'mdui/functions/confirm.js';
import { dialog } from 'mdui/functions/dialog.js';
import { getColorFromImage } from 'mdui/functions/getColorFromImage.js';
import { getLocale } from 'mdui/functions/getLocale.js';
import { getTheme } from 'mdui/functions/getTheme.js';
import { loadLocale } from 'mdui/functions/loadLocale.js';
import { observeResize } from 'mdui/functions/observeResize.js';
import { prompt } from 'mdui/functions/prompt.js';
import { removeColorScheme } from 'mdui/functions/removeColorScheme.js';
import { setColorScheme } from 'mdui/functions/setColorScheme.js';
import { setLocale } from 'mdui/functions/setLocale.js';
import { setTheme } from 'mdui/functions/setTheme.js';
import { snackbar } from 'mdui/functions/snackbar.js';
import { throttle } from 'mdui/functions/throttle.js';</code></pre>
  </mdui-collapse-item>
</mdui-collapse>

## CDN {#cdn}

你可以使用 `<link>` 和 `<script>` 标签直接通过 CDN 来使用 mdui。也可以下载 CSS 和 JavaScript 文件并部署在你自己的服务器上。引入 CSS 和 JavaScript 文件后，就能使用所有 mdui 组件了。

### 使用全局构建版本 {#global-build}

下面的例子展示了如何使用全局构建版本的 mdui。在这个版本中，所有的函数都作为属性暴露在全局对象 `mdui` 上：

```html
<link rel="stylesheet" href="https://unpkg.com/mdui@2/mdui.css">
<script src="https://unpkg.com/mdui@2/mdui.global.js"></script>

<mdui-button class="btn">点我</mdui-button>

<script>
  document.querySelector('.btn').addEventListener('click', () => {
    mdui.snackbar({ message: '点击了按钮' });
  });
</script>
```

### 使用 ES 模块构建版本 {#es-module}

下面的例子展示了如何使用 ES 模块构建版本的 mdui。在这个版本中，你可以使用 ES 模块语法从 CDN 导入 mdui：

```html
<link rel="stylesheet" href="https://unpkg.com/mdui@2/mdui.css">

<mdui-button class="btn">点我</mdui-button>

<script type="module">
  import { snackbar } from 'https://unpkg.com/mdui@2/mdui.esm.js';

  document.querySelector('.btn').addEventListener('click', () => {
    snackbar({ message: '点击了按钮' });
  });
</script>
```

# 快速入门

mdui 的组件都是标准的 Web Components 组件，你可以像使用 `<div>` 标签一样使用 mdui 组件。每个组件的文档中都详细描述了其完整的 API，包括属性、方法、事件、slot、CSS Part、CSS 自定义属性等。

本章文档将向你介绍 Web Components 的使用方法。

## 属性 {#attribute}

属性分为 HTML 属性和 JavaScript 属性，它们通常是一一对应的，并且会保持同步。也就是说，当你更新 HTML 属性值时，JavaScript 属性值也会随之更新；反之亦然。

HTML 属性可以直接在组件的 HTML 字符串中设置，并通过 `getAttribute` 和 `setAttribute` 方法进行读取和修改：

```html
<mdui-button variant="text">点我</mdui-button>

<script>
  const button = document.querySelector('mdui-button');

  // 修改 HTML 属性
  button.setAttribute('variant', 'outlined');

  // 读取 HTML 属性
  console.log(button.getAttribute('variant')); // outlined
</script>
```

JavaScript 属性则可以直接读取或设置组件实例的属性值：

```html
<mdui-button variant="text">点我</mdui-button>

<script>
  const button = document.querySelector('mdui-button');

  // 设置 JavaScript 属性
  button.variant = 'outlined';

  // 读取 JavaScript 属性
  console.log(button.variant); // outlined
</script>
```

某些属性值是 boolean 类型，这些属性的 HTML 属性存在时，JavaScript 属性为 `true`，否则为 `false`。但是，为了兼容某些框架，mdui 会把字符串 `false` 值也判定为 boolean 值 `false`。

```html
<!-- 这个组件存在 disabled 属性，即默认 disabled 属性值为 true -->
<mdui-button disabled></mdui-button>

<script>
  const button = document.querySelector('mdui-button');

  button.removeAttribute('disabled'); // 等效于 button.disabled = false;
  button.setAttribute('disabled', ''); // 等效于 button.disabled = true;

  // 例外情况，设置为字符串 false 值，等效于设置成 boolean 值 false
  button.setAttribute('disabled', 'false'); // 等效于 button.disabled = false;
</script>
```

有时属性值是数组、对象或函数，这时只有 JavaScript 属性，没有对应的 HTML 属性，例如 [`<mdui-slider>`](/zh-cn/docs/2/components/slider) 组件的 [`labelFormatter`](/zh-cn/docs/2/components/slider#attributes-labelFormatter) 属性是一个函数，你只能通过 JavaScript 来设置该属性：

```html
<mdui-slider></mdui-slider>

<script>
  const slider = document.querySelector('mdui-slider');
  slider.labelFormatter = (value) => `${value}%`;
</script>
```

下面以 [`<mdui-slider>`](/zh-cn/docs/2/components/slider) 组件属性文档的一部分进行举例说明：

| HTML 属性 | JavaScript 属性  | reflect                                                                                |
| --------- | ---------------- | -------------------------------------------------------------------------------------- |
| `name`    | `name`           | <mdui-icon name="check--rounded" style="user-select:none;font-size:1rem;"></mdui-icon> |
| `value`   | `value`          |                                                                                        |
|           | `labelFormatter` |                                                                                        |

这个组件的 `name` 属性具有 HTML 属性和 JavaScript 属性，且 reflect 一栏表明更新 JavaScript 属性时会同步更新 HTML 属性。而 `value` 属性在更新 JavaScript 属性时不会更新 HTML 属性。`labelFormatter` 属性则只有 JavaScript 属性。

## 方法 {#method}

部分组件提供了公共方法，你可以通过调用这些方法来实现不同的功能。例如，[`<mdui-text-field>`](/zh-cn/docs/2/components/text-field) 组件的 [`focus()`](/zh-cn/docs/2/components/text-field#methods-focus) 方法可以使文本框获得焦点。

```html
<mdui-text-field></mdui-text-field>

<script>
  const textField = document.querySelector('mdui-text-field');
  textField.focus();
</script>
```

可以在各个组件的文档页面查看所有可用的方法及其参数。

## 事件 {#event}

部分组件在执行特定操作时会触发事件。例如，[`<mdui-dialog>`](/zh-cn/docs/2/components/dialog) 组件在打开时会触发 [`open`](/zh-cn/docs/2/components/dialog#events-open) 事件，你可以监听这个事件来执行自定义操作。

```html
<mdui-dialog>Dialog</mdui-dialog>

<script>
  const dialog = document.querySelector('mdui-dialog');

  dialog.addEventListener('open', () => {
    console.log('对话框开始打开时，会触发该事件');
  });
</script>
```

可以在各个组件的文档页面查看所有可用的事件及其参数。

如果你在其他框架（如 Vue、React、Angular 等）中使用 mdui，你可以使用框架提供的语法来绑定事件。但是，一些框架（如 React）的事件绑定语法只能用于绑定标准事件（如 `click` 事件），而无法用于绑定自定义事件（如 `open` 事件）。因此，在 React 中绑定自定义事件时，你需要先获取元素的引用，然后使用 `addEventListener` 方法来绑定事件。

关于在 React 中使用 mdui 的更多信息，参见 [与框架集成 - React](/zh-cn/docs/2/frameworks/react)。

## Slot {#slot}

许多组件都提供了 slot，用于将自定义的 HTML 内容插入到组件内部。

最常见的是默认 slot，它是位于组件内部的一段普通 HTML 或纯文本。例如 [`<mdui-button>`](/zh-cn/docs/2/components/button) 组件的默认 slot 用于设置按钮的文本。示例中的“点我”就是默认 slot 的内容：

```html
<mdui-button>点我</mdui-button>
```

部分组件还提供了具名 slot，具名 slot 需要在 HTML 的 `slot` 属性中指定 slot 名称。下面的示例中，[`<mdui-icon>`](/zh-cn/docs/2/components/icon) 组件指定了 `slot="start"`，表示这是名为 [`start`](/zh-cn/docs/2/components/button#slots-icon) 的具名 slot，即这个图标将被插入到组件内部的左侧：

```html
<mdui-button>
  <mdui-icon slot="start" name="settings"></mdui-icon>
  设置
</mdui-button>
```

如果一个组件使用了多个具名 slot，那么各个具名 slot 之间的顺序并不重要，只要它们位于组件内部，浏览器就会自动将它们放置到正确的位置。

可以在各个组件的文档页面查看所有支持的 Slot。

## CSS 自定义属性 {#css-custom-properties}

CSS 自定义属性是 CSS 中的变量。mdui 定义了一系列[全局 CSS 自定义属性](/zh-cn/docs/2/styles/design-tokens)，这些属性在各个组件内部被引用，因此你可以通过修改这些 CSS 自定义属性来全局修改 mdui 组件的样式。

例如，下面的代码会缩小所有组件的圆角大小：

```css
:root {
  --mdui-shape-corner-extra-small: 0.125rem;
  --mdui-shape-corner-small: 0.25rem;
  --mdui-shape-corner-medium: 0.375rem;
  --mdui-shape-corner-large: 0.5rem;
  --mdui-shape-corner-extra-large: 0.875rem;
}
```

也可以在局部作用域上修改 CSS 自定义属性。例如，下面的代码只会在含 `class="sharp"` 的元素及其子元素中缩小圆角大小：

```css
.sharp {
  --mdui-shape-corner-extra-small: 0.125rem;
  --mdui-shape-corner-small: 0.25rem;
  --mdui-shape-corner-medium: 0.375rem;
  --mdui-shape-corner-large: 0.5rem;
  --mdui-shape-corner-extra-large: 0.875rem;
}
```

一些组件还提供了该组件特有的 CSS 自定义属性，这些属性的作用域为特定组件，所以不包含 `--mdui` 前缀。例如，下面的代码通过修改 [`<mdui-dialog>`](/zh-cn/docs/2/components/dialog) 组件的 `--z-index` 属性，实现了修改 `z-index` 样式：

```css
mdui-dialog {
  --z-index: 3000;
}
```

可以在各个组件的文档页面查看组件支持的 CSS 自定义属性。

## CSS Part {#css-part}

mdui 组件使用 shadow DOM 来封装样式和行为，但是常规 CSS 选择器无法选择到 shadow DOM 内部的元素。因此，一些组件为 Shadow DOM 元素添加了 `part` 属性，你可以使用 `::part` CSS 选择器来选择到对应的元素，并重写部分样式。

例如，下面的代码使用 [`button`](/zh-cn/docs/2/components/button#cssParts-button) part 修改了按钮的内边距，且使用 [`label`](/zh-cn/docs/2/components/button#cssParts-label)、[`icon`](/zh-cn/docs/2/components/button#cssParts-icon)、[`end-icon`](/zh-cn/docs/2/components/button#cssParts-end-icon) part 分别修改了文本、左右图标的颜色：

```html
<mdui-button class="custom-button" icon="explore" end-icon="flight">Button</mdui-button>

<style>
  .custom-button::part(button) {
    padding: 0 2rem;
  }

  .custom-button::part(label) {
    color: blue;
  }

  .custom-button::part(icon) {
    color: red;
  }

  .custom-button::part(end-icon) {
    color: yellow;
  }
</style>
```

关于组件 shadow DOM 元素的结构和默认样式，你可以打开浏览器的开发人员工具进行查看。

在使用 CSS Part 之前，你应该先判断使用全局 CSS 自定义属性、及组件特有的 CSS 自定义属性能否满足你的需求，如果能满足需求，则应优先使用 CSS 自定义属性来定制样式。

可以在各个组件的文档页面查看组件公开的所有 `part` 属性。

## 组件更新机制 {#update-mechanism}

mdui 组件是基于 [Lit](https://lit.dev/) 开发的。Lit 是一个轻量级的库，它使 Web Components 的开发更加简单。在使用 mdui 组件时，你可能需要了解其渲染和更新机制。

当你修改 mdui 组件的属性时，组件会进行重新渲染。但是，这个重新渲染过程并不是同步进行的。当你同时修改了多个属性值时，Lit 会将这些变更缓存起来，直到下一个更新周期，以确保无论你修改了多少次属性值，每个组件只会重新渲染一次。并且，只有 shadow DOM 中发生变更的部分会被重新渲染。

在下面的示例中，我们将按钮的 `disabled` JavaScript 属性值设置为 `true`，然后立即查询其 HTML 属性。但是，由于此时组件还没有进行重新渲染，因此查询到的 HTML 属性仍然是 `false`：

```js
const button = document.querySelector('mdui-button');
button.disabled = true;

console.log(button.hasAttribute('disabled')); // false
```

如果要等待一个属性值变更后的重新渲染完成，可以使用组件的 `updateComplete` 属性。该属性返回一个 Promise，在 Promise 被 resolve 后，即表示组件已经完成了重新渲染：

```js
const button = document.querySelector('mdui-button');
button.disabled = true;

button.updateComplete.then(() => {
  console.log(button.hasAttribute('disabled')); // true
});
```

# TypeScript 支持

mdui 是用 TypeScript 开发的，因此对 TypeScript 提供了良好的支持。所有的 mdui 官方库都自带类型声明文件，可以直接使用。

## 组件的实例类型 {#instance}

有时，你可能需要将一个 JavaScript 变量断言为 mdui 的组件实例，这时你可以直接从 mdui 中导入对应的组件类型。

例如，从组件文件中导入 Tooltip 组件的类型：

```ts
import type { Tooltip } from 'mdui/components/tooltip.js';
```

或者直接从 mdui 导入 Tooltip 组件的类型：

```ts
import type { Tooltip } from 'mdui';
```

然后，你就可以将一个 JavaScript 变量断言成 Tooltip 类型：

```ts
const tooltip = document.querySelector('mdui-tooltip') as Tooltip;
```

此时，你的 IDE 会自动提示 `tooltip` 变量的属性和方法。

如果在 `tooltip` 变量上添加事件监听，也会自动提示事件名称，事件类型，以及回调函数中 `this` 的指向：

```ts
tooltip.addEventListener('open', function (event) {});
```

## 事件类型 {#event}

每个组件都会导出一个接口，它映射了组件的事件名和它对应的事件对象类型，接口名为 `${组件名}EventMap`。

例如，Tooltip 组件会导出一个名为 `TooltipEventMap` 的接口：

```ts
export interface TooltipEventMap {
  open: CustomEvent<void>;
  opened: CustomEvent<void>;
  close: CustomEvent<void>;
  closed: CustomEvent<void>;
}
```

你可以从组件文件中导入该接口：

```ts
import type { TooltipEventMap } from 'mdui/components/tooltip.js';
```

或者直接从 mdui 导入该接口：

```ts
import type { TooltipEventMap } from 'mdui';
```

请注意，该接口只包含组件特有的事件，但 mdui 组件都继承自 `HTMLElement`，所以也支持 `HTMLElement` 的事件，你可以使用交叉类型来获取组件的所有事件类型：

```ts
type TooltipAndHTMLElementEventMap = TooltipEventMap & HTMLElementEventMap;
```

# IDE 支持

mdui 专门为 VS Code 和 WebStorm 进行了优化，在这些 IDE 中可以获得代码自动完成、悬停提示等功能。

<style>
.ide-support-icon {
  user-select: none;
  font-size: 1rem;
}
</style>

## VS Code {#vscode}

### 通过 npm 安装的 mdui {#vscode-npm}

如果你通过 npm 安装了 mdui，可以按照以下步骤在当前项目中启用 VS Code 的 IDE 支持：

1. 在项目的根目录中创建 `.vscode` 目录。
2. 在 `.vscode` 目录中创建 `settings.json` 文件。
3. 将以下代码添加到 `settings.json` 文件中：
   ```json
   {
     "html.customData": ["./node_modules/mdui/html-data.zh-cn.json"],
     "css.customData": ["./node_modules/mdui/css-data.zh-cn.json"]
   }
   ```

如果 `settings.json` 文件已经存在，只需将上述两行代码添加到 JSON 文档的根节点即可。修改完成后，重启 VS Code。

### 通过 CDN 使用的 mdui {#vscode-cdn}

如果你是通过 CDN 引入的 mdui，可以通过安装 mdui 的 VS Code 扩展来获得 IDE 支持。

在 VS Code 的扩展商店中搜索 `mdui`，选择第一条搜索结果进行安装，或者[点击此处安装](vscode:extension/zdhxiong.mdui)。安装完成后，所有项目都将启用 mdui 的 IDE 支持。

建议优先通过 npm 安装并设置 `settings.json` 文件，而非安装 VS Code 扩展，以确保 IDE 支持与当前使用的 mdui 版本保持一致。

## WebStorm {#webstorm}

### 通过 npm 安装的 mdui {#webstorm-npm}

如果你通过 npm 安装了 mdui，可以按照以下步骤在当前项目中启用 WebStorm 的 IDE 支持：

1. 在项目根目录的 `package.json` 文件的根节点中添加以下代码：
   ```
   web-types: ["./node_modules/mdui/web-types.zh-cn.json"]
   ```

如果 `package.json` 文件的根节点已存在 `web-types` 属性，只需将 `./node_modules/mdui/web-types.zh-cn.json` 添加到 `web-types` 数组中即可。修改完成后，重启 WebStorm。

### 通过 CDN 使用的 mdui {#webstorm-cdn}

如果你是通过 CDN 引入的 mdui，可以通过安装 mdui 的 WebStorm 插件来获得 IDE 支持。

在 WebStorm 的插件市场中搜索 `mdui`，选择第一条搜索结果进行安装。安装完成后，所有项目都将启用 mdui 的 IDE 支持。

建议优先通过 npm 安装来获取 IDE 支持，而非安装 WebStorm 插件，以确保 IDE 支持与当前使用的 mdui 版本保持一致。

## 对 VS Code 和 WebStorm 支持的差异 {#difference}

mdui 对 VS Code 和 WebStorm 的支持存在一些差异。以下表格列出了详细的差异：

| 具有代码自动完成及悬浮提示的位置         | VS Code                                                                | WebStorm                                                                                                  |
| ---------------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| HTML 标签名                              | <mdui-icon name="check--rounded" class="ide-support-icon"></mdui-icon> | <mdui-icon name="check--rounded" class="ide-support-icon"></mdui-icon>                                    |
| HTML 标签中的属性名                      | <mdui-icon name="check--rounded" class="ide-support-icon"></mdui-icon> | <mdui-icon name="check--rounded" class="ide-support-icon"></mdui-icon>                                    |
| HTML 标签中属性值的枚举值                | <mdui-icon name="check--rounded" class="ide-support-icon"></mdui-icon> | <mdui-icon name="check--rounded" class="ide-support-icon"></mdui-icon>（不支持显示枚举值的注释）          |
| HTML 标签中的事件名                      |                                                                        | <mdui-icon name="check--rounded" class="ide-support-icon"></mdui-icon>                                    |
| HTML 中 slot 的 `name` 属性值            |                                                                        |                                                                                                           |
| CSS 中 `::part()` 选择器的 `part` 属性名 |                                                                        | <mdui-icon name="check--rounded" class="ide-support-icon"></mdui-icon>（需要 WebStorm 2023.2 及以上版本） |
| CSS 中组件内的 CSS 自定义属性名          |                                                                        | <mdui-icon name="check--rounded" class="ide-support-icon"></mdui-icon>                                    |
| CSS 中的全局 CSS 自定义属性名            | <mdui-icon name="check--rounded" class="ide-support-icon"></mdui-icon> | <mdui-icon name="check--rounded" class="ide-support-icon"></mdui-icon>                                    |
| CSS 中的全局 class 名                    |                                                                        | <mdui-icon name="check--rounded" class="ide-support-icon"></mdui-icon>                                    |

# 本地化

mdui 内部默认使用英文，如果需要使用其他语言，则需要进行多语言配置。

## 使用方法 {#usage}

mdui 提供了三个函数来实现多语言功能：

- [`loadLocale`](/zh-cn/docs/2/functions/loadLocale)：加载语言包。参数为一个函数，接收一个语言代码作为参数，返回 Promise，当语言包加载完成时，Promise 被 resolve 为对应的语言包。请确保在项目的入口文件中调用该函数。
- [`setLocale`](/zh-cn/docs/2/functions/setLocale)：切换到指定的语言。参数为新的语言代码，返回 Promise，在新的语言包加载完成后 resolve。
- [`getLocale`](/zh-cn/docs/2/functions/getLocale)：获取当前的语言代码。

使用示例如下：

```js
import { loadLocale } from 'mdui/functions/loadLocale.js';
import { setLocale } from 'mdui/functions/setLocale.js';
import { getLocale } from 'mdui/functions/getLocale.js';

// 在项目入口处调用 loadLocale 加载语言包
loadLocale((locale) => import(`../node_modules/mdui/locales/${locale}.js`));

// 在需要切换语言时调用该函数。在 Promise resolve 后，语言切换成功
setLocale('zh-cn').then(() => {
  // 调用 getLocale 可获取当前的语言代码
  console.log(getLocale()); // zh-cn
});
```

## 状态事件 {#event}

在语言切换的开始、结束、失败时，会在 `window` 上触发 `mdui-localize-status` 事件，你可以监听该事件来执行自定义操作，例如在语言切换成功后将语言代码写入 Cookie。

事件的 `detail.status` 属性描述了当前发生了何种状态的变更，可能的值包括：`loading`、`ready`、`error`：

<table>
  <thead>
    <tr>
      <th><code>detail.status</code></th>
      <th>描述</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>loading</code></td>
      <td>
        <p>开始加载新的语言包。</p>
        <p><code>detail</code> 对象包含：</p>
        <ul>
          <li><code>loadingLocale</code>：新加载语言的语言代码。</li>
        <ul>
      </td>
    </tr>
    <tr>
      <td><code>ready</code></td>
      <td>
        <p>新的语言包加载成功。</p>
        <p><code>detail</code> 对象包含：</p>
        <ul>
          <li><code>readyLocale</code>：新加载语言的语言代码。</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><code>error</code></td>
      <td>
        <p>新的语言包加载失败。</p>
        <p><code>detail</code> 对象包含：</p>
        <ul>
          <li><code>errorLocale</code>：加载失败的语言的语言代码。</li>
          <li><code>errorMessage</code>：加载失败的错误信息。</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

使用示例如下：

```js
window.addEventListener('mdui-localize-status', (event) => {
  if (event.detail.status === 'loading') {
    console.log(`开始加载新的语言包：${event.detail.loadingLocale}`);
  } else if (event.detail.status === 'ready') {
    console.log(`新语言包 ${event.detail.readyLocale} 加载成功`);
  } else if (event.detail.status === 'error') {
    console.error(
      `新语言包 ${event.detail.errorLocale} 加载失败：${event.detail.errorMessage}`,
    );
  }
});
```

## 语言包加载方式 {#load-locale}

### 懒加载 {#lazy-load}

使用[动态导入](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import)可以在切换到对应语言时，才下载对应的语言包。这是最为推荐的方法。

```js
import { loadLocale } from 'mdui/functions/loadLocale.js';

loadLocale((locale) => import(`../node_modules/mdui/locales/${locale}.js`));
```

### 预加载 {#pre-load}

在页面加载时，先下载好所有需要的语言包。这使得在切换语言时，无需再进行下载，从而使切换语言更加快速。

```js
import { loadLocale } from 'mdui/functions/loadLocale.js';

const localizedTemplates = new Map([
  ['zh-cn', import(`../node_modules/mdui/locales/zh-cn.js`)],
  ['zh-tw', import(`../node_modules/mdui/locales/zh-tw.js`)],
]);

loadLocale(async (locale) => localizedTemplates.get(locale));
```

### 静态导入 {#static-imports}

使用该方法可以把所有需要的语言包和你的项目代码打包到同一个文件里，不再需要单独下载语言包。

```js
import { loadLocale } from 'mdui/functions/loadLocale.js';
import * as locale_zh_cn from 'mdui/locales/zh-cn.js';
import * as locale_zh_tw from 'mdui/locales/zh-tw.js';

const localizedTemplates = new Map([
  ['zh-cn', locale_zh_cn],
  ['zh-tw', locale_zh_tw],
]);

loadLocale(async (locale) => localizedTemplates.get(locale));
```

## 通过 CDN 加载语言包 {#cdn}

如果你是通过 CDN 来使用 mdui 的，可以直接从 CDN 加载语言包。使用示例如下：

```html
<script src="https://unpkg.com/mdui@2/mdui.global.js"></script>

<script>
  mdui.loadLocale(
    (locale) => import(`https://unpkg.com/mdui@2/locales/${locale}.js`),
  );
  mdui.setLocale('zh-cn');
</script>
```

## 支持的语言 {#languages}

目前，mdui 支持以下语言：

| 语言                 | 语言代码 |
| -------------------- | -------- |
| 阿拉伯语             | ar-eg    |
| 阿塞拜疆语           | az-az    |
| 保加利亚语           | bg-bg    |
| 孟加拉语（孟加拉国） | bn-bd    |
| 白俄罗斯语           | be-by    |
| 加泰罗尼亚语         | ca-es    |
| 捷克语               | cs-cz    |
| 丹麦语               | da-dk    |
| 德语                 | de-de    |
| 希腊语               | el-gr    |
| 英语                 | en-gb    |
| 英语（美式）         | en-us    |
| 西班牙语             | es-es    |
| 爱沙尼亚语           | et-ee    |
| 波斯语               | fa-ir    |
| 芬兰语               | fi-fi    |
| 法语（比利时）       | fr-be    |
| 法语（加拿大）       | fr-ca    |
| 法语（法国）         | fr-fr    |
| 爱尔兰语             | ga-ie    |
| 加利西亚语（西班牙） | gl-es    |
| 希伯来语             | he-il    |
| 印地语               | hi-in    |
| 克罗地亚语           | hr-hr    |
| 匈牙利语             | hu-hu    |
| 亚美尼亚             | hy-am    |
| 印度尼西亚语         | id-id    |
| 意大利语             | it-it    |
| 冰岛语               | is-is    |
| 日语                 | ja-jp    |
| 格鲁吉亚语           | ka-ge    |
| 高棉语               | km-kh    |
| 北库尔德语           | kmr-iq   |
| 卡纳达语             | kn-in    |
| 哈萨克语             | kk-kz    |
| 韩语/朝鲜语          | ko-kr    |
| 立陶宛语             | lt-lt    |
| 拉脱维亚语           | lv-lv    |
| 马其顿语             | mk-mk    |
| 马拉雅拉姆语         | ml-in    |
| 蒙古语               | mn-mn    |
| 马来语（马来西亚）   | ms-my    |
| 挪威语               | nb-no    |
| 尼泊尔语             | ne-np    |
| 荷兰语（比利时）     | nl-be    |
| 荷兰语               | nl-nl    |
| 波兰语               | pl-pl    |
| 葡萄牙语（巴西）     | pt-br    |
| 葡萄牙语             | pt-pt    |
| 罗马尼亚语           | ro-ro    |
| 俄罗斯语             | ru-ru    |
| 斯洛伐克语           | sk-sk    |
| 塞尔维亚语           | sr-rs    |
| 斯洛文尼亚语         | sl-si    |
| 瑞典语               | sv-se    |
| 泰米尔语             | ta-in    |
| 泰语                 | th-th    |
| 土耳其语             | tr-tr    |
| 乌尔都语（巴基斯坦） | ur-pk    |
| 乌克兰语             | uk-ua    |
| 越南语               | vi-vn    |
| 简体中文             | zh-cn    |
| 繁体中文（中国香港） | zh-hk    |
| 繁体中文（中国台湾） | zh-tw    |

## 提交新的翻译 {#contribute}

要贡献新的翻译、或对现有翻译进行改进，请在 Github 上发起一个 Pull Request。语言包位于 [`packages/mdui/src/xliff`](https://github.com/zdhxiong/mdui/tree/v2/packages/mdui/src/xliff)，你可以直接在 Github 上进行编辑。

# 常见问题

以下整理了一些 mdui 社区常见的问题和官方答复，在提问之前建议找找有没有类似的问题。

## 使用自闭合标签为何无法显示组件？ {#no-self-closing}

mdui 是基于 Web Components 开发的组件库，Web Components 规范不支持自闭合标签，因此请确保为 mdui 组件添加结束标签。

```html
<!-- 错误用法 -->
<mdui-text-field />

<!-- 正确用法 -->
<mdui-text-field></mdui-text-field>
```

## 如何在组件加载完成前隐藏组件？ {#waiting-load}

由于 mdui 组件是通过 JavaScript 进行注册的，因此在 js 文件加载并注册组件之前，组件可能会暂时显示为无样式状态。以下两种方法可以解决这个问题：

一种方法是使用 CSS 的 [`:defined`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:defined) 伪类来隐藏未注册的 mdui 组件。以下 CSS 代码将隐藏所有未注册的 mdui 组件，并在组件注册完成后立即显示：

```css
:not(:defined) {
  visibility: hidden;
}
```

另一种方法是使用 JavaScript 的 [`customElements.whenDefined()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomElementRegistry/whenDefined) 方法。这个方法返回一个 promise，当指定的组件注册完成后，该 promise 将被 resolve。为了处理某些组件由于特殊原因无法加载的情况，你可以配合使用 [`Promise.allSettled()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) 方法。

以下示例首先通过 `opacity: 0` 将 `<body>` 隐藏，然后在组件注册完成后，使页面淡入显示。同时，示例使用了 `Promise.allSettled()` 来等待所有 promise 完成，确保即使某个组件无法加载，页面也能正常显示：

```html
<style>
  body {
    opacity: 0;
  }

  body.ready {
    opacity: 1;
    transition: 0.25s opacity;
  }
</style>

<script type="module">
  await Promise.allSettled([
    customElements.whenDefined('mdui-button'),
    customElements.whenDefined('mdui-card'),
    customElements.whenDefined('mdui-checkbox'),
  ]);

  // 现在 button, card, checkbox 组件已经注册完成，添加 ready class，使页面淡入显示
  document.body.classList.add('ready');
</script>
```

# LLMs.txt

mdui 提供了 `llms.txt` 与 `llms-full.txt`，用于为 LLM（大语言模型）提供准确、可引用的上下文，帮助 AI 更可靠地回答 mdui 相关问题。

## 使用 llms.txt 为 AI 提供上下文 {#context}

两个入口：

- `llms.txt`：https://www.mdui.org/zh-cn/docs/2/llms.txt
- `llms-full.txt`：https://www.mdui.org/zh-cn/docs/2/llms-full.txt

`llms.txt` 是精简索引，适合供可联网的模型按链接抓取所需 Markdown 页面，或先提供项目概览。

`llms-full.txt` 含完整上下文，包含 `llms.txt` 中的所有页面内容，适合模型无法联网或需一次性提供完整上下文。

## 文档的 Markdown 版本 {#md-mirror}

每个文档页面都提供了对应的 Markdown 版本：在页面 URL 末尾追加 `.md` 即可（首页追加 `index.md`）。

例如：

    https://www.mdui.org/zh-cn/docs/2/components/button → https://www.mdui.org/zh-cn/docs/2/components/button.md
    https://www.mdui.org/zh-cn/docs/2/ → https://www.mdui.org/zh-cn/docs/2/index.md

可直接把该 Markdown 链接或其纯文本作为上下文，获得更聚焦、准确的回答。

## 在 ChatGPT、Claude 等 LLM 中如何使用 {#how-to-use}

根据模型是否支持联网/文件上传，选择以下一种或组合使用：

1. 直接粘贴：将 `llms-full.txt` 的内容作为系统提示或首条消息。

   示例：“以下是 mdui 的上下文。请严格依据它回答后续问题；若有冲突，以该上下文为准：\n\n[粘贴 llms-full.txt 内容]”。

2. 上传文件：上传 `llms-full.txt`（或 `llms.txt`），并在首条提示说明“以附件为主要上下文”。

   示例：“基于附件中的 mdui 文档，给出 `<mdui-button>` 的用法与常见坑”。

3. 在线读取：在对话中给出 `llms.txt` 或 `llms-full.txt` 的链接。

   示例：“请读取并遵循 https://www.mdui.org/zh-cn/docs/2/llms-full.txt 作为上下文，回答我关于 mdui 的问题”。

4. 指向具体页面：只讨论特定组件/函数时，直接给出该页面的 Markdown 地址。

   示例：“请阅读 https://www.mdui.org/zh-cn/docs/2/components/button.md ，并基于该文档给出三段最佳实践”。

**提示**：可点击页面右上角的 <mdui-icon name="auto_awesome"></mdui-icon> 图标，支持一键复制上述链接、打开当前页面的 Markdown 版本，或将当前页面、或 `llms-full.txt` 作为上下文在 ChatGPT 中打开。

# MCP 服务

mdui 提供专用的 [MCP（Model Context Protocol）](https://modelcontextprotocol.io/) 服务器 `@mdui/mcp`，用于在本地为 AI 智能体提供组件、图标、CSS 变量和文档的查询能力。

它可与 Claude Code、Cursor、GitHub Copilot 等开发工具配合，辅助生成代码，并更好地使用 mdui 的组件与样式。

## 工具 {#tools}

mdui 的 MCP 服务器向 AI 智能体暴露以下工具：

- `list_components`：列出全部 mdui 组件。
- `get_component_metadata`：获取单个组件的详细 API 元数据。
- `list_css_classes`：列出全局 CSS 类名。
- `list_css_variables`：列出全局 CSS 变量。
- `list_documents`：列出所有文档。
- `get_document`：获取单个文档的完整内容。
- `list_icon_codes`：列出可用于属性或 API 的图标代码。
- `list_icon_components`：列出独立的图标组件及其 ESM 导入语句。

## 使用方式 {#usage}

MCP 服务仅支持 [stdio 传输](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports#stdio)，可在 VS Code、Cursor、Claude Code、Windsurf、Zed 等客户端，以及支持 stdio 协议的 AI 智能体中直接使用。

### VS Code {#vscode}

> 确保已安装 [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) 与 [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) 扩展。

1. 在项目根目录创建 `.vscode/mcp.json`，添加以下配置：

   ```json
   {
     "servers": {
       "mdui": {
         "command": "npx",
         "args": ["-y", "@mdui/mcp"]
       }
     }
   }
   ```

2. 点击 `mcp.json` 文件中的“启动”按钮。
3. 在 GitHub Copilot Chat 中开始对话。

### Cursor {#cursor}

1. 在项目根目录创建或编辑 `.cursor/mcp.json`，添加以下配置：

   ```json
   {
     "mcpServers": {
       "mdui": {
         "command": "npx",
         "args": ["-y", "@mdui/mcp"]
       }
     }
   }
   ```

2. 进入 Settings > Cursor Settings > MCP & Integrations，启用 mdui 服务器。
3. 在 Cursor Chat 中开始对话。

### Claude Code {#claude-code}

1. 在终端中运行以下命令添加 mdui MCP 服务：

   ```bash
   claude mcp add mdui -- npx -y @mdui/mcp
   ```

2. 随后运行 `claude` 启动会话。
3. 输入提示词开始使用。

### Windsurf {#windsurf}

1. 前往 Settings > Windsurf Settings > Cascade
2. 点击 Manage MCPs，再点击 “View raw config”，在配置文件中添加：

   ```json
   {
     "mcpServers": {
       "mdui": {
         "command": "npx",
         "args": ["-y", "@mdui/mcp"]
       }
     }
   }
   ```

   > 如 MCP 服务未自动出现，可点击 Refresh 刷新列表。

3. 输入提示词开始对话。

### Zed {#zed}

1. 打开 Settings > Open Settings，在 `settings.json` 文件中添加以下配置：

   ```json
   {
     "context_servers": {
       "mdui": {
         "source": "custom",
         "command": "npx",
         "args": ["-y", "@mdui/mcp"]
       }
     }
   }
   ```

2. 输入提示词开始使用。

### 自定义 MCP 客户端 {#custom}

在本地或开发环境中使用自定义 MCP 客户端时，将该服务器添加到客户端的配置文件即可。例如：

```json
{
  "mcpServers": {
    "mdui": {
      "command": "npx",
      "args": ["-y", "@mdui/mcp"]
    }
  }
}
```

# 暗色模式

mdui 的所有组件都支持暗色模式，并且支持根据操作系统的设置自动切换主题。

<style>
.dark-mode-light-visible,
.dark-mode-dark-visible {
  display: none;
}

.mdui-theme-light {
  .dark-mode-light-visible {
    display: inline-block;
  }
}
.mdui-theme-dark {
  .dark-mode-dark-visible {
    display: inline-block;
  }
}

@media (prefers-color-scheme: light) {
  .mdui-theme-auto .dark-mode-light-visible {
    display: inline-block;
  }
}
@media (prefers-color-scheme: dark) {
  .mdui-theme-auto .dark-mode-dark-visible {
    display: inline-block;
  }
}
</style>

你可以随时点击文档页面右上角的 <mdui-icon class="dark-mode-light-visible" name="light_mode--outlined" style="vertical-align: middle"></mdui-icon><mdui-icon class="dark-mode-dark-visible" name="dark_mode--outlined" style="vertical-align: middle"></mdui-icon> 图标来切换主题，以查看各个组件在不同主题下的显示效果。

如果要使用暗色模式，只需在 `<html>` 标签上添加 `mdui-theme-dark` 类即可：

```html
<html class="mdui-theme-dark"></html>
```

如果要让主题根据操作系统设置自动切换，只需在 `<html>` 标签上添加 `mdui-theme-auto` 类即可：

```html
<html class="mdui-theme-auto"></html>
```

也可以在页面的不同部分使用不同的主题。例如下面的示例，在 `<html>` 上设置暗色模式，但在页面中的一个 `<div>` 上添加了 `mdui-theme-light` 类，这样该 div 中的元素将显示为亮色模式，而页面其余部分则为暗色模式：

```html
<html class="mdui-theme-dark">
  <body>
    <div class="mdui-theme-light">
      <!-- 这里是亮色模式 -->
    </div>

    <!-- 这里是暗色模式 -->
  </body>
</html>
```

除了直接添加 CSS 类外，mdui 还提供了两个函数，可以更便捷的操作主题：

- [`getTheme`](/zh-cn/docs/2/functions/getTheme)：获取当前页面、或指定元素上的主题。
- [`setTheme`](/zh-cn/docs/2/functions/setTheme)：设置当前页面、或指定元素上的主题。

---

需要注意的是，mdui 在 `:root` 及 `.mdui-theme-light`、`.mdui-theme-dark`、`.mdui-theme-auto` 选择器上设置了 `color` 和 `background-color` 样式，如果你不喜欢这些默认样式，可以自行进行覆盖。

下面示例将亮色模式下的页面背景设为纯白，文字设为纯黑；且暗色模式下页面背景设为纯黑，文字设为纯白：

```css
:root,
.mdui-theme-light {
  color: #000;
  background-color: #fff;
}

.mdui-theme-dark {
  color: #fff;
  background-color: #000;
}

@media (prefers-color-scheme: dark) {
  .mdui-theme-auto {
    color: #fff;
    background-color: #000;
  }
}
```

# 动态配色

mdui 提供了动态配色功能。只需提供一个颜色值，mdui 就能自动生成一套完整的配色方案。此外，mdui 还支持从指定的壁纸中提取主色调，并据此生成配色方案。

你可以随时点击文档页面右上角的 <mdui-icon name="palette--outlined" style="vertical-align: middle"></mdui-icon> 图标，切换配色方案，查看各个组件在不同配色方案下的显示效果。

一套配色方案实际上是一组 CSS 自定义属性。mdui 组件中的颜色值都引用了这一组 CSS 自定义属性，因此可以一次性更新所有组件的配色方案。完整的 CSS 自定义属性列表请参见 [设计令牌 - 颜色](/zh-cn/docs/2/styles/design-tokens#color)。

## 生成配色方案 {#color-scheme}

你可以使用 [`setColorScheme`](/zh-cn/docs/2/functions/setColorScheme) 函数来生成配色方案。该函数接受一个十六进制颜色值作为参数，生成一套配色方案，并将页面的 `<html>` 元素设置为该配色方案。例如：

```js
import { setColorScheme } from 'mdui/functions/setColorScheme.js';

// 根据 #0061a4 生成一套配色方案，并将 <html> 设置为该配色方案
setColorScheme('#0061a4');
```

你还可以在第二个参数中指定 `target` 属性，用于指明在哪个元素上设置配色方案。例如：

```js
import { setColorScheme } from 'mdui/functions/setColorScheme.js';

// 根据 #0061a4 生成一套配色方案，并将 .foo 元素设置为该配色方案
setColorScheme('#0061a4', {
  target: document.querySelector('.foo'),
});
```

默认情况下生成的配色方案仅包含 [设计令牌 - 颜色](/zh-cn/docs/2/styles/design-tokens#color) 中所列出的颜色。你可以在第二个参数中指定 `customColors` 属性，mdui 会根据你给出的自定义颜色名和颜色值生成一组自定义颜色组。例如：

```js
import { setColorScheme } from 'mdui/functions/setColorScheme.js';

// 根据 #0061a4 生成一套配色方案，并修改了原有的 error 颜色组的值，并添加了一组新的 music 颜色组
setColorScheme('#0061a4', {
  customColors: [
    {
      name: 'error',
      value: '#69F0AE',
    },
    {
      name: 'music',
      value: '#FFC107',
    },
  ],
});
```

一组自定义颜色组包含四个 CSS 自定义属性：

- `--mdui-color-{name}`
- `--mdui-color-on-{name}`
- `--mdui-color-{name}-container`
- `--mdui-color-on-{name}-container`

其中的 `{name}` 为你传入的 `customColors` 中的 `name` 字段名，即自定义颜色名。

自定义颜色名可以是默认配色方案中的已有颜色名，如 `primary`、`secondary`、`tertiary`、`error` 这些都是默认配色方案中已包含的。如果你指定了这些值作为自定义颜色名，则生成的配色方案中对应的四个 CSS 自定义属性，将用你指定的颜色值来生成。例如上面示例中指定了名为 `error` 的自定义颜色名，因为 `error` 是默认配色方案中已有的颜色名，且其对应的 CSS 自定义属性被 mdui 组件用于表示错误状态，因为现在颜色值被设置为一个绿色的值，所以 mdui 组件中的错误状态也将变为绿色。

自定义颜色名也可以是新增的，例如上面示例中的 `music`，是默认配色方案中不存在的，则生成的配色方案将额外包含四个 CSS 自定义属性。可以在你自己的样式中引用这些 CSS 自定义属性：

```html
<style>
  .music {
    background-color: rgb(var(--mdui-color-music));
    color: rgb(var(--mdui-color-on-music));
  }

  .music-container {
    background-color: rgb(var(--mdui-color-music-container));
    color: rgb(var(--mdui-color-on-music-container));
  }
</style>

<div class="music">Music</div>
<div class="music-container">Music Container</div>
```

你还可以使用 [`removeColorScheme`](/zh-cn/docs/2/functions/removeColorScheme) 函数来移除通过上述方法生成的配色方案。你可以传入参数来指定移除哪个元素上的配色方案，默认情况下，它会移除 `<html>` 上的配色方案。

## 从壁纸中提取颜色 {#from-wallpaper}

mdui 提供了 [`getColorFromImage`](/zh-cn/docs/2/functions/getColorFromImage) 函数，用于从一个给定的 `Image` 实例中提取主色调。该函数返回一个 Promise，resolve 的值即为提取的十六进制颜色值。

你可以使用从该函数获得的颜色值，然后调用上述文档中介绍的 [`setColorScheme`](/zh-cn/docs/2/functions/setColorScheme) 函数来设置配色方案。例如：

```js
import { getColorFromImage } from 'mdui/functions/getColorFromImage.js';
import { setColorScheme } from 'mdui/functions/setColorScheme.js';

const image = new Image();
image.src = 'image1.png';

getColorFromImage(image).then((color) => setColorScheme(color));
```

# 文章排版

mdui 提供了 `mdui-prose` 和 `mdui-table` CSS 类，专门用于优化文章和表格的样式。

## 文章排版 {#prose}

可以在文章的父元素上添加 `mdui-prose` 类，这样可以优化整篇文章的显示样式，包括文章中的 `<table>` 表格样式。例如：

```html
<div class="mdui-prose">
  <h1>标题</h1>
  <p>正文</p>
  <table></table>
</div>
```

## 表格样式 {#table}

在 `<table>` 元素上添加 `mdui-table` 类，可以优化表格的显示样式。例如：

```html
<table class="mdui-table"></table>
```

如果你希望表格能在其父元素内横向滚动，可以在 `<table>` 元素的父元素上添加 `mdui-table` 类。例如：

```html
<div class="mdui-table">
  <table></table>
</div>
```

# 设计令牌

设计令牌（Design Tokens）是一种用于管理设计系统的策略。

它将设计系统中的所有可复用元素（例如颜色、字体、间距等）抽象为独立的变量，以便在整个设计系统中进行统一的管理和应用。

<style>
.design-tokens-color {
  display: inline-block;
  vertical-align: middle;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: var(--mdui-shape-corner-extra-small);
}

.design-tokens-shape-corner {
  display: inline-block;
  vertical-align: middle;
  width: 5rem;
  height: 5rem;
  background-color: rgb(var(--mdui-color-primary));
}

.design-tokens-typescale-display-large {
  line-height: var(--mdui-typescale-display-large-line-height);
  font-size: var(--mdui-typescale-display-large-size);
  letter-spacing: var(--mdui-typescale-display-large-tracking);
  font-weight: var(--mdui-typescale-display-large-weight);
}

.design-tokens-typescale-display-medium {
  line-height: var(--mdui-typescale-display-medium-line-height);
  font-size: var(--mdui-typescale-display-medium-size);
  letter-spacing: var(--mdui-typescale-display-medium-tracking);
  font-weight: var(--mdui-typescale-display-medium-weight);
}

.design-tokens-typescale-display-small {
  line-height: var(--mdui-typescale-display-small-line-height);
  font-size: var(--mdui-typescale-display-small-size);
  letter-spacing: var(--mdui-typescale-display-small-tracking);
  font-weight: var(--mdui-typescale-display-small-weight);
}

.design-tokens-typescale-headline-large {
  line-height: var(--mdui-typescale-headline-large-line-height);
  font-size: var(--mdui-typescale-headline-large-size);
  letter-spacing: var(--mdui-typescale-headline-large-tracking);
  font-weight: var(--mdui-typescale-headline-large-weight);
}

.design-tokens-typescale-headline-medium {
  line-height: var(--mdui-typescale-headline-medium-line-height);
  font-size: var(--mdui-typescale-headline-medium-size);
  letter-spacing: var(--mdui-typescale-headline-medium-tracking);
  font-weight: var(--mdui-typescale-headline-medium-weight);
}

.design-tokens-typescale-headline-small {
  line-height: var(--mdui-typescale-headline-small-line-height);
  font-size: var(--mdui-typescale-headline-small-size);
  letter-spacing: var(--mdui-typescale-headline-small-tracking);
  font-weight: var(--mdui-typescale-headline-small-weight);
}

.design-tokens-typescale-title-large {
  line-height: var(--mdui-typescale-title-large-line-height);
  font-size: var(--mdui-typescale-title-large-size);
  letter-spacing: var(--mdui-typescale-title-large-tracking);
  font-weight: var(--mdui-typescale-title-large-weight);
}

.design-tokens-typescale-title-medium {
  line-height: var(--mdui-typescale-title-medium-line-height);
  font-size: var(--mdui-typescale-title-medium-size);
  letter-spacing: var(--mdui-typescale-title-medium-tracking);
  font-weight: var(--mdui-typescale-title-medium-weight);
}

.design-tokens-typescale-title-small {
  line-height: var(--mdui-typescale-title-small-line-height);
  font-size: var(--mdui-typescale-title-small-size);
  letter-spacing: var(--mdui-typescale-title-small-tracking);
  font-weight: var(--mdui-typescale-title-small-weight);
}

.design-tokens-typescale-label-large {
  line-height: var(--mdui-typescale-label-large-line-height);
  font-size: var(--mdui-typescale-label-large-size);
  letter-spacing: var(--mdui-typescale-label-large-tracking);
  font-weight: var(--mdui-typescale-label-large-weight);
}

.design-tokens-typescale-label-medium {
  line-height: var(--mdui-typescale-label-medium-line-height);
  font-size: var(--mdui-typescale-label-medium-size);
  letter-spacing: var(--mdui-typescale-label-medium-tracking);
  font-weight: var(--mdui-typescale-label-medium-weight);
}

.design-tokens-typescale-label-small {
  line-height: var(--mdui-typescale-label-small-line-height);
  font-size: var(--mdui-typescale-label-small-size);
  letter-spacing: var(--mdui-typescale-label-small-tracking);
  font-weight: var(--mdui-typescale-label-small-weight);
}

.design-tokens-typescale-body-large {
  line-height: var(--mdui-typescale-body-large-line-height);
  font-size: var(--mdui-typescale-body-large-size);
  letter-spacing: var(--mdui-typescale-body-large-tracking);
  font-weight: var(--mdui-typescale-body-large-weight);
}

.design-tokens-typescale-body-medium {
  line-height: var(--mdui-typescale-body-medium-line-height);
  font-size: var(--mdui-typescale-body-medium-size);
  letter-spacing: var(--mdui-typescale-body-medium-tracking);
  font-weight: var(--mdui-typescale-body-medium-weight);
}

.design-tokens-typescale-body-small {
  line-height: var(--mdui-typescale-body-small-line-height);
  font-size: var(--mdui-typescale-body-small-size);
  letter-spacing: var(--mdui-typescale-body-small-tracking);
  font-weight: var(--mdui-typescale-body-small-weight);
}

.design-tokens-state-layer {
  display: inline-block;
  vertical-align: middle;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: var(--mdui-shape-corner-extra-small);
}

.design-tokens-elevation {
  display: inline-block;
  vertical-align: middle;
  width: 3rem;
  height: 3rem;
  border-radius: var(--mdui-shape-corner-extra-small);
}
</style>

mdui 使用全局 CSS 自定义属性来实现设计令牌。这意味着，你只需修改 CSS 自定义属性，就能全局修改所有 mdui 组件的样式。同时，对于你自己开发的样式，也推荐优先引用 CSS 自定义属性，以确保你的样式与 mdui 组件的样式保持统一，此外，在修改动态配色时，你自己的样式也能同步更新配色。

## 颜色 {#color}

mdui 为亮色模式和暗色模式分别提供了一组 CSS 自定义属性。在亮色模式下，CSS 自定义属性名为 `--mdui-color-{name}-light`，其中 `{name}` 为颜色名称；在暗色模式下则为 `--mdui-color-{name}-dark`。

此外，mdui 还提供了一组名为 `--mdui-color-{name}` 的 CSS 自定义属性，该属性在亮色模式下会引用 `--mdui-color-{name}-light`，在暗色模式下会引用 `--mdui-color-{name}-dark`，因此能根据当前亮、暗色模式自动切换颜色。

如果你需要修改部分颜色的 CSS 自定义属性，需要同时修改 `--mdui-color-{name}-light` 和 `--mdui-color-{name}-dark` 两个属性。而在读取 CSS 自定义属性时，直接使用 `--mdui-color-{name}` 属性即可。

CSS 自定义属性的属性值为 RGB 的三个颜色使用 `,` 分隔，下面的示例演示了颜色的 CSS 自定义属性的用法：

```css
/* 修改 primary 的颜色值 */
:root {
  --mdui-color-primary-light: 103, 80, 164;
  --mdui-color-primary-dark: 208, 188, 255;
}

/* 把 foo 元素的背景色设置为 primary */
.foo {
  background-color: rgb(var(--mdui-color-primary));
}

/* 把 bar 元素的背景色设置为含 0.8 不透明度的 primary */
.bar {
  background-color: rgba(var(--mdui-color-primary), 0.8);
}
```

如果你需要创建一套全新的配色，推荐使用 [`setColorScheme`](/zh-cn/docs/2/functions/setColorScheme) 函数，该函数能根据你给定的一个颜色值生成一整套配色方案。

<table>
  <thead>
    <tr>
      <th>颜色名</th>
      <th>CSS 自定义属性</th>
      <th>默认值</th>
      <th>示例</th>
    <tr>
  <thead>
  <tbody>
    <tr>
      <th rowspan="3">Primary</th>
      <td><code>--mdui-color-primary-light</code></td>
      <td><code>103, 80, 164</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-primary-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-primary-dark</code></td>
      <td><code>208, 188, 255</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-primary-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-primary</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-primary))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">Primary container</th>
      <td><code>--mdui-color-primary-container-light</code></td>
      <td><code>234, 221, 255</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-primary-container-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-primary-container-dark</code></td>
      <td><code>79, 55, 139</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-primary-container-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-primary-container</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-primary-container))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">On primary</th>
      <td><code>--mdui-color-on-primary-light</code></td>
      <td><code>255, 255, 255</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-primary-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-on-primary-dark</code></td>
      <td><code>55, 30, 115</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-primary-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-on-primary</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-primary))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">On primary container</th>
      <td><code>--mdui-color-on-primary-container-light</code></td>
      <td><code>33, 0, 94</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-primary-container-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-on-primary-container-dark</code></td>
      <td><code>234, 221, 255</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-primary-container-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-on-primary-container</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-primary-container))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">Inverse primary</th>
      <td><code>--mdui-color-inverse-primary-light</code></td>
      <td><code>208, 188, 255</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-inverse-primary-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-inverse-primary-dark</code></td>
      <td><code>103, 80, 164</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-inverse-primary-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-inverse-primary</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-inverse-primary))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">Secondary</th>
      <td><code>--mdui-color-secondary-light</code></td>
      <td><code>98, 91, 113</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-secondary-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-secondary-dark</code></td>
      <td><code>204, 194, 220</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-secondary-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-secondary</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-secondary))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">Secondary container</th>
      <td><code>--mdui-color-secondary-container-light</code></td>
      <td><code>232, 222, 248</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-secondary-container-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-secondary-container-dark</code></td>
      <td><code>74, 68, 88</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-secondary-container-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-secondary-container</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-secondary-container))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">On secondary</th>
      <td><code>--mdui-color-on-secondary-light</code></td>
      <td><code>255, 255, 255</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-secondary-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-on-secondary-dark</code></td>
      <td><code>51, 45, 65</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-secondary-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-on-secondary</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-secondary))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">On secondary container</th>
      <td><code>--mdui-color-on-secondary-container-light</code></td>
      <td><code>30, 25, 43</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-secondary-container-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-on-secondary-container-dark</code></td>
      <td><code>232, 222, 248</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-secondary-container-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-on-secondary-container</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-secondary-container))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">Tertiary</th>
      <td><code>--mdui-color-tertiary-light</code></td>
      <td><code>125, 82, 96</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-tertiary-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-tertiary-dark</code></td>
      <td><code>239, 184, 200</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-tertiary-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-tertiary</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-tertiary))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">Tertiary container</th>
      <td><code>--mdui-color-tertiary-container-light</code></td>
      <td><code>255, 216, 228</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-tertiary-container-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-tertiary-container-dark</code></td>
      <td><code>99, 59, 72</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-tertiary-container-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-tertiary-container</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-tertiary-container))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">On tertiary</th>
      <td><code>--mdui-color-on-tertiary-light</code></td>
      <td><code>255, 255, 255</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-tertiary-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-on-tertiary-dark</code></td>
      <td><code>73, 37, 50</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-tertiary-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-on-tertiary</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-tertiary))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">On tertiary container</th>
      <td><code>--mdui-color-on-tertiary-container-light</code></td>
      <td><code>55, 11, 30</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-tertiary-container-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-on-tertiary-container-dark</code></td>
      <td><code>255, 216, 228</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-tertiary-container-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-on-tertiary-container</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-tertiary-container))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">Surface</th>
      <td><code>--mdui-color-surface-light</code></td>
      <td><code>254, 247, 255</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-surface-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-surface-dark</code></td>
      <td><code>20, 18, 24</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-surface-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-surface</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-surface))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">Surface dim</th>
      <td><code>--mdui-color-surface-dim-light</code></td>
      <td><code>222, 216, 225</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-surface-dim-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-surface-dim-dark</code></td>
      <td><code>20, 18, 24</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-surface-dim-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-surface-dim</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-surface-dim))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">Surface bright</th>
      <td><code>--mdui-color-surface-bright-light</code></td>
      <td><code>254, 247, 255</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-surface-bright-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-surface-bright-dark</code></td>
      <td><code>59, 56, 62</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-surface-bright-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-surface-bright</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-surface-bright))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">Surface container lowest</th>
      <td><code>--mdui-color-surface-container-lowest-light</code></td>
      <td><code>255, 255, 255</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-surface-container-lowest-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-surface-container-lowest-dark</code></td>
      <td><code>15, 13, 19</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-surface-container-lowest-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-surface-container-lowest</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-surface-container-lowest))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">Surface container low</th>
      <td><code>--mdui-color-surface-container-low-light</code></td>
      <td><code>247, 242, 250</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-surface-container-low-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-surface-container-low-dark</code></td>
      <td><code>29, 27, 32</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-surface-container-low-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-surface-container-low</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-surface-container-low))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">Surface container</th>
      <td><code>--mdui-color-surface-container-light</code></td>
      <td><code>243, 237, 247</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-surface-container-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-surface-container-dark</code></td>
      <td><code>33, 31, 38</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-surface-container-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-surface-container</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-surface-container))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">Surface container high</th>
      <td><code>--mdui-color-surface-container-high-light</code></td>
      <td><code>236, 230, 240</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-surface-container-high-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-surface-container-high-dark</code></td>
      <td><code>43, 41, 48</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-surface-container-high-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-surface-container-high</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-surface-container-high))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">Surface container highest</th>
      <td><code>--mdui-color-surface-container-highest-light</code></td>
      <td><code>230, 224, 233</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-surface-container-highest-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-surface-container-highest-dark</code></td>
      <td><code>54, 52, 59</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-surface-container-highest-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-surface-container-highest</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-surface-container-highest))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">Surface variant</th>
      <td><code>--mdui-color-surface-variant-light</code></td>
      <td><code>231, 224, 236</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-surface-variant-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-surface-variant-dark</code></td>
      <td><code>73, 69, 79</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-surface-variant-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-surface-variant</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-surface-variant))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">On surface</th>
      <td><code>--mdui-color-on-surface-light</code></td>
      <td><code>28, 27, 31</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-surface-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-on-surface-dark</code></td>
      <td><code>230, 225, 229</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-surface-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-on-surface</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-surface))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">On surface variant</th>
      <td><code>--mdui-color-on-surface-variant-light</code></td>
      <td><code>73, 69, 78</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-surface-variant-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-on-surface-variant-dark</code></td>
      <td><code>202, 196, 208</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-surface-variant-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-on-surface-variant</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-surface-variant))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">Inverse surface</th>
      <td><code>--mdui-color-inverse-surface-light</code></td>
      <td><code>49, 48, 51</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-inverse-surface-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-inverse-surface-dark</code></td>
      <td><code>230, 225, 229</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-inverse-surface-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-inverse-surface</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-inverse-surface))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">Inverse on surface</th>
      <td><code>--mdui-color-inverse-on-surface-light</code></td>
      <td><code>244, 239, 244</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-inverse-on-surface-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-inverse-on-surface-dark</code></td>
      <td><code>49, 48, 51</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-inverse-on-surface-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-inverse-on-surface</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-inverse-on-surface))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">Background</th>
      <td><code>--mdui-color-background-light</code></td>
      <td><code>254, 247, 255</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-background-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-background-dark</code></td>
      <td><code>20, 18, 24</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-background-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-background</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-background))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">On background</th>
      <td><code>--mdui-color-on-background-light</code></td>
      <td><code>28, 27, 31</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-background-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-on-background-dark</code></td>
      <td><code>230, 225, 229</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-background-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-on-background</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-background))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">Error</th>
      <td><code>--mdui-color-error-light</code></td>
      <td><code>179, 38, 30</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-error-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-error-dark</code></td>
      <td><code>242, 184, 181</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-error-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-error</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-error))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">Error container</th>
      <td><code>--mdui-color-error-container-light</code></td>
      <td><code>249, 222, 220</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-error-container-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-error-container-dark</code></td>
      <td><code>140, 29, 24</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-error-container-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-error-container</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-error-container))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">On error</th>
      <td><code>--mdui-color-on-error-light</code></td>
      <td><code>255, 255, 255</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-error-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-on-error-dark</code></td>
      <td><code>96, 20, 16</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-error-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-on-error</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-error))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">On error container</th>
      <td><code>--mdui-color-on-error-container-light</code></td>
      <td><code>65, 14, 11</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-error-container-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-on-error-container-dark</code></td>
      <td><code>249, 222, 220</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-error-container-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-on-error-container</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-on-error-container))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">Outline</th>
      <td><code>--mdui-color-outline-light</code></td>
      <td><code>121, 116, 126</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-outline-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-outline-dark</code></td>
      <td><code>147, 143, 153</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-outline-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-outline</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-outline))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">Outline variant</th>
      <td><code>--mdui-color-outline-variant-light</code></td>
      <td><code>196, 199, 197</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-outline-variant-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-outline-variant-dark</code></td>
      <td><code>68, 71, 70</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-outline-variant-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-outline-variant</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-outline-variant))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">Shadow</th>
      <td><code>--mdui-color-shadow-light</code></td>
      <td><code>0, 0, 0</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-shadow-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-shadow-dark</code></td>
      <td><code>0, 0, 0</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-shadow-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-shadow</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-shadow))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">Surface tint</th>
      <td><code>--mdui-color-surface-tint-color-light</code></td>
      <td><code>103, 80, 164</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-surface-tint-color-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-surface-tint-color-dark</code></td>
      <td><code>208, 188, 255</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-surface-tint-color-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-surface-tint-color</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-surface-tint-color))"></div></td>
    </tr>
    <tr>
      <th rowspan="3">Scrim</th>
      <td><code>--mdui-color-scrim-light</code></td>
      <td><code>0, 0, 0</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-scrim-light))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-scrim-dark</code></td>
      <td><code>0, 0, 0</code></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-scrim-dark))"></div></td>
    </tr>
    <tr>
      <td><code>--mdui-color-scrim</code></td>
      <td></td>
      <td><div class="design-tokens-color" style="background-color:rgb(var(--mdui-color-scrim))"></div></td>
    </tr>
  </tbody>
</table>

## 圆角 {#shape-corner}

mdui 提供了 7 种不同大小的圆角。以下是如何使用这些圆角的 CSS 自定义属性的示例：

```css
/* 修改 extra-small 的圆角大小 */
:root {
  --mdui-shape-corner-extra-small: 0.3rem;
}

/* 把 foo 元素的圆角设置为 extra-small */
.foo {
  border-radius: var(--mdui-shape-corner-extra-small);
}
```

| CSS 自定义属性                    | 默认值    | 示例                                                                                                      |
| --------------------------------- | --------- | --------------------------------------------------------------------------------------------------------- |
| `--mdui-shape-corner-none`        | `0`       | <div class="design-tokens-shape-corner" style="border-radius:var(--mdui-shape-corner-none)"></div>        |
| `--mdui-shape-corner-extra-small` | `0.25rem` | <div class="design-tokens-shape-corner" style="border-radius:var(--mdui-shape-corner-extra-small)"></div> |
| `--mdui-shape-corner-small`       | `0.5rem`  | <div class="design-tokens-shape-corner" style="border-radius:var(--mdui-shape-corner-small)"></div>       |
| `--mdui-shape-corner-medium`      | `0.75rem` | <div class="design-tokens-shape-corner" style="border-radius:var(--mdui-shape-corner-medium)"></div>      |
| `--mdui-shape-corner-large`       | `1rem`    | <div class="design-tokens-shape-corner" style="border-radius:var(--mdui-shape-corner-large)"></div>       |
| `--mdui-shape-corner-extra-large` | `1.75rem` | <div class="design-tokens-shape-corner" style="border-radius:var(--mdui-shape-corner-extra-large)"></div> |
| `--mdui-shape-corner-full`        | `1000rem` | <div class="design-tokens-shape-corner" style="border-radius:var(--mdui-shape-corner-full)"></div>        |

## 排版 {#typescale}

mdui 提供了 15 种不同的文字样式，包括 Display large、Display medium、Display small、Headline large、Headline medium、Headline small、Title large、Title medium、Title small、Label large、Label medium、Label small、Body large、Body medium、Body small。

下面是使用示例：

```css
/* 修改 Body large 的文字样式 */
:root {
  --mdui-typescale-body-large-line-height: 1.6rem;
  --mdui-typescale-body-large-size: 1.2rem;
  --mdui-typescale-body-large-tracking: 0.01rem;
  --mdui-typescale-body-large-weight: 400;
}

/* 把 foo 元素的文字样式设置为 Body large */
.foo {
  line-height: var(--mdui-typescale-body-large-line-height);
  font-size: var(--mdui-typescale-body-large-size);
  letter-spacing: var(--mdui-typescale-body-large-tracking);
  font-weight: var(--mdui-typescale-body-large-weight);
}
```

<table>
  <thead>
    <tr>
      <th>CSS 自定义属性</th>
      <th>默认值</th>
      <th>示例</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>--mdui-typescale-display-large-line-height</code></td>
      <td><code>4rem</code></td>
      <th rowspan="4"><div class="design-tokens-typescale-display-large">Display large</div></th>
    </tr>
    <tr>
      <td><code>--mdui-typescale-display-large-size</code></td>
      <td><code>3.5625rem</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-display-large-tracking</code></td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-display-large-weight</code></td>
      <td><code>400</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-display-medium-line-height</code></td>
      <td><code>3.25rem</code></td>
      <th rowspan="4"><div class="design-tokens-typescale-display-medium">Display medium</div></th>
    </tr>
    <tr>
      <td><code>--mdui-typescale-display-medium-size</code></td>
      <td><code>2.8125rem</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-display-medium-tracking</code></td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-display-medium-weight</code></td>
      <td><code>400</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-display-small-line-height</code></td>
      <td><code>2.75rem</code></td>
      <th rowspan="4"><div class="design-tokens-typescale-display-small">Display small</div></th>
    </tr>
    <tr>
      <td><code>--mdui-typescale-display-small-size</code></td>
      <td><code>2.25rem</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-display-small-tracking</code></td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-display-small-weight</code></td>
      <td><code>400</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-headline-large-line-height</code></td>
      <td><code>2.5rem</code></td>
      <th rowspan="4"><div class="design-tokens-typescale-headline-large">Headline large</div></th>
    </tr>
    <tr>
      <td><code>--mdui-typescale-headline-large-size</code></td>
      <td><code>2rem</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-headline-large-tracking</code></td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-headline-large-weight</code></td>
      <td><code>400</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-headline-medium-line-height</code></td>
      <td><code>2.25rem</code></td>
      <th rowspan="4"><div class="design-tokens-typescale-headline-medium">Headline medium</div></th>
    </tr>
    <tr>
      <td><code>--mdui-typescale-headline-medium-size</code></td>
      <td><code>1.75rem</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-headline-medium-tracking</code></td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-headline-medium-weight</code></td>
      <td><code>400</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-headline-small-line-height</code></td>
      <td><code>2rem</code></td>
      <th rowspan="4"><div class="design-tokens-typescale-headline-small">Headline small</div></th>
    </tr>
    <tr>
      <td><code>--mdui-typescale-headline-small-size</code></td>
      <td><code>1.5rem</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-headline-small-tracking</code></td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-headline-small-weight</code></td>
      <td><code>400</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-title-large-line-height</code></td>
      <td><code>1.75rem</code></td>
      <th rowspan="4"><div class="design-tokens-typescale-title-large">Title large</div></th>
    </tr>
    <tr>
      <td><code>--mdui-typescale-title-large-size</code></td>
      <td><code>1.375rem</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-title-large-tracking</code></td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-title-large-weight</code></td>
      <td><code>400</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-title-medium-line-height</code></td>
      <td><code>1.5rem</code></td>
      <th rowspan="4"><div class="design-tokens-typescale-title-medium">Title medium</div></th>
    </tr>
    <tr>
      <td><code>--mdui-typescale-title-medium-size</code></td>
      <td><code>1rem</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-title-medium-tracking</code></td>
      <td><code>0.009375rem</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-title-medium-weight</code></td>
      <td><code>500</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-title-small-line-height</code></td>
      <td><code>1.25rem</code></td>
      <th rowspan="4"><div class="design-tokens-typescale-title-small">Title small</div></th>
    </tr>
    <tr>
      <td><code>--mdui-typescale-title-small-size</code></td>
      <td><code>0.875rem</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-title-small-tracking</code></td>
      <td><code>0.00625rem</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-title-small-weight</code></td>
      <td><code>500</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-label-large-line-height</code></td>
      <td><code>1.25rem</code></td>
      <th rowspan="4"><div class="design-tokens-typescale-label-large">Label large</div></th>
    </tr>
    <tr>
      <td><code>--mdui-typescale-label-large-size</code></td>
      <td><code>0.875rem</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-label-large-tracking</code></td>
      <td><code>0.00625rem</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-label-large-weight</code></td>
      <td><code>500</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-label-medium-line-height</code></td>
      <td><code>1rem</code></td>
      <th rowspan="4"><div class="design-tokens-typescale-label-medium">Label medium</div></th>
    </tr>
    <tr>
      <td><code>--mdui-typescale-label-medium-size</code></td>
      <td><code>0.75rem</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-label-medium-tracking</code></td>
      <td><code>0.03125rem</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-label-medium-weight</code></td>
      <td><code>500</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-label-small-line-height</code></td>
      <td><code>0.375rem</code></td>
      <th rowspan="4"><div class="design-tokens-typescale-label-small">Label small</div></th>
    </tr>
    <tr>
      <td><code>--mdui-typescale-label-small-size</code></td>
      <td><code>0.6875rem</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-label-small-tracking</code></td>
      <td><code>0.03125rem</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-label-small-weight</code></td>
      <td><code>500</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-body-large-line-height</code></td>
      <td><code>1.5rem</code></td>
      <th rowspan="4"><div class="design-tokens-typescale-body-large">Body large</div></th>
    </tr>
    <tr>
      <td><code>--mdui-typescale-body-large-size</code></td>
      <td><code>1rem</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-body-large-tracking</code></td>
      <td><code>0.009375rem</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-body-large-weight</code></td>
      <td><code>400</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-body-medium-line-height</code></td>
      <td><code>1.25rem</code></td>
      <th rowspan="4"><div class="design-tokens-typescale-body-medium">Body medium</div></th>
    </tr>
    <tr>
      <td><code>--mdui-typescale-body-medium-size</code></td>
      <td><code>0.875rem</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-body-medium-tracking</code></td>
      <td><code>0.015625rem</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-body-medium-weight</code></td>
      <td><code>400</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-body-small-line-height</code></td>
      <td><code>1rem</code></td>
      <th rowspan="4"><div class="design-tokens-typescale-body-small">Body small</div></th>
    </tr>
    <tr>
      <td><code>--mdui-typescale-body-small-size</code></td>
      <td><code>0.75rem</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-body-small-tracking</code></td>
      <td><code>0.025rem</code></td>
    </tr>
    <tr>
      <td><code>--mdui-typescale-body-small-weight</code></td>
      <td><code>400</code></td>
    </tr>
  </tbody>
</table>

## 状态层不透明度 {#state-layer}

部分 mdui 组件在交互时会在其上添加一层半透明遮罩。例如 [`<mdui-button>`](/zh-cn/docs/2/components/button) 组件，在鼠标悬浮、聚焦、按下或拖动时，都会出现半透明遮罩。你可以通过修改 CSS 自定义属性来调整这些遮罩的不透明度。

下面是使用示例：

```css
/* 修改状态层不透明度 */
:root {
  --mdui-state-layer-hover: 0.08;
  --mdui-state-layer-focus: 0.12;
  --mdui-state-layer-pressed: 0.12;
  --mdui-state-layer-dragged: 0.16;
}
```

| CSS 自定义属性               | 默认值 | 示例                                                                                                         |
| ---------------------------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| `--mdui-state-layer-hover`   | `0.08` | <div class="design-tokens-state-layer" style="background-color:rgba(var(--mdui-color-primary), 0.08)"></div> |
| `--mdui-state-layer-focus`   | `0.12` | <div class="design-tokens-state-layer" style="background-color:rgba(var(--mdui-color-primary), 0.12)"></div> |
| `--mdui-state-layer-pressed` | `0.12` | <div class="design-tokens-state-layer" style="background-color:rgba(var(--mdui-color-primary), 0.12)"></div> |
| `--mdui-state-layer-dragged` | `0.16` | <div class="design-tokens-state-layer" style="background-color:rgba(var(--mdui-color-primary), 0.16)"></div> |

## 抬升高度（阴影） {#elevation}

部分 mdui 组件具有阴影效果，以模拟组件在页面上的抬升感。你可以通过修改 CSS 自定义属性来调整组件的阴影效果。

下面是使用示例：

```css
/* 修改 level1 级别的阴影 */
:root {
  --mdui-elevation-level1:
    0 0.5px 1.5px 0 rgba(var(--mdui-color-shadow), 19%),
    0 0 1px 0 rgba(var(--mdui-color-shadow), 3.9%);
}

/* 把 foo 元素的阴影设置为 level1 */
.foo {
  box-shadow: var(--mdui-elevation-level1);
}
```

| CSS 自定义属性            | 默认值                                                                                                         | 示例                                                                                         |
| ------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `--mdui-elevation-level0` | `none`                                                                                                         | <div class="design-tokens-elevation" style="box-shadow: var(--mdui-elevation-level0)"></div> |
| `--mdui-elevation-level1` | `0 0.5px 1.5px 0 rgba(var(--mdui-color-shadow), 19%), 0 0 1px 0 rgba(var(--mdui-color-shadow), 3.9%)`          | <div class="design-tokens-elevation" style="box-shadow: var(--mdui-elevation-level1)"></div> |
| `--mdui-elevation-level2` | `0 0.85px 3px 0 rgba(var(--mdui-color-shadow), 19%), 0 0.25px 1px 0 rgba(var(--mdui-color-shadow), 3.9%)`      | <div class="design-tokens-elevation" style="box-shadow: var(--mdui-elevation-level2)"></div> |
| `--mdui-elevation-level3` | `0 1.25px 5px 0 rgba(var(--mdui-color-shadow), 19%), 0 0.3333px 1.5px 0 rgba(var(--mdui-color-shadow), 3.9%)`  | <div class="design-tokens-elevation" style="box-shadow: var(--mdui-elevation-level3)"></div> |
| `--mdui-elevation-level4` | `0 1.85px 6.25px 0 rgba(var(--mdui-color-shadow), 19%), 0 0.5px 1.75px 0 rgba(var(--mdui-color-shadow), 3.9%)` | <div class="design-tokens-elevation" style="box-shadow: var(--mdui-elevation-level4)"></div> |
| `--mdui-elevation-level5` | `0 2.75px 9px 0 rgba(var(--mdui-color-shadow), 19%), 0 0.25px 3px 0 rgba(var(--mdui-color-shadow), 3.9%)`      | <div class="design-tokens-elevation" style="box-shadow: var(--mdui-elevation-level5)"></div> |

## 动画 {#motion}

mdui 组件中的动画缓动曲线和持续时间可以通过 CSS 自定义属性进行配置。

下面是使用示例：

```css
/* 修改 standard 的缓动曲线、及 short1 的持续时间 */
:root {
  --mdui-motion-easing-standard: cubic-bezier(0.2, 0, 0, 1);
  --mdui-motion-duration-short1: 40ms;
}

/* 设置 foo 元素的过渡效果使用 standard 的缓动曲线、及 short1 的持续时间 */
.foo {
  transition: all var(--mdui-motion-duration-short1)
    var(--mdui-motion-easing-standard);
}
```

<table>
  <thead>
    <tr>
      <th>类型</th>
      <th>CSS 自定义属性</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="7">缓动曲线</th>
      <td><code>--mdui-motion-easing-linear</code></td>
      <td><code>cubic-bezier(0, 0, 1, 1)</code></td>
    </tr>
    <tr>
      <td><code>--mdui-motion-easing-standard</code></td>
      <td><code>cubic-bezier(0.2, 0, 0, 1)</code></td>
    </tr>
    <tr>
      <td><code>--mdui-motion-easing-standard-accelerate</code></td>
      <td><code>cubic-bezier(0.3, 0, 1, 1)</code></td>
    </tr>
    <tr>
      <td><code>--mdui-motion-easing-standard-decelerate</code></td>
      <td><code>cubic-bezier(0, 0, 0, 1)</code></td>
    </tr>
    <tr>
      <td><code>--mdui-motion-easing-emphasized</code></td>
      <td><code>var(--mdui-motion-easing-standard)</code></td>
    </tr>
    <tr>
      <td><code>--mdui-motion-easing-emphasized-accelerate</code></td>
      <td><code>cubic-bezier(0.3, 0, 0.8, 0.15)</code></td>
    </tr>
    <tr>
      <td><code>--mdui-motion-easing-emphasized-decelerate</code></td>
      <td><code>cubic-bezier(0.05, 0.7, 0.1, 1)</code></td>
    </tr>
    <tr>
      <th rowspan="16">持续时间</th>
      <td><code>--mdui-motion-duration-short1</code></td>
      <td><code>50ms</code></td>
    </tr>
    <tr>
      <td><code>--mdui-motion-duration-short2</code></td>
      <td><code>100ms</code></td>
    </tr>
    <tr>
      <td><code>--mdui-motion-duration-short3</code></td>
      <td><code>150ms</code></td>
    </tr>
    <tr>
      <td><code>--mdui-motion-duration-short4</code></td>
      <td><code>200ms</code></td>
    </tr>
    <tr>
      <td><code>--mdui-motion-duration-medium1</code></td>
      <td><code>250ms</code></td>
    </tr>
    <tr>
      <td><code>--mdui-motion-duration-medium2</code></td>
      <td><code>300ms</code></td>
    </tr>
    <tr>
      <td><code>--mdui-motion-duration-medium3</code></td>
      <td><code>350ms</code></td>
    </tr>
    <tr>
      <td><code>--mdui-motion-duration-medium4</code></td>
      <td><code>400ms</code></td>
    </tr>
    <tr>
      <td><code>--mdui-motion-duration-long1</code></td>
      <td><code>450ms</code></td>
    </tr>
    <tr>
      <td><code>--mdui-motion-duration-long2</code></td>
      <td><code>500ms</code></td>
    </tr>
    <tr>
      <td><code>--mdui-motion-duration-long3</code></td>
      <td><code>550ms</code></td>
    </tr>
    <tr>
      <td><code>--mdui-motion-duration-long4</code></td>
      <td><code>600ms</code></td>
    </tr>
    <tr>
      <td><code>--mdui-motion-duration-extra-long1</code></td>
      <td><code>700ms</code></td>
    </tr>
    <tr>
      <td><code>--mdui-motion-duration-extra-long2</code></td>
      <td><code>800ms</code></td>
    </tr>
    <tr>
      <td><code>--mdui-motion-duration-extra-long3</code></td>
      <td><code>900ms</code></td>
    </tr>
    <tr>
      <td><code>--mdui-motion-duration-extra-long4</code></td>
      <td><code>1000ms</code></td>
    </tr>
  </tbody>
</table>

## 响应式断点 {#breakpoint}

mdui 提供了一系列的响应式断点，这些断点可以通过 CSS 自定义属性进行配置。下面是使用示例：

```css
/* 修改 sm 的断点值 */
:root {
  --mdui-breakpoint-sm: 560px;
}
```

需要注意的是，这些 CSS 自定义属性不能在 CSS 媒体查询中使用。以下是一个错误的示例：

```css
/* 错误用法。媒体查询中无法使用 CSS 自定义属性 */
@media (min-width: var(--mdui-breakpoint-sm)) {
}
```

如果你需要在 JavaScript 中进行断点判断，可以使用 [`breakpoint`](/zh-cn/docs/2/functions/breakpoint) 函数。

| CSS 自定义属性          | 默认值   |
| ----------------------- | -------- |
| `--mdui-breakpoint-xs`  | `0px`    |
| `--mdui-breakpoint-sm`  | `600px`  |
| `--mdui-breakpoint-md`  | `840px`  |
| `--mdui-breakpoint-lg`  | `1080px` |
| `--mdui-breakpoint-xl`  | `1440px` |
| `--mdui-breakpoint-xxl` | `1920px` |

# 与 React 集成

在 React 中使用 mdui 时，只需要按照 [安装](/zh-cn/docs/2/getting-started/installation#npm) 页面的步骤完成安装即可。

## 注意事项 {#notes}

在 React 中使用 mdui 时，存在一些限制。这些限制是在 React 中使用 Web Components 的通用限制，而非 mdui 组件库本身的限制。

### 事件绑定 {#event-binding}

由于 React 不支持自定义事件，因此在使用 mdui 组件提供的事件时，需要先使用 `ref` 属性获取组件的引用。

以下是在 React 中使用 mdui 组件事件的示例：

```js
import { useEffect, useRef } from 'react';
import 'mdui/mdui.css';
import 'mdui/components/switch.js';

function App() {
  const switchRef = useRef(null);

  useEffect(() => {
    const handleToggle = () => {
      console.log('switch is toggled');
    };

    switchRef.current.addEventListener('change', handleToggle);

    return () => {
      switchRef.current.removeEventListener('change', handleToggle);
    };
  }, []);

  return <mdui-switch ref={switchRef}></mdui-switch>;
}

export default App;
```

### JSX TypeScript 类型声明 {#jsx-typescript}

如果你在 TypeScript 文件（.tsx）中使用 mdui，需要添加 TypeScript 类型声明。你需要在项目的 .d.ts 文件中手动引入 mdui 的类型声明文件：

```ts
/// <reference types="mdui/jsx.zh-cn.d.ts" />
```

# 与 Vue 集成

在 Vue 中使用 mdui 时，首先需要按照 [安装](/zh-cn/docs/2/getting-started/installation#npm) 页面的指引完成安装，然后进行一些必要的配置。

## 配置 {#configuration}

你需要配置 Vue，使其不将 mdui 组件解析为 Vue 组件。在 `vite.config` 文件中，设置 `compilerOptions.isCustomElement` 选项即可：

```js
// vite.config.js
import vue from '@vitejs/plugin-vue';

export default {
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 所有以 mdui- 开头的标签名都是 mdui 组件
          isCustomElement: (tag) => tag.startsWith('mdui-'),
        },
      },
    }),
  ],
};
```

关于这个配置的详细信息，你可以参考 [Vue 官方文档](https://cn.vuejs.org/guide/extras/web-components.html#using-custom-elements-in-vue)。

## 注意事项 {#notes}

### 双向数据绑定 {#data-binding}

在 mdui 组件上，你不能使用 `v-model` 进行双向数据绑定。你需要自行处理数据的绑定与更新。例如：

```html
<mdui-text-field
  :value="name"
  @input="name = $event.target.value"
></mdui-text-field>
```

### eslint 配置 {#eslint}

如果你使用了 [`eslint-plugin-vue`](https://www.npmjs.com/package/eslint-plugin-vue)，需要在 `.eslintrc.js` 中添加以下规则：

```js
rules: {
  'vue/no-deprecated-slot-attribute': 'off'
}
```

# 与 Angular 集成

在 Angular 中使用 mdui 时，首先需要按照 [安装](/zh-cn/docs/2/getting-started/installation#npm) 页面的指引完成安装，然后进行一些必要的配置。

## 配置 {#configuration}

首先，我们需要在 Angular 中启用 Web Components 的支持。示例如下：

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

配置完成后，我们就可以在 Angular 组件代码中引入并使用 mdui 组件了：

```js
import { Dialog } from 'mdui/components/dialog.js';

@Component({
  selector: 'app-dialog-example',
  template: `<div id="page">
    <button (click)="openDialog()">Open Dialog</button>
    <mdui-dialog #dialog primary="Dialog Title">Dialog Content</mdui-dialog>
  </div>`
})
export class DialogExampleComponent implements OnInit {

  // 使用 @ViewChild 获取 #dialog 元素的引用
  @ViewChild('dialog')
  dialog?: ElementRef<Dialog>;

  ...

  constructor(...) {
  }

  ngOnInit() {
  }

  ...

  openDialog() {
    // 使用 nativeElement 访问 mdui 组件
    this.dialog?.nativeElement.open = true;
  }
}
```

# 与其他框架集成

mdui 使用浏览器原生支持的 Web Components 开发，因此能在所有 Web 框架中使用。下面列举了在常用框架中使用 mdui 的方法。

## Aurelia {#Aurelia}

在按照 [安装](/zh-cn/docs/2/getting-started/installation#npm) 页面的指引完成安装后，还需要安装和配置一个额外的包（仅适用于 Aurelia 2）：

```bash
npm install aurelia-mdui --save
```

然后将其注册到应用中：

```typescript
import { MduiWebTask } from 'aurelia-mdui';

Aurelia.register(MduiWebTask).app(MyApp).start();
```

**注意**

请将错误报告发送到 [https://github.com/mreiche/aurelia-mdui](https://github.com/mreiche/aurelia-mdui)

## WebCell {#WebCell}

在 [WebCell](https://web-cell.dev/) 中使用 mdui 时，只需要按照 [安装](/zh-cn/docs/2/getting-started/installation#npm) 页面的步骤完成安装即可，Web Components、TypeScript 和 JSX 支持是一级特性且开箱即用的。

或者，您可用 [官方 GitHub 模板仓库](https://github.com/EasyWebApp/WebCell-mobile) 来 [一键创建新项目](https://github.com/new?template_name=WebCell-mobile&template_owner=EasyWebApp)。

# 头像组件 Avatar

头像用于表示用户或事物，支持多种形式，包括图片、图标或字符等。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/avatar.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { Avatar } from 'mdui/components/avatar.js';
```

使用示例：

```html
<mdui-avatar src="https://avatars.githubusercontent.com/u/3030330?s=40&v=4"></mdui-avatar>
```

## 示例 {#examples}

### 图片头像 {#example-src}

可以使用 `src` 属性指定一个图片链接作为头像，或者在 default slot 中提供一个 `<img>` 元素作为头像。

```html
<mdui-avatar src="https://avatars.githubusercontent.com/u/3030330?s=40&v=4"></mdui-avatar>

<mdui-avatar>
  <img src="https://avatars.githubusercontent.com/u/3030330?s=40&v=4" alt="图片头像示例"/>
</mdui-avatar>
```

可以使用 `fit` 属性定义图片如何适应容器框，类似于原生的 [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)。

### 图标头像 {#example-icon}

可以使用 `icon` 属性指定一个 Material Icons 图标作为头像，或者在 default slot 中提供一个图标元素作为头像。

```html
<mdui-avatar icon="people_alt"></mdui-avatar>

<mdui-avatar>
  <mdui-icon name="people_alt"></mdui-icon>
</mdui-avatar>
```

### 字符头像 {#example-char}

可以在 default slot 中使用任意文字作为头像。

```html
<mdui-avatar>A</mdui-avatar>
```

## mdui-avatar API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>src</td>
    <td>src</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>头像图片的 URL 地址</p>
</td>
  </tr>
  <tr>
    <td>fit</td>
    <td>fit</td>
    <td>true</td>
    <td>&#39;contain&#39; | &#39;cover&#39; | &#39;fill&#39; | &#39;none&#39; | &#39;scale-down&#39;</td>
    <td></td>
    <td><p>图片如何适应容器框，与原生的 <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit" target="_blank" rel="noopener nofollow"><code>object-fit</code></a> 属性相同。可选值包括：</p>
<ul>
<li><code>contain</code>：保持图片原有尺寸比例，内容会被等比例缩放</li>
<li><code>cover</code>：保持图片原有尺寸比例，但部分内容可能被剪切</li>
<li><code>fill</code>：默认值，不保持图片原有尺寸比例，内容会被拉伸以填充整个容器</li>
<li><code>none</code>：保留图片原有尺寸，内容不会被缩放或拉伸</li>
<li><code>scale-down</code>：保持图片原有尺寸比例，内容尺寸与 <code>none</code> 或 <code>contain</code> 中较小的一个相同</li>
</ul>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td>icon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>头像的 Material Icons 图标名</p>
</td>
  </tr>
  <tr>
    <td>label</td>
    <td>label</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>头像的替代文本描述</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p>自定义头像内容，可以为字母、汉字、<code>&lt;img&gt;</code> 元素、图标等</p>
</td>
  </tr>
</tbody>
</table>

### CSS Parts

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>image</td>
    <td><p>使用图片作为头像时，组件内部的 <code>&lt;img&gt;</code> 元素</p>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td><p>使用图标作为头像时，组件内部的 <code>&lt;mdui-icon&gt;</code> 元素</p>
</td>
  </tr>
</tbody>
</table>

### CSS 自定义属性

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>--shape-corner</td>
    <td><p>组件的圆角大小。可以指定一个具体的像素值；但更推荐引用<a href="/docs/2/styles/design-tokens#shape-corner">设计令牌</a></p>
</td>
  </tr>
</tbody>
</table>

# 徽标组件 Badge

徽标用于展示动态信息，如计数或状态指示。它可以包含文字或数字。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/badge.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { Badge } from 'mdui/components/badge.js';
```

使用示例：

```html
<mdui-badge>12</mdui-badge>
```

## 示例 {#examples}

### 形状 {#example-variant}

使用 `variant` 属性来设置徽标的形状。当 `variant` 为 `large` 时，将显示大型徽标。你可以在 default slot 中指定要显示的文本。

```html
<mdui-badge variant="small"></mdui-badge>
<mdui-badge variant="large">99+</mdui-badge>
```

## mdui-badge API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>variant</td>
    <td>variant</td>
    <td>true</td>
    <td>&#39;small&#39; | &#39;large&#39;</td>
    <td>'large'</td>
    <td><p>徽标的形状。可选值包括：</p>
<ul>
<li><code>small</code>：小型徽标，不显示文本</li>
<li><code>large</code>：大型徽标，会显示文本</li>
</ul>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p>徽标中显示的文本</p>
</td>
  </tr>
</tbody>
</table>

### CSS 自定义属性

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>--shape-corner</td>
    <td><p>组件的圆角大小。可以指定一个具体的像素值；但更推荐引用<a href="/docs/2/styles/design-tokens#shape-corner">设计令牌</a></p>
</td>
  </tr>
</tbody>
</table>

# 底部应用栏组件 BottomAppBar

底部应用栏主要用于在移动端页面底部展示导航项和其他重要操作。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/bottom-app-bar.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { BottomAppBar } from 'mdui/components/bottom-app-bar.js';
```

使用示例：（注意：示例中的 `style="position: relative"` 是为了演示需要，实际使用时请移除该样式。）

```html
<mdui-bottom-app-bar style="position: relative;">
  <mdui-button-icon icon="check_box--outlined"></mdui-button-icon>
  <mdui-button-icon icon="edit--outlined"></mdui-button-icon>
  <mdui-button-icon icon="mic_none--outlined"></mdui-button-icon>
  <mdui-button-icon icon="image--outlined"></mdui-button-icon>
  <div style="flex-grow: 1"></div>
  <mdui-fab icon="add"></mdui-fab>
</mdui-bottom-app-bar>
```

**注意事项：**

该组件默认使用 `position: fixed` 定位，并会自动在 `body` 上添加 `padding-bottom` 样式，以防止页面内容被该组件遮挡。

但在以下两种情况下，会默认使用 `position: absolute` 定位：

1. 当指定了 `scroll-target` 属性时。此时会在 `scroll-target` 的元素上添加 `padding-bottom` 样式。
2. 当位于 [`<mdui-layout></mdui-layout>`](/zh-cn/docs/2/components/layout) 组件中时。此时不会添加 `padding-bottom` 样式。

## 示例 {#examples}

### 位于指定容器内 {#example-scroll-target}

默认情况下，底部应用栏会相对于当前窗口，在页面底部显示。

如果你希望将底部应用栏放在指定的容器内，可以指定 `scroll-target` 属性，其值为可滚动内容的容器的 CSS 选择器或 DOM 元素。此时，底部应用栏会相对于父元素显示（你需要自行在父元素上添加 `position: relative; overflow: hidden` 样式）。

```html
<div style="position: relative;overflow: hidden">
  <mdui-bottom-app-bar scroll-target=".example-scroll-target">Content</mdui-bottom-app-bar>

  <div class="example-scroll-target" style="height: 200px;overflow: auto;">
    <div style="height: 1000px"></div>
  </div>
</div>
```

### 滚动时隐藏 {#example-scroll-behavior}

设置 `scroll-behavior` 属性为 `hide`，可以在页面向下滚动时隐藏底部应用栏，向上滚动时显示底部应用栏。

使用 `scroll-threshold` 属性，可以设置滚动多少像素后开始隐藏底部应用栏。

```html
<div style="position: relative;overflow: hidden">
  <mdui-bottom-app-bar
    scroll-behavior="hide"
    scroll-threshold="30"
    scroll-target=".example-scroll-behavior"
  >Content</mdui-bottom-app-bar>

  <div class="example-scroll-behavior" style="height: 200px;overflow: auto;">
    <div style="height: 1000px"></div>
  </div>
</div>
```

### 固定浮动操作按钮 {#example-fab-detach}

如果底部应用栏中包含了[浮动操作按钮](/zh-cn/docs/2/components/fab)，则可以添加 `fab-detach` 属性，使得在页面滚动，底部应用栏隐藏时，浮动操作按钮仍然停留在页面右下角。

```html
<div style="position: relative;overflow: hidden">
  <mdui-bottom-app-bar
    fab-detach
    scroll-behavior="hide"
    scroll-threshold="30"
    scroll-target=".example-fab-detach"
  >
    <mdui-button-icon icon="check_box--outlined"></mdui-button-icon>
    <mdui-button-icon icon="edit--outlined"></mdui-button-icon>
    <mdui-button-icon icon="mic_none--outlined"></mdui-button-icon>
    <mdui-button-icon icon="image--outlined"></mdui-button-icon>
    <div style="flex-grow: 1"></div>
    <mdui-fab icon="add"></mdui-fab>
  </mdui-bottom-app-bar>

  <div class="example-fab-detach" style="height: 200px;overflow: auto;">
    <div style="height: 1000px"></div>
  </div>
</div>
```

## mdui-bottom-app-bar API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>hide</td>
    <td>hide</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否隐藏</p>
</td>
  </tr>
  <tr>
    <td>fab-detach</td>
    <td>fabDetach</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否让底部应用栏中的 <a href="/docs/2/components/fab"><code>&lt;mdui-fab&gt;</code></a> 组件脱离应用栏。如果为 <code>true</code>，则当应用栏隐藏后，<a href="/docs/2/components/fab"><code>&lt;mdui-fab&gt;</code></a> 仍会停留在页面上</p>
</td>
  </tr>
  <tr>
    <td>scroll-behavior</td>
    <td>scrollBehavior</td>
    <td>true</td>
    <td>&#39;hide&#39; | &#39;shrink&#39; | &#39;elevate&#39;</td>
    <td></td>
    <td><p>滚动行为。可选值为：</p>
<ul>
<li><code>hide</code>：滚动时隐藏</li>
</ul>
</td>
  </tr>
  <tr>
    <td>scroll-target</td>
    <td>scrollTarget</td>
    <td>false</td>
    <td>string | HTMLElement | JQ&lt;HTMLElement&gt;</td>
    <td></td>
    <td><p>需要监听其滚动事件的元素。值可以是 CSS 选择器、DOM 元素、或 <a href="/docs/2/functions/jq">JQ 对象</a>。默认监听 <code>window</code> 的滚动事件</p>
</td>
  </tr>
  <tr>
    <td>scroll-threshold</td>
    <td>scrollThreshold</td>
    <td>true</td>
    <td>number</td>
    <td></td>
    <td><p>在滚动多少距离之后触发滚动行为，单位为 <code>px</code></p>
</td>
  </tr>
  <tr>
    <td>order</td>
    <td>order</td>
    <td>true</td>
    <td>number</td>
    <td></td>
    <td><p>该组件在 <a href="/docs/2/components/layout"><code>&lt;mdui-layout&gt;</code></a> 中的布局顺序，按从小到大排序。默认为 <code>0</code></p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>show</td>
    <td><p>开始显示时，事件被触发。可以通过调用 <code>event.preventDefault()</code> 阻止显示</p>
</td>
  </tr>
  <tr>
    <td>shown</td>
    <td><p>显示动画完成时，事件被触发</p>
</td>
  </tr>
  <tr>
    <td>hide</td>
    <td><p>开始隐藏时，事件被触发。可以通过调用 <code>event.preventDefault()</code> 阻止隐藏</p>
</td>
  </tr>
  <tr>
    <td>hidden</td>
    <td><p>隐藏动画完成时，事件被触发</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p>底部应用栏内部的元素</p>
</td>
  </tr>
</tbody>
</table>

### CSS 自定义属性

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>--shape-corner</td>
    <td><p>组件的圆角大小。可以指定一个具体的像素值；但更推荐引用<a href="/docs/2/styles/design-tokens#shape-corner">设计令牌</a></p>
</td>
  </tr>
  <tr>
    <td>--z-index</td>
    <td><p>组件的 CSS <code>z-index</code> 值</p>
</td>
  </tr>
</tbody>
</table>

# 按钮组件 Button

按钮主要用于执行一些操作，例如发送邮件、分享文档或点赞评论等。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/button.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { Button } from 'mdui/components/button.js';
```

使用示例：

```html
<mdui-button>Button</mdui-button>
```

## 示例 {#examples}

### 形状 {#example-variant}

使用 `variant` 属性设置按钮的形状。

```html
<mdui-button variant="elevated">Elevated</mdui-button>
<mdui-button variant="filled">Filled</mdui-button>
<mdui-button variant="tonal">Tonal</mdui-button>
<mdui-button variant="outlined">Outlined</mdui-button>
<mdui-button variant="text">Text</mdui-button>
```

### 全宽 {#example-full-width}

添加 `full-width` 属性可以使按钮占据父元素的全部宽度。

```html
<mdui-button full-width>Button</mdui-button>
```

### 图标 {#example-icon}

设置 `icon`、`end-icon` 属性，可以分别在按钮左侧、右侧添加 Material Icons 图标。也可以通过 `icon`、`end-icon` slot 在按钮左侧、右侧添加元素。

```html
<mdui-button icon="search" end-icon="arrow_forward">Icon</mdui-button>
<mdui-button>
  Slot
  <mdui-icon slot="icon" name="downloading"></mdui-icon>
  <mdui-icon slot="end-icon" name="attach_file"></mdui-icon>
</mdui-button>
```

### 链接 {#example-link}

设置 `href` 属性，可以使按钮变为链接，此时还可以使用这些和链接相关的属性：`download`、`target`、`rel`。

```html
<mdui-button href="https://www.mdui.org" target="_blank">Link</mdui-button>
```

### 禁用及 loading 状态 {#example-disabled}

添加 `disabled` 属性可以禁用按钮；添加 `loading` 属性可以为按钮添加加载中状态。

```html
<mdui-button disabled>Disabled</mdui-button>
<mdui-button loading>Loading</mdui-button>
<mdui-button loading disabled>Loading & Disabled</mdui-button>
```

## mdui-button API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>variant</td>
    <td>variant</td>
    <td>true</td>
    <td>&#39;elevated&#39; | &#39;filled&#39; | &#39;tonal&#39; | &#39;outlined&#39; | &#39;text&#39;</td>
    <td>'filled'</td>
    <td><p>按钮的形状。可选值包括：</p>
<ul>
<li><code>elevated</code>：带阴影的按钮，适用于需要将按钮与背景视觉分离的场景</li>
<li><code>filled</code>：视觉效果强烈，适用于重要流程的最终操作，如“保存”、“确认”等</li>
<li><code>tonal</code>：视觉效果介于 <code>filled</code> 和 <code>outlined</code> 之间，适用于中高优先级的操作，如流程中的“下一步”</li>
<li><code>outlined</code>：带边框的按钮，适用于中等优先级，且次要的操作，如“返回”</li>
<li><code>text</code>：文本按钮，适用于最低优先级的操作</li>
</ul>
</td>
  </tr>
  <tr>
    <td>full-width</td>
    <td>fullWidth</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否填满父元素宽度</p>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td>icon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>左侧的 Material Icons 图标名。也可以通过 <code>slot=&quot;icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>end-icon</td>
    <td>endIcon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>右侧的 Material Icons 图标名。也可以通过 <code>slot=&quot;end-icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>href</td>
    <td>href</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>链接的目标 URL。</p>
<p>如果设置了此属性，组件内部将渲染为 <code>&lt;a&gt;</code> 元素，并可以使用链接相关的属性。</p>
</td>
  </tr>
  <tr>
    <td>download</td>
    <td>download</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>下载链接的目标。</p>
<p><strong>Note</strong>：仅在设置了 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>target</td>
    <td>target</td>
    <td>true</td>
    <td>&#39;_blank&#39; | &#39;_parent&#39; | &#39;_self&#39; | &#39;_top&#39;</td>
    <td></td>
    <td><p>链接的打开方式。可选值包括：</p>
<ul>
<li><code>_blank</code>：在新窗口中打开链接</li>
<li><code>_parent</code>：在父框架中打开链接</li>
<li><code>_self</code>：默认。在当前框架中打开链接</li>
<li><code>_top</code>：在整个窗口中打开链接</li>
</ul>
<p><strong>Note</strong>：仅在设置了 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>rel</td>
    <td>rel</td>
    <td>true</td>
    <td>&#39;alternate&#39; | &#39;author&#39; | &#39;bookmark&#39; | &#39;external&#39; | &#39;help&#39; | &#39;license&#39; | &#39;me&#39; | &#39;next&#39; | &#39;nofollow&#39; | &#39;noreferrer&#39; | &#39;opener&#39; | &#39;prev&#39; | &#39;search&#39; | &#39;tag&#39;</td>
    <td></td>
    <td><p>当前文档与被链接文档之间的关系。可选值包括：</p>
<ul>
<li><code>alternate</code>：当前文档的替代版本</li>
<li><code>author</code>：当前文档或文章的作者</li>
<li><code>bookmark</code>：永久链接到最近的祖先章节</li>
<li><code>external</code>：引用的文档与当前文档不在同一站点</li>
<li><code>help</code>：链接到相关的帮助文档</li>
<li><code>license</code>：当前文档的主要内容由被引用文件的版权许可覆盖</li>
<li><code>me</code>：当前文档代表链接内容的所有者</li>
<li><code>next</code>：当前文档是系列中的一部分，被引用的文档是系列的下一个文档</li>
<li><code>nofollow</code>：当前文档的作者或发布者不认可被引用的文件</li>
<li><code>noreferrer</code>：不包含 <code>Referer</code> 头。类似于 <code>noopener</code> 的效果</li>
<li><code>opener</code>：如果超链接会创建一个顶级浏览上下文（即 <code>target</code> 属性值为 <code>_blank</code>），则创建一个辅助浏览上下文</li>
<li><code>prev</code>：当前文档是系列的一部分，被引用的文档是系列的上一个文档</li>
<li><code>search</code>：提供一个资源链接，可用于搜索当前文件及其相关页面</li>
<li><code>tag</code>：提供一个适用于当前文档的标签（由给定地址识别）</li>
</ul>
<p><strong>Note</strong>：仅在指定了 <code>href</code> 属性时可用。</p>
</td>
  </tr>
  <tr>
    <td>autofocus</td>
    <td>autofocus</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否在页面加载完成后自动获取焦点</p>
</td>
  </tr>
  <tr>
    <td>tabindex</td>
    <td>tabIndex</td>
    <td>false</td>
    <td>number</td>
    <td></td>
    <td><p>元素在使用 Tab 键切换焦点时的顺序</p>
</td>
  </tr>
  <tr>
    <td>disabled</td>
    <td>disabled</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否禁用</p>
</td>
  </tr>
  <tr>
    <td>loading</td>
    <td>loading</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否处于加载中状态</p>
</td>
  </tr>
  <tr>
    <td>name</td>
    <td>name</td>
    <td>true</td>
    <td>string</td>
    <td>''</td>
    <td><p>按钮的名称，将与表单数据一起提交。</p>
<p><strong>Note</strong>：仅在未设置 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>value</td>
    <td>value</td>
    <td>true</td>
    <td>string</td>
    <td>''</td>
    <td><p>按钮的初始值，将与表单数据一起提交。</p>
<p><strong>Note</strong>：仅在未设置 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>type</td>
    <td>type</td>
    <td>true</td>
    <td>&#39;submit&#39; | &#39;reset&#39; | &#39;button&#39;</td>
    <td>'button'</td>
    <td><p>按钮的类型。默认类型为 <code>button</code>。可选类型包括：</p>
<ul>
<li><code>submit</code>：点击按钮会提交表单数据到服务器</li>
<li><code>reset</code>：点击按钮会将表单中的所有字段重置为初始值</li>
<li><code>button</code>：此类型的按钮没有默认行为</li>
</ul>
<p><strong>Note</strong>：仅在未指定 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>form</td>
    <td>form</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>关联的 <code>&lt;form&gt;</code> 元素。此属性值应为同一页面中的一个 <code>&lt;form&gt;</code> 元素的 <code>id</code>。</p>
<p>如果未指定此属性，则该元素必须是 <code>&lt;form&gt;</code> 元素的子元素。通过此属性，你可以将元素放置在页面的任何位置，而不仅仅是 <code>&lt;form&gt;</code> 元素的子元素。</p>
<p><strong>Note</strong>：仅在未指定 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>formaction</td>
    <td>formAction</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>指定提交表单的 URL。</p>
<p>如果指定了此属性，将覆盖 <code>&lt;form&gt;</code> 元素的 <code>action</code> 属性。</p>
<p><strong>Note</strong>：仅在未指定 <code>href</code> 属性且 <code>type=&quot;submit&quot;</code> 时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>formenctype</td>
    <td>formEnctype</td>
    <td>true</td>
    <td>&#39;application/x-www-form-urlencoded&#39; | &#39;multipart/form-data&#39; | &#39;text/plain&#39;</td>
    <td></td>
    <td><p>指定提交表单到服务器的内容类型。可选值包括：</p>
<ul>
<li><code>application/x-www-form-urlencoded</code>：未指定该属性时的默认值</li>
<li><code>multipart/form-data</code>：当表单包含 <code>&lt;input type=&quot;file&quot;&gt;</code> 元素时使用</li>
<li><code>text/plain</code>：HTML5 新增，用于调试</li>
</ul>
<p>如果指定了此属性，将覆盖 <code>&lt;form&gt;</code> 元素的 <code>enctype</code> 属性。</p>
<p><strong>Note</strong>：仅在未指定 <code>href</code> 属性且 <code>type=&quot;submit&quot;</code> 时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>formmethod</td>
    <td>formMethod</td>
    <td>true</td>
    <td>&#39;post&#39; | &#39;get&#39;</td>
    <td></td>
    <td><p>指定提交表单时使用的 HTTP 方法。可选值包括：</p>
<ul>
<li><code>post</code>：表单数据包含在表单内容中，发送到服务器</li>
<li><code>get</code>：表单数据以 <code>?</code> 作为分隔符附加到表单的 URI 属性中，生成的 URI 发送到服务器。当表单没有副作用，并且仅包含 ASCII 字符时，使用此方法</li>
</ul>
<p>如果设置了此属性，将覆盖 <code>&lt;form&gt;</code> 元素的 <code>method</code> 属性。</p>
<p><strong>Note</strong>：仅在未设置 <code>href</code> 属性且 <code>type=&quot;submit&quot;</code> 时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>formnovalidate</td>
    <td>formNoValidate</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>如果设置了此属性，表单提交时将不执行表单验证。</p>
<p>如果设置了此属性，将覆盖 <code>&lt;form&gt;</code> 元素的 <code>novalidate</code> 属性。</p>
<p><strong>Note</strong>：仅在未设置 <code>href</code> 属性且 <code>type=&quot;submit&quot;</code> 时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>formtarget</td>
    <td>formTarget</td>
    <td>true</td>
    <td>&#39;_self&#39; | &#39;_blank&#39; | &#39;_parent&#39; | &#39;_top&#39;</td>
    <td></td>
    <td><p>提交表单后接收到的响应应显示在何处。可选值包括：</p>
<ul>
<li><code>_self</code>：默认选项，在当前框架中打开</li>
<li><code>_blank</code>：在新窗口中打开</li>
<li><code>_parent</code>：在父框架中打开</li>
<li><code>_top</code>：在整个窗口中打开</li>
</ul>
<p>如果设置了此属性，将覆盖 <code>&lt;form&gt;</code> 元素的 <code>target</code> 属性。</p>
<p><strong>Note</strong>：仅在未设置 <code>href</code> 属性且 <code>type=&quot;submit&quot;</code> 时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>validity</td>
    <td>false</td>
    <td>ValidityState</td>
    <td></td>
    <td><p>表单验证状态对象，具体参见 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/ValidityState" target="_blank" rel="noopener nofollow"><code>ValidityState</code></a></p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>validationMessage</td>
    <td>false</td>
    <td>string</td>
    <td></td>
    <td><p>如果表单验证未通过，此属性将包含提示信息。如果验证通过，此属性将为空字符串</p>
</td>
  </tr>
</tbody>
</table>

### 方法

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>click(): void</td>
    <td><p>模拟鼠标点击元素</p>
</td>
  </tr>
  <tr>
    <td>focus(options?: FocusOptions): void</td>
    <td><p>将焦点设置到当前元素。</p>
<p>可以传入一个对象作为参数，该对象的属性包括：</p>
<ul>
<li><code>preventScroll</code>：默认情况下，元素获取焦点后，页面会滚动以将该元素滚动到视图中。如果不希望页面滚动，可以将此属性设置为 <code>true</code>。</li>
</ul>
</td>
  </tr>
  <tr>
    <td>blur(): void</td>
    <td><p>移除当前元素的焦点</p>
</td>
  </tr>
  <tr>
    <td>checkValidity(): boolean</td>
    <td><p>检查表单字段是否通过验证。如果未通过，返回 <code>false</code> 并触发 <code>invalid</code> 事件；如果通过，返回 <code>true</code></p>
</td>
  </tr>
  <tr>
    <td>reportValidity(): boolean</td>
    <td><p>检查表单字段是否通过验证。如果未通过，返回 <code>false</code> 并触发 <code>invalid</code> 事件；如果通过，返回 <code>true</code>。</p>
<p>如果验证未通过，还会在组件上显示验证失败的提示。</p>
</td>
  </tr>
  <tr>
    <td>setCustomValidity(message: string): void</td>
    <td><p>设置自定义的错误提示文本。只要这个文本不为空，就表示字段未通过验证</p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>focus</td>
    <td><p>获得焦点时触发</p>
</td>
  </tr>
  <tr>
    <td>blur</td>
    <td><p>失去焦点时触发</p>
</td>
  </tr>
  <tr>
    <td>invalid</td>
    <td><p>表单字段验证未通过时触发</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p>按钮的文本</p>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td><p>按钮左侧的元素</p>
</td>
  </tr>
  <tr>
    <td>end-icon</td>
    <td><p>按钮右侧的元素</p>
</td>
  </tr>
</tbody>
</table>

### CSS Parts

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>button</td>
    <td><p>内部的 <code>&lt;button&gt;</code> 或 <code>&lt;a&gt;</code> 元素</p>
</td>
  </tr>
  <tr>
    <td>label</td>
    <td><p>按钮的文本</p>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td><p>按钮左侧的图标</p>
</td>
  </tr>
  <tr>
    <td>end-icon</td>
    <td><p>按钮右侧的图标</p>
</td>
  </tr>
  <tr>
    <td>loading</td>
    <td><p>加载中状态的 <code>&lt;mdui-circular-progress&gt;</code> 元素</p>
</td>
  </tr>
</tbody>
</table>

### CSS 自定义属性

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>--shape-corner</td>
    <td><p>组件的圆角大小。可以指定一个具体的像素值；但更推荐引用<a href="/docs/2/styles/design-tokens#shape-corner">设计令牌</a></p>
</td>
  </tr>
</tbody>
</table>

# 图标按钮组件 ButtonIcon

图标按钮主要用于执行一些次要的操作。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/button-icon.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { ButtonIcon } from 'mdui/components/button-icon.js';
```

使用示例：

```html
<mdui-button-icon icon="search"></mdui-button-icon>
```

## 示例 {#examples}

### 图标 {#example-icon}

使用 `icon` 属性指定 Material Icons 图标名称。也可以通过 default slot 指定图标元素。

```html
<mdui-button-icon icon="search"></mdui-button-icon>
<mdui-button-icon>
  <mdui-icon name="search"></mdui-icon>
</mdui-button-icon>
```

### 形状 {#example-variant}

使用 `variant` 属性设置图标按钮的形状。

```html
<mdui-button-icon variant="standard" icon="search"></mdui-button-icon>
<mdui-button-icon variant="filled" icon="search"></mdui-button-icon>
<mdui-button-icon variant="tonal" icon="search"></mdui-button-icon>
<mdui-button-icon variant="outlined" icon="search"></mdui-button-icon>
```

### 可选中 {#example-selectable}

添加 `selectable` 属性使图标按钮可被选中。

```html
<mdui-button-icon selectable icon="favorite_border"></mdui-button-icon>
```

使用 `selected-icon` 属性指定选中状态的 Material Icons 图标名称。也可以通过 `selected-icon` slot 指定选中状态的图标元素。

```html
<mdui-button-icon selectable icon="favorite_border" selected-icon="favorite"></mdui-button-icon>
<mdui-button-icon selectable icon="favorite_border">
  <mdui-icon slot="selected-icon" name="favorite"></mdui-icon>
</mdui-button-icon>
```

图标按钮被选中后，`selected` 属性变为 `true`。也可以通过添加 `selected` 属性，使图标按钮默认处于选中状态。

```html
<mdui-button-icon selectable selected icon="favorite_border" selected-icon="favorite"></mdui-button-icon>
```

### 链接 {#example-link}

添加 `href` 属性，可使图标按钮变为链接，此时还可使用这些和链接相关的属性：`download`、`target`、`rel`。

```html
<mdui-button-icon icon="search" href="https://www.mdui.org" target="_blank"></mdui-button-icon>
```

### 禁用及 loading 状态 {#example-disabled}

添加 `disabled` 属性可禁用图标按钮；添加 `loading` 属性可为图标按钮添加加载中状态。

```html
<mdui-button-icon disabled icon="search" variant="tonal"></mdui-button-icon>
<mdui-button-icon loading icon="search" variant="tonal"></mdui-button-icon>
<mdui-button-icon loading disabled icon="search" variant="tonal"></mdui-button-icon>
```

## mdui-button-icon API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>variant</td>
    <td>variant</td>
    <td>true</td>
    <td>&#39;standard&#39; | &#39;filled&#39; | &#39;tonal&#39; | &#39;outlined&#39;</td>
    <td>'standard'</td>
    <td><p>图标按钮的形状。可选值包括：</p>
<ul>
<li><code>standard</code>：适用于最低优先级的操作</li>
<li><code>filled</code>：视觉效果强烈，适用于高优先级的操作</li>
<li><code>tonal</code>：视觉效果介于 <code>filled</code> 和 <code>outlined</code> 之间，适用于中高优先级的操作</li>
<li><code>outlined</code>：适用于中等优先级的操作</li>
</ul>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td>icon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>Material Icons 图标名。也可以通过 default slot 设置</p>
</td>
  </tr>
  <tr>
    <td>selected-icon</td>
    <td>selectedIcon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>选中状态的 Material Icons 图标名。也可以通过 <code>slot=&quot;selected-icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>selectable</td>
    <td>selectable</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否可选中</p>
</td>
  </tr>
  <tr>
    <td>selected</td>
    <td>selected</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否已被选中</p>
</td>
  </tr>
  <tr>
    <td>href</td>
    <td>href</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>链接的目标 URL。</p>
<p>如果设置了此属性，组件内部将渲染为 <code>&lt;a&gt;</code> 元素，并可以使用链接相关的属性。</p>
</td>
  </tr>
  <tr>
    <td>download</td>
    <td>download</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>下载链接的目标。</p>
<p><strong>Note</strong>：仅在设置了 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>target</td>
    <td>target</td>
    <td>true</td>
    <td>&#39;_blank&#39; | &#39;_parent&#39; | &#39;_self&#39; | &#39;_top&#39;</td>
    <td></td>
    <td><p>链接的打开方式。可选值包括：</p>
<ul>
<li><code>_blank</code>：在新窗口中打开链接</li>
<li><code>_parent</code>：在父框架中打开链接</li>
<li><code>_self</code>：默认。在当前框架中打开链接</li>
<li><code>_top</code>：在整个窗口中打开链接</li>
</ul>
<p><strong>Note</strong>：仅在设置了 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>rel</td>
    <td>rel</td>
    <td>true</td>
    <td>&#39;alternate&#39; | &#39;author&#39; | &#39;bookmark&#39; | &#39;external&#39; | &#39;help&#39; | &#39;license&#39; | &#39;me&#39; | &#39;next&#39; | &#39;nofollow&#39; | &#39;noreferrer&#39; | &#39;opener&#39; | &#39;prev&#39; | &#39;search&#39; | &#39;tag&#39;</td>
    <td></td>
    <td><p>当前文档与被链接文档之间的关系。可选值包括：</p>
<ul>
<li><code>alternate</code>：当前文档的替代版本</li>
<li><code>author</code>：当前文档或文章的作者</li>
<li><code>bookmark</code>：永久链接到最近的祖先章节</li>
<li><code>external</code>：引用的文档与当前文档不在同一站点</li>
<li><code>help</code>：链接到相关的帮助文档</li>
<li><code>license</code>：当前文档的主要内容由被引用文件的版权许可覆盖</li>
<li><code>me</code>：当前文档代表链接内容的所有者</li>
<li><code>next</code>：当前文档是系列中的一部分，被引用的文档是系列的下一个文档</li>
<li><code>nofollow</code>：当前文档的作者或发布者不认可被引用的文件</li>
<li><code>noreferrer</code>：不包含 <code>Referer</code> 头。类似于 <code>noopener</code> 的效果</li>
<li><code>opener</code>：如果超链接会创建一个顶级浏览上下文（即 <code>target</code> 属性值为 <code>_blank</code>），则创建一个辅助浏览上下文</li>
<li><code>prev</code>：当前文档是系列的一部分，被引用的文档是系列的上一个文档</li>
<li><code>search</code>：提供一个资源链接，可用于搜索当前文件及其相关页面</li>
<li><code>tag</code>：提供一个适用于当前文档的标签（由给定地址识别）</li>
</ul>
<p><strong>Note</strong>：仅在指定了 <code>href</code> 属性时可用。</p>
</td>
  </tr>
  <tr>
    <td>autofocus</td>
    <td>autofocus</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否在页面加载完成后自动获取焦点</p>
</td>
  </tr>
  <tr>
    <td>tabindex</td>
    <td>tabIndex</td>
    <td>false</td>
    <td>number</td>
    <td></td>
    <td><p>元素在使用 Tab 键切换焦点时的顺序</p>
</td>
  </tr>
  <tr>
    <td>disabled</td>
    <td>disabled</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否禁用</p>
</td>
  </tr>
  <tr>
    <td>loading</td>
    <td>loading</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否处于加载中状态</p>
</td>
  </tr>
  <tr>
    <td>name</td>
    <td>name</td>
    <td>true</td>
    <td>string</td>
    <td>''</td>
    <td><p>按钮的名称，将与表单数据一起提交。</p>
<p><strong>Note</strong>：仅在未设置 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>value</td>
    <td>value</td>
    <td>true</td>
    <td>string</td>
    <td>''</td>
    <td><p>按钮的初始值，将与表单数据一起提交。</p>
<p><strong>Note</strong>：仅在未设置 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>type</td>
    <td>type</td>
    <td>true</td>
    <td>&#39;submit&#39; | &#39;reset&#39; | &#39;button&#39;</td>
    <td>'button'</td>
    <td><p>按钮的类型。默认类型为 <code>button</code>。可选类型包括：</p>
<ul>
<li><code>submit</code>：点击按钮会提交表单数据到服务器</li>
<li><code>reset</code>：点击按钮会将表单中的所有字段重置为初始值</li>
<li><code>button</code>：此类型的按钮没有默认行为</li>
</ul>
<p><strong>Note</strong>：仅在未指定 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>form</td>
    <td>form</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>关联的 <code>&lt;form&gt;</code> 元素。此属性值应为同一页面中的一个 <code>&lt;form&gt;</code> 元素的 <code>id</code>。</p>
<p>如果未指定此属性，则该元素必须是 <code>&lt;form&gt;</code> 元素的子元素。通过此属性，你可以将元素放置在页面的任何位置，而不仅仅是 <code>&lt;form&gt;</code> 元素的子元素。</p>
<p><strong>Note</strong>：仅在未指定 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>formaction</td>
    <td>formAction</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>指定提交表单的 URL。</p>
<p>如果指定了此属性，将覆盖 <code>&lt;form&gt;</code> 元素的 <code>action</code> 属性。</p>
<p><strong>Note</strong>：仅在未指定 <code>href</code> 属性且 <code>type=&quot;submit&quot;</code> 时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>formenctype</td>
    <td>formEnctype</td>
    <td>true</td>
    <td>&#39;application/x-www-form-urlencoded&#39; | &#39;multipart/form-data&#39; | &#39;text/plain&#39;</td>
    <td></td>
    <td><p>指定提交表单到服务器的内容类型。可选值包括：</p>
<ul>
<li><code>application/x-www-form-urlencoded</code>：未指定该属性时的默认值</li>
<li><code>multipart/form-data</code>：当表单包含 <code>&lt;input type=&quot;file&quot;&gt;</code> 元素时使用</li>
<li><code>text/plain</code>：HTML5 新增，用于调试</li>
</ul>
<p>如果指定了此属性，将覆盖 <code>&lt;form&gt;</code> 元素的 <code>enctype</code> 属性。</p>
<p><strong>Note</strong>：仅在未指定 <code>href</code> 属性且 <code>type=&quot;submit&quot;</code> 时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>formmethod</td>
    <td>formMethod</td>
    <td>true</td>
    <td>&#39;post&#39; | &#39;get&#39;</td>
    <td></td>
    <td><p>指定提交表单时使用的 HTTP 方法。可选值包括：</p>
<ul>
<li><code>post</code>：表单数据包含在表单内容中，发送到服务器</li>
<li><code>get</code>：表单数据以 <code>?</code> 作为分隔符附加到表单的 URI 属性中，生成的 URI 发送到服务器。当表单没有副作用，并且仅包含 ASCII 字符时，使用此方法</li>
</ul>
<p>如果设置了此属性，将覆盖 <code>&lt;form&gt;</code> 元素的 <code>method</code> 属性。</p>
<p><strong>Note</strong>：仅在未设置 <code>href</code> 属性且 <code>type=&quot;submit&quot;</code> 时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>formnovalidate</td>
    <td>formNoValidate</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>如果设置了此属性，表单提交时将不执行表单验证。</p>
<p>如果设置了此属性，将覆盖 <code>&lt;form&gt;</code> 元素的 <code>novalidate</code> 属性。</p>
<p><strong>Note</strong>：仅在未设置 <code>href</code> 属性且 <code>type=&quot;submit&quot;</code> 时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>formtarget</td>
    <td>formTarget</td>
    <td>true</td>
    <td>&#39;_self&#39; | &#39;_blank&#39; | &#39;_parent&#39; | &#39;_top&#39;</td>
    <td></td>
    <td><p>提交表单后接收到的响应应显示在何处。可选值包括：</p>
<ul>
<li><code>_self</code>：默认选项，在当前框架中打开</li>
<li><code>_blank</code>：在新窗口中打开</li>
<li><code>_parent</code>：在父框架中打开</li>
<li><code>_top</code>：在整个窗口中打开</li>
</ul>
<p>如果设置了此属性，将覆盖 <code>&lt;form&gt;</code> 元素的 <code>target</code> 属性。</p>
<p><strong>Note</strong>：仅在未设置 <code>href</code> 属性且 <code>type=&quot;submit&quot;</code> 时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>validity</td>
    <td>false</td>
    <td>ValidityState</td>
    <td></td>
    <td><p>表单验证状态对象，具体参见 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/ValidityState" target="_blank" rel="noopener nofollow"><code>ValidityState</code></a></p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>validationMessage</td>
    <td>false</td>
    <td>string</td>
    <td></td>
    <td><p>如果表单验证未通过，此属性将包含提示信息。如果验证通过，此属性将为空字符串</p>
</td>
  </tr>
</tbody>
</table>

### 方法

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>click(): void</td>
    <td><p>模拟鼠标点击元素</p>
</td>
  </tr>
  <tr>
    <td>focus(options?: FocusOptions): void</td>
    <td><p>将焦点设置到当前元素。</p>
<p>可以传入一个对象作为参数，该对象的属性包括：</p>
<ul>
<li><code>preventScroll</code>：默认情况下，元素获取焦点后，页面会滚动以将该元素滚动到视图中。如果不希望页面滚动，可以将此属性设置为 <code>true</code>。</li>
</ul>
</td>
  </tr>
  <tr>
    <td>blur(): void</td>
    <td><p>移除当前元素的焦点</p>
</td>
  </tr>
  <tr>
    <td>checkValidity(): boolean</td>
    <td><p>检查表单字段是否通过验证。如果未通过，返回 <code>false</code> 并触发 <code>invalid</code> 事件；如果通过，返回 <code>true</code></p>
</td>
  </tr>
  <tr>
    <td>reportValidity(): boolean</td>
    <td><p>检查表单字段是否通过验证。如果未通过，返回 <code>false</code> 并触发 <code>invalid</code> 事件；如果通过，返回 <code>true</code>。</p>
<p>如果验证未通过，还会在组件上显示验证失败的提示。</p>
</td>
  </tr>
  <tr>
    <td>setCustomValidity(message: string): void</td>
    <td><p>设置自定义的错误提示文本。只要这个文本不为空，就表示字段未通过验证</p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>focus</td>
    <td><p>获得焦点时触发</p>
</td>
  </tr>
  <tr>
    <td>blur</td>
    <td><p>失去焦点时触发</p>
</td>
  </tr>
  <tr>
    <td>change</td>
    <td><p>选中状态变更时触发</p>
</td>
  </tr>
  <tr>
    <td>invalid</td>
    <td><p>表单字段验证未通过时触发</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p>图标组件</p>
</td>
  </tr>
  <tr>
    <td>selected-icon</td>
    <td><p>选中状态显示的图标元素</p>
</td>
  </tr>
</tbody>
</table>

### CSS Parts

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>button</td>
    <td><p>内部的 <code>&lt;button&gt;</code> 或 <code>&lt;a&gt;</code> 元素</p>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td><p>未选中状态的图标</p>
</td>
  </tr>
  <tr>
    <td>selected-icon</td>
    <td><p>选中状态的图标</p>
</td>
  </tr>
  <tr>
    <td>loading</td>
    <td><p>加载中状态的 <code>&lt;mdui-circular-progress&gt;</code> 元素</p>
</td>
  </tr>
</tbody>
</table>

### CSS 自定义属性

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>--shape-corner</td>
    <td><p>组件的圆角大小。可以指定一个具体的像素值；但更推荐引用<a href="/docs/2/styles/design-tokens#shape-corner">设计令牌</a></p>
</td>
  </tr>
</tbody>
</table>

# 卡片组件 Card

卡片是一个多功能组件，用于承载与单一主题相关的内容和操作。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/card.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { Card } from 'mdui/components/card.js';
```

使用示例：

```html
<mdui-card style="width: 200px;height: 124px">Card</mdui-card>
```

## 示例 {#examples}

### 形状 {#example-variant}

使用 `variant` 属性设置卡片的形状。

```html
<mdui-card variant="elevated" style="width: 200px;height: 124px"></mdui-card>
<mdui-card variant="filled" style="width: 200px;height: 124px"></mdui-card>
<mdui-card variant="outlined" style="width: 200px;height: 124px"></mdui-card>
```

### 可点击 {#example-clickable}

添加 `clickable` 属性可以使卡片可点击，此时会添加鼠标悬浮效果和点击涟漪效果。

```html
<mdui-card clickable style="width: 200px;height: 124px"></mdui-card>
```

### 链接 {#example-link}

添加 `href` 属性，可以使卡片变为链接，此时还可以使用这些和链接相关的属性：`download`、`target`、`rel`。

```html
<mdui-card href="https://www.mdui.org" target="_blank" style="width: 200px;height: 124px"></mdui-card>
```

### 禁用状态 {#example-disabled}

添加 `disabled` 属性可以禁用卡片。

```html
<mdui-card disabled style="width: 200px;height: 124px"></mdui-card>
```

## mdui-card API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>variant</td>
    <td>variant</td>
    <td>true</td>
    <td>&#39;elevated&#39; | &#39;filled&#39; | &#39;outlined&#39;</td>
    <td>'elevated'</td>
    <td><p>卡片的形状。可选值包括：</p>
<ul>
<li><code>elevated</code>：带阴影的卡片，与背景的视觉分离度较高</li>
<li><code>filled</code>：带填充色的卡片，与背景的视觉分离度较低</li>
<li><code>outlined</code>：带边框的卡片，与背景的视觉分离度最高</li>
</ul>
</td>
  </tr>
  <tr>
    <td>clickable</td>
    <td>clickable</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否可点击。为 <code>true</code> 时，卡片将具有鼠标悬浮效果和点击涟漪效果</p>
</td>
  </tr>
  <tr>
    <td>disabled</td>
    <td>disabled</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否禁用</p>
</td>
  </tr>
  <tr>
    <td>href</td>
    <td>href</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>链接的目标 URL。</p>
<p>如果设置了此属性，组件内部将渲染为 <code>&lt;a&gt;</code> 元素，并可以使用链接相关的属性。</p>
</td>
  </tr>
  <tr>
    <td>download</td>
    <td>download</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>下载链接的目标。</p>
<p><strong>Note</strong>：仅在设置了 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>target</td>
    <td>target</td>
    <td>true</td>
    <td>&#39;_blank&#39; | &#39;_parent&#39; | &#39;_self&#39; | &#39;_top&#39;</td>
    <td></td>
    <td><p>链接的打开方式。可选值包括：</p>
<ul>
<li><code>_blank</code>：在新窗口中打开链接</li>
<li><code>_parent</code>：在父框架中打开链接</li>
<li><code>_self</code>：默认。在当前框架中打开链接</li>
<li><code>_top</code>：在整个窗口中打开链接</li>
</ul>
<p><strong>Note</strong>：仅在设置了 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>rel</td>
    <td>rel</td>
    <td>true</td>
    <td>&#39;alternate&#39; | &#39;author&#39; | &#39;bookmark&#39; | &#39;external&#39; | &#39;help&#39; | &#39;license&#39; | &#39;me&#39; | &#39;next&#39; | &#39;nofollow&#39; | &#39;noreferrer&#39; | &#39;opener&#39; | &#39;prev&#39; | &#39;search&#39; | &#39;tag&#39;</td>
    <td></td>
    <td><p>当前文档与被链接文档之间的关系。可选值包括：</p>
<ul>
<li><code>alternate</code>：当前文档的替代版本</li>
<li><code>author</code>：当前文档或文章的作者</li>
<li><code>bookmark</code>：永久链接到最近的祖先章节</li>
<li><code>external</code>：引用的文档与当前文档不在同一站点</li>
<li><code>help</code>：链接到相关的帮助文档</li>
<li><code>license</code>：当前文档的主要内容由被引用文件的版权许可覆盖</li>
<li><code>me</code>：当前文档代表链接内容的所有者</li>
<li><code>next</code>：当前文档是系列中的一部分，被引用的文档是系列的下一个文档</li>
<li><code>nofollow</code>：当前文档的作者或发布者不认可被引用的文件</li>
<li><code>noreferrer</code>：不包含 <code>Referer</code> 头。类似于 <code>noopener</code> 的效果</li>
<li><code>opener</code>：如果超链接会创建一个顶级浏览上下文（即 <code>target</code> 属性值为 <code>_blank</code>），则创建一个辅助浏览上下文</li>
<li><code>prev</code>：当前文档是系列的一部分，被引用的文档是系列的上一个文档</li>
<li><code>search</code>：提供一个资源链接，可用于搜索当前文件及其相关页面</li>
<li><code>tag</code>：提供一个适用于当前文档的标签（由给定地址识别）</li>
</ul>
<p><strong>Note</strong>：仅在指定了 <code>href</code> 属性时可用。</p>
</td>
  </tr>
  <tr>
    <td>autofocus</td>
    <td>autofocus</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否在页面加载完成后自动获取焦点</p>
</td>
  </tr>
  <tr>
    <td>tabindex</td>
    <td>tabIndex</td>
    <td>false</td>
    <td>number</td>
    <td></td>
    <td><p>元素在使用 Tab 键切换焦点时的顺序</p>
</td>
  </tr>
</tbody>
</table>

### 方法

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>click(): void</td>
    <td><p>模拟鼠标点击元素</p>
</td>
  </tr>
  <tr>
    <td>focus(options?: FocusOptions): void</td>
    <td><p>将焦点设置到当前元素。</p>
<p>可以传入一个对象作为参数，该对象的属性包括：</p>
<ul>
<li><code>preventScroll</code>：默认情况下，元素获取焦点后，页面会滚动以将该元素滚动到视图中。如果不希望页面滚动，可以将此属性设置为 <code>true</code>。</li>
</ul>
</td>
  </tr>
  <tr>
    <td>blur(): void</td>
    <td><p>移除当前元素的焦点</p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>focus</td>
    <td><p>获得焦点时触发</p>
</td>
  </tr>
  <tr>
    <td>blur</td>
    <td><p>失去焦点时触发</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p>卡片的内容</p>
</td>
  </tr>
</tbody>
</table>

### CSS 自定义属性

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>--shape-corner</td>
    <td><p>组件的圆角大小。可以指定一个具体的像素值；但更推荐引用<a href="/docs/2/styles/design-tokens#shape-corner">设计令牌</a></p>
</td>
  </tr>
</tbody>
</table>

# 复选框组件 Checkbox

复选框允许用户从一组选项中选择一个或多个选项，或者切换单个选项的开/关状态。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/checkbox.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { Checkbox } from 'mdui/components/checkbox.js';
```

使用示例：

```html
<mdui-checkbox>Checkbox</mdui-checkbox>
```

## 示例 {#examples}

### 选中状态 {#example-checked}

复选框选中时，`checked` 属性值为 `true`。添加 `checked` 属性可以使复选框默认处于选中状态。

```html
<mdui-checkbox checked>Checkbox</mdui-checkbox>
```

### 禁用状态 {#example-disabled}

添加 `disabled` 属性可以禁用复选框。

```html
<mdui-checkbox disabled>Checkbox</mdui-checkbox>
<mdui-checkbox disabled checked>Checkbox</mdui-checkbox>
```

### 不确定状态 {#example-indeterminate}

添加 `indeterminate` 属性表示复选框处于不确定状态。

```html
<mdui-checkbox indeterminate>Checkbox</mdui-checkbox>
```

### 图标 {#example-icon}

通过设置 `unchecked-icon`、`checked-icon`、`indeterminate-icon` 属性，可以分别设置未选中、选中、不确定状态时的复选框的 Material Icons 图标。也可以通过 `unchecked-icon`、`checked-icon`、`indeterminate-icon` slot 进行设置。

```html
<mdui-checkbox
  unchecked-icon="radio_button_unchecked"
  checked-icon="check_circle"
  indeterminate-icon="playlist_add_check_circle"
>Checkbox</mdui-checkbox>

<mdui-checkbox
  indeterminate
  unchecked-icon="radio_button_unchecked"
  checked-icon="check_circle"
  indeterminate-icon="playlist_add_check_circle"
>Checkbox</mdui-checkbox>

<br/>

<mdui-checkbox>
  <mdui-icon slot="unchecked-icon" name="radio_button_unchecked"></mdui-icon>
  <mdui-icon slot="checked-icon" name="check_circle"></mdui-icon>
  <mdui-icon slot="indeterminate-icon" name="playlist_add_check_circle"></mdui-icon>
  Checkbox
</mdui-checkbox>

<mdui-checkbox indeterminate>
  <mdui-icon slot="unchecked-icon" name="radio_button_unchecked"></mdui-icon>
  <mdui-icon slot="checked-icon" name="check_circle"></mdui-icon>
  <mdui-icon slot="indeterminate-icon" name="playlist_add_check_circle"></mdui-icon>
  Checkbox
</mdui-checkbox>
```

## mdui-checkbox API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>disabled</td>
    <td>disabled</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否为禁用状态</p>
</td>
  </tr>
  <tr>
    <td>checked</td>
    <td>checked</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否为选中状态</p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>defaultChecked</td>
    <td>false</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>默认选中状态。在重置表单时，将恢复为此状态。此属性只能通过 JavaScript 属性设置</p>
</td>
  </tr>
  <tr>
    <td>indeterminate</td>
    <td>indeterminate</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否处于不确定状态</p>
</td>
  </tr>
  <tr>
    <td>required</td>
    <td>required</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>提交表单时，是否必须选中此复选框</p>
</td>
  </tr>
  <tr>
    <td>form</td>
    <td>form</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>关联的 <code>&lt;form&gt;</code> 元素。此属性值应为同一页面中的一个 <code>&lt;form&gt;</code> 元素的 <code>id</code>。</p>
<p>如果未指定此属性，则该元素必须是 <code>&lt;form&gt;</code> 元素的子元素。通过此属性，你可以将元素放置在页面的任何位置，而不仅仅是 <code>&lt;form&gt;</code> 元素的子元素。</p>
</td>
  </tr>
  <tr>
    <td>name</td>
    <td>name</td>
    <td>true</td>
    <td>string</td>
    <td>''</td>
    <td><p>复选框名称，将与表单数据一起提交</p>
</td>
  </tr>
  <tr>
    <td>value</td>
    <td>value</td>
    <td>true</td>
    <td>string</td>
    <td>'on'</td>
    <td><p>复选框的值，将于表单数据一起提交</p>
</td>
  </tr>
  <tr>
    <td>unchecked-icon</td>
    <td>uncheckedIcon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>未选中状态的 Material Icons 图标名。也可以通过 <code>slot=&quot;unchecked-icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>checked-icon</td>
    <td>checkedIcon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>选中状态的 Material Icons 图标名。也可以通过 <code>slot=&quot;checked-icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>indeterminate-icon</td>
    <td>indeterminateIcon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>不确定状态的 Material Icons 图标名。也可以通过 <code>slot=&quot;indeterminate-icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>validity</td>
    <td>false</td>
    <td>ValidityState</td>
    <td></td>
    <td><p>表单验证状态对象，具体参见 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/ValidityState" target="_blank" rel="noopener nofollow"><code>ValidityState</code></a></p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>validationMessage</td>
    <td>false</td>
    <td>string</td>
    <td></td>
    <td><p>如果表单验证未通过，此属性将包含提示信息。如果验证通过，此属性将为空字符串</p>
</td>
  </tr>
  <tr>
    <td>autofocus</td>
    <td>autofocus</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否在页面加载完成后自动获取焦点</p>
</td>
  </tr>
  <tr>
    <td>tabindex</td>
    <td>tabIndex</td>
    <td>false</td>
    <td>number</td>
    <td></td>
    <td><p>元素在使用 Tab 键切换焦点时的顺序</p>
</td>
  </tr>
</tbody>
</table>

### 方法

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>checkValidity(): boolean</td>
    <td><p>检查表单字段是否通过验证。如果未通过，返回 <code>false</code> 并触发 <code>invalid</code> 事件；如果通过，返回 <code>true</code></p>
</td>
  </tr>
  <tr>
    <td>reportValidity(): boolean</td>
    <td><p>检查表单字段是否通过验证。如果未通过，返回 <code>false</code> 并触发 <code>invalid</code> 事件；如果通过，返回 <code>true</code>。</p>
<p>如果验证未通过，还会在组件上显示验证失败的提示。</p>
</td>
  </tr>
  <tr>
    <td>setCustomValidity(message: string): void</td>
    <td><p>设置自定义的错误提示文本。只要这个文本不为空，就表示字段未通过验证</p>
</td>
  </tr>
  <tr>
    <td>click(): void</td>
    <td><p>模拟鼠标点击元素</p>
</td>
  </tr>
  <tr>
    <td>focus(options?: FocusOptions): void</td>
    <td><p>将焦点设置到当前元素。</p>
<p>可以传入一个对象作为参数，该对象的属性包括：</p>
<ul>
<li><code>preventScroll</code>：默认情况下，元素获取焦点后，页面会滚动以将该元素滚动到视图中。如果不希望页面滚动，可以将此属性设置为 <code>true</code>。</li>
</ul>
</td>
  </tr>
  <tr>
    <td>blur(): void</td>
    <td><p>移除当前元素的焦点</p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>focus</td>
    <td><p>获得焦点时触发</p>
</td>
  </tr>
  <tr>
    <td>blur</td>
    <td><p>失去焦点时触发</p>
</td>
  </tr>
  <tr>
    <td>change</td>
    <td><p>选中状态变更时触发</p>
</td>
  </tr>
  <tr>
    <td>input</td>
    <td><p>选中状态变更时触发</p>
</td>
  </tr>
  <tr>
    <td>invalid</td>
    <td><p>表单字段验证未通过时触发</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p>复选框文本</p>
</td>
  </tr>
  <tr>
    <td>unchecked-icon</td>
    <td><p>未选中状态的图标</p>
</td>
  </tr>
  <tr>
    <td>checked-icon</td>
    <td><p>选中状态的图标</p>
</td>
  </tr>
  <tr>
    <td>indeterminate-icon</td>
    <td><p>不确定状态的图标</p>
</td>
  </tr>
</tbody>
</table>

### CSS Parts

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>control</td>
    <td><p>左侧图标容器</p>
</td>
  </tr>
  <tr>
    <td>unchecked-icon</td>
    <td><p>未选中状态的图标</p>
</td>
  </tr>
  <tr>
    <td>checked-icon</td>
    <td><p>选中状态的图标</p>
</td>
  </tr>
  <tr>
    <td>indeterminate-icon</td>
    <td><p>不确定状态的图标</p>
</td>
  </tr>
  <tr>
    <td>label</td>
    <td><p>复选框文本</p>
</td>
  </tr>
</tbody>
</table>

# 纸片组件 Chip

纸片组件用于辅助用户输入信息、进行选择、筛选内容或执行相关操作。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/chip.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { Chip } from 'mdui/components/chip.js';
```

使用示例：

```html
<mdui-chip>Chip</mdui-chip>
```

## 示例 {#examples}

### 形状 {#example-variant}

使用 `variant` 属性设置纸片的形状。纸片有 4 种形状，可以根据用途选择：

- `assist`：用于显示与当前上下文相关的辅助操作。例如，在点餐页面，提供分享，收藏等功能。
- `filter`：用于对内容进行筛选。例如，在搜索结果页，对搜索结果进行过滤。
- `input`：用于表示用户输入的信息片段。例如，在 Gmail 中的“收件人”字段中的联系人。
- `suggestion`：用于提供动态生成的推荐信息，以简化用户操作。例如，在聊天应用中猜测用户可能想发送的信息，供用户选择。

```html
<mdui-chip variant="assist">Assist</mdui-chip>
<mdui-chip variant="filter">Filter</mdui-chip>
<mdui-chip variant="input">Input</mdui-chip>
<mdui-chip variant="suggestion">Suggestion</mdui-chip>
```

### 阴影 {#example-elevated}

添加 `elevated` 属性可以使纸片拥有阴影。

```html
<mdui-chip elevated>Chip</mdui-chip>
```

### 图标 {#example-icon}

添加 `icon`、`end-icon` 属性，可以分别在纸片左侧、右侧添加 Material Icons 图标。也可以通过 `icon`、`end-icon` slot 在纸片左侧、右侧添加元素。

```html
<mdui-chip icon="search">Icon</mdui-chip>
<mdui-chip end-icon="arrow_forward">End Icon</mdui-chip>
<mdui-chip>
  Slot
  <mdui-icon slot="icon" name="downloading"></mdui-icon>
  <mdui-icon slot="end-icon" name="attach_file"></mdui-icon>
</mdui-chip>
```

### 链接 {#example-link}

添加 `href` 属性，可以使纸片变为链接，此时还可以使用这些和链接相关的属性：`download`、`target`、`rel`。

```html
<mdui-chip href="https://www.mdui.org" target="_blank">Link</mdui-chip>
```

### 禁用及加载中状态 {#example-disabled}

添加 `disabled` 属性可以禁用纸片；添加 `loading` 属性可以为纸片添加加载中状态。

```html
<mdui-chip disabled>Disabled</mdui-chip>
<mdui-chip loading>Loading</mdui-chip>
<mdui-chip loading disabled>Loading & Disabled</mdui-chip>
```

### 可选中 {#example-selectable}

添加 `selectable` 属性可以使纸片可被选中。

```html
<mdui-chip selectable>Chip</mdui-chip>
```

使用 `selected-icon` 属性可以指定选中状态的 Material Icons 图标名称。也可以通过 `selected-icon` slot 指定选中状态的图标元素。

```html
<mdui-chip selectable selected-icon="favorite">Chip</mdui-chip>
<mdui-chip selectable>
  Chip
  <mdui-icon slot="selected-icon" name="favorite"></mdui-icon>
</mdui-chip>
```

纸片被选中后，`selected` 属性变为 `true`。也可以通过添加 `selected` 属性，使纸片默认处于选中状态。

```html
<mdui-chip selectable selected>Chip</mdui-chip>
```

### 可删除 {#example-deletable}

添加 `deletable` 属性后，纸片右侧会出现一个删除图标。点击该图标会触发 `delete` 事件。您可以通过 `delete-icon` 属性指定删除图标的 Material Icons 图标名，或者通过 `delete-icon` slot 指定删除图标的元素。

```html
<mdui-chip deletable>Chip</mdui-chip>
<mdui-chip deletable delete-icon="backspace">Chip</mdui-chip>
<mdui-chip deletable>
  Chip
  <mdui-icon slot="delete-icon" name="backspace"></mdui-icon>
</mdui-chip>
```

## mdui-chip API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>variant</td>
    <td>variant</td>
    <td>true</td>
    <td>&#39;assist&#39; | &#39;filter&#39; | &#39;input&#39; | &#39;suggestion&#39;</td>
    <td>'assist'</td>
    <td><p>纸片的形状。可选值包括：</p>
<ul>
<li><code>assist</code>：用于显示与当前上下文相关的辅助操作，如在点餐页面提供分享、收藏等功能</li>
<li><code>filter</code>：用于对内容进行筛选，如在搜索结果页过滤搜索结果</li>
<li><code>input</code>：用于表示用户输入的信息片段，如在 Gmail 的“收件人”字段中的联系人</li>
<li><code>suggestion</code>：用于提供动态生成的推荐信息，以简化用户操作，如在聊天应用中预测用户可能想发送的信息</li>
</ul>
</td>
  </tr>
  <tr>
    <td>elevated</td>
    <td>elevated</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否显示阴影</p>
</td>
  </tr>
  <tr>
    <td>selectable</td>
    <td>selectable</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否可选中</p>
</td>
  </tr>
  <tr>
    <td>selected</td>
    <td>selected</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否已选中</p>
</td>
  </tr>
  <tr>
    <td>deletable</td>
    <td>deletable</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否可删除。为 <code>true</code> 时，纸片右侧会显示删除图标</p>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td>icon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>左侧的 Material Icons 图标名。也可以通过 <code>slot=&quot;icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>selected-icon</td>
    <td>selectedIcon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>选中状态下左侧的 Material Icons 图标名。也可以通过 <code>slot=&quot;selected-icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>end-icon</td>
    <td>endIcon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>右侧的 Material Icons 图标名。也可以通过 <code>slot=&quot;end-icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>delete-icon</td>
    <td>deleteIcon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>可删除时，右侧删除图标的 Material Icons 图标名。也可以通过 <code>slot=&quot;delete-icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>href</td>
    <td>href</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>链接的目标 URL。</p>
<p>如果设置了此属性，组件内部将渲染为 <code>&lt;a&gt;</code> 元素，并可以使用链接相关的属性。</p>
</td>
  </tr>
  <tr>
    <td>download</td>
    <td>download</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>下载链接的目标。</p>
<p><strong>Note</strong>：仅在设置了 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>target</td>
    <td>target</td>
    <td>true</td>
    <td>&#39;_blank&#39; | &#39;_parent&#39; | &#39;_self&#39; | &#39;_top&#39;</td>
    <td></td>
    <td><p>链接的打开方式。可选值包括：</p>
<ul>
<li><code>_blank</code>：在新窗口中打开链接</li>
<li><code>_parent</code>：在父框架中打开链接</li>
<li><code>_self</code>：默认。在当前框架中打开链接</li>
<li><code>_top</code>：在整个窗口中打开链接</li>
</ul>
<p><strong>Note</strong>：仅在设置了 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>rel</td>
    <td>rel</td>
    <td>true</td>
    <td>&#39;alternate&#39; | &#39;author&#39; | &#39;bookmark&#39; | &#39;external&#39; | &#39;help&#39; | &#39;license&#39; | &#39;me&#39; | &#39;next&#39; | &#39;nofollow&#39; | &#39;noreferrer&#39; | &#39;opener&#39; | &#39;prev&#39; | &#39;search&#39; | &#39;tag&#39;</td>
    <td></td>
    <td><p>当前文档与被链接文档之间的关系。可选值包括：</p>
<ul>
<li><code>alternate</code>：当前文档的替代版本</li>
<li><code>author</code>：当前文档或文章的作者</li>
<li><code>bookmark</code>：永久链接到最近的祖先章节</li>
<li><code>external</code>：引用的文档与当前文档不在同一站点</li>
<li><code>help</code>：链接到相关的帮助文档</li>
<li><code>license</code>：当前文档的主要内容由被引用文件的版权许可覆盖</li>
<li><code>me</code>：当前文档代表链接内容的所有者</li>
<li><code>next</code>：当前文档是系列中的一部分，被引用的文档是系列的下一个文档</li>
<li><code>nofollow</code>：当前文档的作者或发布者不认可被引用的文件</li>
<li><code>noreferrer</code>：不包含 <code>Referer</code> 头。类似于 <code>noopener</code> 的效果</li>
<li><code>opener</code>：如果超链接会创建一个顶级浏览上下文（即 <code>target</code> 属性值为 <code>_blank</code>），则创建一个辅助浏览上下文</li>
<li><code>prev</code>：当前文档是系列的一部分，被引用的文档是系列的上一个文档</li>
<li><code>search</code>：提供一个资源链接，可用于搜索当前文件及其相关页面</li>
<li><code>tag</code>：提供一个适用于当前文档的标签（由给定地址识别）</li>
</ul>
<p><strong>Note</strong>：仅在指定了 <code>href</code> 属性时可用。</p>
</td>
  </tr>
  <tr>
    <td>autofocus</td>
    <td>autofocus</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否在页面加载完成后自动获取焦点</p>
</td>
  </tr>
  <tr>
    <td>tabindex</td>
    <td>tabIndex</td>
    <td>false</td>
    <td>number</td>
    <td></td>
    <td><p>元素在使用 Tab 键切换焦点时的顺序</p>
</td>
  </tr>
  <tr>
    <td>disabled</td>
    <td>disabled</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否禁用</p>
</td>
  </tr>
  <tr>
    <td>loading</td>
    <td>loading</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否处于加载中状态</p>
</td>
  </tr>
  <tr>
    <td>name</td>
    <td>name</td>
    <td>true</td>
    <td>string</td>
    <td>''</td>
    <td><p>按钮的名称，将与表单数据一起提交。</p>
<p><strong>Note</strong>：仅在未设置 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>value</td>
    <td>value</td>
    <td>true</td>
    <td>string</td>
    <td>''</td>
    <td><p>按钮的初始值，将与表单数据一起提交。</p>
<p><strong>Note</strong>：仅在未设置 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>type</td>
    <td>type</td>
    <td>true</td>
    <td>&#39;submit&#39; | &#39;reset&#39; | &#39;button&#39;</td>
    <td>'button'</td>
    <td><p>按钮的类型。默认类型为 <code>button</code>。可选类型包括：</p>
<ul>
<li><code>submit</code>：点击按钮会提交表单数据到服务器</li>
<li><code>reset</code>：点击按钮会将表单中的所有字段重置为初始值</li>
<li><code>button</code>：此类型的按钮没有默认行为</li>
</ul>
<p><strong>Note</strong>：仅在未指定 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>form</td>
    <td>form</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>关联的 <code>&lt;form&gt;</code> 元素。此属性值应为同一页面中的一个 <code>&lt;form&gt;</code> 元素的 <code>id</code>。</p>
<p>如果未指定此属性，则该元素必须是 <code>&lt;form&gt;</code> 元素的子元素。通过此属性，你可以将元素放置在页面的任何位置，而不仅仅是 <code>&lt;form&gt;</code> 元素的子元素。</p>
<p><strong>Note</strong>：仅在未指定 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>formaction</td>
    <td>formAction</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>指定提交表单的 URL。</p>
<p>如果指定了此属性，将覆盖 <code>&lt;form&gt;</code> 元素的 <code>action</code> 属性。</p>
<p><strong>Note</strong>：仅在未指定 <code>href</code> 属性且 <code>type=&quot;submit&quot;</code> 时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>formenctype</td>
    <td>formEnctype</td>
    <td>true</td>
    <td>&#39;application/x-www-form-urlencoded&#39; | &#39;multipart/form-data&#39; | &#39;text/plain&#39;</td>
    <td></td>
    <td><p>指定提交表单到服务器的内容类型。可选值包括：</p>
<ul>
<li><code>application/x-www-form-urlencoded</code>：未指定该属性时的默认值</li>
<li><code>multipart/form-data</code>：当表单包含 <code>&lt;input type=&quot;file&quot;&gt;</code> 元素时使用</li>
<li><code>text/plain</code>：HTML5 新增，用于调试</li>
</ul>
<p>如果指定了此属性，将覆盖 <code>&lt;form&gt;</code> 元素的 <code>enctype</code> 属性。</p>
<p><strong>Note</strong>：仅在未指定 <code>href</code> 属性且 <code>type=&quot;submit&quot;</code> 时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>formmethod</td>
    <td>formMethod</td>
    <td>true</td>
    <td>&#39;post&#39; | &#39;get&#39;</td>
    <td></td>
    <td><p>指定提交表单时使用的 HTTP 方法。可选值包括：</p>
<ul>
<li><code>post</code>：表单数据包含在表单内容中，发送到服务器</li>
<li><code>get</code>：表单数据以 <code>?</code> 作为分隔符附加到表单的 URI 属性中，生成的 URI 发送到服务器。当表单没有副作用，并且仅包含 ASCII 字符时，使用此方法</li>
</ul>
<p>如果设置了此属性，将覆盖 <code>&lt;form&gt;</code> 元素的 <code>method</code> 属性。</p>
<p><strong>Note</strong>：仅在未设置 <code>href</code> 属性且 <code>type=&quot;submit&quot;</code> 时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>formnovalidate</td>
    <td>formNoValidate</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>如果设置了此属性，表单提交时将不执行表单验证。</p>
<p>如果设置了此属性，将覆盖 <code>&lt;form&gt;</code> 元素的 <code>novalidate</code> 属性。</p>
<p><strong>Note</strong>：仅在未设置 <code>href</code> 属性且 <code>type=&quot;submit&quot;</code> 时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>formtarget</td>
    <td>formTarget</td>
    <td>true</td>
    <td>&#39;_self&#39; | &#39;_blank&#39; | &#39;_parent&#39; | &#39;_top&#39;</td>
    <td></td>
    <td><p>提交表单后接收到的响应应显示在何处。可选值包括：</p>
<ul>
<li><code>_self</code>：默认选项，在当前框架中打开</li>
<li><code>_blank</code>：在新窗口中打开</li>
<li><code>_parent</code>：在父框架中打开</li>
<li><code>_top</code>：在整个窗口中打开</li>
</ul>
<p>如果设置了此属性，将覆盖 <code>&lt;form&gt;</code> 元素的 <code>target</code> 属性。</p>
<p><strong>Note</strong>：仅在未设置 <code>href</code> 属性且 <code>type=&quot;submit&quot;</code> 时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>validity</td>
    <td>false</td>
    <td>ValidityState</td>
    <td></td>
    <td><p>表单验证状态对象，具体参见 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/ValidityState" target="_blank" rel="noopener nofollow"><code>ValidityState</code></a></p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>validationMessage</td>
    <td>false</td>
    <td>string</td>
    <td></td>
    <td><p>如果表单验证未通过，此属性将包含提示信息。如果验证通过，此属性将为空字符串</p>
</td>
  </tr>
</tbody>
</table>

### 方法

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>click(): void</td>
    <td><p>模拟鼠标点击元素</p>
</td>
  </tr>
  <tr>
    <td>focus(options?: FocusOptions): void</td>
    <td><p>将焦点设置到当前元素。</p>
<p>可以传入一个对象作为参数，该对象的属性包括：</p>
<ul>
<li><code>preventScroll</code>：默认情况下，元素获取焦点后，页面会滚动以将该元素滚动到视图中。如果不希望页面滚动，可以将此属性设置为 <code>true</code>。</li>
</ul>
</td>
  </tr>
  <tr>
    <td>blur(): void</td>
    <td><p>移除当前元素的焦点</p>
</td>
  </tr>
  <tr>
    <td>checkValidity(): boolean</td>
    <td><p>检查表单字段是否通过验证。如果未通过，返回 <code>false</code> 并触发 <code>invalid</code> 事件；如果通过，返回 <code>true</code></p>
</td>
  </tr>
  <tr>
    <td>reportValidity(): boolean</td>
    <td><p>检查表单字段是否通过验证。如果未通过，返回 <code>false</code> 并触发 <code>invalid</code> 事件；如果通过，返回 <code>true</code>。</p>
<p>如果验证未通过，还会在组件上显示验证失败的提示。</p>
</td>
  </tr>
  <tr>
    <td>setCustomValidity(message: string): void</td>
    <td><p>设置自定义的错误提示文本。只要这个文本不为空，就表示字段未通过验证</p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>focus</td>
    <td><p>获得焦点时触发</p>
</td>
  </tr>
  <tr>
    <td>blur</td>
    <td><p>失去焦点时触发</p>
</td>
  </tr>
  <tr>
    <td>invalid</td>
    <td><p>表单字段验证未通过时触发</p>
</td>
  </tr>
  <tr>
    <td>change</td>
    <td><p>选中状态变更时触发</p>
</td>
  </tr>
  <tr>
    <td>delete</td>
    <td><p>点击删除图标时触发</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p>纸片文本</p>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td><p>左侧元素</p>
</td>
  </tr>
  <tr>
    <td>end-icon</td>
    <td><p>右侧元素</p>
</td>
  </tr>
  <tr>
    <td>selected-icon</td>
    <td><p>选中状态下的左侧元素</p>
</td>
  </tr>
  <tr>
    <td>delete-icon</td>
    <td><p>可删除时的右侧删除元素</p>
</td>
  </tr>
</tbody>
</table>

### CSS Parts

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>button</td>
    <td><p>内部的 <code>&lt;button&gt;</code> 或 <code>&lt;a&gt;</code> 元素</p>
</td>
  </tr>
  <tr>
    <td>label</td>
    <td><p>纸片文本</p>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td><p>左侧图标</p>
</td>
  </tr>
  <tr>
    <td>end-icon</td>
    <td><p>右侧图标</p>
</td>
  </tr>
  <tr>
    <td>selected-icon</td>
    <td><p>选中状态下的左侧图标</p>
</td>
  </tr>
  <tr>
    <td>delete-icon</td>
    <td><p>可删除时的右侧删除图标</p>
</td>
  </tr>
  <tr>
    <td>loading</td>
    <td><p>加载中状态的 <code>&lt;mdui-circular-progress&gt;</code> 元素</p>
</td>
  </tr>
</tbody>
</table>

### CSS 自定义属性

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>--shape-corner</td>
    <td><p>组件的圆角大小。可以指定一个具体的像素值；但更推荐引用<a href="/docs/2/styles/design-tokens#shape-corner">设计令牌</a></p>
</td>
  </tr>
</tbody>
</table>

# 圆形进度指示器组件 CircularProgress

圆形进度指示器是一个用于显示任务进度的圆形组件，例如数据加载或表单提交等。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/circular-progress.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { CircularProgress } from 'mdui/components/circular-progress.js';
```

使用示例：

```html
<mdui-circular-progress></mdui-circular-progress>
```

## 示例 {#examples}

### 固定进度 {#example-value}

圆形进度指示器默认为不确定的进度，可以通过 `value` 属性设置当前进度，默认进度最大值为 `1`。

```html
<mdui-circular-progress value="0.5"></mdui-circular-progress>
```

可以通过 `max` 属性设置进度的最大值。

```html
<mdui-circular-progress value="30" max="100"></mdui-circular-progress>
```

## mdui-circular-progress API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>max</td>
    <td>max</td>
    <td>true</td>
    <td>number</td>
    <td>1</td>
    <td><p>进度指示器的最大值。默认为 <code>1</code></p>
</td>
  </tr>
  <tr>
    <td>value</td>
    <td>value</td>
    <td>false</td>
    <td>number</td>
    <td></td>
    <td><p>进度指示器的当前值。如果未指定该值，则显示为不确定状态</p>
</td>
  </tr>
</tbody>
</table>

# 折叠面板组件 Collapse

折叠面板组件用于将复杂的内容区域进行分组和隐藏，以保持页面的整洁。

请注意，折叠面板组件本身不包含任何样式，你需要自行添加样式，或者与其他组件一起使用。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/collapse.js';
import 'mdui/components/collapse-item.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { Collapse } from 'mdui/components/collapse.js';
import type { CollapseItem } from 'mdui/components/collapse-item.js';
```

使用示例：

```html
<mdui-collapse>
  <mdui-collapse-item header="first header">first content</mdui-collapse-item>
  <mdui-collapse-item header="second header">second content</mdui-collapse-item>
</mdui-collapse>
```

## 示例 {#examples}

### 面板标题与内容 {#example-header}

通过 `<mdui-collapse-item>` 组件的 `header` 属性可以设置面板头部的文本，也可以通过 `header` slot 来指定面板头部元素。组件的 default slot 用于面板内容。

```html
<mdui-list>
  <mdui-collapse>
    <mdui-collapse-item>
      <mdui-list-item slot="header" icon="near_me">Item 1</mdui-list-item>
      <div style="margin-left: 2.5rem">
        <mdui-list-item>Item 1 - subitem</mdui-list-item>
      </div>
    </mdui-collapse-item>
    <mdui-collapse-item>
      <mdui-list-item slot="header" icon="near_me">Item 2</mdui-list-item>
      <div style="margin-left: 2.5rem">
        <mdui-list-item>Item 2 - subitem</mdui-list-item>
      </div>
    </mdui-collapse-item>
  </mdui-collapse>
</mdui-list>
```

### 手风琴模式 {#example-accordion}

在 `<mdui-collapse>` 组件上添加 `accordion` 属性可以启用手风琴模式，这样一次只会有一个面板处于打开状态。

```html
<mdui-list>
  <mdui-collapse accordion>
    <mdui-collapse-item>
      <mdui-list-item slot="header" icon="near_me">Item 1</mdui-list-item>
      <div style="margin-left: 2.5rem">
        <mdui-list-item>Item 1 - subitem</mdui-list-item>
      </div>
    </mdui-collapse-item>
    <mdui-collapse-item>
      <mdui-list-item slot="header" icon="near_me">Item 2</mdui-list-item>
      <div style="margin-left: 2.5rem">
        <mdui-list-item>Item 2 - subitem</mdui-list-item>
      </div>
    </mdui-collapse-item>
  </mdui-collapse>
</mdui-list>
```

### 设置激活的面板 {#example-value}

通过 `<mdui-collapse>` 组件的 `value` 属性，你可以获取当前打开的面板，或设置需要打开的面板。

在手风琴模式下，`value` 属性的值为字符串，你可以使用 HTML 属性或 JavaScript 属性来操作该属性；在非手风琴模式下，`value` 属性的值为数组，此时只能通过 JavaScript 属性进行操作。

```html
<mdui-list>
  <mdui-list-subheader>手风琴模式</mdui-list-subheader>
  <mdui-collapse accordion value="item-1">
    <mdui-collapse-item value="item-1">
      <mdui-list-item slot="header" icon="near_me">Item 1</mdui-list-item>
      <div style="margin-left: 2.5rem">
        <mdui-list-item>Item 1 - subitem</mdui-list-item>
      </div>
    </mdui-collapse-item>
    <mdui-collapse-item value="item-2">
      <mdui-list-item slot="header" icon="near_me">Item 2</mdui-list-item>
      <div style="margin-left: 2.5rem">
        <mdui-list-item>Item 2 - subitem</mdui-list-item>
      </div>
    </mdui-collapse-item>
  </mdui-collapse>

  <mdui-list-subheader>非手风琴模式</mdui-list-subheader>
  <mdui-collapse class="example-value">
    <mdui-collapse-item value="item-1">
      <mdui-list-item slot="header" icon="near_me">Item 1</mdui-list-item>
      <div style="margin-left: 2.5rem">
        <mdui-list-item>Item 1 - subitem</mdui-list-item>
      </div>
    </mdui-collapse-item>
    <mdui-collapse-item value="item-2">
      <mdui-list-item slot="header" icon="near_me">Item 2</mdui-list-item>
      <div style="margin-left: 2.5rem">
        <mdui-list-item>Item 2 - subitem</mdui-list-item>
      </div>
    </mdui-collapse-item>
  </mdui-collapse>
</mdui-list>

<script>
  const collapse = document.querySelector(".example-value");
  collapse.value = ["item-1", "item-2"];
</script>
```

### 禁用状态 {#example-disabled}

通过在 `<mdui-collapse>` 组件上添加 `disabled` 属性，可以禁用整个折叠面板组。同样，通过在 `<mdui-collapse-item>` 组件上添加 `disabled` 属性，可以禁用特定的折叠面板。

```html
<mdui-list>
  <mdui-list-subheader>全部禁用</mdui-list-subheader>
  <mdui-collapse disabled>
    <mdui-collapse-item>
      <mdui-list-item slot="header" icon="near_me">Item 1</mdui-list-item>
      <div style="margin-left: 2.5rem">
        <mdui-list-item>Item 1 - subitem</mdui-list-item>
      </div>
    </mdui-collapse-item>
    <mdui-collapse-item>
      <mdui-list-item slot="header" icon="near_me">Item 2</mdui-list-item>
      <div style="margin-left: 2.5rem">
        <mdui-list-item>Item 2 - subitem</mdui-list-item>
      </div>
    </mdui-collapse-item>
  </mdui-collapse>

  <mdui-list-subheader>禁用第一个面板</mdui-list-subheader>
  <mdui-collapse>
    <mdui-collapse-item disabled>
      <mdui-list-item slot="header" icon="near_me">Item 1</mdui-list-item>
      <div style="margin-left: 2.5rem">
        <mdui-list-item>Item 1 - subitem</mdui-list-item>
      </div>
    </mdui-collapse-item>
    <mdui-collapse-item>
      <mdui-list-item slot="header" icon="near_me">Item 2</mdui-list-item>
      <div style="margin-left: 2.5rem">
        <mdui-list-item>Item 2 - subitem</mdui-list-item>
      </div>
    </mdui-collapse-item>
  </mdui-collapse>
</mdui-list>
```

### 触发折叠的元素 {#example-trigger}

默认情况下，点击整个面板头部区域会触发折叠。你可以通过设置 `<mdui-collapse-item>` 组件的 `trigger` 属性来指定触发折叠的元素。`trigger` 属性可以是 CSS 选择器或 DOM 元素。

```html
<mdui-list>
  <mdui-collapse>
    <mdui-collapse-item trigger=".example-trigger">
      <mdui-list-item slot="header" icon="near_me">
        Item 1
        <mdui-icon slot="end-icon" class="example-trigger" name="keyboard_arrow_down"></mdui-icon>
      </mdui-list-item>
      <div style="margin-left: 2.5rem">
        <mdui-list-item>Item 1 - subitem</mdui-list-item>
      </div>
    </mdui-collapse-item>
  </mdui-collapse>
</mdui-list>
```

## mdui-collapse-item API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>value</td>
    <td>value</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>此折叠面板项的值</p>
</td>
  </tr>
  <tr>
    <td>header</td>
    <td>header</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>此折叠面板项的头部文本</p>
</td>
  </tr>
  <tr>
    <td>disabled</td>
    <td>disabled</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否禁用此折叠面板项</p>
</td>
  </tr>
  <tr>
    <td>trigger</td>
    <td>trigger</td>
    <td>false</td>
    <td>string | HTMLElement | JQ&lt;HTMLElement&gt;</td>
    <td></td>
    <td><p>点击该元素时触发折叠，值可以是 CSS 选择器、DOM 元素、或 <a href="/docs/2/functions/jq">JQ 对象</a>。默认为点击整个 header 区域触发</p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>open</td>
    <td><p>开始打开时，事件被触发</p>
</td>
  </tr>
  <tr>
    <td>opened</td>
    <td><p>打开动画完成时，事件被触发</p>
</td>
  </tr>
  <tr>
    <td>close</td>
    <td><p>开始关闭时，事件被触发</p>
</td>
  </tr>
  <tr>
    <td>closed</td>
    <td><p>关闭动画完成时，事件被触发</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p>折叠面板项的正文内容</p>
</td>
  </tr>
  <tr>
    <td>header</td>
    <td><p>折叠面板项的头部内容</p>
</td>
  </tr>
</tbody>
</table>

### CSS Parts

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>header</td>
    <td><p>折叠面板的头部内容</p>
</td>
  </tr>
  <tr>
    <td>body</td>
    <td><p>折叠面板的正文内容</p>
</td>
  </tr>
</tbody>
</table>

## mdui-collapse API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>accordion</td>
    <td>accordion</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否启用手风琴模式</p>
</td>
  </tr>
  <tr>
    <td>value</td>
    <td>value</td>
    <td>false</td>
    <td>string | string[]</td>
    <td></td>
    <td><p>当前展开的 <code>&lt;mdui-collapse-item&gt;</code> 的值</p>
<p><strong>Note</strong>：该属性的 HTML 属性始终为字符串，只有在 <code>accordion</code> 为 <code>true</code> 时，才能设置初始值；该属性的 JavaScript 属性值在 <code>accordion</code> 为 <code>true</code> 时为字符串，在 <code>accordion</code> 为 <code>false</code> 时为字符串数组。因此，当 <code>accordion</code> 为 <code>false</code> 时，只能通过修改 JavaScript 属性值来改变此值。</p>
</td>
  </tr>
  <tr>
    <td>disabled</td>
    <td>disabled</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否禁用此折叠面板</p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>change</td>
    <td><p>当前展开的折叠面板项变化时触发</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p><code>&lt;mdui-collapse-item&gt;</code> 组件</p>
</td>
  </tr>
</tbody>
</table>

# 对话框组件 Dialog

对话框用于在用户的操作流程中提供重要提示。

除了直接使用该组件外，mdui 还提供了四个函数：[`mdui.dialog`](/zh-cn/docs/2/functions/dialog)、[`mdui.alert`](/zh-cn/docs/2/functions/alert)、[`mdui.confirm`](/zh-cn/docs/2/functions/confirm)、[`mdui.prompt`](/zh-cn/docs/2/functions/prompt)。这些函数可以简化 Dialog 组件的使用。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/dialog.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { Dialog } from 'mdui/components/dialog.js';
```

使用示例：

```html
<mdui-dialog class="example-dialog">
  Dialog
  <mdui-button>关闭</mdui-button>
</mdui-dialog>

<mdui-button>打开对话框</mdui-button>

<script>
  const dialog = document.querySelector(".example-dialog");
  const openButton = dialog.nextElementSibling;
  const closeButton = dialog.querySelector("mdui-button");

  openButton.addEventListener("click", () => dialog.open = true);
  closeButton.addEventListener("click", () => dialog.open = false);
</script>
```

## 示例 {#examples}

### 点击遮罩关闭 {#example-close-on-overlay-click}

添加 `close-on-overlay-click` 属性，点击遮罩层时会关闭对话框。

```html
<mdui-dialog close-on-overlay-click class="example-overlay">Dialog</mdui-dialog>

<mdui-button>打开对话框</mdui-button>

<script>
  const dialog = document.querySelector(".example-overlay");
  const openButton = dialog.nextElementSibling;

  openButton.addEventListener("click", () => dialog.open = true);
</script>
```

### 按下 ESC 键关闭 {#example-close-on-esc}

添加 `close-on-esc` 属性，按下 ESC 键时会关闭对话框。

```html
<mdui-dialog
  close-on-esc
  close-on-overlay-click
  class="example-ecs"
>Dialog</mdui-dialog>

<mdui-button>打开对话框</mdui-button>

<script>
  const dialog = document.querySelector(".example-ecs");
  const openButton = dialog.nextElementSibling;

  openButton.addEventListener("click", () => dialog.open = true);
</script>
```

### 全屏 {#example-fullscreen}

添加 `fullscreen` 属性，对话框会全屏显示。

```html
<mdui-dialog fullscreen class="example-fullscreen">
  Dialog
  <mdui-button>关闭</mdui-button>
</mdui-dialog>

<mdui-button>打开对话框</mdui-button>

<script>
  const dialog = document.querySelector(".example-fullscreen");
  const openButton = dialog.nextElementSibling;
  const closeButton = dialog.querySelector("mdui-button");

  openButton.addEventListener("click", () => dialog.open = true);
  closeButton.addEventListener("click", () => dialog.open = false);
</script>
```

### 图标 {#example-icon}

设置 `icon` 属性，对话框上方会添加 Material Icons 图标。

```html
<mdui-dialog
  icon="restart_alt"
  close-on-overlay-click
  class="example-icon"
>Dialog</mdui-dialog>

<mdui-button>打开对话框</mdui-button>

<script>
  const dialog = document.querySelector(".example-icon");
  const openButton = dialog.nextElementSibling;

  openButton.addEventListener("click", () => dialog.open = true);
</script>
```

也可以通过 `icon` slot 在对话框上方添加图标元素。

```html
<mdui-dialog close-on-overlay-click class="example-icon-slot">
  Dialog
  <mdui-icon slot="icon" name="restart_alt"></mdui-icon>
</mdui-dialog>

<mdui-button>打开对话框</mdui-button>

<script>
  const dialog = document.querySelector(".example-icon-slot");
  const openButton = dialog.nextElementSibling;

  openButton.addEventListener("click", () => dialog.open = true);
</script>
```

### 标题与描述 {#example-headline}

通过 `headline` 和 `description` 属性设置对话框的标题和描述。

```html
<mdui-dialog
  headline="Delete selected images?"
  description="Images will be permenantly removed from you account and all synced devices."
  close-on-overlay-click
  class="example-headline"
></mdui-dialog>

<mdui-button>打开对话框</mdui-button>

<script>
  const dialog = document.querySelector(".example-headline");
  const openButton = dialog.nextElementSibling;

  openButton.addEventListener("click", () => dialog.open = true);
</script>
```

也可以通过 `headline` 和 `description` slot 来设置对话框的标题元素和描述元素。

```html
<mdui-dialog close-on-overlay-click class="example-headline-slot">
  <span slot="headline">Delete selected images?</span>
  <span slot="description">Images will be permenantly removed from you account and all synced devices.</span>
</mdui-dialog>

<mdui-button>打开对话框</mdui-button>

<script>
  const dialog = document.querySelector(".example-headline-slot");
  const openButton = dialog.nextElementSibling;

  openButton.addEventListener("click", () => dialog.open = true);
</script>
```

### 底部操作按钮 {#example-action}

可以通过 `action` slot 添加底部操作按钮。

```html
<mdui-dialog
  close-on-overlay-click
  headline="Delete selected images?"
  class="example-action"
>
  <mdui-button slot="action" variant="text">取消</mdui-button>
  <mdui-button slot="action" variant="tonal">删除</mdui-button>
</mdui-dialog>

<mdui-button>打开对话框</mdui-button>

<script>
  const dialog = document.querySelector(".example-action");
  const openButton = dialog.nextElementSibling;

  openButton.addEventListener("click", () => dialog.open = true);
</script>
```

添加 `stacked-actions` 属性，使底部操作按钮垂直排列。

```html
<mdui-dialog
  stacked-actions
  close-on-overlay-click
  headline="Use location service?"
  class="example-stacked-actions"
>
  <mdui-button slot="action" variant="text">Turn on speed boost</mdui-button>
  <mdui-button slot="action" variant="text">No thanks</mdui-button>
</mdui-dialog>

<mdui-button>打开对话框</mdui-button>

<script>
  const dialog = document.querySelector(".example-stacked-actions");
  const openButton = dialog.nextElementSibling;

  openButton.addEventListener("click", () => dialog.open = true);
</script>
```

### 顶部内容 {#example-header}

可以通过 `header` slot 设置对话框顶部内容。

```html
<mdui-dialog close-on-overlay-click class="example-header">
  <mdui-top-app-bar slot="header">
    <mdui-button-icon icon="close"></mdui-button-icon>
    <mdui-top-app-bar-title>Title</mdui-top-app-bar-title>
    <mdui-button variant="text">Save</mdui-button>
  </mdui-top-app-bar>
  <div style="height: 100px"></div>
</mdui-dialog>

<mdui-button>打开对话框</mdui-button>

<script>
  const dialog = document.querySelector(".example-header");
  const openButton = dialog.nextElementSibling;

  openButton.addEventListener("click", () => dialog.open = true);
</script>
```

## mdui-dialog API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>icon</td>
    <td>icon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>顶部的 Material Icons 图标名。也可以通过 <code>slot=&quot;icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>headline</td>
    <td>headline</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>标题。也可以通过 <code>slot=&quot;headline&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>description</td>
    <td>description</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>标题下方的文本。也可以通过 <code>slot=&quot;description&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>open</td>
    <td>open</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否打开对话框</p>
</td>
  </tr>
  <tr>
    <td>fullscreen</td>
    <td>fullscreen</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否全屏显示对话框</p>
</td>
  </tr>
  <tr>
    <td>close-on-esc</td>
    <td>closeOnEsc</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否允许按下 ESC 键关闭对话框</p>
</td>
  </tr>
  <tr>
    <td>close-on-overlay-click</td>
    <td>closeOnOverlayClick</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否允许点击遮罩层关闭对话框</p>
</td>
  </tr>
  <tr>
    <td>stacked-actions</td>
    <td>stackedActions</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否垂直排列底部操作按钮</p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>open</td>
    <td><p>对话框开始打开时触发。可以通过调用 <code>event.preventDefault()</code> 阻止对话框打开</p>
</td>
  </tr>
  <tr>
    <td>opened</td>
    <td><p>对话框打开动画完成后触发</p>
</td>
  </tr>
  <tr>
    <td>close</td>
    <td><p>对话框开始关闭时触发。可以通过调用 <code>event.preventDefault()</code> 阻止对话框关闭</p>
</td>
  </tr>
  <tr>
    <td>closed</td>
    <td><p>对话框关闭动画完成后触发</p>
</td>
  </tr>
  <tr>
    <td>overlay-click</td>
    <td><p>点击遮罩层时触发</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>header</td>
    <td><p>顶部元素，默认包含 <code>icon</code> slot 和 <code>headline</code> slot</p>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td><p>顶部图标</p>
</td>
  </tr>
  <tr>
    <td>headline</td>
    <td><p>顶部标题</p>
</td>
  </tr>
  <tr>
    <td>description</td>
    <td><p>标题下方的文本</p>
</td>
  </tr>
  <tr>
    <td>默认</td>
    <td><p>对话框主体内容</p>
</td>
  </tr>
  <tr>
    <td>action</td>
    <td><p>底部操作栏中的元素</p>
</td>
  </tr>
</tbody>
</table>

### CSS Parts

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>overlay</td>
    <td><p>遮罩层</p>
</td>
  </tr>
  <tr>
    <td>panel</td>
    <td><p>对话框容器</p>
</td>
  </tr>
  <tr>
    <td>header</td>
    <td><p>对话框 header 部分，包含 icon 和 headline</p>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td><p>顶部图标，位于 header 中</p>
</td>
  </tr>
  <tr>
    <td>headline</td>
    <td><p>顶部标题，位于 header 中</p>
</td>
  </tr>
  <tr>
    <td>body</td>
    <td><p>对话框 body 部分</p>
</td>
  </tr>
  <tr>
    <td>description</td>
    <td><p>副文本部分，位于 body 中</p>
</td>
  </tr>
  <tr>
    <td>action</td>
    <td><p>底部操作按钮</p>
</td>
  </tr>
</tbody>
</table>

### CSS 自定义属性

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>--shape-corner</td>
    <td><p>组件的圆角大小。可以指定一个具体的像素值；但更推荐引用<a href="/docs/2/styles/design-tokens#shape-corner">设计令牌</a></p>
</td>
  </tr>
  <tr>
    <td>--z-index</td>
    <td><p>组件的 CSS <code>z-index</code> 值</p>
</td>
  </tr>
</tbody>
</table>

# 分割线组件 Divider

分隔线是一条细线，用于在列表和容器中对内容进行分组。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/divider.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { Divider } from 'mdui/components/divider.js';
```

使用示例：

```html
<mdui-divider></mdui-divider>
```

## 示例 {#examples}

### 垂直分割线 {#example-vertical}

添加 `vertical` 属性，可以使分割线垂直显示。

```html
<div style="height: 80px;padding: 0 20px">
  <mdui-divider vertical></mdui-divider>
</div>
```

### 左侧缩进 {#example-inset}

添加 `inset` 属性，可以使分割线左侧缩进。这通常用于列表中，以使分割线和左侧文本对齐。

```html
<mdui-list>
  <mdui-list-item>Item 1</mdui-list-item>
  <mdui-divider inset></mdui-divider>
  <mdui-list-item>Item 2</mdui-list-item>
</mdui-list>
```

### 两侧缩进 {#example-middle}

添加 `middle` 属性，可以使分割线两侧缩进。

```html
<mdui-list>
  <mdui-list-item>Item 1</mdui-list-item>
  <mdui-divider middle></mdui-divider>
  <mdui-list-item>Item 2</mdui-list-item>
</mdui-list>
```

## mdui-divider API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>vertical</td>
    <td>vertical</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否为垂直分割线</p>
</td>
  </tr>
  <tr>
    <td>inset</td>
    <td>inset</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否进行左侧缩进</p>
</td>
  </tr>
  <tr>
    <td>middle</td>
    <td>middle</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否进行左右两侧缩进</p>
</td>
  </tr>
</tbody>
</table>

# 下拉组件 Dropdown

下拉组件用于在一个弹出的控件中展示特定内容，通常与菜单组件一起使用。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/dropdown.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { Dropdown } from 'mdui/components/dropdown.js';
```

使用示例：

```html
<mdui-dropdown>
  <mdui-button slot="trigger">open dropdown</mdui-button>
  <mdui-menu>
    <mdui-menu-item>Item 1</mdui-menu-item>
    <mdui-menu-item>Item 2</mdui-menu-item>
  </mdui-menu>
</mdui-dropdown>
```

## 示例 {#examples}

### 禁用状态 {#example-disabled}

添加 `disabled` 属性可以禁用下拉组件。

```html
<mdui-dropdown disabled>
  <mdui-button slot="trigger">open dropdown</mdui-button>
  <mdui-menu>
    <mdui-menu-item>Item 1</mdui-menu-item>
    <mdui-menu-item>Item 2</mdui-menu-item>
  </mdui-menu>
</mdui-dropdown>
```

### 打开位置 {#example-placement}

使用 `placement` 属性可以设置下拉组件的打开位置。

```html
<mdui-dropdown placement="right-start">
  <mdui-button slot="trigger">open dropdown</mdui-button>
  <mdui-menu>
    <mdui-menu-item>Item 1</mdui-menu-item>
    <mdui-menu-item>Item 2</mdui-menu-item>
  </mdui-menu>
</mdui-dropdown>
```

### 触发方式 {#example-trigger}

使用 `trigger` 属性可以设置下拉组件的触发方式。

```html
<mdui-dropdown trigger="hover">
  <mdui-button slot="trigger">open dropdown</mdui-button>
  <mdui-menu>
    <mdui-menu-item>Item 1</mdui-menu-item>
    <mdui-menu-item>Item 2</mdui-menu-item>
  </mdui-menu>
</mdui-dropdown>
```

### 在光标处打开 {#example-open-on-pointer}

添加 `open-on-pointer` 属性可以在光标处打开下拉组件。通常与 `trigger="contextmenu"` 配合使用，实现用鼠标右键打开菜单。

```html
<mdui-dropdown trigger="contextmenu" open-on-pointer>
  <mdui-card slot="trigger" style="width:100%;height: 80px">在此区域使用鼠标右键打开菜单</mdui-card>
  <mdui-menu>
    <mdui-menu-item>Item 1</mdui-menu-item>
    <mdui-menu-item>Item 2</mdui-menu-item>
  </mdui-menu>
</mdui-dropdown>
```

### 保持菜单打开状态 {#example-stay-open-on-click}

在下拉组件中使用菜单时，默认点击菜单项后，会自动关闭下拉组件。通过添加 `stay-open-on-click` 属性，可以在点击菜单项时，保持下拉组件的打开状态。

```html
<mdui-dropdown trigger="click" stay-open-on-click>
  <mdui-button slot="trigger">open dropdown</mdui-button>
  <mdui-menu>
    <mdui-menu-item>Item 1</mdui-menu-item>
    <mdui-menu-item>Item 2</mdui-menu-item>
  </mdui-menu>
</mdui-dropdown>
```

### 打开/关闭的延时 {#example-delay}

在设置了 `trigger="hover"` 时，可以通过 `open-delay`、`close-delay` 属性设置打开和关闭的延时。

```html
<mdui-dropdown trigger="hover" open-delay="1000" close-delay="1000">
  <mdui-button slot="trigger">open dropdown</mdui-button>
  <mdui-menu>
    <mdui-menu-item>Item 1</mdui-menu-item>
    <mdui-menu-item>Item 2</mdui-menu-item>
  </mdui-menu>
</mdui-dropdown>
```

## mdui-dropdown API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>open</td>
    <td>open</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否打开下拉组件</p>
</td>
  </tr>
  <tr>
    <td>disabled</td>
    <td>disabled</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否禁用下拉组件</p>
</td>
  </tr>
  <tr>
    <td>trigger</td>
    <td>trigger</td>
    <td>true</td>
    <td>&#39;click&#39; | &#39;hover&#39; | &#39;focus&#39; | &#39;contextmenu&#39; | &#39;manual&#39; | string</td>
    <td>'click'</td>
    <td><p>下拉组件的触发方式，支持多个值，用空格分隔。可选值包括：</p>
<ul>
<li><code>click</code>：点击触发</li>
<li><code>hover</code>：鼠标悬浮触发</li>
<li><code>focus</code>：聚焦触发</li>
<li><code>contextmenu</code>：鼠标右键点击、或触摸长按触发</li>
<li><code>manual</code>：仅能通过编程方式打开和关闭下拉组件，不能再指定其他触发方式</li>
</ul>
</td>
  </tr>
  <tr>
    <td>placement</td>
    <td>placement</td>
    <td>true</td>
    <td>&#39;auto&#39; | &#39;top-start&#39; | &#39;top&#39; | &#39;top-end&#39; | &#39;bottom-start&#39; | &#39;bottom&#39; | &#39;bottom-end&#39; | &#39;left-start&#39; | &#39;left&#39; | &#39;left-end&#39; | &#39;right-start&#39; | &#39;right&#39; | &#39;right-end&#39;</td>
    <td>'auto'</td>
    <td><p>下拉组件内容的位置。可选值包括：</p>
<ul>
<li><code>auto</code>：自动判断位置</li>
<li><code>top-start</code>：上方左对齐</li>
<li><code>top</code>：上方居中</li>
<li><code>top-end</code>：上方右对齐</li>
<li><code>bottom-start</code>：下方左对齐</li>
<li><code>bottom</code>：下方居中</li>
<li><code>bottom-end</code>：下方右对齐</li>
<li><code>left-start</code>：左侧顶部对齐</li>
<li><code>left</code>：左侧居中</li>
<li><code>left-end</code>：左侧底部对齐</li>
<li><code>right-start</code>：右侧顶部对齐</li>
<li><code>right</code>：右侧居中</li>
<li><code>right-end</code>：右侧底部对齐</li>
</ul>
</td>
  </tr>
  <tr>
    <td>stay-open-on-click</td>
    <td>stayOpenOnClick</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>点击 <a href="/docs/2/components/menu#menu-item-api"><code>&lt;mdui-menu-item&gt;</code></a> 后，下拉组件是否保持打开状态</p>
</td>
  </tr>
  <tr>
    <td>open-delay</td>
    <td>openDelay</td>
    <td>true</td>
    <td>number</td>
    <td>150</td>
    <td><p>鼠标悬浮触发下拉组件打开的延时，单位为毫秒</p>
</td>
  </tr>
  <tr>
    <td>close-delay</td>
    <td>closeDelay</td>
    <td>true</td>
    <td>number</td>
    <td>150</td>
    <td><p>鼠标悬浮触发下拉组件关闭的延时，单位为毫秒</p>
</td>
  </tr>
  <tr>
    <td>open-on-pointer</td>
    <td>openOnPointer</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否在触发下拉组件的光标位置打开下拉组件，常用于打开鼠标右键菜单</p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>open</td>
    <td><p>下拉组件开始打开时，事件被触发。可以通过调用 <code>event.preventDefault()</code> 阻止下拉组件打开</p>
</td>
  </tr>
  <tr>
    <td>opened</td>
    <td><p>下拉组件打开动画完成时，事件被触发</p>
</td>
  </tr>
  <tr>
    <td>close</td>
    <td><p>下拉组件开始关闭时，事件被触发。可以通过调用 <code>event.preventDefault()</code> 阻止下拉组件关闭</p>
</td>
  </tr>
  <tr>
    <td>closed</td>
    <td><p>下拉组件关闭动画完成时，事件被触发</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p>下拉组件的内容</p>
</td>
  </tr>
  <tr>
    <td>trigger</td>
    <td><p>触发下拉组件的元素，例如 <a href="/docs/2/components/button"><code>&lt;mdui-button&gt;</code></a> 元素</p>
</td>
  </tr>
</tbody>
</table>

### CSS Parts

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>trigger</td>
    <td><p>触发下拉组件的元素的容器，即 <code>trigger</code> slot 的容器</p>
</td>
  </tr>
  <tr>
    <td>panel</td>
    <td><p>下拉组件内容的容器</p>
</td>
  </tr>
</tbody>
</table>

### CSS 自定义属性

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>--z-index</td>
    <td><p>组件的 CSS <code>z-index</code> 值</p>
</td>
  </tr>
</tbody>
</table>

# 浮动操作按钮组件 Fab

浮动操作按钮（FAB）用于突出显示页面上的主要操作，它将关键操作置于易于访问的位置。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/fab.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { Fab } from 'mdui/components/fab.js';
```

使用示例：

```html
<mdui-fab icon="edit"></mdui-fab>
```

## 示例 {#examples}

### 图标 {#example-icon}

使用 `icon` 属性指定 Material Icons 图标名称。也可以通过 `icon` slot 指定图标元素。

```html
<mdui-fab icon="edit"></mdui-fab>
<mdui-fab>
  <mdui-icon slot="icon" name="edit"></mdui-icon>
</mdui-fab>
```

### 展开状态 {#example-extended}

添加 `extended` 属性可以将 FAB 设置为展开状态，此时 default slot 中的文本将显示出来。

```html
<mdui-fab extended icon="edit">Compose</mdui-fab>
```

### 形状 {#example-variant}

使用 `variant` 属性可以设置 FAB 的形状。

```html
<mdui-fab variant="primary" icon="edit"></mdui-fab>
<mdui-fab variant="surface" icon="edit"></mdui-fab>
<mdui-fab variant="secondary" icon="edit"></mdui-fab>
<mdui-fab variant="tertiary" icon="edit"></mdui-fab>
```

### 大小 {#example-size}

使用 `size` 属性可以设置 FAB 的大小。

```html
<mdui-fab size="small" icon="edit"></mdui-fab>
<mdui-fab size="normal" icon="edit"></mdui-fab>
<mdui-fab size="large" icon="edit"></mdui-fab>
```

### 链接 {#example-link}

添加 `href` 属性，可以使 FAB 具有链接功能，此时还可以使用与链接相关的属性：`download`、`target`、`rel`。

```html
<mdui-fab icon="edit" href="https://www.mdui.org" target="_blank"></mdui-fab>
```

### 禁用及加载中状态 {#example-disabled}

添加 `disabled` 属性可以禁用 FAB；添加 `loading` 属性可以为 FAB 添加加载中状态。

```html
<mdui-fab disabled icon="edit"></mdui-fab>
<mdui-fab loading icon="edit"></mdui-fab>
<mdui-fab loading disabled icon="edit"></mdui-fab>
```

## mdui-fab API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>variant</td>
    <td>variant</td>
    <td>true</td>
    <td>&#39;primary&#39; | &#39;surface&#39; | &#39;secondary&#39; | &#39;tertiary&#39;</td>
    <td>'primary'</td>
    <td><p>FAB 的形状，此组件的不同形状之间只有颜色不一样。可选值包括：</p>
<ul>
<li><code>primary</code>：使用 Primary container 背景色</li>
<li><code>surface</code>：使用 Surface container high 背景色</li>
<li><code>secondary</code>：使用 Secondary container 背景色</li>
<li><code>tertiary</code>：使用 Tertiary container 背景色</li>
</ul>
</td>
  </tr>
  <tr>
    <td>size</td>
    <td>size</td>
    <td>true</td>
    <td>&#39;normal&#39; | &#39;small&#39; | &#39;large&#39;</td>
    <td>'normal'</td>
    <td><p>FAB 的大小。可选值包括：</p>
<ul>
<li><code>normal</code>：普通大小 FAB</li>
<li><code>small</code>：小型 FAB</li>
<li><code>large</code>：大型 FAB</li>
</ul>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td>icon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>Material Icons 图标名。也可以通过 <code>slot=&quot;icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>extended</td>
    <td>extended</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否为展开状态</p>
</td>
  </tr>
  <tr>
    <td>href</td>
    <td>href</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>链接的目标 URL。</p>
<p>如果设置了此属性，组件内部将渲染为 <code>&lt;a&gt;</code> 元素，并可以使用链接相关的属性。</p>
</td>
  </tr>
  <tr>
    <td>download</td>
    <td>download</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>下载链接的目标。</p>
<p><strong>Note</strong>：仅在设置了 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>target</td>
    <td>target</td>
    <td>true</td>
    <td>&#39;_blank&#39; | &#39;_parent&#39; | &#39;_self&#39; | &#39;_top&#39;</td>
    <td></td>
    <td><p>链接的打开方式。可选值包括：</p>
<ul>
<li><code>_blank</code>：在新窗口中打开链接</li>
<li><code>_parent</code>：在父框架中打开链接</li>
<li><code>_self</code>：默认。在当前框架中打开链接</li>
<li><code>_top</code>：在整个窗口中打开链接</li>
</ul>
<p><strong>Note</strong>：仅在设置了 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>rel</td>
    <td>rel</td>
    <td>true</td>
    <td>&#39;alternate&#39; | &#39;author&#39; | &#39;bookmark&#39; | &#39;external&#39; | &#39;help&#39; | &#39;license&#39; | &#39;me&#39; | &#39;next&#39; | &#39;nofollow&#39; | &#39;noreferrer&#39; | &#39;opener&#39; | &#39;prev&#39; | &#39;search&#39; | &#39;tag&#39;</td>
    <td></td>
    <td><p>当前文档与被链接文档之间的关系。可选值包括：</p>
<ul>
<li><code>alternate</code>：当前文档的替代版本</li>
<li><code>author</code>：当前文档或文章的作者</li>
<li><code>bookmark</code>：永久链接到最近的祖先章节</li>
<li><code>external</code>：引用的文档与当前文档不在同一站点</li>
<li><code>help</code>：链接到相关的帮助文档</li>
<li><code>license</code>：当前文档的主要内容由被引用文件的版权许可覆盖</li>
<li><code>me</code>：当前文档代表链接内容的所有者</li>
<li><code>next</code>：当前文档是系列中的一部分，被引用的文档是系列的下一个文档</li>
<li><code>nofollow</code>：当前文档的作者或发布者不认可被引用的文件</li>
<li><code>noreferrer</code>：不包含 <code>Referer</code> 头。类似于 <code>noopener</code> 的效果</li>
<li><code>opener</code>：如果超链接会创建一个顶级浏览上下文（即 <code>target</code> 属性值为 <code>_blank</code>），则创建一个辅助浏览上下文</li>
<li><code>prev</code>：当前文档是系列的一部分，被引用的文档是系列的上一个文档</li>
<li><code>search</code>：提供一个资源链接，可用于搜索当前文件及其相关页面</li>
<li><code>tag</code>：提供一个适用于当前文档的标签（由给定地址识别）</li>
</ul>
<p><strong>Note</strong>：仅在指定了 <code>href</code> 属性时可用。</p>
</td>
  </tr>
  <tr>
    <td>autofocus</td>
    <td>autofocus</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否在页面加载完成后自动获取焦点</p>
</td>
  </tr>
  <tr>
    <td>tabindex</td>
    <td>tabIndex</td>
    <td>false</td>
    <td>number</td>
    <td></td>
    <td><p>元素在使用 Tab 键切换焦点时的顺序</p>
</td>
  </tr>
  <tr>
    <td>disabled</td>
    <td>disabled</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否禁用</p>
</td>
  </tr>
  <tr>
    <td>loading</td>
    <td>loading</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否处于加载中状态</p>
</td>
  </tr>
  <tr>
    <td>name</td>
    <td>name</td>
    <td>true</td>
    <td>string</td>
    <td>''</td>
    <td><p>按钮的名称，将与表单数据一起提交。</p>
<p><strong>Note</strong>：仅在未设置 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>value</td>
    <td>value</td>
    <td>true</td>
    <td>string</td>
    <td>''</td>
    <td><p>按钮的初始值，将与表单数据一起提交。</p>
<p><strong>Note</strong>：仅在未设置 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>type</td>
    <td>type</td>
    <td>true</td>
    <td>&#39;submit&#39; | &#39;reset&#39; | &#39;button&#39;</td>
    <td>'button'</td>
    <td><p>按钮的类型。默认类型为 <code>button</code>。可选类型包括：</p>
<ul>
<li><code>submit</code>：点击按钮会提交表单数据到服务器</li>
<li><code>reset</code>：点击按钮会将表单中的所有字段重置为初始值</li>
<li><code>button</code>：此类型的按钮没有默认行为</li>
</ul>
<p><strong>Note</strong>：仅在未指定 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>form</td>
    <td>form</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>关联的 <code>&lt;form&gt;</code> 元素。此属性值应为同一页面中的一个 <code>&lt;form&gt;</code> 元素的 <code>id</code>。</p>
<p>如果未指定此属性，则该元素必须是 <code>&lt;form&gt;</code> 元素的子元素。通过此属性，你可以将元素放置在页面的任何位置，而不仅仅是 <code>&lt;form&gt;</code> 元素的子元素。</p>
<p><strong>Note</strong>：仅在未指定 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>formaction</td>
    <td>formAction</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>指定提交表单的 URL。</p>
<p>如果指定了此属性，将覆盖 <code>&lt;form&gt;</code> 元素的 <code>action</code> 属性。</p>
<p><strong>Note</strong>：仅在未指定 <code>href</code> 属性且 <code>type=&quot;submit&quot;</code> 时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>formenctype</td>
    <td>formEnctype</td>
    <td>true</td>
    <td>&#39;application/x-www-form-urlencoded&#39; | &#39;multipart/form-data&#39; | &#39;text/plain&#39;</td>
    <td></td>
    <td><p>指定提交表单到服务器的内容类型。可选值包括：</p>
<ul>
<li><code>application/x-www-form-urlencoded</code>：未指定该属性时的默认值</li>
<li><code>multipart/form-data</code>：当表单包含 <code>&lt;input type=&quot;file&quot;&gt;</code> 元素时使用</li>
<li><code>text/plain</code>：HTML5 新增，用于调试</li>
</ul>
<p>如果指定了此属性，将覆盖 <code>&lt;form&gt;</code> 元素的 <code>enctype</code> 属性。</p>
<p><strong>Note</strong>：仅在未指定 <code>href</code> 属性且 <code>type=&quot;submit&quot;</code> 时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>formmethod</td>
    <td>formMethod</td>
    <td>true</td>
    <td>&#39;post&#39; | &#39;get&#39;</td>
    <td></td>
    <td><p>指定提交表单时使用的 HTTP 方法。可选值包括：</p>
<ul>
<li><code>post</code>：表单数据包含在表单内容中，发送到服务器</li>
<li><code>get</code>：表单数据以 <code>?</code> 作为分隔符附加到表单的 URI 属性中，生成的 URI 发送到服务器。当表单没有副作用，并且仅包含 ASCII 字符时，使用此方法</li>
</ul>
<p>如果设置了此属性，将覆盖 <code>&lt;form&gt;</code> 元素的 <code>method</code> 属性。</p>
<p><strong>Note</strong>：仅在未设置 <code>href</code> 属性且 <code>type=&quot;submit&quot;</code> 时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>formnovalidate</td>
    <td>formNoValidate</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>如果设置了此属性，表单提交时将不执行表单验证。</p>
<p>如果设置了此属性，将覆盖 <code>&lt;form&gt;</code> 元素的 <code>novalidate</code> 属性。</p>
<p><strong>Note</strong>：仅在未设置 <code>href</code> 属性且 <code>type=&quot;submit&quot;</code> 时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>formtarget</td>
    <td>formTarget</td>
    <td>true</td>
    <td>&#39;_self&#39; | &#39;_blank&#39; | &#39;_parent&#39; | &#39;_top&#39;</td>
    <td></td>
    <td><p>提交表单后接收到的响应应显示在何处。可选值包括：</p>
<ul>
<li><code>_self</code>：默认选项，在当前框架中打开</li>
<li><code>_blank</code>：在新窗口中打开</li>
<li><code>_parent</code>：在父框架中打开</li>
<li><code>_top</code>：在整个窗口中打开</li>
</ul>
<p>如果设置了此属性，将覆盖 <code>&lt;form&gt;</code> 元素的 <code>target</code> 属性。</p>
<p><strong>Note</strong>：仅在未设置 <code>href</code> 属性且 <code>type=&quot;submit&quot;</code> 时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>validity</td>
    <td>false</td>
    <td>ValidityState</td>
    <td></td>
    <td><p>表单验证状态对象，具体参见 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/ValidityState" target="_blank" rel="noopener nofollow"><code>ValidityState</code></a></p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>validationMessage</td>
    <td>false</td>
    <td>string</td>
    <td></td>
    <td><p>如果表单验证未通过，此属性将包含提示信息。如果验证通过，此属性将为空字符串</p>
</td>
  </tr>
</tbody>
</table>

### 方法

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>click(): void</td>
    <td><p>模拟鼠标点击元素</p>
</td>
  </tr>
  <tr>
    <td>focus(options?: FocusOptions): void</td>
    <td><p>将焦点设置到当前元素。</p>
<p>可以传入一个对象作为参数，该对象的属性包括：</p>
<ul>
<li><code>preventScroll</code>：默认情况下，元素获取焦点后，页面会滚动以将该元素滚动到视图中。如果不希望页面滚动，可以将此属性设置为 <code>true</code>。</li>
</ul>
</td>
  </tr>
  <tr>
    <td>blur(): void</td>
    <td><p>移除当前元素的焦点</p>
</td>
  </tr>
  <tr>
    <td>checkValidity(): boolean</td>
    <td><p>检查表单字段是否通过验证。如果未通过，返回 <code>false</code> 并触发 <code>invalid</code> 事件；如果通过，返回 <code>true</code></p>
</td>
  </tr>
  <tr>
    <td>reportValidity(): boolean</td>
    <td><p>检查表单字段是否通过验证。如果未通过，返回 <code>false</code> 并触发 <code>invalid</code> 事件；如果通过，返回 <code>true</code>。</p>
<p>如果验证未通过，还会在组件上显示验证失败的提示。</p>
</td>
  </tr>
  <tr>
    <td>setCustomValidity(message: string): void</td>
    <td><p>设置自定义的错误提示文本。只要这个文本不为空，就表示字段未通过验证</p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>focus</td>
    <td><p>获得焦点时触发</p>
</td>
  </tr>
  <tr>
    <td>blur</td>
    <td><p>失去焦点时触发</p>
</td>
  </tr>
  <tr>
    <td>invalid</td>
    <td><p>表单字段验证未通过时触发</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p>文本</p>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td><p>图标</p>
</td>
  </tr>
</tbody>
</table>

### CSS Parts

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>button</td>
    <td><p>内部的 <code>&lt;button&gt;</code> 或 <code>&lt;a&gt;</code> 元素</p>
</td>
  </tr>
  <tr>
    <td>label</td>
    <td><p>右侧的文本</p>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td><p>左侧的图标</p>
</td>
  </tr>
  <tr>
    <td>loading</td>
    <td><p>加载中状态的 <code>&lt;mdui-circular-progress&gt;</code> 元素</p>
</td>
  </tr>
</tbody>
</table>

### CSS 自定义属性

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>--shape-corner-small</td>
    <td><p><code>size=&quot;small&quot;</code> 时，组件的圆角大小。可以指定一个具体的像素值；但更推荐引用<a href="/docs/2/styles/design-tokens#shape-corner">设计令牌</a></p>
</td>
  </tr>
  <tr>
    <td>--shape-corner-normal</td>
    <td><p><code>size=&quot;normal&quot;</code> 时，组件的圆角大小。可以指定一个具体的像素值；但更推荐引用<a href="/docs/2/styles/design-tokens#shape-corner">设计令牌</a></p>
</td>
  </tr>
  <tr>
    <td>--shape-corner-large</td>
    <td><p><code>size=&quot;large&quot;</code> 时，组件的圆角大小。可以指定一个具体的像素值；但更推荐引用<a href="/docs/2/styles/design-tokens#shape-corner">设计令牌</a></p>
</td>
  </tr>
</tbody>
</table>

# 图标组件 Icon

图标用于表示常见的操作。它支持 Material Icons 图标，也支持使用 SVG 图标。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/icon.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { Icon } from 'mdui/components/icon.js';
```

使用示例：

```html
<mdui-icon name="search"></mdui-icon>
```

### 使用 Material Icons 图标 {#usage-material-icons}

如果需要通过该组件使用 Material Icons 图标，你需要单独导入 Material Icons 的 CSS 文件。Material Icons 共有 5 种变体，分别为：Filled、Outlined、Rounded、Sharp、Two Tone，请根据你要使用的图标变体，导入对应的 CSS 文件：

```html
<!-- Filled -->
<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet"
/>

<!-- Outlined -->
<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
  rel="stylesheet"
/>

<!-- Rounded -->
<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
  rel="stylesheet"
/>

<!-- Sharp -->
<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons+Sharp"
  rel="stylesheet"
/>

<!-- Two Tone -->
<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons+Two+Tone"
  rel="stylesheet"
/>
```

使用组件时，在 `name` 属性中传入图标名称，并以图标变体名称为后缀（Filled 变体无需添加后缀），下面是 `delete` 图标的 5 种变体的使用方式：

```html
<!-- Filled -->
<mdui-icon name="delete"></mdui-icon>

<!-- Outlined -->
<mdui-icon name="delete--outlined"></mdui-icon>

<!-- Rounded -->
<mdui-icon name="delete--rounded"></mdui-icon>

<!-- Sharp -->
<mdui-icon name="delete--sharp"></mdui-icon>

<!-- Two Tone -->
<mdui-icon name="delete--two-tone"></mdui-icon>
```

你可以直接在页面下方的 [Material Icons 图标搜索](/zh-cn/docs/2/components/icon#search) 工具中搜索图标，然后点击需要使用的图标，就会自动将图标代码复制到剪贴板。

另外，mdui 还提供了一个独立的包 [`@mdui/icons`](/zh-cn/docs/2/libraries/icons)，这个包里每一个图标组件都是一个独立的文件，使你可以按需导入需要的图标组件，而无需导入整个图标库。

### 使用 SVG 图标 {#usage-svg}

该组件也支持使用 SVG 图标作为图标内容。可通过组件的 `src` 属性传入 SVG 图标的链接。例如：

```html
<mdui-icon src="https://fonts.gstatic.com/s/i/materialicons/search/v17/24px.svg"></mdui-icon>
```

也可以在组件的 default slot 中传入 SVG 的内容。例如：

```html
<mdui-icon>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
</mdui-icon>
```

## 示例 {#examples}

### 设置颜色 {#example-color}

设置 `<mdui-icon>` 元素或父元素的 `color` CSS 样式修改图标颜色。

```html
<mdui-icon name="delete" style="color: red"></mdui-icon>
<mdui-icon src="https://fonts.gstatic.com/s/i/materialicons/search/v17/24px.svg" style="color: red"></mdui-icon>
```

### 设置大小 {#example-size}

设置 `<mdui-icon>` 元素或父元素的 `font-size` CSS 样式修改图标大小。

```html
<mdui-icon name="delete" style="font-size: 32px"></mdui-icon>
<mdui-icon src="https://fonts.gstatic.com/s/i/materialicons/search/v17/24px.svg" style="font-size: 32px"></mdui-icon>
```

## mdui-icon API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>name</td>
    <td>name</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>Material Icons 图标名</p>
</td>
  </tr>
  <tr>
    <td>src</td>
    <td>src</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>svg 图标的路径</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p><code>svg</code> 图标的内容</p>
</td>
  </tr>
</tbody>
</table>

# 布局组件 Layout

布局组件提供了一个灵活的布局系统，用于创建复杂的页面布局。

<style>
.example-top-app-bar {
  background-color: rgb(var(--mdui-color-surface-container));
}

.example-navigation-drawer::part(panel) {
  background-color: rgb(var(--mdui-color-surface-container-low));
}

.example-layout-item {
  background-color: rgb(var(--mdui-color-surface-container-low));
}

.example-layout-main {
  background-color: rgb(var(--mdui-color-surface-container-lowest));
}

@media (min-width: 840px) {
  .example-md-visible {
    display: none;
  }
}
</style>

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/layout.js';
import 'mdui/components/layout-item.js';
import 'mdui/components/layout-main.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { Layout } from 'mdui/components/layout.js';
import type { LayoutItem } from 'mdui/components/layout-item.js';
import type { LayoutMain } from 'mdui/components/layout-main.js';
```

**介绍：**

布局系统遵循从外向内的原则构建，每个布局组件（`<mdui-layout-item>` 组件）都会在四个方向（上、下、左、右）之一的位置占据空间，随后的布局组件会在剩余空间中继续占据空间。

以下组件直接继承自 `<mdui-layout-item>` 组件，因此也可以作为布局组件使用：

- [`<mdui-navigation-bar>`](/zh-cn/docs/2/components/navigation-bar)
- [`<mdui-navigation-drawer>`](/zh-cn/docs/2/components/navigation-drawer)
- [`<mdui-navigation-rail>`](/zh-cn/docs/2/components/navigation-rail)
- [`<mdui-bottom-app-bar>`](/zh-cn/docs/2/components/bottom-app-bar)
- [`<mdui-top-app-bar>`](/zh-cn/docs/2/components/top-app-bar)

布局系统的最后一部分是 `<mdui-layout-main>` 组件，它会占据剩余空间，你可以在该组件内放置页面内容。

## 示例 {#examples}

### 布局组件顺序 {#layout-default-order}

默认情况下，布局组件会按照在代码中出现的顺序来占据空间。你可以从下面两个示例来理解这个概念，这两个示例中，[`<mdui-top-app-bar>`](/zh-cn/docs/2/components/top-app-bar) 和 [`<mdui-navigation-drawer>`](/zh-cn/docs/2/components/navigation-drawer) 在代码中出现的顺序不同。

<p class="example-md-visible">请在大屏显示器上查看该示例。</p>

```html
<mdui-layout>
  <mdui-top-app-bar class="example-top-app-bar">
    <mdui-top-app-bar-title>Top App Bar</mdui-top-app-bar-title>
  </mdui-top-app-bar>

  <mdui-navigation-drawer open class="example-navigation-drawer">
    <mdui-list>
      <mdui-list-item>Navigation drawer</mdui-list-item>
    </mdui-list>
  </mdui-navigation-drawer>

  <mdui-layout-main class="example-layout-main" style="min-height: 300px">Main</mdui-layout-main>
</mdui-layout>
```

```html
<mdui-layout>
  <mdui-navigation-drawer open class="example-navigation-drawer">
    <mdui-list>
      <mdui-list-item>Navigation drawer</mdui-list-item>
    </mdui-list>
  </mdui-navigation-drawer>

  <mdui-top-app-bar class="example-top-app-bar">
    <mdui-top-app-bar-title>Top App Bar</mdui-top-app-bar-title>
  </mdui-top-app-bar>

  <mdui-layout-main class="example-layout-main" style="min-height: 300px">Main</mdui-layout-main>
</mdui-layout>
```

可以发现，将 [`<mdui-top-app-bar>`](/zh-cn/docs/2/components/top-app-bar) 放在 [`<mdui-navigation-drawer>`](/zh-cn/docs/2/components/navigation-drawer) 之前时，[`<mdui-top-app-bar>`](/zh-cn/docs/2/components/top-app-bar) 会率先占满屏幕的宽度，而 [`<mdui-navigation-drawer>`](/zh-cn/docs/2/components/navigation-drawer) 只能在剩余的空间内占满高度。调换二者顺序后，[`<mdui-navigation-drawer>`](/zh-cn/docs/2/components/navigation-drawer) 会率先占满屏幕的高度，而 [`<mdui-top-app-bar>`](/zh-cn/docs/2/components/top-app-bar) 只能在剩余的空间内占满宽度。

### 布局组件位置 {#example-placement}

对于 `<mdui-layout-item>` 组件，你可以使用 `placement` 属性来指定其在布局中的上、下、左、右位置。 对于 [`<mdui-navigation-drawer>`](/zh-cn/docs/2/components/navigation-drawer) 和 [`<mdui-navigation-rail>`](/zh-cn/docs/2/components/navigation-rail) 组件，你也可以使用 `placement` 属性来指定其在布局中的左、右位置。

下面的示例中，我们将两个 `<mdui-layout-item>` 组件放在了应用的两侧。

```html
<mdui-layout>
  <mdui-top-app-bar class="example-top-app-bar">
    <mdui-top-app-bar-title>Top App Bar</mdui-top-app-bar-title>
  </mdui-top-app-bar>

  <mdui-layout-item
    placement="left"
    class="example-layout-item"
    style="width: 100px"
  >Layout Item</mdui-layout-item>

  <mdui-layout-item
    placement="right"
    class="example-layout-item"
    style="width: 100px"
  >Layout Item</mdui-layout-item>

  <mdui-layout-main class="example-layout-main" style="min-height: 300px">Main</mdui-layout-main>
</mdui-layout>
```

### 自定义布局组件顺序 {#example-order}

在大多数情况下，只要按顺序放置布局组件就能实现你想要的布局。

你也可以使用 `order` 属性来指定布局顺序，系统将按 `order` 的值从小到大排列组件，`order` 相同时则按代码顺序排列。所有布局组件的默认 `order` 都为 `0`。

```html
<mdui-layout class="example-order">
  <mdui-layout-item
    placement="left"
    class="example-layout-item"
    style="width: 100px"
  >Layout Item</mdui-layout-item>

  <mdui-top-app-bar class="example-top-app-bar">
    <mdui-top-app-bar-title>Top App Bar</mdui-top-app-bar-title>
    <div style="flex-grow: 1"></div>
    <mdui-checkbox>order="-1"</mdui-checkbox>
  </mdui-top-app-bar>

  <mdui-layout-main class="example-layout-main" style="min-height: 300px">Main</mdui-layout-main>
</mdui-layout>

<script>
  const topAppBar = document.querySelector(".example-order mdui-top-app-bar");
  const checkbox = document.querySelector(".example-order mdui-checkbox");

  checkbox.addEventListener("change", (event) => {
    topAppBar.order = event.target.checked ? -1 : 0;
  });
</script>
```

## mdui-layout-item API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>placement</td>
    <td>placement</td>
    <td>true</td>
    <td>&#39;top&#39; | &#39;bottom&#39; | &#39;left&#39; | &#39;right&#39;</td>
    <td>'top'</td>
    <td><p>组件的位置。可选值包括：</p>
<ul>
<li><code>top</code>：上方</li>
<li><code>bottom</code>：下方</li>
<li><code>left</code>：左侧</li>
<li><code>right</code>：右侧</li>
</ul>
</td>
  </tr>
  <tr>
    <td>order</td>
    <td>order</td>
    <td>true</td>
    <td>number</td>
    <td></td>
    <td><p>该组件在 <a href="/docs/2/components/layout"><code>&lt;mdui-layout&gt;</code></a> 中的布局顺序，按从小到大排序。默认为 <code>0</code></p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p>可以包含任意内容</p>
</td>
  </tr>
</tbody>
</table>

## mdui-layout-main API

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p>可以包含任意内容</p>
</td>
  </tr>
</tbody>
</table>

## mdui-layout API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>full-height</td>
    <td>fullHeight</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>设置当前布局的高度为 100%</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p>可以包含 <a href="/docs/2/components/top-app-bar"><code>&lt;mdui-top-app-bar&gt;</code></a>、<a href="/docs/2/components/bottom-app-bar"><code>&lt;mdui-bottom-app-bar&gt;</code></a>、<a href="/docs/2/components/navigation-bar"><code>&lt;mdui-navigation-bar&gt;</code></a>、<a href="/docs/2/components/navigation-drawer"><code>&lt;mdui-navigation-drawer&gt;</code></a>、<a href="/docs/2/components/navigation-rail"><code>&lt;mdui-navigation-rail&gt;</code></a>、<code>&lt;mdui-layout-item&gt;</code>、<code>&lt;mdui-layout-main&gt;</code> 元素</p>
</td>
  </tr>
</tbody>
</table>

# 线性进度指示器组件 LinearProgress

线性进度指示器是一种横向的指示器，用于向用户展示任务的执行进度，如数据加载或表单提交等。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/linear-progress.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { LinearProgress } from 'mdui/components/linear-progress.js';
```

使用示例：

```html
<mdui-linear-progress></mdui-linear-progress>
```

## 示例 {#examples}

### 设定进度 {#example-value}

线性进度指示器默认为不确定的进度，你可以通过 `value` 属性来设定当前的进度，默认的进度最大值为 `1`。

```html
<mdui-linear-progress value="0.5"></mdui-linear-progress>
```

你也可以通过 `max` 属性来设定进度的最大值。

```html
<mdui-linear-progress value="30" max="100"></mdui-linear-progress>
```

## mdui-linear-progress API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>max</td>
    <td>max</td>
    <td>true</td>
    <td>number</td>
    <td>1</td>
    <td><p>进度指示器的最大值。默认为 <code>1</code></p>
</td>
  </tr>
  <tr>
    <td>value</td>
    <td>value</td>
    <td>false</td>
    <td>number</td>
    <td></td>
    <td><p>进度指示器的当前值。如果未指定该值，则处于不确定状态</p>
</td>
  </tr>
</tbody>
</table>

### CSS Parts

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>indicator</td>
    <td><p>指示器部分</p>
</td>
  </tr>
</tbody>
</table>

### CSS 自定义属性

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>--shape-corner</td>
    <td><p>组件的圆角大小。可以指定一个具体的像素值；但更推荐引用<a href="/docs/2/styles/design-tokens#shape-corner">设计令牌</a></p>
</td>
  </tr>
</tbody>
</table>

# 列表组件 List

列表是一种垂直排列的索引，用于展示文本或图片，便于用户快速浏览和访问相关信息。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/list.js';
import 'mdui/components/list-item.js';
import 'mdui/components/list-subheader.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { List } from 'mdui/components/list.js';
import type { ListItem } from 'mdui/components/list-item.js';
import type { ListSubheader } from 'mdui/components/list-subheader.js';
```

使用示例：

```html
<mdui-list>
  <mdui-list-subheader>Subheader</mdui-list-subheader>
  <mdui-list-item>Item 1</mdui-list-item>
  <mdui-list-item>Item 2</mdui-list-item>
</mdui-list>
```

## 示例 {#examples}

### 文本内容 {#example-text}

在 `<mdui-list-item>` 组件上设置 `headline` 属性，可以设定列表项的主文本，设置 `description` 属性，可以设定副文本。

```html
<mdui-list>
  <mdui-list-item headline="Headline"></mdui-list-item>
  <mdui-list-item headline="Headline" description="Supporting text"></mdui-list-item>
</mdui-list>
```

也可以通过 default slot 设定主文本，通过 `description` slot 设定副文本。

```html
<mdui-list>
  <mdui-list-item>Headline</mdui-list-item>
  <mdui-list-item>
    Headline
    <span slot="description">Supporting text</span>
  </mdui-list-item>
</mdui-list>
```

默认情况下，主文本和副文本无论长度如何，都会完全显示。你可以通过设置 `headline-line` 和 `description-line` 属性为主文本和副文本添加行数限制，最多可以限制为 3 行。

```html
<mdui-list>
  <mdui-list-item headline-line="1" description-line="2">
    Headline Headline Headline Headline Headline Headline Headline Headline Headline Headline Headline Headline Headline Headline
    <span slot="description">Supporting text Supporting text Supporting text Supporting text Supporting text Supporting text Supporting text Supporting text Supporting text Supporting text Supporting text Supporting text Supporting text Supporting text Supporting text Supporting text Supporting text Supporting text Supporting text</span>
  </mdui-list-item>
</mdui-list>
```

### 两侧内容 {#example-side}

在 `<mdui-list-item>` 组件上设置 `icon` 和 `end-icon` 属性，可以在列表项的左侧和右侧添加 Material Icons 图标。

```html
<mdui-list>
  <mdui-list-item icon="people" end-icon="arrow_right">Headline</mdui-list-item>
</mdui-list>
```

也可以通过 `icon` 和 `end-icon` slot 在列表项的左侧和右侧添加元素。

```html
<mdui-list>
  <mdui-list-item>
    Headline
    <mdui-avatar slot="icon" src="https://avatars.githubusercontent.com/u/3030330?s=40&v=4"></mdui-avatar>
    <mdui-checkbox slot="end-icon"></mdui-checkbox>
  </mdui-list-item>
</mdui-list>
```

### 链接 {#example-link}

通过设置 `href` 属性，可以将列表项转换为链接。此时，你还可以使用与链接相关的属性，如：`download`、`target` 和 `rel`。

```html
<mdui-list>
  <mdui-list-item href="https://www.mdui.org" target="_blank">Headline</mdui-list-item>
</mdui-list>
```

### 禁用状态 {#example-disabled}

在 `<mdui-list-item>` 组件上添加 `disabled` 属性，可以禁用该列表项。此时，列表项中的 checkbox、radio、switch 等组件也会被禁用。

```html
<mdui-list>
  <mdui-list-item disabled>Headline</mdui-list-item>
  <mdui-list-item>Headline</mdui-list-item>
</mdui-list>
```

### 激活状态 {#example-active}

在 `<mdui-list-item>` 组件上添加 `active` 属性，可以激活该列表项。

```html
<mdui-list>
  <mdui-list-item active>Headline</mdui-list-item>
  <mdui-list-item>Headline</mdui-list-item>
</mdui-list>
```

### 不可点击状态 {#example-nonclickable}

在 `<mdui-list-item>` 组件上添加 `nonclickable` 属性，可以移除列表项上的鼠标悬浮和点击涟漪效果。

```html
<mdui-list>
  <mdui-list-item nonclickable>Headline</mdui-list-item>
  <mdui-list-item>Headline</mdui-list-item>
</mdui-list>
```

### 圆角形状 {#example-rounded}

在 `<mdui-list-item>` 组件上添加 `rounded` 属性，可以使该列表项呈现圆角形状。

```html
<mdui-list>
  <mdui-list-item rounded>Headline</mdui-list-item>
  <mdui-list-item rounded>Headline</mdui-list-item>
</mdui-list>
```

### 垂直对齐方式 {#example-alignment}

在 `<mdui-list-item>` 组件上设置 `alignment` 属性，可以调整列表项左右两侧元素与列表项的对齐方式。其值可以为：

- `start`：顶部对齐
- `center`：居中对齐
- `end`：底部对齐

```html
<mdui-list>
  <mdui-list-item alignment="start" description="Supporting text">
    Headline
    <mdui-icon slot="icon" name="people"></mdui-icon>
  </mdui-list-item>
  <mdui-list-item alignment="center" description="Supporting text">
    Headline
    <mdui-icon slot="icon" name="people"></mdui-icon>
  </mdui-list-item>
  <mdui-list-item alignment="end" description="Supporting text">
    Headline
    <mdui-icon slot="icon" name="people"></mdui-icon>
  </mdui-list-item>
</mdui-list>
```

### 自定义内容 {#example-custom}

在 `<mdui-list-item>` 组件中使用 `custom` slot，可以完全自定义列表项的内容。

```html
<mdui-list>
  <mdui-list-item>
    <div slot="custom" style="display: flex;">
      <mdui-icon name="people"></mdui-icon>
      <div>test</div>
    </div>
  </mdui-list-item>
</mdui-list>
```

## mdui-list-item API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>headline</td>
    <td>headline</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>主文本。也可以通过 default slot 设置</p>
</td>
  </tr>
  <tr>
    <td>headline-line</td>
    <td>headlineLine</td>
    <td>true</td>
    <td>1 | 2 | 3</td>
    <td></td>
    <td><p>主文本行数，超过限制后将截断显示。默认无行数限制。可选值包括：</p>
<ul>
<li><code>1</code>：显示单行，超出后截断</li>
<li><code>2</code>：显示两行，超出后截断</li>
<li><code>3</code>：显示三行，超出后截断</li>
</ul>
</td>
  </tr>
  <tr>
    <td>description</td>
    <td>description</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>副文本。也可以通过 <code>slot=&quot;description&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>description-line</td>
    <td>descriptionLine</td>
    <td>true</td>
    <td>1 | 2 | 3</td>
    <td></td>
    <td><p>副文本行数，超过限制后将截断显示。默认无行数限制。可选值包括：</p>
<ul>
<li><code>1</code>：显示单行，超出后截断</li>
<li><code>2</code>：显示两行，超出后截断</li>
<li><code>3</code>：显示三行，超出后截断</li>
</ul>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td>icon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>左侧的 Material Icons 图标名。也可以通过 <code>slot=&quot;icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>end-icon</td>
    <td>endIcon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>右侧的 Material Icons 图标名。也可以通过 <code>slot=&quot;end-icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>disabled</td>
    <td>disabled</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否禁用该列表项，禁用后，列表项将变为灰色，且其中的 <a href="/docs/2/components/checkbox"><code>&lt;mdui-checkbox&gt;</code></a>、<a href="/docs/2/components/radio"><code>&lt;mdui-radio&gt;</code></a>、<a href="/docs/2/components/switch"><code>&lt;mdui-switch&gt;</code></a> 等也将禁用</p>
</td>
  </tr>
  <tr>
    <td>active</td>
    <td>active</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否激活该列表项</p>
</td>
  </tr>
  <tr>
    <td>nonclickable</td>
    <td>nonclickable</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否使列表项不可点击。设置后，列表项中的 <a href="/docs/2/components/checkbox"><code>&lt;mdui-checkbox&gt;</code></a>、<a href="/docs/2/components/radio"><code>&lt;mdui-radio&gt;</code></a>、<a href="/docs/2/components/switch"><code>&lt;mdui-switch&gt;</code></a> 等仍可交互</p>
</td>
  </tr>
  <tr>
    <td>rounded</td>
    <td>rounded</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否使用圆角形状的列表项</p>
</td>
  </tr>
  <tr>
    <td>alignment</td>
    <td>alignment</td>
    <td>true</td>
    <td>&#39;start&#39; | &#39;center&#39; | &#39;end&#39;</td>
    <td>'center'</td>
    <td><p>列表项的垂直对齐方式。可选值包括：</p>
<ul>
<li><code>start</code>：顶部对齐</li>
<li><code>center</code>：居中对齐</li>
<li><code>end</code>：底部对齐</li>
</ul>
</td>
  </tr>
  <tr>
    <td>href</td>
    <td>href</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>链接的目标 URL。</p>
<p>如果设置了此属性，组件内部将渲染为 <code>&lt;a&gt;</code> 元素，并可以使用链接相关的属性。</p>
</td>
  </tr>
  <tr>
    <td>download</td>
    <td>download</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>下载链接的目标。</p>
<p><strong>Note</strong>：仅在设置了 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>target</td>
    <td>target</td>
    <td>true</td>
    <td>&#39;_blank&#39; | &#39;_parent&#39; | &#39;_self&#39; | &#39;_top&#39;</td>
    <td></td>
    <td><p>链接的打开方式。可选值包括：</p>
<ul>
<li><code>_blank</code>：在新窗口中打开链接</li>
<li><code>_parent</code>：在父框架中打开链接</li>
<li><code>_self</code>：默认。在当前框架中打开链接</li>
<li><code>_top</code>：在整个窗口中打开链接</li>
</ul>
<p><strong>Note</strong>：仅在设置了 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>rel</td>
    <td>rel</td>
    <td>true</td>
    <td>&#39;alternate&#39; | &#39;author&#39; | &#39;bookmark&#39; | &#39;external&#39; | &#39;help&#39; | &#39;license&#39; | &#39;me&#39; | &#39;next&#39; | &#39;nofollow&#39; | &#39;noreferrer&#39; | &#39;opener&#39; | &#39;prev&#39; | &#39;search&#39; | &#39;tag&#39;</td>
    <td></td>
    <td><p>当前文档与被链接文档之间的关系。可选值包括：</p>
<ul>
<li><code>alternate</code>：当前文档的替代版本</li>
<li><code>author</code>：当前文档或文章的作者</li>
<li><code>bookmark</code>：永久链接到最近的祖先章节</li>
<li><code>external</code>：引用的文档与当前文档不在同一站点</li>
<li><code>help</code>：链接到相关的帮助文档</li>
<li><code>license</code>：当前文档的主要内容由被引用文件的版权许可覆盖</li>
<li><code>me</code>：当前文档代表链接内容的所有者</li>
<li><code>next</code>：当前文档是系列中的一部分，被引用的文档是系列的下一个文档</li>
<li><code>nofollow</code>：当前文档的作者或发布者不认可被引用的文件</li>
<li><code>noreferrer</code>：不包含 <code>Referer</code> 头。类似于 <code>noopener</code> 的效果</li>
<li><code>opener</code>：如果超链接会创建一个顶级浏览上下文（即 <code>target</code> 属性值为 <code>_blank</code>），则创建一个辅助浏览上下文</li>
<li><code>prev</code>：当前文档是系列的一部分，被引用的文档是系列的上一个文档</li>
<li><code>search</code>：提供一个资源链接，可用于搜索当前文件及其相关页面</li>
<li><code>tag</code>：提供一个适用于当前文档的标签（由给定地址识别）</li>
</ul>
<p><strong>Note</strong>：仅在指定了 <code>href</code> 属性时可用。</p>
</td>
  </tr>
  <tr>
    <td>autofocus</td>
    <td>autofocus</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否在页面加载完成后自动获取焦点</p>
</td>
  </tr>
  <tr>
    <td>tabindex</td>
    <td>tabIndex</td>
    <td>false</td>
    <td>number</td>
    <td></td>
    <td><p>元素在使用 Tab 键切换焦点时的顺序</p>
</td>
  </tr>
</tbody>
</table>

### 方法

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>click(): void</td>
    <td><p>模拟鼠标点击元素</p>
</td>
  </tr>
  <tr>
    <td>focus(options?: FocusOptions): void</td>
    <td><p>将焦点设置到当前元素。</p>
<p>可以传入一个对象作为参数，该对象的属性包括：</p>
<ul>
<li><code>preventScroll</code>：默认情况下，元素获取焦点后，页面会滚动以将该元素滚动到视图中。如果不希望页面滚动，可以将此属性设置为 <code>true</code>。</li>
</ul>
</td>
  </tr>
  <tr>
    <td>blur(): void</td>
    <td><p>移除当前元素的焦点</p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>focus</td>
    <td><p>获得焦点时触发</p>
</td>
  </tr>
  <tr>
    <td>blur</td>
    <td><p>失去焦点时触发</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p>主文本</p>
</td>
  </tr>
  <tr>
    <td>description</td>
    <td><p>副文本</p>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td><p>列表项左侧的元素</p>
</td>
  </tr>
  <tr>
    <td>end-icon</td>
    <td><p>列表项右侧的元素</p>
</td>
  </tr>
  <tr>
    <td>custom</td>
    <td><p>任意自定义内容</p>
</td>
  </tr>
</tbody>
</table>

### CSS Parts

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>container</td>
    <td><p>列表项容器</p>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td><p>左侧图标</p>
</td>
  </tr>
  <tr>
    <td>end-icon</td>
    <td><p>右侧图标</p>
</td>
  </tr>
  <tr>
    <td>body</td>
    <td><p>中间部分</p>
</td>
  </tr>
  <tr>
    <td>headline</td>
    <td><p>主标题</p>
</td>
  </tr>
  <tr>
    <td>description</td>
    <td><p>副标题</p>
</td>
  </tr>
</tbody>
</table>

### CSS 自定义属性

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>--shape-corner</td>
    <td><p>列表项的圆角大小。可以指定一个具体的像素值；但更推荐引用<a href="/docs/2/styles/design-tokens#shape-corner">设计令牌</a></p>
</td>
  </tr>
  <tr>
    <td>--shape-corner-rounded</td>
    <td><p>指定了 <code>rounded</code> 属性时，列表项的圆角大小。可以指定一个具体的像素值；但更推荐引用<a href="/docs/2/styles/design-tokens#shape-corner">设计令牌</a></p>
</td>
  </tr>
</tbody>
</table>

## mdui-list-subheader API

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p>列表标题文本</p>
</td>
  </tr>
</tbody>
</table>

## mdui-list API

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p><code>&lt;mdui-list-item&gt;</code> 元素</p>
</td>
  </tr>
</tbody>
</table>

# 菜单组件 Menu

菜单组件提供了一系列垂直排列的选项。当用户与按钮、或其他控件交互时，将显示菜单。

如果你需要实现下拉菜单，可以配合 [`<mdui-dropdown>`](/zh-cn/docs/2/components/dropdown) 组件。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/menu.js';
import 'mdui/components/menu-item.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { Menu } from 'mdui/components/menu.js';
import type { MenuItem } from 'mdui/components/menu-item.js';
```

使用示例：

```html
<mdui-menu>
  <mdui-menu-item>Item 1</mdui-menu-item>
  <mdui-menu-item>Item 2</mdui-menu-item>
</mdui-menu>
```

## 示例 {#examples}

### 下拉菜单 {#example-dropdown}

配合 [`<mdui-dropdown>`](/zh-cn/docs/2/components/dropdown) 组件实现下拉菜单。

```html
<mdui-dropdown>
  <mdui-button slot="trigger">open dropdown</mdui-button>
  <mdui-menu>
    <mdui-menu-item>Item 1</mdui-menu-item>
    <mdui-menu-item>Item 2</mdui-menu-item>
  </mdui-menu>
</mdui-dropdown>
```

### 紧凑布局 {#example-dense}

在 `<mdui-menu>` 组件上添加 `dense` 属性，可以实现紧凑布局。

```html
<mdui-menu dense>
  <mdui-menu-item>Item 1</mdui-menu-item>
  <mdui-menu-item>Item 2</mdui-menu-item>
  <mdui-menu-item>Item 3</mdui-menu-item>
</mdui-menu>
```

### 禁用菜单项 {#example-disabled}

在 `<mdui-menu-item>` 组件上添加 `disabled` 属性，可以禁用菜单项。

```html
<mdui-menu>
  <mdui-menu-item disabled>Item 1</mdui-menu-item>
  <mdui-menu-item>Item 2</mdui-menu-item>
  <mdui-menu-item>Item 3</mdui-menu-item>
</mdui-menu>
```

### 支持单选 {#example-selects-single}

在 `<mdui-menu>` 组件上指定 `selects` 属性为 `single`，可以实现单选功能。此时 `<mdui-menu>` 的 `value` 值即为当前选中的 `<mdui-menu-item>` 的 `value` 值。

```html
<mdui-menu selects="single" value="item-2">
  <mdui-menu-item value="item-1">Item 1</mdui-menu-item>
  <mdui-menu-item value="item-2">Item 2</mdui-menu-item>
</mdui-menu>
```

### 支持多选 {#example-selects-multiple}

在 `<mdui-menu>` 组件上指定 `selects` 属性为 `multiple`，可以实现多选功能。此时 `<mdui-menu>` 的 `value` 值即为当前选中的 `<mdui-menu-item>` 的 `value` 值组成的数组。

注意：在多选模式下，`<mdui-menu>` 的 `value` 值为数组，只能通过 JavaScript 属性来读取和设置该值。

```html
<mdui-menu selects="multiple" class="example-multiple">
  <mdui-menu-item value="item-1">Item 1</mdui-menu-item>
  <mdui-menu-item value="item-2">Item 2</mdui-menu-item>
  <mdui-menu-item value="item-3">Item 3</mdui-menu-item>
</mdui-menu>

<script>
  // 设置默认选中 item-1 和 item-2
  const menu = document.querySelector(".example-multiple");
  menu.value = ["item-1", "item-2"];
</script>
```

### 图标 {#example-icon}

在 `<mdui-menu-item>` 组件上，通过设置 `icon` 和 `end-icon` 属性，可以分别在菜单项的左侧和右侧添加 Material Icons 图标。通过设置 `end-text` 属性，可以在右侧添加文本。此外，也可以通过 `icon`、`end-icon` 和 `end-text` slot 在菜单项的左侧和右侧添加图标和文本。

如果需要在菜单项左侧空出一个图标的位置以保持与其他菜单项的对齐，可以将 `icon` 属性设置为空字符串。

```html
<mdui-menu>
  <mdui-menu-item icon="visibility" end-icon="add_circle" end-text="Ctrl+X">Item 1</mdui-menu-item>
  <mdui-menu-item>
    Item 2
    <mdui-icon slot="icon" name="visibility"></mdui-icon>
    <mdui-icon slot="end-icon" name="add_circle"></mdui-icon>
    <span slot="end-text">Ctrl+X</span>
  </mdui-menu-item>
  <mdui-menu-item icon="">Item 3</mdui-menu-item>
</mdui-menu>
```

在单选或多选模式下，可以通过 `selected-icon` 属性或 `selected-icon` slot 设置选中状态的图标。

```html
<mdui-menu selects="multiple">
  <mdui-menu-item value="item-1" selected-icon="cloud_done">Item 1</mdui-menu-item>
  <mdui-menu-item value="item-2">
    <mdui-icon slot="selected-icon" name="done_outline"></mdui-icon>
    Item 2
  </mdui-menu-item>
</mdui-menu>
```

### 链接 {#example-link}

在 `<mdui-menu-item>` 组件上设置 `href` 属性，可以将菜单项转换为链接。此时，还可以使用与链接相关的属性，如：`download`、`target` 和 `rel`。

```html
<mdui-menu>
  <mdui-menu-item href="https://www.mdui.org" target="_blank">Item 1</mdui-menu-item>
  <mdui-menu-item>Item 2</mdui-menu-item>
</mdui-menu>
```

### 子菜单 {#example-submenu}

在 `<mdui-menu-item>` 组件中，可以使用 `submenu` slot 来指定子菜单项的元素。

```html
<mdui-menu>
  <mdui-menu-item>
    Line spacing
    <mdui-menu-item slot="submenu">Single</mdui-menu-item>
    <mdui-menu-item slot="submenu">1.5</mdui-menu-item>
    <mdui-menu-item slot="submenu">Double</mdui-menu-item>
    <mdui-menu-item slot="submenu">Custom: 1.2</mdui-menu-item>
  </mdui-menu-item>
  <mdui-menu-item>Paragraph style</mdui-menu-item>
</mdui-menu>
```

在 `<mdui-menu>` 组件上，可以通过 `submenu-trigger` 属性设置子菜单的触发方式。

```html
<mdui-menu submenu-trigger="click">
  <mdui-menu-item>
    Line spacing
    <mdui-menu-item slot="submenu">Single</mdui-menu-item>
    <mdui-menu-item slot="submenu">1.5</mdui-menu-item>
    <mdui-menu-item slot="submenu">Double</mdui-menu-item>
    <mdui-menu-item slot="submenu">Custom: 1.2</mdui-menu-item>
  </mdui-menu-item>
  <mdui-menu-item>Paragraph style</mdui-menu-item>
</mdui-menu>
```

当 `submenu-trigger` 属性设置为 `hover` 时，可以在 `<mdui-menu>` 组件上通过 `submenu-open-delay` 和 `submenu-close-delay` 属性设置子菜单的打开延时和关闭延时。

```html
<mdui-menu submenu-trigger="hover" submenu-open-delay="1000" submenu-close-delay="1000">
  <mdui-menu-item>
    Line spacing
    <mdui-menu-item slot="submenu">Single</mdui-menu-item>
    <mdui-menu-item slot="submenu">1.5</mdui-menu-item>
    <mdui-menu-item slot="submenu">Double</mdui-menu-item>
    <mdui-menu-item slot="submenu">Custom: 1.2</mdui-menu-item>
  </mdui-menu-item>
  <mdui-menu-item>Paragraph style</mdui-menu-item>
</mdui-menu>
```

### 自定义内容 {#example-custom}

在 `<mdui-menu-item>` 组件中，你可以使用 `custom` slot 来完全自定义菜单项的内容。

```html
<style>
  .custom-item {
    padding: 4px 12px;
  }

  .custom-item .secondary {
    display: none;
    color: #888;
    font-size: 13px;
  }

  .custom-item:hover .secondary {
    display: block
  }
</style>

<mdui-menu>
  <mdui-menu-item>
    <div slot="custom" class="custom-item">
      <div>ABS</div>
      <div class="secondary">取数值的绝对值</div>
    </div>
  </mdui-menu-item>
  <mdui-menu-item>
    <div slot="custom" class="custom-item">
      <div>ACOS</div>
      <div class="secondary">数值的反余弦值，以弧度表示</div>
    </div>
  </mdui-menu-item>
  <mdui-menu-item>
    <div slot="custom" class="custom-item">
      <div>ACOSH</div>
      <div class="secondary">数值的反双曲余弦值</div>
    </div>
  </mdui-menu-item>
</mdui-menu>
```

## mdui-menu-item API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>value</td>
    <td>value</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>菜单项的值</p>
</td>
  </tr>
  <tr>
    <td>disabled</td>
    <td>disabled</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否禁用菜单项</p>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td>icon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>左侧的 Material Icons 图标名。也可以通过 <code>slot=&quot;icon&quot;</code> 设置</p>
<p>如果左侧不需要显示图标，但需要预留一个图标的位置，可传入空字符串进行占位</p>
</td>
  </tr>
  <tr>
    <td>end-icon</td>
    <td>endIcon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>右侧的 Material Icons 图标名。也可以通过 <code>slot=&quot;end-icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>end-text</td>
    <td>endText</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>右侧的文本。也可以通过 <code>slot=&quot;end-text&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>selected-icon</td>
    <td>selectedIcon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>选中状态的 Material Icons 图标名。也可以通过 <code>slot=&quot;selected-icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>submenu-open</td>
    <td>submenuOpen</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否打开子菜单</p>
</td>
  </tr>
  <tr>
    <td>href</td>
    <td>href</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>链接的目标 URL。</p>
<p>如果设置了此属性，组件内部将渲染为 <code>&lt;a&gt;</code> 元素，并可以使用链接相关的属性。</p>
</td>
  </tr>
  <tr>
    <td>download</td>
    <td>download</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>下载链接的目标。</p>
<p><strong>Note</strong>：仅在设置了 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>target</td>
    <td>target</td>
    <td>true</td>
    <td>&#39;_blank&#39; | &#39;_parent&#39; | &#39;_self&#39; | &#39;_top&#39;</td>
    <td></td>
    <td><p>链接的打开方式。可选值包括：</p>
<ul>
<li><code>_blank</code>：在新窗口中打开链接</li>
<li><code>_parent</code>：在父框架中打开链接</li>
<li><code>_self</code>：默认。在当前框架中打开链接</li>
<li><code>_top</code>：在整个窗口中打开链接</li>
</ul>
<p><strong>Note</strong>：仅在设置了 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>rel</td>
    <td>rel</td>
    <td>true</td>
    <td>&#39;alternate&#39; | &#39;author&#39; | &#39;bookmark&#39; | &#39;external&#39; | &#39;help&#39; | &#39;license&#39; | &#39;me&#39; | &#39;next&#39; | &#39;nofollow&#39; | &#39;noreferrer&#39; | &#39;opener&#39; | &#39;prev&#39; | &#39;search&#39; | &#39;tag&#39;</td>
    <td></td>
    <td><p>当前文档与被链接文档之间的关系。可选值包括：</p>
<ul>
<li><code>alternate</code>：当前文档的替代版本</li>
<li><code>author</code>：当前文档或文章的作者</li>
<li><code>bookmark</code>：永久链接到最近的祖先章节</li>
<li><code>external</code>：引用的文档与当前文档不在同一站点</li>
<li><code>help</code>：链接到相关的帮助文档</li>
<li><code>license</code>：当前文档的主要内容由被引用文件的版权许可覆盖</li>
<li><code>me</code>：当前文档代表链接内容的所有者</li>
<li><code>next</code>：当前文档是系列中的一部分，被引用的文档是系列的下一个文档</li>
<li><code>nofollow</code>：当前文档的作者或发布者不认可被引用的文件</li>
<li><code>noreferrer</code>：不包含 <code>Referer</code> 头。类似于 <code>noopener</code> 的效果</li>
<li><code>opener</code>：如果超链接会创建一个顶级浏览上下文（即 <code>target</code> 属性值为 <code>_blank</code>），则创建一个辅助浏览上下文</li>
<li><code>prev</code>：当前文档是系列的一部分，被引用的文档是系列的上一个文档</li>
<li><code>search</code>：提供一个资源链接，可用于搜索当前文件及其相关页面</li>
<li><code>tag</code>：提供一个适用于当前文档的标签（由给定地址识别）</li>
</ul>
<p><strong>Note</strong>：仅在指定了 <code>href</code> 属性时可用。</p>
</td>
  </tr>
  <tr>
    <td>autofocus</td>
    <td>autofocus</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否在页面加载完成后自动获取焦点</p>
</td>
  </tr>
  <tr>
    <td>tabindex</td>
    <td>tabIndex</td>
    <td>false</td>
    <td>number</td>
    <td></td>
    <td><p>元素在使用 Tab 键切换焦点时的顺序</p>
</td>
  </tr>
</tbody>
</table>

### 方法

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>click(): void</td>
    <td><p>模拟鼠标点击元素</p>
</td>
  </tr>
  <tr>
    <td>focus(options?: FocusOptions): void</td>
    <td><p>将焦点设置到当前元素。</p>
<p>可以传入一个对象作为参数，该对象的属性包括：</p>
<ul>
<li><code>preventScroll</code>：默认情况下，元素获取焦点后，页面会滚动以将该元素滚动到视图中。如果不希望页面滚动，可以将此属性设置为 <code>true</code>。</li>
</ul>
</td>
  </tr>
  <tr>
    <td>blur(): void</td>
    <td><p>移除当前元素的焦点</p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>focus</td>
    <td><p>获得焦点时触发</p>
</td>
  </tr>
  <tr>
    <td>blur</td>
    <td><p>失去焦点时触发</p>
</td>
  </tr>
  <tr>
    <td>submenu-open</td>
    <td><p>子菜单开始打开时，事件被触发。可以通过调用 <code>event.preventDefault()</code> 阻止子菜单打开</p>
</td>
  </tr>
  <tr>
    <td>submenu-opened</td>
    <td><p>子菜单打开动画完成时，事件被触发</p>
</td>
  </tr>
  <tr>
    <td>submenu-close</td>
    <td><p>子菜单开始关闭时，事件被触发。可以通过调用 <code>event.preventDefault()</code> 阻止子菜单关闭</p>
</td>
  </tr>
  <tr>
    <td>submenu-closed</td>
    <td><p>子菜单关闭动画完成时，事件被触发</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p>菜单项的文本</p>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td><p>菜单项左侧图标</p>
</td>
  </tr>
  <tr>
    <td>end-icon</td>
    <td><p>菜单项右侧图标</p>
</td>
  </tr>
  <tr>
    <td>end-text</td>
    <td><p>菜单右侧的文本</p>
</td>
  </tr>
  <tr>
    <td>selected-icon</td>
    <td><p>选中状态的图标</p>
</td>
  </tr>
  <tr>
    <td>submenu</td>
    <td><p>子菜单</p>
</td>
  </tr>
  <tr>
    <td>custom</td>
    <td><p>任意自定义内容</p>
</td>
  </tr>
</tbody>
</table>

### CSS Parts

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>container</td>
    <td><p>菜单项的容器</p>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td><p>左侧的图标</p>
</td>
  </tr>
  <tr>
    <td>label</td>
    <td><p>文本内容</p>
</td>
  </tr>
  <tr>
    <td>end-icon</td>
    <td><p>右侧的图标</p>
</td>
  </tr>
  <tr>
    <td>end-text</td>
    <td><p>右侧的文本</p>
</td>
  </tr>
  <tr>
    <td>selected-icon</td>
    <td><p>选中状态的图标</p>
</td>
  </tr>
  <tr>
    <td>submenu</td>
    <td><p>子菜单元素</p>
</td>
  </tr>
</tbody>
</table>

## mdui-menu API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>selects</td>
    <td>selects</td>
    <td>true</td>
    <td>&#39;single&#39; | &#39;multiple&#39;</td>
    <td></td>
    <td><p>菜单项的可选状态。默认不可选。可选值包括：</p>
<ul>
<li><code>single</code>：单选</li>
<li><code>multiple</code>：多选</li>
</ul>
</td>
  </tr>
  <tr>
    <td>value</td>
    <td>value</td>
    <td>false</td>
    <td>string | string[]</td>
    <td></td>
    <td><p>当前选中的 <code>&lt;mdui-menu-item&gt;</code> 的值。</p>
<p><strong>Note</strong>：该属性的 HTML 属性始终为字符串，仅在 <code>selects=&quot;single&quot;</code> 时可通过 HTML 属性设置初始值；该属性的 JavaScript 属性值在 <code>selects=&quot;single&quot;</code> 时为字符串，在 <code>selects=&quot;multiple&quot;</code> 时为字符串数组。因此，在 <code>selects=&quot;multiple&quot;</code> 时，若要修改该值，只能通过修改 JavaScript 属性值实现。</p>
</td>
  </tr>
  <tr>
    <td>dense</td>
    <td>dense</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>菜单项是否使用紧凑布局</p>
</td>
  </tr>
  <tr>
    <td>submenu-trigger</td>
    <td>submenuTrigger</td>
    <td>true</td>
    <td>&#39;click&#39; | &#39;hover&#39; | &#39;focus&#39; | &#39;manual&#39; | string</td>
    <td>'click hover'</td>
    <td><p>子菜单的触发方式，支持多个值，用空格分隔。可选值包括：</p>
<ul>
<li><code>click</code>：点击菜单项时打开子菜单</li>
<li><code>hover</code>：鼠标悬浮到菜单项上时打开子菜单</li>
<li><code>focus</code>：聚焦到菜单项上时打开子菜单</li>
<li><code>manual</code>：仅能通过编程方式打开和关闭子菜单，不能再指定其他触发方式</li>
</ul>
</td>
  </tr>
  <tr>
    <td>submenu-open-delay</td>
    <td>submenuOpenDelay</td>
    <td>true</td>
    <td>number</td>
    <td>200</td>
    <td><p>鼠标悬浮触发子菜单打开的延时，单位毫秒</p>
</td>
  </tr>
  <tr>
    <td>submenu-close-delay</td>
    <td>submenuCloseDelay</td>
    <td>true</td>
    <td>number</td>
    <td>200</td>
    <td><p>鼠标悬浮触发子菜单关闭的延时，单位毫秒</p>
</td>
  </tr>
</tbody>
</table>

### 方法

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>focus(options?: FocusOptions): void</td>
    <td><p>将焦点设置在当前元素上</p>
</td>
  </tr>
  <tr>
    <td>blur(): void</td>
    <td><p>从当前元素中移除焦点</p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>change</td>
    <td><p>菜单项选中状态变化时触发</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p>子菜单项（<code>&lt;mdui-menu-item&gt;</code>）、分割线（<a href="/docs/2/components/divider"><code>&lt;mdui-divider&gt;</code></a>）等元素</p>
</td>
  </tr>
</tbody>
</table>

### CSS 自定义属性

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>--shape-corner</td>
    <td><p>组件的圆角大小。可以指定一个具体的像素值；但更推荐引用<a href="/docs/2/styles/design-tokens#shape-corner">设计令牌</a></p>
</td>
  </tr>
</tbody>
</table>

# 底部导航栏组件 NavigationBar

导航栏用于在移动端页面中方便地在几个主要页面之间进行切换。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/navigation-bar.js';
import 'mdui/components/navigation-bar-item.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { NavigationBar } from 'mdui/components/navigation-bar.js';
import type { NavigationBarItem } from 'mdui/components/navigation-bar-item.js';
```

使用示例：（示例中的 `style="position: relative"` 仅用于演示，实际使用时请移除该样式。）

```html
<mdui-navigation-bar value="item-1" style="position: relative">
  <mdui-navigation-bar-item icon="place" value="item-1">Item 1</mdui-navigation-bar-item>
  <mdui-navigation-bar-item icon="commute" value="item-2">Item 2</mdui-navigation-bar-item>
  <mdui-navigation-bar-item icon="people" value="item-3">Item 3</mdui-navigation-bar-item>
</mdui-navigation-bar>
```

**注意事项：**

该组件默认使用 `position: fixed` 定位，并会自动在 `body` 上添加 `padding-bottom` 样式，以防止页面内容被组件遮挡。但在以下两种情况下，会默认使用 `position: absolute` 定位：

1. 当指定了 `scroll-target` 属性时。此时会在 `scroll-target` 的元素上添加 `padding-bottom` 样式。
2. 当组件位于 [`<mdui-layout></mdui-layout>`](/zh-cn/docs/2/components/layout) 中时。此时不会添加 `padding-bottom` 样式。

## 示例 {#examples}

### 文本标签显示状态 {#example-label-visibility}

导航栏中的文本标签默认在导航项小于等于 3 个时始终显示；当导航项大于 3 个时，仅显示选中状态的文本。

```html
<mdui-navigation-bar value="item-1" style="position: relative">
  <mdui-navigation-bar-item icon="place" value="item-1">Item 1</mdui-navigation-bar-item>
  <mdui-navigation-bar-item icon="commute" value="item-2">Item 2</mdui-navigation-bar-item>
  <mdui-navigation-bar-item icon="people" value="item-3">Item 3</mdui-navigation-bar-item>
</mdui-navigation-bar>

<br/>

<mdui-navigation-bar value="item-1" style="position: relative">
  <mdui-navigation-bar-item icon="place" value="item-1">Item 1</mdui-navigation-bar-item>
  <mdui-navigation-bar-item icon="commute" value="item-2">Item 2</mdui-navigation-bar-item>
  <mdui-navigation-bar-item icon="directions_railway" value="item-3">Item 3</mdui-navigation-bar-item>
  <mdui-navigation-bar-item icon="people" value="item-4">Item 4</mdui-navigation-bar-item>
</mdui-navigation-bar>
```

你可以通过在 `<mdui-navigation-bar>` 组件上设置 `label-visibility` 属性来调整文本标签的显示状态。可选值有：

- `selected`：仅显示选中状态的文本
- `labeled`：始终显示文本
- `unlabeled`：始终不显示文本

```html
<mdui-navigation-bar value="item-1" label-visibility="selected" style="position: relative" class="example-label">
  <mdui-navigation-bar-item icon="place" value="item-1">Item 1</mdui-navigation-bar-item>
  <mdui-navigation-bar-item icon="commute" value="item-2">Item 2</mdui-navigation-bar-item>
  <mdui-navigation-bar-item icon="people" value="item-3">Item 3</mdui-navigation-bar-item>
</mdui-navigation-bar>

<mdui-segmented-button-group value="selected" selects="single" style="margin-top: 16px">
  <mdui-segmented-button value="selected">selected</mdui-segmented-button>
  <mdui-segmented-button value="labeled">labeled</mdui-segmented-button>
  <mdui-segmented-button value="unlabeled">unlabeled</mdui-segmented-button>
</mdui-segmented-button-group>

<script>
  const navigationBar = document.querySelector(".example-label");
  const segmentedButtonGroup = navigationBar.nextElementSibling;

  segmentedButtonGroup.addEventListener("change", (event) => {
    navigationBar.labelVisibility = event.target.value;
  });
</script>
```

### 位于指定容器内 {#example-scroll-target}

默认情况下，导航栏会相对于当前窗口，在页面底部显示。

如果你希望将导航栏放在指定的容器内，可以在 `<mdui-navigation-bar>` 组件上指定 `scroll-target` 属性。该属性的值应为可滚动内容的容器的 CSS 选择器或 DOM 元素。此时，导航栏会相对于父元素显示（你需要自行在父元素上添加 `position: relative; overflow: hidden` 样式）。

```html
<div style="position: relative;overflow: hidden">
  <mdui-navigation-bar scroll-target=".example-scroll-target" value="item-1">
    <mdui-navigation-bar-item icon="place" value="item-1">Item 1</mdui-navigation-bar-item>
    <mdui-navigation-bar-item icon="commute" value="item-2">Item 2</mdui-navigation-bar-item>
    <mdui-navigation-bar-item icon="people" value="item-3">Item 3</mdui-navigation-bar-item>
  </mdui-navigation-bar>

  <div class="example-scroll-target" style="height: 160px;overflow: auto;">
    <div style="height: 1000px">页面内容</div>
  </div>
</div>
```

### 滚动时隐藏 {#example-scroll-behavior}

通过在 `<mdui-navigation-bar>` 组件上设置 `scroll-behavior` 属性为 `hide`，可以实现页面向下滚动时隐藏导航栏，向上滚动时显示导航栏的效果。

使用 `scroll-threshold` 属性，可以设置滚动多少像素后开始隐藏导航栏。

```html
<div style="position: relative;overflow: hidden">
  <mdui-navigation-bar
    scroll-behavior="hide"
    scroll-threshold="30"
    scroll-target=".example-scroll-behavior"
    value="item-1"
  >
    <mdui-navigation-bar-item icon="place" value="item-1">Item 1</mdui-navigation-bar-item>
    <mdui-navigation-bar-item icon="commute" value="item-2">Item 2</mdui-navigation-bar-item>
    <mdui-navigation-bar-item icon="people" value="item-3">Item 3</mdui-navigation-bar-item>
  </mdui-navigation-bar>

  <div class="example-scroll-behavior" style="height: 160px;overflow: auto;">
    <div style="height: 1000px">页面内容</div>
  </div>
</div>
```

### 图标 {#example-icon}

在 `<mdui-navigation-bar-item>` 组件上，`icon` 属性用于设置未激活状态的导航项图标，`active-icon` 属性用于设置激活状态的导航项图标。也可以通过 `icon` 和 `active-icon` slot 来设置未激活和激活状态的图标元素。

```html
<mdui-navigation-bar value="item-1" style="position: relative">
  <mdui-navigation-bar-item
    icon="place--outlined"
    active-icon="place"
    value="item-1"
  >Item 1</mdui-navigation-bar-item>
  <mdui-navigation-bar-item value="item-2">
    Item 2
    <mdui-icon slot="icon" name="people--outlined"></mdui-icon>
    <mdui-icon slot="active-icon" name="people"></mdui-icon>
  </mdui-navigation-bar-item>
</mdui-navigation-bar>
```

### 链接 {#example-link}

在 `<mdui-navigation-bar-item>` 组件上设置 `href` 属性，可以将导航项变为链接。此时，还可以使用与链接相关的属性：`download`、`target`、`rel`。

```html
<mdui-navigation-bar value="item-1" style="position: relative">
  <mdui-navigation-bar-item icon="place" href="https://www.mdui.org" target="_blank" value="item-1">Item 1</mdui-navigation-bar-item>
  <mdui-navigation-bar-item icon="commute" value="item-2">Item 2</mdui-navigation-bar-item>
</mdui-navigation-bar>
```

### 徽标 {#example-badge}

在 `<mdui-navigation-bar-item>` 组件中，可以通过 `badge` slot 添加徽章。

```html
<mdui-navigation-bar value="item-1" style="position: relative">
  <mdui-navigation-bar-item icon="place" value="item-1">
    Item 1
    <mdui-badge slot="badge">99+</mdui-badge>
  </mdui-navigation-bar-item>
  <mdui-navigation-bar-item icon="commute" value="item-2">Item 2</mdui-navigation-bar-item>
</mdui-navigation-bar>
```

## mdui-navigation-bar-item API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>icon</td>
    <td>icon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>未激活状态的 Material Icons 图标名。也可以通过 <code>slot=&quot;icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>active-icon</td>
    <td>activeIcon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>激活状态的 Material Icons 图标名。也可以通过 <code>slot=&quot;active-icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>value</td>
    <td>value</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>导航项的值</p>
</td>
  </tr>
  <tr>
    <td>href</td>
    <td>href</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>链接的目标 URL。</p>
<p>如果设置了此属性，组件内部将渲染为 <code>&lt;a&gt;</code> 元素，并可以使用链接相关的属性。</p>
</td>
  </tr>
  <tr>
    <td>download</td>
    <td>download</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>下载链接的目标。</p>
<p><strong>Note</strong>：仅在设置了 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>target</td>
    <td>target</td>
    <td>true</td>
    <td>&#39;_blank&#39; | &#39;_parent&#39; | &#39;_self&#39; | &#39;_top&#39;</td>
    <td></td>
    <td><p>链接的打开方式。可选值包括：</p>
<ul>
<li><code>_blank</code>：在新窗口中打开链接</li>
<li><code>_parent</code>：在父框架中打开链接</li>
<li><code>_self</code>：默认。在当前框架中打开链接</li>
<li><code>_top</code>：在整个窗口中打开链接</li>
</ul>
<p><strong>Note</strong>：仅在设置了 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>rel</td>
    <td>rel</td>
    <td>true</td>
    <td>&#39;alternate&#39; | &#39;author&#39; | &#39;bookmark&#39; | &#39;external&#39; | &#39;help&#39; | &#39;license&#39; | &#39;me&#39; | &#39;next&#39; | &#39;nofollow&#39; | &#39;noreferrer&#39; | &#39;opener&#39; | &#39;prev&#39; | &#39;search&#39; | &#39;tag&#39;</td>
    <td></td>
    <td><p>当前文档与被链接文档之间的关系。可选值包括：</p>
<ul>
<li><code>alternate</code>：当前文档的替代版本</li>
<li><code>author</code>：当前文档或文章的作者</li>
<li><code>bookmark</code>：永久链接到最近的祖先章节</li>
<li><code>external</code>：引用的文档与当前文档不在同一站点</li>
<li><code>help</code>：链接到相关的帮助文档</li>
<li><code>license</code>：当前文档的主要内容由被引用文件的版权许可覆盖</li>
<li><code>me</code>：当前文档代表链接内容的所有者</li>
<li><code>next</code>：当前文档是系列中的一部分，被引用的文档是系列的下一个文档</li>
<li><code>nofollow</code>：当前文档的作者或发布者不认可被引用的文件</li>
<li><code>noreferrer</code>：不包含 <code>Referer</code> 头。类似于 <code>noopener</code> 的效果</li>
<li><code>opener</code>：如果超链接会创建一个顶级浏览上下文（即 <code>target</code> 属性值为 <code>_blank</code>），则创建一个辅助浏览上下文</li>
<li><code>prev</code>：当前文档是系列的一部分，被引用的文档是系列的上一个文档</li>
<li><code>search</code>：提供一个资源链接，可用于搜索当前文件及其相关页面</li>
<li><code>tag</code>：提供一个适用于当前文档的标签（由给定地址识别）</li>
</ul>
<p><strong>Note</strong>：仅在指定了 <code>href</code> 属性时可用。</p>
</td>
  </tr>
  <tr>
    <td>autofocus</td>
    <td>autofocus</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否在页面加载完成后自动获取焦点</p>
</td>
  </tr>
  <tr>
    <td>tabindex</td>
    <td>tabIndex</td>
    <td>false</td>
    <td>number</td>
    <td></td>
    <td><p>元素在使用 Tab 键切换焦点时的顺序</p>
</td>
  </tr>
</tbody>
</table>

### 方法

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>click(): void</td>
    <td><p>模拟鼠标点击元素</p>
</td>
  </tr>
  <tr>
    <td>focus(options?: FocusOptions): void</td>
    <td><p>将焦点设置到当前元素。</p>
<p>可以传入一个对象作为参数，该对象的属性包括：</p>
<ul>
<li><code>preventScroll</code>：默认情况下，元素获取焦点后，页面会滚动以将该元素滚动到视图中。如果不希望页面滚动，可以将此属性设置为 <code>true</code>。</li>
</ul>
</td>
  </tr>
  <tr>
    <td>blur(): void</td>
    <td><p>移除当前元素的焦点</p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>focus</td>
    <td><p>获得焦点时触发</p>
</td>
  </tr>
  <tr>
    <td>blur</td>
    <td><p>失去焦点时触发</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p>导航项文本</p>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td><p>图标</p>
</td>
  </tr>
  <tr>
    <td>active-icon</td>
    <td><p>激活状态的图标元素</p>
</td>
  </tr>
  <tr>
    <td>badge</td>
    <td><p>徽标</p>
</td>
  </tr>
</tbody>
</table>

### CSS Parts

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>container</td>
    <td><p>导航项容器</p>
</td>
  </tr>
  <tr>
    <td>indicator</td>
    <td><p>指示器</p>
</td>
  </tr>
  <tr>
    <td>badge</td>
    <td><p>徽标</p>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td><p>图标</p>
</td>
  </tr>
  <tr>
    <td>active-icon</td>
    <td><p>激活状态的图标</p>
</td>
  </tr>
  <tr>
    <td>label</td>
    <td><p>导航项文本</p>
</td>
  </tr>
</tbody>
</table>

### CSS 自定义属性

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>--shape-corner-indicator</td>
    <td><p>指示器的圆角大小。可以指定一个具体的像素值；但更推荐引用<a href="/docs/2/styles/design-tokens#shape-corner">设计令牌</a></p>
</td>
  </tr>
</tbody>
</table>

## mdui-navigation-bar API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>hide</td>
    <td>hide</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否隐藏</p>
</td>
  </tr>
  <tr>
    <td>label-visibility</td>
    <td>labelVisibility</td>
    <td>true</td>
    <td>&#39;auto&#39; | &#39;selected&#39; | &#39;labeled&#39; | &#39;unlabeled&#39;</td>
    <td>'auto'</td>
    <td><p>文本的可视状态。可选值包括：</p>
<ul>
<li><code>auto</code>：当选项小于等于3个时，始终显示文本；当选项大于3个时，仅显示选中状态的文本</li>
<li><code>selected</code>：仅在选中状态显示文本</li>
<li><code>labeled</code>：始终显示文本</li>
<li><code>unlabeled</code>：始终不显示文本</li>
</ul>
</td>
  </tr>
  <tr>
    <td>value</td>
    <td>value</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>当前选中的 <code>&lt;mdui-navigation-bar-item&gt;</code> 的值</p>
</td>
  </tr>
  <tr>
    <td>scroll-behavior</td>
    <td>scrollBehavior</td>
    <td>true</td>
    <td>&#39;hide&#39; | &#39;shrink&#39; | &#39;elevate&#39;</td>
    <td></td>
    <td><p>滚动行为。可选值包括：</p>
<ul>
<li><code>hide</code>：滚动时隐藏</li>
</ul>
</td>
  </tr>
  <tr>
    <td>scroll-target</td>
    <td>scrollTarget</td>
    <td>false</td>
    <td>string | HTMLElement | JQ&lt;HTMLElement&gt;</td>
    <td></td>
    <td><p>需要监听其滚动事件的元素。值可以是 CSS 选择器、DOM 元素、或 <a href="/docs/2/functions/jq">JQ 对象</a>。默认监听 <code>window</code> 的滚动事件</p>
</td>
  </tr>
  <tr>
    <td>scroll-threshold</td>
    <td>scrollThreshold</td>
    <td>true</td>
    <td>number</td>
    <td></td>
    <td><p>在滚动多少距离之后触发滚动行为，单位为 <code>px</code></p>
</td>
  </tr>
  <tr>
    <td>order</td>
    <td>order</td>
    <td>true</td>
    <td>number</td>
    <td></td>
    <td><p>该组件在 <a href="/docs/2/components/layout"><code>&lt;mdui-layout&gt;</code></a> 中的布局顺序，按从小到大排序。默认为 <code>0</code></p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>change</td>
    <td><p>值变化时触发</p>
</td>
  </tr>
  <tr>
    <td>show</td>
    <td><p>开始显示时，事件被触发。可以通过调用 <code>event.preventDefault()</code> 阻止显示</p>
</td>
  </tr>
  <tr>
    <td>shown</td>
    <td><p>显示动画完成时，事件被触发</p>
</td>
  </tr>
  <tr>
    <td>hide</td>
    <td><p>开始隐藏时，事件被触发。可以通过调用 <code>event.preventDefault()</code> 阻止隐藏</p>
</td>
  </tr>
  <tr>
    <td>hidden</td>
    <td><p>隐藏动画完成时，事件被触发</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p><code>&lt;mdui-navigation-bar-item&gt;</code> 组件</p>
</td>
  </tr>
</tbody>
</table>

### CSS 自定义属性

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>--shape-corner</td>
    <td><p>组件的圆角大小。可以指定一个具体的像素值；但更推荐引用<a href="/docs/2/styles/design-tokens#shape-corner">设计令牌</a></p>
</td>
  </tr>
  <tr>
    <td>--z-index</td>
    <td><p>组件的 CSS <code>z-index</code> 值</p>
</td>
  </tr>
</tbody>
</table>

# 侧边抽屉栏组件 NavigationDrawer

侧边抽屉栏用于在页面侧边提供导航功能，使用户能够快速访问不同的页面或内容。

通常，可以在侧边抽屉栏中使用 [`<mdui-list>`](/zh-cn/docs/2/components/list) 组件来添加导航项。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/navigation-drawer.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { NavigationDrawer } from 'mdui/components/navigation-drawer.js';
```

使用示例：

```html
<mdui-navigation-drawer close-on-overlay-click class="example-drawer">
  <mdui-button>关闭侧边抽屉栏</mdui-button>
</mdui-navigation-drawer>

<mdui-button>打开侧边抽屉栏</mdui-button>

<script>
  const navigationDrawer = document.querySelector(".example-drawer");
  const openButton = navigationDrawer.nextElementSibling;
  const closeButton = navigationDrawer.querySelector("mdui-button");

  openButton.addEventListener("click", () => navigationDrawer.open = true);
  closeButton.addEventListener("click", () => navigationDrawer.open = false);
</script>
```

**注意事项：**

该组件默认使用 `position: fixed` 定位。

当 `modal` 属性为 `false`，且断点大于等于 [`--mdui-breakpoint-md`](/zh-cn/docs/2/styles/design-tokens#breakpoint) 时，会自动在 `body` 上添加 `padding-left` 或 `padding-right` 样式，以避免页面内容被该组件遮挡。

但在以下两种情况下，会默认使用 `position: absolute` 定位：

1. `contained` 属性为 `true` 时。
2. 当组件位于 [`<mdui-layout></mdui-layout>`](/zh-cn/docs/2/components/layout) 中时。此时不会添加 `padding-left` 或 `padding-right` 样式。

## 示例 {#examples}

### 位于指定容器内 {#example-contained}

默认情况下，侧边抽屉栏会相对于当前窗口，在页面左侧或右侧显示。如果你希望把侧边抽屉栏放在指定容器内，可以添加 `contained` 属性，此时侧边抽屉栏会相对于父元素显示（你需要自行在父元素上添加样式 `position: relative; overflow: hidden;`）。

```html
<div class="example-contained" style="position: relative; overflow: hidden">
  <mdui-navigation-drawer contained>
    <mdui-button class="close">关闭侧边抽屉栏</mdui-button>
  </mdui-navigation-drawer>

  <div style="height: 160px;">
    <mdui-button class="open">打开侧边抽屉栏</mdui-button>
  </div>
</div>

<script>
  const example = document.querySelector(".example-contained");
  const navigationDrawer = example.querySelector("mdui-navigation-drawer");
  const openButton = example.querySelector(".open");
  const closeButton = example.querySelector(".close");

  openButton.addEventListener("click", () => navigationDrawer.open = true);
  closeButton.addEventListener("click", () => navigationDrawer.open = false);
</script>
```

### 模态化 {#example-modal}

添加 `modal` 属性可以在打开侧边抽屉栏时显示遮罩层。注意在窗口或父元素宽度小于 [`--mdui-breakpoint-md`](/zh-cn/docs/2/styles/design-tokens#breakpoint) 时，会无视该参数，始终会显示遮罩层。

添加 `close-on-esc` 属性，可以在按下 ESC 键时关闭侧边抽屉栏。

添加 `close-on-overlay-click` 属性，可以在点击遮罩层时关闭侧边抽屉栏。

```html
<div class="example-modal" style="position: relative; overflow: hidden">
  <mdui-navigation-drawer modal close-on-esc close-on-overlay-click contained>
    <mdui-button class="close">关闭侧边抽屉栏</mdui-button>
  </mdui-navigation-drawer>

  <div style="height: 160px;">
    <mdui-button class="open">打开侧边抽屉栏</mdui-button>
  </div>
</div>

<script>
  const example = document.querySelector(".example-modal");
  const navigationDrawer = example.querySelector("mdui-navigation-drawer");
  const openButton = example.querySelector(".open");
  const closeButton = example.querySelector(".close");

  openButton.addEventListener("click", () => navigationDrawer.open = true);
  closeButton.addEventListener("click", () => navigationDrawer.open = false);
</script>
```

### 位于右侧 {#example-placement}

通过将 `placement` 属性设置为 `right`，可以将侧边抽屉栏显示在页面右侧。

```html
<div class="example-placement" style="position: relative; overflow: hidden">
  <mdui-navigation-drawer placement="right" modal close-on-esc close-on-overlay-click contained>
    <mdui-button class="close">关闭侧边抽屉栏</mdui-button>
  </mdui-navigation-drawer>

  <div style="height: 160px;">
    <mdui-button class="open">打开侧边抽屉栏</mdui-button>
  </div>
</div>

<script>
  const example = document.querySelector(".example-placement");
  const navigationDrawer = example.querySelector("mdui-navigation-drawer");
  const openButton = example.querySelector(".open");
  const closeButton = example.querySelector(".close");

  openButton.addEventListener("click", () => navigationDrawer.open = true);
  closeButton.addEventListener("click", () => navigationDrawer.open = false);
</script>
```

## mdui-navigation-drawer API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>open</td>
    <td>open</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否打开抽屉栏</p>
</td>
  </tr>
  <tr>
    <td>modal</td>
    <td>modal</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>抽屉栏打开时，是否显示遮罩层</p>
<p>在窄屏设备上（屏幕宽度小于 <a href="/docs/2/styles/design-tokens#breakpoint"><code>--mdui-breakpoint-md</code></a>），会始终显示遮罩层，无视该参数</p>
</td>
  </tr>
  <tr>
    <td>close-on-esc</td>
    <td>closeOnEsc</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>在有遮罩层的情况下，按下 ESC 键是否关闭抽屉栏</p>
</td>
  </tr>
  <tr>
    <td>close-on-overlay-click</td>
    <td>closeOnOverlayClick</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>点击遮罩层时，是否关闭抽屉栏</p>
</td>
  </tr>
  <tr>
    <td>placement</td>
    <td>placement</td>
    <td>true</td>
    <td>&#39;left&#39; | &#39;right&#39;</td>
    <td>'left'</td>
    <td><p>抽屉栏的位置。可选值包括：</p>
<ul>
<li><code>left</code>：左侧</li>
<li><code>right</code>：右侧</li>
</ul>
</td>
  </tr>
  <tr>
    <td>contained</td>
    <td>contained</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>默认情况下，抽屉栏相对于 <code>body</code> 元素显示。当该参数设置为 <code>true</code> 时，抽屉栏将相对于其父元素显示。</p>
<p><strong>Note</strong>：设置该属性时，必须在父元素上手动设置样式 <code>position: relative; overflow: hidden;</code>。</p>
</td>
  </tr>
  <tr>
    <td>order</td>
    <td>order</td>
    <td>true</td>
    <td>number</td>
    <td></td>
    <td><p>该组件在 <a href="/docs/2/components/layout"><code>&lt;mdui-layout&gt;</code></a> 中的布局顺序，按从小到大排序。默认为 <code>0</code></p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>open</td>
    <td><p>抽屉栏打开之前触发。可以通过调用 <code>event.preventDefault()</code> 阻止抽屉栏打开</p>
</td>
  </tr>
  <tr>
    <td>opened</td>
    <td><p>抽屉栏打开动画完成之后触发</p>
</td>
  </tr>
  <tr>
    <td>close</td>
    <td><p>抽屉栏关闭之前触发。可以通过调用 <code>event.preventDefault()</code> 阻止抽屉栏关闭</p>
</td>
  </tr>
  <tr>
    <td>closed</td>
    <td><p>抽屉栏关闭动画完成之后触发</p>
</td>
  </tr>
  <tr>
    <td>overlay-click</td>
    <td><p>点击遮罩层时触发</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p>抽屉栏中的内容</p>
</td>
  </tr>
</tbody>
</table>

### CSS Parts

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>overlay</td>
    <td><p>遮罩层</p>
</td>
  </tr>
  <tr>
    <td>panel</td>
    <td><p>抽屉栏容器</p>
</td>
  </tr>
</tbody>
</table>

### CSS 自定义属性

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>--shape-corner</td>
    <td><p>组件的圆角大小。可以指定一个具体的像素值；但更推荐引用<a href="/docs/2/styles/design-tokens#shape-corner">设计令牌</a></p>
</td>
  </tr>
  <tr>
    <td>--z-index</td>
    <td><p>组件的 CSS <code>z-index</code> 值</p>
</td>
  </tr>
</tbody>
</table>

# 侧边导航栏组件 NavigationRail

侧边导航栏为平板电脑和桌面电脑提供了访问不同主页面的方式。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/navigation-rail.js';
import 'mdui/components/navigation-rail-item.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { NavigationRail } from 'mdui/components/navigation-rail.js';
import type { NavigationRailItem } from 'mdui/components/navigation-rail-item.js';
```

使用示例：（示例中的 `style="position: relative"` 是为了演示需要，实际使用时请移除该样式。）

```html
<mdui-navigation-rail value="recent" style="position: relative">
  <mdui-navigation-rail-item icon="watch_later--outlined" value="recent">Recent</mdui-navigation-rail-item>
  <mdui-navigation-rail-item icon="image--outlined" value="images">Images</mdui-navigation-rail-item>
  <mdui-navigation-rail-item icon="library_music--outlined" value="library">Library</mdui-navigation-rail-item>
</mdui-navigation-rail>
```

**注意事项：**

该组件默认使用 `position: fixed` 定位，并会自动在 `body` 上添加 `padding-left` 或 `padding-right` 样式，以防止页面内容被该组件遮挡。

但在以下两种情况下，会默认使用 `position: absolute` 定位：

1. `<mdui-navigation-rail>` 组件的 `contained` 属性为 `true` 时。此时会在父元素上添加 `padding-left` 或 `padding-right` 样式。
2. 当位于 [`<mdui-layout></mdui-layout>`](/zh-cn/docs/2/components/layout) 组件中时。此时不会添加 `padding-left` 或 `padding-right` 样式。

## 样式 {#examples}

### 位于指定容器内 {#example-contained}

默认情况下，侧边导航栏会相对于当前窗口，在页面左侧或右侧显示。如果你希望将侧边导航栏放在指定的容器内，可以在 `<mdui-navigation-rail>` 组件上添加 `contained` 属性，此时侧边导航栏会相对于其父元素显示（你需要自行在父元素上添加 `position: relative` 样式）。

```html
<div style="position: relative">
  <mdui-navigation-rail contained>
    <mdui-navigation-rail-item icon="watch_later--outlined">Recent</mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="image--outlined">Images</mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="library_music--outlined">Library</mdui-navigation-rail-item>
  </mdui-navigation-rail>

  <div style="height: 260px;overflow: auto">
    <div style="height: 1000px">页面内容</div>
  </div>
</div>
```

### 位于右侧 {#example-placement}

在 `<mdui-navigation-rail>` 组件上设置 `placement` 属性为 `right`，可以将侧边导航栏显示在右侧。

```html
<div style="position: relative">
  <mdui-navigation-rail placement="right" contained>
    <mdui-navigation-rail-item icon="watch_later--outlined">Recent</mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="image--outlined">Images</mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="library_music--outlined">Library</mdui-navigation-rail-item>
  </mdui-navigation-rail>

  <div style="height: 260px;overflow: auto">
    <div style="height: 1000px">页面内容</div>
  </div>
</div>
```

### 显示分割线 {#example-divider}

在 `<mdui-navigation-rail>` 组件上添加 `divider` 属性，可以在侧边导航栏上添加一条分割线，以便和页面内容区分开。

```html
<div style="position: relative">
  <mdui-navigation-rail divider contained>
    <mdui-navigation-rail-item icon="watch_later--outlined">Recent</mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="image--outlined">Images</mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="library_music--outlined">Library</mdui-navigation-rail-item>
  </mdui-navigation-rail>

  <div style="height: 260px;overflow: auto">
    <div style="height: 1000px">页面内容</div>
  </div>
</div>
```

### 在顶部/底部添加元素 {#example-top-bottom}

可以在 `<mdui-navigation-rail>` 组件内通过 `top`、`bottom` slot 在顶部和底部添加元素。

```html
<div style="position: relative">
  <mdui-navigation-rail contained>
    <mdui-button-icon icon="menu" slot="top"></mdui-button-icon>
    <mdui-fab lowered icon="edit--outlined" slot="top"></mdui-fab>
    <mdui-button-icon icon="settings" slot="bottom"></mdui-button-icon>

    <mdui-navigation-rail-item icon="watch_later--outlined">Recent</mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="image--outlined">Images</mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="library_music--outlined">Library</mdui-navigation-rail-item>
  </mdui-navigation-rail>

  <div style="height: 600px;overflow: auto">
    <div style="height: 1000px">页面内容</div>
  </div>
</div>
```

### 导航项垂直对齐方式 {#example-alignment}

通过设置 `<mdui-navigation-rail>` 组件的 `alignment` 属性，可以修改导航项的垂直对齐方式。

```html
<div class="example-alignment" style="position: relative">
  <mdui-navigation-rail alignment="start" contained>
    <mdui-navigation-rail-item icon="watch_later--outlined">Recent</mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="image--outlined">Images</mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="library_music--outlined">Library</mdui-navigation-rail-item>
  </mdui-navigation-rail>

  <div style="height: 360px;overflow: auto">
    <mdui-segmented-button-group value="start" selects="single">
      <mdui-segmented-button value="start">start</mdui-segmented-button>
      <mdui-segmented-button value="center">center</mdui-segmented-button>
      <mdui-segmented-button value="end">end</mdui-segmented-button>
    </mdui-segmented-button-group>
  </div>
</div>

<script>
  const example = document.querySelector(".example-alignment");
  const navigationRail = example.querySelector("mdui-navigation-rail");
  const segmentedButtonGroup = example.querySelector("mdui-segmented-button-group");

  segmentedButtonGroup.addEventListener("change", (event) => {
    navigationRail.alignment = event.target.value;
  });
</script>
```

### 图标 {#example-icon}

在 `<mdui-navigation-rail-item>` 组件上，可以使用 `icon` 属性设置未激活状态的导航项图标，使用 `active-icon` 属性设置激活状态的导航项图标。也可以用 `icon` 和 `active-icon` slot 设置未激活和激活状态的图标元素。

```html
<div style="position: relative">
  <mdui-navigation-rail contained>
    <mdui-navigation-rail-item icon="watch_later--outlined">Recent</mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="image--outlined" active-icon="image--filled">Images</mdui-navigation-rail-item>
    <mdui-navigation-rail-item>
      Library
      <mdui-icon slot="icon" name="library_music--outlined"></mdui-icon>
      <mdui-icon slot="active-icon" name="library_music--filled"></mdui-icon>
    </mdui-navigation-rail-item>
  </mdui-navigation-rail>

  <div style="height: 260px;overflow: auto">
    <div style="height: 1000px">页面内容</div>
  </div>
</div>
```

### 仅使用图标 {#example-no-label}

`<mdui-navigation-rail-item>` 组件可以仅使用图标，不添加文本。

```html
<div style="position: relative">
  <mdui-navigation-rail contained>
    <mdui-navigation-rail-item icon="watch_later--outlined"></mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="image--outlined"></mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="library_music--outlined"></mdui-navigation-rail-item>
  </mdui-navigation-rail>

  <div style="height: 260px;overflow: auto">
    <div style="height: 1000px">页面内容</div>
  </div>
</div>
```

### 链接 {#example-link}

在 `<mdui-navigation-rail-item>` 组件上设置 `href` 属性，可以使导航项变为链接。此时，您还可以使用这些和链接相关的属性：`download`、`target`、`rel`。

```html
<div style="position: relative">
  <mdui-navigation-rail divider contained>
    <mdui-navigation-rail-item
      href="https://www.mdui.org"
      target="_blank"
      icon="watch_later--outlined"
    >Recent</mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="image--outlined">Images</mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="library_music--outlined">Library</mdui-navigation-rail-item>
  </mdui-navigation-rail>

  <div style="height: 260px;overflow: auto">
    <div style="height: 1000px">页面内容</div>
  </div>
</div>
```

### 徽标 {#example-badge}

在 `<mdui-navigation-rail-item>` 组件中，可以通过 `badge` slot 添加徽标。

```html
<div style="position: relative">
  <mdui-navigation-rail contained>
    <mdui-navigation-rail-item icon="watch_later--outlined">
      Recent
      <mdui-badge slot="badge">99+</mdui-badge>
    </mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="image--outlined">Images</mdui-navigation-rail-item>
    <mdui-navigation-rail-item icon="library_music--outlined">Library</mdui-navigation-rail-item>
  </mdui-navigation-rail>

  <div style="height: 260px;overflow: auto">
    <div style="height: 1000px">页面内容</div>
  </div>
</div>
```

## mdui-navigation-rail-item API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>icon</td>
    <td>icon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>未激活状态下的 Material Icons 图标名。也可以通过 <code>slot=&quot;icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>active-icon</td>
    <td>activeIcon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>激活状态下的 Material Icons 图标名。也可以通过 <code>slot=&quot;active-icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>value</td>
    <td>value</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>导航项的值</p>
</td>
  </tr>
  <tr>
    <td>href</td>
    <td>href</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>链接的目标 URL。</p>
<p>如果设置了此属性，组件内部将渲染为 <code>&lt;a&gt;</code> 元素，并可以使用链接相关的属性。</p>
</td>
  </tr>
  <tr>
    <td>download</td>
    <td>download</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>下载链接的目标。</p>
<p><strong>Note</strong>：仅在设置了 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>target</td>
    <td>target</td>
    <td>true</td>
    <td>&#39;_blank&#39; | &#39;_parent&#39; | &#39;_self&#39; | &#39;_top&#39;</td>
    <td></td>
    <td><p>链接的打开方式。可选值包括：</p>
<ul>
<li><code>_blank</code>：在新窗口中打开链接</li>
<li><code>_parent</code>：在父框架中打开链接</li>
<li><code>_self</code>：默认。在当前框架中打开链接</li>
<li><code>_top</code>：在整个窗口中打开链接</li>
</ul>
<p><strong>Note</strong>：仅在设置了 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>rel</td>
    <td>rel</td>
    <td>true</td>
    <td>&#39;alternate&#39; | &#39;author&#39; | &#39;bookmark&#39; | &#39;external&#39; | &#39;help&#39; | &#39;license&#39; | &#39;me&#39; | &#39;next&#39; | &#39;nofollow&#39; | &#39;noreferrer&#39; | &#39;opener&#39; | &#39;prev&#39; | &#39;search&#39; | &#39;tag&#39;</td>
    <td></td>
    <td><p>当前文档与被链接文档之间的关系。可选值包括：</p>
<ul>
<li><code>alternate</code>：当前文档的替代版本</li>
<li><code>author</code>：当前文档或文章的作者</li>
<li><code>bookmark</code>：永久链接到最近的祖先章节</li>
<li><code>external</code>：引用的文档与当前文档不在同一站点</li>
<li><code>help</code>：链接到相关的帮助文档</li>
<li><code>license</code>：当前文档的主要内容由被引用文件的版权许可覆盖</li>
<li><code>me</code>：当前文档代表链接内容的所有者</li>
<li><code>next</code>：当前文档是系列中的一部分，被引用的文档是系列的下一个文档</li>
<li><code>nofollow</code>：当前文档的作者或发布者不认可被引用的文件</li>
<li><code>noreferrer</code>：不包含 <code>Referer</code> 头。类似于 <code>noopener</code> 的效果</li>
<li><code>opener</code>：如果超链接会创建一个顶级浏览上下文（即 <code>target</code> 属性值为 <code>_blank</code>），则创建一个辅助浏览上下文</li>
<li><code>prev</code>：当前文档是系列的一部分，被引用的文档是系列的上一个文档</li>
<li><code>search</code>：提供一个资源链接，可用于搜索当前文件及其相关页面</li>
<li><code>tag</code>：提供一个适用于当前文档的标签（由给定地址识别）</li>
</ul>
<p><strong>Note</strong>：仅在指定了 <code>href</code> 属性时可用。</p>
</td>
  </tr>
  <tr>
    <td>autofocus</td>
    <td>autofocus</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否在页面加载完成后自动获取焦点</p>
</td>
  </tr>
  <tr>
    <td>tabindex</td>
    <td>tabIndex</td>
    <td>false</td>
    <td>number</td>
    <td></td>
    <td><p>元素在使用 Tab 键切换焦点时的顺序</p>
</td>
  </tr>
</tbody>
</table>

### 方法

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>click(): void</td>
    <td><p>模拟鼠标点击元素</p>
</td>
  </tr>
  <tr>
    <td>focus(options?: FocusOptions): void</td>
    <td><p>将焦点设置到当前元素。</p>
<p>可以传入一个对象作为参数，该对象的属性包括：</p>
<ul>
<li><code>preventScroll</code>：默认情况下，元素获取焦点后，页面会滚动以将该元素滚动到视图中。如果不希望页面滚动，可以将此属性设置为 <code>true</code>。</li>
</ul>
</td>
  </tr>
  <tr>
    <td>blur(): void</td>
    <td><p>移除当前元素的焦点</p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>focus</td>
    <td><p>获得焦点时触发</p>
</td>
  </tr>
  <tr>
    <td>blur</td>
    <td><p>失去焦点时触发</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p>文本内容</p>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td><p>图标</p>
</td>
  </tr>
  <tr>
    <td>active-icon</td>
    <td><p>激活状态的图标</p>
</td>
  </tr>
  <tr>
    <td>badge</td>
    <td><p>徽标</p>
</td>
  </tr>
</tbody>
</table>

### CSS Parts

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>container</td>
    <td><p>导航项容器</p>
</td>
  </tr>
  <tr>
    <td>indicator</td>
    <td><p>指示器</p>
</td>
  </tr>
  <tr>
    <td>badge</td>
    <td><p>徽标</p>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td><p>图标</p>
</td>
  </tr>
  <tr>
    <td>active-icon</td>
    <td><p>激活状态的图标</p>
</td>
  </tr>
  <tr>
    <td>label</td>
    <td><p>文本内容</p>
</td>
  </tr>
</tbody>
</table>

### CSS 自定义属性

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>--shape-corner-indicator</td>
    <td><p>指示器的圆角大小。可以指定一个具体的像素值；但更推荐引用<a href="/docs/2/styles/design-tokens#shape-corner">设计令牌</a></p>
</td>
  </tr>
</tbody>
</table>

## mdui-navigation-rail API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>value</td>
    <td>value</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>当前选中的 <code>&lt;mdui-navigation-rail-item&gt;</code> 的值</p>
</td>
  </tr>
  <tr>
    <td>placement</td>
    <td>placement</td>
    <td>true</td>
    <td>&#39;left&#39; | &#39;right&#39;</td>
    <td>'left'</td>
    <td><p>导航栏的位置。可选值包括：</p>
<ul>
<li><code>left</code>：左侧</li>
<li><code>right</code>：右侧</li>
</ul>
</td>
  </tr>
  <tr>
    <td>alignment</td>
    <td>alignment</td>
    <td>true</td>
    <td>&#39;start&#39; | &#39;center&#39; | &#39;end&#39;</td>
    <td>'start'</td>
    <td><p><code>&lt;mdui-navigation-rail-item&gt;</code> 元素的对齐方式。可选值包括：</p>
<ul>
<li><code>start</code>：顶部对齐</li>
<li><code>center</code>：居中对齐</li>
<li><code>end</code>：底部对齐</li>
</ul>
</td>
  </tr>
  <tr>
    <td>contained</td>
    <td>contained</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>默认情况下，导航栏相对于 <code>body</code> 元素显示。当该参数设置为 <code>true</code> 时，导航栏将相对于其父元素显示。</p>
<p><strong>Note</strong>：设置该属性时，必须在父元素上手动设置样式 <code>position: relative;</code>。</p>
</td>
  </tr>
  <tr>
    <td>divider</td>
    <td>divider</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否在导航栏和页面内容之间添加分割线</p>
</td>
  </tr>
  <tr>
    <td>order</td>
    <td>order</td>
    <td>true</td>
    <td>number</td>
    <td></td>
    <td><p>该组件在 <a href="/docs/2/components/layout"><code>&lt;mdui-layout&gt;</code></a> 中的布局顺序，按从小到大排序。默认为 <code>0</code></p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>change</td>
    <td><p>值变化时触发</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p><code>&lt;mdui-navigation-rail-item&gt;</code> 组件</p>
</td>
  </tr>
  <tr>
    <td>top</td>
    <td><p>顶部的元素</p>
</td>
  </tr>
  <tr>
    <td>bottom</td>
    <td><p>底部的元素</p>
</td>
  </tr>
</tbody>
</table>

### CSS Parts

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>top</td>
    <td><p>顶部元素的容器</p>
</td>
  </tr>
  <tr>
    <td>bottom</td>
    <td><p>底部元素的容器</p>
</td>
  </tr>
  <tr>
    <td>items</td>
    <td><p><code>&lt;mdui-navigation-rail-item&gt;</code> 组件的容器</p>
</td>
  </tr>
</tbody>
</table>

### CSS 自定义属性

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>--shape-corner</td>
    <td><p>组件的圆角大小。可以指定一个具体的像素值；但更推荐引用<a href="/docs/2/styles/design-tokens#shape-corner">设计令牌</a></p>
</td>
  </tr>
  <tr>
    <td>--z-index</td>
    <td><p>组件的 CSS <code>z-index</code> 值</p>
</td>
  </tr>
</tbody>
</table>

# 单选框组件 Radio

单选框用于让用户在一组选项中选择其中一个，确保每次只能选中一个选项。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/radio-group.js';
import 'mdui/components/radio.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { RadioGroup } from 'mdui/components/radio-group.js';
import type { Radio } from 'mdui/components/radio.js';
```

使用示例：

```html
<mdui-radio-group value="chinese">
  <mdui-radio value="chinese">Chinese</mdui-radio>
  <mdui-radio value="english">English</mdui-radio>
</mdui-radio-group>
```

## 示例 {#examples}

### 选中状态 {#example-checked}

`<mdui-radio-group>` 组件的 `value` 属性值即当前选中的 `<mdui-radio>` 组件的 `value` 属性值。您也可以通过更新 `<mdui-radio-group>` 组件的 `value` 属性值，来切换当前选中的单选框。

```html
<mdui-radio-group value="chinese">
  <mdui-radio value="chinese">Chinese</mdui-radio>
  <mdui-radio value="english">English</mdui-radio>
</mdui-radio-group>
```

可以单独使用 `<mdui-radio>` 组件，此时可以通过 `checked` 属性来读取和修改选中状态。

```html
<mdui-radio checked>Radio</mdui-radio>
```

### 禁用状态 {#example-disabled}

通过在 `<mdui-radio-group>` 组件上添加 `disabled` 属性，可以禁用整个单选框组。

```html
<mdui-radio-group disabled>
  <mdui-radio value="chinese">Chinese</mdui-radio>
  <mdui-radio value="english">English</mdui-radio>
</mdui-radio-group>
```

如果需要禁用特定的单选框，可以在 `<mdui-radio>` 组件上添加 `disabled` 属性。

```html
<mdui-radio-group>
  <mdui-radio value="chinese">Chinese</mdui-radio>
  <mdui-radio value="english" disabled>English</mdui-radio>
</mdui-radio-group>
```

### 图标 {#example-icon}

可以通过设置 `unchecked-icon` 和 `checked-icon` 属性，分别定义未选中和选中状态下的单选框的 Material Icons 图标。也可以通过 `unchecked-icon` 和 `checked-icon` slot 来设置。

```html
<mdui-radio-group value="chinese">
  <mdui-radio
    unchecked-icon="check_box_outline_blank"
    checked-icon="lock"
    value="chinese"
  >Chinese</mdui-radio>
  <mdui-radio value="english">
    <mdui-icon slot="unchecked-icon" name="check_box_outline_blank"></mdui-icon>
    <mdui-icon slot="checked-icon" name="lock"></mdui-icon>
    English
  </mdui-radio>
</mdui-radio-group>
```

## mdui-radio-group API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>disabled</td>
    <td>disabled</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否禁用此组件</p>
</td>
  </tr>
  <tr>
    <td>form</td>
    <td>form</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>关联的 <code>&lt;form&gt;</code> 元素。此属性值应为同一页面中的一个 <code>&lt;form&gt;</code> 元素的 <code>id</code>。</p>
<p>如果未指定此属性，则该元素必须是 <code>&lt;form&gt;</code> 元素的子元素。通过此属性，你可以将元素放置在页面的任何位置，而不仅仅是 <code>&lt;form&gt;</code> 元素的子元素。</p>
</td>
  </tr>
  <tr>
    <td>name</td>
    <td>name</td>
    <td>true</td>
    <td>string</td>
    <td>''</td>
    <td><p>单选框组的名称，将与表单数据一起提交</p>
</td>
  </tr>
  <tr>
    <td>value</td>
    <td>value</td>
    <td>true</td>
    <td>string</td>
    <td>''</td>
    <td><p>单选框组的名称，将于表单数据一起提交</p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>defaultValue</td>
    <td>false</td>
    <td>string</td>
    <td>''</td>
    <td><p>默认选中的值。在重置表单时，将重置为该默认值。该属性只能通过 JavaScript 属性设置</p>
</td>
  </tr>
  <tr>
    <td>required</td>
    <td>required</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>提交表单时，是否必须选中其中一个单选框</p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>validity</td>
    <td>false</td>
    <td>ValidityState</td>
    <td></td>
    <td><p>表单验证状态对象，具体参见 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/ValidityState" target="_blank" rel="noopener nofollow"><code>ValidityState</code></a></p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>validationMessage</td>
    <td>false</td>
    <td>string</td>
    <td></td>
    <td><p>如果表单验证未通过，此属性将包含提示信息。如果验证通过，此属性将为空字符串</p>
</td>
  </tr>
</tbody>
</table>

### 方法

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>checkValidity(): boolean</td>
    <td><p>检查表单字段是否通过验证。如果未通过，返回 <code>false</code> 并触发 <code>invalid</code> 事件；如果通过，返回 <code>true</code></p>
</td>
  </tr>
  <tr>
    <td>reportValidity(): boolean</td>
    <td><p>检查表单字段是否通过验证。如果未通过，返回 <code>false</code> 并触发 <code>invalid</code> 事件；如果通过，返回 <code>true</code>。</p>
<p>如果验证未通过，还会在组件上显示验证失败的提示。</p>
</td>
  </tr>
  <tr>
    <td>setCustomValidity(message: string): void</td>
    <td><p>设置自定义的错误提示文本。只要这个文本不为空，就表示字段未通过验证</p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>change</td>
    <td><p>选中值变化时触发</p>
</td>
  </tr>
  <tr>
    <td>input</td>
    <td><p>选中值变化时触发</p>
</td>
  </tr>
  <tr>
    <td>invalid</td>
    <td><p>表单字段验证未通过时触发</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p><code>&lt;mdui-radio&gt;</code> 元素</p>
</td>
  </tr>
</tbody>
</table>

## mdui-radio API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>value</td>
    <td>value</td>
    <td>true</td>
    <td>string</td>
    <td>''</td>
    <td><p>当前单选项的值</p>
</td>
  </tr>
  <tr>
    <td>disabled</td>
    <td>disabled</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否禁用当前单选项</p>
</td>
  </tr>
  <tr>
    <td>checked</td>
    <td>checked</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>当前单选项是否已选中</p>
</td>
  </tr>
  <tr>
    <td>unchecked-icon</td>
    <td>uncheckedIcon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>未选中状态的 Material Icons 图标名。也可以通过 <code>slot=&quot;unchecked-icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>checked-icon</td>
    <td>checkedIcon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>选中状态的 Material Icons 图标名。也可以通过 <code>slot=&quot;checked-icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>autofocus</td>
    <td>autofocus</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否在页面加载完成后自动获取焦点</p>
</td>
  </tr>
  <tr>
    <td>tabindex</td>
    <td>tabIndex</td>
    <td>false</td>
    <td>number</td>
    <td></td>
    <td><p>元素在使用 Tab 键切换焦点时的顺序</p>
</td>
  </tr>
</tbody>
</table>

### 方法

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>click(): void</td>
    <td><p>模拟鼠标点击元素</p>
</td>
  </tr>
  <tr>
    <td>focus(options?: FocusOptions): void</td>
    <td><p>将焦点设置到当前元素。</p>
<p>可以传入一个对象作为参数，该对象的属性包括：</p>
<ul>
<li><code>preventScroll</code>：默认情况下，元素获取焦点后，页面会滚动以将该元素滚动到视图中。如果不希望页面滚动，可以将此属性设置为 <code>true</code>。</li>
</ul>
</td>
  </tr>
  <tr>
    <td>blur(): void</td>
    <td><p>移除当前元素的焦点</p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>focus</td>
    <td><p>获得焦点时触发</p>
</td>
  </tr>
  <tr>
    <td>blur</td>
    <td><p>失去焦点时触发</p>
</td>
  </tr>
  <tr>
    <td>change</td>
    <td><p>选中该单选项时触发</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p>文本内容</p>
</td>
  </tr>
  <tr>
    <td>unchecked-icon</td>
    <td><p>未选中状态的图标</p>
</td>
  </tr>
  <tr>
    <td>checked-icon</td>
    <td><p>选中状态的图标</p>
</td>
  </tr>
</tbody>
</table>

### CSS Parts

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>control</td>
    <td><p>左侧图标容器</p>
</td>
  </tr>
  <tr>
    <td>unchecked-icon</td>
    <td><p>未选中状态的图标</p>
</td>
  </tr>
  <tr>
    <td>checked-icon</td>
    <td><p>选中状态的图标</p>
</td>
  </tr>
  <tr>
    <td>label</td>
    <td><p>文本内容</p>
</td>
  </tr>
</tbody>
</table>

# 范围滑块组件 RangeSlider

范围滑块组件用于让用户在一系列值中选择一个范围。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/range-slider.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { RangeSlider } from 'mdui/components/range-slider.js';
```

使用示例：

```html
<mdui-range-slider></mdui-range-slider>
```

## 示例 {#examples}

### 默认值 {#example-value}

通过 `value` 属性，可以读取或设置范围滑块的当前值。该属性值是一个数组，只能通过 JavaScript 属性进行读取和设置。

```html
<mdui-range-slider class="example-value"></mdui-range-slider>

<script>
  const slider = document.querySelector(".example-value");
  slider.value = [30, 70];
</script>
```

### 禁用状态 {#example-disabled}

添加 `disabled` 属性可以禁用范围滑块。

```html
<mdui-range-slider disabled></mdui-range-slider>
```

### 范围 {#example-min-max}

使用 `min` 和 `max` 属性设置范围滑块的最小值和最大值。

```html
<mdui-range-slider min="10" max="20"></mdui-range-slider>
```

### 步进间隔 {#example-step}

使用 `step` 属性设置范围滑块的步进间隔。

```html
<mdui-range-slider step="10"></mdui-range-slider>
```

### 刻度标记 {#example-tickmarks}

添加 `tickmarks` 属性可以在范围滑块上添加刻度标记。

```html
<mdui-range-slider tickmarks step="10"></mdui-range-slider>
```

### 隐藏文本提示 {#example-nolabel}

添加 `nolabel` 属性可以隐藏范围滑块上的文本提示。

```html
<mdui-range-slider nolabel></mdui-range-slider>
```

### 修改文本提示 {#example-labelFormatter}

通过 `labelFormatter` JavaScript 属性，可以修改文本提示的显示格式。该属性值是一个函数，函数参数为当前范围滑块的值，返回值为你期望显示的文本。

```html
<mdui-range-slider class="example-label-formatter"></mdui-range-slider>

<script>
  const slider = document.querySelector(".example-label-formatter");
  slider.labelFormatter = (value) => `${value} 小时`;
</script>
```

## mdui-range-slider API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>undefined</td>
    <td>defaultValue</td>
    <td>false</td>
    <td>number[]</td>
    <td>[]</td>
    <td><p>默认值。在重置表单时，将重置为该默认值。此属性只能通过 JavaScript 属性设置</p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>value</td>
    <td>false</td>
    <td>number[]</td>
    <td></td>
    <td><p>滑块的值，为数组格式，将于表单数据一起提交。</p>
<p><strong>NOTE</strong>：该属性无法通过 HTML 属性设置初始值，如果要修改该值，只能通过修改 JavaScript 属性值实现。</p>
</td>
  </tr>
  <tr>
    <td>autofocus</td>
    <td>autofocus</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否在页面加载完成后自动获取焦点</p>
</td>
  </tr>
  <tr>
    <td>tabindex</td>
    <td>tabIndex</td>
    <td>false</td>
    <td>number</td>
    <td></td>
    <td><p>元素在使用 Tab 键切换焦点时的顺序</p>
</td>
  </tr>
  <tr>
    <td>min</td>
    <td>min</td>
    <td>true</td>
    <td>number</td>
    <td>0</td>
    <td><p>滑块的最小值，默认为 <code>0</code></p>
</td>
  </tr>
  <tr>
    <td>max</td>
    <td>max</td>
    <td>true</td>
    <td>number</td>
    <td>100</td>
    <td><p>滑块的最大值，默认为 <code>100</code></p>
</td>
  </tr>
  <tr>
    <td>step</td>
    <td>step</td>
    <td>true</td>
    <td>number</td>
    <td>1</td>
    <td><p>步进间隔，默认为 <code>1</code></p>
</td>
  </tr>
  <tr>
    <td>tickmarks</td>
    <td>tickmarks</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否添加刻度标记</p>
</td>
  </tr>
  <tr>
    <td>nolabel</td>
    <td>nolabel</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否隐藏文本提示</p>
</td>
  </tr>
  <tr>
    <td>disabled</td>
    <td>disabled</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否被禁用</p>
</td>
  </tr>
  <tr>
    <td>form</td>
    <td>form</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>关联的 <code>&lt;form&gt;</code> 元素。此属性值应为同一页面中的一个 <code>&lt;form&gt;</code> 元素的 <code>id</code>。</p>
<p>如果未指定此属性，则该元素必须是 <code>&lt;form&gt;</code> 元素的子元素。通过此属性，你可以将元素放置在页面的任何位置，而不仅仅是 <code>&lt;form&gt;</code> 元素的子元素。</p>
</td>
  </tr>
  <tr>
    <td>name</td>
    <td>name</td>
    <td>true</td>
    <td>string</td>
    <td>''</td>
    <td><p>滑块的名称，该名称将与表单数据一起提交</p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>validity</td>
    <td>false</td>
    <td>ValidityState</td>
    <td></td>
    <td><p>表单验证状态对象，具体参见 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/ValidityState" target="_blank" rel="noopener nofollow"><code>ValidityState</code></a></p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>validationMessage</td>
    <td>false</td>
    <td>string</td>
    <td></td>
    <td><p>如果表单验证未通过，此属性将包含提示信息。如果验证通过，此属性将为空字符串</p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>labelFormatter</td>
    <td>false</td>
    <td>(value: number) =&gt; string</td>
    <td></td>
    <td><p>用于自定义标签的显示格式的函数。函数参数为滑块的当前值，返回值为期望显示的文本。</p>
</td>
  </tr>
</tbody>
</table>

### 方法

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>click(): void</td>
    <td><p>模拟鼠标点击元素</p>
</td>
  </tr>
  <tr>
    <td>focus(options?: FocusOptions): void</td>
    <td><p>将焦点设置到当前元素。</p>
<p>可以传入一个对象作为参数，该对象的属性包括：</p>
<ul>
<li><code>preventScroll</code>：默认情况下，元素获取焦点后，页面会滚动以将该元素滚动到视图中。如果不希望页面滚动，可以将此属性设置为 <code>true</code>。</li>
</ul>
</td>
  </tr>
  <tr>
    <td>blur(): void</td>
    <td><p>移除当前元素的焦点</p>
</td>
  </tr>
  <tr>
    <td>checkValidity(): boolean</td>
    <td><p>检查表单字段是否通过验证。如果未通过，返回 <code>false</code> 并触发 <code>invalid</code> 事件；如果通过，返回 <code>true</code></p>
</td>
  </tr>
  <tr>
    <td>reportValidity(): boolean</td>
    <td><p>检查表单字段是否通过验证。如果未通过，返回 <code>false</code> 并触发 <code>invalid</code> 事件；如果通过，返回 <code>true</code>。</p>
<p>如果验证未通过，还会在组件上显示验证失败的提示。</p>
</td>
  </tr>
  <tr>
    <td>setCustomValidity(message: string): void</td>
    <td><p>设置自定义的错误提示文本。只要这个文本不为空，就表示字段未通过验证</p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>focus</td>
    <td><p>获得焦点时触发</p>
</td>
  </tr>
  <tr>
    <td>blur</td>
    <td><p>失去焦点时触发</p>
</td>
  </tr>
  <tr>
    <td>change</td>
    <td><p>值发生变更，且失去焦点时，将触发该事件</p>
</td>
  </tr>
  <tr>
    <td>input</td>
    <td><p>值变更时触发</p>
</td>
  </tr>
  <tr>
    <td>invalid</td>
    <td><p>表单字段验证未通过时触发</p>
</td>
  </tr>
</tbody>
</table>

### CSS Parts

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>track-inactive</td>
    <td><p>未激活状态的轨道</p>
</td>
  </tr>
  <tr>
    <td>track-active</td>
    <td><p>已激活状态的轨道</p>
</td>
  </tr>
  <tr>
    <td>handle</td>
    <td><p>操作杆</p>
</td>
  </tr>
  <tr>
    <td>label</td>
    <td><p>提示文本</p>
</td>
  </tr>
  <tr>
    <td>tickmark</td>
    <td><p>刻度标记</p>
</td>
  </tr>
</tbody>
</table>

# 选择框组件 Select

下拉选择组件在一个下拉菜单中提供多种选项，方便用户快速选择所需内容。

本页面主要介绍 `<mdui-select>` 组件的使用方法，关于下拉菜单项的用法，请参见 [`<mdui-menu-item>`](/zh-cn/docs/2/components/menu#menu-item-api)。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/select.js';
import 'mdui/components/menu-item.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { Select } from 'mdui/components/select.js';
import type { MenuItem } from 'mdui/components/menu-item.js';
```

使用示例：

```html
<mdui-select value="item-1">
  <mdui-menu-item value="item-1">Item 1</mdui-menu-item>
  <mdui-menu-item value="item-2">Item 2</mdui-menu-item>
</mdui-select>
```

## 示例 {#examples}

### 形状 {#example-variant}

通过 `variant` 属性设置下拉选择的形状。

```html
<mdui-select variant="filled" value="item-1">
  <mdui-menu-item value="item-1">Item 1</mdui-menu-item>
  <mdui-menu-item value="item-2">Item 2</mdui-menu-item>
</mdui-select>

<mdui-select variant="outlined" value="item-1">
  <mdui-menu-item value="item-1">Item 1</mdui-menu-item>
  <mdui-menu-item value="item-2">Item 2</mdui-menu-item>
</mdui-select>
```

### 多选支持 {#example-multiple}

下拉选择默认为单选，`<mdui-select>` 组件的 `value` 值即为当前选中的 [`<mdui-menu-item>`](/zh-cn/docs/2/components/menu#menu-item-api) 的 `value` 值。

添加 `multiple` 属性可以使下拉选择支持多选。此时 `<mdui-select>` 的 `value` 值为当前选中的 [`<mdui-menu-item>`](/zh-cn/docs/2/components/menu#menu-item-api) 的 `value` 的值组成的数组。

注意：在支持多选时，`<mdui-select>` 的 `value` 值为数组，只能通过 JavaScript 属性来读取和设置该值。

```html
<mdui-select multiple class="example-multiple">
  <mdui-menu-item value="item-1">Item 1</mdui-menu-item>
  <mdui-menu-item value="item-2">Item 2</mdui-menu-item>
  <mdui-menu-item value="item-3">Item 3</mdui-menu-item>
</mdui-select>

<script>
  // 默认选中 item-1 和 item-2
  const select = document.querySelector(".example-multiple");
  select.value = ["item-1", "item-2"];
</script>
```

### 辅助文本 {#example-helper-text}

使用 `label` 属性设置下拉选择上方的标签文本。

```html
<mdui-select label="Text Field" value="item-1">
  <mdui-menu-item value="item-1">Item 1</mdui-menu-item>
  <mdui-menu-item value="item-2">Item 2</mdui-menu-item>
</mdui-select>
```

使用 `placeholder` 属性设置未选中值时的占位文本。

```html
<mdui-select placeholder="Placeholder">
  <mdui-menu-item value="item-1">Item 1</mdui-menu-item>
  <mdui-menu-item value="item-2">Item 2</mdui-menu-item>
</mdui-select>
```

使用 `helper` 属性设置下拉选择底部的帮助文本。也可以使用 `helper` slot 来设置帮助文本。

```html
<mdui-select helper="Supporting text">
  <mdui-menu-item value="item-1">Item 1</mdui-menu-item>
  <mdui-menu-item value="item-2">Item 2</mdui-menu-item>
</mdui-select>

<mdui-select>
  <mdui-menu-item value="item-1">Item 1</mdui-menu-item>
  <mdui-menu-item value="item-2">Item 2</mdui-menu-item>
  <span slot="helper" style="color: blue">Supporting text</span>
</mdui-select>
```

### 只读模式 {#example-readonly}

通过添加 `readonly` 属性，可以将下拉选择设置为只读模式。

```html
<mdui-select readonly value="item-1">
  <mdui-menu-item value="item-1">Item 1</mdui-menu-item>
  <mdui-menu-item value="item-2">Item 2</mdui-menu-item>
</mdui-select>
```

### 禁用模式 {#example-disabled}

通过添加 `disabled` 属性，可以禁用下拉选择。

```html
<mdui-select disabled value="item-1">
  <mdui-menu-item value="item-1">Item 1</mdui-menu-item>
  <mdui-menu-item value="item-2">Item 2</mdui-menu-item>
</mdui-select>
```

### 可清空 {#example-clearable}

添加 `clearable` 属性后，当下拉选择有值时，右侧会出现一个清空按钮。

```html
<mdui-select clearable value="item-1">
  <mdui-menu-item value="item-1">Item 1</mdui-menu-item>
  <mdui-menu-item value="item-2">Item 2</mdui-menu-item>
</mdui-select>
```

也可以通过 `clear` slot 自定义清空按钮。

```html
<mdui-select clearable value="item-1">
  <mdui-menu-item value="item-1">Item 1</mdui-menu-item>
  <mdui-menu-item value="item-2">Item 2</mdui-menu-item>
  <mdui-icon slot="clear" name="delete"></mdui-icon>
</mdui-select>
```

### 下拉菜单位置 {#example-placement}

通过 `placement` 属性，你可以设置下拉菜单的位置。

```html
<mdui-select placement="top" value="item-1">
  <mdui-menu-item value="item-1">Item 1</mdui-menu-item>
  <mdui-menu-item value="item-2">Item 2</mdui-menu-item>
</mdui-select>
```

### 文本右对齐 {#example-end-aligned}

添加 `end-aligned` 属性，可以使文本右对齐。

```html
<mdui-select end-aligned value="item-1">
  <mdui-menu-item value="item-1">Item 1</mdui-menu-item>
  <mdui-menu-item value="item-2">Item 2</mdui-menu-item>
</mdui-select>
```

### 前后文本及图标 {#example-prefix-suffix}

通过设置 `icon` 和 `end-icon` 属性，可以在下拉选择的左侧和右侧添加 Material Icons 图标。你也可以通过 `icon` 和 `end-icon` slot 在下拉选择的左侧和右侧添加元素。

```html
<mdui-select value="item-1" icon="search" end-icon="mic">
  <mdui-menu-item value="item-1">Item 1</mdui-menu-item>
  <mdui-menu-item value="item-2">Item 2</mdui-menu-item>
</mdui-select>

<br/><br/>

<mdui-select value="item-1">
  <mdui-menu-item value="item-1">Item 1</mdui-menu-item>
  <mdui-menu-item value="item-2">Item 2</mdui-menu-item>
  <mdui-button-icon slot="icon" icon="search"></mdui-button-icon>
  <mdui-button-icon slot="end-icon" icon="mic"></mdui-button-icon>
</mdui-select>
```

通过设置 `prefix` 和 `suffix` 属性，可以在下拉选择的左侧和右侧添加文本。也可以通过 `prefix` 和 `suffix` slot 在下拉选择的左侧和右侧添加文本元素。这些文本只有在下拉选择聚焦或有值时才会显示。

```html
<mdui-select value="item-1" prefix="$" suffix="/100">
  <mdui-menu-item value="item-1">Item 1</mdui-menu-item>
  <mdui-menu-item value="item-2">Item 2</mdui-menu-item>
</mdui-select>

<br/><br/>

<mdui-select value="item-1">
  <mdui-menu-item value="item-1">Item 1</mdui-menu-item>
  <mdui-menu-item value="item-2">Item 2</mdui-menu-item>
  <span slot="prefix" style="color: blue">$</span>
  <span slot="suffix" style="color: blue">/100</span>
</mdui-select>
```

## mdui-select API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>variant</td>
    <td>variant</td>
    <td>true</td>
    <td>&#39;filled&#39; | &#39;outlined&#39;</td>
    <td>'filled'</td>
    <td><p>选择框的样式。可选值包括：</p>
<ul>
<li><code>filled</code>：带背景色的选择框，视觉效果较强</li>
<li><code>outlined</code>：带边框的选择框，视觉效果较弱</li>
</ul>
</td>
  </tr>
  <tr>
    <td>multiple</td>
    <td>multiple</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否支持多选</p>
</td>
  </tr>
  <tr>
    <td>name</td>
    <td>name</td>
    <td>true</td>
    <td>string</td>
    <td>''</td>
    <td><p>选择框的名称，将与表单数据一起提交</p>
</td>
  </tr>
  <tr>
    <td>value</td>
    <td>value</td>
    <td>false</td>
    <td>string | string[]</td>
    <td>''</td>
    <td><p>选择框的值，将与表单数据一起提交。</p>
<p>如果未指定 <code>multiple</code> 属性，该值为字符串；如果指定了 <code>multiple</code> 属性，该值为字符串数组。HTML 属性只能设置字符串值；如果需要设置数组值，请通过 JavaScript 属性设置。</p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>defaultValue</td>
    <td>false</td>
    <td>string | string[]</td>
    <td>''</td>
    <td><p>默认选中的值。在重置表单时，将重置为该默认值。该属性只能通过 JavaScript 属性设置</p>
</td>
  </tr>
  <tr>
    <td>label</td>
    <td>label</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>标签文本</p>
</td>
  </tr>
  <tr>
    <td>placeholder</td>
    <td>placeholder</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>占位符文本</p>
</td>
  </tr>
  <tr>
    <td>helper</td>
    <td>helper</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>选择框底部的帮助文本。也可以通过 <code>slot=&quot;helper&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>clearable</td>
    <td>clearable</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否可以清空选择框</p>
</td>
  </tr>
  <tr>
    <td>clear-icon</td>
    <td>clearIcon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>当选择框可清空时，显示在选择框右侧的清空按钮的 Material Icons 图标名。也可以通过 <code>slot=&quot;clear-icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>placement</td>
    <td>placement</td>
    <td>true</td>
    <td>&#39;auto&#39; | &#39;bottom&#39; | &#39;top&#39;</td>
    <td>'auto'</td>
    <td><p>选择框的位置。可选值包括：</p>
<ul>
<li><code>auto</code>：自动判断位置</li>
<li><code>bottom</code>：位于下方</li>
<li><code>top</code>：位于上方</li>
</ul>
</td>
  </tr>
  <tr>
    <td>end-aligned</td>
    <td>endAligned</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>文本是否右对齐</p>
</td>
  </tr>
  <tr>
    <td>prefix</td>
    <td>prefix</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>选择框的前缀文本。仅在聚焦状态，或选择框有值时才会显示。也可以通过 <code>slot=&quot;prefix&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>suffix</td>
    <td>suffix</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>选择框的后缀文本。仅在聚焦状态，或选择框有值时才会显示。也可以通过 <code>slot=&quot;suffix&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td>icon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>选择框的前缀图标的 Material Icons 图标名。也可以通过 <code>slot=&quot;icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>end-icon</td>
    <td>endIcon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>选择框的后缀图标的 Material Icons 图标名。也可以通过 <code>slot=&quot;end-icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>error-icon</td>
    <td>errorIcon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>表单字段验证失败时，显示在选择框右侧的 Material Icons 图标名。也可以通过 <code>slot=&quot;error-icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>form</td>
    <td>form</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>关联的 <code>&lt;form&gt;</code> 元素。此属性值应为同一页面中的一个 <code>&lt;form&gt;</code> 元素的 <code>id</code>。</p>
<p>如果未指定此属性，则该元素必须是 <code>&lt;form&gt;</code> 元素的子元素。通过此属性，你可以将元素放置在页面的任何位置，而不仅仅是 <code>&lt;form&gt;</code> 元素的子元素。</p>
</td>
  </tr>
  <tr>
    <td>readonly</td>
    <td>readonly</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否为只读状态</p>
</td>
  </tr>
  <tr>
    <td>disabled</td>
    <td>disabled</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否为禁用状态</p>
</td>
  </tr>
  <tr>
    <td>required</td>
    <td>required</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>提交表单时，是否必须填写该字段</p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>validity</td>
    <td>false</td>
    <td>ValidityState</td>
    <td></td>
    <td><p>表单验证状态对象，具体参见 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/ValidityState" target="_blank" rel="noopener nofollow"><code>ValidityState</code></a></p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>validationMessage</td>
    <td>false</td>
    <td>string</td>
    <td></td>
    <td><p>如果表单验证未通过，此属性将包含提示信息。如果验证通过，此属性将为空字符串</p>
</td>
  </tr>
  <tr>
    <td>autofocus</td>
    <td>autofocus</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否在页面加载完成后自动获取焦点</p>
</td>
  </tr>
  <tr>
    <td>tabindex</td>
    <td>tabIndex</td>
    <td>false</td>
    <td>number</td>
    <td></td>
    <td><p>元素在使用 Tab 键切换焦点时的顺序</p>
</td>
  </tr>
</tbody>
</table>

### 方法

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>checkValidity(): boolean</td>
    <td><p>检查表单字段是否通过验证。如果未通过，返回 <code>false</code> 并触发 <code>invalid</code> 事件；如果通过，返回 <code>true</code></p>
</td>
  </tr>
  <tr>
    <td>reportValidity(): boolean</td>
    <td><p>检查表单字段是否通过验证。如果未通过，返回 <code>false</code> 并触发 <code>invalid</code> 事件；如果通过，返回 <code>true</code>。</p>
<p>如果验证未通过，还会在组件上显示验证失败的提示。</p>
</td>
  </tr>
  <tr>
    <td>setCustomValidity(message: string): void</td>
    <td><p>设置自定义的错误提示文本。只要这个文本不为空，就表示字段未通过验证</p>
</td>
  </tr>
  <tr>
    <td>click(): void</td>
    <td><p>模拟鼠标点击元素</p>
</td>
  </tr>
  <tr>
    <td>focus(options?: FocusOptions): void</td>
    <td><p>将焦点设置到当前元素。</p>
<p>可以传入一个对象作为参数，该对象的属性包括：</p>
<ul>
<li><code>preventScroll</code>：默认情况下，元素获取焦点后，页面会滚动以将该元素滚动到视图中。如果不希望页面滚动，可以将此属性设置为 <code>true</code>。</li>
</ul>
</td>
  </tr>
  <tr>
    <td>blur(): void</td>
    <td><p>移除当前元素的焦点</p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>focus</td>
    <td><p>获得焦点时触发</p>
</td>
  </tr>
  <tr>
    <td>blur</td>
    <td><p>失去焦点时触发</p>
</td>
  </tr>
  <tr>
    <td>change</td>
    <td><p>选中的值变更时触发</p>
</td>
  </tr>
  <tr>
    <td>invalid</td>
    <td><p>表单字段验证未通过时触发</p>
</td>
  </tr>
  <tr>
    <td>clear</td>
    <td><p>在点击由 <code>clearable</code> 属性生成的清空按钮时触发。可以通过调用 <code>event.preventDefault()</code> 阻止清空选择框</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p><code>&lt;mdui-menu-item&gt;</code> 元素</p>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td><p>左侧图标</p>
</td>
  </tr>
  <tr>
    <td>end-icon</td>
    <td><p>右侧图标</p>
</td>
  </tr>
  <tr>
    <td>error-icon</td>
    <td><p>验证失败状态的右侧图标</p>
</td>
  </tr>
  <tr>
    <td>prefix</td>
    <td><p>左侧文本</p>
</td>
  </tr>
  <tr>
    <td>suffix</td>
    <td><p>右侧文本</p>
</td>
  </tr>
  <tr>
    <td>clear-button</td>
    <td><p>清空按钮</p>
</td>
  </tr>
  <tr>
    <td>clear-icon</td>
    <td><p>清空按钮中的图标</p>
</td>
  </tr>
  <tr>
    <td>helper</td>
    <td><p>底部的帮助文本</p>
</td>
  </tr>
</tbody>
</table>

### CSS Parts

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>chips</td>
    <td><p>多选时，放置选中值对应的 chip 的容器</p>
</td>
  </tr>
  <tr>
    <td>chip</td>
    <td><p>多选时，每一个选中的值对应的 chip</p>
</td>
  </tr>
  <tr>
    <td>chip__button</td>
    <td><p>chip 内部的 <code>&lt;button&gt;</code> 元素</p>
</td>
  </tr>
  <tr>
    <td>chip__label</td>
    <td><p>chip 内部的文本</p>
</td>
  </tr>
  <tr>
    <td>chip__delete-icon</td>
    <td><p>chip 内部的删除图标</p>
</td>
  </tr>
  <tr>
    <td>text-field</td>
    <td><p>文本框，即 <a href="/docs/2/components/text-field"><code>&lt;mdui-text-field&gt;</code></a> 元素</p>
</td>
  </tr>
  <tr>
    <td>text-field__container</td>
    <td><p>text-field 内部的文本框容器</p>
</td>
  </tr>
  <tr>
    <td>text-field__icon</td>
    <td><p>text-field 内部的左侧图标</p>
</td>
  </tr>
  <tr>
    <td>text-field__end-icon</td>
    <td><p>text-field 内部的右侧图标</p>
</td>
  </tr>
  <tr>
    <td>text-field__error-icon</td>
    <td><p>text-field 内部的验证失败状态的右侧图标</p>
</td>
  </tr>
  <tr>
    <td>text-field__prefix</td>
    <td><p>text-field 内部的左侧文本</p>
</td>
  </tr>
  <tr>
    <td>text-field__suffix</td>
    <td><p>text-field 内部的右侧文本</p>
</td>
  </tr>
  <tr>
    <td>text-field__label</td>
    <td><p>text-field 内部的标签文本</p>
</td>
  </tr>
  <tr>
    <td>text-field__input</td>
    <td><p>text-field 内部的 <code>&lt;input&gt;</code> 元素</p>
</td>
  </tr>
  <tr>
    <td>text-field__clear-button</td>
    <td><p>text-field 内部的清空按钮</p>
</td>
  </tr>
  <tr>
    <td>text-field__clear-icon</td>
    <td><p>text-field 内部的清空按钮中的图标</p>
</td>
  </tr>
  <tr>
    <td>text-field__supporting</td>
    <td><p>text-field 内部的底部辅助信息容器，包括 helper 和 error</p>
</td>
  </tr>
  <tr>
    <td>text-field__helper</td>
    <td><p>text-field 内部的底部帮助文本</p>
</td>
  </tr>
  <tr>
    <td>text-field__error</td>
    <td><p>text-field 内部的底部错误描述文本</p>
</td>
  </tr>
  <tr>
    <td>menu</td>
    <td><p>下拉菜单，即 <a href="/docs/2/components/menu"><code>&lt;mdui-menu&gt;</code></a> 元素</p>
</td>
  </tr>
</tbody>
</table>

# 分段按钮组件 SegmentedButton

分段按钮组件封装了一组按钮，用于提供选项、切换视图或对元素进行排序等。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/segmented-button-group.js';
import 'mdui/components/segmented-button.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { SegmentedButtonGroup } from 'mdui/components/segmented-button-group.js';
import type { SegmentedButton } from 'mdui/components/segmented-button.js';
```

使用示例：

```html
<mdui-segmented-button-group>
  <mdui-segmented-button>Day</mdui-segmented-button>
  <mdui-segmented-button>Week</mdui-segmented-button>
  <mdui-segmented-button>Month</mdui-segmented-button>
</mdui-segmented-button-group>
```

## 示例 {#examples}

### 全宽显示 {#example-full-width}

在 `<mdui-segmented-button-group>` 元素上添加 `full-width` 属性，可使组件占据全部宽度。

```html
<mdui-segmented-button-group full-width>
  <mdui-segmented-button>Day</mdui-segmented-button>
  <mdui-segmented-button>Week</mdui-segmented-button>
  <mdui-segmented-button>Month</mdui-segmented-button>
</mdui-segmented-button-group>
```

### 单选模式 {#example-selects-single}

在 `<mdui-segmented-button-group>` 元素上指定 `selects` 属性为 `single`，可以实现单选模式。此时 `<mdui-segmented-button-group>` 的 `value` 属性值即为当前选中的 `<mdui-segmented-button>` 的 `value` 属性的值。

```html
<mdui-segmented-button-group selects="single">
  <mdui-segmented-button value="day">Day</mdui-segmented-button>
  <mdui-segmented-button value="week">Week</mdui-segmented-button>
  <mdui-segmented-button value="month">Month</mdui-segmented-button>
</mdui-segmented-button-group>

<mdui-segmented-button-group selects="single" value="week">
  <mdui-segmented-button value="day">Day</mdui-segmented-button>
  <mdui-segmented-button value="week">Week</mdui-segmented-button>
  <mdui-segmented-button value="month">Month</mdui-segmented-button>
</mdui-segmented-button-group>
```

### 多选模式 {#example-selects-multiple}

在 `<mdui-segmented-button-group>` 元素上指定 `selects` 属性为 `multiple`，可以实现多选模式。此时 `<mdui-segmented-button-group>` 的 `value` 属性值为当前选中的 `<mdui-segmented-button>` 的 `value` 属性的值组成的数组。

注意：在多选模式下，`<mdui-segmented-button-group>` 的 `value` 属性值为数组，只能通过 JavaScript 属性来读取和设置该值。

```html
<mdui-segmented-button-group selects="multiple">
  <mdui-segmented-button value="day">Day</mdui-segmented-button>
  <mdui-segmented-button value="week">Week</mdui-segmented-button>
  <mdui-segmented-button value="month">Month</mdui-segmented-button>
</mdui-segmented-button-group>

<mdui-segmented-button-group selects="multiple" class="demo-multiple">
  <mdui-segmented-button value="day">Day</mdui-segmented-button>
  <mdui-segmented-button value="week">Week</mdui-segmented-button>
  <mdui-segmented-button value="month">Month</mdui-segmented-button>
</mdui-segmented-button-group>

<script>
  // 设置默认选中 week 和 month
  const group = document.querySelector(".demo-multiple");
  group.value = ["week", "month"];
</script>
```

### 图标 {#example-icon}

在 `<mdui-segmented-button>` 元素上，通过设置 `icon` 和 `end-icon` 属性，可以在按钮的左侧和右侧添加 Material Icons 图标。另外，也可以通过 `icon` 和 `end-icon` slot 在按钮的左侧和右侧添加元素。

```html
<mdui-segmented-button-group>
  <mdui-segmented-button icon="search">Day</mdui-segmented-button>
  <mdui-segmented-button end-icon="arrow_forward">Week</mdui-segmented-button>
  <mdui-segmented-button>
    Month
    <mdui-icon slot="icon" name="downloading"></mdui-icon>
    <mdui-icon slot="end-icon" name="attach_file"></mdui-icon>
  </mdui-segmented-button>
</mdui-segmented-button-group>
```

在 `<mdui-segmented-button>` 元素上，通过添加 `selected-icon` 属性，可以设置选中状态的 Material Icons 图标。也可以通过 `selected-icon` slot 进行设置。

```html
<mdui-segmented-button-group selects="multiple">
  <mdui-segmented-button value="day" selected-icon="cloud_done">Day</mdui-segmented-button>
  <mdui-segmented-button value="week">
    <mdui-icon slot="selected-icon" name="cloud_done"></mdui-icon>
    Week
  </mdui-segmented-button>
</mdui-segmented-button-group>
```

### 链接 {#example-link}

在 `<mdui-segmented-button>` 元素上，通过设置 `href` 属性，可以将按钮转换为链接。此时，还可以使用与链接相关的属性，如：`download`、`target`、`rel`。

```html
<mdui-segmented-button-group>
  <mdui-segmented-button href="https://www.mdui.org" target="_blank">Link</mdui-segmented-button>
  <mdui-segmented-button>Week</mdui-segmented-button>
  <mdui-segmented-button>Month</mdui-segmented-button>
</mdui-segmented-button-group>
```

### 禁用及加载中状态 {#example-disabled}

在 `<mdui-segmented-button-group>` 元素上，通过添加 `disabled` 属性，可以禁用整个分段按钮组。

```html
<mdui-segmented-button-group disabled>
  <mdui-segmented-button>Day</mdui-segmented-button>
  <mdui-segmented-button>Week</mdui-segmented-button>
  <mdui-segmented-button>Month</mdui-segmented-button>
</mdui-segmented-button-group>
```

在 `<mdui-segmented-button>` 元素上，通过添加 `disabled` 属性，可以禁用特定按钮；通过添加 `loading` 属性，可以为特定按钮添加加载中状态。

```html
<mdui-segmented-button-group>
  <mdui-segmented-button>Day</mdui-segmented-button>
  <mdui-segmented-button disabled>Week</mdui-segmented-button>
  <mdui-segmented-button loading>Month</mdui-segmented-button>
  <mdui-segmented-button disabled loading>Year</mdui-segmented-button>
</mdui-segmented-button-group>
```

## mdui-segmented-button-group API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>full-width</td>
    <td>fullWidth</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否填满父元素宽度</p>
</td>
  </tr>
  <tr>
    <td>selects</td>
    <td>selects</td>
    <td>true</td>
    <td>&#39;single&#39; | &#39;multiple&#39;</td>
    <td></td>
    <td><p>分段按钮的可选中状态，默认为不可选中。可选值包括：</p>
<ul>
<li><code>single</code>：单选</li>
<li><code>multiple</code>：多选</li>
</ul>
</td>
  </tr>
  <tr>
    <td>disabled</td>
    <td>disabled</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否为禁用状态</p>
</td>
  </tr>
  <tr>
    <td>required</td>
    <td>required</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>提交表单时，是否必须选中</p>
</td>
  </tr>
  <tr>
    <td>form</td>
    <td>form</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>关联的 <code>&lt;form&gt;</code> 元素。此属性值应为同一页面中的一个 <code>&lt;form&gt;</code> 元素的 <code>id</code>。</p>
<p>如果未指定此属性，则该元素必须是 <code>&lt;form&gt;</code> 元素的子元素。通过此属性，你可以将元素放置在页面的任何位置，而不仅仅是 <code>&lt;form&gt;</code> 元素的子元素。</p>
</td>
  </tr>
  <tr>
    <td>name</td>
    <td>name</td>
    <td>true</td>
    <td>string</td>
    <td>''</td>
    <td><p>提交表单时的名称，将与表单数据一起提交</p>
</td>
  </tr>
  <tr>
    <td>value</td>
    <td>value</td>
    <td>false</td>
    <td>string | string[]</td>
    <td>''</td>
    <td><p>当前选中的 <code>&lt;mdui-segmented-button&gt;</code> 的值。</p>
<p><strong>Note</strong>：该属性的 HTML 属性始终为字符串，且仅在 <code>selects=&quot;single&quot;</code> 时可以通过 HTML 属性设置初始值。该属性的 JavaScript 属性值在 <code>selects=&quot;single&quot;</code> 时为字符串，在 <code>selects=&quot;multiple&quot;</code> 时为字符串数组。所以，在 <code>selects=&quot;multiple&quot;</code> 时，如果要修改该值，只能通过修改 JavaScript 属性值实现。</p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>defaultValue</td>
    <td>false</td>
    <td>string | string[]</td>
    <td>''</td>
    <td><p>默认选中的值。在重置表单时，将重置为该默认值。该属性只能通过 JavaScript 属性设置</p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>validity</td>
    <td>false</td>
    <td>ValidityState</td>
    <td></td>
    <td><p>表单验证状态对象，具体参见 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/ValidityState" target="_blank" rel="noopener nofollow"><code>ValidityState</code></a></p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>validationMessage</td>
    <td>false</td>
    <td>string</td>
    <td></td>
    <td><p>如果表单验证未通过，此属性将包含提示信息。如果验证通过，此属性将为空字符串</p>
</td>
  </tr>
</tbody>
</table>

### 方法

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>checkValidity(): boolean</td>
    <td><p>检查表单字段是否通过验证。如果未通过，返回 <code>false</code> 并触发 <code>invalid</code> 事件；如果通过，返回 <code>true</code></p>
</td>
  </tr>
  <tr>
    <td>reportValidity(): boolean</td>
    <td><p>检查表单字段是否通过验证。如果未通过，返回 <code>false</code> 并触发 <code>invalid</code> 事件；如果通过，返回 <code>true</code>。</p>
<p>如果验证未通过，还会在组件上显示验证失败的提示。</p>
</td>
  </tr>
  <tr>
    <td>setCustomValidity(message: string): void</td>
    <td><p>设置自定义的错误提示文本。只要这个文本不为空，就表示字段未通过验证</p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>change</td>
    <td><p>选中的值变更时触发</p>
</td>
  </tr>
  <tr>
    <td>invalid</td>
    <td><p>表单字段验证未通过时触发</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p><code>&lt;mdui-segmented-button&gt;</code> 组件</p>
</td>
  </tr>
</tbody>
</table>

### CSS 自定义属性

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>--shape-corner</td>
    <td><p>组件的圆角大小。可以指定一个具体的像素值；但更推荐引用<a href="/docs/2/styles/design-tokens#shape-corner">设计令牌</a></p>
</td>
  </tr>
</tbody>
</table>

## mdui-segmented-button API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>icon</td>
    <td>icon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>左侧的 Material Icons 图标名。也可以通过 <code>slot=&quot;icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>end-icon</td>
    <td>endIcon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>右侧的 Material Icons 图标名。也可以通过 <code>slot=&quot;end-icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>selected-icon</td>
    <td>selectedIcon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>选中状态的 Material Icons 图标名。也可以通过 <code>slot=&quot;selected-icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>href</td>
    <td>href</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>链接的目标 URL。</p>
<p>如果设置了此属性，组件内部将渲染为 <code>&lt;a&gt;</code> 元素，并可以使用链接相关的属性。</p>
</td>
  </tr>
  <tr>
    <td>download</td>
    <td>download</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>下载链接的目标。</p>
<p><strong>Note</strong>：仅在设置了 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>target</td>
    <td>target</td>
    <td>true</td>
    <td>&#39;_blank&#39; | &#39;_parent&#39; | &#39;_self&#39; | &#39;_top&#39;</td>
    <td></td>
    <td><p>链接的打开方式。可选值包括：</p>
<ul>
<li><code>_blank</code>：在新窗口中打开链接</li>
<li><code>_parent</code>：在父框架中打开链接</li>
<li><code>_self</code>：默认。在当前框架中打开链接</li>
<li><code>_top</code>：在整个窗口中打开链接</li>
</ul>
<p><strong>Note</strong>：仅在设置了 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>rel</td>
    <td>rel</td>
    <td>true</td>
    <td>&#39;alternate&#39; | &#39;author&#39; | &#39;bookmark&#39; | &#39;external&#39; | &#39;help&#39; | &#39;license&#39; | &#39;me&#39; | &#39;next&#39; | &#39;nofollow&#39; | &#39;noreferrer&#39; | &#39;opener&#39; | &#39;prev&#39; | &#39;search&#39; | &#39;tag&#39;</td>
    <td></td>
    <td><p>当前文档与被链接文档之间的关系。可选值包括：</p>
<ul>
<li><code>alternate</code>：当前文档的替代版本</li>
<li><code>author</code>：当前文档或文章的作者</li>
<li><code>bookmark</code>：永久链接到最近的祖先章节</li>
<li><code>external</code>：引用的文档与当前文档不在同一站点</li>
<li><code>help</code>：链接到相关的帮助文档</li>
<li><code>license</code>：当前文档的主要内容由被引用文件的版权许可覆盖</li>
<li><code>me</code>：当前文档代表链接内容的所有者</li>
<li><code>next</code>：当前文档是系列中的一部分，被引用的文档是系列的下一个文档</li>
<li><code>nofollow</code>：当前文档的作者或发布者不认可被引用的文件</li>
<li><code>noreferrer</code>：不包含 <code>Referer</code> 头。类似于 <code>noopener</code> 的效果</li>
<li><code>opener</code>：如果超链接会创建一个顶级浏览上下文（即 <code>target</code> 属性值为 <code>_blank</code>），则创建一个辅助浏览上下文</li>
<li><code>prev</code>：当前文档是系列的一部分，被引用的文档是系列的上一个文档</li>
<li><code>search</code>：提供一个资源链接，可用于搜索当前文件及其相关页面</li>
<li><code>tag</code>：提供一个适用于当前文档的标签（由给定地址识别）</li>
</ul>
<p><strong>Note</strong>：仅在指定了 <code>href</code> 属性时可用。</p>
</td>
  </tr>
  <tr>
    <td>autofocus</td>
    <td>autofocus</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否在页面加载完成后自动获取焦点</p>
</td>
  </tr>
  <tr>
    <td>tabindex</td>
    <td>tabIndex</td>
    <td>false</td>
    <td>number</td>
    <td></td>
    <td><p>元素在使用 Tab 键切换焦点时的顺序</p>
</td>
  </tr>
  <tr>
    <td>disabled</td>
    <td>disabled</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否禁用</p>
</td>
  </tr>
  <tr>
    <td>loading</td>
    <td>loading</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否处于加载中状态</p>
</td>
  </tr>
  <tr>
    <td>name</td>
    <td>name</td>
    <td>true</td>
    <td>string</td>
    <td>''</td>
    <td><p>按钮的名称，将与表单数据一起提交。</p>
<p><strong>Note</strong>：仅在未设置 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>value</td>
    <td>value</td>
    <td>true</td>
    <td>string</td>
    <td>''</td>
    <td><p>按钮的初始值，将与表单数据一起提交。</p>
<p><strong>Note</strong>：仅在未设置 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>type</td>
    <td>type</td>
    <td>true</td>
    <td>&#39;submit&#39; | &#39;reset&#39; | &#39;button&#39;</td>
    <td>'button'</td>
    <td><p>按钮的类型。默认类型为 <code>button</code>。可选类型包括：</p>
<ul>
<li><code>submit</code>：点击按钮会提交表单数据到服务器</li>
<li><code>reset</code>：点击按钮会将表单中的所有字段重置为初始值</li>
<li><code>button</code>：此类型的按钮没有默认行为</li>
</ul>
<p><strong>Note</strong>：仅在未指定 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>form</td>
    <td>form</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>关联的 <code>&lt;form&gt;</code> 元素。此属性值应为同一页面中的一个 <code>&lt;form&gt;</code> 元素的 <code>id</code>。</p>
<p>如果未指定此属性，则该元素必须是 <code>&lt;form&gt;</code> 元素的子元素。通过此属性，你可以将元素放置在页面的任何位置，而不仅仅是 <code>&lt;form&gt;</code> 元素的子元素。</p>
<p><strong>Note</strong>：仅在未指定 <code>href</code> 属性时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>formaction</td>
    <td>formAction</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>指定提交表单的 URL。</p>
<p>如果指定了此属性，将覆盖 <code>&lt;form&gt;</code> 元素的 <code>action</code> 属性。</p>
<p><strong>Note</strong>：仅在未指定 <code>href</code> 属性且 <code>type=&quot;submit&quot;</code> 时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>formenctype</td>
    <td>formEnctype</td>
    <td>true</td>
    <td>&#39;application/x-www-form-urlencoded&#39; | &#39;multipart/form-data&#39; | &#39;text/plain&#39;</td>
    <td></td>
    <td><p>指定提交表单到服务器的内容类型。可选值包括：</p>
<ul>
<li><code>application/x-www-form-urlencoded</code>：未指定该属性时的默认值</li>
<li><code>multipart/form-data</code>：当表单包含 <code>&lt;input type=&quot;file&quot;&gt;</code> 元素时使用</li>
<li><code>text/plain</code>：HTML5 新增，用于调试</li>
</ul>
<p>如果指定了此属性，将覆盖 <code>&lt;form&gt;</code> 元素的 <code>enctype</code> 属性。</p>
<p><strong>Note</strong>：仅在未指定 <code>href</code> 属性且 <code>type=&quot;submit&quot;</code> 时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>formmethod</td>
    <td>formMethod</td>
    <td>true</td>
    <td>&#39;post&#39; | &#39;get&#39;</td>
    <td></td>
    <td><p>指定提交表单时使用的 HTTP 方法。可选值包括：</p>
<ul>
<li><code>post</code>：表单数据包含在表单内容中，发送到服务器</li>
<li><code>get</code>：表单数据以 <code>?</code> 作为分隔符附加到表单的 URI 属性中，生成的 URI 发送到服务器。当表单没有副作用，并且仅包含 ASCII 字符时，使用此方法</li>
</ul>
<p>如果设置了此属性，将覆盖 <code>&lt;form&gt;</code> 元素的 <code>method</code> 属性。</p>
<p><strong>Note</strong>：仅在未设置 <code>href</code> 属性且 <code>type=&quot;submit&quot;</code> 时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>formnovalidate</td>
    <td>formNoValidate</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>如果设置了此属性，表单提交时将不执行表单验证。</p>
<p>如果设置了此属性，将覆盖 <code>&lt;form&gt;</code> 元素的 <code>novalidate</code> 属性。</p>
<p><strong>Note</strong>：仅在未设置 <code>href</code> 属性且 <code>type=&quot;submit&quot;</code> 时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>formtarget</td>
    <td>formTarget</td>
    <td>true</td>
    <td>&#39;_self&#39; | &#39;_blank&#39; | &#39;_parent&#39; | &#39;_top&#39;</td>
    <td></td>
    <td><p>提交表单后接收到的响应应显示在何处。可选值包括：</p>
<ul>
<li><code>_self</code>：默认选项，在当前框架中打开</li>
<li><code>_blank</code>：在新窗口中打开</li>
<li><code>_parent</code>：在父框架中打开</li>
<li><code>_top</code>：在整个窗口中打开</li>
</ul>
<p>如果设置了此属性，将覆盖 <code>&lt;form&gt;</code> 元素的 <code>target</code> 属性。</p>
<p><strong>Note</strong>：仅在未设置 <code>href</code> 属性且 <code>type=&quot;submit&quot;</code> 时，此属性才有效。</p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>validity</td>
    <td>false</td>
    <td>ValidityState</td>
    <td></td>
    <td><p>表单验证状态对象，具体参见 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/ValidityState" target="_blank" rel="noopener nofollow"><code>ValidityState</code></a></p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>validationMessage</td>
    <td>false</td>
    <td>string</td>
    <td></td>
    <td><p>如果表单验证未通过，此属性将包含提示信息。如果验证通过，此属性将为空字符串</p>
</td>
  </tr>
</tbody>
</table>

### 方法

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>click(): void</td>
    <td><p>模拟鼠标点击元素</p>
</td>
  </tr>
  <tr>
    <td>focus(options?: FocusOptions): void</td>
    <td><p>将焦点设置到当前元素。</p>
<p>可以传入一个对象作为参数，该对象的属性包括：</p>
<ul>
<li><code>preventScroll</code>：默认情况下，元素获取焦点后，页面会滚动以将该元素滚动到视图中。如果不希望页面滚动，可以将此属性设置为 <code>true</code>。</li>
</ul>
</td>
  </tr>
  <tr>
    <td>blur(): void</td>
    <td><p>移除当前元素的焦点</p>
</td>
  </tr>
  <tr>
    <td>checkValidity(): boolean</td>
    <td><p>检查表单字段是否通过验证。如果未通过，返回 <code>false</code> 并触发 <code>invalid</code> 事件；如果通过，返回 <code>true</code></p>
</td>
  </tr>
  <tr>
    <td>reportValidity(): boolean</td>
    <td><p>检查表单字段是否通过验证。如果未通过，返回 <code>false</code> 并触发 <code>invalid</code> 事件；如果通过，返回 <code>true</code>。</p>
<p>如果验证未通过，还会在组件上显示验证失败的提示。</p>
</td>
  </tr>
  <tr>
    <td>setCustomValidity(message: string): void</td>
    <td><p>设置自定义的错误提示文本。只要这个文本不为空，就表示字段未通过验证</p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>focus</td>
    <td><p>获得焦点时触发</p>
</td>
  </tr>
  <tr>
    <td>blur</td>
    <td><p>失去焦点时触发</p>
</td>
  </tr>
  <tr>
    <td>invalid</td>
    <td><p>表单字段验证未通过时触发</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p>分段按钮项的文本内容</p>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td><p>分段按钮项的左侧图标</p>
</td>
  </tr>
  <tr>
    <td>selected-icon</td>
    <td><p>选中状态的左侧图标</p>
</td>
  </tr>
  <tr>
    <td>end-icon</td>
    <td><p>分段按钮项的右侧图标</p>
</td>
  </tr>
</tbody>
</table>

### CSS Parts

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>button</td>
    <td><p>内部的 <code>&lt;button&gt;</code> 或 <code>&lt;a&gt;</code> 元素</p>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td><p>左侧的图标</p>
</td>
  </tr>
  <tr>
    <td>selected-icon</td>
    <td><p>选中状态的左侧图标</p>
</td>
  </tr>
  <tr>
    <td>end-icon</td>
    <td><p>右侧的图标</p>
</td>
  </tr>
  <tr>
    <td>label</td>
    <td><p>文本内容</p>
</td>
  </tr>
  <tr>
    <td>loading</td>
    <td><p>加载中状态的 <code>&lt;mdui-circular-progress&gt;</code> 元素</p>
</td>
  </tr>
</tbody>
</table>

# 滑块组件 Slider

滑块组件允许用户通过滑动滑块从一系列值中进行选择。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/slider.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { Slider } from 'mdui/components/slider.js';
```

使用示例：

```html
<mdui-slider></mdui-slider>
```

## 示例 {#examples}

### 默认值 {#example-value}

通过 `value` 属性，可以读取或设置滑块的当前值。

```html
<mdui-slider value="50"></mdui-slider>
```

### 禁用状态 {#example-disabled}

添加 `disabled` 属性可以禁用滑块。

```html
<mdui-slider disabled></mdui-slider>
```

### 范围 {#example-min-max}

使用 `min` 和 `max` 属性来设置滑块的最小值和最大值。

```html
<mdui-slider min="10" max="20"></mdui-slider>
```

### 步进间隔 {#example-step}

通过 `step` 属性，你可以设置滑块的步进间隔。

```html
<mdui-slider step="10"></mdui-slider>
```

### 刻度标记 {#example-tickmarks}

添加 `tickmarks` 属性，可以在滑块上显示刻度标记。

```html
<mdui-slider tickmarks step="10"></mdui-slider>
```

### 隐藏文本提示 {#example-nolabel}

如果你想隐藏滑块上的文本提示，可以添加 `nolabel` 属性。

```html
<mdui-slider nolabel></mdui-slider>
```

### 修改文本提示 {#example-labelFormatter}

可以通过 `labelFormatter` JavaScript 属性来修改文本提示的显示格式。这个属性的值应该是一个函数，该函数接收当前滑块的值作为参数，返回你希望显示的文本。

```html
<mdui-slider class="example-label-formatter"></mdui-slider>

<script>
  const slider = document.querySelector(".example-label-formatter");
  slider.labelFormatter = (value) => `${value} 小时`;
</script>
```

## mdui-slider API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>value</td>
    <td>value</td>
    <td>false</td>
    <td>number</td>
    <td>0</td>
    <td><p>滑块的值，将于表单数据一起提交</p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>defaultValue</td>
    <td>false</td>
    <td>number</td>
    <td>0</td>
    <td><p>默认值。在重置表单时，将重置为该默认值。该属性只能通过 JavaScript 属性设置</p>
</td>
  </tr>
  <tr>
    <td>autofocus</td>
    <td>autofocus</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否在页面加载完成后自动获取焦点</p>
</td>
  </tr>
  <tr>
    <td>tabindex</td>
    <td>tabIndex</td>
    <td>false</td>
    <td>number</td>
    <td></td>
    <td><p>元素在使用 Tab 键切换焦点时的顺序</p>
</td>
  </tr>
  <tr>
    <td>min</td>
    <td>min</td>
    <td>true</td>
    <td>number</td>
    <td>0</td>
    <td><p>滑块的最小值，默认为 <code>0</code></p>
</td>
  </tr>
  <tr>
    <td>max</td>
    <td>max</td>
    <td>true</td>
    <td>number</td>
    <td>100</td>
    <td><p>滑块的最大值，默认为 <code>100</code></p>
</td>
  </tr>
  <tr>
    <td>step</td>
    <td>step</td>
    <td>true</td>
    <td>number</td>
    <td>1</td>
    <td><p>步进间隔，默认为 <code>1</code></p>
</td>
  </tr>
  <tr>
    <td>tickmarks</td>
    <td>tickmarks</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否添加刻度标记</p>
</td>
  </tr>
  <tr>
    <td>nolabel</td>
    <td>nolabel</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否隐藏文本提示</p>
</td>
  </tr>
  <tr>
    <td>disabled</td>
    <td>disabled</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否被禁用</p>
</td>
  </tr>
  <tr>
    <td>form</td>
    <td>form</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>关联的 <code>&lt;form&gt;</code> 元素。此属性值应为同一页面中的一个 <code>&lt;form&gt;</code> 元素的 <code>id</code>。</p>
<p>如果未指定此属性，则该元素必须是 <code>&lt;form&gt;</code> 元素的子元素。通过此属性，你可以将元素放置在页面的任何位置，而不仅仅是 <code>&lt;form&gt;</code> 元素的子元素。</p>
</td>
  </tr>
  <tr>
    <td>name</td>
    <td>name</td>
    <td>true</td>
    <td>string</td>
    <td>''</td>
    <td><p>滑块的名称，该名称将与表单数据一起提交</p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>validity</td>
    <td>false</td>
    <td>ValidityState</td>
    <td></td>
    <td><p>表单验证状态对象，具体参见 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/ValidityState" target="_blank" rel="noopener nofollow"><code>ValidityState</code></a></p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>validationMessage</td>
    <td>false</td>
    <td>string</td>
    <td></td>
    <td><p>如果表单验证未通过，此属性将包含提示信息。如果验证通过，此属性将为空字符串</p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>labelFormatter</td>
    <td>false</td>
    <td>(value: number) =&gt; string</td>
    <td></td>
    <td><p>用于自定义标签的显示格式的函数。函数参数为滑块的当前值，返回值为期望显示的文本。</p>
</td>
  </tr>
</tbody>
</table>

### 方法

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>click(): void</td>
    <td><p>模拟鼠标点击元素</p>
</td>
  </tr>
  <tr>
    <td>focus(options?: FocusOptions): void</td>
    <td><p>将焦点设置到当前元素。</p>
<p>可以传入一个对象作为参数，该对象的属性包括：</p>
<ul>
<li><code>preventScroll</code>：默认情况下，元素获取焦点后，页面会滚动以将该元素滚动到视图中。如果不希望页面滚动，可以将此属性设置为 <code>true</code>。</li>
</ul>
</td>
  </tr>
  <tr>
    <td>blur(): void</td>
    <td><p>移除当前元素的焦点</p>
</td>
  </tr>
  <tr>
    <td>checkValidity(): boolean</td>
    <td><p>检查表单字段是否通过验证。如果未通过，返回 <code>false</code> 并触发 <code>invalid</code> 事件；如果通过，返回 <code>true</code></p>
</td>
  </tr>
  <tr>
    <td>reportValidity(): boolean</td>
    <td><p>检查表单字段是否通过验证。如果未通过，返回 <code>false</code> 并触发 <code>invalid</code> 事件；如果通过，返回 <code>true</code>。</p>
<p>如果验证未通过，还会在组件上显示验证失败的提示。</p>
</td>
  </tr>
  <tr>
    <td>setCustomValidity(message: string): void</td>
    <td><p>设置自定义的错误提示文本。只要这个文本不为空，就表示字段未通过验证</p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>focus</td>
    <td><p>获得焦点时触发</p>
</td>
  </tr>
  <tr>
    <td>blur</td>
    <td><p>失去焦点时触发</p>
</td>
  </tr>
  <tr>
    <td>change</td>
    <td><p>在值发生变更，且失去焦点时，将触发该事件</p>
</td>
  </tr>
  <tr>
    <td>input</td>
    <td><p>值变更时触发</p>
</td>
  </tr>
  <tr>
    <td>invalid</td>
    <td><p>表单字段验证未通过时触发</p>
</td>
  </tr>
</tbody>
</table>

### CSS Parts

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>track-inactive</td>
    <td><p>未激活状态的轨道</p>
</td>
  </tr>
  <tr>
    <td>track-active</td>
    <td><p>已激活状态的轨道</p>
</td>
  </tr>
  <tr>
    <td>handle</td>
    <td><p>操作杆</p>
</td>
  </tr>
  <tr>
    <td>label</td>
    <td><p>提示文本</p>
</td>
  </tr>
  <tr>
    <td>tickmark</td>
    <td><p>刻度标记</p>
</td>
  </tr>
</tbody>
</table>

# 消息条组件 Snackbar

消息条组件用于在页面中展示简短的应用程序进程信息。

除了直接使用该组件外，mdui 还提供了一个 [`mdui.snackbar`](/zh-cn/docs/2/functions/snackbar) 函数，以简化 Snackbar 组件的使用。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/snackbar.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { Snackbar } from 'mdui/components/snackbar.js';
```

使用示例：

```html
<mdui-snackbar class="example-snackbar">Photo archived</mdui-snackbar>

<mdui-button>打开 Snackbar</mdui-button>

<script>
  const snackbar = document.querySelector(".example-snackbar");
  const openButton = snackbar.nextElementSibling;

  openButton.addEventListener("click", () => snackbar.open = true);
</script>
```

## 示例 {#examples}

### 位置 {#example-placement}

通过 `placement` 属性，你可以设置 Snackbar 的显示位置。

```html
<div class="example-placement">
  <div class="row">
    <mdui-snackbar placement="top-start">Photo archived</mdui-snackbar>
    <mdui-button variant="outlined">top-start</mdui-button>

    <mdui-snackbar placement="top">Photo archived</mdui-snackbar>
    <mdui-button variant="outlined">top</mdui-button>

    <mdui-snackbar placement="top-end">Photo archived</mdui-snackbar>
    <mdui-button variant="outlined">top-end</mdui-button>
  </div>
  <div class="row">
    <mdui-snackbar placement="bottom-start">Photo archived</mdui-snackbar>
    <mdui-button variant="outlined">bottom-start</mdui-button>

    <mdui-snackbar placement="bottom">Photo archived</mdui-snackbar>
    <mdui-button variant="outlined">bottom</mdui-button>

    <mdui-snackbar placement="bottom-end">Photo archived</mdui-snackbar>
    <mdui-button variant="outlined">bottom-end</mdui-button>
  </div>
</div>

<script>
  const snackbars = document.querySelectorAll(".example-placement mdui-snackbar");

  snackbars.forEach((snackbar) => {
    const button = snackbar.nextElementSibling;
    button.addEventListener("click", () => snackbar.open = true);
  });
</script>

<style>
.example-placement mdui-button {
  margin: 0.25rem;
  width: 7.5rem;
}
</style>
```

### 操作按钮 {#example-action}

可以使用 `action` 属性在 Snackbar 的右侧添加一个操作按钮，并通过该属性指定按钮的文本。点击操作按钮会触发 `action-click` 事件。如果你想让操作按钮显示为加载中状态，可以添加 `action-loading` 属性。

```html
<mdui-snackbar action="Undo" class="example-action">Photo archived</mdui-snackbar>

<mdui-button>打开 Snackbar</mdui-button>

<script>
  const snackbar = document.querySelector(".example-action");
  const openButton = snackbar.nextElementSibling;

  snackbar.addEventListener("action-click", () => {
    snackbar.actionLoading = true;
    setTimeout(() => snackbar.actionLoading = false, 2000);
  });

  openButton.addEventListener("click", () => snackbar.open = true);
</script>
```

也可以通过 `action` slot 在 Snackbar 的右侧添加自定义元素。

```html
<mdui-snackbar class="example-action-slot">
  Photo archived
  <mdui-button slot="action" variant="text">Undo</mdui-button>
</mdui-snackbar>

<mdui-button>打开 Snackbar</mdui-button>

<script>
  const snackbar = document.querySelector(".example-action-slot");
  const openButton = snackbar.nextElementSibling;

  openButton.addEventListener("click", () => snackbar.open = true);
</script>
```

### 可关闭 {#example-closeable}

添加 `closeable` 属性后，Snackbar 的右侧会出现一个关闭按钮。点击该按钮会关闭 Snackbar，并触发 `close` 事件。

```html
<mdui-snackbar closeable class="example-closeable">Photo archived</mdui-snackbar>

<mdui-button>打开 Snackbar</mdui-button>

<script>
  const snackbar = document.querySelector(".example-closeable");
  const openButton = snackbar.nextElementSibling;

  openButton.addEventListener("click", () => snackbar.open = true);
</script>
```

可以通过 `close-button` slot 来自定义关闭按钮的元素。

```html
<mdui-snackbar closeable class="example-close-button-slot">
  Photo archived
  <mdui-avatar slot="close-button" icon="people_alt"></mdui-avatar>
</mdui-snackbar>

<mdui-button>打开 Snackbar</mdui-button>

<script>
  const snackbar = document.querySelector(".example-close-button-slot");
  const openButton = snackbar.nextElementSibling;

  openButton.addEventListener("click", () => snackbar.open = true);
</script>
```

通过设置 `close-icon` 属性，你可以修改默认关闭按钮中的 Material Icons 图标。也可以通过 `close-icon` slot 来自定义关闭按钮中的图标元素。

```html
<mdui-snackbar
  closeable
  close-icon="delete"
  class="example-close-icon"
>Photo archived</mdui-snackbar>

<mdui-button>打开 Snackbar</mdui-button>

<script>
  const snackbar = document.querySelector(".example-close-icon");
  const openButton = snackbar.nextElementSibling;

  openButton.addEventListener("click", () => snackbar.open = true);
</script>
```

### 文本行数 {#example-message-line}

默认情况下，消息文本没有行数限制。你可以通过 `message-line` 属性来限制文本行数，最多可以设置为 2 行。

```html
<mdui-snackbar message-line="1" class="example-line">The item already has the label "travel". You can add a new label. You can add a new label.</mdui-snackbar>

<mdui-button>打开 Snackbar</mdui-button>

<script>
  const snackbar = document.querySelector(".example-line");
  const openButton = snackbar.nextElementSibling;

  openButton.addEventListener("click", () => snackbar.open = true);
</script>
```

### 自动关闭延时 {#example-auto-close-delay}

可以使用 `auto-close-delay` 属性来设置自动关闭的延时，单位为毫秒。默认值为 5000 毫秒。

```html
<mdui-snackbar auto-close-delay="2000" class="example-close-delay">Photo archived</mdui-snackbar>

<mdui-button>打开 Snackbar</mdui-button>

<script>
  const snackbar = document.querySelector(".example-close-delay");
  const openButton = snackbar.nextElementSibling;

  openButton.addEventListener("click", () => snackbar.open = true);
</script>
```

### 点击外部区域关闭 {#example-close-on-outside-click}

通过添加 `close-on-outside-click` 属性，你可以设置在点击 Snackbar 外部区域时关闭 Snackbar。

```html
<mdui-snackbar close-on-outside-click class="example-outside">Photo archived</mdui-snackbar>

<mdui-button>打开 Snackbar</mdui-button>

<script>
  const snackbar = document.querySelector(".example-outside");
  const openButton = snackbar.nextElementSibling;

  openButton.addEventListener("click", () => snackbar.open = true);
</script>
```

## mdui-snackbar API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>open</td>
    <td>open</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否显示 Snackbar</p>
</td>
  </tr>
  <tr>
    <td>placement</td>
    <td>placement</td>
    <td>true</td>
    <td>&#39;top&#39; | &#39;top-start&#39; | &#39;top-end&#39; | &#39;bottom&#39; | &#39;bottom-start&#39; | &#39;bottom-end&#39;</td>
    <td>'bottom'</td>
    <td><p>Snackbar 的显示位置。默认为 <code>bottom</code>。可选值包括：</p>
<ul>
<li><code>top</code>：顶部居中</li>
<li><code>top-start</code>：顶部左对齐</li>
<li><code>top-end</code>：顶部右对齐</li>
<li><code>bottom</code>：底部居中</li>
<li><code>bottom-start</code>：底部左对齐</li>
<li><code>bottom-end</code>：底部右对齐</li>
</ul>
</td>
  </tr>
  <tr>
    <td>action</td>
    <td>action</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>操作按钮的文本。也可以通过 <code>slot=&quot;action&quot;</code> 设置操作按钮</p>
</td>
  </tr>
  <tr>
    <td>action-loading</td>
    <td>actionLoading</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>操作按钮是否处于加载中状态</p>
</td>
  </tr>
  <tr>
    <td>closeable</td>
    <td>closeable</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否在右侧显示关闭按钮</p>
</td>
  </tr>
  <tr>
    <td>close-icon</td>
    <td>closeIcon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>关闭按钮的 Material Icons 图标名。也可以通过 <code>slot=&quot;close-icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>message-line</td>
    <td>messageLine</td>
    <td>true</td>
    <td>1 | 2</td>
    <td></td>
    <td><p>消息文本的最大显示行数。默认不限制。可选值包括：</p>
<ul>
<li><code>1</code>：最多显示一行</li>
<li><code>2</code>：最多显示两行</li>
</ul>
</td>
  </tr>
  <tr>
    <td>auto-close-delay</td>
    <td>autoCloseDelay</td>
    <td>true</td>
    <td>number</td>
    <td>5000</td>
    <td><p>自动关闭的延迟时间（单位：毫秒）。设置为 <code>0</code> 则不自动关闭。默认为 5000 毫秒</p>
</td>
  </tr>
  <tr>
    <td>close-on-outside-click</td>
    <td>closeOnOutsideClick</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>点击或触摸 Snackbar 以外的区域时，是否关闭 Snackbar</p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>open</td>
    <td><p>Snackbar 开始显示时，事件被触发。可以通过调用 <code>event.preventDefault()</code> 阻止 Snackbar 显示</p>
</td>
  </tr>
  <tr>
    <td>opened</td>
    <td><p>Snackbar 显示动画完成时，事件被触发</p>
</td>
  </tr>
  <tr>
    <td>close</td>
    <td><p>Snackbar 开始隐藏时，事件被触发。可以通过调用 <code>event.preventDefault()</code> 阻止 Snackbar 关闭</p>
</td>
  </tr>
  <tr>
    <td>closed</td>
    <td><p>Snackbar 隐藏动画完成时，事件被触发</p>
</td>
  </tr>
  <tr>
    <td>action-click</td>
    <td><p>点击操作按钮时触发</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p>Snackbar 的消息文本内容</p>
</td>
  </tr>
  <tr>
    <td>action</td>
    <td><p>右侧的操作按钮</p>
</td>
  </tr>
  <tr>
    <td>close-button</td>
    <td><p>右侧的关闭按钮。必须设置 <code>closeable</code> 属性为 <code>true</code> 才会显示</p>
</td>
  </tr>
  <tr>
    <td>close-icon</td>
    <td><p>关闭按钮中的图标</p>
</td>
  </tr>
</tbody>
</table>

### CSS Parts

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>message</td>
    <td><p>消息文本</p>
</td>
  </tr>
  <tr>
    <td>action</td>
    <td><p>操作按钮</p>
</td>
  </tr>
  <tr>
    <td>close-button</td>
    <td><p>关闭按钮</p>
</td>
  </tr>
  <tr>
    <td>close-icon</td>
    <td><p>关闭按钮中的图标</p>
</td>
  </tr>
</tbody>
</table>

### CSS 自定义属性

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>--shape-corner</td>
    <td><p>组件的圆角大小。可以指定一个具体的像素值；但更推荐引用<a href="/docs/2/styles/design-tokens#shape-corner">设计令牌</a></p>
</td>
  </tr>
  <tr>
    <td>--z-index</td>
    <td><p>组件的 CSS <code>z-index</code> 值</p>
</td>
  </tr>
</tbody>
</table>

# 开关切换组件 Switch

开关组件用于切换单个选项的开启或关闭状态，通过直观的交互设计，让用户能轻松调整设置。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/switch.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { Switch } from 'mdui/components/switch.js';
```

使用示例：

```html
<mdui-switch></mdui-switch>
```

## 示例 {#examples}

### 选中状态 {#example-checked}

当开关被选中时，`checked` 属性的值为 `true`。你也可以通过添加 `checked` 属性，使开关默认处于选中状态。

```html
<mdui-switch checked></mdui-switch>
```

### 禁用状态 {#example-disabled}

通过添加 `disabled` 属性，可以禁用开关组件。

```html
<mdui-switch disabled></mdui-switch>
<mdui-switch disabled checked></mdui-switch>
```

### 图标 {#example-icon}

可以通过 `unchecked-icon` 属性来设置未选中状态的 Material Icons 图标，通过 `checked-icon` 属性来设置选中状态的 Material Icons 图标。也可以通过 `unchecked-icon` 和 `checked-icon` slot 来自定义未选中和选中状态的图标元素。

```html
<mdui-switch unchecked-icon="remove_moderator" checked-icon="verified_user"></mdui-switch>
<mdui-switch>
  <mdui-icon slot="unchecked-icon" name="remove_moderator"></mdui-icon>
  <mdui-icon slot="checked-icon" name="verified_user"></mdui-icon>
</mdui-switch>
```

## mdui-switch API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>disabled</td>
    <td>disabled</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否为禁用状态</p>
</td>
  </tr>
  <tr>
    <td>checked</td>
    <td>checked</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否为选中状态</p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>defaultChecked</td>
    <td>false</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>默认选中状态。在重置表单时，将重置为此状态。此属性只能通过 JavaScript 属性设置</p>
</td>
  </tr>
  <tr>
    <td>unchecked-icon</td>
    <td>uncheckedIcon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>未选中状态的 Material Icons 图标名。也可以通过 <code>slot=&quot;unchecked-icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>checked-icon</td>
    <td>checkedIcon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>选中状态的 Material Icons 图标名。也可以通过 <code>slot=&quot;checked-icon&quot;</code> 设置</p>
<p>默认为 <code>check</code> 图标，可传入空字符串移除默认图标</p>
</td>
  </tr>
  <tr>
    <td>required</td>
    <td>required</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>提交表单时，是否必须选中此开关</p>
</td>
  </tr>
  <tr>
    <td>form</td>
    <td>form</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>关联的 <code>&lt;form&gt;</code> 元素。此属性值应为同一页面中的一个 <code>&lt;form&gt;</code> 元素的 <code>id</code>。</p>
<p>如果未指定此属性，则该元素必须是 <code>&lt;form&gt;</code> 元素的子元素。通过此属性，你可以将元素放置在页面的任何位置，而不仅仅是 <code>&lt;form&gt;</code> 元素的子元素。</p>
</td>
  </tr>
  <tr>
    <td>name</td>
    <td>name</td>
    <td>true</td>
    <td>string</td>
    <td>''</td>
    <td><p>开关的名称，将与表单数据一起提交</p>
</td>
  </tr>
  <tr>
    <td>value</td>
    <td>value</td>
    <td>true</td>
    <td>string</td>
    <td>'on'</td>
    <td><p>开关的值，将于表单数据一起提交</p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>validity</td>
    <td>false</td>
    <td>ValidityState</td>
    <td></td>
    <td><p>表单验证状态对象，具体参见 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/ValidityState" target="_blank" rel="noopener nofollow"><code>ValidityState</code></a></p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>validationMessage</td>
    <td>false</td>
    <td>string</td>
    <td></td>
    <td><p>如果表单验证未通过，此属性将包含提示信息。如果验证通过，此属性将为空字符串</p>
</td>
  </tr>
  <tr>
    <td>autofocus</td>
    <td>autofocus</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否在页面加载完成后自动获取焦点</p>
</td>
  </tr>
  <tr>
    <td>tabindex</td>
    <td>tabIndex</td>
    <td>false</td>
    <td>number</td>
    <td></td>
    <td><p>元素在使用 Tab 键切换焦点时的顺序</p>
</td>
  </tr>
</tbody>
</table>

### 方法

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>checkValidity(): boolean</td>
    <td><p>检查表单字段是否通过验证。如果未通过，返回 <code>false</code> 并触发 <code>invalid</code> 事件；如果通过，返回 <code>true</code></p>
</td>
  </tr>
  <tr>
    <td>reportValidity(): boolean</td>
    <td><p>检查表单字段是否通过验证。如果未通过，返回 <code>false</code> 并触发 <code>invalid</code> 事件；如果通过，返回 <code>true</code>。</p>
<p>如果验证未通过，还会在组件上显示验证失败的提示。</p>
</td>
  </tr>
  <tr>
    <td>setCustomValidity(message: string): void</td>
    <td><p>设置自定义的错误提示文本。只要这个文本不为空，就表示字段未通过验证</p>
</td>
  </tr>
  <tr>
    <td>click(): void</td>
    <td><p>模拟鼠标点击元素</p>
</td>
  </tr>
  <tr>
    <td>focus(options?: FocusOptions): void</td>
    <td><p>将焦点设置到当前元素。</p>
<p>可以传入一个对象作为参数，该对象的属性包括：</p>
<ul>
<li><code>preventScroll</code>：默认情况下，元素获取焦点后，页面会滚动以将该元素滚动到视图中。如果不希望页面滚动，可以将此属性设置为 <code>true</code>。</li>
</ul>
</td>
  </tr>
  <tr>
    <td>blur(): void</td>
    <td><p>移除当前元素的焦点</p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>focus</td>
    <td><p>获得焦点时触发</p>
</td>
  </tr>
  <tr>
    <td>blur</td>
    <td><p>失去焦点时触发</p>
</td>
  </tr>
  <tr>
    <td>change</td>
    <td><p>选中状态变更时触发</p>
</td>
  </tr>
  <tr>
    <td>input</td>
    <td><p>选中状态变更时触发</p>
</td>
  </tr>
  <tr>
    <td>invalid</td>
    <td><p>表单字段验证不通过时触发</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>unchecked-icon</td>
    <td><p>未选中状态的元素</p>
</td>
  </tr>
  <tr>
    <td>checked-icon</td>
    <td><p>选中状态的元素</p>
</td>
  </tr>
</tbody>
</table>

### CSS Parts

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>track</td>
    <td><p>轨道</p>
</td>
  </tr>
  <tr>
    <td>thumb</td>
    <td><p>图标容器</p>
</td>
  </tr>
  <tr>
    <td>unchecked-icon</td>
    <td><p>未选中状态的图标</p>
</td>
  </tr>
  <tr>
    <td>checked-icon</td>
    <td><p>选中状态的图标</p>
</td>
  </tr>
</tbody>
</table>

### CSS 自定义属性

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>--shape-corner</td>
    <td><p>组件轨道的圆角大小。可以指定一个具体的像素值；但更推荐引用<a href="/docs/2/styles/design-tokens#shape-corner">设计令牌</a></p>
</td>
  </tr>
  <tr>
    <td>--shape-corner-thumb</td>
    <td><p>组件图标容器的圆角大小。可以指定一个具体的像素值；但更推荐引用<a href="/docs/2/styles/design-tokens#shape-corner">设计令牌</a></p>
</td>
  </tr>
</tbody>
</table>

# 选项卡组件 Tabs

选项卡组件用于将内容或数据集分组并展示，方便用户在不同类别之间快速切换。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/tabs.js';
import 'mdui/components/tab.js';
import 'mdui/components/tab-panel.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { Tabs } from 'mdui/components/tabs.js';
import type { Tab } from 'mdui/components/tab.js';
import type { TabPanel } from 'mdui/components/tab-panel.js';
```

使用示例：

```html
<mdui-tabs value="tab-1">
  <mdui-tab value="tab-1">Tab 1</mdui-tab>
  <mdui-tab value="tab-2">Tab 2</mdui-tab>
  <mdui-tab value="tab-3">Tab 3</mdui-tab>

  <mdui-tab-panel slot="panel" value="tab-1">Panel 1</mdui-tab-panel>
  <mdui-tab-panel slot="panel" value="tab-2">Panel 2</mdui-tab-panel>
  <mdui-tab-panel slot="panel" value="tab-3">Panel 3</mdui-tab-panel>
</mdui-tabs>
```

## 示例 {#examples}

### 选项卡样式 {#example-variant}

通过在 `<mdui-tabs>` 组件上使用 `variant` 属性，可以设置选项卡的样式。

```html
<mdui-tabs value="tab-1" variant="primary">
  <mdui-tab value="tab-1">Tab 1</mdui-tab>
  <mdui-tab value="tab-2">Tab 2</mdui-tab>
  <mdui-tab value="tab-3">Tab 3</mdui-tab>

  <mdui-tab-panel slot="panel" value="tab-1">Panel 1</mdui-tab-panel>
  <mdui-tab-panel slot="panel" value="tab-2">Panel 2</mdui-tab-panel>
  <mdui-tab-panel slot="panel" value="tab-3">Panel 3</mdui-tab-panel>
</mdui-tabs>

<mdui-tabs value="tab-1" variant="secondary">
  <mdui-tab value="tab-1">Tab 1</mdui-tab>
  <mdui-tab value="tab-2">Tab 2</mdui-tab>
  <mdui-tab value="tab-3">Tab 3</mdui-tab>

  <mdui-tab-panel slot="panel" value="tab-1">Panel 1</mdui-tab-panel>
  <mdui-tab-panel slot="panel" value="tab-2">Panel 2</mdui-tab-panel>
  <mdui-tab-panel slot="panel" value="tab-3">Panel 3</mdui-tab-panel>
</mdui-tabs>
```

### 选项卡位置 {#example-placement}

在 `<mdui-tabs>` 组件上使用 `placement` 属性，可以设置选项卡的位置。

```html
<mdui-select class="example-change-placement" placeholder="选择 placement 值" style="width: 180px">
  <mdui-menu-item value="top-start">top-start</mdui-menu-item>
  <mdui-menu-item value="top">top</mdui-menu-item>
  <mdui-menu-item value="top-end">top-end</mdui-menu-item>
  <mdui-menu-item value="bottom-start">bottom-start</mdui-menu-item>
  <mdui-menu-item value="bottom">bottom</mdui-menu-item>
  <mdui-menu-item value="bottom-end">bottom-end</mdui-menu-item>
  <mdui-menu-item value="left-start">left-start</mdui-menu-item>
  <mdui-menu-item value="left">left</mdui-menu-item>
  <mdui-menu-item value="left-end">left-end</mdui-menu-item>
  <mdui-menu-item value="right-start">right-start</mdui-menu-item>
  <mdui-menu-item value="right">right</mdui-menu-item>
  <mdui-menu-item value="right-end">right-end</mdui-menu-item>
</mdui-select>

<mdui-tabs value="tab-1" placement="top-start" class="example-placement">
  <mdui-tab value="tab-1">Tab 1</mdui-tab>
  <mdui-tab value="tab-2">Tab 2</mdui-tab>
  <mdui-tab value="tab-3">Tab 3</mdui-tab>

  <mdui-tab-panel slot="panel" value="tab-1" style="height: 260px">Panel 1</mdui-tab-panel>
  <mdui-tab-panel slot="panel" value="tab-2" style="height: 260px">Panel 2</mdui-tab-panel>
  <mdui-tab-panel slot="panel" value="tab-3" style="height: 260px">Panel 3</mdui-tab-panel>
</mdui-tabs>

<script>
  const select = document.querySelector(".example-change-placement");
  const tabs = document.querySelector(".example-placement");

  select.addEventListener("change", (event) => {
    tabs.placement = event.target.value;
  });
</script>
```

### 全宽显示 {#example-full-width}

在 `<mdui-tabs>` 组件上添加 `full-width` 属性，可以使选项卡占据全部宽度，各个选项卡将平均分配宽度。

```html
<mdui-tabs value="tab-1" full-width>
  <mdui-tab value="tab-1">Tab 1</mdui-tab>
  <mdui-tab value="tab-2">Tab 2</mdui-tab>
  <mdui-tab value="tab-3">Tab 3</mdui-tab>

  <mdui-tab-panel slot="panel" value="tab-1">Panel 1</mdui-tab-panel>
  <mdui-tab-panel slot="panel" value="tab-2">Panel 2</mdui-tab-panel>
  <mdui-tab-panel slot="panel" value="tab-3">Panel 3</mdui-tab-panel>
</mdui-tabs>
```

### 图标 {#example-icon}

在 `<mdui-tab>` 组件上设置 `icon` 属性，可以在选项卡上添加 Material Icons 图标。也可以通过 `icon` slot 添加图标元素。

添加 `inline` 属性可以将图标和文本水平排列。

```html
<mdui-tabs value="tab-1">
  <mdui-tab value="tab-1" icon="library_music">Tab 1</mdui-tab>
  <mdui-tab value="tab-2">
    Tab 2
    <mdui-icon slot="icon" name="movie"></mdui-icon>
  </mdui-tab>
  <mdui-tab value="tab-3" icon="menu_book" inline>Tab 3</mdui-tab>

  <mdui-tab-panel slot="panel" value="tab-1">Panel 1</mdui-tab-panel>
  <mdui-tab-panel slot="panel" value="tab-2">Panel 2</mdui-tab-panel>
  <mdui-tab-panel slot="panel" value="tab-3">Panel 3</mdui-tab-panel>
</mdui-tabs>
```

### 徽标 {#example-badge}

在 `<mdui-tab>` 组件中，可以通过 `badge` slot 添加徽标。

```html
<mdui-tabs value="tab-1">
  <mdui-tab value="tab-1">
    Tab 1
    <mdui-badge slot="badge">99+</mdui-badge>
  </mdui-tab>
  <mdui-tab value="tab-2">Tab 2</mdui-tab>
  <mdui-tab value="tab-3">Tab 3</mdui-tab>

  <mdui-tab-panel slot="panel" value="tab-1">Panel 1</mdui-tab-panel>
  <mdui-tab-panel slot="panel" value="tab-2">Panel 2</mdui-tab-panel>
  <mdui-tab-panel slot="panel" value="tab-3">Panel 3</mdui-tab-panel>
</mdui-tabs>
```

### 自定义内容 {#example-custom}

在 `<mdui-tab>` 组件中使用 `custom` slot，可以完全自定义选项卡的内容。

```html
<mdui-tabs value="tab-1">
  <mdui-tab value="tab-1">
    Tab 1
    <mdui-chip slot="custom" icon="search">Icon</mdui-chip>
  </mdui-tab>
  <mdui-tab value="tab-2">Tab 2</mdui-tab>
  <mdui-tab value="tab-3">Tab 3</mdui-tab>

  <mdui-tab-panel slot="panel" value="tab-1">Panel 1</mdui-tab-panel>
  <mdui-tab-panel slot="panel" value="tab-2">Panel 2</mdui-tab-panel>
  <mdui-tab-panel slot="panel" value="tab-3">Panel 3</mdui-tab-panel>
</mdui-tabs>
```

## mdui-tab-panel API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>value</td>
    <td>value</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>选项卡面板项的值</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p>选项卡面板项内容</p>
</td>
  </tr>
</tbody>
</table>

## mdui-tab API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>value</td>
    <td>value</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>选项卡导航项的值</p>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td>icon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>Material Icons 图标名。也可以通过 <code>slot=&quot;icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>inline</td>
    <td>inline</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否把图标和文本水平排列</p>
</td>
  </tr>
  <tr>
    <td>autofocus</td>
    <td>autofocus</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否在页面加载完成后自动获取焦点</p>
</td>
  </tr>
  <tr>
    <td>tabindex</td>
    <td>tabIndex</td>
    <td>false</td>
    <td>number</td>
    <td></td>
    <td><p>元素在使用 Tab 键切换焦点时的顺序</p>
</td>
  </tr>
</tbody>
</table>

### 方法

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>click(): void</td>
    <td><p>模拟鼠标点击元素</p>
</td>
  </tr>
  <tr>
    <td>focus(options?: FocusOptions): void</td>
    <td><p>将焦点设置到当前元素。</p>
<p>可以传入一个对象作为参数，该对象的属性包括：</p>
<ul>
<li><code>preventScroll</code>：默认情况下，元素获取焦点后，页面会滚动以将该元素滚动到视图中。如果不希望页面滚动，可以将此属性设置为 <code>true</code>。</li>
</ul>
</td>
  </tr>
  <tr>
    <td>blur(): void</td>
    <td><p>移除当前元素的焦点</p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>focus</td>
    <td><p>获得焦点时触发</p>
</td>
  </tr>
  <tr>
    <td>blur</td>
    <td><p>失去焦点时触发</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p>选项卡导航项的文本内容</p>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td><p>选项卡导航项中的图标</p>
</td>
  </tr>
  <tr>
    <td>badge</td>
    <td><p>徽标</p>
</td>
  </tr>
  <tr>
    <td>custom</td>
    <td><p>自定义整个选项卡导航项中的内容</p>
</td>
  </tr>
</tbody>
</table>

### CSS Parts

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>container</td>
    <td><p>选项卡导航项容器</p>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td><p>选项卡导航项中的图标</p>
</td>
  </tr>
  <tr>
    <td>label</td>
    <td><p>选项卡导航项的文本</p>
</td>
  </tr>
</tbody>
</table>

## mdui-tabs API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>variant</td>
    <td>variant</td>
    <td>true</td>
    <td>&#39;primary&#39; | &#39;secondary&#39;</td>
    <td>'primary'</td>
    <td><p>选项卡形状。可选值包括：</p>
<ul>
<li><code>primary</code>：适用于位于 <code>&lt;mdui-top-app-bar&gt;</code> 下方，用于切换应用的主页面的场景</li>
<li><code>secondary</code>：适用于位于页面中，用于切换一组相关内容的场景</li>
</ul>
</td>
  </tr>
  <tr>
    <td>value</td>
    <td>value</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>当前激活的 <code>&lt;mdui-tab&gt;</code> 的值</p>
</td>
  </tr>
  <tr>
    <td>placement</td>
    <td>placement</td>
    <td>true</td>
    <td>&#39;top-start&#39; | &#39;top&#39; | &#39;top-end&#39; | &#39;bottom-start&#39; | &#39;bottom&#39; | &#39;bottom-end&#39; | &#39;left-start&#39; | &#39;left&#39; | &#39;left-end&#39; | &#39;right-start&#39; | &#39;right&#39; | &#39;right-end&#39;</td>
    <td>'top-start'</td>
    <td><p>选项卡位置。默认为 <code>top-start</code>。可选值包括：</p>
<ul>
<li><code>top-start</code>：位于上方，左对齐</li>
<li><code>top</code>：位于上方，居中对齐</li>
<li><code>top-end</code>：位于上方，右对齐</li>
<li><code>bottom-start</code>：位于下方，左对齐</li>
<li><code>bottom</code>：位于下方，居中对齐</li>
<li><code>bottom-end</code>：位于下方，右对齐</li>
<li><code>left-start</code>：位于左侧，顶部对齐</li>
<li><code>left</code>：位于左侧，居中对齐</li>
<li><code>left-end</code>：位于左侧，底部对齐</li>
<li><code>right-start</code>：位于右侧，顶部对齐</li>
<li><code>right</code>：位于右侧，居中对齐</li>
<li><code>right-end</code>：位于右侧，底部对齐</li>
</ul>
</td>
  </tr>
  <tr>
    <td>full-width</td>
    <td>fullWidth</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否填满父元素宽度</p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>change</td>
    <td><p>选中的值变化时触发</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p><code>&lt;mdui-tab&gt;</code> 元素</p>
</td>
  </tr>
  <tr>
    <td>panel</td>
    <td><p><code>&lt;mdui-tab-panel&gt;</code> 元素</p>
</td>
  </tr>
</tbody>
</table>

### CSS Parts

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>container</td>
    <td><p><code>&lt;mdui-tab&gt;</code> 元素的容器</p>
</td>
  </tr>
  <tr>
    <td>indicator</td>
    <td><p>激活状态指示器</p>
</td>
  </tr>
</tbody>
</table>

# 文本框组件 TextField

文本框组件允许用户在页面中输入文本，通常用于表单和对话框。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/text-field.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { TextField } from 'mdui/components/text-field.js';
```

使用示例：

```html
<mdui-text-field label="Text Field"></mdui-text-field>
```

## 示例 {#examples}

### 形状 {#example-variant}

通过 `variant` 属性设置文本框的形状。

```html
<mdui-text-field variant="filled" label="Text Field"></mdui-text-field>

<br/><br/>

<mdui-text-field variant="outlined" label="Text Field"></mdui-text-field>
```

### 辅助文本 {#example-helper-text}

通过 `label` 属性设置文本框上方的标签文本。

```html
<mdui-text-field label="Text Field"></mdui-text-field>
```

通过 `placeholder` 属性设置无值时的占位文本。

```html
<mdui-text-field label="Text Field" placeholder="Placeholder"></mdui-text-field>
```

通过 `helper` 属性设置文本框底部的帮助文本。也可以使用 `helper` slot 来设置帮助文本。添加 `helper-on-focus` 属性则仅在输入框聚焦时显示帮助文本。

```html
<mdui-text-field label="Text Field" helper="Supporting text"></mdui-text-field>

<mdui-text-field label="Text Field">
  <span slot="helper" style="color: blue">Supporting text</span>
</mdui-text-field>

<mdui-text-field label="Text Field" helper="Supporting text" helper-on-focus></mdui-text-field>
```

### 可清空 {#example-clearable}

添加 `clearable` 属性后，当文本框有值时，会在右侧添加清空按钮。

```html
<mdui-text-field clearable label="Text Field" value="Input Text"></mdui-text-field>
```

### 文本右对齐 {#example-end-aligned}

添加 `end-aligned` 属性可以使文本右对齐。

```html
<mdui-text-field end-aligned label="Text Field" value="Input Text"></mdui-text-field>
```

### 前后文本及图标 {#example-prefix-suffix}

通过设置 `icon` 和 `end-icon` 属性，可以在文本框的左侧和右侧添加 Material Icons 图标。也可以通过 `icon` 和 `end-icon` slot 在文本框的左侧和右侧添加元素。

```html
<mdui-text-field icon="search" end-icon="mic" label="Text Field"></mdui-text-field>

<br/><br/>

<mdui-text-field label="Text Field">
  <mdui-button-icon slot="icon" icon="search"></mdui-button-icon>
  <mdui-button-icon slot="end-icon" icon="mic"></mdui-button-icon>
</mdui-text-field>
```

通过设置 `prefix` 和 `suffix` 属性，可以在文本框的左侧和右侧添加文本。也可以通过 `prefix` 和 `suffix` slot 在文本框的左侧和右侧添加文本元素。这些文本只有在文本框聚焦或有值时才会显示。

```html
<mdui-text-field prefix="$" suffix="/100" label="Text Field"></mdui-text-field>

<br/><br/>

<mdui-text-field label="Text Field">
  <span slot="prefix" style="color: blue">$</span>
  <span slot="suffix" style="color: blue">/100</span>
</mdui-text-field>
```

### 只读模式 {#example-readonly}

通过添加 `readonly` 属性，可以将文本框设置为只读模式。

```html
<mdui-text-field readonly label="Text Field" value="Input Text"></mdui-text-field>
```

### 禁用状态 {#example-disabled}

通过添加 `disabled` 属性，可以禁用文本框。

```html
<mdui-text-field disabled label="Text Field" value="Input Text"></mdui-text-field>
```

### 多行文本框 {#example-rows}

通过 `rows` 属性，可以设置多行文本框的行数。

```html
<mdui-text-field rows="3" label="Text Field"></mdui-text-field>
```

也可以添加 `autosize` 属性，使文本框能根据输入内容的长度自动调整高度。通过 `min-rows` 和 `max-rows` 属性，可以指定自动调整高度时的最小行数和最大行数。

```html
<mdui-text-field autosize label="Text Field"></mdui-text-field>

<br/><br/>

<mdui-text-field autosize min-rows="2" max-rows="5" label="Text Field"></mdui-text-field>
```

### 字数统计 {#example-counter}

当通过 `maxlength` 属性设置了最大字数时，可以添加 `counter` 属性在文本框下方显示字数统计。

```html
<mdui-text-field maxlength="20" counter label="Text Field"></mdui-text-field>
```

### 密码框 {#example-password}

当 `type="password"` 时，添加 `toggle-password` 属性可以在文本框右侧添加切换密码可见性的按钮。

```html
<mdui-text-field type="password" toggle-password label="Text Field"></mdui-text-field>
```

## mdui-text-field API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>variant</td>
    <td>variant</td>
    <td>true</td>
    <td>&#39;filled&#39; | &#39;outlined&#39;</td>
    <td>'filled'</td>
    <td><p>文本框的形状。默认为 <code>filled</code>。可选值包括：</p>
<ul>
<li><code>filled</code>：带背景色的文本框，视觉效果较强</li>
<li><code>outlined</code>：带边框的文本框，视觉效果较弱</li>
</ul>
</td>
  </tr>
  <tr>
    <td>type</td>
    <td>type</td>
    <td>true</td>
    <td>&#39;text&#39; | &#39;number&#39; | &#39;password&#39; | &#39;url&#39; | &#39;email&#39; | &#39;search&#39; | &#39;tel&#39; | &#39;hidden&#39; | &#39;date&#39; | &#39;datetime-local&#39; | &#39;month&#39; | &#39;time&#39; | &#39;week&#39;</td>
    <td>'text'</td>
    <td><p>文本框输入类型。默认为 <code>text</code>。可选值包括：</p>
<ul>
<li><code>text</code>：默认值。文本字段</li>
<li><code>number</code>：只能输入数字。拥有动态键盘的设备上会显示数字键盘</li>
<li><code>password</code>：用于输入密码，其值会被遮盖</li>
<li><code>url</code>：用于输入 URL，会验证 URL 格式。在支持动态键盘的设备上有相应的键盘</li>
<li><code>email</code>：用于输入邮箱地址，会验证邮箱格式。在支持动态键盘的设备上有相应的键盘</li>
<li><code>search</code>：用于搜索框。拥有动态键盘的设备上的回车图标会变成搜索图标</li>
<li><code>tel</code>：用于输入电话号码。拥有动态键盘的设备上会显示电话数字键盘</li>
<li><code>hidden</code>：隐藏该控件，但其值仍会提交到服务器</li>
<li><code>date</code>：输入日期的控件（年、月、日，不包括时间）。在支持的浏览器激活时打开日期选择器或年月日的数字滚轮</li>
<li><code>datetime-local</code>：输入日期和时间的控件，不包括时区。在支持的浏览器激活时打开日期选择器或年月日的数字滚轮</li>
<li><code>month</code>：输入年和月的控件，没有时区</li>
<li><code>time</code>：用于输入时间的控件，不包括时区</li>
<li><code>week</code>：用于输入以年和周数组成的日期，不带时区</li>
</ul>
</td>
  </tr>
  <tr>
    <td>name</td>
    <td>name</td>
    <td>true</td>
    <td>string</td>
    <td>''</td>
    <td><p>文本框名称，将与表单数据一起提交</p>
</td>
  </tr>
  <tr>
    <td>value</td>
    <td>value</td>
    <td>false</td>
    <td>string</td>
    <td>''</td>
    <td><p>文本框的值，将与表单数据一起提交</p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>defaultValue</td>
    <td>false</td>
    <td>string</td>
    <td>''</td>
    <td><p>默认值。在重置表单时，将重置为该默认值。该属性只能通过 JavaScript 属性设置</p>
</td>
  </tr>
  <tr>
    <td>label</td>
    <td>label</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>标签文本</p>
</td>
  </tr>
  <tr>
    <td>placeholder</td>
    <td>placeholder</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>占位符文本</p>
</td>
  </tr>
  <tr>
    <td>helper</td>
    <td>helper</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>文本框底部的帮助文本。也可以通过 <code>slot=&quot;helper&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>helper-on-focus</td>
    <td>helperOnFocus</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否仅在获得焦点时，显示底部的帮助文本</p>
</td>
  </tr>
  <tr>
    <td>clearable</td>
    <td>clearable</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否可清空文本框内容</p>
</td>
  </tr>
  <tr>
    <td>clear-icon</td>
    <td>clearIcon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>可清空文本框时，显示在文本框右侧的清空按钮的 Material Icons 图标名。也可以通过 <code>slot=&quot;clear-icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>end-aligned</td>
    <td>endAligned</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否将文本右对齐</p>
</td>
  </tr>
  <tr>
    <td>prefix</td>
    <td>prefix</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>文本框的前缀文本。只在文本框聚焦或有值时显示。也可以通过 <code>slot=&quot;prefix&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>suffix</td>
    <td>suffix</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>文本框的后缀文本。只在文本框聚焦或有值时显示。也可以通过 <code>slot=&quot;suffix&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td>icon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>文本框的前缀图标的 Material Icons 图标名。也可以通过 <code>slot=&quot;icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>end-icon</td>
    <td>endIcon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>文本框的后缀图标的 Material Icons 图标名。也可以通过 <code>slot=&quot;end-icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>error-icon</td>
    <td>errorIcon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>表单字段验证失败时，显示在文本框右侧的 Material Icons 图标名。也可以通过 <code>slot=&quot;error-icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>form</td>
    <td>form</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>关联的 <code>&lt;form&gt;</code> 元素。此属性值应为同一页面中的一个 <code>&lt;form&gt;</code> 元素的 <code>id</code>。</p>
<p>如果未指定此属性，则该元素必须是 <code>&lt;form&gt;</code> 元素的子元素。通过此属性，你可以将元素放置在页面的任何位置，而不仅仅是 <code>&lt;form&gt;</code> 元素的子元素。</p>
</td>
  </tr>
  <tr>
    <td>readonly</td>
    <td>readonly</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否为只读模式</p>
</td>
  </tr>
  <tr>
    <td>disabled</td>
    <td>disabled</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否禁用输入框</p>
</td>
  </tr>
  <tr>
    <td>required</td>
    <td>required</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>提交表单时，是否必须填写该字段</p>
</td>
  </tr>
  <tr>
    <td>rows</td>
    <td>rows</td>
    <td>true</td>
    <td>number</td>
    <td></td>
    <td><p>文本框的固定显示行数</p>
</td>
  </tr>
  <tr>
    <td>autosize</td>
    <td>autosize</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否根据输入内容自动调整文本框高度</p>
</td>
  </tr>
  <tr>
    <td>min-rows</td>
    <td>minRows</td>
    <td>true</td>
    <td>number</td>
    <td></td>
    <td><p><code>autosize</code> 为 <code>true</code> 时，文本框的最小行数</p>
</td>
  </tr>
  <tr>
    <td>max-rows</td>
    <td>maxRows</td>
    <td>true</td>
    <td>number</td>
    <td></td>
    <td><p><code>autosize</code> 为 <code>true</code> 时，文本框的最大行数</p>
</td>
  </tr>
  <tr>
    <td>minlength</td>
    <td>minlength</td>
    <td>true</td>
    <td>number</td>
    <td></td>
    <td><p>允许输入的最小字符数</p>
</td>
  </tr>
  <tr>
    <td>maxlength</td>
    <td>maxlength</td>
    <td>true</td>
    <td>number</td>
    <td></td>
    <td><p>允许输入的最大字符数</p>
</td>
  </tr>
  <tr>
    <td>counter</td>
    <td>counter</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否显示字数统计，只在 <code>maxlength</code> 被指定时有效</p>
</td>
  </tr>
  <tr>
    <td>min</td>
    <td>min</td>
    <td>true</td>
    <td>number</td>
    <td></td>
    <td><p>当 <code>type</code> 为 <code>number</code> 时，允许输入的最小数值</p>
</td>
  </tr>
  <tr>
    <td>max</td>
    <td>max</td>
    <td>true</td>
    <td>number</td>
    <td></td>
    <td><p>当 <code>type</code> 为 <code>number</code> 时，允许输入的最大数值</p>
</td>
  </tr>
  <tr>
    <td>step</td>
    <td>step</td>
    <td>true</td>
    <td>number</td>
    <td></td>
    <td><p><code>type</code> 为 <code>number</code> 时，数值增减的步长</p>
</td>
  </tr>
  <tr>
    <td>pattern</td>
    <td>pattern</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>用于表单验证的正则表达式</p>
</td>
  </tr>
  <tr>
    <td>toggle-password</td>
    <td>togglePassword</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p><code>type</code> 为 <code>password</code> 时，设置此属性会添加一个切换按钮，用于在明文和密文之间切换</p>
</td>
  </tr>
  <tr>
    <td>show-password-icon</td>
    <td>showPasswordIcon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>密码切换按钮的 Material Icons 图标，当密码为明文时显示。也可以通过 <code>slot=&quot;show-password-icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>hide-password-icon</td>
    <td>hidePasswordIcon</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>密码切换按钮的 Material Icons 图标，当密码为密文时显示。也可以通过 <code>slot=&quot;hide-password-icon&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>autocapitalize</td>
    <td>autocapitalize</td>
    <td>true</td>
    <td>&#39;none&#39; | &#39;sentences&#39; | &#39;words&#39; | &#39;characters&#39;</td>
    <td></td>
    <td><p>iOS 的非标准属性，用于控制文本首字母是否自动大写。在 iOS5 及以后的版本上有效。可选值包括：</p>
<ul>
<li><code>none</code>：禁用首字母大写</li>
<li><code>sentences</code>：句子首字母大写</li>
<li><code>words</code>：单词首字母大写</li>
<li><code>characters</code>：所有字母大写</li>
</ul>
</td>
  </tr>
  <tr>
    <td>autocorrect</td>
    <td>autocorrect</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p><code>input</code> 元素的 <code>autocorrect</code> 属性</p>
</td>
  </tr>
  <tr>
    <td>autocomplete</td>
    <td>autocomplete</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p><code>input</code> 元素的 <code>autocomplete</code> 属性</p>
</td>
  </tr>
  <tr>
    <td>enterkeyhint</td>
    <td>enterkeyhint</td>
    <td>true</td>
    <td>&#39;enter&#39; | &#39;done&#39; | &#39;go&#39; | &#39;next&#39; | &#39;previous&#39; | &#39;search&#39; | &#39;send&#39;</td>
    <td></td>
    <td><p><code>input</code> 元素的 <code>enterkeyhint</code> 属性，用于定制虚拟键盘上的 Enter 键的显示文本或图标。具体显示效果取决于用户使用的设备和语言。可选值包括：</p>
<ul>
<li><code>enter</code>：插入新行</li>
<li><code>done</code>：完成输入，关闭虚拟键盘</li>
<li><code>go</code>：导航到输入文本的目标</li>
<li><code>next</code>：移动到下一个输入项</li>
<li><code>previous</code>：移动到上一个输入项</li>
<li><code>search</code>：导航到搜索结果</li>
<li><code>send</code>：发送文本信息</li>
</ul>
</td>
  </tr>
  <tr>
    <td>spellcheck</td>
    <td>spellcheck</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否启用拼写检查</p>
</td>
  </tr>
  <tr>
    <td>inputmode</td>
    <td>inputmode</td>
    <td>true</td>
    <td>&#39;none&#39; | &#39;text&#39; | &#39;decimal&#39; | &#39;numeric&#39; | &#39;tel&#39; | &#39;search&#39; | &#39;email&#39; | &#39;url&#39;</td>
    <td></td>
    <td><p><code>input</code> 元素的 <code>inputmode</code> 属性，用于定制虚拟键盘的类型。可选值包括：</p>
<ul>
<li><code>none</code>：无虚拟键盘。在需要实现自己的键盘输入控件时很有用</li>
<li><code>text</code>：标准文本输入键盘</li>
<li><code>decimal</code>：小数输入键盘，除了数字之外可能会有小数点 <code>.</code> 或者千分符逗号 <code>,</code></li>
<li><code>numeric</code>：显示 0-9 的数字键盘</li>
<li><code>tel</code>：手机数字键盘，包含 0-9 数字、星号 <code>*</code> 或者井号 <code>#</code> 键</li>
<li><code>search</code>：为搜索输入优化的虚拟键盘，提交按钮通常会显示 <code>search</code> 或者 “搜索”</li>
<li><code>email</code>：为邮件地址输入优化的虚拟键盘，通常会有 <code>@ .</code> 等键</li>
<li><code>url</code>：为 URL 输入优化的虚拟键盘，通常会有 <code>. / #</code> 等键</li>
</ul>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>validity</td>
    <td>false</td>
    <td>ValidityState</td>
    <td></td>
    <td><p>表单验证状态对象，具体参见 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/ValidityState" target="_blank" rel="noopener nofollow"><code>ValidityState</code></a></p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>validationMessage</td>
    <td>false</td>
    <td>string</td>
    <td></td>
    <td><p>如果表单验证未通过，此属性将包含提示信息。如果验证通过，此属性将为空字符串</p>
</td>
  </tr>
  <tr>
    <td>undefined</td>
    <td>valueAsNumber</td>
    <td>false</td>
    <td>number</td>
    <td></td>
    <td><p>获取当前值，并转换为 <code>number</code> 类型；或设置一个 <code>number</code> 类型的值。
如果值无法被转换为 <code>number</code> 类型，则会返回 <code>NaN</code>。</p>
</td>
  </tr>
  <tr>
    <td>autofocus</td>
    <td>autofocus</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否在页面加载完成后自动获取焦点</p>
</td>
  </tr>
  <tr>
    <td>tabindex</td>
    <td>tabIndex</td>
    <td>false</td>
    <td>number</td>
    <td></td>
    <td><p>元素在使用 Tab 键切换焦点时的顺序</p>
</td>
  </tr>
</tbody>
</table>

### 方法

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>select(): void</td>
    <td><p>选中文本框中的文本</p>
</td>
  </tr>
  <tr>
    <td>setSelectionRange(start: number, end: number, direction: 'forward' | 'backward' | 'none'): void</td>
    <td><p>选中文本框中特定范围的内容</p>
</td>
  </tr>
  <tr>
    <td>setRangeText(replacement: string, start: number, end: number, selectMode: 'select' | 'start' | 'end' | 'preserve'): void</td>
    <td><p>将文本框中特定范围的文本替换为新的文本</p>
</td>
  </tr>
  <tr>
    <td>checkValidity(): boolean</td>
    <td><p>检查表单字段是否通过验证。如果未通过，返回 <code>false</code> 并触发 <code>invalid</code> 事件；如果通过，返回 <code>true</code></p>
</td>
  </tr>
  <tr>
    <td>reportValidity(): boolean</td>
    <td><p>检查表单字段是否通过验证。如果未通过，返回 <code>false</code> 并触发 <code>invalid</code> 事件；如果通过，返回 <code>true</code>。</p>
<p>如果验证未通过，还会在组件上显示验证失败的提示。</p>
</td>
  </tr>
  <tr>
    <td>setCustomValidity(message: string): void</td>
    <td><p>设置自定义的错误提示文本。只要这个文本不为空，就表示字段未通过验证</p>
</td>
  </tr>
  <tr>
    <td>click(): void</td>
    <td><p>模拟鼠标点击元素</p>
</td>
  </tr>
  <tr>
    <td>focus(options?: FocusOptions): void</td>
    <td><p>将焦点设置到当前元素。</p>
<p>可以传入一个对象作为参数，该对象的属性包括：</p>
<ul>
<li><code>preventScroll</code>：默认情况下，元素获取焦点后，页面会滚动以将该元素滚动到视图中。如果不希望页面滚动，可以将此属性设置为 <code>true</code>。</li>
</ul>
</td>
  </tr>
  <tr>
    <td>blur(): void</td>
    <td><p>移除当前元素的焦点</p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>focus</td>
    <td><p>获得焦点时触发</p>
</td>
  </tr>
  <tr>
    <td>blur</td>
    <td><p>失去焦点时触发</p>
</td>
  </tr>
  <tr>
    <td>change</td>
    <td><p>在文本框的值变更，且失去焦点时触发</p>
</td>
  </tr>
  <tr>
    <td>input</td>
    <td><p>在文本框的值变更时触发</p>
</td>
  </tr>
  <tr>
    <td>invalid</td>
    <td><p>表单字段验证不通过时触发</p>
</td>
  </tr>
  <tr>
    <td>clear</td>
    <td><p>在点击由 <code>clearable</code> 属性生成的清空按钮时触发。可以通过调用 <code>event.preventDefault()</code> 阻止清空文本框</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>icon</td>
    <td><p>左侧图标</p>
</td>
  </tr>
  <tr>
    <td>end-icon</td>
    <td><p>右侧图标</p>
</td>
  </tr>
  <tr>
    <td>error-icon</td>
    <td><p>验证失败状态的右侧图标</p>
</td>
  </tr>
  <tr>
    <td>prefix</td>
    <td><p>左侧文本</p>
</td>
  </tr>
  <tr>
    <td>suffix</td>
    <td><p>右侧文本</p>
</td>
  </tr>
  <tr>
    <td>clear-button</td>
    <td><p>清空按钮</p>
</td>
  </tr>
  <tr>
    <td>clear-icon</td>
    <td><p>清空按钮中的图标</p>
</td>
  </tr>
  <tr>
    <td>toggle-password-button</td>
    <td><p>密码显示状态切换按钮</p>
</td>
  </tr>
  <tr>
    <td>show-password-icon</td>
    <td><p>显示密码状态下，密码显示状态切换按钮中的图标</p>
</td>
  </tr>
  <tr>
    <td>hide-password-icon</td>
    <td><p>隐藏密码状态下，密码显示状态切换按钮中的图标</p>
</td>
  </tr>
  <tr>
    <td>helper</td>
    <td><p>底部的帮助文本</p>
</td>
  </tr>
</tbody>
</table>

### CSS Parts

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>container</td>
    <td><p>文本框容器</p>
</td>
  </tr>
  <tr>
    <td>icon</td>
    <td><p>左侧图标</p>
</td>
  </tr>
  <tr>
    <td>end-icon</td>
    <td><p>右侧图标</p>
</td>
  </tr>
  <tr>
    <td>error-icon</td>
    <td><p>验证失败状态的右侧图标</p>
</td>
  </tr>
  <tr>
    <td>prefix</td>
    <td><p>左侧文本</p>
</td>
  </tr>
  <tr>
    <td>suffix</td>
    <td><p>右侧文本</p>
</td>
  </tr>
  <tr>
    <td>label</td>
    <td><p>上方的标签文本</p>
</td>
  </tr>
  <tr>
    <td>input</td>
    <td><p>内部的 <code>&lt;input&gt;</code> 或 <code>&lt;textarea&gt;</code> 元素</p>
</td>
  </tr>
  <tr>
    <td>clear-button</td>
    <td><p>清空按钮</p>
</td>
  </tr>
  <tr>
    <td>clear-icon</td>
    <td><p>清空按钮中的图标</p>
</td>
  </tr>
  <tr>
    <td>toggle-password-button</td>
    <td><p>密码显示状态切换按钮</p>
</td>
  </tr>
  <tr>
    <td>show-password-icon</td>
    <td><p>显示密码状态下，密码显示状态切换按钮中的图标</p>
</td>
  </tr>
  <tr>
    <td>hide-password-icon</td>
    <td><p>隐藏密码状态下，密码显示状态切换按钮中的图标</p>
</td>
  </tr>
  <tr>
    <td>supporting</td>
    <td><p>底部辅助信息容器，包括 helper、error、counter</p>
</td>
  </tr>
  <tr>
    <td>helper</td>
    <td><p>底部的帮助文本</p>
</td>
  </tr>
  <tr>
    <td>error</td>
    <td><p>底部的错误描述文本</p>
</td>
  </tr>
  <tr>
    <td>counter</td>
    <td><p>底部右侧的字数统计</p>
</td>
  </tr>
</tbody>
</table>

# 工具提示组件 Tooltip

工具提示用于对特定元素提供补充文本提示或上下文信息，以便用户更好地理解该元素的功能或用途。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/tooltip.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { Tooltip } from 'mdui/components/tooltip.js';
```

使用示例：

```html
<mdui-tooltip content="Plain tooltip">
  <mdui-button>button</mdui-button>
</mdui-tooltip>
```

## 示例 {#examples}

### 纯文本 tooltip {#example-plain}

默认为纯文本 tooltip。可以通过 `content` 属性设置 tooltip 的内容。

```html
<mdui-tooltip content="Plain tooltip">
  <mdui-button>button</mdui-button>
</mdui-tooltip>
```

也可以通过 `content` slot 设置 tooltip 的内容。

```html
<mdui-tooltip>
  <mdui-button>button</mdui-button>
  <div slot="content">
    <div style="font-size: 1.4em">title</div>
    <div>content</div>
  </div>
</mdui-tooltip>
```

### 富文本 tooltip {#example-rich}

设置 `variant` 属性为 `rich` 可以创建富文本 tooltip。可以通过 `headline` 属性设置 tooltip 的标题，`content` 属性设置 tooltip 的内容。

```html
<mdui-tooltip
  variant="rich"
  headline="Rich tooltip"
  content="Rich tooltips bring attention to a particular element of feature that warrants the user's focus. It supports multiple lines of informational text."
>
  <mdui-button>button</mdui-button>
</mdui-tooltip>
```

也可以通过 `headline`、`content` slot 设置 tooltip 的标题和内容。通过 `action` slot 设置 tooltip 的操作按钮。

```html
<mdui-tooltip variant="rich">
  <mdui-button>button</mdui-button>
  <div slot="headline">Rich tooltip</div>
  <div slot="content">Rich tooltips bring attention to a particular element of feature that warrants the user's focus. It supports multiple lines of informational text.</div>
  <mdui-button slot="action" variant="text">Action</mdui-button>
</mdui-tooltip>
```

### 位置 {#example-placement}

通过 `placement` 属性可以设置 tooltip 的位置。

```html
<div class="example-placement">
  <div class="row">
    <mdui-tooltip placement="top-left" content="top-left">
      <mdui-card variant="outlined"></mdui-card>
    </mdui-tooltip>
    <mdui-tooltip placement="top-start" content="top-start">
      <mdui-card variant="outlined"></mdui-card>
    </mdui-tooltip>
    <mdui-tooltip placement="top" content="top">
      <mdui-card variant="outlined"></mdui-card>
    </mdui-tooltip>
    <mdui-tooltip placement="top-end" content="top-end">
      <mdui-card variant="outlined"></mdui-card>
    </mdui-tooltip>
    <mdui-tooltip placement="top-right" content="top-right">
      <mdui-card variant="outlined"></mdui-card>
    </mdui-tooltip>
  </div>
  <div class="row">
    <mdui-tooltip placement="left-start" content="left-start">
      <mdui-card variant="outlined"></mdui-card>
    </mdui-tooltip>
    <mdui-tooltip placement="right-start" content="right-start">
      <mdui-card variant="outlined"></mdui-card>
    </mdui-tooltip>
  </div>
  <div class="row">
    <mdui-tooltip placement="left" content="left">
      <mdui-card variant="outlined"></mdui-card>
    </mdui-tooltip>
    <mdui-tooltip placement="right" content="right">
      <mdui-card variant="outlined"></mdui-card>
    </mdui-tooltip>
  </div>
  <div class="row">
    <mdui-tooltip placement="left-end" content="left-end">
      <mdui-card variant="outlined"></mdui-card>
    </mdui-tooltip>
    <mdui-tooltip placement="right-end" content="right-end">
      <mdui-card variant="outlined"></mdui-card>
    </mdui-tooltip>
  </div>
  <div class="row">
    <mdui-tooltip placement="bottom-left" content="bottom-left">
      <mdui-card variant="outlined"></mdui-card>
    </mdui-tooltip>
    <mdui-tooltip placement="bottom-start" content="bottom-start">
      <mdui-card variant="outlined"></mdui-card>
    </mdui-tooltip>
    <mdui-tooltip placement="bottom" content="bottom">
      <mdui-card variant="outlined"></mdui-card>
    </mdui-tooltip>
    <mdui-tooltip placement="bottom-end" content="bottom-end">
      <mdui-card variant="outlined"></mdui-card>
    </mdui-tooltip>
    <mdui-tooltip placement="bottom-right" content="bottom-right">
      <mdui-card variant="outlined"></mdui-card>
    </mdui-tooltip>
  </div>
</div>

<style>
.example-placement mdui-card {
  width: 2.5rem;
  height: 2.5rem;
  margin: 0.25rem;
}

.example-placement .row:nth-child(2) mdui-tooltip:last-child mdui-card,
.example-placement .row:nth-child(3) mdui-tooltip:last-child mdui-card,
.example-placement .row:nth-child(4) mdui-tooltip:last-child mdui-card {
  margin-left: 10rem;
}
</style>
```

### 触发方式 {#example-trigger}

通过 `trigger` 属性，可以设置 tooltip 的触发方式。

```html
<mdui-tooltip trigger="click" content="tooltip">
  <mdui-button>button</mdui-button>
</mdui-tooltip>
```

### 打开/关闭延时 {#example-delay}

当触发方式为 `hover` 时，可以通过 `open-delay` 和 `close-delay` 属性分别设置打开和关闭 tooltip 的延时，单位为毫秒。

```html
<mdui-tooltip open-delay="1000" close-delay="1000" content="tooltip">
  <mdui-button>button</mdui-button>
</mdui-tooltip>
```

### 禁用状态 {#example-disabled}

通过添加 `disabled` 属性，可以禁用 tooltip。

```html
<mdui-tooltip disabled content="tooltip">
  <mdui-button>button</mdui-button>
</mdui-tooltip>
```

## mdui-tooltip API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>variant</td>
    <td>variant</td>
    <td>true</td>
    <td>&#39;plain&#39; | &#39;rich&#39;</td>
    <td>'plain'</td>
    <td><p>tooltip 的形状。默认为 <code>plain</code>。可选值包括：</p>
<ul>
<li><code>plain</code>：纯文本，适用于简单的单行文本</li>
<li><code>rich</code>：富文本，可以包含标题、正文和操作按钮</li>
</ul>
</td>
  </tr>
  <tr>
    <td>placement</td>
    <td>placement</td>
    <td>true</td>
    <td>&#39;auto&#39; | &#39;top-left&#39; | &#39;top-start&#39; | &#39;top&#39; | &#39;top-end&#39; | &#39;top-right&#39; | &#39;bottom-left&#39; | &#39;bottom-start&#39; | &#39;bottom&#39; | &#39;bottom-end&#39; | &#39;bottom-right&#39; | &#39;left-start&#39; | &#39;left&#39; | &#39;left-end&#39; | &#39;right-start&#39; | &#39;right&#39; | &#39;right-end&#39;</td>
    <td>'auto'</td>
    <td><p>tooltip 的位置。默认为 <code>auto</code>。可选值包括：</p>
<ul>
<li><code>auto</code>：自动判断位置。<code>variant=&quot;plain&quot;</code> 时，优先使用 <code>top</code>；<code>variant=&quot;rich&quot;</code> 时，优先使用 <code>bottom-right</code></li>
<li><code>top-left</code>：位于左上方</li>
<li><code>top-start</code>：位于上方，左对齐</li>
<li><code>top</code>：位于上方，居中对齐</li>
<li><code>top-end</code>：位于上方，右对齐</li>
<li><code>top-right</code>：位于右上方</li>
<li><code>bottom-left</code>：位于左下方</li>
<li><code>bottom-start</code>：位于下方，左对齐</li>
<li><code>bottom</code>：位于下方，居中对齐</li>
<li><code>bottom-end</code>：位于下方，右对齐</li>
<li><code>bottom-right</code>：位于右下方</li>
<li><code>left-start</code>：位于左侧，顶部对齐</li>
<li><code>left</code>：位于左侧，居中对齐</li>
<li><code>left-end</code>：位于左侧，底部对齐</li>
<li><code>right-start</code>：位于右侧，顶部对齐</li>
<li><code>right</code>：位于右侧，居中对齐</li>
<li><code>right-end</code>：位于右侧，底部对齐</li>
</ul>
</td>
  </tr>
  <tr>
    <td>open-delay</td>
    <td>openDelay</td>
    <td>true</td>
    <td>number</td>
    <td>150</td>
    <td><p>鼠标悬浮触发显示的延时，单位为毫秒</p>
</td>
  </tr>
  <tr>
    <td>close-delay</td>
    <td>closeDelay</td>
    <td>true</td>
    <td>number</td>
    <td>150</td>
    <td><p>鼠标悬浮触发隐藏的延时，单位为毫秒</p>
</td>
  </tr>
  <tr>
    <td>headline</td>
    <td>headline</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>tooltip 的标题。仅 <code>variant=&quot;rich&quot;</code> 时可使用。也可以通过 <code>slot=&quot;headline&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>content</td>
    <td>content</td>
    <td>true</td>
    <td>string</td>
    <td></td>
    <td><p>tooltip 的内容。也可以通过 <code>slot=&quot;content&quot;</code> 设置</p>
</td>
  </tr>
  <tr>
    <td>trigger</td>
    <td>trigger</td>
    <td>true</td>
    <td>&#39;click&#39; | &#39;hover&#39; | &#39;focus&#39; | &#39;manual&#39; | string</td>
    <td>'hover focus'</td>
    <td><p>触发方式，支持多个值，用空格分隔。可选值包括：</p>
<ul>
<li><code>click</code>：点击时触发</li>
<li><code>hover</code>：鼠标悬浮时触发</li>
<li><code>focus</code>：聚焦时触发</li>
<li><code>manual</code>：只能通过编程方式打开和关闭 tooltip，不能再指定其他触发方式</li>
</ul>
</td>
  </tr>
  <tr>
    <td>disabled</td>
    <td>disabled</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否禁用 tooltip</p>
</td>
  </tr>
  <tr>
    <td>open</td>
    <td>open</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否显示 tooltip</p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>open</td>
    <td><p>tooltip 开始显示时，事件被触发。可以通过调用 <code>event.preventDefault()</code> 阻止 tooltip 打开</p>
</td>
  </tr>
  <tr>
    <td>opened</td>
    <td><p>tooltip 显示动画完成时，事件被触发</p>
</td>
  </tr>
  <tr>
    <td>close</td>
    <td><p>tooltip 开始隐藏时，事件被触发。可以通过调用 <code>event.preventDefault()</code> 阻止 tooltip 关闭</p>
</td>
  </tr>
  <tr>
    <td>closed</td>
    <td><p>tooltip 隐藏动画完成时，事件被触发</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p>tooltip 触发的目标元素，只有 <code>default</code> slot 中的第一个元素会作为目标元素</p>
</td>
  </tr>
  <tr>
    <td>headline</td>
    <td><p>tooltip 的标题，只有当 <code>variant=&quot;rich&quot;</code> 时，此 slot 才有效</p>
</td>
  </tr>
  <tr>
    <td>content</td>
    <td><p>tooltip 的内容，可以包含 HTML。若只包含纯文本，可以使用 <code>content</code> 属性代替</p>
</td>
  </tr>
  <tr>
    <td>action</td>
    <td><p>tooltip 底部的按钮，只有当 <code>variant=&quot;rich&quot;</code> 时，此 slot 才有效</p>
</td>
  </tr>
</tbody>
</table>

### CSS Parts

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>popup</td>
    <td><p>tooltip 的容器</p>
</td>
  </tr>
  <tr>
    <td>headline</td>
    <td><p>标题</p>
</td>
  </tr>
  <tr>
    <td>content</td>
    <td><p>正文</p>
</td>
  </tr>
  <tr>
    <td>action</td>
    <td><p>操作按钮</p>
</td>
  </tr>
</tbody>
</table>

### CSS 自定义属性

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>--shape-corner-plain</td>
    <td><p>当 variant=&quot;plain&quot; 时，组件的圆角大小。可以指定一个具体的像素值；但更推荐引用<a href="/docs/2/styles/design-tokens#shape-corner">设计令牌</a></p>
</td>
  </tr>
  <tr>
    <td>--shape-corner-rich</td>
    <td><p>当 variant=&quot;rich&quot; 时，组件的圆角大小。可以指定一个具体的像素值；但更推荐引用<a href="/docs/2/styles/design-tokens#shape-corner">设计令牌</a></p>
</td>
  </tr>
  <tr>
    <td>--z-index</td>
    <td><p>组件的 CSS <code>z-index</code> 值</p>
</td>
  </tr>
</tbody>
</table>

# 顶部应用栏组件 TopAppBar

顶部应用栏用于在页面顶部展示关键信息和相关操作，为用户提供清晰的导航和方便的功能访问。

## 使用方法 {#usage}

按需导入组件：

```js
import 'mdui/components/top-app-bar.js';
import 'mdui/components/top-app-bar-title.js';
```

按需导入组件的 TypeScript 类型：

```ts
import type { TopAppBar } from 'mdui/components/top-app-bar.js';
import type { TopAppBarTitle } from 'mdui/components/top-app-bar-title.js';
```

使用示例：（示例中的 `style="position: relative"` 仅用于演示，实际使用时请移除该样式。）

```html
<mdui-top-app-bar style="position: relative;">
  <mdui-button-icon icon="menu"></mdui-button-icon>
  <mdui-top-app-bar-title>Title</mdui-top-app-bar-title>
  <div style="flex-grow: 1"></div>
  <mdui-button-icon icon="more_vert"></mdui-button-icon>
</mdui-top-app-bar>
```

**注意事项：**

该组件默认使用 `position: fixed` 定位，并会自动在 `body` 上添加 `padding-top` 样式，以防止页面内容被该组件遮挡。

但在以下两种情况下，会默认使用 `position: absolute` 定位：

1. 当指定了 `scroll-target` 属性时。此时会在 `scroll-target` 的元素上添加 `padding-top` 样式。
2. 当位于 [`<mdui-layout></mdui-layout>`](/zh-cn/docs/2/components/layout) 组件中时。此时不会添加 `padding-top` 样式。

## 示例 {#examples}

### 位于指定容器内 {#example-scroll-target}

默认情况下，顶部应用栏会相对于当前窗口，在页面顶部显示。

如果你希望将顶部应用栏放在指定的容器内，可以在 `<mdui-top-app-bar>` 组件上指定 `scroll-target` 属性，其值为可滚动内容的容器的 CSS 选择器或 DOM 元素。此时，顶部应用栏会相对于父元素显示（你需要自行在父元素上添加样式 `position: relative; overflow: hidden`）。

```html
<div style="position: relative;overflow: hidden">
  <mdui-top-app-bar scroll-target=".example-scroll-target">
    <mdui-top-app-bar-title>Title</mdui-top-app-bar-title>
  </mdui-top-app-bar>

  <div class="example-scroll-target" style="height: 160px;overflow: auto;">
    <div style="height: 1000px"></div>
  </div>
</div>
```

### 形状 {#example-variant}

可以通过在 `<mdui-top-app-bar>` 组件上使用 `variant` 属性来设置顶部应用栏的形状。

```html
<div style="position: relative;overflow: hidden">
  <mdui-top-app-bar variant="small" scroll-target=".example-variant" class="example-variant-bar">
    <mdui-button-icon icon="menu"></mdui-button-icon>
    <mdui-top-app-bar-title>Title</mdui-top-app-bar-title>
    <div style="flex-grow: 1"></div>
    <mdui-button-icon icon="more_vert"></mdui-button-icon>
  </mdui-top-app-bar>

  <div class="example-variant" style="height: 160px;overflow: auto;">
    <div style="height: 1000px">
      <mdui-segmented-button-group selects="single" value="small">
        <mdui-segmented-button value="center-aligned">center-aligned</mdui-segmented-button>
        <mdui-segmented-button value="small">small</mdui-segmented-button>
        <mdui-segmented-button value="medium">medium</mdui-segmented-button>
        <mdui-segmented-button value="large">large</mdui-segmented-button>
      </mdui-segmented-button-group>
    </div>
  </div>
</div>

<script>
  const topAppBar = document.querySelector(".example-variant-bar");
  const segmentedButtonGroup = document.querySelector(".example-variant");

  segmentedButtonGroup.addEventListener("change", (event) => {
    topAppBar.variant = event.target.value;
  });
</script>
```

### 页面滚动时的行为 {#example-scroll-behavior}

通过在 `<mdui-top-app-bar>` 组件上设置 `scroll-behavior` 属性，可以定义页面滚动时顶部应用栏的行为。可以同时设置多个行为，用空格分隔即可。

滚动行为包括：

- `hide`：页面向下滚动时隐藏顶部应用栏，向上滚动时显示顶部应用栏。
- `shrink`：仅在 `variant` 属性为 `medium` 或 `large` 时有效。页面向下滚动时展开顶部应用栏，向上滚动时收缩顶部应用栏。
- `elevate`：页面向下滚动时，在顶部应用栏上添加阴影；页面滚回到顶部时，取消阴影。

使用 `scroll-threshold` 属性，可以设置滚动多少像素后开始触发顶部应用栏的滚动行为。（注意，为了响应及时，在使用了 `elevate` 滚动行为时，请不要再设置 `scroll-threshold` 属性。）

**示例：滚动时隐藏**

```html
<div style="position: relative;overflow: hidden">
  <mdui-top-app-bar
    scroll-behavior="hide"
    scroll-threshold="30"
    scroll-target=".example-scroll-behavior-hide"
  >
    <mdui-button-icon icon="menu"></mdui-button-icon>
    <mdui-top-app-bar-title>Title</mdui-top-app-bar-title>
    <div style="flex-grow: 1"></div>
    <mdui-button-icon icon="more_vert"></mdui-button-icon>
  </mdui-top-app-bar>

  <div class="example-scroll-behavior-hide" style="height: 160px;overflow: auto;">
    <div style="height: 1000px"></div>
  </div>
</div>
```

**示例：滚动时添加阴影**

```html
<div style="position: relative;overflow: hidden">
  <mdui-top-app-bar
    scroll-behavior="elevate"
    scroll-target=".example-scroll-behavior-elevate"
  >
    <mdui-button-icon icon="menu"></mdui-button-icon>
    <mdui-top-app-bar-title>Title</mdui-top-app-bar-title>
    <div style="flex-grow: 1"></div>
    <mdui-button-icon icon="more_vert"></mdui-button-icon>
  </mdui-top-app-bar>

  <div class="example-scroll-behavior-elevate" style="height: 160px;overflow: auto;">
    <div style="height: 1000px"></div>
  </div>
</div>
```

**示例：滚动时收缩**

```html
<div style="position: relative;overflow: hidden">
  <mdui-top-app-bar
    variant="medium"
    scroll-behavior="shrink"
    scroll-threshold="30"
    scroll-target=".example-scroll-behavior-shrink"
  >
    <mdui-button-icon icon="menu"></mdui-button-icon>
    <mdui-top-app-bar-title>Title</mdui-top-app-bar-title>
    <div style="flex-grow: 1"></div>
    <mdui-button-icon icon="more_vert"></mdui-button-icon>
  </mdui-top-app-bar>

  <div class="example-scroll-behavior-shrink" style="height: 160px;overflow: auto;">
    <div style="height: 1000px"></div>
  </div>
</div>
```

**示例：滚动时收缩及添加阴影**

```html
<div style="position: relative;overflow: hidden">
  <mdui-top-app-bar
    variant="medium"
    scroll-behavior="shrink elevate"
    scroll-target=".example-scroll-behavior-shrink-elevate"
  >
    <mdui-button-icon icon="menu"></mdui-button-icon>
    <mdui-top-app-bar-title>Title</mdui-top-app-bar-title>
    <div style="flex-grow: 1"></div>
    <mdui-button-icon icon="more_vert"></mdui-button-icon>
  </mdui-top-app-bar>

  <div class="example-scroll-behavior-shrink-elevate" style="height: 160px;overflow: auto;">
    <div style="height: 1000px"></div>
  </div>
</div>
```

### 展开状态的文本 {#label-large}

对于 `variant` 属性为 `medium` 或 `large`，且 `scroll-behavior` 属性为 `shrink` 的顶部应用栏，你可以在 `<mdui-top-app-bar-title>` 组件中添加 `label-large` slot，以设置展开状态下的文本。

```html
<div style="position: relative;overflow: hidden">
  <mdui-top-app-bar
    variant="medium"
    scroll-behavior="shrink elevate"
    scroll-target=".example-label-large-slot"
  >
    <mdui-button-icon icon="menu"></mdui-button-icon>
    <mdui-top-app-bar-title>
      这是收起状态的标题
      <span slot="label-large">这是展开状态的标题</span>
    </mdui-top-app-bar-title>
    <div style="flex-grow: 1"></div>
    <mdui-button-icon icon="more_vert"></mdui-button-icon>
  </mdui-top-app-bar>

  <div class="example-label-large-slot" style="height: 160px;overflow: auto;">
    <div style="height: 1000px"></div>
  </div>
</div>
```

## mdui-top-app-bar-title API

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p>顶部应用栏的标题文本</p>
</td>
  </tr>
  <tr>
    <td>label-large</td>
    <td><p>展开状态下的标题文本</p>
</td>
  </tr>
</tbody>
</table>

### CSS Parts

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>label</td>
    <td><p>标题文本</p>
</td>
  </tr>
  <tr>
    <td>label-large</td>
    <td><p>展开状态下的标题文本</p>
</td>
  </tr>
</tbody>
</table>

## mdui-top-app-bar API

### 属性

<table>
<thead>
  <tr>
    <th>HTML 属性</th>
    <th>JavaScript 属性</th>
    <th>Reflect</th>
    <th>类型</th>
    <th>默认值</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>variant</td>
    <td>variant</td>
    <td>true</td>
    <td>&#39;center-aligned&#39; | &#39;small&#39; | &#39;medium&#39; | &#39;large&#39;</td>
    <td>'small'</td>
    <td><p>顶部应用栏的形状。默认为 <code>small</code>。可选值包括：</p>
<ul>
<li><code>center-aligned</code>：小型应用栏，标题居中</li>
<li><code>small</code>：小型应用栏</li>
<li><code>medium</code>：中型应用栏</li>
<li><code>large</code>：大型应用栏</li>
</ul>
</td>
  </tr>
  <tr>
    <td>hide</td>
    <td>hide</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否隐藏</p>
</td>
  </tr>
  <tr>
    <td>shrink</td>
    <td>shrink</td>
    <td>true</td>
    <td>boolean</td>
    <td>false</td>
    <td><p>是否缩小为 <code>variant=&quot;small&quot;</code> 的样式，仅在 <code>variant=&quot;medium&quot;</code> 或 <code>variant=&quot;large&quot;</code> 时生效</p>
</td>
  </tr>
  <tr>
    <td>scroll-behavior</td>
    <td>scrollBehavior</td>
    <td>true</td>
    <td>&#39;hide&#39; | &#39;shrink&#39; | &#39;elevate&#39;</td>
    <td></td>
    <td><p>滚动行为。可同时使用多个值，用空格分隔。可选值包括：</p>
<ul>
<li><code>hide</code>：滚动时隐藏</li>
<li><code>shrink</code>：在中型、大型应用栏中可使用，滚动时缩小成小型应用栏的样式</li>
<li><code>elevate</code>：滚动时添加阴影</li>
</ul>
</td>
  </tr>
  <tr>
    <td>scroll-target</td>
    <td>scrollTarget</td>
    <td>false</td>
    <td>string | HTMLElement | JQ&lt;HTMLElement&gt;</td>
    <td></td>
    <td><p>需要监听其滚动事件的元素。值可以是 CSS 选择器、DOM 元素、或 <a href="/docs/2/functions/jq">JQ 对象</a>。默认监听 <code>window</code> 的滚动事件</p>
</td>
  </tr>
  <tr>
    <td>scroll-threshold</td>
    <td>scrollThreshold</td>
    <td>true</td>
    <td>number</td>
    <td></td>
    <td><p>在滚动多少距离之后触发滚动行为，单位为 <code>px</code></p>
</td>
  </tr>
  <tr>
    <td>order</td>
    <td>order</td>
    <td>true</td>
    <td>number</td>
    <td></td>
    <td><p>该组件在 <a href="/docs/2/components/layout"><code>&lt;mdui-layout&gt;</code></a> 中的布局顺序，按从小到大排序。默认为 <code>0</code></p>
</td>
  </tr>
</tbody>
</table>

### 事件

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>show</td>
    <td><p>开始显示时，事件被触发。可以通过调用 <code>event.preventDefault()</code> 阻止显示</p>
</td>
  </tr>
  <tr>
    <td>shown</td>
    <td><p>显示动画完成时，事件被触发</p>
</td>
  </tr>
  <tr>
    <td>hide</td>
    <td><p>开始隐藏时，事件被触发。可以通过调用 <code>event.preventDefault()</code> 阻止隐藏</p>
</td>
  </tr>
  <tr>
    <td>hidden</td>
    <td><p>隐藏动画完成时，事件被触发</p>
</td>
  </tr>
</tbody>
</table>

### Slots

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>默认</td>
    <td><p>顶部应用栏内部的元素</p>
</td>
  </tr>
</tbody>
</table>

### CSS 自定义属性

<table>
<thead>
  <tr>
    <th>名称</th>
    <th>描述</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>--shape-corner</td>
    <td><p>组件的圆角大小。可以指定一个具体的像素值；但更推荐引用<a href="/docs/2/styles/design-tokens#shape-corner">设计令牌</a></p>
</td>
  </tr>
  <tr>
    <td>--z-index</td>
    <td><p>组件的 CSS <code>z-index</code> 值</p>
</td>
  </tr>
</tbody>
</table>

# jq 工具库

mdui 内置了一个轻量级的 JavaScript 工具库，它提供了类似于 jQuery 的 API 和链式调用方式，但其体积只有 jQuery 的六分之一。

你可以按需导入该工具函数：

```js
import { $ } from 'mdui/jq.js';
```

## 核心 {#api-core}

### `$()` {#dollar}

该函数有多种用法：

传入 CSS 选择器作为参数，返回包含匹配元素的 JQ 对象。

```js
$('.box');
```

传入 DOM 元素、任意数组、NodeList 或 JQ 对象，返回包含指定元素的 JQ 对象。

```js
$(document);
```

传入 HTML 字符串，返回包含根据 HTML 创建的 DOM 的 JQ 对象。

```js
$(`<div id="wrapper">
  <span id="inner"></span>
</div>`);
```

传入一个函数，当 DOM 加载完毕后会调用该函数。

```js
$(function () {
  console.log('DOM Loaded');
});
```

## 扩展 {#api-extend}

### `$.extend()` {#d-extend}

如果只传入一个对象，该对象中的属性将合并到 `$` 对象中，相当于在 `$` 的命名空间下添加新的功能。

```js
$.extend({
  customFunc: function () {},
});

// 然后就可以这样调用自定义方法了
$.customFunc();
```

如果传入了两个或更多个对象，所有对象的属性都添加到第一个对象，并返回合并后的对象。不过值为 `undefined` 的属性不会合并。

```js
const object = $.extend({ key1: val1 }, { key2: val2 }, { key3: val3 });

// 此时第一个对象和返回值都是 { key1: val1, key2: val2, key3: val3 }
```

### `$.fn.extend()` {#fn-extend}

在 `$` 的原型链上扩展方法。

```js
$.fn.extend({
  customFunc: function () {},
});

// 然后就可以这样使用扩展的方法了
$(document).customFunc();
```

## URL {#api-url}

### `$.param()` {#d-param}

将数组或对象序列化为 URL 查询字符串。

```js
$.param({ width: 1680, height: 1050 });
// width=1680&height=1050

$.param({ foo: { one: 1, two: 2 } });
// foo[one]=1&foo[two]=2

$.param({ ids: [1, 2, 3] });
// ids[]=1&ids[]=2&ids[]=3
```

如果传入的参数是数组，那么该数组的格式必须与 [`.serializeArray()`](#serializeArray) 返回的格式一致。

```js
$.param([
  { name: 'name', value: 'mdui' },
  { name: 'password', value: '123456' },
]);
// name=mdui&password=123456
```

## 数组和对象操作 {#api-array}

### `$.each()` {#d-each}

遍历数组或对象。它返回的是第一个参数，即被遍历的数组或对象。

回调函数的第一个参数是数组的索引或对象的键，第二个参数是数组或对象对应位置的值。

在回调函数中，`this` 指向数组或对象对应位置的值。如果回调函数返回 `false`，则停止遍历。

```js
// 遍历数组
$.each(['a', 'b', 'c'], function (index, value) {
  console.log(index + ':' + value);
});

// 结果：
// 0:a
// 1:b
// 2:c
```

```js
// 遍历对象
$.each({ name: 'mdui', lang: 'zh' }, function (key, value) {
  console.log(key + ':' + value);
});

// 结果
// name:mdui
// lang:zh
```

### `$.merge()` {#d-merge}

将第二个数组的元素追加到第一个数组中，并返回合并后的数组。

```js
const first = ['a', 'b', 'c'];
const second = ['c', 'd', 'e'];
const result = $.merge(first, second);

console.log(first); // ['a', 'b', 'c', 'c', 'd', 'e']
console.log(result); // ['a', 'b', 'c', 'c', 'd', 'e']
```

### `$.unique()` {#d-unique}

移除数组中的重复元素。

```js
const result = $.unique([1, 2, 12, 3, 2, 1, 2, 1, 1, 1, 1]);
console.log(result); // [1, 2, 12, 3]
```

### `$.map()` {#d-map}

遍历数组或对象，返回一个由回调函数的返回值组成的新数组。

回调函数的第一个参数是数组或对象对应位置的值，第二个参数是数组的索引或对象的键。

回调函数可以返回任何值。如果返回的是数组，那么这个数组会被展开。如果返回的是 `null` 或 `undefined`，那么这个值会被忽略。在回调函数内部，`this` 指向 `window` 对象。

```js
// 遍历数组
const result = $.map(['a', 'b', 'c'], function (value, index) {
  return index + value;
});
console.log(result); // ['0a', '1b', '2c']
```

```js
// 当回调函数返回数组时，数组会被展开
const result = $.map([1, 2, 3], function (value, index) {
  return [value, value + 1];
});
console.log(result); // [1, 2, 2, 3, 3, 4]
```

```js
// 遍历对象
const result = $.map(
  { name: 'mdui', password: '123456' },
  function (value, key) {
    return key + ':' + value;
  },
);
console.log(result); // ['name:mdui', 'password:123456']
```

### `$.contains()` {#d-contains}

判断一个节点是否包含另一个节点。如果父节点包含子节点，返回 `true`；否则，返回 `false`。

```js
$.contains(document, document.body); // true
$.contains(document.body, document); // false
```

## 数据类型判断 {#api-type}

### `.is()` {#is}

判断集合中是否至少有一个元素与参数匹配。如果匹配，返回 `true`；否则，返回 `false`。

参数可以是 CSS 选择器、DOM 元素、DOM 元素数组、JQ 对象，或者回调函数。

如果参数是回调函数，那么函数的第一个参数是索引，第二个参数是当前元素。在函数内部，`this` 指向当前元素。如果函数返回 `true`，表示当前元素与参数匹配；如果返回 `false`，表示当前元素与参数不匹配。

```js
$('.box').is('.box'); // true
$('.box').is('.boxss'); // false
$('.box').is($('.box')[0]); // true
```

```js
// 通过回调函数的返回值做判断
$(document).is(function (index, element) {
  return element === document;
});
// true
```

## 对象访问 {#api-object}

### `.length` {#length}

返回当前集合中元素的数量。

```js
$('body').length; // 1
```

### `.each()` {#each}

遍历当前集合，为集合中的每个元素执行一个函数。如果函数返回 `false`，则停止遍历。

函数的第一个参数是元素的索引位置，第二个参数是当前元素。在函数内部，`this` 指向当前元素。

```js
$('img').each(function (index, element) {
  this.src = 'test' + index + '.jpg';
});
```

### `.map()` {#map}

遍历当前集合，为集合中的每个元素执行一个函数，返回由函数返回值组成的新集合。

函数可以返回单个数据或数据数组。如果返回数组，那么会将数组中的元素依次添加到新集合中。如果函数返回 `null` 或 `undefined`，那么这个值不会被添加到新集合中。

函数的第一个参数是元素的索引位置，第二个参数是当前元素。在函数内部，`this` 指向当前元素。

```js
const result = $('input.checked').map(function (i, element) {
  return element.value;
});

// result 是一个由匹配元素的值组成的 JQ 对象
```

### `.eq()` {#eq}

返回一个新集合，该集合只包含指定索引位置的元素。

```js
$('div').eq(0); // 返回仅包含第一个元素的集合
$('div').eq(-1); // 返回仅包含最后一个元素的集合
$('div').eq(-2); // 返回仅包含倒数第二个元素的集合
```

### `.first()` {#first}

返回一个新集合，该集合只包含当前集合中的第一个元素。

```js
$('div').first(); // 返回仅包含第一个 div 的集合
```

### `.last()` {#last}

返回一个新集合，该集合只包含当前集合中的最后一个元素。

```js
$('div').last(); // 返回仅包含最后一个 div 的集合
```

### `.get()` {#get}

返回指定索引位置的元素。如果没有传入参数，它将返回由集合中所有元素组成的数组。

```js
$('div').get(); // 返回所有 div 元素组成的数组
$('div').get(0); // 返回第一个 div 元素
$('div').get(-1); // 返回最后一个 div 元素
```

### `.index()` {#index}

如果没有传入参数，它将返回当前集合中第一个元素相对于其同辈元素的索引值。

如果传入一个 CSS 选择器，它将返回当前集合中第一个元素相对于 CSS 选择器匹配元素的索引值。

如果传入一个 DOM 元素，它将返回该元素在当前集合中的索引值。

如果传入一个 JQ 对象，它将返回对象中第一个元素在当前集合中的索引值。

```html
<div id="child">
  <div id="child1"></div>
  <div id="child2"></div>
  <div id="child3"></div>
  <div id="child4"></div>
</div>
```

```js
$('#child3').index(); // 2
$('#child3').index('#child div'); // 2
$('#child div').index($('#child3').get(0)); // 2
```

### `.slice()` {#slice}

返回当前集合的子集。

你可以通过传入两个参数来指定子集的起始和结束位置（不包含结束位置的元素）。如果没有传入第二个参数，它将返回从起始位置到集合末尾的所有元素。

```js
// 返回集合中第三个（包含第三个）之后的所有元素
$('div').slice(3);

// 返回集合中第三个到第五个（包含第三个，不包含第五个）之间的元素
$('div').slice(3, 5);
```

### `.filter()` {#filter}

从当前集合中筛选出与指定表达式匹配的元素。参数可以是 CSS 选择器、DOM 元素、DOM 元素数组或回调函数。

如果参数是回调函数，该函数的第一个参数是元素的索引位置，第二个参数是当前元素。在函数内部，`this` 指向当前元素。如果函数返回 `true`，当前元素会被保留；如果返回 `false`，当前元素会被移除。

```js
// 筛选出所有含 .box 的 div 元素
$('div').filter('.box');

// 筛选出所有已选中选项
$('#select option').filter(function (index, element) {
  return element.selected;
});
```

### `.not()` {#not}

从当前集合中筛选出与指定表达式不匹配的元素。

参数可以是 CSS 选择器、DOM 元素、DOM 元素数组、JQ 对象，或返回 `boolean` 值的回调函数。

如果参数是回调函数，该函数的第一个参数是元素的索引位置，第二个参数是当前元素。在函数内部，`this` 指向当前元素。如果函数返回 `true`，当前元素会被移除；如果返回 `false`，当前元素会被保留。

```js
// 筛选出所有不含 .box 类的 div 元素
$('div').not('.box');

// 筛选出所有未选中选项
$('#select option').not(function (index, element) {
  return element.selected;
});
```

## CSS 类 {#api-css}

### `.hasClass()` {#hasClass}

判断集合中的第一个元素是否含有指定的 CSS 类。

```js
// 判断第一个 div 元素是否含有 .item
$('div').hasClass('item');
```

### `.addClass()` {#addClass}

为集合中的每个元素添加 CSS 类，多个类名之间可以用空格分隔。

参数可以是字符串，也可以是一个返回 CSS 类名的回调函数。如果参数是回调函数，该函数的第一个参数是元素的索引位置，第二个参数是该元素上原有的 CSS 类名。在函数内部，`this` 指向当前元素。

```js
// 为所有 div 元素添加 .item
$('div').addClass('item');

// 为所有 div 元素添加 .item1 和 .item2
$('div').addClass('item1 item2');

// 为所有 div 元素添加由回调函数返回的 CSS 类
$('div').addClass(function (index, currentClassName) {
  return currentClassName + '-' + index;
});
```

### `.removeClass()` {#removeClass}

移除集合中每个元素上的指定 CSS 类，多个类名之间可以用空格分隔。

参数可以是字符串，也可以是一个返回 CSS 类名的回调函数。如果参数是回调函数，该函数的第一个参数是元素的索引位置，第二个参数是该元素上原有的 CSS 类名。在函数内部，`this` 指向当前元素。

如果没有传入参数，该方法将直接移除元素上的 `class` 属性。

```js
// 移除所有 div 元素上的 .item
$('div').removeClass('item');

// 移除所有 div 元素上的 .item1 和 .item2
$('div').removeClass('item1 item2');

// 移除所有 div 元素上的由回调函数返回的 CSS 类
$('div').removeClass(function (index, currentClassName) {
  return 'item';
});
```

### `.toggleClass()` {#toggleClass}

如果元素上有指定的 CSS 类，则删除它；如果没有，则添加它。多个类名之间可以用空格分隔。

参数可以是字符串，也可以是一个返回 CSS 类名的回调函数。如果参数是回调函数，该函数的第一个参数是元素的索引位置，第二个参数是该元素上原有的 CSS 类名。在函数内部，`this` 指向当前元素。

```js
// 切换所有 div 元素上的 .item 类
$('div').toggleClass('item');

// 切换所有 div 元素上的 .item1 和 .item2 类
$('div').toggleClass('item1 item2');

// 切换所有 div 元素上的由回调函数返回的 CSS 类
$('div').toggleClass(function (index, currentClassName) {
  return 'item';
});
```

## 节点属性 {#api-attr}

### `.prop()` {#prop}

获取集合中第一个元素的 JavaScript 属性值。

```js
// 获取第一个元素 checked 属性值
$('input').prop('checked');
```

如果传入了两个参数，该方法将设置集合中所有元素的指定 JavaScript 属性值。

属性值可以是任意类型的值，或回调函数的返回值。回调函数的第一个参数为元素的索引位置，第二个参数为该元素上原有的属性值，函数内的 `this` 指向当前元素。
属性值可以是任意类型的值，也可以是一个返回属性值的回调函数。如果参数是回调函数，该函数的第一个参数是元素的索引位置，第二个参数是该元素上原有的属性值。在函数内部，`this` 指向当前元素。

如果属性值或回调函数的返回值为 `undefined`，该方法将不会修改元素的原有属性。

```js
// 设置所有选中元素的 checked 属性值为 true
$('input').prop('checked', true);

// 通过回调函数的返回值设置属性值
$('input').prop('checked', function (index, oldPropValue) {
  return true;
});
```

也可以通过传入一个对象来同时设置多个属性。

```js
// 同时设置元素的多个属性值
$('input').prop({
  checked: false,
  disabled: function (index, oldPropValue) {
    return true;
  },
});
```

### `.removeProp()` {#removeProp}

删除集合中所有元素上指定的 JavaScript 属性值。

```js
$('input').removeProp('disabled');
```

### `.attr()` {#attr}

获取集合中第一个元素的 HTML 属性值。

```js
// 获取第一个元素的属性值
$('div').attr('username');
```

如果传入两个参数，该方法将设置集合中所有元素的指定 HTML 属性值。

属性值可以是字符串或数值，也可以是一个返回属性值的回调函数。如果参数是回调函数，该函数的第一个参数是元素的索引位置，第二个参数是该元素上原有的属性值。在函数内部，`this` 指向当前元素。

如果属性值或回调函数的返回值为 `null`，该方法将删除指定属性；如果为 `undefined`，则不会修改元素的原有属性。

```js
// 设置所有选中元素的属性值
$('div').attr('username', 'mdui');

// 通过回调函数的返回值设置属性值
$('div').attr('username', function (index, oldAttrValue) {
  return 'mdui';
});
```

也可以通过传入一个对象来同时设置多个属性。

```js
// 同时设置元素的多个属性值
$('div').attr({
  username: 'mdui',
  lastname: function (index, oldAttrValue) {
    return 'test';
  },
});
```

### `.removeAttr()` {#removeAttr}

删除集合中所有元素上指定的 HTML 属性，多个属性名之间可以用空格分隔。

```js
// 删除集合中所有元素上的一个属性
$('div').removeAttr('username');

// 删除集合中所有元素上的多个属性
$('div').removeAttr('username lastname');
```

### `.val()` {#val}

返回集合中第一个元素的值。

如果元素是 `<select multiple="multiple">`，则返回一个包含所有选中项的数组。

```js
// 获取选中的第一个元素的值
$('#input').val();
```

如果传入参数，该方法将设置集合中所有元素的值。

值可以是字符串、数值、字符串数组，或一个返回值的回调函数。如果参数是回调函数，该函数的第一个参数是元素的索引位置，第二个参数是元素的原有值。在函数内部，`this` 指向当前元素。

如果元素是 `<input type="checkbox">`、`<input type="radio">`、`<option>`，则值或回调函数的返回值可以是数组，此时将选中数组中的值，并取消不在数组中的值。

如果值或回调函数的返回值为 `undefined`，则将元素值设为空。

```js
// 设置选中元素的值
$('#input').val('mdui');

// 通过回调函数的返回值设置元素值
$('#input').val(function (index, oldValue) {
  return 'mdui';
});
```

### `.text()` {#text}

返回集合中所有元素（包含它们的后代元素）的文本内容。

```js
// 获取所有 .box 元素的文本
$('.box').text();
```

如果传入参数，该方法将设置集合中所有元素的文本内容。

值可以是字符串、数值、布尔值，或一个返回文本内容的回调函数。如果参数是回调函数，该函数的第一个参数是元素的索引位置，第二个参数是元素的原有文本内容。在函数内部，`this` 指向当前元素。

如果值或回调函数的返回值为 `undefined`，则不修改元素的文本内容。

```js
// 设置选中元素的文本内容
$('.box').text('text content');

// 通过回调函数的返回值设置元素的文本内容
$('.box').text(function (index, oldTextContent) {
  return 'new text content';
});
```

### `.html()` {#html}

返回集合中第一个元素的 HTML 内容。

```js
// 获取第一个 .box 元素的 HTML 内容
$('.box').html();
```

如果传入参数，该方法将设置集合中所有元素的 HTML 内容。

值可以是 HTML 字符串、DOM 元素，或一个返回 HTML 字符串或 DOM 元素的回调函数。如果参数是回调函数，该函数的第一个参数是元素的索引位置，第二个参数是元素的原有 HTML 内容。在函数内部，`this` 指向当前元素。

如果值或回调函数的返回值为 `undefined`，则不修改元素的 HTML 内容。

```js
// 设置选中元素的 HTML
$('.box').html('<div>new html content</div>');

// 通过回调函数的返回值设置元素的 HTML 内容
$('.box').html(function (index, oldHTMLContent) {
  return '<div>new html content</div>';
});
```

## 数据存储 {#api-data}

### `$.data()` {#d-data}

在指定元素上读取或存储数据。

存储数据时，如果值为 `undefined`，则相当于读取元素上对应的数据。即 `$.data(element, 'key', undefined)` 和 `$.data(element, 'key')` 等效。

注意：该方法不会检索元素上的 `data-*` 属性。

```js
// 在指定元素上存储数据，返回存储的值
$.data(document.body, 'layout', 'dark'); // 返回 dark

// 在指定元素上同时存储多个数据
$.data(document.body, {
  primary: 'indigo',
  accent: 'pink',
}); // 返回 { primary: 'indigo', accent: 'pink' }

// 获取在指定元素上存储的数据
$.data(document.body, 'layout'); // 返回 dark

// 获取在指定元素上存储的所有数据
$.data(document.body); // 返回 { layout: 'dark', primary: 'indigo', accent: 'pink' }
```

### `$.removeData()` {#d-removeData}

移除指定元素上存储的数据。

可以指定多个键名，用空格分隔，或者用数组表示。如果不指定键名，将移除元素上的所有数据。

```js
// 移除元素上键名为 name 的数据
$.removeData(document.body, 'name');

// 移除元素上键名为 name1 和 name2 的数据。下面两种方法等效：
$.removeData(document.body, 'name1 name2');
$.removeData(document.body, ['name1', 'name2']);

// 移除元素上存储的所有数据
$.removeData(document.body);
```

### `.data()` {#data}

在当前集合的元素上读取或存储数据。

如果存储的值为 `undefined`，则不进行存储。

注意：该方法检索的数据会包含元素上的 `data-*` 属性。

```js
// 在当前集合中的元素上存储数据
$('.box').data('layout', 'dark');

// 在当前集合中的元素上同时存储多个数据
$('.box').data({
  primary: 'indigo',
  accent: 'pink',
});

// 获取当前集合中第一个元素上存储的指定数据
$('.box').data('layout'); // 返回 dark

// 获取在当前集合中第一个元素上存储的所有数据
$('.box').data(); // 返回 { layout: 'dark', primary: 'indigo', accent: 'pink' }
```

### `.removeData()` {#removeData}

移除当前集合的元素上存储的数据。

可以指定多个键名，用空格分隔，或者用数组表示。如果不指定键名，将移除元素上的所有数据。

注意：该方法只会移除通过 `.data()` 方法设置的数据，不会移除 `data-*` 属性上的数据。

```js
// 移除键名为 name 的数据
$('.box').removeData('name');

// 移除键名为 name1 和 name2 的数据。下面两种方法等效：
$('.box').removeData('name1 name2');
$('.box').removeData(['name1', 'name2']);

// 移除元素上存储的所有数据
$('.box').removeData();
```

## 样式 {#api-style}

### `.css()` {#css}

获取集合中第一个元素的 CSS 属性值。

```js
$('.box').css('color');
```

如果传入参数，该方法将设置集合中所有元素的 CSS 属性值。

属性值可以是字符串、数值，或一个返回字符串或数值的回调函数。如果参数是回调函数，该函数的第一个参数是元素的索引位置，第二个参数是元素的原有 CSS 属性值。在函数内部，`this` 指向当前元素。

如果值或回调函数的返回值为 `undefined`，则不修改元素的 CSS 属性值。如果值为 `null`，则移除元素的对应 CSS 属性。如果值为数值，将自动添加 `px` 作为单位，若该属性无法使用 `px` 作为单位，则会直接把值转为字符串。

```js
// 设置集合中所有元素的样式值
$('.box').css('color', 'red');

// 通过回调函数的返回值设置所有元素的样式值
$('.box').css('color', function (index, oldCSSValue) {
  return 'green';
});

// 通过传入一个对象同时设置多个样式
$('.box').css({
  'background-color': 'white',
  color: function (index, oldCSSValue) {
    return 'blue';
  },
});
```

### `.width()` {#width}

获取集合中第一个元素的宽度（不包含 `padding`, `border`, `margin`）。

```js
$('.box').width();
```

如果传入参数，该方法将设置集合中所有元素的宽度。

值可以是带单位的字符串、数值，或一个返回带单位的字符串或数值的回调函数。如果参数是回调函数，该函数的第一个参数是元素的索引位置，第二个参数是元素的原有宽度。在函数内部，`this` 指向当前元素。

如果值或回调函数的返回值为 `null` 或 `undefined`，则不修改元素的宽度。如果值为数值，将自动添加 `px` 作为单位。

```js
// 设置集合中所有元素的宽度
$('.box').width('20%');

// 值为数值时，默认单位为 px
$('.box').width(10);

// 通过回调函数的返回值设置宽度
$('.box').width(function (index, oldWidth) {
  return 10;
});
```

### `.height()` {#height}

获取集合中第一个元素的高度（不包含 `padding`, `border`, `margin`）。

```js
$('.box').height();
```

如果传入参数，该方法将设置集合中所有元素的高度。

值可以是带单位的字符串、数值，或一个返回带单位的字符串或数值的回调函数。如果参数是回调函数，该函数的第一个参数是元素的索引位置，第二个参数是元素的原有高度。在函数内部，`this` 指向当前元素。

如果值或回调函数的返回值为 `null` 或 `undefined`，则不修改元素的高度。如果值为数值，将自动添加 `px` 作为单位。

```js
// 设置集合中所有元素的高度
$('.box').height('20%');

// 值为数值时，默认单位为 px
$('.box').height(10);

// 通过回调函数的返回值设置高度
$('.box').height(function (index, oldWidth) {
  return 10;
});
```

### `.innerWidth()` {#innerWidth}

获取集合中第一个元素的宽度（包含 `padding`，不包含 `border`, `margin`）。

```js
$('.box').innerWidth();
```

如果传入参数，该方法将设置集合中所有元素的宽度。

值可以是带单位的字符串、数值，或一个返回带单位的字符串或数值的回调函数。如果参数是回调函数，该函数的第一个参数是元素的索引位置，第二个参数是元素的原有宽度。在函数内部，`this` 指向当前元素。

如果值或回调函数的返回值为 `null` 或 `undefined`，则不修改元素的宽度。如果值为数值，将自动添加 `px` 作为单位。

```js
// 设置集合中所有元素的宽度
$('.box').innerWidth('20%');

// 值为数值时，默认单位为 px
$('.box').innerWidth(10);

// 通过回调函数的返回值设置宽度
$('.box').innerWidth(function (index, oldWidth) {
  return 10;
});
```

### `.innerHeight()` {#innerHeight}

获取集合中第一个元素的高度（包含 `padding`，不包含 `border`, `margin`）。

```js
$('.box').innerHeight();
```

如果传入参数，该方法将设置集合中所有元素的高度。

值可以是带单位的字符串、数值，或一个返回带单位的字符串或数值的回调函数。如果参数是回调函数，该函数的第一个参数是元素的索引位置，第二个参数是元素的原有高度。在函数内部，`this` 指向当前元素。

如果值或回调函数的返回值为 `null` 或 `undefined`，则不修改元素的高度。如果值为数值，将自动添加 `px` 作为单位。

```js
// 设置集合中所有元素的高度
$('.box').innerHeight('20%');

// 值为数值时，默认单位为 px
$('.box').innerHeight(10);

// 通过回调函数的返回值设置高度
$('.box').innerHeight(function (index, oldHeight) {
  return 10;
});
```

### `.outerWidth()` {#outerWidth}

获取集合中第一个元素的宽度（包含 `padding`、`border`，不包含 `margin`。可以传入参数 `true`，使宽度包含 `margin`）。

```js
// 包含 padding、border 的宽度
$('.box').outerWidth();

// 包含 padding、border、margin 的宽度
$('.box').outerWidth(true);
```

也可以使用该方法设置集合中所有元素的宽度（包含 `padding`、`border`，不包含 `margin`。可以在第二个参数中传入 `true`，使宽度包含 `margin`）。

第一个参数可以是带单位的字符串、数值、或一个返回带单位的字符串或数值的回调函数。如果参数是回调函数，该函数的第一个参数是元素的索引位置，第二个参数是元素的原有宽度。在函数内部，`this` 指向当前元素。

如果值或回调函数的返回值为 `null` 或 `undefined`，则不修改元素的宽度。如果值为数值，将自动添加 `px` 作为单位。

```js
// 设置集合中所有元素的宽度
$('.box').outerWidth('20%');

// 值为数值时，默认单位为 px
$('.box').outerWidth(10);

// 第二个参数为 true，则宽度将包含 margin
$('.box').outerWidth(10, true);

// 通过回调函数的返回值设置宽度
$('.box').outerWidth(function (index, oldWidth) {
  return 10;
});
```

### `.outerHeight()` {#outerHeight}

获取集合中第一个元素的高度（包含 `padding`、`border`，不包含 `margin`。可以传入参数 `true`，使高度包含 `margin`）。

```js
// 包含 padding、border 的高度
$('.box').outerHeight();

// 包含 padding、border、margin 的高度
$('.box').outerHeight(true);
```

也可以用该方法设置集合中所有元素的高度（包含 `padding`、`border`，不包含 `margin`。可以在第二个参数中传入 `true`，使高度包含 `margin`）。

第一个参数可以是带单位的字符串、数值、或一个返回带单位的字符串或数值的回调函数。如果参数是回调函数，该函数的第一个参数是元素的索引位置，第二个参数是元素的原有高度。在函数内部，`this` 指向当前元素。

如果值或回调函数的返回值为 `null` 或 `undefined`，则不修改元素的高度。如果值为数值，将自动添加 `px` 作为单位。

```js
// 设置集合中所有元素的高度
$('.box').outerHeight('20%');

// 值为数值时，默认单位为 px
$('.box').outerHeight(10);

// 第二个参数为 true，则高度将包含 margin
$('.box').outerHeight(10, true);

// 通过回调函数的返回值设置高度
$('.box').outerHeight(function (index, oldWidth) {
  return 10;
});
```

### `.hide()` {#hide}

隐藏集合中的所有元素。

```js
$('.box').hide();
```

### `.show()` {#show}

显示集合中的所有元素。

```js
$('.box').show();
```

### `.toggle()` {#toggle}

切换集合中所有元素的显示状态。

```js
$('.box').toggle();
```

### `.offset()` {#offset}

获取当前集合中第一个元素相对于 `document` 的坐标。

```js
$('.box').offset(); // { top: 20, left: 30 }
```

如果传入参数，该方法将设置集合中所有元素相对于 `document` 的坐标。

参数可以是一个包含 `top` 和 `left` 属性的对象，或一个返回此格式对象的回调函数。如果参数是回调函数，该函数的第一个参数是元素的索引位置，第二个参数是元素的原有坐标。在函数内部，`this` 指向当前元素。

如果参数中 `top` 或 `left` 的值为 `undefined`，则不修改对应的值。

```js
// 设置集合中所有元素的坐标
$('.box').offset({ top: 20, left: 30 });

// 通过回调函数的返回值设置元素的坐标
$('.box').offset(function (index, oldOffset) {
  return { top: 20, left: 30 };
});
```

### `.offsetParent()` {#offsetParent}

获取集合中第一个元素的定位父元素。即父元素中第一个 `position` 属性为 `relative` 或 `absolute` 的元素。

```js
$('.box').offsetParent();
```

### `.position()` {#position}

获取集合中第一个元素相对于其定位父元素的偏移。

```js
$('.box').position(); // { top: 20, left: 30 }
```

## 查找节点 {#api-selector}

### `.find()` {#find}

在当前集合中，根据 CSS 选择器找到指定的后代节点集合。

```js
// 找到 #box 的后代节点中，包含 .box 的节点集合
$('#box').find('.box');
```

### `.children()` {#children}

在当前集合中，获取直接子元素组成的集合。可以传入一个 CSS 选择器作为参数，对子元素进行过滤。

```js
// 找到 #box 的所有直接子元素
$('#box').children();

// 找到 #box 的所有直接子元素中，包含 .box 的元素
$('#box').children('.box');
```

### `.has()` {#has}

在当前集合中，筛选出含有指定子元素的元素。参数可以是 CSS 选择器或 DOM 元素。

```js
// 给含有 ul 的 li 加上背景色
$('li').has('ul').css('background-color', 'red');
```

### `.parent()` {#parent}

获取当前集合中，所有元素的直接父元素的集合。可以传入一个 CSS 选择器作为参数，仅返回与该参数匹配的父元素的集合。

```js
// 返回 .box 元素的直接父元素
$('.box').parent();

// 返回 .box 元素的直接父元素中含有 .parent 类的元素
$('.box').parent('.parent');
```

### `.parents()` {#parents}

获取当前集合中，所有元素的祖先元素的集合。可以传入一个 CSS 选择器作为参数，仅返回与该参数匹配的祖先元素的集合。

```js
// 返回 span 元素的所有祖先元素
$('span').parents();

// 返回 span 元素的所有是 p 元素的祖先元素
$('span').parents('p');
```

### `.parentsUntil()` {#parentsUntil}

获取当前集合中，每个元素的所有父辈元素，直到遇到和第一个参数匹配的元素为止（不包含匹配元素）。

第一个参数可以是 CSS 选择器、DOM 元素、JQ 对象。

可以传入第二个参数，必须是 CSS 选择器，表示仅返回和该参数匹配的元素。

若没有指定参数，则所有的祖先元素都将被匹配，即和 `.parents()` 效果一样。

```js
// 获取 .item 元素的所有祖先元素
$('.item').parentsUntil();

// 查找 .item 元素的所有父辈元素，直到遇到 .parent 元素为止
$('.item').parentsUntil('.parent');

// 获取 .item 元素的所有是 div 元素的祖先元素，直到遇到 .parent 元素为止
$('.item').parentsUntil('.parent', 'div');
```

### `.prev()` {#prev}

获取当前集合中，每个元素的前一个同级元素组成的集合。可以传入一个 CSS 选择器作为参数，仅返回与该参数匹配的同级元素的集合。

```js
// 获取 .box 元素的前一个同级元素的集合
$('.box').prev();

// 获取 .box 元素的前一个是 div 的同级元素的集合
$('.box').prev('div');
```

### `.prevAll()` {#prevAll}

获取当前集合中，每个元素前面的所有同级元素组成的集合。可以传入一个 CSS 选择器作为参数，仅返回与该参数匹配的同级元素的集合。

```js
// 获取 .box 元素前面的所有同级元素
$('.box').prevAll();

// 获取 .box 元素前面的所有含 .selected 的同级元素
$('.box').prevAll('.selected');
```

### `.prevUntil()` {#prevUntil}

获取当前集合中，每个元素前面的所有同级元素，直到遇到与第一个参数匹配的元素为止（不包含匹配元素）。

第一个参数可以是 CSS 选择器、DOM 元素、JQ 对象。可以传入第二个参数，必须是 CSS 选择器，表示仅返回和该参数匹配的元素。

若没有指定参数，则返回前面的所有同级元素，即与 `.prevAll()` 方法的效果相同。

```js
// 获取 .box 元素前面的所有同级元素
$('.box').prevUntil();

// 获取 .box 元素前面的所有同级元素，直到遇到 .until 元素为止
$('.box').prevUntil('.until');

// 获取 .box 元素前面的所有是 div 的同级元素，直到遇到 .until 元素为止
$('.box').prevUntil('.until', 'div');
```

### `.next()` {#next}

获取当前集合中，每个元素的后一个同级元素组成的集合。可以传入一个 CSS 选择器作为参数，仅返回与该参数匹配的同级元素的集合。

```js
// 获取 .box 元素的后一个同级元素的集合
$('.box').next();

// 获取 .box 元素的后一个是 div 的同级元素的集合
$('.box').next('div');
```

### `.nextAll()` {#nextAll}

获取当前集合中，每个元素后面的所有同级元素组成的集合。可以传入一个 CSS 选择器作为参数，仅返回与该参数匹配的同级元素的集合。

```js
// 获取 .box 元素后面的所有同级元素
$('.box').nextAll();

// 获取 .box 元素后面的所有含 .selected 的同级元素
$('.box').nextAll('.selected');
```

### `.nextUntil()` {#nextUntil}

获取当前集合中，每个元素后面的所有同级元素，直到遇到与第一个参数匹配的元素为止（不包含匹配元素）。

第一个参数可以是 CSS 选择器、DOM 元素、JQ 对象。可以传入第二个参数，必须是 CSS 选择器，表示仅返回与该参数匹配的元素。

若没有指定参数，则返回后面的所有同级元素，即与 `.nextAll()` 方法的效果相同。

```js
// 获取 .box 元素后面所有的同级元素
$('.box').nextUntil();

// 获取 .box 元素后所有的同级元素，直到遇到 .until 元素为止
$('.box').nextUntil('.until');

// 获取 .box 元素后面同级的 div 元素，直到遇到 .until 元素为止
$('.box').nextUntil('.until', 'div');
```

### `.closest()` {#closest}

从当前元素开始向上逐级查找，返回最先匹配到的元素。参数可以是 CSS 选择器、DOM 元素、JQ 对象。

```js
// 获取 .box 元素的父元素中最近的 .parent 元素
$('.box').closest('.parent');
```

### `.siblings()` {#siblings}

获取当前集合中，每个元素的所有同级元素。可以传入一个 CSS 选择器作为参数，仅返回与该参数匹配的同级元素的集合。

```js
// 获取 .box 元素的所有同级元素
$('.box').siblings();

// 获取 .box 元素的所有同级元素中含 .selected 的元素
$('.box').siblings('.selected');
```

### `.add()` {#add}

将元素添加到当前集合中。参数可以是 HTML 字符串、CSS 选择器、JQ 对象、DOM 元素、DOM 元素数组、NodeList。

```js
// 把含 .selected 的元素添加到当前集合中
$('.box').add('.selected');
```

## 节点操作 {#api-dom}

### `.empty()` {#empty}

移除当前元素中所有的子元素。

```js
$('.box').empty();
```

### `.remove()` {#remove}

从 DOM 中移除当前集合中的元素。可以传入一个 CSS 选择器作为参数，仅移除与该参数匹配的元素。

```js
// 移除所有 p 元素
$('p').remove();

// 移除所有含 .box 的 p 元素
$('p').remove('.box');
```

### `.prepend()` {#prepend}

在当前集合中的元素内部的前面插入指定内容。参数可以是 HTML 字符串、DOM 元素、DOM 元素数组、JQ 对象。支持传入多个参数。

也可以传入一个返回 HTML 字符串、DOM 元素、DOM 元素数组、JQ 对象的回调函数。函数的第一个参数是当前元素的索引位置，第二个参数是元素的原始 HTML，函数中的 `this` 指向当前元素。

该方法返回原始集合。

```js
// 插入一个元素
$('<p>I would like to say: </p>').prepend('<b>Hello</b>');
// 结果：<p><b>Hello</b>I would like to say: </p>

// 插入多个元素
$('<p>I would like to say: </p>').prepend('<b>Hello</b>', '<b>World</b>');
// 结果：<p><b>Hello</b><b>World</b>I would like to say: </p>

// 通过回调函数插入一个元素
$('<p>Hello</p>').append(function (index, oldHTML) {
  return '<b>' + oldHTML + index + '</b>';
});
// 结果：<p><b>Hello0</b>Hello</p>
```

### `.prependTo()` {#prependTo}

将当前集合中的元素追加到指定元素内部的前面。参数可以是 CSS 选择器、HTML 字符串、DOM 元素、DOM 元素数组、JQ 对象。

该方法返回原始集合。

```js
$('<p>Hello</p>').prependTo('<p>I would like to say: </p>');
// 结果：[ <p><p>Hello</p>I would like to say: </p> ]
```

### `.append()` {#append}

在当前元素内部的后面插入指定内容。参数可以是 HTML 字符串、DOM 元素、DOM 元素数组、JQ 对象。支持传入多个参数。

也可以传入一个返回 HTML 字符串、DOM 元素、DOM 元素数组、JQ 对象的回调函数，函数的第一个参数是当前元素的索引位置，第二个参数是元素的原始 HTML，函数中的 `this` 指向当前元素。

该方法返回原始集合。

```js
// 插入一个元素
$('<p>I would like to say: </p>').append('<b>Hello</b>');
// 结果：<p>I would like to say: <b>Hello</b></p>

// 插入多个元素
$('<p>I would like to say: </p>').append('<b>Hello</b>', '<b>World</b>');
// 结果：<p>I would like to say: <b>Hello</b><b>World</b></p>

// 通过回调函数插入一个元素
$('<p>Hello</p>').append(function (index, oldHTML) {
  return '<b>' + oldHTML + index + '</b>';
});
// 结果：<p>Hello<b>Hello0</b></p>
```

### `.appendTo()` {#appendTo}

将当前集合中的元素追加到指定元素内部的后面。参数可以是 CSS 选择器、HTML 字符串、DOM 元素、DOM 元素数组、JQ 对象。

该方法返回原始集合。

```js
$('<p>Hello</p>').appendTo('<p>I would like to say: </p>');
// 结果：<p>I would like to say: <p>Hello</p></p>
```

### `.after()` {#after}

在当前集合的元素后面插入指定内容，作为其同级元素。参数可以是 HTML 字符串、DOM 元素、DOM 元素数组、JQ 对象。支持传入多个参数。

也可以传入一个返回 HTML 字符串、DOM 元素、DOM 元素数组、JQ 对象的回调函数，函数的第一个参数是当前元素的索引位置，第二个参数是元素的原始 HTML，函数中的 `this` 指向当前元素。

该方法返回原始集合。

```js
// 插入一个元素
$('<p>I would like to say: </p>').after('<b>Hello</b>');
// 结果：<p>I would like to say: </p><b>Hello</b>

// 插入多个元素
$('<p>I would like to say: </p>').after('<b>Hello</b>', '<b>World</b>');
// 结果：<p>I would like to say: </p><b>Hello</b><b>World</b>

// 通过回调函数插入一个元素
$('<p>Hello</p>').after(function (index, oldHTML) {
  return '<b>' + oldHTML + index + '</b>';
});
// 结果：<p>Hello</p><b>Hello0</b>
```

### `.insertAfter()` {#insertAfter}

将当前集合中的元素插入到目标元素的后面，作为其同级元素。

如果当前集合中的元素是页面中已有的元素，则将移动该元素，而不是复制。如果有多个目标，则将克隆当前集合中的元素，并添加到每个目标元素的后面。

可以传入一个 HTML 字符串、CSS 选择器、DOM 元素、DOM 元素数组、JQ 对象作为参数，来指定目标元素。

```js
$('<b>Hello</b>').insertAfter('<p>I would like to say: </p>');
// 结果：<p>I would like to say: </p><b>Hello</b>
```

### `.before()` {#before}

在当前集合的元素前面插入指定内容，作为其同级元素。参数可以是 HTML 字符串、DOM 元素、DOM 元素数组、JQ 对象。支持传入多个参数。

也可以传入一个返回 HTML 字符串、DOM 元素、DOM 元素数组、JQ 对象的回调函数，函数的第一个参数是当前元素的索引位置，第二个参数是元素的原始 HTML，函数中的 `this` 指向当前元素。

该方法返回原始集合。

```js
// 插入一个元素
$('<p>I would like to say: </p>').before('<b>Hello</b>');
// 结果：<b>Hello</b><p>I would like to say: </p>

// 插入多个元素
$('<p>I would like to say: </p>').before('<b>Hello</b>', '<b>World</b>');
// 结果：<b>Hello</b><b>World</b><p>I would like to say: </p>

// 通过回调函数插入一个元素
$('<p>Hello</p>').before(function (index, oldHTML) {
  return '<b>' + oldHTML + index + '</b>';
});
// 结果：<b>Hello0</b><p>Hello</p>
```

### `.insertBefore()` {#insertBefore}

将当前集合中的元素插入到目标元素的前面，作为其同级元素。

如果当前集合中的元素是页面中已有的元素，则将移动该元素，而不是复制。如果有多个目标，则将克隆当前集合中的元素，并添加到每个目标元素的前面。

可以传入一个 HTML 字符串、CSS 选择器、DOM 元素、DOM 元素数组、JQ 对象作为参数，来指定目标元素。

```js
$('<p>I would like to say: </p>').insertBefore('<b>Hello</b>');
// 结果：<p>I would like to say: </p><b>Hello</b>
```

### `.replaceWith()` {#replaceWith}

用指定元素来替换当前集合中的元素。

参数可以是 HTML 字符串、DOM 元素、DOM 元素数组、JQ 对象。

也可以传入一个返回 HTML 字符串、DOM 元素、DOM元素数组、JQ 对象的回调函数，函数的第一个参数是当前元素的索引位置，第二个参数是元素的原始 HTML，函数中的 `this` 指向当前元素。

该方法返回被替换掉的原始集合。

```js
// 用 <p>Hello</p> 替换所有的 .box 元素
$('.box').replaceWith('<p>Hello</p>');

// 用回调函数的返回值替换所有 .box 元素
$('.box').replaceWith(function (index, oldHTML) {
  return oldHTML + index;
});
```

### `.replaceAll()` {#replaceAll}

用当前集合中的元素替换指定元素。

参数为被替换的元素，可以是 CSS 选择器、DOM 元素、DOM 元素数组、JQ 对象。

该方法返回原始集合，即用于替换的元素的集合。

```js
// 用 .new 元素替换所有 .box 元素
$('.new').replaceAll('.box');
```

### `.clone()` {#clone}

通过深度克隆来复制集合中的所有元素。

该方法使用原生 `cloneNode` 方法进行深度克隆，但不会复制数据和事件处理程序到新的元素。这点和 jQuery 中利用一个参数来确定是否复制数据和事件处理不相同。

```js
$('body').append($('#box').clone());
```

## 表单 {#api-form}

### `.serializeArray()` {#serializeArray}

将表单元素的值组合成由 `name` 和 `value` 的键值对组成的数组。

该方法可以对单独的表单元素进行操作，也可以对整个 `<form>` 表单进行操作。

```js
$('form').serializeArray();
// [
//   { "name": "golang", "value":"456" },
//   { "name": "name", "value": "mdui" },
//   { "name": "password", "value": "" }
// ]
```

### `.serializeObject()` {#serializeObject}

将表单元素的值转换为对象。

如果存在相同的键名，那么对应的值会被转换为数组。

该方法可以对单独的表单元素进行操作，也可以对整个 `<form>` 表单进行操作。

```js
$('form').serializeObject();
// { name: mdui, password: 123456 }
```

### `.serialize()` {#serialize}

将表单元素的值编译为 URL 编码的字符串。

```js
$('form').serialize();
// golang=456&name=mdui&password=
```

## 事件 {#api-event}

### `.on()` {#on}

为集合中每个元素的特定事件绑定事件处理函数。具体用法见下方示例：

```js
// 绑定点击事件
$('.box').on('click', function (e) {
  console.log('点击了 .box 元素');
});

// 绑定多个事件
$('.box').on('click focus', function (e) {
  console.log('click 和 focus 事件都会触发该函数');
});

// 事件委托
$(document).on('click', '.box', function (e) {
  console.log('点击 .box 时会触发该函数');
});

// 同时绑定多个事件和事件处理函数
$('.box').on({
  click: function (e) {
    console.log('触发了 click 事件');
  },
  focus: function (e) {
    console.log('触发了 focus 事件');
  },
});

// 传入参数
$('.box').on('click', { key1: 'value1', key2: 'value2' }, function (e) {
  console.log('点击了 .box 元素，并为事件处理函数传入了参数');
  // e._data 为 {key1: 'value1', key2: 'value2'}
});

// 同时绑定多个事件和事件处理函数，并传入参数
$('.box').on(
  {
    click: function (e) {
      console.log('触发了 click 事件');
      // e._data 为 {key1: 'value1', key2: 'value2'}
    },
    focus: function (e) {
      console.log('触发了 focus 事件');
      // e._data 为 {key1: 'value1', key2: 'value2'}
    },
  },
  { key1: 'value1', key2: 'value2' },
);

// 通过事件委托绑定事件，并传入参数
$(document).on(
  'click',
  '.box',
  { key1: 'value1', keys: 'value2' },
  function (e) {
    console.log('点击了 .box 元素，并为事件处理函数传入了参数');
    // e._data 为 {key1: 'value1', key2: 'value2'}
  },
);

// 通过事件委托同时绑定多个事件和事件处理函数
$(document).on(
  {
    click: function (e) {
      console.log('触发了 click 事件');
    },
    focus: function (e) {
      console.log('触发了 focus 事件');
    },
  },
  '.box',
);

// 通过事件委托同时绑定多个事件和事件处理函数，并传入参数
$(document).on(
  {
    click: function (e) {
      console.log('触发了 click 事件');
      // e._data 为 {key1: 'value1', key2: 'value2'}
    },
    focus: function (e) {
      console.log('触发了 focus 事件');
      // e._data 为 {key1: 'value1', key2: 'value2'}
    },
  },
  '.box',
  { key1: 'value1', key2: 'value2' },
);

// 获取事件参数
$('.box').on('click', function (e, data) {
  // data 等于 e.detail
});

// 事件名支持使用命名空间
$('.box').on('click.myPlugin', function () {
  console.log('点击了 .box 元素');
});
```

### `.one()` {#one}

为每个匹配元素的特定事件绑定事件处理函数，但事件只会触发一次。

该方法的用法和 `.on()` 相同，所以不再举例了。

### `.off()` {#off}

解除集合中的元素绑定的事件。具体用法见下方示例：

```js
// 解除所有绑定的事件处理函数
$('.box').off();

// 解除绑定的指定事件
$('.box').off('click');

// 同时解除多个绑定的事件
$('.box').off('click focus');

// 解除绑定的指定事件处理函数
$('.box').off('click', callback);

// 解除通过事件委托绑定的事件
$(document).off('click', '.box');

// 解除通过事件委托绑定的指定事件处理函数
$(document).off('click', '.box', callback);

// 同时解绑多个事件处理函数
$('.box.').off({
  click: callback1,
  focus: callback2,
});

// 同时解绑多个通过事件委托绑定的事件处理函数
$(document).off(
  {
    click: callback1,
    focus: callback2,
  },
  '.box',
);

// 事件名支持使用命名空间，下面的用法将解绑所有以 .myPlugin 结尾的事件
$(document).off('.myPlugin');
```

### `.trigger()` {#trigger}

触发指定的事件。具体用法见下方示例：

```js
// 触发指定的事件
$('.box').trigger('click');

// 触发事件时传入参数
$('.box').trigger('click', { key1: 'value1', key2: 'value2' });

// 事件名支持命名空间
$('.box').trigger('click.myPlugin');

// 传入 CustomEvent 的参数
$('.box').trigger('click', undefined, {
  bubbles: true;
  cancelable: true;
  composed: true
});
```

## ajax {#api-ajax}

### `$.ajaxSetup()` {#d-ajaxSetup}

设置全局的 AJAX 请求参数。

```js
$.ajaxSetup({
  // 默认不触发全局 AJAX 事件
  global: false,

  // 默认使用 POST 方法发送请求
  method: 'POST',
});
```

详细参数列表参见下方的 [ajax 参数](#ajax-options)。

### `$.ajax()` {#d-ajax}

发送 AJAX 请求，并返回一个 Promise 对象。

```js
const promise = $.ajax({
  method: 'POST',
  url: './test.php',
  data: {
    key1: 'val1',
    key2: 'val2',
  },
  success: function (response) {
    console.log(response);
  },
});

promise
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
```

详细参数列表请参见下方的 [AJAX 参数](#ajax-options)。

还可以使用 `.on()` 方法来监听 AJAX 的全局事件。

```js
// 当 AJAX 请求开始时，会触发此事件
$(document).on('ajaxStart', function (e, { xhr, options }) {
  // xhr: XMLHttpRequest 对象
  // options: $.ajax() 方法的参数
});

// 当 AJAX 请求成功时，会触发此事件
$(document).on('ajaxSuccess', function (e, { xhr, options, response }) {
  // xhr: XMLHttpRequest 对象
  // options: $.ajax() 方法的参数
  // response: 请求的响应
});

// 当 AJAX 请求失败时，会触发此事件
$(document).on('ajaxError', function (e, { xhr, options }) {
  // xhr: XMLHttpRequest 对象
  // options: $.ajax() 方法的参数
});

// 当 AJAX 请求完成时（无论成功或失败），会触发此事件
$(document).on('ajaxComplete', function (e, { xhr, options }) {
  // xhr: XMLHttpRequest 对象
  // options: $.ajax() 方法的参数
});
```

### ajax 参数 {#ajax-options}

<table>
  <thead>
    <tr>
      <th>属性名</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr id="ajax-options-url">
      <td><a href="#ajax-options-url"><code>url</code></a></td>
      <td><code>string</code></td>
      <td>当前页面 URL</td>
    </tr>
    <tr>
      <td colspan="3">请求的 URL 地址。</td>
    </tr>
    <tr id="ajax-options-method">
      <td><a href="#ajax-options-method"><code>method</code></a></td>
      <td><code>string</code></td>
      <td><code>GET</code></td>
    </tr>
    <tr>
      <td colspan="3">
        <p>请求的 HTTP 方法。</p>
        <p>可选值包括：<code>GET</code>、<code>POST</code>、<code>PUT</code>、<code>PATCH</code>、<code>HEAD</code>、<code>OPTIONS</code>、<code>DELETE</code>。</p>
      </td>
    </tr>
    <tr id="ajax-options-data">
      <td><a href="#ajax-options-data"><code>data</code></a></td>
      <td><code>any</code></td>
      <td><code>''</code></td>
    </tr>
    <tr>
      <td colspan="3">发送到服务器的数据。</td>
    </tr>
    <tr id="ajax-options-processData">
      <td><a href="#ajax-options-processData"><code>processData</code></a></td>
      <td><code>boolean</code></td>
      <td><code>true</code></td>
    </tr>
    <tr>
      <td colspan="3">是否将传入的数据转换为查询字符串。</td>
    </tr>
    <tr id="ajax-options-async">
      <td><a href="#ajax-options-async"><code>async</code></a></td>
      <td><code>boolean</code></td>
      <td><code>true</code></td>
    </tr>
    <tr>
      <td colspan="3">是否为异步请求。</td>
    </tr>
    <tr id="ajax-options-cache">
      <td><a href="#ajax-options-cache"><code>cache</code></a></td>
      <td><code>boolean</code></td>
      <td><code>true</code></td>
    </tr>
    <tr>
      <td colspan="3">是否从缓存中读取数据。仅对 <code>GET</code>、<code>HEAD</code> 请求有效。</td>
    </tr>
    <tr id="ajax-options-username">
      <td><a href="#ajax-options-username"><code>username</code></a></td>
      <td><code>string</code></td>
      <td><code>''</code></td>
    </tr>
    <tr>
      <td colspan="3">用于 HTTP 访问认证的用户名。</td>
    </tr>
    <tr id="ajax-options-password">
      <td><a href="#ajax-options-password"><code>password</code></a></td>
      <td><code>string</code></td>
      <td><code>''</code></td>
    </tr>
    <tr>
      <td colspan="3">用于 HTTP 访问认证的密码。</td>
    </tr>
    <tr id="ajax-options-headers">
      <td><a href="#ajax-options-headers"><code>headers</code></a></td>
      <td><code>object</code></td>
      <td><code>{}</code></td>
    </tr>
    <tr>
      <td colspan="3">
        <p>添加到 HTTP 请求头的数据。可以在 <code>beforeSend</code> 回调函数中重写该值。</p>
        <p>值为字符串或 <code>null</code> 的字段会被发送，值为 <code>undefined</code> 的字段会被忽略。</p>
      </td>
    </tr>
    <tr id="ajax-options-xhrFields">
      <td><a href="#ajax-options-xhrFields"><code>xhrFields</code></a></td>
      <td><code>object</code></td>
      <td><code>{}</code></td>
    </tr>
    <tr>
      <td colspan="3">
        <p>设置在 <code>XMLHttpRequest</code> 对象上的数据。</p>
<pre><code class="language-js">$.ajax({
  url: '一个跨域 URL',
  xhrFields: {
    withCredentials: true
  }
});</code></pre>
      </td>
    </tr>
    <tr id="ajax-options-statusCode">
      <td><a href="#ajax-options-statusCode"><code>statusCode</code></a></td>
      <td><code>object</code></td>
      <td><code>{}</code></td>
    </tr>
    <tr>
      <td colspan="3">
        <p>HTTP 状态码与对应处理函数的映射。</p>
<pre><code class="language-js">$.ajax({
  statusCode: {
    404: function (xhr, textStatus) {
      alert('返回状态码为 404 时被调用');
    },
    200: function (data, textStatus, xhr) {
      alert('返回状态码为 200 时被调用');
    }
  }
});</code></pre>
        <p>状态码在 200 - 299 范围内或为 304 时，表示请求成功，函数参数和 <code>success</code> 回调的参数相同；否则表示请求失败，函数参数和 <code>error</code> 回调的参数相同。</p>
      </td>
    </tr>
    <tr id="ajax-options-dataType">
      <td><a href="#ajax-options-dataType"><code>dataType</code></a></td>
      <td><code>string</code></td>
      <td><code>text</code></td>
    </tr>
    <tr>
      <td colspan="3">
        <p>预期服务器返回的数据类型。</p>
        <p>包括：<code>text</code>、<code>json</code></p>
      </td>
    </tr>
    <tr id="ajax-options-contentType">
      <td><a href="#ajax-options-contentType"><code>contentType</code></a></td>
      <td><code>string</code></td>
      <td><code>application/x-www-form-urlencoded</code></td>
    </tr>
    <tr>
      <td colspan="3">请求内容的 MIME 类型。如果设置为 <code>false</code>，则不设置 <code>Content-Type</code>。</td>
    </tr>
    <tr id="ajax-options-timeout">
      <td><a href="#ajax-options-timeout"><code>timeout</code></a></td>
      <td><code>number</code></td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td colspan="3">请求超时时间（毫秒）。如果设置为 <code>0</code>，表示无超时时间。</td>
    </tr>
    <tr id="ajax-options-global">
      <td><a href="#ajax-options-global"><code>global</code></a></td>
      <td><code>boolean</code></td>
      <td><code>true</code></td>
    </tr>
    <tr>
      <td colspan="3">是否触发全局 AJAX 事件。</td>
    </tr>
    <tr id="ajax-options-beforeSend">
      <td><a href="#ajax-options-beforeSend"><code>beforeSend</code></a></td>
      <td><code>function</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>在发送请求前调用。如果返回 <code>false</code>，则取消 AJAX 请求。</p>
<pre><code class="language-js">$.ajax({
  beforeSend: function (xhr) {
    // xhr 为 XMLHttpRequest 对象
  }
});</code></pre>
      </td>
    </tr>
    <tr id="ajax-options-success">
      <td><a href="#ajax-options-success"><code>success</code></a></td>
      <td><code>function</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>请求成功之后调用。</p>
<pre><code class="language-js">$.ajax({
  success: function (data, textStatus, xhr) {
    // data 为 AJAX 请求返回的数据
    // textStatus 为包含成功代码的字符串
    // xhr 为 XMLHttpRequest 对象
  }
});</code></pre>
      </td>
    </tr>
    <tr id="ajax-options-error">
      <td><a href="#ajax-options-error"><code>error</code></a></td>
      <td><code>function</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>请求出错时调用。</p>
<pre><code class="language-js">$.ajax({
  error: function (xhr, textStatus) {
    // xhr 为 XMLHttpRequest 对象
    // textStatus 为包含错误代码的字符串
  }
});</code></pre>
      </td>
    </tr>
    <tr id="ajax-options-complete">
      <td><a href="#ajax-options-complete"><code>complete</code></a></td>
      <td><code>function</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>无论请求成功或失败，都会在完成时调用。</p>
<pre><code class="language-js">$.ajax({
  complete: function (xhr, textStatus) {
    // xhr 为 XMLHttpRequest 对象
    // textStatus 为一个包含成功或错误代码的字符串
  }
});</code></pre>
      </td>
    </tr>
  </tbody>
</table>

# dialog 函数

`dialog` 函数是对 [`<mdui-dialog>`](/zh-cn/docs/2/components/dialog) 组件的封装，使用该函数，你无需编写组件的 HTML 代码，就能打开一个对话框。

## 使用方法 {#usage}

按需导入函数：

```js
import { dialog } from 'mdui/functions/dialog.js';
```

使用示例：

```html
<mdui-button class="example-button">open</mdui-button>

<script type="module">
  import { dialog } from "mdui/functions/dialog.js";

  const button = document.querySelector(".example-button");

  button.addEventListener("click", () => {
    dialog({
      headline: "Dialog Title",
      description: "Dialog description",
      actions: [
        {
          text: "Cancel",
        },
        {
          text: "OK",
          onClick: () => {
            console.log("confirmed");
            return false;
          },
        }
      ]
    });
  });
</script>
```

## API {#api}

<pre><code class="nohighlight">dialog(options: <a href="#api-options">Options</a>): <a href="/zh-cn/docs/2/components/dialog">Dialog</a></code></pre>

函数接收一个 [Options](#api-options) 对象作为参数；返回值为 [`<mdui-dialog>`](/zh-cn/docs/2/components/dialog) 组件实例。

### Options {#api-options}

<table>
  <thead>
    <tr>
      <th>属性名</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr id="options-headline">
      <td><a href="#options-headline"><code>headline</code></a></td>
      <td><code>string</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">dialog 的标题</td>
    </tr>
    <tr id="options-description">
      <td><a href="#options-description"><code>description</code></a></td>
      <td><code>string</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">dialog 的描述文本</td>
    </tr>
    <tr id="options-body">
      <td><a href="#options-body"><code>body</code></a></td>
      <td><code>string</code> | <code>HTMLElement</code> | <code><a href="/zh-cn/docs/2/functions/jq">JQ</a>&lt;HTMLElement&gt;</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">dialog 中的 body 内容，可以是 HTML 字符串、DOM 元素、或 <a href="/en/docs/2/functions/jq">JQ 对象</a>。</td>
    </tr>
    <tr id="options-icon">
      <td><a href="#options-icon"><code>icon</code></a></td>
      <td><code>string</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">dialog 顶部的 Material Icons 图标名</td>
    </tr>
    <tr id="options-closeOnEsc">
      <td><a href="#options-closeOnEsc"><code>closeOnEsc</code></a></td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td colspan="3">是否在按下 ESC 键时，关闭 dialog</td>
    </tr>
    <tr id="options-closeOnOverlayClick">
      <td><a href="#options-closeOnOverlayClick"><code>closeOnOverlayClick</code></a></td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td colspan="3">是否在点击遮罩层时，关闭 dialog</td>
    </tr>
    <tr id="options-actions">
      <td><a href="#options-actions"><code>actions</code></a></td>
      <td><code><a href="#api-action">Action</a>[]</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">底部操作按钮数组</td>
    </tr>
    <tr id="options-stackedActions">
      <td><a href="#options-stackedActions"><code>stackedActions</code></a></td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td colspan="3">是否垂直排列底部操作按钮</td>
    </tr>
    <tr id="options-queue">
      <td><a href="#options-queue"><code>queue</code></a></td>
      <td><code>string</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>队列名称。</p>
        <p>默认不启用队列，在多次调用该函数时，将同时显示多个 dialog。</p>
        <p>可在该参数中传入一个队列名称，具有相同队列名称的 dialog 函数，将在上一个 dialog 关闭后才打开下一个 dialog。</p>
        <p><code>dialog()</code>、<a href="/zh-cn/docs/2/functions/alert"><code>alert()</code></a>、<a href="/zh-cn/docs/2/functions/confirm"><code>confirm()</code></a>、<a href="/zh-cn/docs/2/functions/prompt"><code>prompt()</code></a> 这四个函数的队列名称若相同，则也将互相共用同一个队列。</p>
      </td>
    </tr>
    <tr id="options-onOpen">
      <td><a href="#options-onOpen"><code>onOpen</code></a></td>
      <td><code>(dialog: <a href="/zh-cn/docs/2/components/dialog">Dialog</a>) => void</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>dialog 开始打开时的回调函数。</p>
        <p>函数参数为 dialog 实例，<code>this</code> 也指向 dialog 实例。</p>
      </td>
    </tr>
    <tr id="options-onOpened">
      <td><a href="#options-onOpened"><code>onOpened</code></a></td>
      <td><code>(dialog: <a href="/zh-cn/docs/2/components/dialog">Dialog</a>) => void</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>dialog 打开动画完成时的回调函数。</p>
        <p>函数参数为 dialog 实例，<code>this</code> 也指向 dialog 实例。</p>
      </td>
    </tr>
    <tr id="options-onClose">
      <td><a href="#options-onClose"><code>onClose</code></a></td>
      <td><code>(dialog: <a href="/zh-cn/docs/2/components/dialog">Dialog</a>) => void</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>dialog 开始关闭时的回调函数。</p>
        <p>函数参数为 dialog 实例，<code>this</code> 也指向 dialog 实例。</p>
      </td>
    </tr>
    <tr id="options-onClosed">
      <td><a href="#options-onClosed"><code>onClosed</code></a></td>
      <td><code>(dialog: <a href="/zh-cn/docs/2/components/dialog">Dialog</a>) => void</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>dialog 关闭动画完成时的回调函数。</p>
        <p>函数参数为 dialog 实例，<code>this</code> 也指向 dialog 实例。</p>
      </td>
    </tr>
    <tr id="options-onOverlayClick">
      <td><a href="#options-onOverlayClick"><code>onOverlayClick</code></a></td>
      <td><code>(dialog: <a href="/zh-cn/docs/2/components/dialog">Dialog</a>) => void</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>点击遮罩层时的回调函数。</p>
        <p>函数参数为 dialog 实例，<code>this</code> 也指向 dialog 实例。</p>
      </td>
    </tr>
  </tbody>
</table>

### Action {#api-action}

<table>
  <thead>
    <tr>
      <th>属性名</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr id="action-text">
      <td><a href="#action-text"><code>text</code></a></td>
      <td><code>string</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">按钮文本</td>
    </tr>
    <tr id="action-onClick">
      <td><a href="#action-onClick"><code>onClick</code></a></td>
      <td><code>(dialog: <a href="/zh-cn/docs/2/components/dialog">Dialog</a>) => void | boolean | Promise&lt;void&gt;</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>点击按钮时的回调函数。</p>
        <p>函数参数为 dialog 实例，<code>this</code> 也指向 dialog 实例。</p>
        <p>默认点击按钮后会关闭 dialog；若返回值为 <code>false</code>，则不关闭 dialog；若返回值为 promise，则将在 promise 被 resolve 后，关闭 dialog。</p>
      </td>
    </tr>
  </tbody>
</table>

# alert 函数

`alert` 函数是对 [`<mdui-dialog>`](/zh-cn/docs/2/components/dialog) 组件的封装，该函数用于代替系统原生的 `window.alert` 函数。使用该函数，你无需编写组件的 HTML 代码，就能打开一个警告框。

## 使用方法 {#usage}

按需导入函数：

```js
import { alert } from 'mdui/functions/alert.js';
```

使用示例：

```html
<mdui-button class="example-button">open</mdui-button>

<script type="module">
  import { alert } from "mdui/functions/alert.js";

  const button = document.querySelector(".example-button");

  button.addEventListener("click", () => {
    alert({
      headline: "Alert Title",
      description: "Alert description",
      confirmText: "OK",
      onConfirm: () => console.log("confirmed"),
    });
  });
</script>
```

## API {#api}

<pre><code class="nohighlight">alert(options: <a href="#api-options">Options</a>): Promise&lt;void&gt;</code></pre>

`alert` 函数接收一个 [Options](#api-options) 对象作为参数；返回值为 Promise，如果警告框是通过点击确定按钮关闭的，则 Promise 会被 resolve，如果警告框是通过其他方式关闭的，则 Promise 会被 reject。

### Options {#api-options}

<table>
  <thead>
    <tr>
      <th>属性名</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr id="options-headline">
      <td><a href="#options-headline"><code>headline</code></a></td>
      <td><code>string</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">alert 的标题</td>
    </tr>
    <tr id="options-description">
      <td><a href="#options-description"><code>description</code></a></td>
      <td><code>string</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">alert 的描述文本</td>
    </tr>
    <tr id="options-icon">
      <td><a href="#options-icon"><code>icon</code></a></td>
      <td><code>string</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">alert 顶部的 Material Icons 图标名</td>
    </tr>
    <tr id="options-closeOnEsc">
      <td><a href="#options-closeOnEsc"><code>closeOnEsc</code></a></td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td colspan="3">是否在按下 ESC 键时，关闭 alert</td>
    </tr>
    <tr id="options-closeOnOverlayClick">
      <td><a href="#options-closeOnOverlayClick"><code>closeOnOverlayClick</code></a></td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td colspan="3">是否在点击遮罩层时，关闭 alert</td>
    </tr>
    <tr id="options-confirmText">
      <td><a href="#options-confirmText"><code>confirmText</code></a></td>
      <td><code>string</code></td>
      <td><code>OK</code></td>
    </tr>
    <tr>
      <td colspan="3">确认按钮的文本</td>
    </tr>
    <tr id="options-queue">
      <td><a href="#options-queue"><code>queue</code></a></td>
      <td><code>string</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>队列名称。</p>
        <p>默认不启用队列，在多次调用该函数时，将同时显示多个 alert。</p>
        <p>可在该参数中传入一个队列名称，具有相同队列名称的 alert 函数，将在上一个 alert 关闭后才打开下一个 alert。</p>
        <p><a href="/zh-cn/docs/2/functions/dialog"><code>dialog()</code></a>、<code>alert()</code>、<a href="/zh-cn/docs/2/functions/confirm"><code>confirm()</code></a>、<a href="/zh-cn/docs/2/functions/prompt"><code>prompt()</code></a> 这四个函数的队列名称若相同，则也将互相共用同一个队列。</p>
      </td>
    </tr>
    <tr id="options-onConfirm">
      <td><a href="#options-onConfirm"><code>onConfirm</code></a></td>
      <td><code>(dialog: <a href="/zh-cn/docs/2/components/dialog">Dialog</a>) => void | boolean | Promise&lt;void&gt;</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>点击确认按钮时的回调函数。</p>
        <p>函数参数为 dialog 实例，<code>this</code> 也指向 dialog 实例。</p>
        <p>默认点击确认按钮后会关闭 alert；若返回值为 <code>false</code>，则不关闭 alert；若返回值为 promise，则将在 promise 被 resolve 后，关闭 alert。</p>
      </td>
    </tr>
    <tr id="options-onOpen">
      <td><a href="#options-onOpen"><code>onOpen</code></a></td>
      <td><code>(dialog: <a href="/zh-cn/docs/2/components/dialog">Dialog</a>) => void</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>alert 开始打开时的回调函数。</p>
        <p>函数参数为 dialog 实例，<code>this</code> 也指向 dialog 实例。</p>
      </td>
    </tr>
    <tr id="options-onOpened">
      <td><a href="#options-onOpened"><code>onOpened</code></a></td>
      <td><code>(dialog: <a href="/zh-cn/docs/2/components/dialog">Dialog</a>) => void</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>alert 打开动画完成时的回调函数。</p>
        <p>函数参数为 dialog 实例，<code>this</code> 也指向 dialog 实例。</p>
      </td>
    </tr>
    <tr id="options-onClose">
      <td><a href="#options-onClose"><code>onClose</code></a></td>
      <td><code>(dialog: <a href="/zh-cn/docs/2/components/dialog">Dialog</a>) => void</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>alert 开始关闭时的回调函数。</p>
        <p>函数参数为 dialog 实例，<code>this</code> 也指向 dialog 实例。</p>
      </td>
    </tr>
    <tr id="options-onClosed">
      <td><a href="#options-onClosed"><code>onClosed</code></a></td>
      <td><code>(dialog: <a href="/zh-cn/docs/2/components/dialog">Dialog</a>) => void</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>alert 关闭动画完成时的回调函数。</p>
        <p>函数参数为 dialog 实例，<code>this</code> 也指向 dialog 实例。</p>
      </td>
    </tr>
    <tr id="options-onOverlayClick">
      <td><a href="#options-onOverlayClick"><code>onOverlayClick</code></a></td>
      <td><code>(dialog: <a href="/zh-cn/docs/2/components/dialog">Dialog</a>) => void</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>点击遮罩层时的回调函数。</p>
        <p>函数参数为 dialog 实例，<code>this</code> 也指向 dialog 实例。</p>
      </td>
    </tr>
  </tbody>
</table>

# confirm 函数

`configm` 函数是对 [`<mdui-dialog>`](/zh-cn/docs/2/components/dialog) 组件的封装，该函数在功能上用于代替系统原生的 `window.confirm` 函数。使用该函数，你无需编写组件的 HTML 代码，就能打开一个确认框。

## 使用方法 {#usage}

按需导入函数：

```js
import { confirm } from 'mdui/functions/confirm.js';
```

使用示例：

```html
<mdui-button class="example-button">open</mdui-button>

<script type="module">
  import { confirm } from "mdui/functions/confirm.js";

  const button = document.querySelector(".example-button");

  button.addEventListener("click", () => {
    confirm({
      headline: "Confirm Title",
      description: "Confirm description",
      confirmText: "OK",
      cancelText: "Cancel",
      onConfirm: () => console.log("confirmed"),
      onCancel: () => console.log("canceled"),
    });
  });
</script>
```

## API {#api}

<pre><code class="nohighlight">confirm(options: <a href="#api-options">Options</a>): Promise&lt;void&gt;</code></pre>

函数接收一个 [Options](#api-options) 对象作为参数；返回值为 Promise，如果通过点击确定按钮关闭，则 Promise 会被 resolve，如果通过其他方式关闭，则 Promise 会被 reject。

### Options {#api-options}

<table>
  <thead>
    <tr>
      <th>属性名</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr id="options-headline">
      <td><a href="#options-headline"><code>headline</code></a></td>
      <td><code>string</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">confirm 的标题</td>
    </tr>
    <tr id="options-description">
      <td><a href="#options-description"><code>description</code></a></td>
      <td><code>string</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">confirm 的描述文本</td>
    </tr>
    <tr id="options-icon">
      <td><a href="#options-icon"><code>icon</code></a></td>
      <td><code>string</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">confirm 顶部的 Material Icons 图标名</td>
    </tr>
    <tr id="options-closeOnEsc">
      <td><a href="#options-closeOnEsc"><code>closeOnEsc</code></a></td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td colspan="3">是否在按下 ESC 键时，关闭 confirm</td>
    </tr>
    <tr id="options-closeOnOverlayClick">
      <td><a href="#options-closeOnOverlayClick"><code>closeOnOverlayClick</code></a></td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td colspan="3">是否在点击遮罩层时，关闭 confirm</td>
    </tr>
    <tr id="options-confirmText">
      <td><a href="#options-confirmText"><code>confirmText</code></a></td>
      <td><code>string</code></td>
      <td><code>OK</code></td>
    </tr>
    <tr>
      <td colspan="3">确认按钮的文本</td>
    </tr>
    <tr id="options-cancelText">
      <td><a href="#options-cancelText"><code>cancelText</code></a></td>
      <td><code>string</code></td>
      <td><code>Cancel</code></td>
    </tr>
    <tr>
      <td colspan="3">取消按钮的文本</td>
    </tr>
    <tr id="options-stackedActions">
      <td><a href="#options-stackedActions"><code>stackedActions</code></a></td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td colspan="3">是否垂直排列底部操作按钮</td>
    </tr>
    <tr id="options-queue">
      <td><a href="#options-queue"><code>queue</code></a></td>
      <td><code>string</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>队列名称。</p>
        <p>默认不启用队列，在多次调用该函数时，将同时显示多个 confirm。</p>
        <p>可在该参数中传入一个队列名称，具有相同队列名称的 confirm 函数，将在上一个 confirm 关闭后才打开下一个 confirm。</p>
        <p><a href="/zh-cn/docs/2/functions/dialog"><code>dialog()</code></a>、<a href="/zh-cn/docs/2/functions/alert"><code>alert()</code></a>、<code>confirm()</code>、<a href="/zh-cn/docs/2/functions/prompt"><code>prompt()</code></a> 这四个函数的队列名称若相同，则也将互相共用同一个队列。</p>
      </td>
    </tr>
    <tr id="options-onConfirm">
      <td><a href="#options-onConfirm"><code>onConfirm</code></a></td>
      <td><code>(dialog: <a href="/zh-cn/docs/2/components/dialog">Dialog</a>) => void | boolean | Promise&lt;void&gt;</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>点击确认按钮时的回调函数。</p>
        <p>函数参数为 dialog 实例，<code>this</code> 也指向 dialog 实例。</p>
        <p>默认点击确认按钮后会关闭 confirm；若返回值为 <code>false</code>，则不关闭 confirm；若返回值为 promise，则将在 promise 被 resolve 后，关闭 confirm。</p>
      </td>
    </tr>
    <tr id="options-onCancel">
      <td><a href="#options-onCancel"><code>onCancel</code></a></td>
      <td><code>(dialog: <a href="/zh-cn/docs/2/components/dialog">Dialog</a>) => void | boolean | Promise&lt;void&gt;</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>点击取消按钮时的回调函数。</p>
        <p>函数参数为 dialog 实例，<code>this</code> 也指向 dialog 实例。</p>
        <p>默认点击取消按钮后会关闭 confirm；若返回值为 <code>false</code>，则不关闭 confirm；若返回值为 promise，则将在 promise 被 resolve 后，关闭 confirm。</p>
      </td>
    </tr>
    <tr id="options-onOpen">
      <td><a href="#options-onOpen"><code>onOpen</code></a></td>
      <td><code>(dialog: <a href="/zh-cn/docs/2/components/dialog">Dialog</a>) => void</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>confirm 开始打开时的回调函数。</p>
        <p>函数参数为 dialog 实例，<code>this</code> 也指向 dialog 实例。</p>
      </td>
    </tr>
    <tr id="options-onOpened">
      <td><a href="#options-onOpened"><code>onOpened</code></a></td>
      <td><code>(dialog: <a href="/zh-cn/docs/2/components/dialog">Dialog</a>) => void</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>confirm 打开动画完成时的回调函数。</p>
        <p>函数参数为 dialog 实例，<code>this</code> 也指向 dialog 实例。</p>
      </td>
    </tr>
    <tr id="options-onClose">
      <td><a href="#options-onClose"><code>onClose</code></a></td>
      <td><code>(dialog: <a href="/zh-cn/docs/2/components/dialog">Dialog</a>) => void</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>confirm 开始关闭时的回调函数。</p>
        <p>函数参数为 dialog 实例，<code>this</code> 也指向 dialog 实例。</p>
      </td>
    </tr>
    <tr id="options-onClosed">
      <td><a href="#options-onClosed"><code>onClosed</code></a></td>
      <td><code>(dialog: <a href="/zh-cn/docs/2/components/dialog">Dialog</a>) => void</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>confirm 关闭动画完成时的回调函数。</p>
        <p>函数参数为 dialog 实例，<code>this</code> 也指向 dialog 实例。</p>
      </td>
    </tr>
    <tr id="options-onOverlayClick">
      <td><a href="#options-onOverlayClick"><code>onOverlayClick</code></a></td>
      <td><code>(dialog: <a href="/zh-cn/docs/2/components/dialog">Dialog</a>) => void</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>点击遮罩层时的回调函数。</p>
        <p>函数参数为 dialog 实例，<code>this</code> 也指向 dialog 实例。</p>
      </td>
    </tr>
  </tbody>
</table>

# prompt 函数

`prompt` 函数是对 [`<mdui-dialog>`](/zh-cn/docs/2/components/dialog) 组件的封装，该函数在功能上用于代替系统原生的 `window.prompt` 函数。使用该函数，你无需编写组件的 HTML 代码，就能打开一个可输入文本的对话框。

## 使用方法 {#usage}

按需导入函数：

```js
import { prompt } from 'mdui/functions/prompt.js';
```

使用示例：

```html
<mdui-button class="example-button">open</mdui-button>

<script type="module">
  import { prompt } from "mdui/functions/prompt.js";

  const button = document.querySelector(".example-button");

  button.addEventListener("click", () => {
    prompt({
      headline: "Prompt Title",
      description: "Prompt description",
      confirmText: "OK",
      cancelText: "Cancel",
      onConfirm: (value) => console.log("confirmed: " + value),
      onCancel: () => console.log("canceled"),
    });
  });
</script>
```

## API {#api}

<pre><code class="nohighlight">prompt(options: <a href="#api-options">Options</a>): Promise&lt;string&gt;</code></pre>

函数的参数为 [Options](#api-options) 对象；返回值为 Promise，如果是通过点击确定按钮关闭对话框，则 Promise 会被 resolve，resolve 的参数为输入框的值，如果是通过其他方式关闭对话框，则 Promise 会被 reject。

### Options {#api-options}

<table>
  <thead>
    <tr>
      <th>属性名</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr id="options-headline">
      <td><a href="#options-headline"><code>headline</code></a></td>
      <td><code>string</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">prompt 的标题</td>
    </tr>
    <tr id="options-description">
      <td><a href="#options-description"><code>description</code></a></td>
      <td><code>string</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">prompt 的描述文本</td>
    </tr>
    <tr id="options-icon">
      <td><a href="#options-icon"><code>icon</code></a></td>
      <td><code>string</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">prompt 顶部的 Material Icons 图标名</td>
    </tr>
    <tr id="options-closeOnEsc">
      <td><a href="#options-closeOnEsc"><code>closeOnEsc</code></a></td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td colspan="3">是否在按下 ESC 键时，关闭 prompt</td>
    </tr>
    <tr id="options-closeOnOverlayClick">
      <td><a href="#options-closeOnOverlayClick"><code>closeOnOverlayClick</code></a></td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td colspan="3">是否在点击遮罩层时，关闭 prompt</td>
    </tr>
    <tr id="options-confirmText">
      <td><a href="#options-confirmText"><code>confirmText</code></a></td>
      <td><code>string</code></td>
      <td><code>OK</code></td>
    </tr>
    <tr>
      <td colspan="3">确认按钮的文本</td>
    </tr>
    <tr id="options-cancelText">
      <td><a href="#options-cancelText"><code>cancelText</code></a></td>
      <td><code>string</code></td>
      <td><code>Cancel</code></td>
    </tr>
    <tr>
      <td colspan="3">取消按钮的文本</td>
    </tr>
    <tr id="options-stackedActions">
      <td><a href="#options-stackedActions"><code>stackedActions</code></a></td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td colspan="3">是否垂直排列底部操作按钮</td>
    </tr>
    <tr id="options-queue">
      <td><a href="#options-queue"><code>queue</code></a></td>
      <td><code>string</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>队列名称。</p>
        <p>默认不启用队列，在多次调用该函数时，将同时显示多个 prompt。</p>
        <p>可在该参数中传入一个队列名称，具有相同队列名称的 prompt 函数，将在上一个 prompt 关闭后才打开下一个 prompt。</p>
        <p><a href="/zh-cn/docs/2/functions/dialog"><code>dialog()</code></a>、<a href="/zh-cn/docs/2/functions/alert"><code>alert()</code></a>、<a href="/zh-cn/docs/2/functions/confirm"><code>confirm()</code></a>、<code>prompt()</code> 这四个函数的队列名称若相同，则也将互相共用同一个队列。</p>
      </td>
    </tr>
    <tr id="options-onConfirm">
      <td><a href="#options-onConfirm"><code>onConfirm</code></a></td>
      <td><code>(value: string, dialog: <a href="/zh-cn/docs/2/components/dialog">Dialog</a>) => void | boolean | Promise&lt;void&gt;</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>点击确认按钮时的回调函数。</p>
        <p>函数参数为输入框的值和 dialog 实例，<code>this</code> 指向 dialog 实例。</p>
        <p>默认点击确认按钮后会关闭 prompt；若返回值为 <code>false</code>，则不关闭 prompt；若返回值为 promise，则将在 promise 被 resolve 后，关闭 prompt。</p>
      </td>
    </tr>
    <tr id="options-onCancel">
      <td><a href="#options-onCancel"><code>onCancel</code></a></td>
      <td><code>(value: string, dialog: <a href="/zh-cn/docs/2/components/dialog">Dialog</a>) => void | boolean | Promise&lt;void&gt;</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>点击取消按钮时的回调函数。</p>
        <p>函数参数为输入框的值和 dialog 实例，<code>this</code> 指向 dialog 实例。</p>
        <p>默认点击取消按钮后会关闭 prompt；若返回值为 <code>false</code>，则不关闭 prompt；若返回值为 promise，则将在 promise 被 resolve 后，关闭 prompt。</p>
      </td>
    </tr>
    <tr id="options-onOpen">
      <td><a href="#options-onOpen"><code>onOpen</code></a></td>
      <td><code>(dialog: <a href="/zh-cn/docs/2/components/dialog">Dialog</a>) => void</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>prompt 开始打开时的回调函数。</p>
        <p>函数参数为 dialog 实例，<code>this</code> 也指向 dialog 实例。</p>
      </td>
    </tr>
    <tr id="options-onOpened">
      <td><a href="#options-onOpened"><code>onOpened</code></a></td>
      <td><code>(dialog: <a href="/zh-cn/docs/2/components/dialog">Dialog</a>) => void</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>prompt 打开动画完成时的回调函数。</p>
        <p>函数参数为 dialog 实例，<code>this</code> 也指向 dialog 实例。</p>
      </td>
    </tr>
    <tr id="options-onClose">
      <td><a href="#options-onClose"><code>onClose</code></a></td>
      <td><code>(dialog: <a href="/zh-cn/docs/2/components/dialog">Dialog</a>) => void</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>prompt 开始关闭时的回调函数。</p>
        <p>函数参数为 dialog 实例，<code>this</code> 也指向 dialog 实例。</p>
      </td>
    </tr>
    <tr id="options-onClosed">
      <td><a href="#options-onClosed"><code>onClosed</code></a></td>
      <td><code>(dialog: <a href="/zh-cn/docs/2/components/dialog">Dialog</a>) => void</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>prompt 关闭动画完成时的回调函数。</p>
        <p>函数参数为 dialog 实例，<code>this</code> 也指向 dialog 实例。</p>
      </td>
    </tr>
    <tr id="options-onOverlayClick">
      <td><a href="#options-onOverlayClick"><code>onOverlayClick</code></a></td>
      <td><code>(dialog: <a href="/zh-cn/docs/2/components/dialog">Dialog</a>) => void</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>点击遮罩层时的回调函数。</p>
        <p>函数参数为 dialog 实例，<code>this</code> 也指向 dialog 实例。</p>
      </td>
    </tr>
    <tr id="options-validator">
      <td><a href="#options-validator"><code>validator</code></a></td>
      <td><code>(value: string) => boolean | string | Promise&lt;void&gt;</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>输入框的验证函数，参数为输入框的值。<code>this</code> 指向 TextField 实例。</p>
        <p>将在浏览器原生验证 API 验证通过后，再使用该函数进行验证。</p>
        <p>可以返回 <code>boolean</code> 值，为 <code>false</code> 时表示验证未通过，为 <code>true</code> 时表示验证通过。</p>
        <p>也可以返回字符串，字符串不为空时表示验证未通过，同时返回的字符串将用作错误提示。</p>
        <p>也可以返回 Promise，被 resolve 表示验证通过，被 reject 表示验证未通过，同时拒绝原因将用作错误提示。</p>
      </td>
    </tr>
    <tr id="options-textFieldOptions">
      <td><a href="#options-textFieldOptions"><code>textFieldOptions</code></a></td>
      <td><code>Partial&lt;<a href="/zh-cn/docs/2/components/text-field#attributes">TextField</a>&gt;</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">prompt 内部的输入框为 <a href="/zh-cn/docs/2/components/text-field"><code>&lt;mdui-text-field&gt;</code></a> 组件。可在该参数中设置 <a href="/zh-cn/docs/2/components/text-field"><code>&lt;mdui-text-field&gt;</code></a> 组件的参数。</td>
    </tr>
  </tbody>
</table>

# snackbar 函数

`snackbar` 函数是对 [`<mdui-snackbar>`](/zh-cn/docs/2/components/snackbar) 组件的封装。使用该函数，你无需编写组件的 HTML 代码，就能打开一个 snackbar。

## 使用方法 {#usage}

按需导入函数：

```js
import { snackbar } from 'mdui/functions/snackbar.js';
```

使用示例：

```html
<mdui-button class="example-button">open</mdui-button>

<script type="module">
  import { snackbar } from "mdui/functions/snackbar.js";

  const button = document.querySelector(".example-button");

  button.addEventListener("click", () => {
    snackbar({
      message: "Photo archived",
      action: "Undo",
      onActionClick: () => console.log("click action button")
    });
  });
</script>
```

## API {#api}

<pre><code class="nohighlight">snackbar(options: <a href="#api-options">Options</a>): <a href="/zh-cn/docs/2/components/snackbar">Snackbar</a></code></pre>

函数接收一个 [Options](#api-options) 对象作为参数；返回值为 [`<mdui-snackbar>`](/zh-cn/docs/2/components/snackbar) 组件实例。

### Options {#api-options}

<table>
  <thead>
    <tr>
      <th>属性名</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr id="options-message">
      <td><a href="#options-message"><code>message</code></a></td>
      <td><code>string</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">Snackbar 中的消息文本内容</td>
    </tr>
    <tr id="options-placement">
      <td><a href="#options-placement"><code>placement</code></a></td>
      <td><code>'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'</code></td>
      <td><code>bottom</code></td>
    </tr>
    <tr>
      <td colspan="3">
        <p>Snackbar 出现的位置。默认为 <code>bottom</code>。可选值为：</p>
        <ul>
          <li><code>top</code>：位于顶部，居中对齐</li>
          <li><code>top-start</code>：位于顶部，左对齐</li>
          <li><code>top-end</code>：位于顶部，右对齐</li>
          <li><code>bottom</code>：位于底部，居中对齐</li>
          <li><code>bottom-start</code>：位于底部，左对齐</li>
          <li><code>bottom-end</code>：位于底部，右对齐</li>
        </ul>
      </td>
    </tr>
    <tr id="options-action">
      <td><a href="#options-action"><code>action</code></a></td>
      <td><code>string</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">操作按钮的文本</td>
    </tr>
    <tr id="options-closeable">
      <td><a href="#options-closeable"><code>closeable</code></a></td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td colspan="3">是否在右侧显示关闭按钮</td>
    </tr>
    <tr id="options-messageLine">
      <td><a href="#options-messageLine"><code>messageLine</code></a></td>
      <td><code>1 | 2</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>消息文本最多显示几行。默认不限制行数。可选值为</p>
        <ul>
          <li><code>1</code>：消息文本最多显示一行</li>
          <li><code>2</code>：消息文本最多显示两行</li>
        </ul>
      </td>
    </tr>
    <tr id="options-autoCloseDelay">
      <td><a href="#options-autoCloseDelay"><code>autoCloseDelay</code></a></td>
      <td><code>number</code></td>
      <td><code>5000</code></td>
    </tr>
    <tr>
      <td colspan="3">在多长时间后自动关闭（单位为毫秒）。设置为 0 时，不自动关闭。默认为 5 秒后自动关闭。</td>
    </tr>
    <tr id="options-closeOnOutsideClick">
      <td><a href="#options-closeOnOutsideClick"><code>closeOnOutsideClick</code></a></td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td colspan="3">点击或触摸 Snackbar 以外的区域时是否关闭 Snackbar</td>
    </tr>
    <tr id="options-queue">
      <td><a href="#options-queue"><code>queue</code></a></td>
      <td><code>string</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>队列名称。</p>
        <p>默认不启用队列，在多次调用该函数时，将同时显示多个 snackbar。</p>
        <p>可在该参数中传入一个队列名称，具有相同队列名称的 snackbar 函数，将在上一个 snackbar 关闭后才打开下一个 snackbar。</p>
      </td>
    </tr>
    <tr id="options-onClick">
      <td><a href="#options-onClick"><code>onClick</code></a></td>
      <td><code>(snackbar: <a href="/zh-cn/docs/2/components/snackbar">Snackbar</a>) => void</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>点击 Snackbar 时的回调函数。</p>
        <p>函数参数为 snackbar 实例，<code>this</code> 也指向 snackbar 实例。</p>
      </td>
    </tr>
    <tr id="options-onActionClick">
      <td><a href="#options-onActionClick"><code>onActionClick</code></a></td>
      <td><code>(snackbar: <a href="/zh-cn/docs/2/components/snackbar">Snackbar</a>) => void | boolean | Promise&lt;void&gt;</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>点击操作按钮时的回调函数。</p>
        <p>函数参数为 snackbar 实例，<code>this</code> 也指向 snackbar 实例。</p>
        <p>默认点击后会关闭 snackbar；若返回值为 <code>false</code>，则不关闭 snackbar；若返回值为 promise，则将在 promise 被 resolve 后，关闭 snackbar。</p>
      </td>
    </tr>
    <tr id="options-onOpen">
      <td><a href="#options-onOpen"><code>onOpen</code></a></td>
      <td><code>(snackbar: <a href="/zh-cn/docs/2/components/snackbar">Snackbar</a>) => void</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>Snackbar 开始显示时的回调函数。</p>
        <p>函数参数为 snackbar 实例，<code>this</code> 也指向 snackbar 实例。</p>
      </td>
    </tr>
    <tr id="options-onOpened">
      <td><a href="#options-onOpened"><code>onOpened</code></a></td>
      <td><code>(snackbar: <a href="/zh-cn/docs/2/components/snackbar">Snackbar</a>) => void</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>Snackbar 显示动画完成时的回调函数。</p>
        <p>函数参数为 snackbar 实例，<code>this</code> 也指向 snackbar 实例。</p>
      </td>
    </tr>
    <tr id="options-onClose">
      <td><a href="options-onClose"><code>onClose</code></a></td>
      <td><code>(snackbar: <a href="/zh-cn/docs/2/components/snackbar">Snackbar</a>) => void</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>Snackbar 开始隐藏时的回调函数。</p>
        <p>函数参数为 snackbar 实例，<code>this</code> 也指向 snackbar 实例。</p>
      </td>
    </tr>
    <tr id="options-onClosed">
      <td><a href="#options-onClosed"><code>onClosed</code></a></td>
      <td><code>(snackbar: <a href="/zh-cn/docs/2/components/snackbar">Snackbar</a>) => void</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">
        <p>Snackbar 隐藏动画完成时的回调函数。</p>
        <p>函数参数为 snackbar 实例，<code>this</code> 也指向 snackbar 实例。</p>
      </td>
    </tr>
  </tbody>
</table>

# getTheme 函数

`getTheme` 函数用于获取当前页面或指定元素的主题设置。

主题类型包括 `light`、`dark`、`auto` 三种，详见 [暗色模式](/zh-cn/docs/2/styles/dark-mode)。

## 使用方法 {#usage}

按需导入函数：

```js
import { getTheme } from 'mdui/functions/getTheme.js';
```

使用示例：

```js
// 获取 <html> 上的主题
getTheme();

// 获取 class="element" 元素上的主题
getTheme('.element');

// 获取指定 DOM 元素上的主题
const element = document.querySelector('.element');
getTheme(element);
```

## API {#api}

<pre><code class="nohighlight">getTheme(target?: string | HTMLElement | <a href="/zh-cn/docs/2/functions/jq">JQ</a>&lt;HTMLElement&gt;): 'light' | 'dark' | 'auto'</code></pre>

函数的参数为要获取主题的元素，可以是 CSS 选择器、DOM 元素，或 [JQ 对象](/zh-cn/docs/2/functions/jq)。如果不传入参数，则默认获取 `<html>` 元素的主题。

函数的返回值为 `light`、`dark`、`auto` 之一，如果元素上未设置主题，则默认返回 `light`。

# setTheme 函数

`setTheme` 函数用于设置当前页面或指定元素的主题。

可选的主题包括 `light`、`dark`和 `auto`。详见 [暗色模式](/zh-cn/docs/2/styles/dark-mode)。

## 使用方法 {#usage}

按需导入函数：

```js
import { setTheme } from 'mdui/functions/setTheme.js';
```

使用示例：

```js
// 把整个页面设置成暗色模式
setTheme('dark');

// 把 class="element" 元素设置成暗色模式
setTheme('dark', '.element');

// 把指定 DOM 元素设置成暗色模式
const element = document.querySelector('.element');
setTheme('dark', element);
```

## API {#api}

<pre><code class="nohighlight">setTheme(theme: 'light' | 'dark' | 'auto', target?: string | HTMLElement | <a href="/zh-cn/docs/2/functions/jq">JQ</a>&lt;HTMLElement&gt;): void</code></pre>

函数的第一个参数是要设置的主题，可选值为 `light`、`dark`、`auto`。

第二个参数是要设置主题的元素，可以是 CSS 选择器、DOM 元素，或 [JQ 对象](/zh-cn/docs/2/functions/jq)。如果不传入第二个参数，那么默认设置 `<html>` 元素的主题。

# getColorFromImage 函数

`getColorFromImage` 函数用于从指定图片中提取主色调。获取主色调后，你可以使用 [`setColorScheme`](/zh-cn/docs/2/functions/setColorScheme) 函数来设置配色方案，从而实现[动态配色](/zh-cn/docs/2/styles/dynamic-color)功能。

## 使用方法 {#usage}

按需导入函数：

```js
import { getColorFromImage } from 'mdui/functions/getColorFromImage.js';
```

使用示例：

```js
const image = new Image();
image.src = 'demo.png';

getColorFromImage(image).then((color) => {
  console.log(color);
});
```

## API {#api}

<pre><code class="nohighlight">getColorFromImage(image: string | HTMLImageElement | <a href="/zh-cn/docs/2/functions/jq">JQ</a>&lt;HTMLImageElement&gt;): Promise&lt;string&gt;</code></pre>

函数接收一个 `<img>` 元素的 CSS 选择器、或 `HTMLImageElement` 对象，或包含 `<img>` 元素的 [JQ 对象](/zh-cn/docs/2/functions/jq) 作为参数。

返回值为 Promise，Promise 的值为图片主色调的十六进制颜色值（如 `#ff0000`）。

# setColorScheme 函数

`setColorScheme` 函数用于根据提供的十六进制颜色值，设置配色方案。

配色方案的设置会影响到页面中的所有 mdui 组件。详见 [动态配色](/zh-cn/docs/2/styles/dynamic-color)。

## 使用方法 {#usage}

按需导入函数：

```js
import { setColorScheme } from 'mdui/functions/setColorScheme.js';
```

使用示例：

```js
setColorScheme('#ff0000');
```

## API {#api}

<pre><code class="nohighlight">setColorScheme(color: string, options: <a href="#api-options">Options</a>): void;</code></pre>

### Options {#api-options}

<table>
  <thead>
    <tr>
      <th>属性名</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr id="options-target">
      <td><a href="#options-target"><code>target</code></a></td>
      <td><code>string | HTMLElement | <a href="/zh-cn/docs/2/functions/jq">JQ</a>&lt;HTMLElement&gt;</code></td>
      <td><code>document.documentElement</code></td>
    </tr>
    <tr>
      <td colspan="3">
        <p>要设置配色方案的元素。值可以是 CSS 选择器、DOM 元素、或 <a href="/zh-cn/docs/2/functions/jq">JQ 对象</a>。若设置了该参数，则配色方案仅在指定元素内生效。</p>
        <p>默认为 <code>document.documentElement</code>，即 <code>&lt;html&gt;</code> 元素，在整个页面生效。</p>
      </td>
    </tr>
    <tr id="options-customColors">
      <td><a href="#options-customColors"><code>customColors</code></a></td>
      <td><code><a href="#api-custom-color">CustomColor</a>[]</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">自定义颜色数组。使用方法请参见 <a href="/zh-cn/docs/2/styles/dynamic-color#color-scheme">动态配色</a> 章节。</td>
    </tr>
  </tbody>
</table>

### CustomColor {#api-custom-color}

<table>
  <thead>
    <tr>
      <th>属性名</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr id="custom-color-name">
      <td><a href="#custom-color-name"><code>name</code></a></td>
      <td><code>string</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">自定义颜色名。</td>
    </tr>
    <tr id="custom-color-value">
      <td><a href="#custom-color-value"><code>value</code></a></td>
      <td><code>string</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td colspan="3">自定义十六进制颜色值，如 <code>#f82506</code>。</td>
    </tr>
  </tbody>
</table>

# removeColorScheme 函数

`removeColorScheme` 函数用于移除当前页面或指定元素上的配色方案。详见 [动态配色](/zh-cn/docs/2/styles/dynamic-color)。

## 使用方法 {#usage}

按需导入函数：

```js
import { removeColorScheme } from 'mdui/functions/removeColorScheme.js';
```

使用示例：

```js
// 移除 <html> 上的配色方案
removeColorScheme();

// 移除 class="element" 元素上的配色方案
removeColorScheme('.element');

// 移除指定 DOM 元素上的配色方案
const element = document.querySelector('.element');
removeColorScheme(element);
```

## API {#api}

<pre><code class="nohighlight">removeColorScheme(target?: string | HTMLElement | <a href="/zh-cn/docs/2/functions/jq">JQ</a>&lt;HTMLElement&gt;): void</code></pre>

函数的参数为要移除配色方案的元素，可以是 CSS 选择器、DOM 元素，或 [JQ 对象](/zh-cn/docs/2/functions/jq)。如果不传入参数，则默认移除 `<html>` 元素的配色方案。

# loadLocale 函数

`loadLocale` 函数用于加载语言包。详见 [本地化](/zh-cn/docs/2/getting-started/localization)。

## 使用方法 {#usage}

按需导入函数：

```js
import { loadLocale } from 'mdui/functions/loadLocale.js';
```

下面列举了几种常见的语言包加载方式，详细说明可参见 [本地化](/zh-cn/docs/2/getting-started/localization)。

动态导入（懒加载）：

```js
loadLocale((locale) => import(`../node_modules/mdui/locales/${locale}.js`));
```

动态导入（预加载）：

```js
const localizedTemplates = new Map([
  ['zh-cn', import(`../node_modules/mdui/locales/zh-cn.js`)],
  ['zh-tw', import(`../node_modules/mdui/locales/zh-tw.js`)],
]);

loadLocale(async (locale) => localizedTemplates.get(locale));
```

静态导入：

```js
import * as locale_zh_cn from 'mdui/locales/zh-cn.js';
import * as locale_zh_tw from 'mdui/locales/zh-tw.js';

const localizedTemplates = new Map([
  ['zh-cn', locale_zh_cn],
  ['zh-tw', locale_zh_tw],
]);

loadLocale(async (locale) => localizedTemplates.get(locale));
```

## API {#api}

```ts
loadLocale((LocaleTargetCode) => Promise<LocaleModule>): void;
```

函数的参数为一个定义了如何加载语言包的函数。语言包加载函数的参数为语言代码，返回值为 Promise，resolve 的值为对应的语言包模块。

语言代码列表参见 [支持的语言](/zh-cn/docs/2/getting-started/localization#languages)，其中 `en-us` 为内置语言，无需加载。

# setLocale 函数

`setLocale` 函数用于设置当前的本地化语言代码。详见 [本地化](/zh-cn/docs/2/getting-started/localization)。

## 使用方法 {#usage}

按需导入函数：

```js
import { setLocale } from 'mdui/functions/setLocale.js';
```

使用示例：

```js
setLocale('zh-cn').then(() => {
  // promise 被 resolve 时，语言切换完成
});
```

## API {#api}

```ts
setLocale(LocaleCode): Promise<void>
```

函数的参数为语言代码，返回值为 Promise，在 Promise resolve 时，语言切换完成。

语言代码列表参见 [支持的语言](/zh-cn/docs/2/getting-started/localization#languages)。

# getLocale 函数

`getLocale` 函数用于获取当前的本地化语言代码。详见 [本地化](/zh-cn/docs/2/getting-started/localization)。

## 使用方法 {#usage}

按需导入函数：

```js
import { getLocale } from 'mdui/functions/getLocale.js';
```

使用示例：

```js
// 获取当前的本地化语言代码
getLocale();
```

## API {#api}

```ts
getLocale(): LocaleCode
```

函数的返回值为语言代码，语言代码列表参见 [支持的语言](/zh-cn/docs/2/getting-started/localization#languages)。

# throttle 函数

`throttle` 函数用于创建一个节流函数，该函数在指定的时间间隔内最多只执行一次。

## 使用方法 {#usage}

按需导入函数：

```js
import { throttle } from 'mdui/functions/throttle.js';
```

使用示例：

```js
// 这个函数在 100 毫秒内最多执行一次，可避免在滚动时过于频繁地调用该函数
window.addEventListener(
  'scroll',
  throttle(() => {
    console.log('update');
  }, 100),
);
```

## API {#api}

```ts
throttle(func: Function, wait: number): Function
```

函数的第一个参数是需要进行节流操作的函数，第二个参数是指定的时间间隔（单位：毫秒）。函数的返回值是经过节流处理的函数。

# observeResize 函数

`observeResize` 函数用于监听元素尺寸的变化，当尺寸发生变化时，会执行指定的回调函数。

该函数使用 [`ResizeObserver`](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver) 实现，但采用了单例模式，因此性能更优。

## 使用方法 {#usage}

按需导入函数：

```js
import { observeResize } from 'mdui/functions/observeResize.js';
```

使用示例：

```js
// 监听 document.body 的尺寸变化
const observer = observeResize(document.body, function (entry, observer) {
  // 此时 document.body 的尺寸发生了变化，可通过 entry 获取新的尺寸
  console.log(entry);

  // 可调用该方法取消监听
  observer.unobserve();
});

// 也可以调用函数返回值的 unobserve 方法取消监听
observer.unobserve();
```

## API {#api}

<pre><code class="nohighlight">observeResize(target: string | HTMLElement | <a href="/zh-cn/docs/2/functions/jq">JQ</a>&lt;HTMLElement&gt;, callback: <a href="#api-callback">Callback</a>)): <a href="#api-ObserveResize">ObserveResize</a></code></pre>

`target` 参数可以是 CSS 选择器、DOM 元素、或 <a href="/zh-cn/docs/2/functions/jq">JQ 对象</a>。

### Callback {#api-Callback}

<pre><code class="nohighlight">(entry: <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserverEntry" target="_blank" rel="noopener nofollow">ResizeObserverEntry</a>, observer: <a href="#api-ObserveResize">ObserveResize</a>) => void</code></pre>

在回调函数中，`this` 指向 [ObserveResize](#api-ObserveResize)。

### ObserveResize {#api-ObserveResize}

```ts
{
  unobserve: () => void;
}
```

# breakpoint 函数

`breakpoint` 函数用于判断页面的断点。

mdui 提供了 6 个断点，分别为：`xs`、`sm`、`md`、`lg`、`xl`、`xxl`。其默认值可在 [设计令牌](/zh-cn/docs/2/styles/design-tokens#breakpoint) 页面查看。你可以使用此函数来判断页面宽度是否大于、小于、等于、不等于指定的断点，或者是否在指定的断点范围内。

## 使用方法 {#usage}

按需导入函数：

```js
import { breakpoint } from 'mdui/functions/breakpoint.js';
```

使用示例：

```js
const breakpointCondition = breakpoint();

// 判断当前页面断点是否大于 sm
breakpointCondition.up('sm');

// 判断当前页面断点是否小于 lg
breakpointCondition.down('lg');

// 判断当前页面断点是否等于 md
breakpointCondition.only('md');

// 判断当前页面断点是否不等于 xl
breakpointCondition.not('xl');

// 判断当前页面断点是否在 sm 和 lg 之间
breakpointCondition.between('sm', 'lg');
```

## API {#api}

<pre><code class="nohighlight">breakpoint(width?: number | string | HTMLElement | <a href="/zh-cn/docs/2/functions/jq">JQ</a>&lt;HTMLElement&gt;): <a href="#api-breakpointCondition">breakpointCondition</a></code></pre>

该函数返回 [`breakpointCondition`](#api-breakpointCondition) 对象。函数的行为取决于传入的参数类型：

- 如果不传入参数，将返回当前页面宽度的 `breakpointCondition` 对象。
- 如果传入数值，将返回指定宽度的 `breakpointCondition` 对象。
- 如果传入 CSS 选择器，将返回该选择器对应元素宽度的 `breakpointCondition` 对象。
- 如果传入 HTML 元素，将返回该元素宽度的 `breakpointCondition` 对象。
- 如果传入 [JQ 对象](/zh-cn/docs/2/functions/jq)，将返回该 JQ 对象中元素的宽度的 `breakpointCondition` 对象。

### Breakpoint {#api-Breakpoint}

```ts
type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
```

### breakpointCondition {#api-breakpointCondition}

<pre><code class="nohighlight">{
  /**
   * 当前宽度是否大于指定断点值
   */
  up(breakpoint: <a href="#api-Breakpoint">Breakpoint</a>): boolean;

  /**
   * 当前宽度是否小于指定断点值
   */
  down(breakpoint: <a href="#api-Breakpoint">Breakpoint</a>): boolean;

  /**
   * 当前宽度是否在指定断点值内
   */
  only(breakpoint: <a href="#api-Breakpoint">Breakpoint</a>): boolean;

  /**
   * 当前宽度是否不在指定断点值内
   */
  not(breakpoint: <a href="#api-Breakpoint">Breakpoint</a>): boolean;

  /**
   * 当前宽度是否在指定断点值之间
   */
  between(startBreakpoint: <a href="#api-Breakpoint">Breakpoint</a>, endBreakpoint: <a href="#api-Breakpoint">Breakpoint</a>): boolean;
}</code></pre>

# 图标组件库 @mdui/icons

`@mdui/icons` 是一个独立的包，它包含了所有的 Material Icons 图标，每个图标都是一个独立的文件。

你可以按需导入所需的图标，而不必导入整个图标库。因此，使用 `@mdui/icons` 相比于使用 [`<mdui-icon>`](/zh-cn/docs/2/components/icon) 组件，可以显著减少项目打包后的体积。

## 安装 {#installation}

你需要单独安装该包：

```bash
npm install @mdui/icons --save
```

## 使用 {#usage}

安装完成后，导入所需的图标文件：

```js
import '@mdui/icons/search.js';
```

然后，就可以使用对应的图标组件了：

```html
<mdui-icon-search></mdui-icon-search>
```
