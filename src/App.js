import logo from './logo.svg';
import './App.css';
import { login } from './http/API';

function App() {
    const test = () =>{
        login()
    }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={()=>test()}>fcgvhbjnk</button>
      </header>
    </div>
  );
}

export default App;
