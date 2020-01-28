Ext.define('App.libs.AjaxHandlers', {
    statics: {
        Init: function () {
            Ext.Ajax.on('requestexception', function (conn, response, options, eOpts) {
                //
            });
            window.onerror = function (message, source, lineno, colno, error) {
                // error.stack
                // location.href
                // navigator.userAgent
                // navigator.platform
            };
        }
    }
});
//# sourceMappingURL=AjaxHandlers.js.map