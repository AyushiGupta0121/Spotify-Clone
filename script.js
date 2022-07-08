console.log("Welcome to Spotify");
//initialise the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterplay=document.getElementById("masterplay");
let myprogressbar=document.getElementById("myprogressbar");
let gif=document.getElementById("gif");
let songItem=Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById('masterSongName');


let songs=[
    {songName:"Ek pyaar ka nagma hai",filePath:"songs\1.mp3",coverPath:"bg.jpg"},
    {songName:"lag ja gale",filePath:"songs\2.mp3",coverPath:"bg.jpg"},
    {songName:"Tere bina zindagi se",filePath:"songs\3.mp3",coverPath:"bg.jpg"},
    {songName:"Tujhse naaraz nhi zindagi",filePath:"songs\4.mp3",coverPath:"bg.jpg"},
    {songName:"O mere dil ke chain",filePath:"songs\5.mp3",coverPath:"bg.jpg"},

]

songItem.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songname")[0].innerText = songs[i].songName; 

})
masterplay.addEventListener('click',()=>{
    if (audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-play-circle')
        masterplay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle')
        masterplay.classList.add('fa-play-circle');
        gif.style.opacity=0;

    }
})
audioElement.addEventListener('timeupdate',()=>{
    
    //update seek bar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    
    myprogressbar.value=progress;
})
myprogressbar.addEventListener('change',()=>{
    audioElement.currentTime=myprogressbar.value*audioElement.duration/100;
})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
    })
})
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
})