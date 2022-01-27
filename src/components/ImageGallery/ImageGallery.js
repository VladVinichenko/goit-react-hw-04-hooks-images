import propTypes from "prop-types";
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import s from './ImageGallery.module.css'
import fetchApi from '../../AppService';
import React, { useState, useEffect } from "react";
import { Fragment } from 'react/cjs/react.production.min';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

function ImageGallery({ searchName, onClickLargeImageURL }) {
  const [images, setImages] = useState([])
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const myRef = React.createRef()

  const fetchImages = (option) => {
    if (searchName.trim().length > 0) {
      option === 'searchName' && setImages([])
      setStatus('pending')

      fetchApi(searchName, page)
        .then(el => {
          if (el.hits.length === 0) {
            setImages([])
            return Promise.reject(
              new Error(`No results were found for this: ${searchName}`)
            )
          }
          el.hits[0] = { ...el.hits[0], myRef: myRef };

          if (option === 'searchName') {
            setImages([...el.hits])
          } else if (option === 'page') {
            setImages([...images, ...el.hits])
          }
          setStatus('resolved')
          scrollInto(myRef);
        })
        .catch(errorRejected => {
          setError(errorRejected);
          setStatus('rejected')
        }
        )

    }
  }

  useEffect(() => {
    fetchImages('page')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])


  useEffect(() => {
    fetchImages('searchName')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchName])



  const scrollInto = elem => {
    elem.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  const nextPage = () => {
    setPage(page + 1)
  };

  return (
    <Fragment>
      {status === 'idle' && <p className={s.idle}>Input value</p>}
      {status === 'rejected' && <strong className={s.strong}>{error.message}</strong>}

      {images.length > 0 && (
        <ul className={s.gallery} >
          {
            images.map(el => (
              <ImageGalleryItem
                key={el.id}
                url={el.webformatURL}
                alt={el.tags}
                myRef={el.myRef}
                largeImageURL={el.largeImageURL}
                onClickLargeImageURL={onClickLargeImageURL}
              />
            ))
          }
        </ul>
      )}
      {status === 'pending' && <Loader />}
      {status === 'resolved' && <Button action={nextPage}>Load more</Button>}
    </Fragment>
  )
}

ImageGallery.propTypes = {
  searchName: propTypes.string,
  onClickLargeImageURL: propTypes.func
}

export default ImageGallery