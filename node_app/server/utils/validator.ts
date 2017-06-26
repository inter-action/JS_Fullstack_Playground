import { Validator } from "class-validator";

type BooleanExpression<T> = (t: T) => boolean
class BooleanNode<T> {
    constructor(private expression: BooleanExpression<T>) { }

    map(expression: BooleanExpression<T>): BooleanNode<T> {
        return new BooleanNode((t: T) => {
            return this.expression(t) && expression(t)
        });
    }

    run(t: T): boolean {
        return this.expression(t);
    }
}

// this provides nearly zero value except providing a functional api implementation demo
// actually I kind like how this api can group boolean assertion together :)
export function booleanChain<T>(e: BooleanExpression<T>): BooleanNode<T> {
    return new BooleanNode(e);
}


let validator = new Validator();
export function getValidator(): Validator {
    return validator;
}