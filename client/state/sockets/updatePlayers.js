import createPlayer from './../player/createPlayer'
import { createText } from '../utils'

const updatePlayers = (socket, otherPlayers, game) => {
  socket.on('update-players', playersData => {
    let playersFound = {}
    // Iterate over all players
    for (let index in playersData) {
      const data = playersData[index]
      // In case a player hasn't been created yet
      // We make sure that we won't create a second instance of it
      if (otherPlayers[index] === undefined && index !== socket.id) {
        const player = createPlayer(data.x, data.y, game)
        player.playerName = createText(game, player)
        player.speedText = createText(game, player)
        player.updatePlayerName(data.playerName.name, data.playerName.x, data.playerName.y)
        otherPlayers[index] = player
      }

      playersFound[index] = true

      // Update players data
      if (index !== socket.id) {
        // Update players target but not their real position
        otherPlayers[index].target_x = data.x
        otherPlayers[index].target_y = data.y

        otherPlayers[index].playerName.target_x = data.playerName.x
        otherPlayers[index].playerName.target_y = data.playerName.y

        otherPlayers[index].speedText.target_x = data.speed.x
        otherPlayers[index].speedText.target_y = data.speed.y

        otherPlayers[index].speed = data.speed.value
      }
    }

    // Check if there's no missing players, if there is, delete them
    for (let id in otherPlayers) {
      if (!playersFound[id]) {
        otherPlayers[id].sprite.destroy()
        otherPlayers[id].playerName.destroy()
        otherPlayers[id].speedText.destroy()
        delete otherPlayers[id]
      }
    }
  })
}

export default updatePlayers
