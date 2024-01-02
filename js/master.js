//  check if there's local storage color option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null ){
    // console.log('local storage is not empty you can set it on root now');
    // console.log(localStorage.getItem("color_option"));
    document.documentElement.style.setProperty('--main--color',localStorage.getItem("color_option"));

        // reomve class active from all colors list item 
        document.querySelectorAll(".colors-list li").forEach(element =>{

            element.classList.remove("active");
        
        // add active class on element with data- color === local storage item
        if(element.dataset.color === mainColors){
            // add active class
            element.classList.add("active")
        }
    });
}

// random background option
let backgraondOption = false ;

// variabke to control the interval
let backgraondInterval;

// check if there's local storage rando, backgrournd item 
let backgroundLocalIem = localStorage.getItem("background_option");

// check if random background local storage is not empty
if (backgroundLocalIem !== null ){

    if ( backgroundLocalIem === 'true'){
    
        backgraondOption = true ;
    } else {
        backgraondOption = false;
    }
    // remove active class from all spans
    document.querySelectorAll(".random-backgrounds span").forEach (element =>{ 

        element.classList.remove("active");

    });
    if (backgroundLocalIem === 'true'){

        document.querySelector(".random-backgrounds .yes").classList.add("active");
    } else {
        
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }
}

// toggle spin class on icon 
document.querySelector(".toggle-settings .fa-gear").onclick = function(){
    // toggle class fa-span for rotation on self 
    this.classList.toggle("fa-spin")
    // toggle class open on main settings box 
    document.querySelector(".settings-box").classList.toggle("open")
};


// switch colors
const colorsLi = document.querySelectorAll(".colors-list li")
//  loop on all list itens
colorsLi.forEach(li => {
    // clic on every lisst items
    li.addEventListener("click", (e) => {
        // console.log(e.target.dataset.color)
        // set color on root
        document.documentElement.style.setProperty('--main--color', e.target.dataset.color);

        // set color on local storage 
        localStorage.setItem("color_option", e.target.dataset.color);

        handleActive(e);
    });

});

// switch random background option
const randomBackEl = document.querySelectorAll(".random-backgrounds span")

//  loop on all list itens
randomBackEl.forEach(span => {
    // clic on every lisst items
    span.addEventListener("click", (e) => {

        handleActive(e);
        
        if (e.target.dataset.background === 'yes'){
    
            backgraondOption = true;

            randomizeImgs();

            localStorage.setItem("background_option", true);
        } else {

            backgraondOption= false ;

            clearInterval(backgraondInterval);

            localStorage.setItem("background_option", false);
        }
    });

});


// select landing page Element 
let landingPage = document.querySelector(".landing-page");
// get array of imgs 
let imgsArray = ["Untitled-1.png","Untitled-2.png","Untitled-3.png","Untitled-4.png","Untitled-5.png" ];
// // change backgraond image url  
// landingPage.style.backgroundImage = 'url("imgs/Untitled-4.png")'


// function to randomize imgs 
function randomizeImgs(){
    
    if (backgraondOption === true ){

        backgraondInterval = setInterval(() => {
            // get random Number 
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
        
            // change background Image Url 
            landingPage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] + '")';
        
        }, 1000 );
    }
}
randomizeImgs();


// select skills selector 
let ourSkills = document.querySelector(".skills")

window.onscroll = function () {

    // skills offset top
    let skillOffsetTop = ourSkills.offsetTop ;

    // skills quter height
    let skillsQuterHeight = ourSkills.offsetHeight;
    
    // window height
    let windowHeight = this.innerHeight;
    
    // window  ScrollTop
    let windowScrollTop = this.pageYOffset

    if (windowScrollTop > (skillOffsetTop + skillsQuterHeight - windowHeight)) {
        
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;
        });
    }
}

// create popup with the image 
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener('click' , (e) =>{

        // create overlay element
        let overlay = document.createElement("div");

        // add class to overlay
        overlay.className= 'popup-overlay';

        // append overlay to the body 
        document.body.appendChild(overlay);
  
        // create popup box
        let popupBox = document.createElement("div");

        // add class to overlay
        popupBox.className= 'popup-box';

        if (img.alt !== null) {
        
            // create heading 
            let imgHeading = document.createElement("h3");

            // create text for heading 
            let imgText = document.createTextNode(img.alt);

            // append the text to the heading
            imgHeading.appendChild(imgText);

            // append the heading to the popup box 
            popupBox.appendChild(imgHeading);
        }

        // create the image
        let popupImage = document.createElement("img");

        // set image source
        popupImage.src = img.src;

        // append overlay to the body 
        popupBox.appendChild(popupImage);

        // append the popup box to body 
        document.body.appendChild(popupBox);

        // create the close span 
        let closeButton = document.createElement("span");

        // create the close button text
        let closeButtonText = document.createTextNode("X");

        // append text to close button
        closeButton.appendChild(closeButtonText);

        // add class to close button
        closeButton.className= 'close-button';  

        // add close button to the popup box
        popupBox.appendChild(closeButton);
    });

});

// close poup 
document.addEventListener("click" , function(e) {
    if (e.target.className== 'close-button'){

        // remove the current popup
        e.target.parentNode.remove();
    
        // remove overlay
        document.querySelector(".popup-overlay").remove();
    }
});

// select all bullets 

const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// select all links 

const allLinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elements){

    elements.forEach(ele => {
    
        ele.addEventListener("click", (e) => {
    
            e.preventDefault();
    
            document.querySelector(e.target.dataset.section).scrollIntoView({
    
                behavior : 'smooth'
            });
    
        });
    
    });
}
scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);


// handle active state 
function handleActive(ev){

    // reomve class active from all children
    ev.target.parentElement.querySelectorAll(".active").forEach(element =>{

        element.classList.remove("active");

    });
    // add active class on self
    ev.target.classList.add("active");

}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null){

    bulletsSpan.forEach(span => {

        span.classList.remove("active");
    });

    if (bulletLocalItem === 'block'){

        bulletsContainer.style.display = 'block';
        
        document.querySelector(".bullets-option .yes").classList.add("active");
        
    } else {
        
        bulletsContainer.style.display = 'none';

        document.querySelector(".bullets-option .no").classList.add("active"); 
    }
}

bulletsSpan.forEach(span => {

    span.addEventListener("click", (e) => {

        if (span.dataset.display === 'show') {

            bulletsContainer.style.display = 'block';

            localStorage.setItem("bullets_option", 'block');
            
        }else {
            bulletsContainer.style.display = 'none';
            
            localStorage.setItem("bullets_option", 'none');
        }

        handleActive(e);
    });

});

// reset button 
document.querySelector(".reset-options").onclick = function() {

    localStorage.clear();
    // localStorage.removeItem("color_option");
    // localStorage.removeItem("background_option");
    // localStorage.removeItem("bullets_option");

    window.location.reload();
};

// toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let tlinks = document.querySelector(".links");

toggleBtn.onclick = function(e){

    // stop propagation
    e.stopPropagation();

    // toggle class "menu active"on button
    this.classList.toggle("menu-active");
    
    // toggle class "open" on links
    tlinks.classList.toggle("open");

};

// click anywhere outside menu and toggle button
document.addEventListener("click", (e) =>{

    if (e.target !== toggleBtn && e.target !== tlinks){

        if (tlinks.classList.contains("open")){

                // toggle class "menu active"on button
                toggleBtn.classList.toggle("menu-active");
                
                // toggle class "open" on links
                tlinks.classList.toggle("open");
        }
    }

});

// stop propagation on menu
tlinks.onclick = function(e){
    
    e.stopPropagation();
}