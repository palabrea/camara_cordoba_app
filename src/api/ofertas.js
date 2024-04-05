import {API_HOST} from '../utils/constantes';

export function getOfertasApi() {
  const url = `${API_HOST}/ofertas?_sort=fecha:DESC&_limit=100`;
  /*console.log(url);*/

  return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    });
}
