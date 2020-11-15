
function saveDatas() {
    var allDatas = {
        "fileName": "json" + getTime(),
        "nodes": {
            "x": [],
            "y": [],
            "id": [],
            "label": [],
        },
        "edges": {
            "id": [],
            "label": [],
            "source": [],
            "target": [],
        },
        "cnt": null,
        "to": to,
        "val": val,
        "nxt": nxt,
        "head": head,
        "_cnt": null,
        "_to": _to,
        "_val": _val,
        "_nxt": _nxt,
        "_head": _head,
        "k": k,
    }
    // 生成json
    let nodes = graph.getNodes();
    for (let i = 0; i < nodes.length; i++) {
        let model = nodes[i].getModel();
        allDatas.nodes.x.push(model.x);
        allDatas.nodes.y.push(model.y);
        allDatas.nodes.id.push(model.id);
        allDatas.nodes.label.push(model.label);
    }
    let edges = graph.getEdges();
    console.log(edges)
    if (edges.length != 0) {
        for (let i = 0; i < edges.length; i++) {
            let model = edges[i].getModel();
            allDatas.edges.id.push(model.id);
            allDatas.edges.label.push(model.label);
            allDatas.edges.source.push(model.source);
            allDatas.edges.target.push(model.target);
        }
    }

    let content = JSON.stringify(allDatas);
    let blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "save.json");
}


function openDatas() {
    var inputElement = document.getElementById("files");
    inputElement.addEventListener("change", handleFiles, true);
    function handleFiles() {
        var selectedFile = document.getElementById("files").files[0];//获取读取的File对象
        var name = selectedFile.name;//读取选中文件的文件名
        var size = selectedFile.size;//读取选中文件的大小
        console.log("文件名:" + name + "大小：" + size);
        var reader = new FileReader();//这里是核心！！！读取操作就是由它完成的。
        reader.readAsText(selectedFile);//读取文件的内容

        reader.onload = function () {
            console.log("读取结果：", this.result);//当读取完成之后会回调这个函数，然后此时文件的内容存储到了result中。直接操作即可。
            // 输出结果转为json
            let json = JSON.parse(this.result);
            console.log(json)
            // 绘制图元和线
            for (let i = 0; i < json.nodes.id.length; i++) {
                let temp = json.nodes;
                const data = {
                    id: temp.id[i],
                    x: temp.x[i],
                    y: temp.y[i],
                    label: temp.label[i],
                    size: [60, 60],
                    type: 'circle',
                }
                graph.addItem('node', data);
            }
            for (let i = 0; i < json.edges.id.length; i++) {
                let temp = json.edges;
                console.log(graph.findById(temp.source[i]),)
                const data = {
                    id: temp.id,
                    source: graph.findById(temp.source[i]),
                    target: graph.findById(temp.target[i]),
                    label: temp.label[i],
                    labelCfg: {
                        refX: 10,  // 文本在 x 方向偏移量
                        refY: 10,  // 文本在 y 方向偏移量
                        style: {
                            fill: '#595959'
                        }
                    },
                    shape: 'line',
                    lineType: '10',
                    style: {
                        stroke: "black",
                        lineWidth: 1,
                        endArrow: true,
                    },
                }
                graph.addItem('edge', data);
            }
            // 将自定义图数据导出
            cnt = json.cnt
            to = json.to
            val = json.val
            nxt = json.nxt
            head = json.head
            _cnt = json._cnt
            _to = json._to
            _val = json._val
            _nxt = json._nxt
            _head = json._head
            k = json.k
        };

    }
    document.getElementById("files").click();
}

