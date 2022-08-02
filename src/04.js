var scene = new THREE.Scene()

// 头部网格模型和组
var headMesh = sphereMesh(10, 0, 0, 0);
headMesh.name = "脑壳"
var leftEyeMesh = sphereMesh(1, 8, 5, 4);
leftEyeMesh.name = "左眼"
var rightEyeMesh = sphereMesh(1, 8, 5, -4);
rightEyeMesh.name = "右眼"
var headGroup = new THREE.Group();
headGroup.name = "头部"
headGroup.add(headMesh, leftEyeMesh, rightEyeMesh);
// 身体网格模型和组
var neckMesh = cylinderMesh(3, 10, 0, -15, 0);
neckMesh.name = "脖子"
var bodyMesh = cylinderMesh(14, 30, 0, -35, 0);
bodyMesh.name = "腹部"
var leftLegMesh = cylinderMesh(4, 60, 0, -80, -7);
leftLegMesh.name = "左腿"
var rightLegMesh = cylinderMesh(4, 60, 0, -80, 7);
rightLegMesh.name = "右腿"
var legGroup = new THREE.Group();
legGroup.name = "腿"
legGroup.add(leftLegMesh, rightLegMesh);
var leftHandle = cylinderMesh(4, 40, 0, -40, -18);
leftHandle.name = "左手"
var rightHendle = cylinderMesh(4, 40, 0, -40, 18);
rightHendle.name = "右手"
var handGroup = new THREE.Group()
handGroup.name = "手"
handGroup.add(leftHandle, rightHendle)
var bodyGroup = new THREE.Group();
bodyGroup.name = "身体"
bodyGroup.add(neckMesh, bodyMesh, legGroup, handGroup);
// 人Group
var personGroup = new THREE.Group();
personGroup.name = "人"
personGroup.add(headGroup, bodyGroup)
personGroup.translateY(50)
scene.add(personGroup);

var gro = new THREE.PlaneGeometry(1000, 1000)
// 加载树纹理贴图
var texture = new THREE.TextureLoader().load("./c.png");
// 设置阵列
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
// uv两个方向纹理重复数量
texture.repeat.set(20, 20);
var materialPlane = new THREE.MeshPhongMaterial({
    // color: 0xcccccc,
    // side: THREE.DoubleSide,
    map: texture
})
var mesh3 = new THREE.Mesh(gro, materialPlane)
mesh3.rotateX(-Math.PI / 2)
mesh3.position.y = -61
mesh3.receiveShadow = true;
scene.add(mesh3)

// var cubeGeometry = new THREE.CubeGeometry(100, 100, 80);
// var cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x444fff });

// var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// cube.position.x = -300;
// cube.position.y = -60;
// cube.position.z = -30;

// //告诉立方体需要投射阴影
// cube.castShadow = true;

// scene.add(cube);

// 球体网格模型创建函数
function sphereMesh(R, x, y, z) {
    var geometry = new THREE.SphereGeometry(R, 25, 25); //球体几何体
    var material = new THREE.MeshPhongMaterial({
        color: 0xCDBA96
    }); //材质对象Material
    var mesh = new THREE.Mesh(geometry, material); // 创建网格模型对象
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    return mesh;
}
// 圆柱体网格模型创建函数
function cylinderMesh(R, h, x, y, z) {
    var geometry = new THREE.CylinderGeometry(R, R, h, 25, 25); //球体几何体
    var material = new THREE.MeshPhongMaterial({
        color: 0xCDBA96
    }); //材质对象Material
    var mesh = new THREE.Mesh(geometry, material); // 创建网格模型对象
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    return mesh;
}

/**
 * 精灵创建下雨效果
 */
// 加载雨滴理贴图
var textureTree = new THREE.TextureLoader().load("./rain.png");
var rainGroup = new THREE.Group()
let b = false
setTimeout(() => {
    // 批量创建表示雨滴的精灵模型
    for (let i = 0; i < 400; i++) {
        var spriteMaterial = new THREE.SpriteMaterial({
            map: textureTree,//设置精灵纹理贴图
        });
        // 创建精灵模型对象
        var sprite = new THREE.Sprite(spriteMaterial);
        // 控制精灵大小,
        sprite.scale.set(6, 8, 1); //// 只需要设置x、y两个分量就可以
        var k1 = Math.random() - 0.5;
        var k2 = Math.random() - 0.5;
        var k3 = Math.random() - 0.5;
        // 设置精灵模型位置，在整个空间上上随机分布
        // sprite.position.set(500 * k1, 400 * k3, 500 * k2)
        sprite.position.set(1000 * k1, 300 * Math.random(), 1000 * k2)
        rainGroup.add(sprite);
    }
    scene.add(rainGroup)
    b = true
}, 5000)

/**
 * 精灵创建树林效果
 */
// 加载树纹理贴图
var textureTree2 = new THREE.TextureLoader().load("./tree.png");
// 批量创建表示一个树的精灵模型
for (let i = 0; i < 15; i++) {
  var spriteMaterial = new THREE.SpriteMaterial({
    map:textureTree2,//设置精灵纹理贴图
  });
  // 创建精灵模型对象
  var sprite = new THREE.Sprite(spriteMaterial);
  scene.add(sprite);
  // 控制精灵大小,
  sprite.scale.set(100, 200, 1); //// 只需要设置x、y两个分量就可以
  var k1 = Math.random() - 0.9;
  var k2 = Math.random() - 0.9;
  // 设置精灵模型位置，在xoz平面上随机分布
  sprite.position.set(500 * k1, -0, 500 * k2)
}

/**
 * 光源设置
 */
//点光源
var point = new THREE.PointLight(0xffffff);
point.position.set(100, 200, 200); //点光源位置
point.castShadow = true
// point.intensity=0.4 //修改亮度
scene.add(point); //点光源添加到场景中

//聚光灯
// var spot = new THREE.SpotLight(0xffffff);
// spot.position.set(100, 200, 100)
// spot.castShadow = true;
// scene.add(spot)

// var axisHelper = new THREE.AxisHelper(2000)
// scene.add(axisHelper)

//太阳平行光
// var sun = new THREE.DirectionalLight(0xffffff)
// scene.add(sun)

//环境光
var ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);
// console.log(scene)
// console.log(scene.children)
/**
 * 相机设置
 */
var width = document.documentElement.clientWidth; //窗口宽度
var height = document.documentElement.clientHeight - 4; //窗口高度
var k = width / height; //窗口宽高比
var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
// var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 0.1, 1000);
// camera.position.set(200, 300, 200); //设置相机位置
// camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
/**透视投影相机对象*/
var camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
camera.position.set(192, 109, 168);//设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);//设置渲染区域尺寸
renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap
document.body.appendChild(renderer.domElement); //body元素中插入canvas对象


// let T0 = new Date();//上次时间
// function render() {
//     // let T1 = new Date();//本次时间
//     // let t = T1 - T0;//时间差
//     // T0 = T1;//把本次时间赋值给上次时间

//     //执行渲染操作   指定场景、相机作为参数
//     renderer.render(scene, camera);
//     // mesh.rotateY(0.01)
//     // mesh.rotateX(0.01)
//     // requestAnimationFrame(render)
// }
// render()
// var controls = new THREE.OrbitControls(camera, renderer.domElement);//创建控件对象
// controls.addEventListener('change', render);//监听鼠标、键盘事件

let a = true
function render2() {
    renderer.render(scene, camera);
    texture.offset.x += 0.01;
    if (b) {
        point.intensity = 0.4 //修改亮度
        rainGroup.children.forEach(sprite => {
            // 雨滴的y坐标每次减1
            sprite.position.y -= 2;
            if (sprite.position.y < -60) {
                // 如果雨滴落到地面，重置y，从新下落
                sprite.position.y = 200;
            }
        });
    }
    if (a) {
        leftLegMesh.position.x += 0.1
        rightLegMesh.position.x -= 0.1
        leftHandle.rotation.z -= Math.PI / 560
        rightHendle.rotation.z += Math.PI / 560
        headGroup.rotation.y -= Math.PI / 560
        if (leftLegMesh.position.x >= 7) {
            a = false
        }
    } else {
        leftLegMesh.position.x -= 0.1
        rightLegMesh.position.x += 0.1
        leftHandle.rotation.z += Math.PI / 560
        rightHendle.rotation.z -= Math.PI / 560
        headGroup.rotation.y += Math.PI / 560
        if (leftLegMesh.position.x <= -7) {
            a = true
        }
    }
    requestAnimationFrame(render2)
}
render2()