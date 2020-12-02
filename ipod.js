// Create your global variables below:
var tracklist = ["Let It Happen", "Nangs", "The Moment", "Yes I'm Changing", "Eventually", "Gossip", "The Less I Know The Better", "Past Life", "Disciples", "'Cause I'm A Man"];
var volLevels = [];
var newSong = false;

function init() {
    for (i = 0; i < 6; i++) {
        volLevels[i] = document.getElementById("vl" + i.toString());
    }
    for (i = 0; i < 3; i++) {
        volLevels[i].style.backgroundColor = "#9f5cc4";
    }
    for (i = 3; i < 6; i++) {
        volLevels[i].style.backgroundColor = "white";
    }
};

function volUp() {
    for (i = 0; i < 6; i++) {
        if (volLevels[i].style.backgroundColor == "white") {
            volLevels[i].style.backgroundColor = "#9f5cc4";
            break;
        }
    }
}

function volDown() {
    for (i = 5; i >= 0; i--) {
        if (volLevels[i].style.backgroundColor != "white") {
            volLevels[i].style.backgroundColor = "white";
            break;
        }
    }
}

function switchPlay() {
    var togglePlay = document.getElementById("play-pause").innerHTML;
    if (togglePlay == "play_arrow") {
        document.getElementById("play-pause").innerHTML = "pause";
    } else {
        document.getElementById("play-pause").innerHTML = "play_arrow";
    }
}

function nextSong() {
    newSong = true;
    for (i = 0; i < tracklist.length; i++) {
        if (tracklist[i] == document.getElementById("player-song-name").innerHTML) {
            if (i == tracklist.length - 1) {
                document.getElementById("player-song-name").innerHTML = tracklist[0];
            } else {
                document.getElementById("player-song-name").innerHTML = tracklist[i + 1];
            }
            break;
        }
    }
}

function prevSong() {
    newSong = true;
    for (i = tracklist.length - 1; i >= 0; i--) {
        if (tracklist[i] == document.getElementById("player-song-name").innerHTML) {
            if (i == 0) {
                document.getElementById("player-song-name").innerHTML = tracklist[tracklist.length - 1];
            } else {
                document.getElementById("player-song-name").innerHTML = tracklist[i - 1];
            }
            break;
        }
    }
}

function timeFunc() {
    if (newSong == true) {
        newSong = false;
        document.getElementById("player-time").value = 0;
        document.getElementById("time-elapsed").innerHTML = secondsToMs(0);
    } else {
        var t;
        if (document.getElementById("play-pause").innerHTML == "pause") {
            t = parseInt(document.getElementById("player-time").value) + parseInt(1);
            if (t > 180) {
                t = 0;
                nextSong();
            }
        } else {
            t = parseInt(document.getElementById("player-time").value);
        }
        document.getElementById("player-time").value = t;
        document.getElementById("time-elapsed").innerHTML = secondsToMs(t);
    }
}

function secondsToMs(d) {
    d = Number(d);

    var min = Math.floor(d / 60);
    var sec = Math.floor(d % 60);

    return `0${min}`.slice(-1) + ":" + `00${sec}`.slice(-2);
}

init();
setInterval(timeFunc, 1000);