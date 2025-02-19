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

4. Add the bootstrap logic with script in *index.html*.

```html
<script
  id="sap-ui-bootstrap"
  src="resources/sap-ui-core.js"
  data-sap-ui-theme="sap_horizon"
  data-sap-ui-compat-version="edge"
  data-sap-ui-async="true"
  data-sap-ui-on-init="module:ui5-ts-demo/index"
  data-sap-ui-resource-roots='{
    "ui5-ts-demo": "./"
  }'>
</script>
```

5. Update ui5.yaml

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

3. Add controls into the view with *index.ts*.

```typescript
import Text from "sap/m/Text";

new Text({
    text: "Hello World"
}).placeAt("content");
```

# Step 4. Add View and Controllers

[Views](https://ui5.sap.com/#/topic/6c66ed843c5e4b18aacf6c5e52246e4d)

[Controller](https://ui5.sap.com/#/topic/e5c58fe81fed4d31988be6899c1188e7)

[Modules](https://ui5.sap.com/#/topic/3510034eb6274fd8a8fb7d65c2f1aa46)


Key takeaways:

1. Views

View names are **capitalized**;  
All views are stored in the *view* folder;   
Names of XML views always end with *.view.xml;   
XML namespaces are declared in the root element of the view. As a general rule, the default XML namespace is sap.m;    
Other XML namespaces use the last part of the SAP namespace as alias (for example, mvc for sap.ui.core.mvc);   

2. Controllers

Controller names are **capitalized**;     
All controllers are stored in the *controller* folder;    
Controllers carry the same name as the related view (if there is a 1:1 relationship);   
Event handlers are prefixed with on;    
Controller names always end with *.controller.js (in JavaScript) or *.controller.ts (in TypeScript);    


3. Linkage between View and Controllers

Normally, it is defined by the **controllerName**.

```xml
<mvc:View
   xmlns="sap.m"
   controllerName="ui5-ts-demo.controller.App">
```

4. Using the MessageToast via Controller

```typescript
import MessageToast from "sap/m/MessageToast";
```

5. Initialize the app by creating the view in *index.ts*:

```typescript
import XMLView from "sap/ui/core/mvc/XMLView";

XMLView.create({
    viewName: "ui5.walkthrough.view.App"
}).then(function (view) {
    view.placeAt("content");
});
```

# Step 7. JSON model

[JSON model](https://ui5.sap.com/#/topic/cfbbeab4e4b74124abac98ce268a0aba)

[Translatable Texts](https://ui5.sap.com/#/topic/4dcf52e0ca3048e3a08bfdccfc440442)

Key takeaways:    

1. Create JSONModel in the controller
```typescript
const dataModel = new JSONModel(data);
```

2. Using `setModel` to bind the model to view

```typescript
this.getView()?.setModel(dataModel);
```

3. Translatable text located in `webapp/i18n/i18n.properties`

```
showHelloButtonText=Say Hello
helloMsg=Hello {0}
```
4. Using `ResourceModel` for i18n

```typescript
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
```

And also use `setModel` to bind the resourse model:

```typescript
// set i18n model on view
const i18nModel = new ResourceModel({
    bundleName: "ui5-ts-demo.i18n.i18n"
});
this.getView()?.setModel(i18nModel, "i18n");
```

The bundle name **ui5-ts-demo.i18n.i18n** consists of the application namespace **ui5-ts-demo** (the application root as defined in the *index.html*), the resource folder name **i18n**, and finally the base file name **i18n** *without extension*. The SAPUI5 runtime calculates the correct path to the resource, to which *.properties* is then appended.

5. Read message for i18n Model

```typescript
// read msg from i18n model
const recipient = (this.getView()?.getModel() as JSONModel)?.getProperty("/recipient/name");
const resourceBundle = (this.getView()?.getModel("i18n") as ResourceModel)?.getResourceBundle() as ResourceBundle;
const msg = resourceBundle.getText("helloMsg", [recipient]) || "no text defined";
```

# Step 9. Component Configuration

[Component Configuration](https://ui5.sap.com/#/topic/f9d0e2fcd2134ff7923fcdcba8bded96)

Key takeaway:    
1. File *component.ts* is known as **component controller**. A **component** is organized in a unique namespace (which is synonymous with the application namespace). All required and optional resources of the component have to be organized in the namespace of the component.

2. Normally Component defined to extend UIComponent with additional metadata. Normally we specify the interface *IAsyncContentCreation* (see codes below), it allows the component to be generated asynchronously , which in turn sets the component's rootView and router configuration to async. 

3. When the *component* is instantiated, SAPUI5 automatically calls the **init** function (ensure call to the **super.init**) of the component. Finanlly it call the **createContent** hook method of the component which creates the content (UI control tree) of this component.

```typescript
export default class Component extends UIComponent {
  public static metadata = {
    "interfaces": ["sap.ui.core.IAsyncContentCreation"]
  };
  init(): void {
    // call the init function of the parent
    super.init();
    // Other codes...
  }
  createContent(): Control | Promise<Control | null> | null {
    return XMLView.create({
      "viewName": "ui5-test-demo.view.App",
      "id": "app"
    });
  };
}
```

4. With the **Component** class, the controller class now changed to read the Model from the component via `this.getView().getModel()`:  

```typescript
onShowHello(): void {
  // read msg from i18n model
  const recipient = (<JSONModel> this.getView()?.getModel())?.getProperty("/recipient/name");
  const resourceBundle = <ResourceBundle> (<ResourceModel> this.getView()?.getModel("i18n"))?.getResourceBundle();
  const msg = resourceBundle.getText("helloMsg", [recipient]) || "no text defined";
}
```

5. With the **Component**, the view will be created by Component class. So the initialize logic (*index.ts*) shall use Component instead of create View manually.

```typescript
import ComponentContainer from "sap/ui/core/ComponentContainer";

new ComponentContainer({
    id: "container",
    name: "ui5-test-demo",
    settings: {
        id: "walkthrough"
    },
    autoPrefixId: true,
    async: true
}).placeAt("content");
```

6. The *component* is named *Component.ts*. Together with all UI assets of the app, the component is located in the *webapp* folder. The `index.html` file is located in the *webapp* folder if it is used productively.

# Step 10. Descriptor for Applications 

[Descriptor for Applications](https://ui5.sap.com/#/topic/2a46b7567a73457c81b1b67741146063)


Key takeaways:
1. All application-specific configuration settings will be put in a separate descriptor file called *manifest.json*.
2. The manifest file is used by SAPUI5 to instantiate the component, and it is suit for launchpad for navigation purpose.
Namespace `sap.app` defines the application information.
Namespace `sap.ui` used for UI-specific attributes, the main attribtues are `technology` and `deviceType (mandatory)`.
Namespace `sap.ui5` addes SAPUI5-specific configuration parameters. The most important parameters are `dependencies (mandatory)` (including `minUI5Version` and `libs`), `rootView`, `models`.
3. The *component* class will specify the metadata and remove ResourceModel model and createContent method:
```javascript
export default class Component extends UIComponent {
  public static metadata = {
    "interfaces": ["sap.ui.core.IAsyncContentCreation"],
    "manifest": "json" 
  };
}
```
4. Change the script in *index.html* to suit *manifest*.

```html
	<script
		id="sap-ui-bootstrap"
		src="resources/sap-ui-core.js"
		data-sap-ui-theme="sap_horizon"
		data-sap-ui-compat-version="edge"
		data-sap-ui-async="true"
		data-sap-ui-on-init="module:sap/ui/core/ComponentSupport"
		data-sap-ui-resource-roots='{
			"ui5.walkthrough": "./"
		}'>
	</script>
</head>
<body class="sapUiBody" id="content">
	<div data-sap-ui-component data-name="ui5.walkthrough" data-id="container" data-settings='{"id" : "walkthrough"}'></div>
</body>
```

# Step 11. Pages and Panels, Shell, Margins and Paddings

[Pages and Panels](https://ui5.sap.com/#/topic/feed6135dbcf4ba38bdd5a3c68fbedcc)

[Shell](https://ui5.sap.com/#/topic/4af44cb310124baa8d38c23a909ef5a2)

[Margins and Paddings](https://ui5.sap.com/#/topic/5826c0c2e47c4507ba0eeb26332c33a2)

[Customer CSS and styles](https://ui5.sap.com/#/topic/4cc841e27fd44549b9d108ed7c333195)

Key takeaways:

1. A *shell* control as container and use it as new root element. The *shell* takes care of visual adaptation of the application to the device's screen size by introducing a so-called letterbox on desktop screens.
2. The HTML tag hierarchy:   
```html
<Shell>
  <App>
    <pages>
      <Page title="{i18n>homePageTitle}">
        <content>
          <Panel headerText="{i18n>helloPanelTitle}">
            <content>
            </content>
          </Panel>
        </content>
      </Page>
    </pages>
  </App>
</Shell>
```
3. Instead of manually adding CSS to the controls, UI5 uses the standard classes.

Some useful pre-defined CSS class:   
- *sapUiResponsiveMargin* will add some space around the pane/control.
- *sapUiSmallMarginEnd* will add small space at the end of the control.
- *sapUiSmallMargin* will add small space around the panel/control.

4. For customer CSS, defined in a `css` folder add then add it to `manifest.json` under `resources` node:

```json
 "sap.ui5": {
	...	
	"rootView": {
	  ...
	},
	"resources": {
	  "css": [
		{
		  "uri": "css/style.css"
		}
	  ]
	}
}
```

# Step 15. Nested Views, Dialogs and Fragments, and ICONs

[Nested Views](https://ui5.sap.com/#/topic/9bbbfaa828a14fee8ca9ac31464cc073)

[Dialogs and Fragments](https://ui5.sap.com/#/topic/4b2e306f4bcd4777b068e5a99e007e85) 

[Fragment Callbacks](https://ui5.sap.com/#/topic/f030afccc30f461c9660724561cb7264)

[Icons](https://ui5.sap.com/#/topic/49b1ac6f768947769d3daa9baf807f31)


Key takeaways:
1. Using following XML syntax to embed one view into another.

```xml
<mvc:XMLView viewName="ui5-ts-demo.view.MyPanel"/>
```
2. The linkage between controller and view is `controllerName`.
3. Fragments are **light-weight** UI parts which can be reused *but do not have any controller*. A fragment can consist of 1 to n controls. At runtime, fragments placed in a view behave similiar to 'normal' view content which means the controls inside the fragment will be included into view's DOM when rendered. 
4. The callback function in the fragment will be defined the controller who calls *loadFragment*.
5. Icon in the button can be used with syntax *icon="sap-icon://world"*.
6. Another ICON usage is added to Dialog:
```xml
<Dialog>
  <content>
    <core:Icon src="sap-icon://hello-world" size="8rem" class="sapUiMediumMargin"/>
  </content>
</Dialog>
```

