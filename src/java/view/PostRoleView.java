package view;

// classes imported from java.sql.*
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.postRole.*;

// classes in my project
import dbUtils.*;

public class PostRoleView {

    public static StringDataList getAllRoles(DbConn dbc) {

        StringDataList sdl = new StringDataList();
        try {
            String sql = "SELECT web_user_id, user_email "
                    + "FROM web_user ORDER BY web_user_id ";  // you always want to order by something, not just random order.
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();
            while (results.next()) {

                StringData role = new StringData();
                role.webUserId = FormatUtils.formatInteger(results.getObject("web_user_id"));
                role.userEmail = FormatUtils.formatString(results.getObject("user_email"));

                sdl.add(role);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringData sd = new StringData();
            sd.errorMsg = "Exception thrown in RoleView.allRolesAPI(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
}