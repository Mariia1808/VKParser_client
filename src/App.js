import logo from './logo.svg';
import './App.css';
import { login } from './http/API';
import { useEffect, useState } from 'react';


function App() {
     
    const [isxods, setIsxod] = useState(null)

    function test(){
        login().then(data=>setIsxod(data))
    }

  return (
    <div className="App">
        {console.log(isxods.response[0].activity)}
      <header className="App-header">
        <button onClick={()=>test()}>fcgvhbjnk</button>
        <label>{isxods.response[0].activity}</label>
      </header>
    </div>
  );
}

export default App;
