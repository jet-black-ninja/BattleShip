import ship from '../factories/ship';
import fleet from './fleet';
import Game from '../factories/game';
import helper from './helper';
import Component from './reusableComponents';

const DragDrop = (() => {
    function initDraggableFields() {
        dragStart();
        dragEnter();
        dragOver();
        dragLeave();
        DragDrop();
        mobileDrag();
        mobileDrop();
    }

    let fieldQueue = [];
    let touchMove = false;

    function emptyFiledQueue() {
        fieldQueue = [];
    }
    // Listeners 
    function dragStart() {
        const fleetContainer = document.getElementById('fleet-setup');
        
        fleetContainer.childNodes.forEach((node) => {
            node.addEventListener('dragStart', (event)=> {
                dragStartHandler(event, node);
            })
        })
    }

    function dragEnter(){
        const fieldContainer = document.getElementById('field-container-setup');
        fieldContainer.childNodes.forEach((node) => {
            node.addEventListener('dragenter', dragEnterHandler);
        })
    }

    function dragOver(){
        const fieldContainer = document.getElementById('field-container-setup');
        //prevent default to allow drop
        fieldContainer.childNodes.forEach((node, index) => {
            node.addEventListener('dragover', (event) => {
                dragOverHandler(event, fieldContainer, index);
            })
        })
    }

    function dragLeave(){
        const fieldContainer = document.getElementById('field-container-setup');
        //Remove dragover/hover class
        fieldContainer.childNodes.forEach((node) => {
            node.addEventListener('dragleave', dragLeaveHandler);
        })
    }

    function DragDrop(){
        const fieldContainer = document.getElementById('field-container-setup');
        fieldContainer.childNodes.forEach((node, index) => {
            node.addEventListener('drop', () => {
                dragDropHandler(fieldContainer, index);
            })
        })
    }
    
    function mobileDrag() {
        const fleetContainer = document.getElementById('fleet-setup');
        const fieldContainer = document.getElementById('field-container-setup');
        const app = document.getElementById('app');
        const hoverElement = [null];
        fleetContainer.childNodes.forEach((node) => {
            node.addEventListener('touchmove', (event) => {
                touchMoveHandler(
                    event,
                    node,
                    fieldContainer,
                    fleetContainer,
                    app, 
                    hoverElement
                )
                ,{passive:false}
            })
        })
    }

    function mobileDrop() {
        const fleetContainer = document.getElementById('fleet-setup');
        fleetContainer.childNodes.forEach((node) => {
            node.addEventListener('touchend', (event) => {
                touchEndHandler(event, node);
            })
        })
    }

    // Handlers
    function dragStartHandler(event, node) {
        addShipOnDragStart(node);
        event.stopPropagation();
    }
    function dragEnterHandler(event) {
        event.preventDefault();
    }

    function dragOverHandler(event ,fieldContainer, index) {
        event.preventDefault();
        styleFieldsForDrop(fieldContainer, index);
    }

    function dragLeaveHandler(){
        resetFieldStyling();
    }

    function dragDropHandler(fieldContainer, index) {
        const [x, y] = helper.getCoordinatesFromIndex(index);
        const [isPlaced, shipOndDrag] = dropIfValid(x,y);
        fleet.loadFleet(fieldContainer);
        hideIfPlaced(isPlaced, shipOndDrag);
        resetFieldStyling();
        removePlacedShipsTabIndex();
    }

    function removePlacedShipsTabIndex() {
        const shipCards = document.querySelectorAll('ship-card.hidden');
        shipCards.forEach((shipCard) => shipCard.setAttribute('tabindex', '-1'));
    }

    function dropIfValid(x, y) {
        const map = Game.getState().getPlayer().getMap();
        const shipOnDrag = Game.getState().getPlayer().getMap().getShipOnDrag();

        if(map.getAxis() === 'X') {
            return [
                map.placeX(ship(shipOnDrag.name , shipOnDrag.length ), [x,y]),
                shipOnDrag.name,
            ]
        }
        return [map.placeY(ship(shipOnDrag.name , shipOnDrag.length),[x,y]),
            shipOnDrag.name,
        
            ]
    }

    function touchMoveHandler( 
        event,
        node,
        fieldContainer,
        fleetContainer,
        app,
        hoveredElement
    ) {
        touchMove = true;
        event.stopPropagation();
        event.preventDefault();
        app.appendChild(node);
        addShipOnDragStart(node);

        const shipOnDrag = Game.getState().getPlayer().getMap().getShipOnDrag();
        const touchLocation = event.targetTouches[0];
        const touchX = event.touches[0].clientX;
        const touchY = event.touches[0].clientY;
        reInsertShipIfMissing(touchMove, fleetContainer, shipOnDrag);
        positionNodeOnScreen(node,touchLocation.clientX, touchLocation.clientY);

        const newHoveredElement = document.elementFromPoint(touchX, touchY);
        if(hoveredElement[0] !== newHoveredElement){
            resetFieldStyling();
        }
        hoveredElement[0] = newHoveredElement;
        if(hoveredElement[0].classList.contains('field')) {
            styleFieldsForDrop(fieldContainer, getNodeIndex(hoveredElement[0]));
        }
    }

    function touchEndHandler(event, node) {
        if(!touchMove) return ;
        const touchX = event.changedTouches[0].clientX;
        const touchY = event.changedTouches[0].clientY;
        const data = node.dataset.shipName
        const fieldContainer = document.getElementById('field-container-setup');
        const hoveredElement = document.elementFromPoint(touchX,touchY);
        const copy = document.querySelector(`[data-ship-name=${data}]`)
        if(hoveredElement.classList.contains('field')){
            const index = getNodeIndex(hoveredElement);
            const [x, y] = helper.getCoordinatesFromIndex(index);
            const [isPlaced, shipOnDrag] = dropIfValid(x, y);

            fleet.loadFleet(fieldContainer);
            resetFieldStyling();
            hideIfPlaced(isPlaced, shipOnDrag);
            if(!isPlaced) copy.classList.remove('hidden');
        }else {
            copy.classList.remove('hidden');
        }
        touchMove = false;
        node.remove();
        resetListenersForCopyNode(copy);
    }

    // Handler Helpers
    function resetListenerForCopyNode(node) {
        const fleetContainer = document.getElementById('fleet-setup');
        const fieldContainer = document.getElementById('field-container-setup');
        const app = document.getElementById('app');
        const hoveredElement = [null];

        node.addEventListener('dragstart', (event) => {
            dragStartHandler(event, node);
        })
        node.addEventListener('touchmove',(event) =>{ touchMoveHandler(
            event,
            node,
            fieldContainer,
            fleetContainer,
            app,
            hoveredElement,
        ),
        {passive: false}
    })
    node.addEventListener('touched',(event) => touchEndHandler(event,node));
    }

    function reInsertShipIfMissing(isTouchActive, fleetContainer, shipOndDrag) {
        if(isTouchActive && fleetContainer.childNodes.length<5) {
            const copy = Component.createShipCard(shipOndDrag.name);
            fleetContainer.appendChild(copy);
            copy.classList.add('hidden');
        }
    }

    function positionNodeOnScreen(node, x, y) {
        node.style.position = 'fixed',
        node.style.zIndex = '5';
        node.style.left = `${x}px`;
        node.style.top = `${y}px`;
    }
    
    function getNodeIndex(node) {
        return [...node.parentNode.children].indexOf(node);
    }

    function addShipOnDragStart(node) {
        Game.getState().getPlayer().getMap().setShipOnDrag({
            name:node.dataset.shipName,
            length:node.dataset.shipLength,
        })
    }

    function resetFieldStyling() {
        const fieldContainer = document.getElementById('field-container-setup');
        for(let i = 0 ; i < fieldQueue ; i++) {
            fieldContainer.children[fieldQueue[i]].className = 'field';
        }
        emptyFiledQueue();
    }

    function hideIfPlaced(isPlaced, shipOnDrag) { 
        if(!isPlaced) return ;
        const battleShip = document.querySelector(`[data-ship-name=${shipOnDrag}]`)
        battleShip.classList.add('hidden');
        enableContinueButtonIfAllPlaced();
    }

    function styleFieldsForDrop(parentNode, index) {
        const map = Game.getState().getPlayer().getMap();
        const board = map.getBoard();
        const axis = map.getAxis();

        const shipOnDrag = map.getShipOnDrag();
        let {length} = shipOnDrag;
        emptyFiledQueue();
        let isTaken = false;
        if(axis === 'X') {
            for(
                let i= index;
                i< helper.roundNearestTenExceptZero(index+1);
                i++
            ){
                const [x, y] = helper.getCoordinatesFromIndex(i);
                if(length === 0 ) break;
                parentNode.children[i].classList.add('hovering');
                fieldQueue.push(i);
                length -=1;
                if(board[x][y] !== 'x') {
                    isTaken = true ; 
                }
            }
        }
        if(axis === 'Y') {
            for (let i = 0 ; i< 100 ; i+=10) {
                const [x, y] = helper.getCoordinatesFromIndex(i);
                if(length === 0 ) break;
                parentNode.children[i].classList.add(['hovering']);
                fieldQueue.push(i);
                length -=1;
                if(board[x][y]!=='x') {
                    isTaken = true;
                }
            }
        }

        if(isTaken || length !== 0){
            fieldQueue.forEach((field) => {
                parentNode.children[field].classList.add('red')
            })
        }
    }

    function enableContinueButtonIfAllPlaced() {
        const ship = document.querySelectorAll('.ship-image-container');
        const button = document.getElementById('continue-button');
        if(ship.length !== 5) return ;
        button.classList.remove('disabled');
        button.removeEventListener('keydown',preventEnterDefault)
    }

    function preventEnterDefault(event) {
        if(event.key === 'Enter') event.preventDefault();
    }
    return {initDraggableFields , preventEnterDefault}
})()
export default DragDrop;