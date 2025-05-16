import Header from './Components/Header';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Content from './Components/Content';

function App(){
  return (
    <div className="container-fluid">
      <Header/>
      <Navbar/>
      <Content/>
      <Footer/>
    </div>
  );
}

export default App;