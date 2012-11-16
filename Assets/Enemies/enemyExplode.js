#pragma strict

//causes enemy to explode on death

private var isQuitting : boolean =  false;

var explosion : GameObject;

private var explosionClone : GameObject;

function OnApplicationQuit()
{
    isQuitting = true;
}

function OnDestroy()
{
    if (!isQuitting)
    {
        explosionClone.Instantiate(explosion,transform.position,transform.parent.rotation);
    }
}
