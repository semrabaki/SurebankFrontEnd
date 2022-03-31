import {toast} from 'react-toastify'

export const toastError=(error)=>{
    //errorlari daha kapsamli kontrol edebilmek icin 
    if(error.response && error.response.data&& error.response.data.message){
        return toast.error(error.response.data.message,{
            position:toast.POSITION.TOP_CENTER,
        })
    }else{
        return toast.error("Unexpected error");
    }
}
