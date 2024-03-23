import { ChangeEvent, FormEvent, useState } from "react";
import { MAX_CHARACTERS } from "../constants/feedbackForm";
import { useFeedbackContext } from "../lib/hooks";

const FeedbackForm = () => {
    const [text, setText] = useState('');
    const [showValid, setShowValid] = useState(false);
    const [showInValid, setShowInValid] = useState(false);
    const charCount = MAX_CHARACTERS - text?.length;

    const { handleAddFeedbackItem } = useFeedbackContext();

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        if (text.length > MAX_CHARACTERS) return;
        setText(text);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (text.includes('#') && text.length >= 5) {
            setShowValid(true);
            setTimeout(() => setShowValid(false), 2000);
        }
        else {
            setShowInValid(true);
            setTimeout(() => setShowInValid(false), 2000);
        };

        handleAddFeedbackItem(text);
        setText('');
    };

    return (
        <form className={`form ${showInValid && "form--invalid"} ${showValid && "form--valid"}`} onSubmit={handleSubmit}>
            <textarea
                id="feedback-textarea"
                value={text}
                onChange={handleChange}
                placeholder="" spellCheck={false} />
            <label htmlFor="feedback-textarea">
                Enter your feedback here, remember to #hashtag the company
            </label>
            <div>
                <p className="u-italic">{charCount}</p>
                <button type="submit">
                    <span>Submit</span>
                </button>
            </div>
        </form>
    );
};

export default FeedbackForm;