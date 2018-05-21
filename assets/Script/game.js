cc.Class({
    extends: cc.Component,

    properties: {
        prefabArr : {
            default : [],
            type    : [cc.Prefab],
        },
        prefabHeight : 20,
        backPrefab  : {
            default : null,
            type    : cc.Prefab,
        },
    },
    
    // use this for initialization
    onLoad: function () {
        this.nodeWidth = this.node.width;
        this.nodeHeight = this.node.height;
        this.backGround = null;
        //预制体的下落速度
        this.speed = 480;
        //这个预制体是否可以改变状态比如旋转，移动
        this.IsChange = true;
        //存放每次生成的预制体数组
        this.nodeArr =this.createShape(this.node,-this.prefabHeight,this.nodeHeight/2 - this.prefabHeight);

    },
    //初始化游戏场景主背景20行10列
    createBack : function(){
        //初始化y坐标
        var y = this.nodeHeight/2 - this.prefabHeight;
        //初始化x坐标
        var x = this.nodeHeight/2 - this.prefabHeight;
        var backGroundArr = [];
        for(var i = 0;i < 20; i++){
            var outArr = backGround[i];
            for(var j = 0; j < 10;j++){
                //y坐标不变，x坐标要变
                    this.setPrefabPosition(this.backPrefab,(x + j * this.prefabHeight),y,this.node);
            }
        }
    },
    setPrefabPosition : function(prefab,x,y,parentNode){
           var prefab = this.createPrefab(prefab);
           prefab.setPosition(x,y);
           parentNode.addChild(prefab);
    },
    createPrefab : function(prefab){
        var prefabNode = cc.instantiate(prefab);
        return prefabNode;
    },
    createShape : function(parentNode,x,y){
        //用来存放预制体的数组
        var prefabArrTemp = [];
        for(var i = 0;i < 3;i++){
            var offSet = i * this.prefabHeight * 2;
            cc.log("offSet is " + offSet);
            //产生0-3的随机数
            var index = Math.floor(Math.random()*3);
            cc.log("inde is " + index);
            //将对应的预制体取出来转化为节点
            var prefabNode = this.createPrefab(this.prefabArr[i]);
            cc.log("x is " + x + " and y is "+ y - offSet);
            prefabNode.setPosition(x,y - offSet);
            //将该预制节点添加为parentNode的孩子
            parentNode.addChild(prefabNode);
            //将当前预制体节点存放到预制体临时数组里面
            prefabArrTemp.push(prefabNode);

        }
        console.log(prefabArrTemp);
        return prefabArrTemp;
    },
    // called every frame
    update: function (dt) {
        //如果当前状态是处于可以改变状态
        if(this.IsChange){
            this.updatePrefatY(dt);
        }
    },
    updatePrefatY : function(dt){
        for(var i = 0; i < this.nodeArr.length;i++){
            this.nodeArr[i].y -= this.speed * dt;
            //
            if(i === 2){
                console.log(-this.nodeHeight/2 + this.prefabHeight);
                this.nodeArr[i].y <= -this.nodeHeight/2 + this.prefabHeight;
                //这个预制体已经触底了将这个预制体修改为不可改变状态
                this.scheduleOnce(function(){
                    //修改可改变状态
                    this.IsChange = false;
                },1);
                
            }
        }
    },
    showNext : function(){
        var prefabNext = this.createPrefab();
    },
    //创建游戏场景主背景20行10列
    // createBackOfGame : function(){
    //     for(var i = 0;i < 20;i++){
    //         for(var j = 0;j < 10;j++){
    //             var backPrefabNode = this.createPrefab(this.backPrefab);
    //             backPrefabNode.setPosition();
    //             this.node.addChild(backPrefabNode);
    //         }
    //     }
    // }
});
