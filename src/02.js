//场景
var scene = new THREE.Scene()

// var box = new THREE.BoxGeometry(100, 100, 100)
// var material = new THREE.MeshLambertMaterial({
//     color: 0x00ffff
// })
// var mesh = new THREE.Mesh(box, material)
// scene.add(mesh)

// var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
// 遍历几何体的face属性
// geometry.faces.forEach(face => {
//     // 设置三角面face三个顶点的颜色
//     face.vertexColors = [
//         new THREE.Color(0xffff00),
//         new THREE.Color(0xff00ff),
//         new THREE.Color(0x00ffff),
//     ]
// });
// var material = new THREE.MeshBasicMaterial({
//     // color: 0x0000ff,
//     vertexColors: THREE.FaceColors,
//     // wireframe:true,//线框模式渲染
// }); //材质对象Material
// pop()：删除数组的最后一个元素   shift：删除数组的第一个元素
// geometry.faces.pop();
// geometry.faces.pop();
// geometry.faces.shift();
// geometry.faces.shift();
// var material = new THREE.MeshLambertMaterial({
//   color: 0x0000ff,
//   side: THREE.DoubleSide, //两面可见
// }); //材质对象Material
// var mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

// var geometry = new THREE.BufferGeometry()//创建一个Buffer类型几何体对象
// //类型数组创建顶点数据
// var vertices = new Float32Array([
//     0, 0, 0, //顶点1坐标
//     50, 0, 0, //顶点2坐标
//     0, 100, 0, //顶点3坐标

//     0, 0, 0, //顶点4坐标
//     0, 0, 100, //顶点5坐标
//     50, 0, 0, //顶点6坐标

//     0, 0, 0,
//     0, 100, 0,
//     0, 0, 100,
// ]);
// // 创建属性缓冲区对象
// var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
// // 设置几何体attributes属性的位置属性
// geometry.attributes.position = attribue;
// // 设置几何体attributes属性的位置normal属性
// var normals = new Float32Array([
//     0, 0, 1,
//     0, 0, 1,
//     0, 0, 1,

//     0, 1, 0,
//     0, 1, 0,
//     0, 1, 0,

//     1, 0, 0,
//     1, 0, 0,
//     1, 0, 0,

// ])
// geometry.attributes.normal = new THREE.BufferAttribute(normals, 3); //3个为一组,表示一个顶点的法向量数据
// // 三角面(网格)渲染模式
// var material = new THREE.MeshLambertMaterial({
//     color: 0x0000ff, //三角面颜色
//     side: THREE.DoubleSide //两面可见
// }); //材质对象
// var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
// scene.add(mesh)

var axisHelper = new THREE.AxisHelper(2000)
scene.add(axisHelper)

var point = new THREE.PointLight(0xffffff)
point.position.set(200, 400, 400)
scene.add(point)

var ambient = new THREE.AmbientLight(0x444444)
scene.add(ambient)

//相机
var width = document.documentElement.clientWidth; //窗口宽度
var height = document.documentElement.clientHeight - 4; //窗口高度
var k = width / height
var s = 600
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 2000)
camera.position.set(300, 300, 300)
camera.lookAt(scene.position)

//渲染器
var renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height);//设置渲染区域尺寸
renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
document.body.appendChild(renderer.domElement)
let a = 0
function render() {
    renderer.render(scene, camera)
}

var group = new THREE.Group();
var box = new THREE.BoxGeometry(100, 100, 100)
var material = new THREE.MeshLambertMaterial({
    color: 0x00ffff
})
function render2() {
    var mesh = new THREE.Mesh(box, material)
    a < 5 && mesh.translateY(a * 100) || a < 10 && mesh.translateZ(a * 100 - 400) || a < 15 && mesh.translateX(a * 100 - 900) || group.rotateY(Math.PI / 4)
    a++
    group.add(mesh)
    scene.add(group)
    renderer.render(scene, camera)
}
render()
var control = new THREE.OrbitControls(camera, renderer.domElement)
control.addEventListener('change', render)
window.addEventListener('click', render2)