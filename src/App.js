import Section from "./components/Section/Section";
import React, { useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import propTypes from "prop-types";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Modal from "./components/Modal/Modal";
import { ToastContainer } from "react-toastify";

function App() {
  // static propTypes = {
  //   searchName: propTypes.string,
  // }

  const [searchName1, setSearchName] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [option, setOption] = useState({})


  // state = {
  //   searchName: '',
  //   showModal: false,
  //   option: {},
  // }

  const onSubmitSearchName1 = (val) => {
    setSearchName(val)
  }

  const toggleModalWindow = (url, alt) => {
    // setSearchName(({ showModal }) => ({
    //   showModal: !showModal,
    //   option: { imageUrl: url, imageAlt: alt },
    // }));

    setShowModal(false)
    setOption({ imageUrl: url, imageAlt: alt })


  };

  // const { searchName, showModal, option } = this.state
  console.log(toggleModalWindow);
  return (
    <Fragment>
      <Searchbar onSubmitSearchName={onSubmitSearchName1} />
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


export default App