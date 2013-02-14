#pragma strict

//not my code.  This was wirtten by Ben Pitt at http://answers.unity3d.com/questions/11892/how-would-you-make-an-energy-bar-loading-progress.html
//altered slightly, and will be further altered as necessary until it's basically our own

var barDisplay : float = 0;
var pos : Vector2 = new Vector2(20,40);
var size : Vector2;
var progressBarEmpty : Texture2D;
var progressBarFull : Texture2D;

var explosion : GameObject;

var explosionClone : GameObject;

//temporary variable for depletion rate
var depleat = .1;

function Start()
{
	//set size here so unity doesn't overwrite the value in the debugger
	size = Vector2(Screen.width / 8, Screen.height / 20);
	barDisplay = size.x;
}

function OnGUI()
{

    // draw the background:
    GUI.BeginGroup (new Rect (pos.x, pos.y, size.x, size.y));
        GUI.Box (Rect (0,0, size.x, size.y),progressBarEmpty);

        // draw the filled-in part:
        GUI.BeginGroup (new Rect (0, 0, barDisplay, size.y));
            GUI.Box (Rect (0,0, size.x, size.y),progressBarFull);
        GUI.EndGroup ();

    GUI.EndGroup ();

} 

function Update()
{
    // for now, depleats on a timer
    barDisplay -= Time.time * depleat;
	
	//when the display is empty, blow the player up
	if (barDisplay < 0)
	{
		//remove the reticles
		Destroy(GameObject.Find("Reticle"));
		Destroy(GameObject.Find("Reticle2"));
		
		//blow up player.
		//consider using a replacement ragdoll object instead of an explosion
		explosionClone.Instantiate(explosion,transform.position,transform.parent.rotation);
		Destroy(gameObject);
	}
}