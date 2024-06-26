import Typed from 'typed.js';
// Assets 
import agent from '../../assets/images/agent.png';
import enemy from '../../assets/images/evilCaptain.png';
import helper from './helper';
import carrier from '../../assets/images/carrierX.svg';
import battleship from '../../assets/images/battleshipX.svg'
import cruiser from '../../assets/images/cruiserX.svg'
import submarine from '../../assets/images/submarineX.svg'
import destroyer from '../../assets/images/destroyerX.svg'
import { ids } from 'webpack';
import { create } from 'yallist';

const Component = (() => {
    const images = {agent , enemy};
    function createMessageSection(classNameArray){
        const section = helper.create('section', {className : 'message'});

        classNameArray.forEach((element) => section .classList.add(element));
        const character = classNameArray[1];
        
        const image = helper.create('img',{className:'message-image'});
        const imageName =  classNameArray[1] ==='agent' || classNameArray[1] ==='agent-win' 
        ?'agent'
        :'enemy';
        image.src=images[imageName];
        section.appendChild(image);
        section.appendChild(createMessage(character));
        return section;
    }

    function createMessage(character){
        const container = helper.create('div',{
            id:'message-container',
            className:'message-container',
    })

    const text = helper.create('div',{
        id:`message-${character}`,
        className:`message-${character}`,
    })
    container.appendChild(text);
    return container;
    }

    function addTypeWriteMessage(element,stringArray){
        const typed= new Typed(element,{
            strings: stringArray,
            typeSpeed:10,
        })

    }
    function createShipCard(shipName){
        const card = helper.create('div', {
            className: 'ship-card',
            draggable: 'true',
        })
        const content = helper.create('div',{className:'ship-content'});
        const image = helper.create('img',{className : 'ship-image'});
        const name = helper.create('p',{className:'ship-name'});

        switch(shipName ){
            case 'carrier':
                card.dataset.shipName ='carrier';
                card.dataset.shipLength= 5;
                img.src = carrier;
                name.textContent = 'Carrier(5f)';
                break;
            case 'battleship':;
                card.dataset.shipName = 'battleship';
                card.dataset.shipLength= 4;
                img.src = battleship;
                name.textContent = 'Battleship(4f)';
                break;
            case 'cruiser':
                card.dataset.shipName ='cruiser';
                card.dataset.shipLength= 3;
                img.src = cruiser;
                name.textContent = 'Cruiser(3f)';
                break;
            case 'submarine':
                card.dataset.shipName ='submarine';
                card.dataset.shipLength= 3;
                img.src = submarine;
                name.textContent = 'Submarine(3f)';
                break;
            case 'destroyer':
                card.dataset.shipName ='destroyer';
                card.dataset.shipLength= 2;
                img.src = destroyer;
                name.textContent = 'Destroyer(2f)';
                break;
            default:
        }

        helper.appendAll(content,[image,name]);
        card.appendAll(content);
        return card;
    }

    return {
        createMessageSection,
        addTypeWriteMessage,
        createShipCard,
    }
})()
export default Component;