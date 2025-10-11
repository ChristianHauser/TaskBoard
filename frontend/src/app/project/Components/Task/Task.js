import {useState} from "react";
import style from "./Task.module.css";
import formatDate from "../FormatDate/formatDate.js";
import {useRef, useEffect, useCallback} from "react";
import Overlay from "../Overlay/Overlay";
import { TbDotsVertical } from "react-icons/tb";
import { MdNextPlan } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { HiOutlinePlus } from "react-icons/hi2";
//import useLongPress from "../Utils/longPress";


export default function Task({taskArray, colId, setShowingPopup,setCurrentColumn,showTaskPopup,setShowTaskPopup}){
    const containerRef = useRef(null);
    const lastRef = useRef(null);
    const[extraHover, setExtraHover] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isHolding, setIsHolding] = useState(false);
    const [absolute, setAbsolute] = useState(false);

    //HTML Div Postitioning
    //const [curTarg , setCurTarg] = useState(null);
    const curTarg = useRef(null);
    const boundRec = useRef(null);
    //const [boundRec, setBoundRec] = useState(null);

    const open = Boolean(selectedTask);
    const longPressMs = 200; // tweak to taste

    const timerRef = useRef(null);
    const longPressedRef = useRef(false);
    const ignoreNextClickRef = useRef(false);
    const isOdd = taskArray?.length % 2 ===1;

    //MouseListener für position?
    
    
    useEffect(() => {
        if (!lastRef.current) return;
        lastRef.current.style.setProperty("--topRight", isOdd ? "0" : "");
    }, [isOdd]);

    useEffect(() => {
    if(!containerRef || !lastRef) return;
    const grid = containerRef.current;
    const last = lastRef.current;
    if (!grid || !last) return;

    const measure = () => {
    last.style.gridColumn = "1 / -1";
    last.style.gridRow = "auto";

    const cs  = getComputedStyle(grid);
    const row = parseFloat(cs.gridAutoRows);
    const gap = parseFloat(cs.rowGap) || 0;

    const taskCount = taskArray.length;
    const rowsUsed  = Math.ceil((taskCount + (taskCount % 2)) / 2);


    const totalRows = Math.ceil((grid.clientHeight + gap) / (row + gap));
    const span = Math.max(1, totalRows - rowsUsed);

    
    last.style.gridRow = `${rowsUsed + 1} / span ${span}`;
  };

  const ro = new ResizeObserver(measure);
  ro.observe(grid);
  measure();
  return () => ro.disconnect();
}, [taskArray.length]);


    const onPointerDown = (e, task) => {
        const eT = (e.currentTarget);
        curTarg.current = eT;
        boundRec.current = eT.getBoundingClientRect();
    
        e.currentTarget.setPointerCapture(e.pointerId);
        longPressedRef.current = false;
        ignoreNextClickRef.current = false;

        timerRef.current = setTimeout(() => {
        console.log("CURRENTTARGET");
        curTarg.current.classList.add(style.holding);
        longPressedRef.current = true;
        ignoreNextClickRef.current = true;

        //Hold Actions

        setIsHolding(true);
        setSelectedTask(task);
        
        
     }, longPressMs);
    };

const onPointerMove = (e) => {
  if (!isHolding) return;
  
    // + (boundRec.bottom/2)   + (boundRec.right/2)
    if(curTarg.current && boundRec.current){

        curTarg.current.style.top = (e.clientY) -(boundRec.current.bottom-5) + "px";
        curTarg.current.style.left = (e.clientX) - ((boundRec.current.right-boundRec.current.left)/2 + boundRec.current.left)+ "px";
        
    }
    
    
  //console.log(e.clientX)
};

const cancelHold = () => {
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
  setIsHolding(false);
  
  clearTimeout(timerRef.current);
  timerRef.current = null;
};

const onPointerUp = (e) => {
  cancelHold();
  //e.currentTarget.style.position = "relative";
  curTarg.current.classList.remove(style.holding);
  if (!longPressedRef.current) {
    //Click Actions
    
  }
};

const onClick = (e, task) => {
  if (ignoreNextClickRef.current) {
    e.preventDefault();
    e.stopPropagation();
    return;
  }
  setShowTaskPopup(true);
  setSelectedTask(task);
  setIsHolding(false);
  
};
    if(taskArray){
        return(
        
        <div ref={containerRef} className={`${style.taskContainer} ${extraHover ? style.extraHover : ""}`}>
            {taskArray.map(task=> {
                return(
                    //Einzellnen Tasks
                    //Mouse Position getten und div moven
                    <div className={style.singleTask} key={task.id} 
                        onPointerDown={(e) =>{onPointerDown(e, task)} }
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                        onPointerLeave={cancelHold}
                        onClick={(e) => onClick(e, task)}>
                        <p className={style.headLine}>{task.head_line}</p>
                        <span className={style.createdAt}>{formatDate(task.created_at)}</span>
                        <span className={style.assignedUser}>{task.assigned_user_id}</span>
                    </div>
                    
                );
                
            })}

            {showTaskPopup && selectedTask &&(<Overlay open={open} onClose={()=>{ setSelectedTask(null); setShowTaskPopup(false)}}>
                
                <p className={style.taskTitle}>{selectedTask.head_line}</p>
                
                <p className={style.taskText}>{selectedTask.content} </p>
                <div className={style.bottomIconWrapper}>
                
                <button className={style.arrowButton}><FaCheck className={style.arrowIcon}/> </button>
                
                
                
                </div>
                
                </Overlay>)}
            
            {isOdd && <div onMouseLeave={()=> setExtraHover(false)} onMouseEnter={()=> setExtraHover(true)}onClick={(e)=>{
                e.preventDefault();
                setShowingPopup(true);
                setCurrentColumn(colId);
                }}  className={`${style.ghost} ${style.addTask}`}></div>}

            <div onMouseLeave={()=> setExtraHover(false)} onMouseEnter={()=> setExtraHover(true)} onClick={(e)=>{
                e.preventDefault();
                setShowingPopup(true);
                setCurrentColumn(colId);
                }} 
                ref={lastRef} className={style.addTask}><HiOutlinePlus className={style.plusIcon}/>
            </div>
            
        </div>
        
        
        )
    }
    return <div>loading</div>
}