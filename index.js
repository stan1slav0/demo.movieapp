import Alpine from 'alpinejs';
import Movies from './src/scripts/app';
import Persons from './src/scripts/persons';
import MoviesInfo from './src/scripts/movies';
import Profile from './src/scripts/profile';

document.addEventListener("DOMContentLoaded", function (event) {
  window.Alpine = Alpine
  Alpine.start()
  console.log('Alpine start')
});

document.addEventListener('alpine:init', () => {
  Alpine.data('Movies', Movies)
  Alpine.data('Persons', Persons)
  Alpine.data('MoviesInfo', MoviesInfo)
  Alpine.data('Profile', Profile)
})

export {
  Movies,
  Persons,
  MoviesInfo,
  Profile,
}

