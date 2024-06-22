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
        
        //Setters 

        function setName (newName){
            name = newName ;
        }
        
        //Checkers

        function isEmptyField(coordinate){
            const [x,y] = coordinate;
            return (
                getMap().getBoard()[x][y]!=='miss' &&
                getMap().getBoard()[x][y]!=='hit'
            );
        }

        function isLoser(){
            return getMap()
            .getFleet()
            .every((battleship)=>battleship.getSunk()===true)
        }

        //CPU methods
        
        function autoPlace() {
            const fleet = [
                'carrier',
                'battleship',
                'cruiser',
                'submarine',
                'destroyer'
                
            ]

            const length=[5, 4, 3, 3, 2];

            while(fleet.length){
                const axis = randomAxis();
                const row = randomCoordinate();
                const col = randomCoordinate();
                let placed = false;
            

            if(axis === 'x') {
                placed = getMap().placeX().createShip((fleet[0],length[0]),[
                    row,
                    col,
                ])
            } else {
                placed = getMap().placeY(ship.createShip(fleet[0],length[0]),[
                    row,
                    col,
                ])
            }
            if(placed){
                fleet.shift();
                length.shift();
            }
        }
    }

    function cpuPlay(){
        let invalidCoordinate =true;
        let x,y;
        while(invalidCoordinate){
            if(searchQueue.length > 1) [x,y] = getRandomAndRemove(searchQueue);
            else {
            x = randomCoordinate;
            y = randomCoordinate;
            }
            if(isEmptyField([x,y])){
                invalidCoordinated = false;
                getMap().receiveAttack([x.y]);
            }
        }
        fillQueue(x,y)
        console.log(searchQueue)
        return[x,y];
    }
})