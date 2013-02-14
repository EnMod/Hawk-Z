#pragma strict	

var lookAdjustmentX = 24;		//adjusts x value of reticle
var lookAdjustmentY = 12;		//adjusts y value of reticle

private var location : Vector3;		//location vector of reticle

function Start () {

}

function Update () {

location = Input.mousePosition;

//maps reticle location to mouse location on screen
location.x = ((location.x / Screen.width) * lookAdjustmentX) - lookAdjustmentX / 2;
location.y = ((location.y / Screen.height) * lookAdjustmentY) - lookAdjustmentY / 2;

//locks z position
location.z = transform.localPosition.z;

//sets the actual location to the location vector
transform.localPosition = location;
}