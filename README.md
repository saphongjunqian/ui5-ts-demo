# ui5-ts-demo

This repository is a learning track of [UI5 Walkthrough Tutorial (TypeScript)](https://ui5.sap.com/#/topic/dad1905a07f849ce9c509721317d38d8)

# Step 1. Hello World!

[Documentation](https://ui5.sap.com/#/topic/c20489e2a59d46e99c83f0510392cb6c)

Key takeaway:   
1. Install UI5 CLI (both globally and devdependency).
```
npm install --global @ui5/cli
```

2. Initial the UI5, generate a `ui5.yaml` file.
```
ui5 init
```

# Step 2. Bootstrap

[Bootstrap](https://ui5.sap.com/#/topic/32b14d88bd484cd7b941aae37180f732)

This repo use SAPUI5 instead of OpenUI5.

Key takeaway:   

1. Install UI5 middlewares
```
npm install ui5-middleware-livereload ui5-middleware-serveframework ui5-tooling-transpile --save-dev
```

2. Specify the UI5 framework
```
ui5 use SAPUI5
```

3. Add UI5 libraries
```
ui5 add sap.ui.core themelib_sap_horizon
```

4. Update ui5.yaml

```yml
builder:
  customTasks:
  - name: ui5-tooling-transpile-task
    afterTask: replaceVersion
server:
  customMiddleware:
  - name: ui5-tooling-transpile-middleware
    afterMiddleware: compression
  - name: ui5-middleware-serveframework
    afterMiddleware: compression
  - name: ui5-middleware-livereload
    afterMiddleware: compression
```

# Step 3. Control

[Controls](https://ui5.sap.com/#/topic/0feb70c39c5e4074893c294667b3f36b)

Key takeaway:

1. Using ID to specify the body tag.

```html
<body class="sapUiBody" id="content">
</body>
```

2. Add `sap.m` library:

```
ui5 add sap.m
```

3. Add controls into the view.

```typescript
import Text from "sap/m/Text";

new Text({
    text: "Hello World"
}).placeAt("content");
```
