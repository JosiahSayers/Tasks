
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
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}
