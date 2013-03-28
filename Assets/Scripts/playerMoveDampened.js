#pragma strict

var reticle : Transform;
private var targetPos : GameObject;
var damping : float;
var retPos : Vector3;

function Start () {
targetPos = new GameObject();
targetPos.name = "PlayerMovementObject";
}

function Update () {
	//moves avatar
	retPos = Camera.main.WorldToViewportPoint(reticle.position);

	targetPos.transform.parent = reticle.parent;

	targetPos.transform.position = Camera.main.ViewportToWorldPoint(Vector3(retPos.x, retPos.y, 25));

	transform.localPosition.x = Mathf.Lerp(transform.localPosition.x, targetPos.transform.localPosition.x, damping * Time.deltaTime);
	transform.localPosition.y = Mathf.Lerp(transform.localPosition.y, targetPos.transform.localPosition.y, damping * Time.deltaTime);
	
	transform.LookAt(reticle);
} 


/*//make sure velocity is not way too small
if(velocity.magnitude < minVelocity)// || (Input.GetKey ("space")))
	velocity = Vector3(0,0,0);*/