
let arrow1 = document.getElementsByClassName("arrow")[0];
let arrow2 =document.getElementsByClassName("arrow2")[0];
let arrow3 =document.getElementsByClassName("arrow3")[0];
let arrow4 =document.getElementsByClassName("arrow4")[0];
let arrow5 = document.getElementsByClassName("arrow5")[0];
let arrow6 =document.getElementsByClassName("arrow6")[0];
let arrow7 =document.getElementsByClassName("arrow7")[0];
let arrow8 =document.getElementsByClassName("arrow8")[0];



arrow1.onclick = function(){
    arrow1.parentNode.style.cssText="transform:translate(-110%,0px)"
    arrow1.parentNode.nextElementSibling.style.cssText="transform:translate(0%,0px)"
}

arrow2.onclick = function(){
    arrow2.parentNode.style.cssText="transform:translate(110%,0px)"
    arrow2.parentNode.previousElementSibling.style.cssText="transform:translate(0%,0px)"
}

arrow3.onclick = function(){
    arrow3.parentNode.style.cssText="transform:translate(-110%,0px)"
    arrow3.parentNode.nextElementSibling.style.cssText="transform:translate(0%,0px)"
}


arrow4.onclick = function(){
    arrow4.parentNode.style.cssText="transform:translate(110%,0px)"
    arrow4.parentNode.previousElementSibling.style.cssText="transform:translate(0%,0px)"
}





arrow5.onclick = function(){
    arrow5.parentNode.style.cssText="transform:translate(-110%,0px)"
    arrow5.parentNode.nextElementSibling.style.cssText="transform:translate(0%,0px)"
}

arrow6.onclick = function(){
    arrow6.parentNode.style.cssText="transform:translate(110%,0px)"
    arrow6.parentNode.previousElementSibling.style.cssText="transform:translate(0%,0px)"
}

arrow7.onclick = function(){
    arrow7.parentNode.style.cssText="transform:translate(-110%,0px)"
    arrow7.parentNode.nextElementSibling.style.cssText="transform:translate(0%,0px)"
}


arrow8.onclick = function(){
    arrow8.parentNode.style.cssText="transform:translate(110%,0px)"
    arrow8.parentNode.previousElementSibling.style.cssText="transform:translate(0%,0px)"
}
