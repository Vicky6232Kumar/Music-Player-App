console.log('Welcome to Spotify');
let songIndex = 0;
let masterplay = document.getElementById("masterplay");
let myProgressBar = document.getElementById("myProgressBar")
let masterSongname = document.getElementById("masterSongname")
let songItem = Array.from(document.getElementsByClassName("songItem"))
let playSongitem = Array.from(document.getElementsByClassName("playSongitem"))

let audioElement = new Audio('songs/song1.m4a');
let song = [
    {songName: "Bewafa", songPath: "songs/song1.m4a", songCover: "song_cover/song1_cover.jpg"},
    {songName: "First Kiss", songPath: "songs/song2.m4a", songCover: "song_cover/song2_cover.jpg"},
    {songName: "High Heels", songPath: "songs/song3.m4a", songCover: "song_cover/song3_cover.jpeg"},
    {songName: "Illegel Weapon", songPath: "songs/song4.m4a", songCover: "song_cover/song4_cover.jpeg"},
    {songName: "Let me down x Pata Chala", songPath: "songs/song5.m4a", songCover: "song_cover/song5_cover.jpg"},
    {songName: "Mann Mera", songPath: "songs/song6.m4a", songCover: "song_cover/song6_cover.jpg"},
    {songName: "Shanti", songPath: "songs/song7.m4a", songCover: "song_cover/song7_cover.jpeg"},
    {songName: "Shera ki Ladki", songPath: "songs/song8.m4a", songCover: "song_cover/song8_cover.jpg"},
    {songName: "Loca", songPath: "songs/song9.m4a", songCover: "song_cover/song9_cover.jpg"}
]

songItem.forEach((element,i) => {
    element.getElementsByClassName("songNames")[0].innerText = song[i].songName;
    element.getElementsByTagName("img")[0].src = song[i].songCover;
    
});
// audioElement.play();
masterplay.addEventListener('click', () =>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play()
        masterplay.classList.remove("fa-circle-play");
        masterplay.classList.add("fa-circle-pause")
        // console.log(audioElement.currentTime)
        playSongitem[songIndex].classList.remove("fa-circle-play")
        playSongitem[songIndex].classList.add("fa-circle-pause")
    }
    else{
        audioElement.pause()
        masterplay.classList.remove("fa-circle-pause")
        masterplay.classList.add("fa-circle-play");
        playSongitem[songIndex].classList.add("fa-circle-play")
        playSongitem[songIndex].classList.remove("fa-circle-pause")
    }
})

audioElement.addEventListener("timeupdate", () =>{
    myProgressBar.value = parseInt((audioElement.currentTime/audioElement.duration)*100)
})

myProgressBar.addEventListener('change', () =>{
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
})

let makeAllPlays = () =>{
    playSongitem.forEach((element) =>{
        element.classList.remove("fa-circle-pause")
        element.classList.add("fa-circle-play")
    })
}
playSongitem.forEach((element)=>{
    element.addEventListener('click', (e) =>{
        makeAllPlays();
        songIndex = parseInt(e.target.id)
        audioElement.src = `songs/song${songIndex+1}.m4a`
        if(audioElement.paused || audioElement.currentTime <= 0){
            e.target.classList.remove("fa-circle-play")
            e.target.classList.add("fa-circle-pause")
            masterplay.classList.remove("fa-circle-play");
            masterplay.classList.add("fa-circle-pause")
            masterSongname.innerText = song[songIndex].songName;
            audioElement.play()
        }
        else{
            audioElement.pause()
            e.target.classList.remove("fa-circle-pause")
            e.target.classList.add("fa-circle-add")
            masterplay.classList.remove("fa-circle-pause")
            masterplay.classList.add("fa-circle-play");
        }

    })
})

document.getElementById("next").addEventListener('click',() =>{
    if(songIndex >= song.length-1){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    
    audioElement.src = `songs/song${songIndex+1}.m4a`
    audioElement.play()
    masterSongname.innerText = song[songIndex].songName;
    makeAllPlays();
    playSongitem[songIndex].classList.remove("fa-circle-play")
    playSongitem[songIndex].classList.add("fa-circle-pause")


})

document.getElementById("previous").addEventListener('click',() =>{
    if(songIndex <= 0){
        songIndex = song.length-1;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/song${songIndex+1}.m4a`
    audioElement.play()
    masterSongname.innerText = song[songIndex].songName;
    makeAllPlays();
    playSongitem[songIndex].classList.add("fa-circle-pause")
    playSongitem[songIndex].classList.remove("fa-circle-play")

})
