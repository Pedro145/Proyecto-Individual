import './App.css';
import {BrowserRouter, Route, Switch} from"react-router-dom"
import LandingPage from "./components/Landingpage"
import Home from './components/Home';
import CreateVideogames from './components/CreateVideoGame';
import Detail from './components/Detail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route exact path = "/" component={LandingPage}/>
      <Route path = "/videogames" component={CreateVideogames}/>
      <Route path= "/home/Detail/:id" component={Detail}/>
      <Route path ="/home" component={Home}/>
      </Switch>
    </div>,
    </BrowserRouter>
  );
}

export default App;
