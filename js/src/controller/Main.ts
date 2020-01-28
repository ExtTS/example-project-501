declare namespace App.controller {
    interface Main extends Ext.app.Controller.Def {
        myStaticMethod? (myParam?: number): boolean;
        treesWrappers: App.view.layout.SideTree[];
        mainTabs: object;
        getLeftAccPanel (): Ext.panel.Panel;
        getMainTabs (): Ext.tab.Panel;
        fillSideAccordionWithPanelTitles(treesServicesData: App.controller.TreesServiceItem[]): void;
        createSidePanelWrapper (treesServicesData: TreesServiceItem[], iLocal:number): App.view.layout.SideTreePanel;
        createSidePanelTree (serviceUrl: string): App.view.layout.SideTree;
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

Ext.define('App.controller.Main', <App.controller.Main & object>{
    extend: 'Ext.app.Controller',
    requires: [
		'App.controller.MainTab'
    ],
    statics: {
        myStaticMethod: (myParam?: number) =>{
            return myParam == null;
        }
    },
    config: <Ext.app.Controller.Cfg>{
        refs: [{
            ref: 'leftAccPanel',
            selector: 'panel[cls=left-accordion]'
        }, {
        	ref: 'mainTabs',
        	selector: 'tabpanel[cls=main-tabs]'
        }]
    },
    init: function () {
        this.treesWrappers = [];
        this.mainTabs = {};
        this.callParent(arguments);
    },
    onLaunch: function (application: Ext.app.Application) {
        // load info for trees:
        Ext.data.JsonP.request(<Ext.Ajax.methodParams.request.Options>{
            url: "https://trainings.tomflidr.cz/extjs/app/admin/portal/trees-services",
            success: (treesServicesData: App.controller.TreesServiceItem[]) => {
                this.fillSideAccordionWithPanelTitles(treesServicesData);
            }
        });
        this.callParent(arguments);
    },
    fillSideAccordionWithPanelTitles: function (treesServicesData: App.controller.TreesServiceItem[]) {
    	for (var i = 0; i < treesServicesData.length; i++) {
    		var accWrapper = this.createSidePanelWrapper(treesServicesData, i);
    		if (i === 0) {
    			var tree:App.view.layout.SideTree = this.createSidePanelTree(
                    treesServicesData[0].serviceUrl
                );
    			console.log(tree);
    			accWrapper.add(tree);
    			accWrapper.firstExpanded = true;
    		} else {
    			accWrapper.firstExpanded = false;
    		}
    		this.treesWrappers.push(accWrapper);
    	}
    	this.getLeftAccPanel().add(this.treesWrappers);
    },
    createSidePanelWrapper: function (treesServicesData: App.controller.TreesServiceItem[], iLocal: number) {
        var handler = (p: Ext.panel.Panel, eOpts: object) => {
            var accWrapper = this.treesWrappers[iLocal];
            if (accWrapper.firstExpanded) return;
            var tree:App.view.layout.SideTree = this.createSidePanelTree(
                treesServicesData[iLocal].serviceUrl
            );
            accWrapper.firstExpanded = true;
            accWrapper.add(tree);
        };
    	return Ext.create('App.view.layout.SideTreePanel', {
    		title: treesServicesData[iLocal].title,
    		listeners: <Ext.panel.Panel.Events>{
    			expand: <Ext.base.EventConfig>{
    				single: true,
    				fn: handler,
					scope: this
    			}
    		}
    	});
    },
    createSidePanelTree: function (url) {
    	var treeStore = Ext.create('App.store.AccordionTree', {
    		nodeParam: 'id',
    		proxy: Ext.create('App.store.AccordionTreeProxy', {
    			url: url
    		})
        });
        var treePanelListeners = <Ext.tree.Panel.Events>{
            itemclick: (_this: Ext.view.View, record: Ext.data.Model, item: HTMLElement, index: number, e: Ext.event.Event, eOpts: object) => {
                this.createTabCtrlAndviewIfNecessary(record);
            }
        };
    	var treePanel:App.view.layout.SideTree = Ext.create('App.view.layout.SideTree', <Ext.tree.Panel.Cfg>{
            store: treeStore,
            listeners: treePanelListeners
    	}) as App.view.layout.SideTree;
    	return treePanel;
    },
    createTabCtrlAndviewIfNecessary: function (record: Ext.data.Model) {
        var recordData:App.controller.RecordData = record.getData() as App.controller.RecordData;
    	var id = recordData.id;
    	if (this.mainTabs[id]) return;

    	var tabView:App.view.layout.MainTab;
    	var ctrlCfg:Ext.app.Application = <Ext.app.Application>{
    		record: record
    	};
    	
    	//var tabCtrl = Ext.create('App.controller.MainTab', ctrlCfg);
    	//
    	var tabCtrl:App.controller.MainTab = Ext.create(
            recordData.controller, ctrlCfg
        ) as App.controller.MainTab;
        tabCtrl.init(ctrlCfg);
        var tabViewListeners = <Ext.panel.Panel.Events>{
            beforeclose: (panel: Ext.panel.Panel & App.view.layout.MainTab, eOpts: object): boolean => {
                if (panel.ctrl.getChanged()) {
                    if (!window.confirm("really?")) 
                        return false; // prevents running close event
                }
                return true;
            },
            close: (panel: Ext.panel.Panel, eOpts: object) => {
                // zrušit ctrl
                delete this.mainTabs[id];
                Ext.destroy(tabCtrl);
            }
        };
    	tabView = Ext.create(
			recordData.controller.replace('.controller.', '.view.'), {
    			title: recordData.text,
    			listeners: tabViewListeners
			}
		) as App.view.layout.MainTab;
    	tabView.ctrl = tabCtrl;
    	tabCtrl.tabView = tabView;

    	var tabsPanel = this.getMainTabs();
    	tabsPanel.add(tabView);
    	tabsPanel.setActiveItem(tabView);

    	tabCtrl.onLaunch(ctrlCfg);

    	this.mainTabs[id] = tabCtrl;
    }
});