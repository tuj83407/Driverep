<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    StringData sd = new StringData();
    String email = request.getParameter("userEmail");
    String password = request.getParameter("userPass");
    if ((email == null) || (password == null)) {
        sd.errorMsg = "Cannot search for user - 'userEmail' and 'userPass' must be supplied";
    } else {
        DbConn dbc = new DbConn();
        sd.errorMsg = dbc.getErr(); 
        if (sd.errorMsg.length() == 0) { 
            System.out.println("*** Ready to call DbMods.findById");
            sd = DbMods.findLogon(dbc, email, password);
            if (sd.webUserId.length() > 0) {
                session.setAttribute("webUser", sd);
            } else {
                session.invalidate();
            }
        }
        dbc.close(); 
    }
    Gson gson = new Gson();
    out.print(gson.toJson(sd).trim());
%>