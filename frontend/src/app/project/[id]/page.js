"use client";

import {auth,useAuth} from "../../firebaseConfig/firebaseInit.js";
import {verifyToken} from "../../api/getprojects.js";
import {useState, useEffect} from "react";
import Header from "../../Components/Header/Header.js";
import {useParams} from "next/navigation";

export default function project(){

    const urlInfo = useParams();
    const {user,loading} = useAuth();
    const [displayName, setDisplayName] = useState();
    
    useEffect(() =>{
        async function init(){
            if(user){
                
                const tokenId = await user.getIdToken(true);
                await verifyToken(tokenId);

                console.log("troken verified");
                setDisplayName(user.displayName);
            }
        
    }

    init();
    }, [user,loading]);
    
    //<Header user={user}></Header>
    
    return(
        <div>
            <p>{displayName}{urlInfo.id}</p>
        </div>
    )
}