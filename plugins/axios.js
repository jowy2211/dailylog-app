/*
 * ===================================
 * Plugin extending Axios
 * ===================================
 * Documentation: https://axios.nuxtjs.org/
 */

export default function ({ redirect, $axios, app }) {
  $axios.onRequest((config) => {})

  $axios.onResponse((res) => {
    return Promise.resolve(res);
  })

  $axios.onResponseError((error) => {
    if (error.response) {
      const code = parseInt(error.response.status, 10)

      // Redirect to login if Unauthorize
      if (code === 401) {
        redirect('/');
      }
    }

    return Promise.reject(error?.response ?? error);
  })

  $axios.onError((error) => {
    if (error.response) {
      const code = parseInt(error.response.status, 10);

      // Redirect to login if Unauthorize
      if (code === 401) {
        redirect('/');
      }
    }

    return Promise.reject(error?.response ?? error);
  })
}
