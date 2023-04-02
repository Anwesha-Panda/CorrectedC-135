status="";
objects=[];

function setup()
{
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(380,380);
    video.hide();
    video.size(380,380);
}

function start()
{
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects ";
    object_input =  document.getElementById("object_input").value;
    
    

}

function modelLoaded()
{
    console.log("Model Loaded!");
    status=true;
}

function draw()
{
    image(video,0 , 0,380,380);
    if(status!="")
    {
        objectDetector.detect(video,gotResult);
        for(i = 0; i < objects.length; i++)
            {
                document.getElementById("status").innerHTML = "Status : Objects Detected";
                
                
                fill('#FF0000');
                percent = floor(objects[i].confidence * 100);

               text(objects[i].label + "" + &nbsp + percent + "%", objects[i].x + 15, objects[i].y + 15);
             
               noFill();
               stroke('#FF0000');
               rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);


               if(objects[i].label==object_input)
    {
        document.getElementById("object_status").innerHTML=object_input+"found";
        video.stop();
            synth=window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance (object_input + "found");
            synth.speak(utterThis);
    }
    else{
        document.getElementById("object_status").innerHTML= object_input + "not found";
    }
        
         
        
    }
            }
    }


function gotResult(error,results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
