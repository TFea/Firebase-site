const slideshowSlide = document.querySelector('.slideshow-slide'); //
const slideshowImages = document.querySelectorAll('.slideshow-slide img'); //Do this to select all the images 



//Butons 
const prevBtn = document.querySelector('#prevBtn'); 
const nextBtn = document.querySelector('#nextBtn');  
const favBtn = document.querySelector ('#favBtn'); 




delBtn.addEventListener('click', () => { 
    db.collection(".messages").doc(".messages").delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });    
})






//Using Promises   
/*
firebase.firestore().enablePersistence() 
.then(function() { 
    return that.updateUserInfo();
}).catch(function(err) { 
    console.log(err); 
    });
*/




//Favourite Button Listener  
/* 
favBtn.addEventListener('click', () => {

})
*/


//counter to let us know where we are 
let counter = 1; 
const size = slideshowImages[0].clientWidth;   //use this so we know how much to slide, returns original width  

slideshowSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';   //moves one picture forward (starts on first image not dupe)   

//Button Listeners 
nextBtn.addEventListener('click', () => { 
    if(counter >= slideshowImages.length -1) return; //makes sure next image isn't just white space 
    slideshowSlide.style.transition = "transform 0.8s ease-in-out"; //You can also add a class here
    counter++; 
    slideshowSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';  
})

prevBtn.addEventListener('click', () => { 
    if (counter <= 0) return; 
    slideshowSlide.style.transition = "transform 0.8s ease-in-out"; 
    counter--; 
    slideshowSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';  
}) 

slideshowSlide.addEventListener('transitionend', () => {
    if(slideshowImages[counter].id==='lastClone') { 
        slideshowSlide.style.transition = "none" //removes transitions (demo by removing), so we can then instead of going forward to white space, tranisiton to next picture 
        counter = slideshowImages.length - 2;
        slideshowSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';  
     } 
     if(slideshowImages[counter].id==='firstClone') { 
        slideshowSlide.style.transition = "none" 
        counter = slideshowImages.length - counter;
        slideshowSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';   
     }
    })