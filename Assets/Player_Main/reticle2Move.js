#pragma strict

var player : Transform;
var reticle1 : Transform;
private var movement : Vector3;
var distance = 16.0;	//distance ahead of ship

function Start () {

}

function Update () {

//translates to a location ahead of the player

/*movement = player.forward;

movement.Normalize();

movement = movement * distance;

transform.localPosition = player.localPosition;

transform.localPosition = movement + transform.localPosition;*/

transform.rotation = GameObject.Find("Reticle").transform.rotation;
}