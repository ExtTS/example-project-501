declare namespace App.controller {
    interface MainTab extends Ext.app.Controller.Def {
		changed: boolean;
		tabView: App.view.layout.MainTab;
		setChanged (changed: boolean): void;
		getChanged (): boolean;
		init (config: object): void;
		save (): never;
    }
}

Ext.define('App.controller.MainTab', <App.controller.MainTab>{
    extend: 'Ext.app.ViewController',
    config: {
		// record z Main ctrl
	},
	changed: false,
    onLaunch: function (application: Ext.app.Application) {
    	this.callParent(arguments);
    },
    setChanged: function (changed?: boolean) {
    	if (!this.changed && changed) {
			this.tabView.setTitle('*&nbsp;' + this.tabView.getTitle());
    	}
    	this.changed = changed || true;
    },
    getChanged: function () {
    	return this.changed || false;
    },

	save: function () {
		throw new Error("not implemented");
	}
});
