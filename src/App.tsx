import React from 'react';
import './App.css';
import { DOMMessage, DOMMessageResponse } from './types';
import { LoginForm } from "./Components/Auth/LoginForm";
import { LoginDataI } from "./interface/auth.interface";
import { LoginService } from "./services/login.helper.service";
import { setInLocalStorage, getFromLocalStorage } from "./services/localstorage.helper.service";
import { LOCALSTORAGE_KEYS } from "./constants/localstorage.constants";
import { UserI } from "./interface/user.interface"

function App() {

  const [url, setUrl] = React.useState<string>('');
  const [title, setTitle] = React.useState<string>('');
  const [userValue, setUser] = React.useState< UserI | null>(null);

  React.useEffect(() =>{
    init();
  },[])


  const init = async() => {
    const user = await getFromLocalStorage(LOCALSTORAGE_KEYS.user_key);
    user && setUser(user);
  }
  
  // React.useEffect(() => {

  //   chrome.tabs && chrome.tabs.query({
  //     active: true,
  //     currentWindow: true
  //   }, tabs => {

  //     chrome.tabs.sendMessage(
  //       tabs[0].id || 0,
  //       { type: 'GET_DOM' } as DOMMessage,
  //       (response: DOMMessageResponse) => {
  //         setUrl(response.url);
  //         setTitle(response.title)
  //       });
  //   });
  // });

  const handlerLogin = async (loginData: LoginDataI) =>{
    const user = await LoginService(loginData);
    user && setInLocalStorage(user, LOCALSTORAGE_KEYS.user_key);
    user && setUser(user);
  }

  const handleTest = ():void => {

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

    if(!url && !title) return;
    console.log('hello from App',url,'__',title)
  }

  return (
    <div className="App">
      <header className="App-header">

        <button onClick={ handleTest }>Click me</button>
        <LoginForm onAddContact={ handlerLogin }/>
      </header>
    </div>
  );
}

export default App;
