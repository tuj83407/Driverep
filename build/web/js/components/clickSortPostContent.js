function clickSortPostContent() {

    var myDiv = document.createElement("div");
    var flexBox = document.createElement("div");
    flexBox.classList.add('flexContainer'); // see styling in this file, above...
    myDiv.appendChild(flexBox);

    ajax("json/posts.json", processPostData, flexBox);

            function processPostData (postList) { 

                // now shroomList has been populated with data from the AJAX call to file users.json
                console.log("user list (in processPostData) on next line - open triangle to see data");
                console.log(postList);

                // Create new object list where all properties are <td> myDivments
                var newPostList = [];
                for (var i = 0; i < postList.length; i++) {
                    newPostList[i] = {};
                    newPostList[i].PostId = TableUtils.makeNumber(postList[i].post_id);
                    newPostList[i]._Image = TableUtils.makeImage(postList[i].image_file, "8rem");
                    newPostList[i].PhotoDate = TableUtils.makeDate(postList[i].photo_date);
                    newPostList[i].Description = TableUtils.makeText(postList[i].description);
                    newPostList[i].VehicleName = TableUtils.makeText(postList[i].vehicle_name);
                    newPostList[i].PostRating = TableUtils.makeNumber(postList[i].post_rating);
                    newPostList[i].WebUserId = TableUtils.makeNumber(postList[i].web_user_id);
                    newPostList[i].UserRoleId = TableUtils.makeNumber(postList[i].user_role_id);
                    
                }

                // MakeTableBetter expects all properties to be <td> myDivments.
                var postReport = MakeClickSort({
                        theTitle: "Posts", 
                        theObjList: newPostList, 
                        theSortOrderPropName: "PostId", 
                        theSortIcon:"icons/sortUpDown16.png", 
                });
                postReport.classList.add("clickSort");
                flexBox.appendChild(postReport);

            }
            
    return myDiv;
}