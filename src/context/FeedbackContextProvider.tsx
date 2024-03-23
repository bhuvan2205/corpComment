import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { FeedbackItem } from "../lib/type";

type TFeedbackContext = {
    isLoading: boolean;
    error: string;
    feedbackItems: FeedbackItem[];
    companyList: string[];
    handleAddFeedbackItem: (text: string) => void;
    handleSelectCompany: (text: string) => void;
};

export const FeedbackContext = createContext<TFeedbackContext | null>(null);

const FeedbackContextProvider = ({ children }: { children: ReactNode; }) => {
    const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const companyList = useMemo(() => feedbackItems.map(feedback => feedback.company).filter((company, index, array) => array.indexOf(company) === index), [feedbackItems]);

    const [selectedCompany, setSelectedCompany] = useState('');

    const filterFeedbackItems = useMemo(() => selectedCompany ? feedbackItems.filter(feedbackItem => feedbackItem.company.toLowerCase() === selectedCompany.toLowerCase()) : feedbackItems, [selectedCompany, feedbackItems]);

    const handleSelectCompany = (company: string) => setSelectedCompany(company);

    const handleAddFeedbackItem = async (text: string) => {
        const companyName = text.split(' ').find(word => word.includes('#'))!.substring(1);
        const newFeedbackItem: FeedbackItem = {
            id: feedbackItems.length + 1,
            upvoteCount: 0,
            text,
            daysAgo: 0,
            company: companyName,
            badgeLetter: companyName.substring(0, 1).toUpperCase(),
        };

        await fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(newFeedbackItem)
        });

        setFeedbackItems([...feedbackItems, newFeedbackItem]);
    };

    useEffect(() => {
        const fetchFeedbacks = async () => {
            setLoading(true);
            try {
                const res = await fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks');

                if (!res.ok) {
                    throw new Error();
                }

                const data = await res.json();
                setFeedbackItems(data?.feedbacks);
                setLoading(false);

            } catch (error) {
                setLoading(false);
                setError("Something went wrong!");
            }

        };
        fetchFeedbacks();
    }, []);

    return (
        <FeedbackContext.Provider value={{ feedbackItems: filterFeedbackItems, isLoading, error, handleAddFeedbackItem, companyList, handleSelectCompany }}>
            {children}
        </FeedbackContext.Provider>
    );
};

export default FeedbackContextProvider;