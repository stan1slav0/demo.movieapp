import { addFavorite, toggleFavorite } from "./addToFavorite";

const Persons = () => {
	const initialState = {
		assets: [],
		actorInfo: {
			name: '',
			image: '',
			biography: null,
			birthday: null,
			deathday: null,
			gender: null,
			homepage: null,
			id: null,
			imdb_id: null,
			known_for_department: null,
			place_of_birth: null,
			popularity: null,
			also_known_as: null,
			adult: false
		},
	};

	const API_KEY = '8e220846812eb2f79c6f5e6c22833230'

	const fetchActorByID = async function () {
		const personID = window.location.search.slice(4)
		const fetchURL = `https://api.themoviedb.org/3/person/${personID}?api_key=${API_KEY}&language=en-US`
		return await fetch(fetchURL)
			.then(res => res.json())
			.then(res => {
				return res
			})
	}

	const fetchMovieByActor = async function (personID) {
		const fetchURL = `https://api.themoviedb.org/3/person/${personID}/movie_credits?api_key=${API_KEY}&language=en-US`
		return await fetch(fetchURL)
			.then(res => res.json())
			.then(res => {
				return res
			})

	}

	const loadActorByID = async function () {
		const actorData = await fetchActorByID()
		const moviesData = await fetchMovieByActor(actorData.id)

		this.assets = moviesData.cast
		this.actorInfo.image = actorData.profile_path
		this.actorInfo.name = actorData.name
		this.actorInfo.biography = actorData.biography
		this.actorInfo.birthday = actorData.birthday
		this.actorInfo.deathday = actorData.deathday
		this.actorInfo.gender = actorData.gender === 2 ? 'Male' : 'Female'
		this.actorInfo.homepage = actorData.homepage
		this.actorInfo.id = actorData.id
		this.actorInfo.imdb_id = actorData.imdb_id
		this.actorInfo.known_for_department = actorData.known_for_department
		this.actorInfo.place_of_birth = actorData.place_of_birth
		this.actorInfo.popularity = Math.floor(actorData.popularity)
		this.actorInfo.also_known_as = actorData.also_known_as.length >= 1 ? actorData.also_known_as : false
		this.actorInfo.adult = actorData.adult
	}

	return {
		...initialState,
		loadActorByID,
		toggleFavorite,
		addFavorite
	}
}

export default Persons