import Section from "./components/Section/Section";
import React, { useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import propTypes from "prop-types";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Modal from "./components/Modal/Modal";
import { ToastContainer } from "react-toastify";

function App() {
  const [searchName1, setSearchName] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [option, setOption] = useState({})

  const onSubmitSearchName = (inputData) => {
    setSearchName(inputData)
  }

  const toggleModalWindow = (url, alt) => {
    setShowModal(!showModal)
    setOption({ imageUrl: url, imageAlt: alt })
  };

  return (
    <Fragment>
      <Searchbar onSubmitSearchName={onSubmitSearchName} />
      <Section>
        <ImageGallery searchName={searchName1} onClickLargeImageURL={toggleModalWindow} />
      </Section>
      {
        showModal && (
          <Modal
            url={option.imageUrl}
            alt={option.imageAlt}
            onCloseModal={toggleModalWindow}
          />
        )
      }
      <ToastContainer autoClose={4000} />
    </Fragment >
  )
}

App.propTypes = {
  searchName: propTypes.string,
}

export default App