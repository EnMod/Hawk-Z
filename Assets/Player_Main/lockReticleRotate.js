#pragma strict

function Start () {

}

function Update () {

	transform.rotation = GameObject.Find("Reticle").transform.rotation;
}