"use client"
import {useState, useEffect,useRef, useLayoutEffect} from "react";
import style from "../EditTextField/EditTextField.module.css";

export default function EditTextField({value,placeholder,onCommit}){
    const [editMode, setEditMode] = useState(false);
    const [text, setText] = useState(value ?? "");
    const inputRef = useRef(null);
    
    useEffect(() =>{
        setText(value ?? "");
    },[value]);
    
    useLayoutEffect(() => {
    if (editMode && inputRef.current) {
      const el = inputRef.current;
      el.focus();
      
      const len = el.value.length;
      try { el.setSelectionRange(len, len); } catch {}
    }
  }, [editMode]);

    const commit = ()=>{
        const finalText = text.trim();
        onCommit?.(finalText);
        setEditMode(false);

    }
    return(
    <>
      {!editMode ? (
        <div className={style.title} onMouseDown={(e) => {
          e.preventDefault();
          setEditMode(true);

        }}>{text || placeholder}</div>
      ) : (
        <input className={`${style.title} ${style.input}`}
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => {
            commit();}}
          autoFocus
          onKeyDown={(e)=>{
            if(e.key === "Enter"){
              e.preventDefault();
              commit();
            }
          }}
          maxLength={30}
          
        />
      )}
    </>
    )
}