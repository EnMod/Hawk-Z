//#pragma strict
//
//var ts : float;			//distance along path
//var srs : RadicalLibrary.SmoothQuaternion;
//var path : Vector3[];		//the path the enemy is given
//var dist : float;
//var counter: float;
////enemy speed
//var speed = 3f;
//var attacked = false;
//
//var trigger : float;
//private var takeStats = 0;		//determines when to take stats
//
//function Start () {
//
//}
//
//
////NOTE: make sure to use this format for all enemy move scripts.
//
//function Update () {
//
////wait one frame for the enemy move script to initialize
//if(takeStats == 0)
//	takeStats++;
//
////take all of the stats from the enemy move script
//else if (takeStats == 1)
//{
//	srs = gameObject.GetComponent(enemyBehavior).srs;
//	path = gameObject.GetComponent(enemyBehavior).path;
//	speed = gameObject.GetComponent(enemyBehavior).speed;
//	
//	takeStats ++;
//}
////begin moving.  This is the code that gets replaced for each enemy
//else
//{
//var q : Quaternion;
//    if(ts < trigger)
//    {
//    transform.localPosition = Spline.MoveOnPath(path, transform.localPosition, ts, q, speed, 100, EasingType.Sine, true, true);
//    ts += Time.deltaTime/20;
//    
//    srs.Value = q;
//    transform.rotation = srs;
//	}
//	else 
//	{
//		
//		dist = Vector3.Distance(gameObject.FindGameObjectWithTag("Player").transform.position, transform.position);
//		Debug.Log("Dist" + dist);
//		if(dist < 50.0)
//		{
//	
//			if(dist < 7.5)
//			{
//				attacked = true;
//			}
//		
//			if(attacked == false)
//			{
//				transform.LookAt(gameObject.FindGameObjectWithTag("Player").transform);
//				var temp = Vector3.forward;
//				temp.Normalize();
//				transform.Translate(temp * Time.deltaTime * 30);
//			}
//			
//		}
//		if(attacked == true)	
//		{
//			counter= counter + Time.deltaTime; 
//		}
//			//THIS DOES NOT MEAN WHAT YOU THINK IT MEANS
//			
//			var temp2 = Vector3.forward;
//			temp2.Normalize();
//		if(attacked == true)	
//			transform.Translate(temp2* Time.deltaTime * 32);
//	
//		if(counter >5 )
//		{
//			gameObject.GetComponent(enemyBehavior).canExplode = false;
//			Destroy(gameObject);
//		}
//		
//	}
//	//if at the end of the path, destroy the enemy without exploding it
//
//}
//}