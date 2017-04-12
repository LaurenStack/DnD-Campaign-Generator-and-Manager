function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

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
    // console.log("painting leaves");
    // this.leaf.paint(ctx);
    // if (this.lchild !== null) {
    //   this.lchild.paint(ctx);
    // }
    // if (this.rchild !== null) {
    //   this.rchild.paint(ctx);
    // }
    //
    // console.log(this.leaf);
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
    // ctx.strokeStyle = "#0F0";
    // ctx.lineWidth = 2;
    // ctx.strokeRect(this.x*25, this.y*25,
    // this.width/**25*/, this.height/**25*/)//25 is SQUARE/**25*/
    // console.log(this);
  }

}

export class BSP {


  split_container(container, iter, DISCARD_BY_RATIO, H_RATIO, W_RATIO){
    var root = new Tree(container);
    // console.log(container);
    // console.log(iter);
    if(iter !== 0){
      var sr = this.random_split(container, DISCARD_BY_RATIO, H_RATIO, W_RATIO);
      root.lchild = this.split_container(sr[0],iter-1,DISCARD_BY_RATIO, H_RATIO, W_RATIO);
      root.rchild = this.split_container(sr[1],iter-1,DISCARD_BY_RATIO, H_RATIO, W_RATIO);
    }
    return root;
  }
  random_split(container, DISCARD_BY_RATIO, H_RATIO, W_RATIO){
    // console.log(container);
    var r1,r2;
    if(random(0,1)===0){//vertical
      r1 = new Container(container.x, container.y, random(1,container.width), container.height);
      r2 = new Container(container.x, container.y, container.width, random(1,container.height));

      if (DISCARD_BY_RATIO) {
            var r1_h_ratio = r1.height / r1.width
            var r2_h_ratio = r2.height / r2.width
            if (r1_h_ratio < H_RATIO || r2_h_ratio < H_RATIO) {
                return this.random_split(container, DISCARD_BY_RATIO, H_RATIO, W_RATIO)
            }
        }

    } else {//horizontal
      r1 = new Container(
            container.x, container.y,             // r1.x, r1.y
            container.width, random(1,container.height));   // r1.w, r1.h

      r2 = new Container(
          container.x, container.y + r1.height,      // r2.x, r2.y
          container.width, container.height - r1.height       // r2.w, r2.h
      )
      if (DISCARD_BY_RATIO) {
            var r1_h_ratio = r1.height / r1.width
            var r2_h_ratio = r2.height / r2.width
            if (r1_h_ratio < H_RATIO || r2_h_ratio < H_RATIO) {
                return this.random_split(container, DISCARD_BY_RATIO, H_RATIO, W_RATIO)
            }
        }
    }
    return [r1,r2];
  }
}

export class Room {
  x;
  y;
  width;
  height;

  constructor(container) {
    let divisor = 3;
    this.x = container.x + random(0, Math.floor(container.width/divisor));
    this.y = container.y + random(0, Math.floor(container.height/divisor));
    this.width = container.width //- (this.x - container.x);
    this.height = container.height //- (this.y - container.y);
    this.width -= random(0, this.width/divisor);
    this.height -= random(0, this.width/divisor);
  }

  paint(ctx, terrain) {
    let multiplier = 3;
    ctx.fillStyle = terrain.hexcode;
    console.log(this)
    ctx.fillRect(this.x * multiplier, this.y *  multiplier, this.width, this.height);
  }
}
