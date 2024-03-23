import { useFeedbackContext } from '../lib/hooks';
import HashtagItem from './HashtagItem';

const HashtagList = () => {
    const { companyList, handleSelectCompany } = useFeedbackContext();
    return (
        <ul className='hashtags'>
            {
                (companyList).map((company, index: number) =>
                    <HashtagItem key={`company-${index}`} company={company} onSelectCompany={handleSelectCompany} />
                )
            }
        </ul>
    );
};

export default HashtagList;