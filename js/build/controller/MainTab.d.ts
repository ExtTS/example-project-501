declare namespace App.controller {
    interface MainTab extends Ext.app.Controller.Def {
        changed: boolean;
        tabView: App.view.layout.MainTab;
        setChanged(changed: boolean): void;
        getChanged(): boolean;
        init(config: object): void;
        save(): never;
    }
}
