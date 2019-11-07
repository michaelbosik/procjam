const app = new PIXI.Application();

const starAmount = 1000;
let cameraZ = 0;
const fov = 20;
const baseSpeed = 0.025;
let speed = 0;
let warpSpeed = 0;
const starStretch = 5;
const starBaseSize = 0.3; //0.3
const stars = [];
const images = [];

const starTexture = PIXI.Texture.from('images/kappatrans.png');
const planetTexture = PIXI.Texture.from('rp.png');

function main(){
    loadImages();
    document.body.appendChild(app.view);
    placeSprites();
    setInterval(() => {
        warpSpeed = warpSpeed > 0 ? 0 : 1;
    }, 5000);
    listen();
}

function loadImages(){
    // fs = new FileReader();
    // fs.readdir("images/", function (err, files) {
    //     if (err) {
    //       console.error("Could not list the directory.", err);
    //       process.exit(1);
    //     }
    //
    //     files.forEach(function (file, index) {
    //         console.log(file);
    //         images.push(PIXI.Texture.from(file));
    //     });
    // });

    // const databaseRequest = new XMLHttpRequest();
    // databaseRequest.onload = processImages();
    // databaseRequest.open("get", "/getImages");
    // databaseRequest.withCredentials = true;
    // databaseRequest.send();
}


function placeSprites(){
    for (let i = 0; i < starAmount; i++) {
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
}

function randomSprite(){
    let rand = Math.floor(Math.random() * 12);
    if(rand === 10){
        return new PIXI.Sprite(starTexture);
    }else{
        return new PIXI.Sprite(planetTexture);
    }
}

function randomizeStar(star, initial) {
    star.z = initial ? Math.random() * 2000 : cameraZ + Math.random() * 1000 + 2000;

    // Calculate star positions with radial random coordinate so no star hits the camera.
    const deg = Math.random() * Math.PI * 2;
    const distance = Math.random() * 50 + 1;
    star.x = Math.cos(deg) * distance;
    star.y = Math.sin(deg) * distance;
}

function listen(){
// Listen for animate update
app.ticker.add((delta) => {
    // Simple easing. Should be changed to proper easing function when used for real.
    speed += (warpSpeed - speed) / 20;
    cameraZ += delta * 10 * (speed + baseSpeed);
    for (let i = 0; i < starAmount; i++) {
        const star = stars[i];
        if (star.z < cameraZ) randomizeStar(star);

        // Map star 3d position to 2d with really simple projection
        const z = star.z - cameraZ;
        star.sprite.x = star.x * (fov / z) * app.renderer.screen.width + app.renderer.screen.width / 2;
        star.sprite.y = star.y * (fov / z) * app.renderer.screen.width + app.renderer.screen.height / 2;

        // Calculate star scale & rotation.
        const dxCenter = star.sprite.x - app.renderer.screen.width / 2;
        const dyCenter = star.sprite.y - app.renderer.screen.height / 2;
        const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter + dyCenter);
        const distanceScale = Math.max(0, (2000 - z) / 2000);
        star.sprite.scale.x = distanceScale * starBaseSize;
        // Star is looking towards center so that y axis is towards center.
        // Scale the star depending on how fast we are moving, what the stretchfactor is and depending on how far away it is from the center.
        star.sprite.scale.y = distanceScale * starBaseSize + distanceScale * speed * starStretch * distanceCenter / app.renderer.screen.width;
        star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
    }
});
}
