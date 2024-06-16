import { NavigationProp, NavigationState ,NavigationContainerRef, CommonActions} from "@react-navigation/native";
import { KeyboardTypeOptions, StyleProp, TextInputIOSProps, TextStyle, ViewStyle } from "react-native";

export interface SafeareaType {
    children?: React.ReactNode;
    style?: ViewStyle;
  }
  export interface LoadingType {
    color?:string;
    style?: ViewStyle|{};
  }
  export interface ButtonType{
    text?:string;
    icon?:string;
    isLoading?:boolean;
    isDisable?:boolean;
    onPress?():void|undefined|Promise<void>;
    backColor?:string;
    textColor?:string;
    style? : ViewStyle;
    fontStyle?:TextStyle;
    right?:boolean
  }
  export interface PropsNavigation {
    dispatch?:(action: ReturnType<typeof CommonActions[keyof typeof CommonActions]>) => void;
    navigation?: NavigationProp<NavigationState>;
    goBack?: any;
    navigate?: any;
    toggleDrawer?: any;
  }
  export interface InputType{
    placeholder?:string;
    style?: ViewStyle;
    inputStyle? : StyleProp<TextStyle>;
    keyboardType?:KeyboardTypeOptions|undefined;
    maxLength?:number;
    editable? : boolean;
    multiline? : boolean;
    placeholderColor? : string;
    value? : string;
    iconName? : string;
    password?:boolean;
    onChange?(text:string):void|undefined;
    iconColor?:string;
    iconStyle? : ViewStyle;
    title? : string;
    mainStyle? : ViewStyle;
    titleStyle? : ViewStyle;
}
export interface AddToStorageType {
    key:string;
    value:string
}
export interface GetFromStorageType {
    key:string;
    defaultValue?:string|null;
}
export interface RemoveFromStorageType {
    key: string;
   
}
export interface RequestType {
    url:string;
    data?:any;
    useAuth?:boolean;
}
export interface HeadersType {
    method?:string;
    url?:string;
  headers:{  'Accept': string;
    'Content-Type': string;
    'cache-control'?: string;
    'Authorization'?: string;};
    timeout?:number;
    data?:any;
}
export interface ModalType{
    visible?:boolean;
  onRequestClose?():void;
  children?:React.ReactNode
}
export interface ErrorType{
    error?:boolean;
    errorMsg? :string;
    onRequestClose?() :void;
}