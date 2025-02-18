import XMLView from "sap/ui/core/mvc/XMLView";

XMLView.create({
    viewName: "ui5-ts-demo.view.App"
}).then(function (view) {
    view.placeAt("content");
});