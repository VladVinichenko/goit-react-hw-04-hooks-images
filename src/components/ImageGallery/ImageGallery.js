import propTypes from "prop-types";
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import s from './ImageGallery.module.css'
import fetchApi from '../../AppService';
import React, { useState, useEffect } from "react";
import { Fragment } from 'react/cjs/react.production.min';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

function ImageGallery({ searchName, onClickLargeImageURL }) {
  // static propTypes = {
  //   searchName: propTypes.string,
  //   onClickLargeImageURL: propTypes.func
  // }

  const [images, setImages] = useState([])
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [myRef, setMyRef] = useState(React.createRef())



  // console.log(onClickLargeImageURL);



  useEffect(() => {
    if (searchName.trim().length > 0) {
      setImages([])
      setStatus('pending')
      {
        fetchApi(searchName, page)
          .then(el => {
            if (el.hits.length === 0) {
              return Promise.reject(
                new Error(`No results were found for this: ${searchName}`)
              )
            }
            el.hits[0] = { ...el.hits[0], myRef: myRef };
            setImages([...images, ...el.hits])
            setStatus('resolved')

            scrollInto(myRef);
          })
          .catch(er => {
            setError(er);
            setStatus('rejected')
          }
          )
      }
    }
  }, [searchName, page])


  const scrollInto = elem => {
    elem.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  const nextPage = () => {
    setPage(page + 1)
  };



  // const { images, status, error } = this.state
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



// class ImageGallery extends PureComponent {
//   static propTypes = {
//     searchName: propTypes.string,
//     onClickLargeImageURL: propTypes.func
//   }

//   state = {
//     images: [],
//     status: 'idle',
//     error: null,
//     page: 1,
//     myRef: React.createRef(),
//   }


//   componentDidUpdate(prevProps, prevState) {
//     const searchName = this.props.searchName
//     if (
//       prevProps.searchName !== searchName ||
//       prevState.page !== this.state.page
//     ) {
//       if (
//         prevProps.searchName !== searchName ||
//         prevState.page !== this.state.page
//       ) {
//         if (prevProps.searchName !== searchName)
//           this.setState({ images: [], status: 'pending' }); {
//           fetchApi(searchName, this.state.page)
//             .then(el => {
//               if (el.hits.length === 0) {
//                 return Promise.reject(
//                   new Error(`No results were found for this: ${searchName}`)
//                 )
//               }
//               el.hits[0] = { ...el.hits[0], myRef: this.state.myRef };
//               this.setState({
//                 images: [...this.state.images, ...el.hits],
//                 status: 'resolved',
//               });
//               this.scrollInto(this.state.myRef);
//             })
//             .catch(error => this.setState({ error, status: 'rejected' }));
//         }
//       }
//     }
//   }

//   scrollInto = elem => {
//     elem.current.scrollIntoView({
//       behavior: 'smooth',
//       block: 'end',
//     });
//   };

//   nextPage = () => {
//     this.setState({
//       page: this.state.page + 1,
//     });
//   };



//   render() {
//     const { images, status, error } = this.state
//     return (
//       <Fragment>
//         {status === 'idle' && <p className={s.idle}>Input value</p>}
//         {status === 'rejected' && <strong className={s.strong}>{error.message}</strong>}

//         {images.length > 0 && (
//           <ul className={s.gallery} >
//             {
//               images.map(el => (
//                 <ImageGalleryItem
//                   key={el.id}
//                   url={el.webformatURL}
//                   alt={el.tags}
//                   myRef={el.myRef}
//                   largeImageURL={el.largeImageURL}
//                   onClickLargeImageURL={this.props.onClickLargeImageURL}
//                 />
//               ))
//             }


//           </ul>
//         )}

//         {status === 'pending' && <Loader />}
//         {status === 'resolved' && <Button action={this.nextPage}>Load more</Button>}
//       </Fragment>


//     )
//   }

// }

export default ImageGallery