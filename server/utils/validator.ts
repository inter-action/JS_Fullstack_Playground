
// todo: cant import Validator as Type

// import * as Validator from 'validator';

// Validate.new((obj, validator)=> validator.isEmail())
//   .map((obj, validator)=>validator.isLength()).run()


// type ValiatorExpression<T, V> = (t: T, V) => boolean
// class ValidatorNode<T, V> {
//     constructor(private expression: ValiatorExpression<T, V>) { }

//     map(expression: ValiatorExpression<T, V>): ValidatorNode<T, V> {
//         return new ValidatorNode((t: T, v: V) => {
//             return this.expression(t, v) || expression(t, v)
//         });
//     }

//     run(t: T, v: V): boolean {
//         return this.expression(t, v);
//     }
// }

// export function validatorChain<T, V>(e: ValiatorExpression<T, V>): ValidatorNode<T, V> {
//     return new ValidatorNode(e);
// }



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

// todo: this provides nearly zero value except providing a functional api implementation demo
// actually I kind like how this api can group boolean assertion together :)
export function booleanChain<T>(e: BooleanExpression<T>): BooleanNode<T> {
    return new BooleanNode(e);
}
