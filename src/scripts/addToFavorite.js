const fetchFavorite = function() {
	const userId = localStorage.getItem('userId')
	return fetch('https://642ff50dc26d69edc887858a.mockapi.io/api/v1/users')
	.then(response => response.json())
	.then(data => {
		localStorage.removeItem('favorites')
		const objWithUserId = data.find(item => item.id === userId);
		return objWithUserId


	})
	.catch(error => {
		console.error('Error:', error);
	});
}

const fetchUsers = function() {
	return fetch('https://642ff50dc26d69edc887858a.mockapi.io/api/v1/users')
	.then(response => response.json())
	.then(data => {
		return data
	})
	.catch(error => {
		console.error('Error:', error);
	});
}


const _putDataInCache = (data) => {
	const storage = localStorage;
	
	storage.setItem("apiData", JSON.stringify(data));
};


const addFavorite = function(id,title,poster,date,rating){
	fetchFavorite()
	.then(res => {
		const userId = res.id
		const dataRes = res.movies.map(item => {return item})
		const findSame = dataRes.find(item => item.id === id)

		if(!findSame){
			const data = [{
				id:id,
				title:title,
				poster:poster,
				favorite:true,
				date:date,
				rating:rating
			}]
			const nestedArray = [dataRes,data];
			const flattenedArray = [].concat(...nestedArray);
			fetch(`https://642ff50dc26d69edc887858a.mockapi.io/api/v1/users/${userId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({movies: flattenedArray})
				})
				.then(res => res.json())
				.then(() => _putDataInCache(flattenedArray))


				console.log('added')

		} else {
			const dataRes = res.movies.map(item => {return item})
			const newArray = dataRes.filter(item => item.id !== id);
			fetch(`https://642ff50dc26d69edc887858a.mockapi.io/api/v1/users/${userId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({movies: newArray})
				})
				.then(res => res.json())
				.then(() => _putDataInCache(newArray))

				console.log('removed')
		}
	})
}


function toggleFavorite(movies) {
  const list = Alpine.reactive(JSON.parse(localStorage.getItem('favorites') || '[]'));
  let removed = [];

  function toggle(movieId) {
    const index = list.indexOf(movieId);
    if (index === -1) {
      list.push(movieId);
    } else {
      list.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(list));
  }

  function remove(movieId) {
    const index = list.indexOf(movieId);
    if (index !== -1) {
      list.splice(index, 1);
      removed = movies.filter(movie => movie.id !== movieId);
      localStorage.setItem('favorites', JSON.stringify(list));
    }
  }

  if (!localStorage.hasOwnProperty('favorites') || localStorage.getItem('favorites') === '[]') {
		fetchFavorite()
      .then(data => {
        const favoriteIds = data.movies.map(item => item.id);
        localStorage.setItem('favorites', JSON.stringify(favoriteIds));
        list.splice(0, list.length, ...favoriteIds);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return { list, toggle, removed, remove };
}








export {
	addFavorite,
	fetchFavorite,
	toggleFavorite,
	fetchUsers
}
