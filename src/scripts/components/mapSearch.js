import loadGoogleMapsAPI from 'load-google-maps-api'
import mapStyleAlt from './mapStyleAlt'
import apiData from '../data/apiData.json'
import uniq from 'lodash/uniq'
import mapText from '../data/mapText.json'
import icons from './icons'
import MarkerClusterer from 'marker-clusterer-plus'
import axios from 'axios'

function coopMap() {
    const $mapContainerPresent = document.getElementById('map-c8vhal22')
    const $council = document.querySelector('[data-map-council]')
    const $board = document.querySelector('[data-map-board]')

    if ($mapContainerPresent) {
        const text = mapText,
            pin = icons.pin,
            clusterPin = icons.clusterPin

        // set variables
        let map = "",
            activeMarkers = [],
            mapMarkerClusterer,
            geocoder,
            districts = [],
            activeDistrict = '',
            activeInfoWindows = [],
            activeMembers = [],
            members,
            mapHTML,
            dataLoaded = false

        // Set data
        if ($council) {
			// boardmembers is referred to as council members throughout this file
            let boardmembersUrl = './umbraco/api/maps/boardmembers'
			boardmembersUrl = 'https://dev-coop-forum.s1.umbraco.io/umbraco/api/maps/boardmembers'
            console.log('axios')

			axios.get(boardmembersUrl)
			.then(function (response) {
			  	console.log(response.data)
				members = response.data
				startMap(members)
			})
			.catch(function (error) {
			  	// handle error
			  	console.log(error);
			})

            mapHTML = `
			<div class="coop-map">
				<div class="coop-map__wrapper">
					<div class="coop-map__heading">${text.council.heading} <span data-map-heading></span></div>
					<p>${text.council.subheading}</p>
					<div class="coop-map__map">
						<div id="map-container-c8vhal22" class="coop-map__g-map"></div>
						<div class="filter" data-map-filter>
							<div data-map-filter="" class="filter__item">Alle distrikter</div>
						</div>
					</div>
					<div data-map-members-container class="members">
						<div class="members__heading">Landsrådsmedlemmer valgt <span data-map-heading></span></div>
						<div data-map-members-list></div>
					</div>
				</div>
			</div>`

        }
        if ($board) {
			// boardmembers here refers to the data obtained from https://api-si.tst.cl.coop.dk/experience/store/v2/store

            members = apiData
            mapHTML = `
			<div class="coop-map">
				<div class="coop-map__wrapper">
					<div class="coop-map__heading">${text.board.heading}<span data-map-heading></span></div>
					<p>${text.board.subheading}</p>
					<div class="coop-map__postalcode">
						<input id="postal-code-search" class="coop-map__input" type="text" placeholder="${text.board.placeholder}" value="">
						<div class="coop-map__submit">${text.board.buttonPostalCodeSearch}</div>
						<div class="coop-map__reset">${text.board.reset}</div>
					</div>
					<div class="coop-map__map">
						<div id="map-container-c8vhal22" class="coop-map__g-map"></div>
					</div>
				</div>
			</div>`
		}
		
		members = apiData
		startMap(members)
        $mapContainerPresent.innerHTML = mapHTML

        function startMap(members) {

		
			// set selectors
			const $mapHeadings = document.querySelectorAll('[data-map-heading]'),
            $membersContainer = document.querySelector('[data-map-members-container]'),
            $membersList = document.querySelector('[data-map-members-list]'),
            $filter = document.querySelector('[data-map-filter]')


			const mapOptions = {
				zoom: 7,
				maxZoom: 18,
				center: {
					lat: 56,
					lng: 11
				},
				styles: mapStyleAlt,
				mapTypeControl: false,
				fullscreenControl: false
            }
			
            const googleMaps = loadGoogleMapsAPI({
                key: "AIzaSyAEH2WhxX8RAHXWSEqkrh6vWeinYurdsOE",
                language: 'da',
            })
                .then(() => {
                    map = new google.maps.Map(document.getElementById("map-container-c8vhal22"), mapOptions) // map          
                    geocoder = new google.maps.Geocoder()
                })
				.then(() => {
                    if ($council) {
						console.log('')
						councilInit(members)
					}
					if ($board) {
						boardInit(members)
					}
				})
				.catch(error => console.log('error: ', error))

			
			
			
			function councilInit(members) {
				members.forEach(function (member, map, i) {
					if (member.district) {
						districts.push(member.district.name) // add all districts to array
					}
					else {
						member.district = ''
					}
				})
				districts = uniq(districts)
				activeMembers = members
				console.log(districts)
				createMarkersAndInfoWindows(members)

				// only unique entries
				districts.forEach((district) => {

					// create and append new district filter item			
					const filterItem = document.createElement('div')
					filterItem.classList.add('filter__item')
					filterItem.setAttribute('data-map-filter', district)
					filterItem.innerHTML = district
					$filter.appendChild(filterItem)
				})

				// Add click events to handle district filtering
				const districtFilters = document.querySelectorAll('.filter__item')
				districtFilters.forEach((filter) => {
					filter.addEventListener('click', function (element) {
						activeDistrict = this.getAttribute('data-map-filter')
						deleteMarkers()
						if (this.classList.contains('is-active')) {
							districtFilters.forEach((el) => {
								this.classList.remove('is-active')
							})
							this.classList.add('is-active')
						} else {
							districtFilters.forEach((el) => {
								el.classList.remove('is-active')
							})
							this.classList.add('is-active')
						}
						if (activeDistrict === '') {
							$mapHeadings.forEach((element) => {
								element.innerText = ''
							})
							$membersContainer.classList.remove('is-visible')
							$membersList.innerHTML = '' // empty members
							createMarkersAndInfoWindows(members)
							return
						} else {
							$mapHeadings.forEach((element) => {
								element.innerText = 'i ' + activeDistrict
							})
							// update list 
							updateMembersOnClick(members, activeDistrict)
						}
						createMarkersAndInfoWindows(activeMembers)
					})
				})
			}

			function boardInit(members) {
				activeMembers = members
				createMarkersAndInfoWindows(members)
				const $postalCodeSearch = document.getElementById('postal-code-search')
				const $postalCodeSubmit = document.querySelector('.coop-map__submit')
				const $postalCodeReset = document.querySelector('.coop-map__reset')

				$postalCodeSearch.addEventListener("keyup", function (event) {
					event.preventDefault();
					if (event.keyCode === 13) {
						submitPostalCodeSearch()
					}
				});

				$postalCodeSubmit.addEventListener('click', (el) => {
					submitPostalCodeSearch()
				})

				function submitPostalCodeSearch() {
					$postalCodeReset.classList.add('is-visible')

					const code = $postalCodeSearch.value

					if (code !== "") {
						$postalCodeSearch.classList.remove('has-error')
						const findPostalCodeMembers = members.filter(member => {
							return member.address.postalCode === code
						})
						console.log(findPostalCodeMembers)
						deleteMarkers()
						createMarkersAndInfoWindows(findPostalCodeMembers)
					} else {
						$postalCodeSearch.classList.add('has-error')
					}
				}
				$postalCodeReset.addEventListener('click', (el) => {
					$postalCodeSearch.value = ''
					$postalCodeReset.classList.remove('is-visible')
					deleteMarkers()
					createMarkersAndInfoWindows(members)
				})

			}

			function updateMembersOnClick(members, activeDistrict) {
				$membersList.innerHTML = ''
				const filteredMembers = members.filter(member => {
					if (member.district) {
						return member.district.name === activeDistrict

					}
					else {
						console.log('no district');
						
					}
				})
				activeMembers = filteredMembers
				$membersContainer.classList.add('is-visible')
				filteredMembers.forEach((member) => {
					const $memberItem = document.createElement('div')
					$memberItem.classList.add('members__member')
					$memberItem.innerHTML = councilMemberTemplate(member)
					$membersList.appendChild($memberItem) // insert filtered members
				})
			}

			// Deletes all markers in the array by removing references to them.
			function deleteMarkers() {
				mapMarkerClusterer.clearMarkers()
				clearMarkers()
				for (var i = 0; i < activeMarkers.length; i++) {
					activeMarkers[i].setMap(null)
				}
				activeMarkers = []
			}

			// Sets the map on all markers in the array.
			function setMapOnAll(map) {
				for (var i = 0; i < activeMarkers.length; i++) {
					activeMarkers[i].setMap(map)
				}
			}

			// Removes the markers from the map, but keeps them in the array.
			function clearMarkers() {
				setMapOnAll(null)
			}

			// Deletes all markers in the array by removing references to them.
			// function deleteMarkers() {
			//     clearMarkers()
			//     activeMarkers = []
			// }

			function createMarkersAndInfoWindows(members) {
				let bounds = new google.maps.LatLngBounds()
				console.log(members)

				members.forEach((member) => {
					const $memberItem = document.createElement('div')
					$memberItem.innerHTML = councilMemberTemplate(member)
					
					document.body.appendChild($memberItem)
					
					
					const position = new google.maps.LatLng(member.address.latitude, member.address.longitude)
					const marker = new google.maps.Marker({
						map: map,
						position: position,
						icon: pin
					})
					activeMarkers.push(marker)
					bounds.extend(marker.position)
					marker.addListener('click', event => {
						// clear former info windows
						if (activeInfoWindows.length > 0) {
							for (let i = 0; i < activeInfoWindows.length; i++) {
								activeInfoWindows[i].close()
								activeInfoWindows = []
							}
						}

						const $memberItem = document.createElement('div')
						if ($council) {
							$memberItem.classList.add('members__member', 'members--infowindow')
							$memberItem.innerHTML = councilMemberTemplate(member)
						}
						if ($board) {
							$memberItem.classList.add('members__member', 'members--infowindow', 'members--board')
							$memberItem.innerHTML = boardMemberTemplate(member)
						}
						const infowindow = new google.maps.InfoWindow({
							content: $memberItem
						})

						google.maps.event.addListener(map, "click", function (event) {
							infowindow.close();
						});
						activeInfoWindows.push(infowindow)
						infowindow.open(map, marker)
					})
					


				})
				let mcStyles = [ {
					textSize: 16,
					textColor: '#FFF',
					width: 40,
					height: 58,
					url: icons.clusterPin,
					anchorText: [-6, -1],
					anchorIcon: [56, 20]
				}]

				let mcOptions = {
					gridSize: 50,
					maxZoom: 16,
					styles: mcStyles
				}
				mapMarkerClusterer = new MarkerClusterer(map, activeMarkers, mcOptions)
				map.fitBounds(bounds)
			}

			const councilMemberTemplate = function (member) {
				return `
				<div class="members__image">
				<img src="${member.memberDetails.image}">
				</div>
				<div class="members__text">
				<div class="members__info members__flex-column">
				<div class="members__title">${member.memberDetails.firstNames} ${member.memberDetails.lastName}</div>
				<a href="mailto:${member.contactDetails.emailAddress}" title="Send email to ${member.contactDetails.emailAddress}" class="members__email">${member.contactDetails.emailAddress}</a>
				<a href="tel:${member.contactDetails.phoneNumber}" class="members__phone">${member.contactDetails.phoneNumber}</a>
				<a href="tel:${member.contactDetails.mobilePhoneNumber}" class="members__mobile">${member.contactDetails.mobilePhoneNumber}</a>
				</div>
				<div class="members__store members__flex-column">
				<div class="members__title">${member.memberships.organization.name}</div>
				<div>
				<div>${member.address.streetName + ' ' + member.address.houseNumber}</div>
				<div>${member.address.postalCodeNumber}</div>
				<div>${member.district.name}</div>
				</div>
				</div>
				</div>`;
			}

			const boardMemberTemplate = function (member) {
				return `
				<div class="members__text">
				<div class="members__info">
				<div class="members__title">${member.name}</div>
				<div>${member.address.street}</div>
				<div>${member.address.postalCode + ' ' + member.address.city}</div>
				<div>${member.storeResponsible.title}</div>
				<div>${member.storeResponsible.firstNames + ' ' + member.storeResponsible.lastName}</div>
				<div>${member.storeResponsible.title}</div>
				<a href="mailto:${member.storeResponsible.contactDetails.emailAddress}" title="Send email to ${member.storeResponsible.contactDetails.emailAddress}" class="members__email">${member.storeResponsible.contactDetails.emailAddress}</a>
				<a href="tel:${member.storeResponsible.contactDetails.phoneNumber}" class="members__phone">${member.storeResponsible.contactDetails.phoneNumber}</a>
				<a href="tel:${member.storeResponsible.contactDetails.mobilePhoneNumber}" class="members__mobile">${member.storeResponsible.contactDetails.mobilePhoneNumber}</a>
				</div>
				</div>`;
			}
		}
        
    }
}
export default coopMap()