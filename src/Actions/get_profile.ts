import API from '../API/Api';


import NetInfo from "@react-native-community/netinfo";
import { GET_PROFILE, PROFILE_ERROR, PROFILE_USER_ERROR } from '../Components/Utils/Types';

const getprof =async(dispatch:any) => {
    try{
        const res = await API.Dashboard();


dispatch({
     type:GET_PROFILE ,
    payload:res.data
})
    } catch(e){
        NetInfo.fetch().then(state => {
            state.isConnected?
            dispatch({
            type:PROFILE_ERROR ,  })
            :
        dispatch({
        type:PROFILE_USER_ERROR ,  })
         })
        
    }

}

export default getprof;