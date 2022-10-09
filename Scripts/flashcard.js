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