/**
 * load jsx scripts dynamically
 */
class ScriptLoader {
    constructor() {
        this.cs = new CSInterface()
    }

    get cs() {
        return this._cs
    }

    set cs(val) {
        this._cs = val
    }

    /**
     * loadJSX - load a jsx file dynamically, this
     * will also load all of it's includes which is desirable
     *
     * @param  {type} fileName the file name
     * @return {type}          description
     */
    loadJSX(fileName) {
        var cs = this.cs
        var extensionRoot = cs.getSystemPath(SystemPath.EXTENSION) + "/host/";

        cs.evalScript('$.evalFile("' + extensionRoot + fileName + '")');
    }

    /**
     * evalScript -
     *
     * @param  {type} functionName the string name of the function to invoke
     * @param  {type} params       the params object
     * @return {Promise} a promise
     */
    evalScript(functionName, params) {
        var params_string = params ? JSON.stringify(params) : ''
        var eval_string = `${functionName}('${params_string}')`
        var that = this
        return new Promise(function(resolve, reject){
            that.cs.evalScript(eval_string, resolve)
        })

    }

}

var scriptLoader = new ScriptLoader()

export default scriptLoader
