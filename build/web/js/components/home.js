function home () {

// ` this is a "back tick". You can use it to define multi-line strings in JavaScript.
// 
// NetBeans menu option "Source - Format" will not work with the text inside of a 
// String, so you have to do this indentation manually with the editor. 

var content = `

        <h2>Coming Soon </h2>
    
            <p>
                DRIVEREP&trade; is a site for driving enthusiasts to store, share and rate their favorite public roads and trails for driving and adventure.
                Additionally photo locations that make great backdrops will also have an option to be posted.
                Each road and photo location will be judged by other enthusiasts. Users will get a profile that stores their vehicle information and prior posts.
                DRIVEREP&trade; release locations provided by <a href="https://www.instagram.com/kntmedia" target="_blank">KNTMEDIA</a>!
                
            </p>
            
            
            
            <p style="text-align:center;">
                <img src="pics/pic2_1.jpg" style="width:50%; border-radius:10px;">
            </p>
    
    
    `;
    
var ele = document.createElement("div");
ele.innerHTML = content;
return ele;
}
