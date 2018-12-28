/**
 * @author Tomer Riko Shalev
 */

import LogManager from './LogManager.js'

export default class DataManagers {
    _manager_log = undefined

    constructor() {

    }

    init() {
        this._manager_log = new LogManager()

        this._manager_log.init()
    }

    /**
     * get log - the log manager
     *
     * @return {LogManager} the log manager
     */
    get log() {
        return this._manager_log
    }

}
