import React from "react";
import { LoginDataI } from "../../../interface/auth.interface"

type onAddContactType = (loginData:LoginDataI) => void;
interface PropsI {
    onAddContact:onAddContactType;
}

export const LoginForm:React.FC< PropsI >=(props)=> {
  const { onAddContact } = props;
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] =  React.useState('');

  const handlerInput = (e:any) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setEmailValue(value);
        break;
      case 'password':
        setPasswordValue(value);
        break;
      default:
        return;
    }
  };

   const resetForm =():void=> {
    setEmailValue('');
    setPasswordValue('');
   }

   const handlerFormSubmit = (e:any) => {
    e.preventDefault();
    const loginData = {
        email: emailValue,
        password: passwordValue
    }
    onAddContact(loginData);
    resetForm();
  };

   return(
       <form onSubmit={handlerFormSubmit}>
       <label>
         Email:
         <input
           type="text"
           name="email"
           onChange={handlerInput}
           value={emailValue}
           placeholder="YOU EMAIL"
           required
         />
       </label>
       <label>
         Password:
         <input
           type="password"
           name="password"
           onChange={handlerInput}
           value={passwordValue}
           placeholder="YOU PASSWORD"
           min="1"
           max="50"
           required
         />
       </label>
       <button type="submit">Log In</button>
     </form>
   )
}