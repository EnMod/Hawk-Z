#pragma strict

function Start () {

}

function Update () {

//keeps reticle facing the same direction as the main reticle
transform.rotation = GameObject.Find("Reticle").transform.rotation;
}