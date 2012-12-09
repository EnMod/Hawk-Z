#pragma strict

//Will cause bullet to destroy a wide area in a splash

function Start () {

}

function Update () {

}

//function to change parent of lock reticle when destroyed

function OnDestroy()
{
    
        GameObject.Find("LockReticle").transform.parent = transform.parent;
    
}
