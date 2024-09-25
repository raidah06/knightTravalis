export const createQueue=()=>{
    const elements=[];

    const el=()=>elements;

    const enqueue=element=>{
        return elements.push(element);
    };

    const dequeue=()=>{
        return elements.shift();
    };

    const isEmpty=()=>{
        return elements.length===0;
    };

    return {
        el,
        enqueue,
        dequeue,
        isEmpty,
    };
};
