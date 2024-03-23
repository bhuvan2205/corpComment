import Footer from './components/ui/Footer';
import Container from './components/Container';
import FeedbackContextProvider from './context/FeedbackContextProvider';
import HashtagList from './components/HashtagList';

const App = () => {

  return (
    <div className='app'>
      <Footer />
      <FeedbackContextProvider>
        <Container />
        <HashtagList />
      </FeedbackContextProvider>
    </div>
  );
};

export default App;