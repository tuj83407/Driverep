function clickSortUserContent() {

    var myDiv = document.createElement("div");
    var flexBox = document.createElement("div");
    flexBox.classList.add('clickSort'); // see styling in this file, above...
    myDiv.appendChild(flexBox);

    ajax("json/users.json", processUserData, flexBox);

            function processUserData (userList) { // callback function

                // now userList has been populated with data from the AJAX call to file users.json
                console.log("user list (in processUserData) on next line - open triangle to see data");
                console.log(userList);

                // Create new object list where all properties are <td> myDivments
                var newUserList = [];
                for (var i = 0; i < userList.length; i++) {
                    newUserList[i] = {};
                    newUserList[i].WebUserId = TableUtils.makeNumber(userList[i].webUserId);
                    newUserList[i].UserEmail = TableUtils.makeText(userList[i].userEmail);
                    newUserList[i]._Image = TableUtils.makeImage(userList[i].image, "4rem");
                    newUserList[i].Birthday = TableUtils.makeDate(userList[i].birthday);
                    newUserList[i].UserRoleId = TableUtils.makeNumber(userList[i].userRoleId);
                }

                // MakeTableBetter expects all properties to be <td> myDivments.
                var userReport = MakeClickSort({
                        theTitle: "Users", 
                        theObjList: newUserList, 
                        theSortOrderPropName: "WebUserId", 
                        theSortIcon:"icons/sortUpDown16.png", 
                });
                userReport.classList.add("clickSort");
                flexBox.appendChild(userReport);

            }
            
    return myDiv;
}