import player from "../../factories/player"
let combatant 
let cpu 
describe('player', () => {
    beforeEach(() => {
        combatant = player('combatant');
        cpu = player('cpu');
    });

    test('player turn ' , () => {
        combatant.playTurn([0,0])
        expect(combatant.turn).toBe(1);
    });

    test('clicking coordinate again', () => {
        combatant.playTurn([0,0]);
        combatant.playTurn([0,0]);
        expect(combatant.turn).toBe(1);
    });

    test('cpu random turn' , () => {
        cpu.playTurn();
        cpu.playTurn();
        cpu.playTurn();
        expect(cpu.turn).toBe(3);
    });
});