var account = {};
(function(){
    account.logon = function() {

        var logonDiv = document.createElement("div");
        logonDiv.classList.add("account");

        var userEmailSpan = document.createElement('span');
        userEmailSpan.innerHTML = "Enter Web User Email: ";
        logonDiv.appendChild(userEmailSpan);
        var userEmailInput = document.createElement("input");
        logonDiv.appendChild(userEmailInput);

        var userPassSpan = document.createElement('span');
        userPassSpan.innerHTML = "Enter Web User Password: ";
        logonDiv.appendChild(userPassSpan);
        var userPassInput = document.createElement("input");
        userPassInput.setAttribute("type", "password"); // so it shows dots not characters
        logonDiv.appendChild(userPassInput);

        var logonButton = document.createElement("button");
        logonButton.innerHTML = "Logon";
        logonDiv.appendChild(logonButton);

        var msgDiv = document.createElement("div");
        logonDiv.appendChild(msgDiv);
        logonButton.onclick = function () {


            var url = "webAPIs/logonAPI.jsp?userEmail=" + encodeURI(userEmailInput.value) + "&userPass=" + encodeURI(userPassInput.value);

            console.log("onclick function will make AJAX call with url: " + url);
            ajax(url, processLogon, msgDiv);

            function processLogon(obj) {
                var msg = "";
                console.log("Successfully called the logon API. Next line shows the returned object.");
                console.log(obj);
                msgDiv.innerHTML = account.buildProfile(obj);
            }
        };  // onclick function

        return logonDiv;
    };

    account.buildProfile = (function(obj) {
        var msg = "";
                console.log("Successfully called the account API. Next line shows the returned object.");
                console.log(obj);
                if (obj.errorMsg.length > 0) {
                    msg += "<strong>Error: " + obj.errorMsg + "</strong>";
                } else {
                    msg += "<strong>Welcome Web User " + obj.webUserId + "</strong>";
                    msg += "<br/> Birthday: " + obj.birthday;
                    msg += "<br/> MembershipFee: " + obj.membershipFee;
                    msg += "<br/> User Role: " + obj.userRoleId + " " + obj.userRoleType;
                    msg += "<p> <img src ='" + obj.image + "'></p>";
                }
                return msg;
    });

    account.getProfile = function(){
        var msgDiv = document.createElement("div");
        msgDiv.classList.add("account");
        
        ajax("webAPIs/getProfile.jsp", processProfile, msgDiv);

        function processProfile(obj) {
            msgDiv.innerHTML = account.buildProfile(obj);
        }

        return msgDiv;  
    }; 

    account.logoff = function() {
        
        var myDiv = document.createElement("div");
        myDiv.classList.add("account");
        
        ajax("webAPIs/logoffAPI.jsp", profileInfo, myDiv);

                function profileInfo (obj) { 
                    console.log("Successfully called the logOff API.");
                    var msg = "<strong>" + obj.errorMsg + "</strong>";

                    myDiv.innerHTML = msg;

                }

        return myDiv;
    };

}());
