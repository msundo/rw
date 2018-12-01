import SmoothScroll from 'smoothscroll' 		// https://www.npmjs.com/package/smooth-scroll

export default function initStickyMenu() {
	const sticky = document.querySelector('.js-menu')

	if (sticky) {

		const anchors = document.querySelectorAll('.js-menu .header__link')
		const underline = document.querySelector('.js-underline')
		const menuToggler = document.querySelector('.js-menu-toggler')
		const header = document.querySelector('header')

		menuToggler.addEventListener('click', () => {
			header.classList.toggle('is-open')
		})

		let anchorsArray = []

		function underlineAnchor(activeAnchor) {
			const left = activeAnchor.offsetLeft
			const width = activeAnchor.offsetWidth
			underline.setAttribute("style", "left: " + left + "px; width: " + width + "px;");
			underline.style.width = activeAnchor.offsetWidth
		}

		anchors.forEach(anchor => {
			anchor.addEventListener('click', event => {
				event.preventDefault
				event.stopPropagation

				header.classList.remove('is-open')
				// scroll.animateScroll(target)
				// underlineAnchor(target)
			})
			const ahref = anchor.getAttribute('href')
			const target = document.querySelector(ahref)
			anchorsArray.push(ahref)
		})

		anchorMenu(anchorsArray)

		
		function anchorMenu(anchorsArray) {
			let scrollPosition = window.pageYOffset

			// if (scrollPosition > navPosition) {
			// 	sticky.classList.add('is-sticky')
			// } else {
			// 	sticky.classList.remove('is-sticky')
			// }

			for (var i = 0; i < anchorsArray.length; i++) {
				const theID = anchorsArray[i]
				const divTop = document.querySelector(theID).offsetTop
				const divHeight = document.querySelector(theID).offsetHeight

				if (i === 0) {
					const activeAnchor = document.querySelector('.js-menu a[href="' + theID + '"]')
					underlineAnchor(activeAnchor)	
					// if (scrollPosition >= divTop && scrollPosition < (divTop + divHeight)) {
					// 	// activeAnchor.classList.add('is-active')
					// }
					// else {
					// 	document.querySelector('.js-menu a[href="' + theID + '"]').classList.remove('is-active')
					// }
				}

				else {
					const prevID = anchorsArray[i - 1],
						prevTop = document.querySelector(prevID).offsetTop,
						prevHeight = document.querySelector(prevID).offsetHeight
					
					scrollPosition = scrollPosition + 100

					// console.log(theID, 'total', prevTop + prevHeight, 'scrollPosition', scrollPosition)
					if (scrollPosition >= (prevTop + prevHeight) && scrollPosition < (divTop + divHeight)) {
						const activeAnchor = document.querySelector('.js-menu a[href="' + theID + '"]')
						underlineAnchor(activeAnchor)	
					}
					else {
						document.querySelector('.js-menu a[href="' + theID + '"]').classList.remove('is-active')
					}
				}
			
			}
		}
		// Functions to call when user scrolls
		window.onscroll = function () {
			anchorMenu(anchorsArray)
		}
	}
}