<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%  
    session.invalidate();
    
    StringData sd = new StringData();
    sd.errorMsg = "you are now logged off";
         
    Gson gson = new Gson();
    out.print(gson.toJson(sd).trim());
%>