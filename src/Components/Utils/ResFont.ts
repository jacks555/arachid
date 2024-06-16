import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen"

const ResFont =(number:number)=>{
return widthPercentageToDP(number/2)+heightPercentageToDP(number/2)
}
export default ResFont