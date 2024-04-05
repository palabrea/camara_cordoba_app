import {API_HOST} from '../utils/constantes';

export function getNoticiasApi() {
  const url = `${API_HOST}/noticias?_sort=fecha:DESC&_limit=100`;
  /*console.log(url);*/

  return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    });
}
