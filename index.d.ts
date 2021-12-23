declare class JVent {
    contexts: Set<unknown>;
    subscriptions: Map<any, any>;
    name: string;
    constructor(name: string);
    add(context: any, method: any): void;
    remove(context: any, method: any): void;
    fire(data: any): void;
}
export default JVent;