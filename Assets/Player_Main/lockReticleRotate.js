#pragma strict

function Start () {

}

function Update () {
	
	//rotates lock reticle to match main reticle
	transform.localRotation = GameObject.Find("Reticle").transform.localRotation;
}