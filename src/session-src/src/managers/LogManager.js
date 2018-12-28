/**
 * @author Tomer Riko Shalev
 */


/**
 * log management
 *
 */
export default class LogManager {
    _logs = []

    constructor() {

    }

    init() {
        this.log('initing...')

        var log = console.log

        if(console === undefined)
            return
        var that = this
        // override the console.log method
        console.log = function () {
            // log.call(this, 'My Console!!!')
            // log.apply(this, Array.prototype.slice.call(arguments))
            // retain older console.log functionality
            log.call(this, ...arguments)
            // save the log internally
            that.addRawLog(...arguments)
        }

    }

    /**
     * addLog - collect log
     *
     * @param  {Object} val anything
     *
     */
    addRawLog(val) {
        this._logs.push(val)
    }

    get rawLogs() {
        return this._logs
    }

    get name() {
        return 'LogManager:: '
    }

    log(val) {
        return `${this.name} ${val}`
    }
}
