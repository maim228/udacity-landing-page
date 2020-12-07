/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * This project was completed within the required projects in the Udacity platform
 * Made with love by Mohammed Abdallah
 */

/**
 * Define Global Variables
 * 
*/
const fragment = document.createDocumentFragment();
const navMenu = document.querySelector('#navbar__list');
// to get all elements with class section
const sections = document.querySelectorAll('section');


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// function to create <a> element for every section with id and data-nav 
function createNav(id, name){
    const code = `<a class ="menu__link" data-id="${id}">${name}</a>`;
    return code;
};
//to calculate size of section without fractions
const place = function (section){
    return Math.floor(section.getBoundingClientRect().top);};


    
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav(){
    //for loop to create sections as number of sections in HTML file
    for (let i=0; i < sections.length; i++){
        const newMenuItem = document.createElement('li');
        const sectionId = sections[i].getAttribute('id');
        const sectionName = sections[i].getAttribute('data-nav');
        newMenuItem.innerHTML = createNav(sectionId, sectionName);
        //add sections to fragment document
        fragment.appendChild(newMenuItem);
    }
    //add fragment document to ul in HTML file
    const navBarList = document.getElementById('navbar__list')
    navBarList.appendChild(fragment);
};



// Add class 'active' to section when near top of viewport
const addActive = function(conditional, section){
    if(conditional){
        section.classList.add('your-active-class');
        //create beautiful box shadow and border around active section seborderto highlight section
        section.style.cssText = "box-shadow:20px 20px 50px 15px #0f3057;border:1px solid blue;border-radius:2px";
        //get active section id and -1 because childnodes is array start from 0
        const sectionId= section.id.slice(7,8) -1;
        //add background-color to active navigation 
        navMenu.childNodes[sectionId].style.cssText="background-color:#00BFFF;";
    };
};
const removeActive = function (section){
    section.classList.remove('your-active-class');
    //remove box shadow from inactive section 
    section.style.cssText = "box-shadow:none;border:none;border-radius:none";
    const sectionId= section.id.slice(7,8) -1;
    //remove background-color from inactive navigation 
        navMenu.childNodes[sectionId].style.cssText="background-color:#ffffff;";

};

const sectionActivation = function(){
    for(section of sections) {
        const elementPlace = place(section);

        inviewport = () => elementPlace < 250 && elementPlace >= -250;

        removeActive(section);
        addActive(inviewport(),section);
    };
};

// Scroll to anchor ID using scrollTO event
function scrollToElement(event){
    if(event.target.nodeName === 'A'){
        const sectionScroll = event.target.getAttribute('data-id');
        const section = document.getElementById(sectionScroll);
        section.scrollIntoView({behavior: "smooth"});
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/
navMenu.addEventListener('click', function(event){
    scrollToElement(event)
})

// Build menu 
buildNav();
// Scroll to section on link click

// Set sections as active
window.addEventListener('scroll' ,sectionActivation);


