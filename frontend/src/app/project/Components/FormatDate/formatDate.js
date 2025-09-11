export default function formatDate(dateString){

    const date = new Date(dateString.replace(" ","T"));
    return date.toLocaleDateString("de-EU",{


        //weekday:"short",
        year:"numeric",
        month:"short",
        day: "numeric",    
        hour: "2-digit",
        minute: "2-digit"

    });

}