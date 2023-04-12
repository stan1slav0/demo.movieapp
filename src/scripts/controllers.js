
const scrollRight = () => {
	const scrollable = this.$refs.scrollable;
	scrollable.scrollBy({ left: 300, behavior: 'smooth' });
}

const onModalClose = () => {
	const iframe = document.getElementById('youtube-video');
	const src = iframe.getAttribute('data-src');
	iframe.setAttribute('src', '');
	iframe.setAttribute('src', src);
}

export {
	scrollRight,
	onModalClose
}





