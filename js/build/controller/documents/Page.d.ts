declare namespace App.controller.documents {
    interface Page extends App.controller.MainTab {
        model: App.model.Page;
        form: Ext.form.Basic;
        init(cfg: object): void;
        save(): never;
    }
}
