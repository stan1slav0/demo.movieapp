import { fetchMoviesFirstBlock,
	fetchTrendingMovies,
	fetchMoviesSecondBlock,
	fetchMovieById,
	fetchMovieYoutubeLink,
	fetchMovieCredits,
	fetchMovieSocials,
	fetchMoviesByName } from "./fetchMovies";
import { parseMovies, parseMovieById } from "./parseMovies";
import { scrollRight, onModalClose } from "./controllers";

import { addFavorite, fetchFavorite, removeFavorite, handleClick, toggleFavorite } from "./addToFavorite";

const Movies = () => {
  const initialState = {
		assets: [],
		isLoading: false,
		assetsSecond: [],
		backGround: null,
		movieInfo: {},
		youtube: '',
		actors: [],
		socials: {},
		firstMovie: '',
		searchAssets: [],
		searchValue: '',
		searchedIds: [],
		movieType:{
			total:[],
			movies: [],
			tv:[],
			person:[]
		},
		test : [],
		favorite: false,
		addToFav:false,
		remToFav:false
  };



	const loadTrendingMovies = async function(path) {

		this.isLoading = true
		this.assets = []
		const fetchedData = await fetchTrendingMovies(path)
		const parsedData = await parseMovies(fetchedData)
		this.assets = parsedData

		this.test = parsedData
		this.isLoading = false
	}

	const loadMoviesSecondBlock = async function(path) {

		this.assetsSecond = []
		this.firstMovie = ''
		const fetchedData = await fetchMoviesSecondBlock(path)
		const parsedData = await parseMovies(fetchedData)
		this.assetsSecond = parsedData
		this.firstMovie = parsedData[0].poster
	}

	const loadMovieById = async function(id){

		console.log(id);

		this.movieInfo = {}
		this.actors = []

		const fetchedMovieById = await fetchMovieById(id)
		const parsedMovieById = await parseMovieById(fetchedMovieById)
		const fetchedMovieYoutubeLink = await fetchMovieYoutubeLink(id)
		const fetchedActors = await fetchMovieCredits(id)
		const fetchedMovieSocials = await fetchMovieSocials(id)

		console.log(fetchedMovieById)

		this.movieInfo = parsedMovieById
		this.youtube = fetchedMovieYoutubeLink
		this.actors = fetchedActors
		this.socials = fetchedMovieSocials
	}

	const loadMoviesByName = async function(query, variable){

		this.searchAssets = []
		this.searchValue = ''

		const fetchedData = await fetchMoviesByName(query)

		const {multi_fetch,movie_fetch,person_fetch,tv_fetch} = await fetchMoviesByName(query)

		const parsedMultiData = await parseMovies(multi_fetch)
		const parsedMovieData = await parseMovies(movie_fetch)
		const parsedCollectionData = await parseMovies(person_fetch)
		const parsedTVData = await parseMovies(tv_fetch)

		// const parsedData = await parseMovies(fetchedData)
		const filteredMovieData = parsedMovieData.filter(item => item.poster && (item.title || item.name) && item.overview);
		const filteredTVData = parsedTVData.filter(item => item.poster && (item.title || item.name) && item.overview);
		const filteredCollectionData = parsedCollectionData.filter(item => item.poster && (item.title || item.name) && item.overview);


		const value = this.$refs.inputValue

		// console.log(value.value)

		// const filteredMoviesMovie = filteredData.filter(movie => movie.media_type === "movie");
		// const filteredMoviesTV = filteredData.filter(movie => movie.media_type === "tv");
		// const filteredMoviesPerson = filteredData.filter(movie => movie.media_type === "person");

		const allData = filteredMovieData.concat(filteredTVData,filteredCollectionData)

		this.searchValue = value.value
		this.searchAssets = allData
		this.movieType = {
			total:allData,
			movie: filteredMovieData,
			tv: filteredTVData,
			person: filteredCollectionData
		}


}



	return {
		...initialState,
		loadTrendingMovies,
		loadMoviesSecondBlock,
		loadMovieById,
		scrollRight,
		onModalClose,
		loadMoviesByName,
		addFavorite,
		fetchFavorite,
		toggleFavorite
	}
}

export default Movies

