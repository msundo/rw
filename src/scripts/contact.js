import axios from 'axios'
export default function initContact() {
	const form = document.getElementById('contact-form')
	const formSubmit = document.getElementById('contact-submit')
	
	formSubmit.addEventListener('click', event => {
		
		if(form.checkValidity()){
			event.preventDefault()
			const 	name = document.getElementById('contact-name').value,
					email = document.getElementById('contact-email').value,
					msg = document.getElementById('contact-msg').value
		
			const url = 'https://hooks.zapier.com/hooks/catch/4115451/chmt0e?name=' + name + '&email=' + email + '&msg=' + msg
		
			axios.post(url).then(response => {
				console.log(response)
			})
			.catch(error => {
				console.log(error)
			})
		}
			
		else{
			return
		}
	})
}