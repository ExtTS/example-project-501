declare namespace App.view.layout {
    interface SideTreePanel extends Ext.panel.Panel.Def {
        firstExpanded: boolean;
    }
}

Ext.define('App.view.layout.SideTreePanel', <App.view.layout.SideTreePanel | Ext.layout.FitLayout>{
    extend: 'Ext.panel.Panel',
    alias: 'widget.side-tree-panel',

    requires: [
        'App.view.layout.SideTree'
    ],

	layout:'fit',

	//title: 'Documents', // bude naplněn z controlleru

    items: [] // musí být pole, abych mohl volat medu panel.add()
});
