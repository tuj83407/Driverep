function MakePost (params) {
    //params: userName, imageFileName, vehicle, rating, comments
    //private: image, vehicle
    //public username, rating, comments
    var postObj = document.createElement("div");
    postObj.classList.add("post"); // adds styling to ele - see post.css rules for ".post"
    postObj.classList.add(params.style);
    
    var hdrImage = document.createElement("div");
    hdrImage.classList.add("imageContainer"); // see post.css rules for ".post .imageContainer"
    postObj.appendChild(hdrImage);

    postObj.name = params.userName||"username";//public
    var header = document.createElement("h3");
    header.innerHTML =  postObj.name;
    hdrImage.appendChild(header);

    var myImage = document.createElement("img");
    myImage.src = params.imageFileName ||"https://images.ebizautos.media/foundation/controls/vehicle-icons/default-sedan.jpg";
    hdrImage.appendChild(myImage);

    postObj.theRating = params.rating || 5;
    postObj.ratingNum = Number(params.rating || 5);
    postObj.rateTotal = postObj.ratingNum;
    postObj.rateCount = Number(1);
    
    postObj.allComments = params.comments || "";
    
    var desc = document.createElement("h5");
    var vehiclepriv = params.vehicle; //private vehicle name
    var display = function ( ) {             // create custom method “display”

        // make the current properties visible on the page - including the image
       
        desc.innerHTML = "<br/>Vehicle : " + (vehiclepriv || "year make model") +
                "<br/> rating out of 10: " + postObj.ratingNum.toFixed(1).toString() +
                "<br/> total ratings: " + postObj.rateCount.toString() +
                "<br/> Comments: " + params.comments;
    };
    display();
   
    postObj.appendChild(desc);
    
    
   
    // rating modifier method
    postObj.ratingEdit = function (addRate) {
        var n = Number(addRate);
        if(n > 10){
            alert("rating must be less than 10");
        }
        else if(n < 0){
            alert("rating must be at least 0");
        }
        else{
        postObj.rateCount++;
        postObj.rateTotal = postObj.rateTotal + n;
        console.log("Adding rating: " + n + " to total");
        postObj.ratingNum = postObj.rateTotal/postObj.rateCount;
        display(); // show updated salary on the page
        }
    };
    
    // create User interface for adding a rating
    var ratingButton = document.createElement("button");
    ratingButton.innerHTML = "Rate out of 10: ";
    postObj.appendChild(ratingButton);

    var rateFactor = document.createElement("input");
    postObj.appendChild(rateFactor);

    ratingButton.onclick = function () {
        postObj.ratingEdit(rateFactor.value);
    };
    
    // comment adding method
    postObj.addComment = function (comment) {
        params.comments = params.comments + "<br/>" + comment; 
        console.log("Adding comment: " + comment  + " to comments");
        display(); // show additional comment on the page
    };
    
    postObj.appendChild(document.createElement("br"));  // new line 
    // create User interface for adding comments
    var commentButton = document.createElement("button");
    commentButton.innerHTML = "Comment: ";
    postObj.appendChild(commentButton);

    var comment = document.createElement("input");
    postObj.appendChild(comment);

    commentButton.onclick = function () {
        postObj.addComment(comment.value);
    };
    
/*    myImage.onmouseenter = function () {
        console.log("you entered the image " + desc);
        priceHeading.style.visibility = "visible";
    };
    myImage.onmouseout = function () {
        console.log("you left the image " + desc);
        priceHeading.style.visibility = "hidden";
    };
*/
    // Name setter method
    postObj.setName = function (newName) {
        vehiclepriv = newName;
        console.log("Setting name to : " + vehiclepriv);
        display(); // show updated property on the page
    };
    
    postObj.appendChild(document.createElement("br")); // new line

    
    // Create User Interface for setting vehicle name
    var nameButton = document.createElement("button");
    nameButton.innerHTML = "Change Vehicle Name to: ";
    postObj.appendChild(nameButton);

    var newNameInput = document.createElement("input");
    postObj.appendChild(newNameInput);

    nameButton.onclick = function () {
        postObj.setName(newNameInput.value);
    };

  return postObj;
}