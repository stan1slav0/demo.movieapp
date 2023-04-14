import { addFavorite, fetchFavorite, toggleFavorite, fetchUsers } from "./addToFavorite";
import { defaultUserImage } from "./defaultUserAvatar";
 

const Profile = () =>{

	const initialState = {
		assets: [],
		name: '',
		id:'',
		date:'',
		image:'',
		register: null,
		signIn: null,
		signUp: null,
		error:false,
		IsSignOut:false
	}

	const loadUserMovies = async function() {

		if(localStorage.hasOwnProperty('userId')){
			const fetchedData = await fetchFavorite ()

			const date = new Date(fetchedData.date * 1000); // multiply by 1000 to convert from seconds to milliseconds
			const formattedDateStr = date.toLocaleDateString("en-US", {day: "2-digit", month: "2-digit", year: "numeric"});
			const dateArr = formattedDateStr.split("/");
			const formattedDateString = `${dateArr[1]}.${dateArr[0]}.${dateArr[2]}`;

			this.date = formattedDateString
			this.name = fetchedData.name
			this.id = fetchedData.id
			this.image = fetchedData.image
			this.assets = fetchedData.movies.reverse()
			this.IsSignOut = true

			localStorage.setItem('userName', fetchedData.name)


		} else {
			this.register = true
			this.signOut = false
		}


	}

	function handleFileUpload(event) {
		const file = event.target.files[0];
		const reader = new FileReader();
	
		const userId = localStorage.getItem('userId');
		reader.onload = () => {
			const img = new Image();
			img.onload = () => {
				if (img.width > 650 || img.height > 650) {
					// Show error message
					alert('Image dimensions should be 350x350 or smaller');
					return;
				}
	
				const base64Image = reader.result.split(',')[1];
	
				fetch(`https://642ff50dc26d69edc887858a.mockapi.io/api/v1/users/${userId}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ image: base64Image })
				})
					.then(res => res.json())
					.then(res => console.log(res))
					.then(() => location.reload());

					localStorage.setItem('userAvatar', base64Image)
			};
			img.src = URL.createObjectURL(file);
		};
		reader.readAsDataURL(file);
	}
	
	
	
	
	

	const checkUser = function(user_name,user_pass){
		const userName = user_name.toLowerCase()

		fetchUsers()
		.then(data => {
			data.find((item) => {
				if(item.name === userName && item.password === user_pass){
					this.register = false
					localStorage.setItem('userId', item.id)
					location.reload()
				} else {
					this.error = 'No user found, register first'
				}
			})
		})
		.catch(error => {
			console.error('Error:', error);
		});
	}
	const registerUser = function(user_email, user_password,user_name) {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		const userName = user_name.toLowerCase()
		if(user_email && user_password && user_email && emailRegex.test(user_email)){
			if(user_password.length <= 4){
				this.error = 'Password length should be minimum 5 symbols'
			} else if(userName.length <= 1){
				this.error = 'Username length should be minimum 2 symbols'
			} else {
				fetchUsers()
				.then(data => {
					const existingUser = data.find(item => item.email === user_email || item.name === userName);
					if (existingUser) {
						console.log('User already exists.');
						this.error = 'User already exists'
					} else {
						const newUser = {
							name:userName,
							email: user_email,
							movies: [],
							password: user_password,
						};
						fetch('https://642ff50dc26d69edc887858a.mockapi.io/api/v1/users', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify(newUser)
						})
						.then(response => response.json())
						.then(data => {
							console.log(data)
							localStorage.setItem('userId', data.id)
							location.reload()
						})
						.catch(error => console.error(error));
					}
				})
				.catch(error => console.error(error));
			}
			
		} 
		
		else {
			this.error = 'Please enter valid username, email and password'
		}
	};
	

	const signOut = function(){
		localStorage.clear()
		this.assets = []
		this.name = null
		this.id = null
		this.date = null
		loadUserMovies.call(this)
	}


	return {
		...initialState,
		loadUserMovies,
		toggleFavorite,
		addFavorite,
		checkUser,
		signOut,
		registerUser,
		handleFileUpload
}

}


export default Profile



// const endpoint = 'users'; // Replace with the appropriate endpoint name

// 					const user = {
// 						"email": `${user_email}`,
// 						"movies": [],
// 						"password": `${user_pass}`,
// 					};

// 					fetch(`https://642ff50dc26d69edc887858a.mockapi.io/api/v1/${endpoint}`, {
// 						method: 'POST',
// 						headers: {
// 							'Content-Type': 'application/json'
// 						},
// 						body: JSON.stringify(user)
// 					})
// 					.then(response => response.json())
// 					.then(data => console.log(data))
// 					.catch(error => console.error(error));