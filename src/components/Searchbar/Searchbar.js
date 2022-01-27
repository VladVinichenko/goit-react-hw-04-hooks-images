import s from './Searchbar.module.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import propTypes from 'prop-types';


import React, { useState } from 'react'

function Searchbar({ onSubmitSearchName }) {
  const [searchName, setSearchName] = useState('')

  const onInputname = (val) => {
    setSearchName(val.currentTarget.value.toLowerCase())
  }

  const onSubmit = (val) => {
    val.preventDefault()
    searchName.trim() === '' ? toast.warn('Please, input text!') : onSubmitSearchName(searchName)

  }

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={onSubmit}>
        <button type="submit" className={s.button}>
          <span className={s.buttonLabel}>Search</span>
        </button>

        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onInputname}
        />
      </form>
    </header>
  )
}

Searchbar.propTypes = {
  onSubmitSearchName: propTypes.func
}

export default Searchbar