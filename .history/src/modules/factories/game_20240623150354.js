import Player from './player'

const Game =( () => {
    const state = initializeGame();

    function initiatlizeGame(){
        const player = Player.createPlayer('Captain','Player')
        const cpu = Player.createPlayer('cpu','cpu');

        return {
            player, cpu, getPlayer, getCpu 
        };
    }
        // Getters
        function getState(){
            return this.state;
        }
        function getPlayer(){
            return this.player;
        }
        function getCPU(){
            return this.cpu;
        }
        // Setters
        function setPlayerName(name ='Captain'){
            getState().getPlayer().setName(name);
        }

        return { state, getState, setPlayerName}
})()
export default Game;