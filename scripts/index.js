//DOM elements  
const guideList =  document.querySelector('.guides'); 
const LoggedOutLinks = document.querySelectorAll('.logged-out')
const LoggedInLinks = document.querySelectorAll('.logged-in')  
const AdminGroup = new Set(["ZZcJFKJEA5d5zCx6h7JtSnOsFT42"])   
var Favorites; 
//const addToFavourites = document.querySelector('.message') 



const userData = {lastLoginTime: new Date()};

globaluser = {}

//setup the Navbar UI 
const setupUI = (user) =>   {  
  globaluser = user 
  fav2 = [] 
  Favorites = fav2
    if (user) { 
        // toggle UI elements 
        LoggedInLinks.forEach(item => item.style.display = 'block');      //A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the list.Performs the specified action for each node in an list.
        LoggedOutLinks.forEach(item => item.style.display = 'none'); 
       } 
    else {  
      LoggedInLinks.forEach(item => item.style.display = 'none');      
      LoggedOutLinks.forEach(item => item.style.display = 'block');
    } 
     if(AdminGroup.has(user.uid)) { 
      document.getElementById("IsAdmin").style.display = 'block';
      //document.getElementsByClassName("delBtn").style.display = 'block';
    } 
    else { 
      document.getElementById("IsAdmin").style.display = 'none'; 
      //document.getElementsByClassName("delBtn").style.display = 'none';
    }    

} 

const setupGuides = (data) => {
  if (data.length) { // making sure someone is logged in by chechiking if the array is empty or not  
    // using Firestore to retrive data on the Guidelist
    let html = '<div id="card-collection">';  
    //console.log (data); 
    data.forEach(doc => {
      const guide = doc.data(); 
      //console.log(doc.id);
      const li = 
    
      ` 
      <div class="card" style="position: relative;">
        <div class="card-content">
          <span class="card-title activator grey-text text-darken-4"> ${guide.title}<i class="material-icons right">more_vert</i></span>
          <p><a href="${guide.link}">This is a link</a></p>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4"> ${guide.title}<i class="material-icons right">close</i></span>
          <p>${guide.content}</p>
        </div> 
        <a class="btn-floating btn-medium waves-effect waves-light red" onclick="addToFavourites('${doc.id}', '${guide.title}', '${guide.link}', '${guide.content}')"  style="position:relative; right:-250px; top:125px;"><i class="material-icons">add</i></a>
        <div class="del">  
        <button type="button" onclick="deleteCard('${doc.id}')" style="position: absolute; bottom: 10px; left:5px" class="delBtn">Delete</button>
      </div> 
      </div>    


      `;

      html += li; 
    }); 
    
    html += '</div>' 
    guideList.innerHTML = html; 
  } else {
    guideList.innerHTML = '<h6 class="center-align"> Login or Register to Continue </h6>';
  }
}  

// Creates delete action which removes card from collection  

function deleteCard(Id) {  
  if (AdminGroup.has(globaluser.uid)) { 
  db.collection(".messages").doc(Id).delete().then(() => {
    console.log("Document successfully deleted!"); 
}).catch((error) => {
    console.error("Error removing document: ", error);
});
}  
}


function addToFavourites(Id, title, link, content) { 
Favorites.push(Id) 
console.log(Favorites)

  db.collection("users").doc(globaluser.uid).set({ 
    favourites: Favorites
  
},{ merge: true }) 
.then(() => {
    console.log("Document successfully written!");
})
.catch((error) => {
    console.error("Error writing document: ", error);
}); 

} 




// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);
}); 

