import shotSound from '../../assets/sounds/shot.mp3'
import hitSound from '../../assets/sounds/hit.mp3'
import missSound from '../../assets/sounds/miss.mp3'

const Sound  = (() =>{
    // Play Audion with Web Audio Api to avoid Delay
    function playSound(soundUrl){
        const audioCtx = new(window.AudioContext || window.webkitAudioContext)()

        const request = new XMLHttpRequest();
        request.open('GET',soundUrl,true);
        request.responseType = 'arraybuffer';
        request.onload = () => {
            audioCtx.decodeAudioData(request.response, (buffer)=>{
                const source = audioCtx.createBufferSource();
                source.buffer = buffer;
                source.connect(audioCtx.destination)
                source.start(0);
            })
            audioCtx.resume();
        }
        request.send()
    }

    function shot(){
        playSound(shotSound);
    }
    function hit(){
        playSound(hitSound);
    }
    function miss(){
        playSound(missSound);
    }


    // Load background sound Asynchronously

    async function background(){
        const audioModule = await import('../../assets/sounds/backgroundOcean.mp3');
        const audio = new Audio(audioModule.default);
        audio.loop = true;
        audio.play();
    }

    // Play background Audion On First Click 
    function backgroundOnFirstTouch(){
        if(/Android | iPhone /i.test(navigator.useAgent)){
            document.addEventListener('touchstart',background,{once: true})
        }else{
            document.addEventListener('click',background,{once: true})
        }
    }

    return {shot, hit , miss, backgroundOnFirstTouch}
})()

export default Sound;