import { CommonActions } from '@react-navigation/native';
import { PropsNavigation } from '../@types/GlobalTypes';
let _navigator:any

 const resetStack = (route:string, data?:any) => {
  return  CommonActions.reset({
      index: 1,
      routes: [{ name: route, params: { data } }]
    });
  // _navigator?.dispatch(resetAction);
  }
  export const  navigate = (navigation:PropsNavigation|undefined,route:string, data?:any) => {
    return navigation?.dispatch? navigation?.dispatch(CommonActions.navigate({
        name: route,
       params:data
      })):null
    // _navigator?.dispatch(resetAction);
    }
  
  export default resetStack