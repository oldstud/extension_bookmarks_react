import React, { useEffect } from "react";
import { LoginDataI } from "../../../interface/auth.interface"
import { validateEmail, validatePassword } from '../../../utils/validateInput.utils'
import style from './style.module.css';

type onAddContactType = (loginData:LoginDataI) => void;
interface PropsI {
    onAddContact:onAddContactType;
}

export const LoginForm:React.FC< PropsI >=(props)=> {
  const { onAddContact } = props;
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] =  React.useState('');
  const [validateEmailStatus, setValidateEmailStatus] =  React.useState(false);
  const [validatePassvordStatus, setValidatePassvordStatus] =  React.useState(false);
  const [isDisabledButton, setIsDisabledButton] =  React.useState(true);

  useEffect(() =>{
    setValidateEmailStatus(validateEmail(emailValue));
    setValidatePassvordStatus(validatePassword(passwordValue))
    setIsDisabledButton(!(emailValue && passwordValue && validateEmailStatus && validatePassvordStatus));
  },[emailValue, passwordValue, isDisabledButton, validateEmailStatus, validatePassvordStatus])

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
    const isValidForm = validatePassvordStatus && validateEmailStatus   
    isValidForm && onAddContact(loginData);
    isValidForm && resetForm();
  };

   return(
     <form className={style.form} onSubmit={handlerFormSubmit}>
       
      <div className={style.controlWrapper}>
         <input
           placeholder="Enter you email"
           id='inputEmail'
           type="text"
           name="email"
           onChange={handlerInput}
           value={emailValue}
           required
         />
         <label htmlFor='inputEmail'>
           Email:
         </label>
       {emailValue && !validateEmailStatus && (<span className={style.helperText}>Email not valid</span>)} 
      </div>
         
      <div className={style.controlWrapper_last}>
         <input
           placeholder="Enter you password"
           id='inputPassword'
           type="password"
           name="password"
           onChange={handlerInput}
           value={passwordValue}
           minLength={8}
           maxLength={50}
           autoComplete="false"
           required
         />
         <label htmlFor='inputPassword'>
           Password:
         </label>
         { passwordValue && !validatePassvordStatus && (<span className={style.helperText}>Password not valid</span>) }
      </div>  

      <button className={style.buttonSubmit} type="submit" disabled={ isDisabledButton }>Log In</button>
     </form>
   )
}