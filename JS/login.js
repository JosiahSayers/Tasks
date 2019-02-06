auth2 = gapi.auth2.init({
    client_id: '245083786179-vrv7rk4j6haaknbuut85u0prmenijisi.apps.googleusercontent.com',
    cookiepolicy: 'single_host_origin', /** Default value **/
    scope: "profile  https://www.googleapis.com/auth/drive.file  https://www.googleapis.com/auth/plus.me" });

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    //console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    //document.getElementById("id").innerHTML = "ID: " + profile.getID();
    document.getElementById("name").innerHTML = "ID: " + profile.getName();
    document.getElementById("img").src = profile.getImageUrl();
    document.getElementById("email").innerHTML = "Email: " + profile.getEmail();
}

function signOut() {
    document.getElementById("name").innerHTML = "ID: ";
    document.getElementById("img").src = "";
    document.getElementById("email").innerHTML = "Email: ";

    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

function ensureUploadFolderPresent(){
    return gapi.client.drive.files.list(
        {q:"mimeType = 'application/vnd.google-apps.folder' and trashed = false"}
    ).then(function(files){
        var directory=files.result.items;

        if(!directory.length){
            return createFolder().then(function(res){
                return res.result;
            });
        }else{
            return directory[0];
        }
    });
}

function createFolder(){
    return gapi.client.drive.files.insert(
        {
            'resource':{
                "title":'Drive API From JS Sample',
                "mimeType": "application/vnd.google-apps.folder"
            }
        }
    )
}