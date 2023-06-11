
import './App.css';
import CarsContainer from './Components/CardsConteiner/CarsConteiner';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';

function App() {
  return (
    <div className='root'>
      <Header/>
      <CarsContainer />
      <Footer/>
    </div>
  );
}

export default App;
