
import { UserRoleRights } from '../context/StaticDropDowns';

function GetUserRolesRights() {
    return sessionStorage.getItem('user_permissions');

}
function IsEditable(module) {
    let user_role_rights_list = JSON.parse(sessionStorage.getItem('user_permissions'));
    if (user_role_rights_list != null) {
        let isEditable = user_role_rights_list.filter(objRights => objRights.rightName == module && objRights.permissionCode == UserRoleRights.Editable);
        if (isEditable != null && isEditable.length > 0) {
            return true;
        }
        else
            return false;
    }
}
export { GetUserRolesRights, IsEditable }