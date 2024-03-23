import FeedbackItem from "./FeedbackItem";
import Spinner from "./ui/Spinner";
import ErrorMessage from "./ui/ErrorMessage";
import { useFeedbackContext } from "../lib/hooks";

const FeedbackList = () => {

    const { isLoading, error, feedbackItems } = useFeedbackContext();

    return (
        <ol className='feedback-list'>

            {isLoading && <Spinner />}

            {error && <ErrorMessage message={error} />}

            {feedbackItems?.map(feedbackItem => <FeedbackItem key={feedbackItem?.id} feedbackItem={feedbackItem} />)}
        </ol>
    );
};

export default FeedbackList;;