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

// 球体网格模型创建函数
function sphereMesh(R, x, y, z) {
    var geometry = new THREE.SphereGeometry(R, 25, 25); //球体几何体
    var material = new THREE.MeshPhongMaterial({
        color: 0x0000ff
    }); //材质对象Material
    var mesh = new THREE.Mesh(geometry, material); // 创建网格模型对象
    mesh.position.set(x, y, z);
    return mesh;
}
// 圆柱体网格模型创建函数
function cylinderMesh(R, h, x, y, z) {
    var geometry = new THREE.CylinderGeometry(R, R, h, 25, 25); //球体几何体
    var material = new THREE.MeshPhongMaterial({
        color: 0x0000ff
    }); //材质对象Material
    var mesh = new THREE.Mesh(geometry, material); // 创建网格模型对象
    mesh.position.set(x, y, z);
    return mesh;
}

/**
 * 光源设置
 */
//点光源
var point = new THREE.PointLight(0xffffff);
point.position.set(800, 800, 800); //点光源位置
scene.add(point); //点光源添加到场景中

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
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);//设置渲染区域尺寸
renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
document.body.appendChild(renderer.domElement); //body元素中插入canvas对象

// let T0 = new Date();//上次时间
let a = true
setInterval(() => {
    if (a) {
        let left = scene.getObjectByName('左腿')
        left.position.set(-7, -80, -7)
        let right = scene.getObjectByName('右腿')
        right.position.set(7, -80, 7)
        let leftH = scene.getObjectByName('左手')
        leftH.rotation.z = Math.PI / 8
        let rightH = scene.getObjectByName('右手')
        rightH.rotation.z = -Math.PI / 8
        a = false
    } else {
        let left = scene.getObjectByName('左腿')
        left.position.set(7, -80, -7)
        let right = scene.getObjectByName('右腿')
        right.position.set(-7, -80, 7)
        let leftH = scene.getObjectByName('左手')
        leftH.rotation.z = -Math.PI / 8
        let rightH = scene.getObjectByName('右手')
        rightH.rotation.z = Math.PI / 8
        a = true
    }
    renderer.render(scene, camera);
}, 500)
function render() {
    // let T1 = new Date();//本次时间
    // let t = T1 - T0;//时间差
    // T0 = T1;//把本次时间赋值给上次时间

    //执行渲染操作   指定场景、相机作为参数
    renderer.render(scene, camera);
    // mesh.rotateY(0.01)
    // mesh.rotateX(0.01)
    // requestAnimationFrame(render)
}
render()
var controls = new THREE.OrbitControls(camera, renderer.domElement);//创建控件对象
controls.addEventListener('change', render);//监听鼠标、键盘事件