export class Tree {
leaf:any;
lchild:any;
rchild:any;
  constructor ( leafInput ) {
    this.leaf = leafInput;
    this.lchild = null;
    this.rchild = null;
  }

  getLeaves() {
    if ((this.lchild === null) && (this.rchild === null)) {
      return [this.leaf];
    } else {
      return [].concat(this.lchild.getLeaves(), this.rchild.getLeaves());
    }
  }
  getLevel(lvl, queue) {
    if (queue === null) {
      queue = [];
    }
    if (lvl === 1){
      queue.push(this);
    } else {
      if (this.lchild !== null) {
        this.lchild.getLevel(lvl-1, queue);
      }
      if (this.rchild !==null) {
        this.rchild.getLevel(lvl-1, queue);
      }
      return queue;
    }
  }

  paint(ctx) {
    console.log("painting leaves");
    this.leaf.paint(ctx);
    if (this.lchild !== null) {
      this.lchild.paint(ctx);
    }
    if (this.rchild !== null) {
      this.rchild.paint(ctx);
    }
  
    console.log(this.leaf);
  }


}

export class Point {
  x:any;
  y:any;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export class Container {
  x:any;
  y:any;
  width:any;
  height:any;
  center:any;



  constructor(x,y,width,height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.center = new Point((this.x+this.width/2), this.y+(this.height/2))
  }

  paint(ctx){
    ctx.strokeStyle = "#0F0";
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x*25, this.y*25,
    this.width/**25*/, this.height/**25*/)//25 is SQUARE/**25*/
    console.log(this);
  }

}

export class BSP {
  split_container(container, iter){
    var root = new Tree(container);
    // console.log(container);
    // console.log(iter);
    if(iter !== 0){
      var sr = this.random_split(container);
      root.lchild = this.split_container(sr[0],iter-1);
      root.rchild = this.split_container(sr[1],iter-1);
    }
    return root;
  }
  random_split(container){
    // console.log(container);
    var r1,r2;
    if((Math.floor(Math.random()*2)) === 0){//vertical
      r1 = new Container(container.x, container.y, (Math.floor(Math.random()*container.width) + 1), container.height);
      r2 = new Container(container.x, container.y, container.width, (Math.floor(Math.random()*container.height) + 1));

    } else {//horizontal
      r1 = new Container(
            container.x, container.y,             // r1.x, r1.y
            container.width, (Math.floor(Math.random()*container.height) + 1)   // r1.w, r1.h
        )
      r2 = new Container(
          container.x, container.y + r1.height,      // r2.x, r2.y
          container.width, container.height - r1.height       // r2.w, r2.h
      )
    }
    return [r1,r2];
  }
}
