//长方体 参数：长，宽，高
var geometry = new THREE.BoxGeometry(100, 100, 100);
// 球体 参数：半径60  经纬度细分数40,40
var geometry = new THREE.SphereGeometry(60, 40, 40);
// 圆柱  参数：圆柱面顶部、底部直径50,50   高度100  圆周分段数
var geometry = new THREE.CylinderGeometry( 50, 50, 100, 25 );
// 正八面体
var geometry = new THREE.OctahedronGeometry(50);
// 正十二面体
var geometry = new THREE.DodecahedronGeometry(50);
// 正二十面体
var geometry = new THREE.IcosahedronGeometry(50);

// MeshBasicMaterial	基础网格材质，不受光照影响的材质
// MeshLambertMaterial	Lambert网格材质，与光照有反应，漫反射
// MeshPhongMaterial	高光Phong材质,与光照有反应
// MeshStandardMaterial	PBR物理材质，相比较高光Phong材质可以更好的模拟金属、玻璃等效果

// color	材质颜色，比如蓝色0x0000ff
// wireframe	将几何图形渲染为线框。 默认值为false
// opacity	透明度设置，0表示完全透明，1表示完全不透明
// transparent	是否开启透明，默认false

// AmbientLight	环境光
// PointLight	点光源
// DirectionalLight	平行光，比如太阳光
// SpotLight	聚光源