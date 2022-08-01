// import * as THREE from '../node_modules/three/three.js';
/**
   * 创建场景对象Scene
   */
var scene = new THREE.Scene();
/**
 * 创建网格模型
 */
// var shape = new THREE.Shape();
// /**四条直线绘制一个矩形轮廓*/
// shape.moveTo(0, 0);//起点
// shape.lineTo(0, 100);//第2点
// shape.lineTo(100, 100);//第3点
// shape.lineTo(100, 0);//第4点
// shape.lineTo(0, 0);//第5点
// var geometry = new THREE.ExtrudeGeometry(//拉伸造型
//     shape,//二维轮廓
//     //拉伸参数
//     {
//         amount: 220,//拉伸长度
//         bevelEnabled: false//无倒角
//     }
// );

var shape = new THREE.Shape();
/**四条直线绘制一个矩形轮廓*/
shape.moveTo(0, 0);//起点
shape.lineTo(0, 10);//第2点
shape.lineTo(10, 10);//第3点
shape.lineTo(10, 0);//第4点
shape.lineTo(0, 0);//第5点
/**创建轮廓的扫描轨迹(3D样条曲线)*/
var curve = new THREE.SplineCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(50, 50, 0),
    new THREE.Vector3(0, 100, 0),
    new THREE.Vector3(50, 130, 0)
]);
var curve2 = new THREE.SplineCurve3([
    new THREE.Vector3(70, 0, 0),
    new THREE.Vector3(70, 140, 0),
    new THREE.Vector3(120, 110, 0),
    new THREE.Vector3(70, 70, 0),
    new THREE.Vector3(120, 40, 0),
    new THREE.Vector3(70, 0, 0),
]);
var geometry = new THREE.ExtrudeGeometry(//拉伸造型
    shape,//二维轮廓
    //拉伸参数
    {
        bevelEnabled: false,//无倒角
        extrudePath: curve,//选择扫描轨迹
        steps: 1000//扫描方向细分数
    }
);
var geometry2 = new THREE.ExtrudeGeometry(//拉伸造型
    shape,//二维轮廓
    //拉伸参数
    {
        bevelEnabled: false,//无倒角
        extrudePath: curve2,//选择扫描轨迹
        steps: 1000//扫描方向细分数
    }
);
var material = new THREE.MeshPhongMaterial({
    color: 0xFF3030,//三角面颜色
    side: THREE.DoubleSide//两面可见
});//材质对象
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);//点模型添加到场景中

var mesh2 = new THREE.Mesh(geometry2, material);
scene.add(mesh2)

// 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
var axisHelper = new THREE.AxisHelper(1000);
scene.add(axisHelper);

/**
 * 光源设置
 */
// //点光源
// var point = new THREE.PointLight(0xffffff);
// point.position.set(800, 800, 800); //点光源位置
// scene.add(point); //点光源添加到场景中

//太阳平行光
var sun = new THREE.DirectionalLight(0xffffff)
scene.add(sun)

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