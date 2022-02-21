import React from 'react';
import './App.css';
import { DOMMessage, DOMMessageResponse } from './types';
import { LoginForm } from "./Components/Auth/LoginForm";
import { LoginDataI } from "./interface/auth.interface";
import { LoginService } from "./services/login.helper.service";
import { setInLocalStorage, getFromLocalStorage } from "./services/localstorage.helper.service";
import { LOCALSTORAGE_KEYS } from "./constants/localstorage.constants";
import { UserI } from "./interface/user.interface"
import { addBookmarkService } from './services/bookmarks-actions.helper';

function App() {

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

  const addBookmarkToDB = async () => {

    chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {

      chrome.tabs.sendMessage(
        tabs[0].id || 0,
        { type: 'GET_DOM' } as DOMMessage,
        async (response: DOMMessageResponse) => {
          console.log('RESPONSE: ',response);

          const sendObj =  { 
              title: response.title?response.title:'',
              description: response.title?response.title:'',
              image: "https://cdn.pixabay.com/photo/2021/06/11/16/24/city-6328941_960_720.jpg",
              urlMarkbook: response.url?response.url:''
             };

          const addData = await addBookmarkService(sendObj);
        console.log('AFTER request: ', addData.data.data)
        });
    });

  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={ addBookmarkToDB }>Add bookmark</button>
      </header>

      <footer>
        <LoginForm onAddContact={ handlerLogin }/>
        </footer>
    </div>
  );
}

export default App;
