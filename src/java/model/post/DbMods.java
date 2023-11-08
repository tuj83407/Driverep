package model.post;

import dbUtils.*;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class DbMods {
    
    public static StringData findById(DbConn dbc, String id) {

        // The find API needs to represent three cases: found web_user, not found, db error. 
        StringData sd = new StringData();
        try {
            String sql = "SELECT post_id, image_file, image, web_user.user_role_id, photo_date, description, " +
                         "post_rating, vehicle_name, web_user.web_user_id " + 
                         "FROM post_table, web_user " +
                         "WHERE post_table.web_user_id = web_user.web_user_id " +
                         "AND post_id = ?";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the first (and only) ? 
            stmt.setString(1, id);

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set

                // plainInteger returns integer converted to string with no commas.
                sd.postId = FormatUtils.plainInteger(results.getObject("post_id"));
                sd.imageFile = FormatUtils.formatString(results.getObject("image_file"));
                sd.photoDate = FormatUtils.formatDate(results.getObject("photo_date"));
                sd.description = FormatUtils.formatString(results.getObject("description"));
                sd.vehicleName = FormatUtils.formatString(results.getObject("vehicle_name"));
                sd.postRating = FormatUtils.plainInteger(results.getObject("post_rating"));
                sd.webUserId = FormatUtils.plainInteger(results.getObject("web_user_id"));
                

            } else {
                sd.errorMsg = "Post Not Found.";
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in DbMods.findById(): " + e.getMessage();
        }
        return sd;

    } // findById

    /*
    Returns a "StringData" object that is full of field level validation
    error messages (or it is full of all empty strings if inputData
    totally passed validation.  
     */
    private static StringData validate(StringData inputData) {

        StringData errorMsgs = new StringData();

        /* Useful to copy field names from StringData as a reference
    public String webUserId = "";
    public String userEmail = "";
    public String userPassword = "";
    public String userPassword2 = "";
    public String image = "";
    public String birthday = "";
    public String membershipFee = "";
    public String userRoleId = "";   // Foreign Key
    public String userRoleType = ""; // getting it from joined user_role table.
         */
        // Validation
        //errorMsgs.postId = ValidationUtils.stringValidationMsg(inputData.postId, 45, false);
        errorMsgs.imageFile = ValidationUtils.stringValidationMsg(inputData.imageFile, 300, true);
        errorMsgs.photoDate = ValidationUtils.dateValidationMsg(inputData.photoDate, false);
        errorMsgs.description = ValidationUtils.stringValidationMsg(inputData.description, 300, false);
        errorMsgs.postRating = ValidationUtils.integerValidationMsg(inputData.postRating, false);
        errorMsgs.webUserId = ValidationUtils.integerValidationMsg(inputData.webUserId, true);
        errorMsgs.vehicleName = ValidationUtils.stringValidationMsg(inputData.vehicleName, 50, false);

        return errorMsgs;
    } // validate 

    public static StringData insert(StringData inputData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
                  String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
                    "web_user.user_role_id, user_role_type "+
                    "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id " + 
                    "ORDER BY web_user_id ";
             */
            // Start preparing SQL statement
            String sql = "INSERT INTO post_table (image_file, photo_date, description, post_rating, web_user_id, vehicle_name) "
                    + "values (?,?,?,?,?,?)";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class)..
            pStatement.setString(1, inputData.imageFile);
            pStatement.setDate(2, ValidationUtils.dateConversion(inputData.photoDate));
            pStatement.setString(3, inputData.description);
            pStatement.setInt(4, ValidationUtils.integerConversion(inputData.postRating));
            pStatement.setInt(5, ValidationUtils.integerConversion(inputData.webUserId));
            pStatement.setString(6, inputData.vehicleName);

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid User Role Id";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That post Id or image is already used";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // insert

    public static StringData update(StringData inputData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
                String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
                    "web_user.user_role_id, user_role_type "+
                    "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id " + 
                    "ORDER BY web_user_id ";
             */
                       
            String sql = "UPDATE post_table "
                    + "SET image_file=?, photo_date=?, description=?, post_rating=?, web_user_id=?, vehicle_name=?"
                    + " WHERE post_id =?";
            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, inputData.imageFile); // string type is simple
            pStatement.setDate(2, ValidationUtils.dateConversion(inputData.photoDate));
            pStatement.setString(3, inputData.description);
            pStatement.setInt(4, ValidationUtils.integerConversion(inputData.postRating));
            pStatement.setInt(5, ValidationUtils.integerConversion(inputData.webUserId));
            pStatement.setString(6, inputData.vehicleName);
            pStatement.setInt(7, ValidationUtils.integerConversion(inputData.postId));

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were updated (expected to update one record).";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid User Role Id";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That image address is already taken";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // update

    public static String delete(String userId, DbConn dbc) {

        if (userId == null) {
            return "Error in model.post.DbMods.delete: cannot delete post_table record because 'postId' is null";
        }

        // This method assumes that the calling Web API (JSP page) has already confirmed 
        // that the database connection is OK. BUT if not, some reasonable exception should 
        // be thrown by the DB and passed back anyway... 
        String result = ""; // empty string result means the delete worked fine.
        try {

            String sql = "DELETE FROM post_table WHERE post_id = ?";

            // This line compiles the SQL statement (checking for syntax errors against your DB).
            PreparedStatement pStatement = dbc.getConn().prepareStatement(sql);

            // Encode user data into the prepared statement.
            pStatement.setString(1, userId);

            int numRowsDeleted = pStatement.executeUpdate();

            if (numRowsDeleted == 0) {
                result = "Record not deleted - there was no record with post_id " + userId;
            } else if (numRowsDeleted > 1) {
                result = "Programmer Error: > 1 record deleted. Did you forget the WHERE clause?";
            }

        } catch (Exception e) {
            result = "Exception thrown in model.post.DbMods.delete(): " + e.getMessage();
        }

        return result;
    }

    
} // class
