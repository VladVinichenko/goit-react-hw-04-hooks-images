import Section from "./components/Section/Section";
import React, { Component } from "react";
import { Fragment } from "react/cjs/react.production.min";
import propTypes from "prop-types";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Modal from "./components/Modal/Modal";
import { ToastContainer } from "react-toastify";

class App extends Component {
  static propTypes = {
    searchName: propTypes.string,
  }

  state = {
    searchName: '',
    showModal: false,
    option: {},
  }

  onSubmitSearchName = (val) => {
    this.setState({ searchName: val })
  }

  toggleModalWindow = (url, alt) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      option: { imageUrl: url, imageAlt: alt },
    }));
  };

  render() {
    const { searchName, showModal, option } = this.state
    return (
      <Fragment>
        <Searchbar onSubmitSearchName={this.onSubmitSearchName} />
        <Section>
          <ImageGallery searchName={searchName} onClickLargeImageURL={this.toggleModalWindow} />
        </Section>
        {showModal && (
          <Modal
            url={option.imageUrl}
            alt={option.imageAlt}
            onCloseModal={this.toggleModalWindow}
          />
        )}
        <ToastContainer autoClose={4000} />
      </Fragment>
    )
  }
}


export default App