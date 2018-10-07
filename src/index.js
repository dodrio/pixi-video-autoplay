import * as PIXI from 'pixi.js'
import videoAddress from 'Assets/video.mp4'

const containerElement = document.querySelector('#game-container')

// PIXI BUTTON
const app = new PIXI.Application()
containerElement.appendChild(app.view)
const buttonCanvas = new PIXI.Text('BUTTON - CANVAS', {
  fill: ['#ffffff', '#00ff99'],
})
buttonCanvas.x = 50
buttonCanvas.y = 300
buttonCanvas.interactive = true
app.stage.addChild(buttonCanvas)
buttonCanvas.on('pointerup', () => playVideo())

// DOM BUTTON
const button = document.createElement('div')
button.innerHTML = 'BUTTON - DOM'
button.style.position = 'absolute'
button.style.top = '0'
button.style.left = '0'
button.style.marginTop = '40%'
button.style.width = '100%'
button.style.textAlign = 'center'
button.style.color = 'green'
button.style.fontSize = '30px'
containerElement.appendChild(button)
button.addEventListener('touchend', () => playVideo())

function playVideo() {
  const video = document.createElement('video')
  video.src = videoAddress
  video.style.position = 'absolute'
  video.style.top = '0'
  video.style.left = '0'
  video.style.width = '200px'
  video.style.height = '200px'
  video.style.zIndex = 2
  video.setAttribute('preload', 'auto')
  video.setAttribute('playsinline', '')

  // WebKit-based browser adaptation
  video.setAttribute('webkit-playsinline', '')

  // Tencent x5 adaptation
  video.setAttribute('x5-playsinline', '')
  video.setAttribute('x5-video-player-type', 'h5')

  containerElement.appendChild(video)

  const promise = video.play()
  promise.then(_ => {}).catch(error => {
    alert('Autoplay was prevented. check the console.')
    console.error(error)
  })
}
