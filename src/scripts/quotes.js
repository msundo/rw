export default function initQuotes() {
	const quotes = document.querySelectorAll('.quotes__item.is-expandable')
	const headerHeight = document.querySelector('header').clientHeight

	quotes.forEach(quote => {
		quote.addEventListener('click', event => {
			const quoteOffset = quote.offsetTop - headerHeight - 20
			
			quote.classList.toggle('is-open')
			window.scrollTo({
				top: quoteOffset,
				behavior: 'smooth'
			})
		})
	})
		
	// Automatic quote expander... 
	/*
	const quoteHeightLimit = 320
	quotes.forEach(quote => {
		const quoteHeight = quote.clientHeight
			console.log(quoteHeight, quoteHeightLimit)
		if (quoteHeight > quoteHeightLimit) {
			console.log(quote)
			const headerHeight = document.querySelector('header').clientHeight
			
			quote.classList.add('is-expandable')
			
			quote.addEventListener('click', event => {
				const quoteOffset = quote.offsetTop - headerHeight - 20
				
				quote.classList.toggle('is-open')
				window.scrollTo({
					top: quoteOffset,
					behavior: 'smooth'
				})
			})
		}
		
	} )
*/
}