  
export const getCurrentTime =()=> {
    var newDate = new Date();
    var currentDate = new Date (newDate.getFullYear() ,
                newDate.getMonth() ,
                newDate.getDate() ,
                newDate.getHours(),
                newDate.getMinutes(), 
                newDate.getSeconds());
    return currentDate
    
};