import BgPattern from './ui/BgPattern';
import Logo from './ui/Logo';
import PageHeading from './ui/PageHeading';
import FeedbackForm from './FeedbackForm';

const Header = () => {
  return (
    <header>
      <BgPattern />
      <Logo />
      <PageHeading />
      <FeedbackForm />
    </header>
  );
};

export default Header;