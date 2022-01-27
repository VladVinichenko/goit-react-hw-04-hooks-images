import propTypes from 'prop-types'
import s from './ImageGalleryItem.module.css'

const ImageGalleryItem = ({ url, alt, myRef, largeImageURL, onClickLargeImageURL }) => {
  return (
    <li className={s.galleryItem}>
      {myRef ? (
        <img className={s.galleryImage} src={url} alt={alt} loading="lazy" ref={myRef} onClick={() => onClickLargeImageURL(largeImageURL, alt)} />
      ) : (
        <img className={s.galleryImage} src={url} alt={alt} loading="lazy" onClick={() => onClickLargeImageURL(largeImageURL, alt)} />
      )}
    </li>
  )
}

ImageGalleryItem.propTypes = {
  url: propTypes.string,
  alt: propTypes.string,
  myRef: propTypes.object,
  largeImageURL: propTypes.string,
  onClickLargeImageURL: propTypes.func
}

export default ImageGalleryItem