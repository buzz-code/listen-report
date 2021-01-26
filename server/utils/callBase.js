export class CallListHandler {
    static calls = {};
    static getCallById(callId, callType) {
        if (!CallListHandler.calls[callId]) {
            CallListHandler.calls[callId] = new callType(callId);
        }
        return CallListHandler.calls[callId];
    }
    static deleteCallById(callId) {
        delete CallListHandler.calls[callId];
    }
}

export class CallBase {
    constructor(callId) {
        this.callId = callId;
        this.params = {};
        this.res = null;
        this.waitForResponse().then(this.start.bind(this))
    }
    async start() {
        try {
            await this.send(this.read({ type: 'text', text: 'הקש 10' }, 'number'));
            await this.send(this.id_list_message({ type: 'text', text: 'הקשת ' + this.params.number }), this.hangup());
        }
        catch (e) {
            if (e) {
                console.log('catch yemot exeption', e);
            }
        } finally {
            this.end();
        }
    }
    async end() {
        console.log('end call', this.params);
        CallListHandler.deleteCallById(this.callId);
        if (!this.res._headerSent)
            this.res.send(this.hangup())
    }
    send(message) {
        if (!this.res)
            throw 'no res found';

        this.res.send(Array.prototype.join.call(arguments, '&'));
        return this.waitForResponse();
    }
    waitForResponse() {
        return new Promise((resolve, reject) => {
            this.action = {
                resolve,
                reject
            };
        });
    }
    async process(params, res) {
        Object.assign(this.params, params);
        this.res = res;
        if (params.hangup === 'yes') {
            this.action.reject();
        } else {
            this.action.resolve();
        }
    }

    #getMessage(message) {
        if (Array.isArray(message))
            return message.map(this.#getMessage.bind(this)).join('.');

        return `${messageType[message.type]}-${message.text}`;
    }
    #getReadDef(param, mode, options) {
        let res = [param];
        switch (mode) {
            case 'tap':
                res.push(options.re_enter_if_exists ? "yes" : "no");
                res.push(options.max || "*");
                res.push(options.min || "1");
                res.push(options.sec_wait || 7);
                res.push(options.play_ok_mode || "No");
                res.push(options.block_asterisk ? "yes" : "no");
                res.push(options.block_zero ? "yes" : "no");
                res.push(options.replace_char || "");
                res.push(options.digits_allowed ? options.digits_allowed.join(".") : ""); // [1, 14]
                res.push(options.amount_attempts || "");
                res.push(options.read_none ? "Ok" : "no");
                res.push(options.read_none_var || "");
                break;

            case "record":
                res.push(options.re_enter_if_exists ? "yes" : "no");
                res.push("record");
                res.push(options.path || "");
                res.push(options.file_name || "");
                res.push(options.record_ok === false ? "no" : "yes");
                res.push(options.record_hangup ? "yes" : "no");
                res.push(options.record_attach ? "yes" : "no");
                res.push(options.lenght_min || "");
                res.push(options.lenght_max || "");
                break;

            default:
                break;
        }
        return res.join(',');
    }

    read(message, param, mode = 'tap', options = {}) {
        return `read=${this.#getMessage(message)}=${this.#getReadDef(param, mode, options)}`;
    }
    go_to_folder(folder) {
        return `go_to_folder=/${folder}`;
    }
    id_list_message(message) {
        return `id_list_message=${this.#getMessage(message)}.`;
    }
    routing_yemot(route) {
        return `routing_yemot=${folder}`;
    }
    hangup() {
        return `go_to_folder=hangup`;
    }
}

const messageType = {
    "file": "f",
    "text": "t",
    "speech": "s",
    "digits": "d",
    "number": "n",
    "alpha": "a"
};
