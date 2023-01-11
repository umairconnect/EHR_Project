import { APICall } from '../Services/APICall';
function SetMaxFileSize() {
    
    const data = { Code: 'Web:MaxFileSize' };
    APICall('POST', 'user/getConfigurationValue', data).then((result) => {
        if (result.success)
            sessionStorage.setItem('max_file_size', JSON.stringify(result.data));
    });
}
function GetMaxFileSize() {
    return sessionStorage.getItem('max_file_size');

}
export { SetMaxFileSize, GetMaxFileSize };