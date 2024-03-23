import { TriangleUpIcon } from '@radix-ui/react-icons';
import { FeedbackItem as TFeedbackItem } from '../lib/type';
import React, { useState } from 'react';

export type FeedbackItemProps = {
    feedbackItem: TFeedbackItem;
};

const FeedbackItem = (props: FeedbackItemProps) => {
    const { feedbackItem: { upvoteCount, company, badgeLetter, text, daysAgo } } = props || {};

    const [open, setOpen] = useState(false);
    const [upvoteCountValue, setUpvoteCountValue] = useState(upvoteCount);

    const handleUpvote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setUpvoteCountValue(prev => ++prev);
        e.stopPropagation();
    };
    return (
        <li className={`feedback ${open && "feedback--expand"}`} onClick={() => setOpen(prevState => !prevState)}>
            <button
                onClick={handleUpvote}
                disabled={upvoteCount !== upvoteCountValue}
            >
                <TriangleUpIcon />
                <span>{upvoteCountValue}</span>
            </button>
            <div>
                <p>{badgeLetter}</p>
            </div>
            <div>
                <p>{company}</p>
                <p>{text}</p>
            </div>
            <p>{daysAgo === 0 ? "NEW" : `${daysAgo}d`}</p>
        </li>
    );
};

export default FeedbackItem;