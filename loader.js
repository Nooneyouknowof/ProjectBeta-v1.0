var progress = 0;
var iload = 0;
var bar = document.getElementById("bar").style;
var load = ["Loading.","Loading..","Loading..."]
var loadtext = document.getElementById("text").style;
var finish = false

setInterval(function(){
    if (progress <= 999) {
        progress++;
        bar.width = (progress/10)+"%";
    } else {
        finish = true;
        return
    }
},1);

setInterval(function(){
    if (finish == true) {
        document.querySelector("#text").innerHTML = "Done";
        setTimeout(function(){
            setTimeout(function(){document.querySelector("#divcurtain").remove()},1000)
            document.querySelector("#text").style.animation = "rotLoadOut 1.5s 1.5"
            document.querySelector("#divcurtain > div > div").style.animation = "rotBarOut 1.5s 1.5"
            document.querySelector("#divcurtain").style.animation = "FadeOut 1.5s 1"
            return
        },100)
        return
    }
    iload++;
    if (iload >= 3) {
        iload = 0;
    }
    document.querySelector("#text").innerHTML = load[iload];
},750);