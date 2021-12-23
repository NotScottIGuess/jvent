class JVent {
    constructor(name) {
        this.contexts = new Set();
        this.subscriptions = new Map();
        this.name = name;
    }
    add(context, method) {
        if (method === undefined) {
            method = context;
            context = null;
        }
        else if (typeof method !== 'string') {
            throw "handler method should either be arrow functions, context-agnostic or the name of a method in the context";
        }
        this.contexts.add(context);
        if (!this.subscriptions.has(context)) {
            this.subscriptions.set(context, []);
        }
        this.subscriptions.get(context).push(method);
    }
    remove(context, method) {
        if (context === undefined) {
            this.contexts.clear();
            this.subscriptions.clear();
        }
        else if (method === undefined) {
            this.contexts.delete(context);
            this.subscriptions.delete(context);
        }
        else {
            this.subscriptions.set(context, this.subscriptions.get(context).filter((v) => v !== method));
        }
    }
    fire(data) {
        this.subscriptions.forEach((methodSet, context) => {
            methodSet.forEach((method) => {
                if (context === null) {
                    method(data);
                }
                else if (typeof method !== 'string' || !(method in context)) {
                    console.log(typeof method, JSON.stringify(method), context[method], method in context);
                    throw `Cannot call ${method} on context as the it does not exist. context: ${context}`;
                }
                else {
                    context[method].call(context, data);
                }
            });
        });
    }
}
export default JVent;
