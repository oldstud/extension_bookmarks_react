import React from 'react';
import './App.css';
import { DOMMessage, DOMMessageResponse } from './types';
import { LoginForm } from "./Components/Auth/LoginForm"
import { LoginDataI } from "./interface/auth.interface"
import { LoginService } from "./services/login.helper.service"

function App() {

  const [url, setUrl] = React.useState<string>('');
  const [title, setTitle] = React.useState<string>('');


  React.useEffect(() =>{
    console.log('Init') // add method get user from local storage and if user upsent need visible form auth
  },[])
  
  React.useEffect(() => {

    chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {

      chrome.tabs.sendMessage(
        tabs[0].id || 0,
        { type: 'GET_DOM' } as DOMMessage,
        (response: DOMMessageResponse) => {
          setUrl(response.url);
          setTitle(response.title)
        });
    });
  });

  const handlerLogin = (loginData: LoginDataI):void =>{
    console.log('LOGIN DATA', loginData) 
    LoginService(loginData);
  }

  const handleTest = ():void =>{

    console.log('hello from App',url,'__',title)
  }

  return (
    <div className="App">
      <header className="App-header">

        <button onClick={handleTest}>Click me</button>
        <LoginForm onAddContact={ handlerLogin }/>
      </header>
    </div>
  );
}

export default App;
