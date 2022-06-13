console.log("Welcome to Spotify");

//Initialize the variables
let songIndex =0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let masterSongName = document.getElementById('masterSongName')
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
let songItemPause = Array.from(document.getElementsByClassName('songItemPause'));

let songs = [
    {songName : "Samjhawan",filepath:"songs/1.mp3",coverPath:"images/cover1.webp" },
    {songName : "Channa Mereya",filepath:"songs/2.mp3",coverPath:"images/cover2.webp" },
    {songName : "Mast Magan",filepath:"songs/3.mp3",coverPath:"images/cover3.webp" },
    {songName : "Bolna",filepath:"songs/4.mp3",coverPath:"images/cover4.webp" },
    {songName : "Bandeya",filepath:"songs/5.mp3",coverPath:"images/cover5.webp" },
    
]

songItems.forEach((element, i) => {
 
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText =songs[i].songName;
})

//audioElement.play();

//Handle play/pause click

masterPlay.addEventListener('click',() => {
if(audioElement.paused || audioElement.currentTime <= 0){
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
}
else{
    audioElement.pause();
   
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
    
}
})

//listen to Events
audioElement.addEventListener('timeupdate' , () => {
    console.log('timeupdate');

    //Update Seekbar
    progress =parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change' , ()=> {
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle')
        element.classList.add('fa-play-circle')
    })
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click',(e) => {
        if(audioElement.paused || audioElement.currentTime <= 0) {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src =`songs/${songIndex+1}.mp3`;
        masterSongName.innerText =songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
        }
        else {
            element.classList.remove('fa-play-circle')
            element.classList.add('fa-pause-circle')
            songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-pause-circle');
        e.target.classList.add('fa-play-circle');
        
        audioElement.pause();
        gif.style.opacity = 0;
        masterPlay.classList.remove('fa-pause-circle')
        masterPlay.classList.add('fa-play-circle')
        }

    })
})


document.getElementById('next').addEventListener('click', () => {
    if(songIndex >= 4) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    audioElement.src =`songs/${songIndex+1}.mp3`;
    masterSongName.innerText =songs[songIndex].songName;

    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
})

document.getElementById('previous').addEventListener('click', () => {
    if(songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1;
    }
    audioElement.src =`songs/${songIndex+1}.mp3`;
    masterSongName.innerText =songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
})

