import { LayoutAnimation, UIManager } from "react-native";

export const useLayoutAnimation = (duration = 250) => {
    UIManager.setLayoutAnimationEnabledExperimental && 
    UIManager.setLayoutAnimationEnabledExperimental(true);
    const CONFIG = {
        duration,
        create: {
            type: LayoutAnimation.Types.easeOut,
            property: LayoutAnimation.Properties.opacity
        },
        update: {
            type: LayoutAnimation.Types.easeInEaseOut
        }
    };
    LayoutAnimation.configureNext(CONFIG);
};