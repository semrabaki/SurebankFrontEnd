// All fetching fucntions will be in this file
import axios from "axios"
const BASE_URL="http://localhost:8081"
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

}

export default new SureBankClient();