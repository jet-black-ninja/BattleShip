import pregame from './pregame';
import setup from './setup';
import helper from './helper';
import dragDrop from './dragDrop';
import sound from '../utils/sound';
import game from '../factories/game';

const view = (() => {
    function loadContent() {
        helper.deleteAppContent();
        pregame.loadContent();
        initPlayButton();
    }

    function initPlayButton(){
        const button = document.getElementById('play-now-button');
        button.addEventListener('click',loadSetup);
    }

    function loadSetup(){
        setPlayerName();
        helper.deleteAppContent();
        setup.loadSetupContent();
        dragDrop.initDraggableFields();
        sound.unMuteIOS();
    }

    function setPlayerName(){
        const name = document.getElementById('name-input').value.toString().trim();
        if(name) game.setState().getPlayer().setName(`Captain${name}`);
        console.log(name);
    }

    return {loadContent}
})()
export default view;
