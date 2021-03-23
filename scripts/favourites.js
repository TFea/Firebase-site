

function loadfav() { 
    console.log (' fav has been loaded ')

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
        <div class="card">
          <div class="card-content"  >
            <span class="card-title activator grey-text text-darken-4"> ${guide.title}<i class="material-icons right">more_vert</i></span>
            <p><a href="${guide.link}">This is a link</a></p>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4"> ${guide.title}<i class="material-icons right">close</i></span>
            <p>${guide.content}</p>
          </div> 
          <a class="btn-floating btn-medium waves-effect waves-light red" onclick="addToFavourites('${doc.id}', '${guide.title}', '${guide.link}', '${guide.content}')"  style="position:relative; right:-250px; top:125px;"><i class="material-icons">add</i></a>
        </div>    
        <div class="del-Btn">  
          <button type="button" style="position:relative; top:250px; left:-350px" id="delBtn">Delete</button>
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