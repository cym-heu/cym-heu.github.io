
// 算法相关变量
var dis = new Array(10000);  // 到终点的最短距离
for (let i = 0; i < 10000; i++) {
  dis[i] = 111111;
}
var count = 0; // 路径数
var routes = []; // 存放1-k所有路径
var routesSize = []; 
var Ans = []; // 存放最终路径

/* 
使用邻接表存储图
*/

/* 
使用链式向前星法存图
每次更新节点要更新数组信息
*/

// 双向队列
class Deque {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {}
  }
  addFront(element) {
    if (this.isEmpty()) {
      this.addBack(element)
    } else if (this.lowestCount > 0) {
      this.lowestCount--
      this.items[this.lowestCount] = element
    } else {
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1]
      }
      this.count++
      this.items[0] = element
    }
  }
  addBack(element) {
    this.items[this.count] = element
    this.count++
  }
  removeFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  removeBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  peekFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }

  peekBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }

  isEmpty() {
    return this.size() === 0;
  }

  clear() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  size() {
    return this.count - this.lowestCount;
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }
    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
}

//构造小顶堆
class MinHeap {
  constructor() {
    this.heap = []
  }
  getParentIndex(index) {
    return (index - 1) >> 1
  }
  getLeftIndex(index) {
    return index * 2 + 1
  }
  getRightIndex(index) {
    return index * 2 + 2
  }
  swap(index1, index2) {
    const tmp = this.heap[index1]
    this.heap[index1] = this.heap[index2]
    this.heap[index2] = tmp
  }
  shiftUp(index) {
    if (index === 0) return
    const parentIndex = this.getParentIndex(index)
    if (this.heap[index].val < this.heap[parentIndex].val) {
      this.swap(index, parentIndex)
      this.shiftUp(parentIndex)
    }
  }
  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index)
    const rightIndex = this.getRightIndex(index)
    let minIndex
    if (this.heap[leftIndex]) minIndex = this.heap[index].val > this.heap[leftIndex].val ? leftIndex : index
    if (this.heap[rightIndex]) minIndex = this.heap[minIndex].val > this.heap[rightIndex].val ? rightIndex : minIndex
    if (!minIndex) return
    if (index !== minIndex) {
      this.swap(index, minIndex)
      this.shiftDown(minIndex)
    }
  }
  insert(val) {
    this.heap.push(val)
    this.shiftUp(this.heap.length - 1)
  }
  pop() {
    const res = this.heap[0]
    if (this.heap.length === 1) {
      this.heap.pop()
      return res
    }
    this.heap[0] = this.heap.pop()
    this.shiftDown(0)
    return res
  }
  size() {
    return this.heap.length
  }
  top() {
    return this.heap[0]
  }
  empty() {
    return this.size() === 0
  }
}

// 求反图--得到所有点到终点的距离
let to = new Array();     // *
let val = new Array();    // *
let head = new Array();   // *
let nxt = new Array();    // *
let vis = new Array();    
let cnt = 0;              // *

function addEdge(u, v, w) {
  cnt++;        // 边所在的位置
  to[cnt] = v;  // target
  val[cnt] = w; // 权值
  // 链式向前星法是把新来的节点与head直接相连
  nxt[cnt] = head[u]; // 与head相连
  head[u] = cnt;  // 更新head  
}

// 使用Spfa+slf求到s所有点的最短距离
function Spfa(s, t) {
  for (let i = 0; i < 10000; i++) {
    dis[i] = 111111;
  }
  dis[s] = 0;
  let q = new Deque();
  q.addBack(s);
  vis[s] = true;
  while (!q.isEmpty()) {
    let u = q.peekFront();
    q.removeFront();
    vis[u] = false;
    for (let i = head[u]; i; i = nxt[i]) {
      let v = to[i];
      if (dis[v] > dis[u] + val[i]) {
        dis[v] = dis[u] + val[i];
        if (!vis[v]) {
          vis[v] = true;
          // if (!q.isEmpty() && dis[v] < dis[q.peekFront()]) {
          //   q.addfront(v);
          // } else {
          //   q.addBack(v);
          // }
          q.addFront(v)
        }
      }
    }
  }
}

// 原图
let _to = [0];
let _val = [0];
let _head = [0];
let _nxt = [0];
let _vis = [0];
let _cnt = 0;

function _addEdge(u, v, w) {
  _cnt++;        // 边所在的位置
  _to[_cnt] = v;  // target
  _val[_cnt] = w; // 权值
  // 链式向前星法是把新来的节点与head直接相连
  _nxt[_cnt] = _head[u]; // 与head相连
  _head[u] = _cnt;  // 更新head  
}

let data = {
  now: null, // 当前位置
  pas: null, // 走过的距离
  val: null, // 总距离
  route: [], // 走的步骤
}

function Astar(s, t, k) {
  let q = new MinHeap();
  data.now = s;
  data.pas = 0;
  data.val = dis[s];
  data.route = [s];
  q.insert({
    now: s,
    pas: 0,
    val: dis[s],
    route: [s]
  });
  let vec = [];
  while (!q.empty()) { 
    let u = q.top();
    console.log(u)
    q.pop();
    if (u.now === t) {
      count++;
      if(count <= k) { 
        routesSize.push(u.val);
        routes.push(u.route);
      }
      if (count == k) {
        // console.log(u.route);
        Ans = u.route;
        return;
      }
    }
    for (let i = _head[u.now]; i; i = _nxt[i]) {
      let v = _to[i];
      vec = u.route;
      let visit = false;
      console.log(vec)
      for (let j = 0, sz = vec.length; j < sz; j++) { // 记录是否重复经过
        if (vec[j] === v) {
          visit = true;
          break;
        }
      }
      if (visit) continue;
      let tempRoute = [];
      for(let i=0; i<u.route.length; i++){
        tempRoute.push(u.route[i])
      }
      tempRoute.push(v);
      console.log(v)

      q.insert({
        now: v,
        pas: u.pas + _val[i],
        val: dis[v] + u.pas + _val[i],
        route: tempRoute,
      });
      // routesSize[count] += nx.val; 
    }
  }
}



// 打印文字
function showText() {
  // 将下面文字打印
  let TXT = "";
  for(let i=0; i<routes.length; i++) {
    let tempText = routes[i][0];
    for(let j=1; j<routes[i].length; j++) {
      tempText += " -> "+routes[i][j] 
    }
    tempText += "\n";
    let num = i+1;
    tempText = "路径" + num + ": " + tempText;
    tempText = "<div>" + tempText + "</div>";
    TXT += tempText;
  }
  document.getElementById("myText").innerHTML = TXT;
}

