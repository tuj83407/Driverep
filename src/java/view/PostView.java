package view;

// classes imported from java.sql.*
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.post.*;

// classes in my project
import dbUtils.*;

public class PostView {

    public static StringDataList getAllPosts(DbConn dbc) {

        // sdl will be an empty array and DbError with "" 
        StringDataList sdl = new StringDataList(); 
        
        // sd will have all of it's fields initialized to ""
        StringData sd = new StringData();
        
        try {
            String sql = "SELECT post_id, image_file, image, " +
                         "web_user.user_role_id, photo_date, description, " +
                         "post_rating, vehicle_name, web_user.web_user_id " + 
                         "FROM post_table, web_user " +
                         "WHERE post_table.web_user_id = web_user.web_user_id ";
                    
                   // + "ORDER BY web_user_id ";  // you always want to order by something, not just random order.
            
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();

            while (results.next()) {
                
                sd = new StringData();
                
                // the formatUtils methods do not throw exceptions, but if they find illegal data, they write 
                // a message right in the field that they are trying to format.

                // plainInteger returns integer converted to string with no commas.
                sd.postId = FormatUtils.plainInteger(results.getObject("post_id"));
                sd.imageFile = FormatUtils.formatString(results.getObject("image_file"));
                sd.photoDate = FormatUtils.formatDate(results.getObject("photo_date"));
                sd.description = FormatUtils.formatString(results.getObject("description"));
                sd.vehicleName = FormatUtils.formatString(results.getObject("vehicle_name"));
                sd.postRating = FormatUtils.plainInteger(results.getObject("post_rating"));
                sd.webUserId = FormatUtils.plainInteger(results.getObject("web_user_id"));
                sdl.add(sd);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in PostView.getAllPosts(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
}