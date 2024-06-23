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

    function fillQueue(row,col){
        //if only origin of first hit left, empty the queue
        if(searchQueue.length === 1)
            searchQueue = [];
        //on attack miss
        if(getMap().getBoard()[row][col]==='miss') return ;

        //if hit , store location for future directions
        let origin = false;
        if(searchQueue.length === 0){
            searchQueue.push([row,col]);
            origin = true;
        }
        if (row > 0 && row <= 9) {
            searchQueue.push([row - 1, col]) // top
        }
        if (row >= 0 && row < 9) {
            searchQueue.push([row + 1, col]) // bottom
        }
        if (col > 0 && col <= 9) {
            searchQueue.push([row, col - 1]) // left
        }
        if (col >= 0 && col < 9) {
            searchQueue.push([row, col + 1]) // right
        }

        if(searchQueue.length > 1 && !origin){
            console.log(row,col)
            if(row === searchQueue[0][0]){
                console.log('c');
                searchQueue = [
                    ...searchQueue.slice(0,1),
                    ...searchQueue.slice(1).filter((subArr) => subArr[0] === row),
                ]
            }else if(col === searchQueue[0][1]){
                console.log('d');
                searchQueue=[
                    ...searchQueue.slice(0,1),
                    ...searchQueue.slice(1).filter((subArr) => subArr[1] === col),
                ]

            }
        }
    }
    return {
        getName,
        getIdentity,
        getMap,
        setName,
        fillQueue,
        cpuPlay,
        autoPlace,
        isEmptyField,
        isLoser
    }
    }

    function randomCoordinate() {
        return Math.floor(Math.random() * (9+1));
    }
    
    function randomAxis() {
        const axis = ['x', 'y'];
        return axis[Math.round(Math.random())];
    }

    function getRandomAndRemove(array) {
        const randomIndex = Math.floor(Math.random() * (array.length -1 )) +1;
        const randomElement = array[randomIndex];
        array.splice(randomIndex,1);
        return randomElement;
    }
    return {
        createPlayer
    }
})()

export default Player;