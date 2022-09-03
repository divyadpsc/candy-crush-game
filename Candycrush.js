import React from 'react'
import {useState,useEffect} from 'react'
import blueCandy from './images/blue-candy.png'
import greenCandy from './images/green-candy.png'
import orangeCandy from './images/orange-candy.png'
import purpleCandy from './images/purple-candy.png'
import redCandy from './images/red-candy.png'
import yellowCandy from './images/yellow-candy.png'


import Blank from './images/blank.png'

const width=8
const candyColors = [
    blueCandy,
    orangeCandy,
    purpleCandy,
    redCandy,
    yellowCandy,
    greenCandy
]


export default function Candycrush() {
    const [CurrentColorArrangement,setCurrentColorArrangement]=useState([])
    const [squarebeingdragged,setsquarebeingdragged]=useState(null)
    const[squarebeingplaced,setsquarebeingplaced]=useState(null)
    
    const checkforcolsoffour=()=>{
        for(let i=0;i<=39;i++)
        { 
            const colmsoffour=[i,i+width,i+width*2,i+width*3]
            const decidedColor=CurrentColorArrangement[i]
            if(colmsoffour.every(square=>CurrentColorArrangement[square]===decidedColor)){
                colmsoffour.forEach(square=>CurrentColorArrangement[square]=Blank)
            return true 
        }
        }
    }
    const checkforrowsoffour=()=>{
        for(let i=0;i<64;i++)
        { 
            const rowoffour=[i,i+1,i+2,i+3]
            const decidedColor=CurrentColorArrangement[i]
            const notValid=[5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64]
            if(notValid.includes(i))continue
    
            if(rowoffour.every(square=>CurrentColorArrangement[square]===decidedColor)){
               rowoffour.forEach(square=>CurrentColorArrangement[square]=Blank)
               return true
            }
        }
    }
    
    const checkforcolsofthree=()=>{
        for(let i=0;i<=47;i++)
        { 
            const colmsofthree=[i,i+width,i+width*2]
            const decidedColor=CurrentColorArrangement[i]
            if(colmsofthree.every(square=>CurrentColorArrangement[square]===decidedColor)){
                colmsofthree.forEach(square=>CurrentColorArrangement[square]=Blank)
                return true
            }
        }
    }

const checkforrowsofthree=()=>{
    for(let i=0;i<64;i++)
    { 
        const rowofthree=[i,i+1,i+2]
        const decidedColor=CurrentColorArrangement[i]
        const notValid=[6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]
        if(notValid.includes(i))continue

        if(rowofthree.every(square=>CurrentColorArrangement[square]===decidedColor)){
           rowofthree.forEach(square=>CurrentColorArrangement[square]=Blank)
        return true
        }
    }
}
const moveIntosquareBelow=()=>{
    for(let i=0;i<=55;i++){
        const firstRow=[0,1,2,3,4,5,6,7]
       const isFirstRow= firstRow.includes(i)
       if(isFirstRow && CurrentColorArrangement[i]===Blank){
        let randomcolor=Math.floor(Math.random()*candyColors.length)
        CurrentColorArrangement[i]=candyColors[randomcolor];
       }
if((CurrentColorArrangement[i+width])===Blank){
    CurrentColorArrangement[i+width]=CurrentColorArrangement[i]
    CurrentColorArrangement[i]=Blank
}
    }
}
const Dragstart=(e)=>{
    console.log('drag start')
    console.log(e.target)
    setsquarebeingdragged(e.target)
}
const dragDrop=(e)=>{
    console.log(e.target)
console.log('drag drop')
setsquarebeingplaced(e.target)
}
const dragend=(e)=>{
    console.log(e.target)
    console.log('drag end')
    const squarebeingplacedid=parseInt(squarebeingplaced.getAttribute('data-id'))
    const squarebeingdraggedid=parseInt(squarebeingdragged.getAttribute('data-id'))
    CurrentColorArrangement[squarebeingplacedid]=squarebeingdragged.getAttribute('src')
    CurrentColorArrangement[squarebeingdraggedid]=squarebeingplaced.getAttribute('src')
    console.log(squarebeingplacedid)
    console.log(squarebeingdraggedid)
    const validmoves=[
        squarebeingdraggedid-1,
        squarebeingdraggedid-width,
        squarebeingdraggedid+1,
        squarebeingdraggedid+width
        
    ]
    const validmove=validmoves.includes(squarebeingplacedid)
const isAcoloffour=checkforcolsoffour()
const isarowoffour=checkforrowsoffour()
const isacolofthree=checkforcolsofthree()
const isarowofthree=checkforrowsofthree()
if(squarebeingplacedid && validmove && (isarowofthree||isAcoloffour||isacolofthree||isarowoffour)){
    setsquarebeingdragged(null)
    setsquarebeingplaced(null)
}
else{
    CurrentColorArrangement[squarebeingplacedid]=squarebeingplaced.getAttribute('src')
    CurrentColorArrangement[squarebeingdraggedid]=squarebeingdragged.getAttribute('src')
    setCurrentColorArrangement([...CurrentColorArrangement])
}
}


    const createBoard=()=>{
        const randomColorArrangement=[]
for(let i=0;i<width*width;i++)
{
    const randomColor=candyColors[Math.floor(Math.random()*candyColors.length)]
    randomColorArrangement.push(randomColor);
}
setCurrentColorArrangement(randomColorArrangement);
    }
    useEffect(()=>{
        createBoard();
    },[])
    useEffect(()=>{
       const timer= setInterval(()=>{
        checkforcolsoffour()
        checkforrowsoffour()
        checkforcolsofthree()
        checkforrowsofthree()
        moveIntosquareBelow()
        setCurrentColorArrangement([...CurrentColorArrangement])
        },100)
        return ()=>clearInterval(timer)
        
    },[checkforcolsoffour, checkforrowsoffour,checkforcolsofthree,checkforrowsofthree, moveIntosquareBelow,CurrentColorArrangement]);
   
    console.log(CurrentColorArrangement);
  return (
    <div className='app'>
<div className='game'>
    {CurrentColorArrangement.map((candycolor,index)=>(
        <img
        key={index}
        src={candycolor}
        alt={candycolor}
        data-id={index}
        draggable={true}
        onDragStart={Dragstart}
        onDragOver={(e)=>e.preventDefault()}
        onDragEnter={(e)=>e.preventDefault()}
        onDragLeave={(e)=>e.preventDefault()}
        onDrop={dragDrop}
        onDragEnd={dragend}

        ></img>
    )
)}
</div>

    </div>

  )
    
    }
