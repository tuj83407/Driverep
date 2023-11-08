function postContent() {
var content = `
        
        <h3>HW03</h3>
        <p>
            You can edit the vehicle name with the interface,
    additionally you can add a rating or comment with the input below. (self explanatory)
        </p>
    `;
    
        var postObj = document.createElement("div");
        postObj.classList.add('postContent');
        
        postObj.innerHTML = content; // the HTML code specified just above...
        var twoObjects = document.createElement("div");
        twoObjects.classList.add('flexContainer'); // see styling in this file, above...
        postObj.appendChild(twoObjects);
        
        var post1 = MakePost({//userName, imageFileName, vehicle, rating, comments
            userName: "username1",
            imageFileName: "pics/picvette.jpg",
            vehicle: "1998 Chevrolet Corvette",
            rating: 5,
            comments: "",
            style:"obj"
        });
        twoObjects.appendChild(post1);
        
        var post2 = MakePost({//userName, imageFileName, vehicle, rating, comments
            userName: "username2",
            imageFileName: "pics/piccrown.jpg",
            vehicle: "1996 Nissan Crown Royal Extra",
            rating: 5,
            comments: "",
            style:"obj"
        });
        twoObjects.appendChild(post2);
        
        var trailer = document.createElement("p");
        /* trailer.innerHTML = "Hope you liked my objects !"; */
        postObj.appendChild(trailer);
        return postObj;
}