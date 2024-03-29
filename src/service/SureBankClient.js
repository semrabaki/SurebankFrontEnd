// All fetching fucntions will be in this file
import axios from "axios"
const BASE_URL="http://localhost:8081"

export const itemsCountPerPage=10;


//we are creating function to get the token from the session storage so that we can get the user uthentation info
function getToken(){
    let auth=sessionStorage.getItem("token");
    if(auth){
        //it convert the string to an object
       auth= JSON.parse(auth);
    }

    return auth?`Bearer ${auth.token}`:""; //

}


const getAxiosInstance=()=>{
    debugger;
    const token=getToken();
    const axiosInstance=axios.create({
        headers:{
            Authorization:token
        }
    })

    return axiosInstance;//has the token
}



class SureBankClient{

    register(userInfo){
        return axios.post(BASE_URL+"/register", userInfo);
    }
    login(loginInfo){
        return axios.post(BASE_URL+"/login", loginInfo);
    }
    // we do not need any token to send message so we cna just diretcly use post
    sendMessage(messageInfo){
        return axios.post(BASE_URL+"/message/visitor",messageInfo);
    }

    //since it needs autohirzation we put getAxiosIntsance
    getMessages(){
        return getAxiosInstance().get(BASE_URL+"/message");
    }
    getUserInfo(){
       return getAxiosInstance().get(BASE_URL+"/user/userInfo");

    }

    deposit(depositInfo){
        return getAxiosInstance().post(BASE_URL+"/account/deposit",depositInfo);
    }
    withdraw(withdrawInfo){
        return getAxiosInstance().post(BASE_URL+"/account/withdraw",withdrawInfo);
    }

    transfer(transferInfo){
        return getAxiosInstance().post(BASE_URL+"/account/transfer",transferInfo);
    } 

    getRecipients(){
         return getAxiosInstance().get(BASE_URL+"/account/recipient");
     }

     addRecipient(recipientInfo){
         return getAxiosInstance().post(BASE_URL+"/account/recipient",recipientInfo);
     }

     deleteRecipient(id){
         return getAxiosInstance().delete(BASE_URL+"/account/recipient/"+id);
     }

     getCustomerStatement(sDate,eDate){
        const requestParam={params:{startDate:sDate,endDate:eDate}};
        return getAxiosInstance().get(BASE_URL+"/account/customerstatement",requestParam);
    }

    getBankStatement(sDate,eDate){
       const requestParam={params:{startDate:sDate,endDate:eDate}};
       return getAxiosInstance().get(BASE_URL+"/account/bankstatement",requestParam);
    }

    //in backende we used pagable parameter  so we are seidngin it as parameter
    getAllUsers(page){
        return getAxiosInstance().get(BASE_URL+`/user/all?page=${page}&size=${itemsCountPerPage}&sort=id,asc`);   
     }

     updateUser(id,user){
        return getAxiosInstance().put(BASE_URL+"/user/"+id,user);
    }
    
    getUser(id){
        return getAxiosInstance().get(BASE_URL+"/user/"+id);
    }
}

export default new SureBankClient();