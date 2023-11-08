function blog() {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = ` 
      <h2>My Blog</h4>
    
            <h4>My Blog
                "Other" Database table entries:
            </h4>
    
            <ul>
                <li>Address to suggested location</li>
                <li>Location Community Rating</li>
                <li>Location Image URL</li>
                <li>Driver reputation</li>
                <li>Driver Location Contributions</li>
                <li>Driver Date joined</li>
                <li>Driver vehicle information</li>
            </ul>
            <h4>
                My Web Design experience: 
            </h4>
            <p>
               I have no previous experience web design or application programming.  
               However web application programming does look like an skill that I will enjoy learning.  
            </p>
            <p>    
            My development experience in general:
            </p>
                
            <ul>
                <li>Computer Programming in C</li>
                <li>Program Design & Abstraction</li>
                <li>Data Structures</li>
                <li>Comp Sys & Low-Level Program</li>
                <li>Wireless Networks and Security</li>
            </ul>   
            
            <h4>
                Homepage homework 
            </h4>
            <p>
               I found this homework to be easy for the most part, however figuring out on how to get the titlenav to be responsive was somewhat of a challenge. 
               Moreover learning about how it works was very hands on.
               This homework was valuable as it taught me the basics of the html and css layout.
            </p>
            
            <h4>
                JS UI homework 
            </h4>
            <p>
               Transferring the content over to the new layout was easy.
               I had some trouble applying a flex box for the titlenav in this version of the site, additionally I found myself mixing elements of the page. 
               This homework was valuable as it taught me the basics of the javascript and its incorporation in web pages, with html and css.
            </p>
             
            <h4>
                HW03 JS Objects homework 
            </h4>
            <p>
               This homework was more challenging as we had to come up with our own functions for mutating values displayed on the page.
               I had some trouble differentiating between private and public properties towards the begenning of the project but figured everything out towards the end, 
               I had to make sure the scopes were correct. This homework helped me get experience with reusable objects in javascript, an essential skill in web application programming.
               
            </p>
            <h4>
                HW04 JS Database homework 
            </h4>
            <p>
                This homework was fairly simple. I had some trouble with creating a foreign key because I accidentally created a table first but then I restarted and the foreign key worked.
                This homework was a valuable introduction MySQL workbench,
                a visual database design tool to integrate SQL developement, administration, 
                database design, creation and maintanence into a single environment
                Click <a target="_blank" href='kiran_database LA04.pdf'>here</a> to see my database document.
            </p>
            <h4>
                HW05 JS ClickSort homework 
            </h4>
            <p>
                This homework was also fairly simple.
                The examples greatly helped me understand the implementation of the components.
                However I did have some issues with the browser not clearing the saved data after updating the page and I had to manually clear all the browser data while adding in data in the table.
                This homework helps further strengthen our skills in javascript and the incorporation of json and js with it. Specifically we worked with AJAX and HTML tables, to create user interactive sortable tables, with sorting and filtering functions, functions similar to those that are generally used in many websites today.
    
            </p>
            <h4>
                HW06 Web API Homework 
            </h4>
            <p>
               This homework was complex, as it incorporated nearly every project we had previous done, 
                additionally we used several different applications to test and deploy the web application. I had small difficulties throughout the project, with the most annoying issue being repetitive names within the project, which occasionally confused me.
                This homework is an introduction to database implementation within web applications and using Java/JSP to write a Web API. 
            </p>
            <p>    
            Click <a target="_blank" href='HW06 list of errors.pdf'>here</a> to see my error document.
            </p>
            <p>
                Click <a target="_blank" href="webAPIs/listUsersAPI.jsp">here</a> for my List Users Web API 
            </p>
            <p>    
                Click <a target="_blank" href="webAPIs/listOtherAPI.jsp">here</a> for my List Car API
            </p>
    
            <h4>
                HW07 Logon Homework
            </h4>
            <p>
                This homework was average in difficulty as we had part of it done with the corresponding lab, in which we prepared APIs for the website.
                The difficulty in this was joining the api with pages on the site. This lab taught us how to take in user input and extract data from a database into the webpage. Also we learned about server side objects.
            </p>
            <p>
                Click <a target="_blank" href="webAPIs/logonAPI.jsp?userEmail=abc@gmail.com&userPass=ytrewq">here</a> for my Logon API 
            </p>
            <p>
                Click <a target="_blank" href="webAPIs/logoffAPI.jsp">here</a> for my Logoff API 
            </p>
            <p>
                Click <a target="_blank" href="webAPIs/getProfile.jsp">here</a> for my get Profile API 
            </p>
            <p>
                Click <a target="_blank" href="webAPIs/listUsersAPI.jsp">here</a> for my List Users Web API 
            </p>
            <h4>
                HW08 Insert Homework
            </h4>
            <p>
                This homework was average in difficulty as we had part of it done with the corresponding lab, in which we prepared APIs for the insrt function.
                I had some difficulty with the handful of files that are intertwined with eachother, the APIs, js files and source packages. This lab taught us how to take in user input and insert them into the database. We also had additional practice with server side objects.
                Click <a target="_blank" href='kiran_database LA04.pdf'>here</a> to see my database document.
            </p>
            <h4>
                HW09 Update Homework
            </h4>
            <p>
                This homework was similar to the previous homework 8 in terms of difficulty and implementation. Similar to homework 8 we had most of the functionality developed in our lab assignment. We then integrated it into the site. 
                I had slightly less difficulty than previously with the handful of files that are intertwined with eachother, the APIs, js files and source packages.
            </p>
            <h4>
                HW10 Delete Homework
            </h4>
            <p>
               This homework was fairly simple as there was not much javascript to be written, generally we just had to invoke api to remove the row from the table and send the user a confirmation. Nothing in this lab was particularly diffucult. This was a great homework to see the basic implementation of removing data from a table in a web application.
            </p>
    
    `;
    
    var ele = document.createElement("div");
    ele.innerHTML = content;
    return ele;    
}