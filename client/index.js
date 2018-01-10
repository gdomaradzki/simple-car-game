import Game from './state/Game'

class App extends Phaser.Game {
  constructor () {
    super(800, 600, Phaser.AUTO)
    this.state.add('Game', Game)
    this.state.start('Game')
  }
}

const SimpleGame = new App()
