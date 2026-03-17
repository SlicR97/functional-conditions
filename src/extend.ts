export {}

declare global {
    // add new signatures to object type
    interface ObjectConstructor {
        $if: <TReturn>(
            cond: (thisObj: object) => boolean,
            trueCase: () => TReturn,
            falseCase: () => TReturn
        ) => TReturn;

        $switch: <TReturn>(
            [...cases: ]
        )
    }
}


Object.$if = function <TReturn>(
    this: ObjectConstructor,
    cond: (thisObj: object) => boolean,
    trueCase: () => TReturn,
    falseCase: () => TReturn
): TReturn {
    return cond(this) ? trueCase() : falseCase();
};
