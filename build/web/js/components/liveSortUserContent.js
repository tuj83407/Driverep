function liveSortUserContent() {
    var myDiv = document.createElement("div");
    messageDOM = document.createElement("div");
    myDiv.appendChild(messageDOM);
    var flexBox = document.createElement("div");
    flexBox.classList.add('clickSort'); // see styling in this file, above...
    myDiv.appendChild(flexBox);
    
    function deleteUser (userId, td) {
        console.log("to delete user "+ userId);
        //var messageDOM = document.getElementById("message");
        if (confirm("Do you really want to delete user " + userId + "? ")) {
        // parameter properties needed for ajax call: url, successFn, and errorId
            ajax("webAPIs/deleteUserAPI.jsp?deleteId=" + userId, APISuccess, messageDOM);
            function APISuccess(obj) { // function is local to callDeleteAPI
                console.log("successful ajax call");

                // var obj = JSON.parse(httpReq.responseText);  // already done by ajax2...

                // Empty string means sucessful delete. The HTML coder gets to decide how to 
                // deliver the good news.
                if (obj.errorMsg.length === 0) {
                    var msg = "Record " + userId + " successfully deleted. ";
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

    
    
    ajax("webAPIs/listUsersAPI.jsp", processUserData, flexBox);
    
    function processUserData (userList) { // callback function

        // now userList has been populated with data from the AJAX call to file users.json
        console.log("user list (in processUserData) on next line - open triangle to see data");
        console.log(userList);

        // Create new object list where all properties are <td> myDivments
        var newUserList = [];
        var userList = userList.webUserList;
        for (var i = 0; i < userList.length; i++) {
            newUserList[i] = {};
            newUserList[i].WebUserId = TableUtils.makeNumber(userList[i].webUserId);
            newUserList[i].UserEmail = TableUtils.makeText(userList[i].userEmail);
            newUserList[i]._Image = TableUtils.makeImage(userList[i].image, "4rem");
            newUserList[i].Birthday = TableUtils.makeDate(userList[i].birthday);
            newUserList[i].UserRoleId = TableUtils.makeNumber(userList[i].userRoleId);
            newUserList[i].UserRoleType = TableUtils.makeText(userList[i].userRoleType);
            newUserList[i]._Update = TableUtils.makeLink(
                    "<img src='" + CRUD_icons.update + "'  style='width:1rem' />", // innerHTML of link
                    '#/userUpdate/' + userList[i].webUserId             // href of link
            );
            newUserList[i]._Delete = TableUtils.makeImage(CRUD_icons.delete, '1rem');
            
            // freeze the webUserId
            const userId=userList[i].webUserId;
            newUserList[i]._Delete.onclick = function () {
                deleteUser(userId,this);
            };            
            
            // Remove this once you are done debugging...
            //newUserList[i].Error_Msg = TableUtils.makeText(userList[i].errorMsg);
        }

        // MakeTableBetter expects all properties to be <td> myDivments.
        var userReport = MakeClickSort({
                theTitle: "Users", 
                theObjList: newUserList, 
                theSortOrderPropName: "WebUserId", 
                theSortIcon:"icons/sortUpDown16.png",
                theUrl: "#/userInsert" 
        });
        userReport.classList.add("clickSort");
        flexBox.appendChild(userReport);

    }
            
    return myDiv;
}