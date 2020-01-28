declare namespace App.libs {
	var AjaxHandlers:App.libs.AjaxHandlers;
    interface AjaxHandlers extends Ext.Class.Cfg {
        Init? (): void;
    }
}

Ext.define('App.libs.AjaxHandlers', <Ext.Class.Cfg>{
	statics: {
		Init: function ():void {
			Ext.Ajax.on('requestexception', function (conn:Ext.data.Connection, response:Object, options: Object, eOpts : Object) {
				//
			});
			window.onerror = function (message, source, lineno, colno, error) {
				// error.stack
				// location.href
				// navigator.userAgent
				// navigator.platform
			}
		}
	}
});
