define(["require", "exports", "libs/ClassA"], function (require, exports, ClassA_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // To debugg in browser, change disableCaching to false:
    Ext.Loader.setConfig({
        disableCaching: !true
    });
    ClassA_1.ClassA.Test();
    // Creating an application:
    Ext.application({
        extend: 'Ext.app.Application',
        name: 'App',
        appFolder: 'js/build',
        autoCreateViewport: true,
        requires: [
            'App.libs.AjaxHandlers'
        ],
        controllers: [
            'Main'
        ],
        launch: function () {
            App.libs.AjaxHandlers.Init();
            return true;
        }
    });
});
//# sourceMappingURL=app.js.map