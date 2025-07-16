import style from "./Header.module.css";

export default function Header({user}){
    if(user){
        return(

            <header>
                <p className={style.text}>Wilkommen zurück {user ? user.displayName : "loading"}</p>
            </header>
        );
    }
    
    return <p>Not logged in?</p>
    
}