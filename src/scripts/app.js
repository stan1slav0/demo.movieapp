import {
	fetchTrendingMovies,
	fetchMoviesSecondBlock,
	fetchMovieById,
	fetchMovieYoutubeLink,
	fetchMovieCredits,
	fetchMovieSocials,
	fetchMoviesByName
} from "./fetchMovies";
import { parseMovies, parseMovieById } from "./parseMovies";
import { addFavorite, fetchFavorite, toggleFavorite } from "./addToFavorite";

const Movies = () => {
	const initialState = {
		isSearch: false,
		assets: null,
		isLoading: false,
		assetsSecond: null,
		backGround: null,
		movieInfo: null,
		youtube: null,
		actors: null,
		socials: null,
		firstMovie: null,
		searchAssets: null,
		searchValue: null,
		searchedIds: null,
		movieType: {
			total: null,
			movies: null,
			tv: null,
			person: null
		},
		test: null,
		favorite: false,
		addToFav: false,
		remToFav: false
	};

	const loadTrendingMovies = async function (path) {
		this.isLoading = true
		const fetchedData = await fetchTrendingMovies(path)
		const parsedData = await parseMovies(fetchedData)
		this.assets = parsedData
		this.isLoading = false
	}

	const loadMoviesSecondBlock = async function (path) {
		this.isLoading = true
		const fetchedData = await fetchMoviesSecondBlock(path)
		const parsedData = await parseMovies(fetchedData)
		this.assetsSecond = parsedData
		this.firstMovie = parsedData[0].poster
		this.isLoading = false
	}

	const loadMovieById = async function (id) {
		const fetchedMovieById = await fetchMovieById(id)
		const parsedMovieById = await parseMovieById(fetchedMovieById)
		const fetchedMovieYoutubeLink = await fetchMovieYoutubeLink(id)
		const fetchedActors = await fetchMovieCredits(id)
		const fetchedMovieSocials = await fetchMovieSocials(id)
		this.movieInfo = parsedMovieById
		this.youtube = fetchedMovieYoutubeLink
		this.actors = fetchedActors
		this.socials = fetchedMovieSocials
	}

	const loadMoviesByName = async function (query) {
		const {movie_fetch, person_fetch, tv_fetch } = await fetchMoviesByName(query)
		const parsedMovieData = await parseMovies(movie_fetch)
		const parsedCollectionData = await parseMovies(person_fetch)
		const parsedTVData = await parseMovies(tv_fetch)
		const filteredMovieData = parsedMovieData.filter(item => item.poster && (item.title || item.name) && item.overview);
		const filteredTVData = parsedTVData.filter(item => item.poster && (item.title || item.name) && item.overview);
		const filteredCollectionData = parsedCollectionData.filter(item => item.poster && (item.title || item.name) && item.overview);
		const value = this.$refs.inputValue
		const allData = filteredMovieData.concat(filteredTVData, filteredCollectionData)
		this.searchValue = value.value
		this.searchAssets = allData
		this.movieType = {
			total: allData,
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
		loadMoviesByName,
		addFavorite,
		fetchFavorite,
		toggleFavorite
	}
}

export default Movies

