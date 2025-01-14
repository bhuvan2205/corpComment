type HashtagItemProps = {
    company: string;
    onSelectCompany: (text: string) => void;
};

const HashtagItem = ({ company, onSelectCompany }: HashtagItemProps) => {
    return (
        <li><button onClick={() => onSelectCompany(company)}>#{company}</button></li>
    );
};

export default HashtagItem;