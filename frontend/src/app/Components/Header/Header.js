export default function Header({user}){
    if(user){
        return(

            <header>
                <p>Wilkommen zurück {user ? user.displayName : "loading"}</p>
            </header>
        );
    }
    
    return <p>Not logged in?</p>
    
}