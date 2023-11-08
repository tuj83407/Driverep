<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="com.google.gson.*" %>

<%  
    StringData sd = new StringData();
    
    if (session.getAttribute("webUser") == null) {
        sd.errorMsg = ("user is not logged on");
    } else {
        sd = (StringData)session.getAttribute("webUser");
    }
         
    Gson gson = new Gson();
    out.print(gson.toJson(sd).trim());
%>