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
                shipLength -= 1;
                if(shipLength == 0) break;
            }

        shipPlacement.forEach((coordinate) => {
            const[i,j] = coordinate;
            board[i][j] = `${battleship.getName()}X`;
        })
        addToFleet(battleship);
        return true;
    }
})