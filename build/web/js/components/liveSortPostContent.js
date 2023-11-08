function liveSortPostContent() {

    var myDiv = document.createElement("div");
    messageDOM = document.createElement("div");
    myDiv.appendChild(messageDOM);
    var flexBox = document.createElement("div");
    flexBox.classList.add('flexContainer'); // see styling in this file, above...
    myDiv.appendChild(flexBox);
    
    function deletePost (postId, td) {
        console.log("to delete post "+ postId);
        //var messageDOM = document.getElementById("message");
        if (confirm("Do you really want to delete post " + postId + "? ")) {
        // parameter properties needed for ajax call: url, successFn, and errorId
            ajax("webAPIs/deletePostAPI.jsp?deleteId=" + postId, APISuccess, messageDOM);
            function APISuccess(obj) { // function is local to callDeleteAPI
                console.log("successful ajax call");

                // var obj = JSON.parse(httpReq.responseText);  // already done by ajax2...

                // Empty string means sucessful delete. The HTML coder gets to decide how to 
                // deliver the good news.
                if (obj.errorMsg.length === 0) {
                    var msg = "Record " + postId + " successfully deleted. ";
                    console.log(msg);
                    messageDOM.innerHTML = msg;
                } else {
                    console.log("Delete Web API got this error: "+ obj.errorMsg);
                    messageDOM.innerHTML = "Web API successfully called, but " +
                            "got this error from the Web API: <br/><br/>" + obj.errorMsg;
                }
            }
            // HERE YOU HAVE TO CALL THE DELETE API and the success function should run the 
            // following (delete the row that was clicked from the User Interface).

            // get the row of the cell that was clicked 
            var dataRow = td.parentNode;
            var rowIndex = dataRow.rowIndex - 1; // adjust for oolumn header row?
            var dataTable = dataRow.parentNode;
            dataTable.deleteRow(rowIndex);
            
        }
    }
    
    ajax("webAPIs/listOtherAPI.jsp", processPostData, flexBox);
    function processPostData (postList) { 

        // now shroomList has been populated with data from the AJAX call to file users.json
        console.log("user list (in processPostData) on next line - open triangle to see data");
        console.log(postList);

        // Create new object list where all properties are <td> myDivments
        var newPostList = [];
        var postList = postList.postList;
        for (var i = 0; i < postList.length; i++) {
            newPostList[i] = {};
            newPostList[i].PostId = TableUtils.makeNumber(postList[i].postId);
            //newPostList[i].userRoleId = TableUtils.makeNumber(postList[i].userRoleId);
           // newPostList[i]._ProfileImage = TableUtils.makeImage(postList[i].image, "8rem");
            newPostList[i]._Image = TableUtils.makeImage(postList[i].imageFile, "8rem");
            newPostList[i].PhotoDate = TableUtils.makeDate(postList[i].photoDate);
            newPostList[i].Description = TableUtils.makeText(postList[i].description);
            newPostList[i].VehicleName = TableUtils.makeText(postList[i].vehicleName);
            newPostList[i].PostRating = TableUtils.makeNumber(postList[i].postRating);
            newPostList[i].WebUserId = TableUtils.makeNumber(postList[i].webUserId);
            newPostList[i]._Update = TableUtils.makeLink(
                    "<img src='" + CRUD_icons.update + "'  style='width:1rem' />", // innerHTML of link
                    '#/postUpdate/' + postList[i].postId             // href of link
            );
            newPostList[i]._Delete = TableUtils.makeImage(CRUD_icons.delete, '1rem');
            
            
            // freeze the webUserId
            const postId=postList[i].postId;
            newPostList[i]._Delete.onclick = function () {
                deletePost(postId,this);
            };            
            
            // Remove this once you are done debugging...
            //newUserList[i].Error_Msg = TableUtils.makeText(userList[i].errorMsg);
        }

        // MakeTableBetter expects all properties to be <td> myDivments.
        var postReport = MakeClickSort({
                theTitle: "Posts", 
                theObjList: newPostList, 
                theSortOrderPropName: "PostId", 
                theSortIcon:"icons/sortUpDown16.png",
                theUrl: "#/postInsert"
        });
        postReport.classList.add("clickSort");
        flexBox.appendChild(postReport);

    }
            
    return myDiv;
}