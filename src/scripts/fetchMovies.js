const API_KEY = '8e220846812eb2f79c6f5e6c22833230'

const fetchMoviesFirstBlock = async function (path) {
  let variable
  switch (path) {
    case 'top_rated':
      variable = 'top_rated'
      break
    case 'popular':
      variable = 'popular'
      break
  }
  const fetchURL = `https://api.themoviedb.org/3/movie/${variable}?api_key=${API_KEY}&language=en-US`
  return await fetch(fetchURL)
    .then(res => res.json())
    .then(res => {
      return res
    })
}

const fetchTrendingMovies = async function (path) {
  let variable
  switch (path) {
    case 'day':
      variable = 'day'
      break
    case 'week':
      variable = 'week'
      break
  }
  const fetchURL = `https://api.themoviedb.org/3/trending/all/${variable}?api_key=${API_KEY}&language=en-US&region=UA`
  return await fetch(fetchURL)
    .then(res => res.json())
    .then(res => {
      return res
    })
}

const fetchMoviesSecondBlock = async function (path) {
  let variable
  switch (path) {
    case 'upcoming':
      variable = 'upcoming'
      break
    case 'top_rated':
      variable = 'top_rated'
      break
    case 'popular':
      variable = 'popular'
      break
  }
  const fetchURL = `https://api.themoviedb.org/3/movie/${variable}?api_key=${API_KEY}&language=en-US`
  return await fetch(fetchURL)
    .then(res => res.json())
    .then(res => {
      return res
    })
}

const fetchMovieById = async function (id) {
  const fetchURL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
  return fetch(fetchURL)
    .then(res => res.json())
    .then(res => {
      return res
    })
}

const fetchMovieYoutubeLink = async function (id) {
  const fetchURL = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
  return fetch(fetchURL)
    .then(res => res.json())
    .then(res => {
      if (!res.results.length) {
        return null
      } else {
        const filteredObjects = res.results.filter(obj =>
          obj.type.includes('Trailer')
        )
        return filteredObjects[0].key
      }
    })
}

const fetchMovieCredits = async function (id) {
  const fetchURL = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
  return fetch(fetchURL)
    .then(res => res.json())
    .then(res => {
      return res
    })
}

const fetchKeywords = async function (id) {
  const fetchURL = `https://api.themoviedb.org/3/movie/${id}/keywords?api_key=${API_KEY}&language=en-US`
  return fetch(fetchURL)
    .then(res => res.json())
    .then(res => {
      return res
    })
}

const fetchMovieReview = async function (id) {
  const fetchURL = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&language=en-US`
  return fetch(fetchURL)
    .then(res => res.json())
    .then(res => {
      return res
    })
}

const fetchMovieVideos = async function (id) {
  const fetchURL = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
  return fetch(fetchURL)
    .then(res => res.json())
    .then(res => {
      return res
    })
}

const fetchMovieRec = async function (id) {
  const fetchURL = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US`
  return fetch(fetchURL)
    .then(res => res.json())
    .then(res => {
      return res
    })
}

const fetchMovieSocials = async function (id) {
  const fetchURL = `https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=${API_KEY}&language=en-US`
  return fetch(fetchURL)
    .then(res => res.json())
    .then(res => {
      return res
    })
}

const fetchMoviesByName = async function (query) {
  const fetchMultiURL = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}`
  const fetchMovieURL = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`
  const fetchPersonURL = `https://api.themoviedb.org/3/search/collection?api_key=${API_KEY}&query=${query}`
  const fetchTvURL = `https://api.themoviedb.org/3/search/tv?query=${query}&api_key=${API_KEY}`
  const urls = {
    multi_fetch: fetchMultiURL,
    movie_fetch: fetchMovieURL,
    person_fetch: fetchPersonURL,
    tv_fetch: fetchTvURL,
  };
  const promises = Object.keys(urls).map(key => {
    return fetch(urls[key]).then(response => response.json());
  });
  return Promise.all(promises)
    .then(data => {
      return Object.fromEntries(
        Object.keys(urls).map((key, index) => [key, data[index]])
      );
    })
    .catch(error => {
      console.error(error);
    });
}

export {
  fetchMoviesFirstBlock,
  fetchTrendingMovies,
  fetchMoviesSecondBlock,
  fetchMovieById,
  fetchMovieYoutubeLink,
  fetchMovieCredits,
  fetchMovieSocials,
  fetchKeywords,
  fetchMovieReview,
  fetchMovieVideos,
  fetchMovieRec,
  fetchMoviesByName
}
