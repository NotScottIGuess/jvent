class JVent{

    contexts = new Set();
    subscriptions = new Map();
    name;

    constructor(name){
        this.name = name;
    }

    add(context, method){
        if(method === undefined){
            method = context;
            context = null;
        } else if(typeof method !== 'string'){
            throw "handler method should either be arrow functions, context-agnostic or the name of a method in the context";
        }

        this.contexts.add(context);
        if(!this.subscriptions.has(context)){
            this.subscriptions.set(context, []);
        }
        this.subscriptions.get(context).push(method);
    }

    remove(context, method){
        if(context === undefined){
            this.contexts.clear();
            this.subscriptions.clear();
        } else if(method === undefined){
            this.context.remove(context);
            this.subscriptions.remove(context);
        } else {
            this.subscriptions.set(context, this.subscriptions.get(context).filter(v => v !== method));
        }
    }

    fire(data){
        this.subscriptions.forEach((method, context) => {
            if(context === null){
                method(data);
            } else if(typeof method !== 'string' || !(method in context)) {
                throw `Cannot call ${method} on context as the it does not exist. context: ${context}`;
            } else {
                context[method].call(context, data);
            }
        });
    }

}

export default JVent;