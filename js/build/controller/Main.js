Ext.define('App.controller.Main', {
    extend: 'Ext.app.Controller',
    requires: [
        'App.controller.MainTab'
    ],
    statics: {
        myStaticMethod: function (myParam) {
            return myParam == null;
        }
    },
    config: {
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
    onLaunch: function (application) {
        var _this_1 = this;
        // load info for trees:
        Ext.data.JsonP.request({
            url: "https://trainings.tomflidr.cz/extjs/app/admin/portal/trees-services",
            success: function (treesServicesData) {
                _this_1.fillSideAccordionWithPanelTitles(treesServicesData);
            }
        });
        this.callParent(arguments);
    },
    fillSideAccordionWithPanelTitles: function (treesServicesData) {
        for (var i = 0; i < treesServicesData.length; i++) {
            var accWrapper = this.createSidePanelWrapper(treesServicesData, i);
            if (i === 0) {
                var tree = this.createSidePanelTree(treesServicesData[0].serviceUrl);
                console.log(tree);
                accWrapper.add(tree);
                accWrapper.firstExpanded = true;
            }
            else {
                accWrapper.firstExpanded = false;
            }
            this.treesWrappers.push(accWrapper);
        }
        this.getLeftAccPanel().add(this.treesWrappers);
    },
    createSidePanelWrapper: function (treesServicesData, iLocal) {
        var _this_1 = this;
        var handler = function (p, eOpts) {
            var accWrapper = _this_1.treesWrappers[iLocal];
            if (accWrapper.firstExpanded)
                return;
            var tree = _this_1.createSidePanelTree(treesServicesData[iLocal].serviceUrl);
            accWrapper.firstExpanded = true;
            accWrapper.add(tree);
        };
        return Ext.create('App.view.layout.SideTreePanel', {
            title: treesServicesData[iLocal].title,
            listeners: {
                expand: {
                    single: true,
                    fn: handler,
                    scope: this
                }
            }
        });
    },
    createSidePanelTree: function (url) {
        var _this_1 = this;
        var treeStore = Ext.create('App.store.AccordionTree', {
            nodeParam: 'id',
            proxy: Ext.create('App.store.AccordionTreeProxy', {
                url: url
            })
        });
        var treePanelListeners = {
            itemclick: function (_this, record, item, index, e, eOpts) {
                _this_1.createTabCtrlAndviewIfNecessary(record);
            }
        };
        var treePanel = Ext.create('App.view.layout.SideTree', {
            store: treeStore,
            listeners: treePanelListeners
        });
        return treePanel;
    },
    createTabCtrlAndviewIfNecessary: function (record) {
        var _this_1 = this;
        var recordData = record.getData();
        var id = recordData.id;
        if (this.mainTabs[id])
            return;
        var tabView;
        var ctrlCfg = {
            record: record
        };
        //var tabCtrl = Ext.create('App.controller.MainTab', ctrlCfg);
        //
        var tabCtrl = Ext.create(recordData.controller, ctrlCfg);
        tabCtrl.init(ctrlCfg);
        var tabViewListeners = {
            beforeclose: function (panel, eOpts) {
                if (panel.ctrl.getChanged()) {
                    if (!window.confirm("really?"))
                        return false; // prevents running close event
                }
                return true;
            },
            close: function (panel, eOpts) {
                // zrušit ctrl
                delete _this_1.mainTabs[id];
                Ext.destroy(tabCtrl);
            }
        };
        tabView = Ext.create(recordData.controller.replace('.controller.', '.view.'), {
            title: recordData.text,
            listeners: tabViewListeners
        });
        tabView.ctrl = tabCtrl;
        tabCtrl.tabView = tabView;
        var tabsPanel = this.getMainTabs();
        tabsPanel.add(tabView);
        tabsPanel.setActiveItem(tabView);
        tabCtrl.onLaunch(ctrlCfg);
        this.mainTabs[id] = tabCtrl;
    }
});
//# sourceMappingURL=Main.js.map