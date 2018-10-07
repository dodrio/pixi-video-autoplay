import {
  Black,
  CanvasDriver,
  Input,
  TextField,
  GameObject,
  StageScaleMode,
  StageOrientation,
  SplashScreen,
} from 'black'
import videoAddress from 'Assets/video.mp4'

class Game extends GameObject {
  constructor() {
    super()

    SplashScreen.enabled = false
    Black.stage.scaleMode = StageScaleMode.LETTERBOX
    Black.stage.setSize(1500, 750)
    Black.stage.orientation = StageOrientation.PORTRAIT
    this.touchable = true
  }

  onAdded() {
    this.buttonCanvas = new TextField('BUTTON - CANVAS')
    this.buttonCanvas.size = 60
    this.buttonCanvas.color = 0xff0000
    this.buttonCanvas.align = 'center'
    this.buttonCanvas.alignAnchor()
    this.buttonCanvas.x = this.stage.centerX
    this.buttonCanvas.y = this.stage.centerY
    this.addChild(this.buttonCanvas)
    this.buttonCanvas.touchable = true
    this.buttonCanvas.on('pointerUp', () => this.playVideo())

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
    const { containerElement } = Black.instance
    containerElement.appendChild(button)
    button.addEventListener('touchend', () => this.playVideo())
  }

  playVideo() {
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

    const { containerElement } = Black.instance
    containerElement.appendChild(video)

    const promise = video.play()
    promise.then(_ => {}).catch(error => {
      alert('Autoplay was prevented. check the console.')
      console.error(error)
    })
  }
}

const black = new Black('game-container', Game, CanvasDriver, [Input])
black.start()
black.pauseOnBlur = false
black.pauseOnHide = false
