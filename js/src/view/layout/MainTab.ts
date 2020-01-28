declare namespace App.view.layout {
    interface MainTab extends Ext.panel.Panel.Def {
        ctrl: App.controller.MainTab;
        setTitle (title: object | string): void;
        getTitle (): string;
        save (): void;
    }
}

Ext.define('App.view.layout.MainTab', <App.view.layout.MainTab & Ext.panel.Panel.Cfg>{
    extend: 'Ext.panel.Panel',
    alias: 'widget.main-tab',
    config: <Ext.panel.Panel.Cfg>{
        closable: true,
        title: '',
        html: 'content'
    },
    listeners: <Ext.panel.Panel.Events>{
        //beforeclose
        //close
    },
    initComponent: function () {
    	this.tbar = [{
    		text: 'save',
    		handler: () => {
    			this.ctrl.save();
    		}
    	}]
    	this.callParent(arguments);
    },
    save: function () {
        // TODO
    },
});
