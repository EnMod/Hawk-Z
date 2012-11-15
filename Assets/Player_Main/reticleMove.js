#pragma strict

var speed = 5;

var lookAdjustmentX = 24;
var lookAdjustmentY = 12;

var location : Vector3;

function Start () {

}

function Update () {

location = Input.mousePosition;

location.x = ((location.x / Screen.width) * lookAdjustmentX) - lookAdjustmentX / 2;
location.y = ((location.y / Screen.height) * lookAdjustmentY) - lookAdjustmentY / 2;

location.z = transform.localPosition.z;

transform.localPosition = location;
}