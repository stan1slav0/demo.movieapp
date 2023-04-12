import { fetchMoviesFirstBlock,
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
	fetchMoviesByName } from "./fetchMovies";
import { parseMovies, parseMovieById } from "./parseMovies";
import { scrollRight, onModalClose } from "./controllers";

import { addFavorite, fetchFavorite, toggleFavorite } from "./addToFavorite";


const MoviesInfo = () => {
	const initialState = {
		assets: [],
		isLoading: false,
		assetsSecond: [],
		backGround: null,
		movieInfo: {},
		youtube: '',
		actors: [],
		crew: {
			production: null,
			direction:null,
			editor:null,
			sound:null,
		},
		socials: {},
		keywords: [],
		reviews: {
			reviewData: [],
			authorIcon: '',
			sum: null
		},
		videos:[],
		recommendations:null,
		
  };

	const getDepartment = (res,variable,value) => {


		if(variable === 'cast'){
			return res.cast.filter(obj =>
				obj.known_for_department.includes(value)
			)
		} else {
			return res.crew.filter(obj =>
				obj.department.includes(value)
			)
		}

		
	}

	const getRandomMovieReview = (data) => {
		const randomIndex = Math.floor(Math.random() * data.length);
		return data[randomIndex];

	}

	const loadReviews = async function() {
		const movieID = window.location.search.slice(4)
		const movieReviews = await fetchMovieReview(movieID)


		if(movieReviews.results.length < 1){
			return
		}

		const randomMovieReview = getRandomMovieReview(movieReviews.results)
		let reviewAuthorIcon = randomMovieReview.author_details?.avatar_path?.slice(1)

		if(reviewAuthorIcon && reviewAuthorIcon.startsWith('https')){
			reviewAuthorIcon = reviewAuthorIcon
		} else {
			reviewAuthorIcon = 'https://www.gravatar.com/avatar/3a7a3b31264ef0ef57364f61a8ecdb08.jpg?s=300'
		}


		this.reviews = {
			reviewData: randomMovieReview,
			authorIcon: reviewAuthorIcon,
			sum: movieReviews.results.length >= 1 ? movieReviews.results.length : 0
		}
	}

	function loadRec (){
		loadMovies.call(this)
	}


	const loadMovies = async function(){

		const movieID = window.location.search.slice(4)
		const fetchedMovieById = await fetchMovieById(movieID)
		const parsedMovieById = await parseMovieById(fetchedMovieById)
		const fetchedMovieYoutubeLink = await fetchMovieYoutubeLink(movieID)
		const fetchedActors = await fetchMovieCredits(movieID)
		const fetchedMovieSocials = await fetchMovieSocials(movieID)
		const movieKeywords = await fetchKeywords(movieID)
		const movieVideos = await fetchMovieVideos(movieID)
		const movieRec = await fetchMovieRec(movieID)

		this.movieInfo = parsedMovieById
		this.youtube = fetchedMovieYoutubeLink
		this.actors = getDepartment(fetchedActors,'cast','Acting')
		this.crew.production = getDepartment(fetchedActors,'crew','Production').slice(0,2)
		this.crew.direction = getDepartment(fetchedActors,'crew','Directing').slice(0,2)
		this.crew.editor = getDepartment(fetchedActors,'crew','Editing').slice(0,2)
		this.crew.sound = getDepartment(fetchedActors,'crew','Sound').slice(0,2)
		this.socials = fetchedMovieSocials
		this.keywords = movieKeywords.keywords
		this.videos = movieVideos.results.slice(0,5)
		this.recommendations = movieRec.results.slice(0,10)
	}

	return {
		...initialState,
		loadMovies,
		loadReviews,
		loadRec,
		onModalClose,
		toggleFavorite,
		addFavorite
	}
}


export default MoviesInfo