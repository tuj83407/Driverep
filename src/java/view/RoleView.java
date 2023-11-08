package view;

// classes imported from java.sql.*
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.role.*;

// classes in my project
import dbUtils.*;

public class RoleView {

    public static StringDataList getAllRoles(DbConn dbc) {

        StringDataList sdl = new StringDataList();
        try {
            String sql = "SELECT user_role_id, user_role_type "
                    + "FROM user_role ORDER BY user_role_type ";  // you always want to order by something, not just random order.
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();
            while (results.next()) {

                StringData role = new StringData();
                role.userRoleId = FormatUtils.formatInteger(results.getObject("user_role_id"));
                role.userRoleType = FormatUtils.formatString(results.getObject("user_role_type"));

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