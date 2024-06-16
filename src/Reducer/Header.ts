import { GET_PROFILE, PROFILE_ERROR, PROFILE_USER_ERROR } from "../Components/Utils/Types";


export default (state:any=null,action:any)=>{
    switch (action.type){
        case GET_PROFILE :
            {
                state =action.payload ;
             let   data = Object.assign({},{
                    ...state ,
                    
                })
                return {...data}};
        case PROFILE_ERROR : 
        { let  data = Object.assign({},{
            ...state,
                error:'خطا در دریافت اطلاعات',
        })
          return  {...data}};
        case PROFILE_USER_ERROR:
            {  let data = Object.assign({},{
                ...state,
                error:'لطفا اتصال به اینترنت را بررسی کنید .',
            })
            return {...data}};

            default:
                return state ;
        }
};