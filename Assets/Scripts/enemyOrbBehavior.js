#pragma strict

@System.NonSerialized var lineRend : LineRenderer;		//Renders the link	

var linkStart : Color;	
var linkEnd : Color;			

function Awake() {
	var tempWidth = gameObject.Find("InnerLevel").GetComponent(enemyOrbInnerLevelBehavior).connectorWidth;
	
	//Sets the link options.
	lineRend = gameObject.AddComponent(LineRenderer);
	lineRend.material = new Material(Shader.Find("Particles/Alpha Blended Premultiply"));
	lineRend.SetWidth(tempWidth, tempWidth);
	lineRend.SetVertexCount(2);
	lineRend.SetColors(linkStart, linkEnd);
	
	//Alters the distance from the center by use of posMultiplier in InnerLevelBehavior.
	transform.localPosition = transform.localPosition * gameObject.Find("InnerLevel").GetComponent(enemyOrbInnerLevelBehavior).posMultiplier;
	
}

function Update()
{
	transform.up = GameObject.FindGameObjectWithTag("Rail").transform.up;
}

//Draws connection determined in Inner level Behavior
function drawConnection(end : Vector3) {

	lineRend.SetPosition(0, transform.position);
	lineRend.SetPosition(1, end);
	
}

//Reduces Orb Count and is destroyed on collision.
function OnDestroy()
{
	transform.parent.GetComponent(enemyOrbInnerLevelBehavior).OrbCount--;
}