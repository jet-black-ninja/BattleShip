import{ship} from "../../factories/ship"

describe("ship damage", () => {
    test("times hit:1", () => {
    const submarine = ship('submarine',3);
    submarine.hit();
    expect(submarine.timesHit).toBe(1);
    });
    test("times hit:3", () => {
        const battleship = ship('battleship',3);
        battleship.hit();
        battleship.hit();
        battleship.hit();
        expect(battleship.timesHit).toBe(3);
    });
});

describe("ship sunk", () =>{
    test("is sunk- sunk", () => {
        const submarine = ship('submarine',3);
        submarine.hit();
        submarine.hit();
        submarine.hit();
        expect(submarine.isSunk).toBeTruthy();
    });
    test("is sunk-not sunk", () => {
        const battleship = ship('battleship',4);
        battleship.hit();
        battleship.hit();
        battleship.hit();
        expect(battleship.isSunk).not.toBeTruthy();
    });
});

