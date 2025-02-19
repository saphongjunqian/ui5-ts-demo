import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Dialog from "sap/m/Dialog";


/**
 * @namespace ui5-ts-demo.controller
 */
export default class MyPanel extends Controller {
    private dialog: Dialog | undefined;

    onShowHello(): void {
        // read msg from i18n model
        const recipient = (<JSONModel> this.getView()?.getModel())?.getProperty("/recipient/name");
        const resourceBundle = <ResourceBundle> (<ResourceModel> this.getView()?.getModel("i18n"))?.getResourceBundle();
        const msg = resourceBundle.getText("helloMsg", [recipient]) || "no text defined";
        // show message
        alert(msg);
    }

    onShowHelloMessageToast(): void {
        // read msg from i18n model
        const recipient = (<JSONModel> this.getView()?.getModel())?.getProperty("/recipient/name");
        const resourceBundle = <ResourceBundle> (<ResourceModel> this.getView()?.getModel("i18n"))?.getResourceBundle();
        const msg = resourceBundle.getText("helloMsg", [recipient]) || "no text defined";
        // show message
        MessageToast.show(msg);
    }

    async onOpenDialog(): Promise<void> {
        this.dialog ??= await this.loadFragment({
           name: "ui5-ts-demo.view.HelloDialog"
        }) as Dialog;
        this.dialog.open();
    }
    
    onCloseDialog(): void {
        console.log('Enerting onCloseDialog');
        // note: We don't need to chain to the pDialog promise, since this event-handler
        // is only called from within the loaded dialog itself.
        (this.byId("helloDialog") as Dialog)?.close();
    }
};
