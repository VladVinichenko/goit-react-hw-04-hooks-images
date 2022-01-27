import s from './Searchbar.module.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import propTypes from 'prop-types';

import React, { Component } from 'react'

class Searchbar extends Component {
  state = {
    searchName: '',
  }



  onInputname = (val) => {
    this.setState({ searchName: val.currentTarget.value.toLowerCase() })
  }

  onSubmitSearchName = (val) => {
    val.preventDefault()
    this.state.searchName.trim() === '' ? toast.warn('Please, input text!') : this.props.onSubmitSearchName(this.state.searchName)
  }

  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={this.onSubmitSearchName}>
          <button type="submit" className={s.button}>
            <span className={s.buttonLabel}>Search</span>
          </button>

          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onInputname}
          />
        </form>
      </header>
    )
  }
}

Searchbar.propTypes = {
  onSubmitSearchName: propTypes.func
}

export default Searchbar