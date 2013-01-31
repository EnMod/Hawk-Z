#pragma strict

function Start () {

}

function Update () {

	transform.localRotation = GameObject.Find("Reticle").transform.localRotation;
}