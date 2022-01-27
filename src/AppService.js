const BASE_URL = 'https://pixabay.com/api/'
const KEY = '24030637-9a01dbfa9269fe16917a62cc0'

export default function fetchApi(value, page) {

  const fetchSettings = `?q=${value}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  const url = BASE_URL + fetchSettings
  return fetch(url).then(
    res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(new Error('Ooops, something went wrong...'))
    }
  )

}