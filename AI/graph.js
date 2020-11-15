
const graph = new G6.Graph({
    container: 'mountNode', // 指定图画布的容器 id，与第 9 行的容器对应
    // 画布宽高
    width: 1300,
    height: 690,
    modes: {
        default: [
            {
                type: 'drag-node',
                enableDelegate: false,
                draggable: true
            }
        ],
    },
    nodeStateStyles: {
        // 鼠标点击节点，即 click 状态为 true 时的样式
        selected: {
            stroke: 'blue',
            lineWidth: 3
        },
        highLight: {
            stroke: 'green',
            lineWidth: 3
        }
    },
    // 节点不同状态下的样式集合
    edgeStateStyles: {
        // 鼠标点击边，即 click 状态为 true 时的样式
        click: {
            stroke: 'steelblue'
        }
    },

});

// // 渲染图
// graph.render();

// 屏蔽浏览器右键菜单
function doNothing() {
    window.event.returnValue = false;
    return false;
}

//生成时间数字
function getTime() {
    var d = new Date();
    var n = d.getTime();
    return n;
}

// 将数据显示到弹窗
function show() {
    app.begin = begin._cfg.id;
    app.end = end._cfg.id;
}

// 生成0-100的随机数
function myRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}
/*
  画布监听事件
*/

// 绘制节点和边
graph.on("canvas:click", ev => {
    //点击鼠标右键，不再添加节点
    document.onmousedown = function (event) {
        var event = event || window.event
        if (event.button == "2") {
            console.log("正在点击鼠标右键")
            window.event.returnValue = false;
            ifElement = false;
            ifEdge = false;
            ifSpfa = false;
            // 如果完成A*算法之后点击右键，A*算法的操作被重置
            // 即原来高亮的节点取消高亮
            // vis _vis 清空
            // cnt _cnt 清零
            // count 归零
            // routes routesSize 清空
            // Ans 清空
            if (completeAstar) {
                // 取消画布上数据的高亮
                let nodes  = graph.getNodes();
                nodes.forEach( cn => {
                    graph.setItemState(cn, 'highLight', false)
                })
                vis = [];
                _vis = [];
                cnt = 0;
                _cnt = 0;
                count = 0; // 路径数
                routes = []; // 存放1-k所有路径
                routesSize = [];
                Ans = []; // 存放最终路径

                // 最后将compeleteAstar设为false
                compeleteAstar = false;
            }
        };
    }
    // 将所有选中节点设为未选中
    let nodes = graph.getNodes();
    nodes.forEach(el => {
        graph.setItemState(el, 'selected', false);
    });
    // 绘制节点
    if (ifElement) {
        const data = {
            id: ++k,
            label: k,
            size: [60, 60],
            x: ev.x,
            y: ev.y,
            type: 'circle',
        };
        graph.addItem('node', data);
    }

})

graph.on("node:click", ev => {
    const node = ev.item;
    // 绘制边
    if (ifEdge) {
        /*
        绘制完成后会有提示框输入节点的值
        */
        if (source == null) {
            source = node;
        }
        else if (source == node) {

        }
        else {
            target = node;
            app.ValueDialog = true;
        }
    }
})

graph.on("node:dblclick", ev => {
    console.log("节点正在被双击")
    tempNode = ev.item;
    const node = ev.item;
    console.log(node);
    app.node.id = node._cfg.id;
    app.node.name = node._cfg.model.label;
    app.elementDialog = true;
})

// 选择算法的起始位置和终止位置
graph.on("node:click", ev => {
    const node = ev.item;
    console.log(ifSpfa);
    if (ifSpfa) {
        if (begin == null) {
            graph.setItemState(node, 'selected', true);
            begin = node;
        }
        else if (begin == node) {

        }
        else {
            end = node;
            graph.setItemState(node, 'selected', true);
            show();
            app.SpfaDialog = true;

        }
    }
})