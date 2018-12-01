import '../styles/main.scss'
import './polyfills'
import initStickyMenu from './sticky-menu'
import initContact from './contact';
import initQuotes from './quotes';

window.onload = () => {
	initContact()
	initQuotes()
	initStickyMenu()
}
