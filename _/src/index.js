// https://webpack.js.org/guides/getting-started/
// npm i -D webpack@latest webpack-cli@latest webpack-dev-server@latest

import _ from 'lodash'
import './style.css'
import Icon from './favicon.ico'
import printMe from './print.js'

function component() {
	const element = document.createElement('div')

	// Lodash, now imported by this script
	const btn = document.createElement('button')

	element.innerHTML = _.join(['Hello', 'webpack'], ' ')

	btn.innerHTML = 'Click me and check the console!'
	btn.onclick = printMe
	element.appendChild(btn)

	element.classList.add('hello')

	const myIcon = new Image()
	myIcon.src = Icon
	element.appendChild(myIcon)

	return element
}

document.body.appendChild(component())
// console.log('🚀 ~ file: index.js ~ line 31 ~ component()', component())

// console.log(document.querySelector('#short'))
document.querySelector('#short').innerHTML = 'hello shortJS'
document.getElementById("short").innerHTML = "hello shortJS"
$$.Id('short').innerHTML = 'hello shortJS'
$$.Id('short_index').innerHTML = 'hello shortJS short_index'

// if (module.hot) {
//   console.log("🚀")
// 	module.hot.accept('./print.js', function () {
// 		console.log('Accepting the updated printMe module! 2')
// 		printMe()
// 	})
// }

// printMe()
