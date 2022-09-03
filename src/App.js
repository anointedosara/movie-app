import './App.css';
import './trending.css';
import './search.css';
import './tvseries.css';
import './movies.css';
import './modal.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import { Route } from 'react-router-dom';
import Trending from './Pages/Trending';
import Movies from './Pages/Movies';
import Search from './Pages/Search';
import TvSeries from './Pages/TvSeries';

function App() {
  return (
    <div className="App">
      <Header />
      <Route path='/' exact component={Trending} />
      <Route path='/movies' component={Movies} />
      <Route path='/search' component={Search} />
      <Route path='/tvseries' component={TvSeries} />
      <Footer />
    </div>
  );
}

export default App;
