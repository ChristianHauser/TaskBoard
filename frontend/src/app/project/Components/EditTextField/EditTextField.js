"use client"
import {useState, useEffect,useRef, use} from "react";
import style from "../EditTextField/EditTextField.module.css";

export default function EditTextField({value,placeholder,onCommit}){
    const [editMode, setEditMode] = useState(false);
    const [text, setText] = useState(value);
    
    useEffect(() =>{
        setText(value ?? "");
    },[value]);
    
    useEffect(() => {
        if(!text && !editMode){
            setText(placeholder);
        }
    }, [editMode]);

    const commit = ()=>{
        const finalText = text.trim();
        onCommit?.(finalText);
        setEditMode(false);

    }
    return(
    <div className={style.editField}>
      {!editMode ? (
        <h1 className={style.projName} onClick={() => setEditMode(true)}>{text}</h1>
      ) : (
        <input className={`${style.projName} ${style.input}`}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => {
            setTimeout(commit,0)}}
          autoFocus
          onKeyDown={(e)=>{
            if(e.key === "Enter"){
                setTimeout(commit,0.1)
            }
          }}
          
        />
      )}
    </div>
    )
}