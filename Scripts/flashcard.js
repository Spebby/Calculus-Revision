flipped = false;
function flipCard() {
    if (flipped) {
        document.getElementById("front").style.display = "block";
        document.getElementById("back").style.display = "none";
        flipped = false;
    } else {
        document.getElementById("front").style.display = "none";
        document.getElementById("back").style.display = "block";
        flipped = true;
    }
}

function toggleSettings() {
    var settings = document.getElementById("settings");
    var mainPage = document.getElementById("mainPage");
    if (settings.style.display === "none") {
        settings.style.display = "block";
        mainPage.style.display = "none";
    } else {
        settings.style.display = "none";
        mainPage.style.display = "block";
    }
}