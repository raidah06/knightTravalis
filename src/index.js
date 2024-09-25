import "./style.css"
import {createQueue} from './algo.js'

const knightFactory=(x,y,distance=null,visited=false,prev=null)=>{
    return{
        x,
        y,
        distance,
        visited,
        prev,
    };
};

const creatGameBoard=()=>{
    const chessBoard=new Array(8).fill(null).map(()=>new Array(8).fill(null));

    return chessBoard;
}

const getLegalMoves=(knightPosX,knightPosY)=>{
    let x=knightPosX;
    let y=knightPosY;

    let legalMoves=[
        { x: x + 2, y: y + 1 },
        { x: x + 2, y: y - 1 },
        { x: x - 2, y: y + 1 },
        { x: x - 2, y: y - 1 },
        { x: x + 1, y: y + 2 },
        { x: x - 1, y: y + 2 },
        { x: x - 1, y: y - 2 },
        { x: x + 1, y: y - 2 },   
    ];
    legalMoves=legalMoves.filter(move=>move.x>=0 && move.x<=7 && move.x>=0 && move.x<=7 );

    return legalMoves;
};

const knightMoves=(startPos,endPos)=>{
    const visited=new Set();

    const startingX=startPos[0];
    const startingY=startPos[1];
    let startingKnight=knightFactory(startingX,startingY,0,true,null);
    visited.add('${startingX},${startingY}');

    const queue=createQueue();
    queue.enqueue(startingKnight);

    while(!queue.isEmpty()){
        const current=queue.dequeue();

        if(current.x===endPos[0] && current.y===endPos[1]){
            const path=[]
            let node=current;
            while(node !==null){
                path.unshift([node.x,node.y]);
                node=node.prev;
            }
            const distance=path.length;
            const message= `You made it in ${distance} moves! Here's your path:\n${path.join('\n')}\n`;
            console.log(message);
            return message;
        }else {
            const checkLegalMoves=getLegalMoves(current.x,current.y);
    
            for(let move of checkLegalMoves){
                const newKnight=knightFactory(move.x,move.y,current.distance+1,true);
    
                const newPosKey=`${move.x},${move.y}`;
                if (!visited.has(newPosKey)) {
                    visited.add(newPosKey);
                    newKnight.prev = current;
                    queue.enqueue(newKnight);
                }
            }
        }
    }
    return null; 
};

let startPrompt=prompt("please enter starting coordinates seperated by a comma")
let endPrompt=prompt("please enter ending coordinates seperated by a comma")
let start=(startPrompt.split(","));
for (let i = 0; i < start.length; i++) {
    start[i]= parseInt(start[i], 10); // Convert each string to an integer
}
let end=(endPrompt.split(","));
for (let i = 0; i < end.length; i++) {
    end[i] = parseInt(end[i], 10); // Convert each string to an integer
}
console.log(start)
console.log(end)
knightMoves(start,end);