#pragma strict

var isQuitting :boolean =  false;

var explosion : GameObject;

var explosionClone : GameObject;

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
