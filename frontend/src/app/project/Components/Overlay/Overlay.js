import style from "../Overlay/Overlay.module.css";
import {createPortal} from "react-dom";
import {useState,useEffect} from "react";
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
                <button className={style.closeButton} onClick={() => onClose?.()}>Close</button>
            </div>
            
        </div>, document.body
    );
}