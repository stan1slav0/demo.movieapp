const parseMovies = async function(data) {
	return data.results.map(item => {
		return {
			title: item.title,
			poster: item.poster_path,
			data: item.release_date,
			rating: item.vote_average?.toFixed(1),
			adult:item.adult,
			backdrop_poster:item.backdrop_path,
			id:item.id,
			language:item.original_language,
			overview:item.overview,
			genre:item.genre_ids,
			media_type:item.media_type,
			name:item.name,

		}
	})
}

const parseMovieById = async function(data){
	const duration = data.runtime;
	const hours = Math.floor(duration / 60); 
	const minutes = duration % 60;
	const formattedDuration = hours + 'h ' + minutes + 'mins';

	const formattedBudget = data.budget.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
	const formattedRevenue = data.revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' });


	return {
		adult:data.adult,
		backdrop_path:data.backdrop_path,
		budget:formattedBudget,
		genres:data.genres,
		homepage:data.homepage,
		id:data.id,
		imdb_id:data.imdb_id,
		original_language:data.original_language,
		overview:data.overview,
		popularity:data.popularity,
		poster:data.poster_path,
		production_companies:data.production_companies,
		release_date:data.release_date,
		release_data_sliced:data.release_date?.slice(0,4),
		revenue:formattedRevenue,
		runtime:formattedDuration,
		tagline:data.tagline,
		title:data.title,
		vote_average:data.vote_average?.toFixed(1),
		production_countries_iso:data.production_countries[0]?.iso_3166_1,
		status:data.status
	}
}


export {
	parseMovies,
	parseMovieById
}