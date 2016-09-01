var api_url = 'https://www.scdlab.com/_apps/bdm/';
var api_key = 'WKRe8PyITn6bRGfeSmDK';
var localDB;
if(typeof(Storage)!=="undefined")
{
    localDB = true;
}
else
{
    localDB = false;
}

function api_error(jqXHR, textStatus, errorThrown) {
    alert('error '+ textStatus);
    console.log("error " + textStatus);
    console.log("incoming Text " + jqXHR.responseText);
}
