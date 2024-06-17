// Mobile No Masking helper function
export const mobileNoMask=(mobileNo)=>{
    if(mobileNo){
    return mobileNo?.replace(/\d(?=\d{4})/g, "X")
    }else{
        return ""
    }
}
//Email Masking helper function
export const emailMask=(email)=>{
    if(email){
        return email.replace(/^(.{2})[^@]+/, "$1XXX");
    }else{
        return ""
    }
}

// To add minutes to the current time
export const AddMinutesToDate=(date, minutes)=>{
    return new Date(date.getTime() + minutes*60000).toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
  }