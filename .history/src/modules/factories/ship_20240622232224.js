const Ship=( () =>{
const createShip = (shipName, shipLength) =>{
    //ship factory
    const name = shipName;
    const length = shipLength; 
    let timesHit = 0;
    let isSunk = false;
    let isFound = false;

    //Getters

    function getName() {
        return name;
    }

    function getLength() {
        return length;
    }

    function getSunk() {
        return isSunk;
    }

    function getFound() {
        return isFound;
    }

    //state modifiers

    function found() {
        isFound = true;
    }

    function hit() {
        timesHit++;
        if(timesHit >= shipLength) sunk();
    }

    function sunk() {
        isSunk = true;
    }

    function resetFound() {
        isFound = false;
    }

    return {
        getName,
        getLength,
        getSunk,
        getFound,
        found,
        hit,
        sunk,
        resetFound        
    }
}

return {
    createShip
}
})()
export default Ship;