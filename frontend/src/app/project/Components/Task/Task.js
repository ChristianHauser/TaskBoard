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
import useLongPress from "../Utils/longPress";


export default function Task({taskArray, colId, setShowingPopup,setCurrentColumn,showTaskPopup,setShowTaskPopup, moveTask}){
    const containerRef = useRef(null);
    const lastRef = useRef(null);
    const colRef = useRef(null);
    const[extraHover, setExtraHover] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const test = false;

    const open = Boolean(selectedTask);
    const longPressMs = 200;
    const lp = useLongPress({ pressMs: longPressMs, holdingClass: style.holding });

    const isOdd = taskArray?.length % 2 ===1;

    
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
  lp.onPointerDown(e, () => {
    
    setSelectedTask(task);
  });
};
    
const onPointerMove = (e) => {
  if (!lp.isHolding) return;
  const el = lp.curTargRef.current;
  const rect = lp.boundRecRef.current;
  if (el && rect) {
    el.style.top  = `${e.clientY - (rect.bottom - 5)}px`;
    el.style.left = `${e.clientX - ((rect.right - rect.left)/2 + rect.left)}px`;
    
    colRef.current = (document?.elementFromPoint(e.clientX,e.clientY)?.closest("[data-col-id]") ?? colId);
  }
  
};

const cancelHold = (e) => lp.cancelHold(e);
const onPointerUp = (e) => lp.onPointerUp(e);




const onClick = (e, task) => {
  if (lp.shouldIgnoreClick()) {
     e.preventDefault();
     e.stopPropagation();
     return;
   }
   setShowTaskPopup(true);
   setSelectedTask(task);

 };
    if(taskArray){
        return(
        
        <div ref={containerRef} className={`${style.taskContainer} ${extraHover ? style.extraHover : ""}`}>
            {taskArray.map(task=> {
                return(
                    //Einzellnen Tasks
                    //Mouse Position getten und div moven
                    <div className={style.singleTask} key={task.id} 

                        onPointerDown={(e) => onPointerDown(e, task)}
                        onPointerMove={onPointerMove}
                        onPointerUp={(e)=>{onPointerUp}}
                        onPointerLeave={(e) => cancelHold(e)}
                        onClick={(e) =>{ onClick(e, task);moveTask(task.id,colId,lp.curTargRef,colRef)}}
                        >
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