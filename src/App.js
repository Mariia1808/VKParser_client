import './App.css';
import { login } from './http/API';
import { useState } from 'react';
import AppRouter from './component/AppRouter';
import { BrowserRouter } from 'react-router-dom';



function App() {
     
    const [isxods, setIsxod] = useState(null)

    function test(){
        const query = new URLSearchParams(this.props.location.search);
        console.log(query)
        //login().then(data=>setIsxod(data))
    }

  return (
    <BrowserRouter>
        <AppRouter />
    </BrowserRouter>
  );
}

export default App;
