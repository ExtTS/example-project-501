declare namespace App.view.layout {
    interface MainTab extends Ext.panel.Panel.Def {
        ctrl: App.controller.MainTab;
        setTitle(title: object | string): void;
        getTitle(): string;
        save(): void;
    }
}
