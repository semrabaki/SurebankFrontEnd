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
    const token=getToken();
    const axiosInstance=axios.create({
        header:{
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
}

export default new SureBankClient;