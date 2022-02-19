import { DOMMessage, DOMMessageResponse } from '../types';

const messagesFromReactAppListener = (
   msg: DOMMessage,
   sender: chrome.runtime.MessageSender,
   sendResponse: (response: DOMMessageResponse) => void) => {
  
   console.log('hello from content.js ====> msg:  ', msg);
 
   const fullUrl = document.location.href;
   const title = document.title; 
   const response: DOMMessageResponse = {
        url:fullUrl,
        title:title
   };
 
   sendResponse(response);
}
 
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);