import style from "../Overlay/Overlay.module.css";
import {createPortal} from "react-dom";
import {useState,useEffect} from "react";
export default function Overlay({children}){

    const [mounted, setMounted] = useState(false);

    useEffect(()=>{
        setMounted(true);
    },[]);

    if(!mounted) return null;
    return createPortal(
        <div className={style.overLay}>
            <div className={style.overLayContainer}>
                {children}
            </div>
        </div>, document.body
    );
}