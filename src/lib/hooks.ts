import { useContext } from "react";
import { FeedbackContext } from "../context/FeedbackContextProvider";

export const useFeedbackContext = () => {
    const context = useContext(FeedbackContext);
    if (!context) {
        throw new Error('Consumer should be placed inside the Provider!');
    }
    return context;
};