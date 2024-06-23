import ship from './ship'

const Gameboard =(() => {
    
    // Map Factory
    const createMap = () => {
        const board = new Array(10).fill('x').map(() => new Array(10).fill('x')) ;
        const shipOnDrag = { name:'' , length: 0};
        let fleet = [];
        let axis = 'X';

        // Getters
        function getBoard(){
            return board;
        }
        function getFleet(){
            return fleet;
        }
        function getAxis(){
            return axis;
        }
        function getShipOnDrag(){
            return shipOnDrag;
        }
        function getShip(shipName){
            return fleet.filter((battleship)=> battleship.getName() === shipName)[0];
        }

        // Setters
        function setAxisX(){
            axis='X';
        }
        function setAxisY(){
            axis='Y';
        }
        function setShipOnDrag(shipInfoObj){
            shipOnDrag.name=shipInfoObj.name;
            shipOnDrag.length=shipInfoObj.length;
        }
        function setAllShipsNotFound(){
            fleet.forEach((ship)=> ship.resetFound());
        }
        // Fleet

        function addToFleet(battleship){
            switch(battleship.getName()){
                case 'carrier' :
                    fleet.push(ship.createShip('carrier',5));
                    break;
                case 'battleship' :
                    fleet.push(ship.createShip('battleship',4));
                    break;
                case 'cruiser' :
                    fleet.push(ship.createShip('cruiser',3));
                    break;
                case 'submarine' :
                    fleet.push(ship.createShip('submarine',3));
                    break;
                default :
                    fleet.push(ship.createShip('destroyer',2));
            }
        }

        function setFleetEmpty(){
            fleet = [];
        }

        function placeX(battleship,start){
            let shipLength = battleship.getLength();
            const [x,y]=start;
            const shipPlacement=[];
            if(isOutOfBounds(shipLength,board.length,y)) return false;

            for(let j=y; j<board.length; j++) {
                if(board[x][y] !== 'x') return false;
                shipPlacement.push([x,j])
                shipLength--;
                if(shipLength == 0) break;
            }

            shipPlacement.forEach((coordinate) => {
            const[i,j] = coordinate;
            board[i][j] = `${battleship.getName()}X`;
            })
        addToFleet(battleship);
        return true;

        }   

        function placeY(battleship,start){
            let shipLength = battleship.getLength();
            const [x,y] = start;
            const shipPlacement = [];
            for(let i = x; i < board.length ; i++){
                if(board[x][y] !== 'x') return false;
                shipPlacement.push([i][y]);
                shipLength--;
                if(shipLength === 0) break;
            }
            shipPlacement.forEach((coordinate) =>{
                const [i,j]=coordinate;
                board[i][j] = `${battleship.getName()}Y`
            })
            addToFleet(battleShip);

            return true;
        }

        function isOutOfBounds(shipLength, boardLength, filed){
            return shipLength > boardLength - filed;
        }

        // Record Attack
        function receiveAttack(coords){
            const[x,y]=coords;
            recordHit(x,y)
        }

        function recordHit(x,y){
            switch(board[x][y]){
                case 'carrierX':
                case 'carrierY':
                    getShip('carrier').hit();
                    break;
                case 'battleshipX':
                case 'battleshipY':
                    getShip('battleship').hit();
                    break;
                case 'cruiserX':
                case 'cruiserY':
                    getShip('cruiser').hit();
                    break;
                case 'submarineX':
                case 'submarineY':
                    getShip('submarine').hit();
                    break;
                case 'destroyerX':
                case 'destroyerY':
                    getShip('destroyer').hit();
                    break;
                default:
                    board[x][y]='miss';
            }       
        }
        // Checkers
        function areAllShipsFound(){
            return fleet.length===5;
        }

        function isEveryShipSunk(){
            const sunk = fleet.filter((battleship) => battleship.getSunk() === true )
            return sunk.length === 5;
        }
        return {
            getBoard,
            getFleet,
            getShip,
            getAxis,
            getShipOnDrag,
            setAxisX,
            setAxisY,
            setFleetEmpty,
            setAllShipsNotFound,
            setShipOnDrag,
            addToFleet,
            placeX,
            placeY,
            receiveAttack,
            recordHit,
            areAllShipsFound,
            isEveryShipSunk,    
        }
    }
})
