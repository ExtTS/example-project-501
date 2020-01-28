declare namespace App.controller {
    interface Main extends Ext.app.Controller.Def {
        myStaticMethod?(myParam?: number): boolean;
        treesWrappers: App.view.layout.SideTree[];
        mainTabs: object;
        getLeftAccPanel(): Ext.panel.Panel;
        getMainTabs(): Ext.tab.Panel;
        fillSideAccordionWithPanelTitles(treesServicesData: App.controller.TreesServiceItem[]): void;
        createSidePanelWrapper(treesServicesData: TreesServiceItem[], iLocal: number): App.view.layout.SideTreePanel;
        createSidePanelTree(serviceUrl: string): App.view.layout.SideTree;
        createTabCtrlAndviewIfNecessary(record: Ext.data.Model): void;
    }
    interface TreesServiceItem {
        serviceUrl: string;
        title: string;
    }
    interface RecordData {
        id: number;
        controller: string;
        text: string;
    }
}
