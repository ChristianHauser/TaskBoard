import style from "../Overlay/Overlay.module.css";
import {createPortal} from "react-dom";
import {useState,useEffect} from "react";
import { IoMdClose } from "react-icons/io";
export default function Overlay({open, onClose, children}){

    const [mounted, setMounted] = useState(false);

    useEffect(()=>{
        setMounted(true);
    },[]);

    if(!mounted || !open) return null;
    return createPortal(
        <div onClick={(e) => e.currentTarget === e.target && onClose?.()} className={style.overLay} role="dialog" aria-modal="true">
            <div  className={style.overLayContentContainer}>
                {children}
                <button onClick={()=>onClose?.()} className={style.closeButton2}><IoMdClose className={style.butIcon}/></button>
                <button className={style.closeButton} onClick={() => onClose?.()}>Close</button>
            </div>
            
        </div>, document.body
    );
}