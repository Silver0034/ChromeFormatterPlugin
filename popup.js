document.addEventListener(
	'DOMContentLoaded',
	() => {
		// on page load

		// get objects
		const button = document.getElementById('button')
		const input = document.getElementById('input')
		const error = document.getElementById('error')
		const clear = document.getElementById('clear')
		const copy = document.getElementById('copy')

		// format text in input on button click
		button.addEventListener(
			'click',
			() => {
				try {
					// hide error message
					error.classList.add('hidden')

					const ugly = input.value

					// don't format (and don't throw error) if empty
					if (ugly.length === 0) {
						return
					}

					// format json
					const obj = JSON.parse(ugly)
					const pretty = JSON.stringify(obj, null, 4)
					// replace textarea content with pretty json
					input.value = pretty

					// select the json
					input.select()
					// copy the json
					document.execCommand('copy')
					// remove selection
					window.getSelection().removeAllRanges()
					return
				} catch (err) {
					// create div to put error message in
					let errorDiv = document.createElement('div')
					// grab inner text from error
					errorDiv.innerText = err.message
					// put inner text into error display
					error.innerText = errorDiv.innerHTML
					// show error
					error.classList.remove('hidden')

					return
				}
			},
			false
		)

		// copy content to clipboard
		copy.addEventListener(
			'click',
			() => {
				// hide error message
				error.classList.add('hidden')
				// select the json
				input.select()
				// copy the json
				document.execCommand('copy')
				return
			},
			false
		)

		// clear the content
		clear.addEventListener(
			'click',
			() => {
				// hide error message
				error.classList.add('hidden')
				// clear the content
				input.value = ''

				return
			},
			false
		)
	},
	false
)
chrome.browserAction.onClicked.addListener(function () {
	chrome.tabs.create({ url: chrome.runtime.getURL('localpage.html') })
})
