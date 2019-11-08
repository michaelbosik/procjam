let app = null;
let cameraZ = 0;
const fov = 20;
let speed = 0;

let stars = [];
let textures = [];
let imageData = [];

let warpSlider = null, warpValue = null, stretchSlider = null, 
stretchValue = null, sizeSlider = null, sizeValue = null, 
baseSpeedSlider = null, baseSpeedValue = null, 
amountSlider = null, amountValue = null;

const imageAmount = function (){return amountSlider.value * 100;}
const baseSpeed = function(){return baseSpeedSlider.value * 0.025;}
const warpSpeed = function(){return warpSlider.value;}
const imageStretch = function(){return stretchSlider.value/2;}
const baseSize = function(){return sizeSlider.value/10;}

function main(){
    app = new PIXI.Application();

    assignElements();
    loadImages();
}

//Assigns the slider variables to the sliders themselves
function assignElements(){
    document.getElementById("processContainer").appendChild(app.view);
    document.getElementById("uploadImage").addEventListener("change", readFile);

    warpSlider = document.getElementById("warpRange");
    warpValue = document.getElementById("warpValue");

    stretchSlider = document.getElementById("stretchRange");
    stretchValue = document.getElementById("stretchValue");

    sizeSlider = document.getElementById("sizeRange");
    sizeValue = document.getElementById("sizeValue");

    baseSpeedSlider = document.getElementById("baseSpeedRange");
    baseSpeedValue = document.getElementById("baseSpeedValue");

    amountSlider = document.getElementById("amountRange");
    amountValue = document.getElementById("amountValue");
    setSliderValues();
}

//Reads in a file, adding it to the array of photos + appending it to the name list
function readFile() {
    if (this.files && this.files[0]) {    
      var FR= new FileReader();    
      FR.addEventListener("load", function(e) {
            imageData[imageData.length] = e.target.result;
            loadImages();
      }); 
      addFileName(this.files[0].name);
      FR.readAsDataURL( this.files[0] );
    } 
}

//Loads the images array
function loadImages(){
    if (app)
        app.destroy(true);
    app = new PIXI.Application();
    document.getElementById("processContainer").appendChild(app.view);
    
    textures = [];
    textures[0] = PIXI.Texture.from('star.png');

    for(let i = 0; i < imageData.length; i++){
        let image = new Image();
        image.src = imageData[i];
        textures[textures.length] = PIXI.Texture.from(new PIXI.BaseTexture(image));
    }
    reloadSprites();
}

//Reloads the sprites onto the canvas
function reloadSprites(){
    stars = [];
    for (let i = 0; i < imageAmount(); i++) {
        const star = {
            sprite: randomSprite(),
            z: 0,
            x: 0,
            y: 0,
        };
        star.sprite.anchor.x = 0.5;
        star.sprite.anchor.y = 0.7;
        randomizeStar(star, true);
        app.stage.addChild(star.sprite);
        stars.push(star);
    }
    listen();
}

function randomSprite(){
    let rand = Math.floor(Math.random() * textures.length);
    return new PIXI.Sprite(textures[rand]);
}

function randomizeStar(star, initial) {
    star.z = initial ? Math.random() * 2000 : cameraZ + Math.random() * 1000 + 2000;
    const deg = Math.random() * Math.PI * 2;
    const distance = Math.random() * 50 + 1;
    star.x = Math.cos(deg) * distance;
    star.y = Math.sin(deg) * distance;
}

function listen(){
    app.ticker.add((delta) => {
        speed += (warpSpeed() - speed) / 20;
        cameraZ += delta * 10 * (speed + baseSpeed());
        for (let i = 0; i < imageAmount(); i++) {
            const star = stars[i];
            if (star.z < cameraZ) randomizeStar(star);

            const z = star.z - cameraZ;
            star.sprite.x = star.x * (fov / z) * app.renderer.screen.width + app.renderer.screen.width / 2;
            star.sprite.y = star.y * (fov / z) * app.renderer.screen.width + app.renderer.screen.height / 2;

            const dxCenter = star.sprite.x - app.renderer.screen.width / 2;
            const dyCenter = star.sprite.y - app.renderer.screen.height / 2;
            const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter + dyCenter);
            const distanceScale = Math.max(0, (2000 - z) / 2000);
            star.sprite.scale.x = distanceScale * baseSize();
            star.sprite.scale.y = distanceScale * baseSize() + distanceScale * speed * imageStretch
        () * distanceCenter / app.renderer.screen.width;
            star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
        }
    });
}

//Sets the initial slider value interactions
function setSliderValues(){
    warpValue.innerHTML = "Warp Speed:" + warpSlider.value;
    warpSlider.oninput = function() {
        warpValue.innerHTML = "Warp Speed:" + this.value;
    }

    stretchValue.innerHTML = "Warp Stretch Length:" + stretchSlider.value;
    stretchSlider.oninput = function() {
        stretchValue.innerHTML = "Warp Stretch Length:" + this.value;
    }

    sizeValue.innerHTML = "Base Size:" + sizeSlider.value;
    sizeSlider.oninput = function() {
        sizeValue.innerHTML = "Base Size:" + this.value;
    }
    
    baseSpeedValue.innerHTML = "Base Speed:" + baseSpeedSlider.value;
    baseSpeedSlider.oninput = function() {
        baseSpeedValue.innerHTML = "Base Speed:" + this.value;
    }

    amountValue.innerHTML = "Amount:" + amountSlider.value;
    amountSlider.oninput = function() {
        amountValue.innerHTML = "Amount:" + this.value;
        loadImages();
    }
}

function addFileName(name){
    let li = document.createElement('li');
    li.innerHTML = name;
    document.getElementById('filelist').appendChild(li);
}