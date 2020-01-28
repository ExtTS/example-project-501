Ext.define('App.view.layout.SideTreePanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.side-tree-panel',
    requires: [
        'App.view.layout.SideTree'
    ],
    layout: 'fit',
    //title: 'Documents', // bude naplněn z controlleru
    items: [] // musí být pole, abych mohl volat medu panel.add()
});
//# sourceMappingURL=SideTreePanel.js.map