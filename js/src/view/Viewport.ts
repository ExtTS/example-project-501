Ext.define('App.view.Viewport', <Ext.container.Viewport.Def>{
	extend: 'Ext.Viewport',
    requires: [
		'App.view.layout.MainTab',
        'App.view.layout.SideTreePanel'
	],
	config: <Ext.container.Viewport.Cfg | Ext.layout.FitLayout>{
		layout: 'fit',
		style: {
			margin: '0 0 0 10px',
		}
	},
    items: <Ext.container.Container.Cfg | Ext.layout.BorderLayout>{
    	xtype: 'container',
		layout: 'border',
		id: 'cont',
		items: [
			<Ext.tab.Panel.Cfg>{
				id: 'tabs',
				xtype: 'tabpanel',
				cls: 'main-tabs',
				region: 'center',
				items: [] // will be completed in main ctrl
			}, 
			<Ext.panel.Panel.Cfg | Ext.layout.AccordionLayout>{
				id: 'left',
				xtype: 'panel',
				layout: 'accordion',
				cls: 'left-accordion',
				region: 'west',
				minWidth: 50,
				maxWidth: window.innerWidth / 2,
				width: 250,
				collapsible: true,
				items: [
					/*{
						xtype: 'side-tree-panel'
					}, {
						xtype: 'side-tree-panel'
					}, {
						xtype: 'side-tree-panel'
					}*/
				]
			}
		]
    }
});