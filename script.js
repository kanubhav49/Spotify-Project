//Initialize the variables
let songIndex = 0;
let audioElement = new Audio("1.mp3");
let image = document.querySelector('#image');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems=Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById('masterSongName');
let SongNam = document.getElementById("SongNam");


let songs = [
    {SongName: "Cheques Slowed",filePath:"1.mp3",coverPath:"1.png"},
    {SongName: "OG - Shubh",filePath:"2.mp3",coverPath:"2.png"},
    {SongName: "Ruthless - Shubh",filePath:"3.mp3",coverPath:"3.png"},
    {SongName: "Mi Amor",filePath:"4.mp3",coverPath:"4.png"},
    {SongName: "The Flow - Shubh",filePath:"5.mp3",coverPath:"5.png"}
]

songItems.forEach((Element,i)=>{
    Element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    Element.getElementsByClassName("SongName")[0].innerText = songs[i].SongName;
})

//Handle play/pause click
masterPlay.addEventListener("click",()=>
{
    if(audioElement.paused||audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        gif.style.opacity=1;

    }
    else{
        audioElement.pause();
        masterPlay.classList.add("fa-play");
        masterPlay.classList.remove("fa-pause");
        gif.style.opacity=0;
    }
})




audioElement.addEventListener("timeupdate",()=>
{
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener("change",()=>
{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((Element)=>{
        Element.classList.remove("fa-pause-circle");
        Element.classList.add("fa-play-circle");
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((Element)=>{
    Element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        audioElement.src = `${songIndex+1}.mp3`;
        image.src = `${songIndex+1}.png`;
        SongNam.innerText = songs[songIndex].SongName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add("fa-pause");
    })
})

document.getElementById("previous").addEventListener("click",()=>
{
    if(songIndex<=0)
    {
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = `${songIndex+1}.mp3`;
    image.src = `${songIndex+1}.png`;
    SongNam.innerText = songs[songIndex].SongName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=4){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `${songIndex+1}.mp3`;
    image.src = `${songIndex+1}.png`;
    SongNam.innerText = songs[songIndex].SongName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})


