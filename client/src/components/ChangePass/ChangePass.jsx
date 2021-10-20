import React, { useState } from 'react'
import style from './changePass.module.css'


function ChangePass() {
  const [inputs, setInputs] = useState({
    pass: '',
    checkPass: '',
  })

  const [errPass, setErrPass] = useState(false)
  const [errOverlay, setErrOverlay] = useState(false)
  const [successFlag, setSuccessFlag] = useState(false)

  const inputsHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const reg = /^(?=.*\d)(?=.*[A-Z]).{8,}$/
    if(reg.test(inputs.pass) === true && inputs.pass === inputs.checkPass ){
      setSuccessFlag(true)
      setErrPass(false)
      setErrOverlay(false)
    } else if(inputs.pass !== inputs.checkPass){
      setSuccessFlag(false)
      setErrOverlay(true)
      setErrPass(false)
    } else {
      setSuccessFlag(false)
      setErrPass(true)
      setErrOverlay(false)
    }
  }


  return (
    <div className={style.list}>
      <div className={style.list__up}>
          <div className={style.list__up__title}>
            <p>Смена пароля</p>
          </div>
          <div className={errPass ? style.list__up__bodyErr : style.list__up__body}>
            <p>Пароль должен содержать не менее 8 символов и одну заглавную букву.</p>
          </div>
      </div>
        <form onSubmit={(e) => submitHandler(e)} className={style.list__inputs__form}>
          <label htmlFor="pass">Пароль</label>
          <input 
          className={(errPass || errOverlay) ? style.errInput : null} 
          value={inputs.pass} onChange={inputsHandler} 
          name='pass' 
          id='pass' 
          type="password" />
          {successFlag && 
          <div className={style.svgIcon}>
            <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 1L4.4375 9L1 5.36364" stroke="#4EB421" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          }
            <p 
            className={errOverlay ? style.errorMess : style.errorVisibleHidden }
            >Пароли не совпадают</p>
          <label htmlFor="checkPass">Повторите пароль</label>
          <input 
          className={errOverlay ? style.errInput : null} 
          value={inputs.checkPass} 
          onChange={inputsHandler} 
          name='checkPass' 
          id='checkPass' 
          type="password" />
          <div className={style.list__inputs__button}>
            <button>Сменить пароль</button>
          </div>
        </form>
    </div>
  )
}

export default ChangePass
