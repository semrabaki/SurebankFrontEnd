// All fetching fucntions will be in this file
import axios from "axios"
const BASE_URL="http://localhost:8081"

class SureBankClient{

    register(userInfo){
        return axios.post(BASE_URL+"/register", userInfo);
    }
    login(loginInfo){
        return axios.post(BASE_URL+"/login", loginInfo);
    }
}

export default new SureBankClient;