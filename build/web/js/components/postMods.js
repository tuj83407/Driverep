var postMods = {};

(function () {  // This is an IIFE, an immediately executing function.
    // It is an anonymous function that runs once (and only once) at page load time.
    // It is a way to create private functions that can be shared. 

    //alert("I am an IIFE!"); // runs only at page load time...


// Properties that are "global" to this IIFE: 

    // validateObjList is an associative array that has one object per field in the web_user 
    // StringData object. (The key of each object will be the webUser StringData property name.) 
    // Each object shall hold two important properties: (1) the input box (so we can get user's input)
    // and (2) the field level error message associated with that input. 
    // So, for example, validateObjList["userEmail"].inputBox will hold the input for "userEmail"
    // and validateObjList["userEmail"].errorTd will hold the error message associated 
    // with that same field. 

    var validateObjList = [];

    // in addition to the "normal fields" (that each need an input box and error message0, 
    // we have these items (in the HTML table) that are a little different: 

    var selectTag;   // a select tag (dom element) that holds user role options

    var roleInputTd;  // the Td that holds the selectTag.

    var saveButton;  // the save button that will actually try to insert a record

    var recordError; // the record level error message for messages like "Duplicate email"


    // Create and return the three column HTML table (col 1 is prompt, col 2 is input box, col 3 is 
    // field level error message). Side effect is saving references to the input boxes and 
    // field level error messages into the validateObjList (defined just above). Also, creating 
    // the saveButton and recordError (also defined just above). 
    function createValidationArea() {

        var validateTable = document.createElement("table");

        // call makeInputRow for each field. This will add a new row into the validateTable 
        // (a HTML table DOM element) and it will add two references per field in the 
        // associative array validateObjList (one will be inputBox and the other will be errorTd).

        /* Web API property names: "webUserId", "userEmail", "userPassword", "userPassword2", 
         * "image", "birthday", "membershipFee", "userRoleId", "userRoleType", "errorMsg"   */

        makeInputRow("postId", "Post Id", validateTable);
        validateObjList["postId"].inputBox.setAttribute("disabled", true);
        makeInputRow("imageFile", "Image URL", validateTable);
        makeInputRow("photoDate", "Photo Date", validateTable);
        makeInputRow("description", "Description", validateTable);
        makeInputRow("postRating", "Post Rating", validateTable);
        makeInputRow("vehicleName", "Vehicle Name", validateTable);
        
        
        // initially, the user role is an input box like the other fields, but it will get 
        // changed to a select tag...
        makeInputRow("webUserId", "Email", validateTable);

        // Add non-standard last row to validatTable. The first cell will hold a Save button. 
        // The 2nd cell will hold the record error. The 3rd cell will be just a filler.
        var row = Utils.make({
            htmlTag: "tr",
            parent: validateTable
        });
        var saveCell = Utils.make({
            htmlTag: "td",
            parent: row
        });

        // saveButton declared before this function
        saveButton = Utils.make({
            htmlTag: "button",
            innerHTML: "Save",
            parent: saveCell
        });

        // recordError declared before this function
        recordError = Utils.make({
            htmlTag: "td",
            parent: row,
            class: "error"
        });
        Utils.make({// third empty cell (filler) -- dont need a reference to this.
            htmlTag: "td",
            parent: row
        });

        // Fall 2021 Modification to work with NavRouter. The line below used to be in the 
        // getRoleAPI callback function, but it had to be moved up here (out of the call back function). 
        // With NavRouter, the getRoleAPI callback function (when refreshing Account - Register) 
        // is invoked twice which made roleInputTd be null the second time. 
        roleInputTd = validateObjList["webUserId"].inputBox.parentElement;

        return validateTable;

    } // createValidationArea



    // ***** makeInputRow *****
    // This function creates then adds a tr (table row) into validationTable (a HTML table tag, input param). 
    // Into this tr, this function (makeInputRow):
    //   *  adds a 1st td filling that innerHTML with promptText. 
    //   *  adds a 2nd td, placing a textbox inside, and stores a reference to the textbox. 
    //   *  adds a 3rd td (classed "error") to hold validation error message (and stores a reference to it).
    //   
    // Finally, it creates an object that references the two things we need to access programatically: 
    // the input textbox (where user's input will be found) and the error td (where we will write any 
    // possible error messages). This object is stored into validationObjList using associative array 
    // notation (using fieldName as the key.)
    function makeInputRow(fieldName, promptText, validationTable) {

        var obj = {}; // this will hold references to the input box and the error td for the 
        // given field name.

        var row = Utils.make({// Inject a row into the table 
            htmlTag: "tr",
            parent: validationTable
        });
        Utils.make({// first td of row will hold promptText
            htmlTag: "td",
            innerHTML: promptText, // use fieldName as prompt for now, later promptText,
            parent: row
        });
        var inputTd = Utils.make({// second td of row will hold user input
            htmlTag: "td",
            parent: row
        });
        // store reference to this input box. we need to access it programatically 
        // (to find user's input).
        obj.inputBox = Utils.make({// place textbox in second td
            htmlTag: "input",
            parent: inputTd
        });
        // store reference to the 3rd td that is for holding error messages, 
        // so we can access it programmatically.
        obj.errorTd = Utils.make({
            htmlTag: "td",
            parent: row,
            class: "error"
        });
        // obj has a reference to the inputBox and the errorTd (the two things 
        // we need to access programatically to do validation). Store this 
        // object into an associative array (using fieldName as key). 
        validateObjList[fieldName] = obj;
    } // makeInputRow


    // create an object from the values typed into the page, URL encode it and return it.
    function getDataFromUI() {     // a private function within the IIFE 

        /* Web API property names: "webUserId", "userEmail", "userPassword", "userPassword2", 
         * "image", "birthday", "membershipFee", "userRoleId", "userRoleType", "errorMsg"   */

        var userInputObj = {

            "postId": validateObjList["postId"].inputBox.value,
            "imageFile": validateObjList["imageFile"].inputBox.value,
            "photoDate": validateObjList["photoDate"].inputBox.value,
            "description": validateObjList["description"].inputBox.value,
            "postRating": validateObjList["postRating"].inputBox.value,
            "vehicleName": validateObjList["vehicleName"].inputBox.value,
            
            "webUserId": selectTag.options[selectTag.selectedIndex].value,

            // Modification here for role pick list
            //"userRoleId": validateObjList["userRoleId"].inputBox.value,
            //"userRoleId": selectTag.options[selectTag.selectedIndex].value,

            // These two fields of the web user string data object will not affect
            // the record that's inserted into the database, but we provide them 
            // so that we are passing a 'well formed' web user string data object
            // to the server side API.
            //"userRoleType": "",
            "errorMsg": ""
        };
        console.log("getDataFromUI - userInputObj on next line");
        console.log(userInputObj);

        // JSON.stringify converts the javaScript object into JSON format 
        // (the reverse operation of what gson does on the server side).
        // Then, you have to encode the user's data (encodes special characters 
        // like space to %20 so the server will accept it with no security error). 
        return encodeURIComponent(JSON.stringify(userInputObj));
    }

    // write the jsonObj (full of error message) to the Validation UI. 
    function writeErrorObjToUI(jsonObj) {

        /* Web API property names: "webUserId", "userEmail", "userPassword", "userPassword2", 
         * "image", "birthday", "membershipFee", "userRoleId", "userRoleType", "errorMsg"   */

        console.log("here is JSON object (holds error messages.");
        console.log(jsonObj);
        //validateObjList["postId"].errorTd.innerHTML = jsonObj.postId;
        validateObjList["imageFile"].errorTd.innerHTML = jsonObj.imageFile;
        validateObjList["photoDate"].errorTd.innerHTML = jsonObj.photoDate;
        validateObjList["description"].errorTd.innerHTML = jsonObj.description;
        validateObjList["postRating"].errorTd.innerHTML = jsonObj.postRating;
        validateObjList["webUserId"].errorTd.innerHTML = jsonObj.webUserId;
        validateObjList["vehicleName"].errorTd.innerHTML = jsonObj.vehicleName;
        recordError.innerHTML = jsonObj.errorMsg;

    } // writeErrorObjToUI



    // webUserMods.insert gets called when the user clicks on Register or Plus 
    // sign from Web User List -- this method just builds the insert UI. 
    postMods.insert = function () {

        var insertDiv = document.createElement("div");
        insertDiv.classList.add("insertArea");

        Utils.make({// don't need a reference to this created DOM element, 
            // so not capturing the return value.
            htmlTag: "h2",
            innerHTML: "New Post",
            parent: insertDiv
        });

        // validateTable is declared outside this function. 
        // createValidationArea creates validateTable as an HTML table with three columns: 
        //   1.) prompt, 2.) input box, 3.) error message area
        // and one row per field in the web_user table (into which we are trying to insert). 

        insertDiv.appendChild(createValidationArea());

        // createValidationArea also creates a saveButton (button) and a recordError (td)
        // (both declared outside of createValidationArea).

        saveButton.onclick = function () {

            // like an "in progress" message while waiting for AJAX call.
            recordError.innerHTML = " &nbsp; &nbsp; ...";
            insertSave();
        };

        // replace role id inputBox with select tag populated from the roles in the database.
        // NOTE: since roles do not change that much, it would be OK to not be so careful 
        // to get the latest roles from the db to populate the role pick list. I am showing this 
        // to you so that you WOULD KNOW how to get the latest pick list from the DB.
        ajax("webAPIs/getOtherAPI.jsp", processWebUsers, insertDiv);
        function processWebUsers(obj) {

            if (obj.dbError.length > 0) {
                validateObjList["webUserId"].errorTd.innerHTML += "Programmer Error: Cannot Create Post Pick List";
            } else {
                selectTag = Utils.makePickList({
                    list: obj.roleList,

                    // property names for newer version of makePickList
                    idProp: "webUserId",
                    displayProp: "userEmail"
                            // property names for older version of makePickList
                            // would also work (backward compatibility built in).
                            // keyProp: "userRoleId",
                            // valueProp: "userRoleType"

                });

                // replace text box (for user role) with select tag
                roleInputTd.innerHTML = "";
                roleInputTd.appendChild(selectTag);
            }
        }

        return insertDiv;

    }; // end of webUsers.insert


    function insertSave() {

        // create a user object from the values that the user has typed into the page.
        var myData = getDataFromUI();

        //console.log("webUserMods.insert: JSON data to send to insert API: "+myData); 

        ajax("webAPIs/insertOtherAPI.jsp?jsonData=" + myData, processInsert, recordError);
        function processInsert(obj) {

            console.log("postMods.insert/insertSave/processInsert error msg obj (see next line)");
            console.log(obj);

            // the server prints out a JSON string of an object that holds field level error 
            // messages. The error message object (conveniently) has its fiels named exactly 
            // the same as the input data was named. 

            if (obj.errorMsg.length === 0) { // success
                obj.errorMsg = "Record successfully inserted.";
            }

            writeErrorObjToUI(obj);
        }
    } //insertSave

    // the purpose of this function is just to build the update UI...
    postMods.update = function (postId) {

        console.log("webUsers.update called with webUserId " + postId);

        var updateDiv = document.createElement("div");
        updateDiv.classList.add("insertArea");

        Utils.make({// don't need a reference to this created DOM element, 
            // so not capturing the return value.
            htmlTag: "h2",
            innerHTML: "Update Post",
            parent: updateDiv
        });

        validateObjList = [];
        updateDiv.appendChild(createValidationArea());

        // createValidationArea also creates a saveButton (button) and a recordError (td)
        // (both declared outside of createValidationArea).

        saveButton.onclick = function () {

            // like an "in progress" message while waiting for AJAX call.
            recordError.innerHTML = " &nbsp; &nbsp; ...";
            updateSave();
        };

        ajax("webAPIs/getOtherByIdAPI.jsp?postId=" + postId, gotRecordById, updateDiv);

        function gotRecordById(postObj) { // obj is what got JSON.parsed from Web API's output

            console.log("gotRecordById, postObj is next");
            console.log(postObj);
            console.log(validateObjList);

            /* Web API property names: "webUserId", "userEmail", "userPassword", "userPassword2", 
             * "image", "birthday", "membershipFee", "userRoleId", "userRoleType", "errorMsg"   */

            validateObjList["postId"].inputBox.value = postObj.postId;
            validateObjList["imageFile"].inputBox.value = postObj.imageFile;
            validateObjList["photoDate"].inputBox.value = postObj.photoDate;
            validateObjList["description"].inputBox.value = postObj.description;
            validateObjList["postRating"].inputBox.value = postObj.postRating;
            validateObjList["webUserId"].inputBox.value = postObj.webUserId;
            validateObjList["vehicleName"].inputBox.value = postObj.vehicleName;
            

            // replace role id inputBox with select tag populated from the roles in the database.
            // NOTE: since roles do not change that much, it would be OK to not be so careful 
            // to get the latest roles from the db to populate the role pick list. I am showing this 
            // to you so that you WOULD KNOW how to get the latest pick list from the DB.
            ajax("webAPIs/getOtherAPI.jsp", processRoles, updateDiv);

            function processRoles(obj) {

                if (obj.dbError.length > 0) {
                validateObjList["webUserId"].errorTd.innerHTML += "Programmer Error: Cannot Create Post Pick List";
            } else {
                selectTag = Utils.makePickList({
                    list: obj.roleList,

                    // property names for newer version of makePickList
                    idProp: "webUserId",
                    displayProp: "userEmail"
                            // property names for older version of makePickList
                            // would also work (backward compatibility built in).
                            // keyProp: "userRoleId",
                            // valueProp: "userRoleType"

                });

                // replace text box (for email) with select tag
                roleInputTd.innerHTML = "";
                roleInputTd.appendChild(selectTag);
            }
            } // processRoles
        } // gotRecordById

        return updateDiv;

    }; // end of webUsers.update

    function updateSave() {

        var myData = getDataFromUI();
        ajax("webAPIs/updateOtherAPI.jsp?jsonData=" + myData, reportUpdate, recordError);
        function reportUpdate(jsErrorObj) {

            // the server prints out a JSON string of an object that holds field level error 
            // messages. The error message object (conveniently) has its fiels named exactly 
            // the same as the input data was named. 

            if (jsErrorObj.errorMsg.length === 0) { // success
                jsErrorObj.errorMsg = "Record successfully updated. ";
            }

            writeErrorObjToUI(jsErrorObj);
        }
    } //updateSave
}());  // end of the IIFE