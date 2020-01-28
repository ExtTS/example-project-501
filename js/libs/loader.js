Ext.Loader.setConfig({
    enabled: true,
    paths: {
        libs : 'js/build/libs'
    }
});





(function(){
    var DefineLoaderByExt = function () {
        this.exports = {};
        this.loadedScripts = {};
        this.seqDependencies = [];
        this.allCallsDependencies = {};
        this.allCallbacks = {};
        this.allCallbackArgs = {};
        this.globalCallId = 0;
        this.documentHead = document.getElementsByTagName('head')[0];
    };
    DefineLoaderByExt.prototype = {
        require: function () {
            //console.log("require", arguments);
        },
        define: function (requires, callback) {
            var extLoaderRequires = [],
                loadedCbArgs = [], 
                callId = this.globalCallId,
                callIdKey = 'call' + callId;
            this.globalCallId += 1;
            this.completeRequiresAndCallbackArgs(
                requires, extLoaderRequires, loadedCbArgs
            );
            this.seqDependencies.push(extLoaderRequires);
            this.allCallsDependencies[callIdKey] = extLoaderRequires;
            if (extLoaderRequires.length > 0) {
                this.allCallbacks[callIdKey] = callback;
                this.allCallbackArgs[callIdKey] = loadedCbArgs;
                setTimeout(this.loadDependencies.bind(this, callId, extLoaderRequires), 10);
            } else {
                callback.apply(null, loadedCbArgs);
            }
        },
        completeRequiresAndCallbackArgs: function (requires, extLoaderRequires, loadedCbArgs) {
            var requireItem = '',
                requireItemBegin = '',
                firstSlashPos = 0,
                extPaths = Ext.Loader.getConfig().paths;
            for (var i = 0, l = requires.length; i < l; i += 1) {
                requireItem = requires[i];
                if (requireItem == 'require') {
                    loadedCbArgs.push(this.require.bind(this));
                    continue;
                }
                if (requireItem == 'exports') {
                    loadedCbArgs.push(this.exports);
                    continue;
                }
                firstSlashPos = requireItem.indexOf('/');
                if (firstSlashPos !== -1) {
                    requireItemBegin = requireItem.substr(0, firstSlashPos);
                    if (extPaths[requireItemBegin])
                        requireItem = extPaths[requireItemBegin] + 
                            requireItem.substr(requireItemBegin.length)
                }
                extLoaderRequires.push(
                    requireItem
                );
                loadedCbArgs.push(this.exports);
            }
        },
        loadDependencies: function (callId, extLoaderRequires) {
            for (var i = 0, l = extLoaderRequires.length; i < l; i += 1) {
                (function(scriptUrl){
                    this.loadedScripts[scriptUrl] = false;
                    this.injectScriptElement(
                        scriptUrl + '.js',
                        function () {
                            this.onDependencyLoaded(scriptUrl, callId);
                        },
                        function () {
                            this.onDependencyLoaded(scriptUrl, callId);
                        },
                    );
                }.bind(this))(extLoaderRequires[i]);
            }
        },
        injectScriptElement: function(url, onLoad, onError) {
            var script = document.createElement('script'),
                dispatched = false,
                onLoadFn = function() {
                    if(!dispatched) {
                        dispatched = true;
                        script.onload = script.onreadystatechange = script.onerror = null;
                        onLoad.call(this);
                    }
                }.bind(this),
                onErrorFn = function(arg) {
                    onError.call(this);
                }.bind(this);
            script.type = 'text/javascript';
            script.onerror = onErrorFn;
            if ('addEventListener' in script ) {
                script.onload = onLoadFn;
            } else if ('readyState' in script) {// for <IE9 Compatability
                script.onreadystatechange = function() {
                    if (this.readyState == 'loaded' || this.readyState == 'complete' ) {
                        onLoadFn();
                    }
                };
            } else {
                 script.onload = onLoadFn;
            }
            script.src = url;
            this.documentHead.appendChild(script);
            return script;
        },
        onDependencyLoaded: function (scriptUrl, callId) {
            var callDepsKeys = Object.keys(this.allCallsDependencies).reverse(),
                allCallDependenciesItem = [],
                callDepKey = '',
                callDepId = 0;
            this.loadedScripts[scriptUrl] = true;
            this.onDependencyLoadedCallbackIfNecessary(callId);
            for (var i = 0, l = callDepsKeys.length; i < l; i += 1) {
                callDepKey = callDepsKeys[i];
                callDepId = parseInt(callDepKey.substr(4), 10);
                if (callDepId === callId) continue;
                allCallDependenciesItem = this.allCallsDependencies['call' + callDepId];
                if (allCallDependenciesItem.indexOf(scriptUrl) !== -1) 
                    this.onDependencyLoadedCallbackIfNecessary(callDepId);
            }
        },
        onDependencyLoadedCallbackIfNecessary: function (callId) {
            var loadedDependenciesCount = 0;
            var callIdKey = 'call' + callId.toString();
            var callback = this.allCallbacks[callIdKey];
            var cbArgs = this.allCallbackArgs[callIdKey];
            var callDependencies = this.getDependenciesByCallIdKey(callIdKey);
            for (var i = 0, l = callDependencies.length; i < l; i += 1) 
                if (this.loadedScripts[callDependencies[i]])
                    loadedDependenciesCount += 1;
            if (loadedDependenciesCount === callDependencies.length) {
                delete this.allCallsDependencies[callId];
                delete this.allCallbacks[callIdKey];
                delete this.allCallbackArgs[callIdKey];
                callback.apply(null, cbArgs);
            }
        },
        getDependenciesByCallIdKey: function (callIdKey) {
            var callDependencies = this.allCallsDependencies[callIdKey],
                lastSeqDependenciesRec = [],
                seqDependenciesLength = this.seqDependencies.length,
                lastSeqDependencyItem = '';
            if (seqDependenciesLength > 0) {
                lastSeqDependenciesRec = this.seqDependencies[seqDependenciesLength - 1];
                if (lastSeqDependenciesRec.length > 0) {
                    for (var i = 0, l = lastSeqDependenciesRec.length; i < l; i += 1) {
                        lastSeqDependencyItem = lastSeqDependenciesRec[i];
                        if (callDependencies.indexOf(lastSeqDependencyItem) == -1)
                            callDependencies.push(lastSeqDependencyItem);
                    }
                }
                this.seqDependencies.splice(seqDependenciesLength - 1, 1);
            }
            return callDependencies;
        }
    }
    DefineLoaderByExt.instance = new DefineLoaderByExt();
    window.define = DefineLoaderByExt.instance.define.bind(DefineLoaderByExt.instance);
})();