#pragma strict

function Start () {

}

function Update () {
	
	//rotates lock reticle to match main reticle
	transform.forward = -1 * Camera.main.transform.forward;
}