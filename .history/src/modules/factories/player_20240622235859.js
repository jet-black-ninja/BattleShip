import Gameboard from "./gameboard" ;
import Ship from "./ship" ;

const Player = (() =>{
    //player factory 
    const createPlayer = (playerName, playerIdentity) =>{
        const identity = playerIdentity;
        const map = Gameboard.createMap();
        let name = playerName;
        let searchQueue = [];
        
        //Getters 
        function getName() {
            return name;
        }
        function getIdentity() {
            return identity;
        }
        function getMap() {
            return map;
        }
        
        //setters 

        function setName (newName){
            name = newName ;
        }
    }
})