import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Tree, Container, Room, BSP } from '../procGenClasses';
import { terrainArray } from '../terrainArray';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [UserService, AuthService]
})
export class MapComponent implements OnInit {
  canvas = null;//: HTMLCanvasElement= null;
  // canvasSide: = 800
  ctx: CanvasRenderingContext2D = null;
  gridSize = 36;
  gridWidth:number = 36;
  gridHeight:number = 36;//was 24
  canvasWidth:number = 900;
  canvasHeight:number = 900;//was 600
  square = 25;
  tileHeight: number = this.canvasHeight/this.gridHeight;
  tileWidth: number = this.canvasWidth/this.gridWidth;
  grid: Array<Array<any>> = [];
  renderInterval:number = null;
  drawing:boolean = false;
  monster = {name:"none"};
  treasure = {name:"none"};

  tempImage = new Image(16,16);
  info:string = "Initial Value";
  editType = "terrain";

  tempArray = terrainArray;
  myTerrain = JSON.parse(JSON.stringify(terrainArray)).map(terrain=>{
    //kinda really actually a hack
    let tmpImage = new Image(16,16);
    tmpImage.src=terrain.img;
    terrain.img = tmpImage;
    return terrain;
  });
  terrain = this.myTerrain[0];// = {"#000"};



  currentRoute = this.route.url;

  constructor(private UserService: UserService, private authService: AuthService, private route: Router) { }

  fill(){
    this.grid=[];
    for(var x = 0; x < this.gridWidth; x ++){
      this.grid.push([]);
      for(var y = 0; y < this.gridHeight; y++){

        this.grid[x].push({
          color: "rgba(200, 200, 200 , 0.5)",
          height: this.tileHeight,
          width: this.tileWidth,
          x: x*this.tileWidth,
          y: y*this.tileHeight,
          stroke:"rgba(100, 100, 100,0.5)",
          terrain:this.terrain,
          monster: false,
          treasure: false,
          room: null
        });

      }//end y loop
    }//end x loop

  }//end fill


  mainContainer;
  container_tree;
  nIterations = 4;//2
  BSP = new BSP;
  rooms = [];

  myMonsters: any;//:FirebaseListObservable<any[]>;
  myTreasure:any;

  mToken = null;
  tToken = null;

  loggedInUser;
  terrainImgArray = [];
  ngOnInit() {

    // this.tempImage = document.getElementById("blankTile");


    // let tmpArray = [];
    // this.myTerrain.forEach(function(terrain){
    //   let newImage = new Image(16,16);
    //   newImage.src = terrain.img;
    //   tmpArray.push([terrain.name, newImage]);
    // });
    // this.terrainImgArray = tmpArray;


    this.tempImage.src = '../../assets/tiles/blank.png';
    this.terrain = {
      img: this.tempImage,
      hexcode: "rgba(100, 100, 100 , 0)",
      name:"blank tile",
      public: true,
      monster:this.monster,
      treasure: this.treasure,
      user:"admin"
    };// = {"#000"};
    console.log(this.myTerrain);
    this.authService.af.auth.subscribe(
      (auth) => {
        if (auth) {
          this.UserService.getUserByEmail(auth.google.email).subscribe(res => {
            this.loggedInUser = res[0];
            this.myMonsters = this.loggedInUser.monsters;
            this.myTreasure = this.loggedInUser.treasure;
            if(this.currentRoute.indexOf("/map/") >= 0){
              //get map from service
              var map = this.loggedInUser.maps[this.route.url.substring(this.route.url.lastIndexOf("/")+1)]
              this.grid = map.grid;
              this.rooms = map.rooms;
              console.log(map);
              //this.name = map.name
              // this.start();
              // for (var i = 0; i < this.rooms.length; i++) {
              //   this.rooms[i].paint(this.ctx, {
              //     hexcode: "rgba(10, 10, 10 , 1)",
              //     name:"blank tile",
              //     public: true,
              //     user:"admin"
              //   });
              // }
            }
          });
        }
    });

    // this.myMonsters = this.UserService.findUserMonsters();
    this.mToken = document.getElementById("mToken");
    this.tToken = document.getElementById("tToken");

    // this.terrainArray = this.UserService.getTerrain();
    this.canvas = document.getElementById("map");
    this.ctx = this.canvas.getContext("2d");

    this.mainContainer = new Container(0,0,this.canvasWidth, this.canvasHeight);

    this.container_tree = this.BSP.split_container(this.mainContainer, this.nIterations, true, .45,.45);//last 3 arguements are DISCARD_BY_RATIO, W_RATIO, H_RATIO... will be set with variables when map is resized to final version

    if(this.currentRoute === "/createmap"){
      this.fill();
      this.start();

      setTimeout(fat=>{
        // this.ctx.fillStyle = "#000000";
        // this.ctx.fillRect(0,0,this.canvasWidth, this.canvasHeight);

        // this.container_tree.paint(this.ctx, terrain);
        var leaves = this.container_tree.getLeaves();
        console.log(leaves);

        for (var i = 0; i < leaves.length; i++) {
          this.rooms.push(new Room(leaves[i]));
        }
        for (var i = 0; i < this.rooms.length; i++) {
          this.rooms[i].paint(this.ctx, {
            hexcode: "rgba(10, 10, 10 , 1)",
            name:"blank tile",
            public: true,
            user:"admin"
          });
        }

      },10)

    }


  }

  setEditType(type:string){
    this.editType = type.toString();
    console.log(this.editType)
    console.log(this.myMonsters);

  }

  draw(tile){
    // console.log(tile.terrain.img);

    this.ctx.fillStyle = tile.terrain.hexcode;
    // this.ctx.fillStyle = "#"+((1<<24)*Math.random()|0).toString(16);
    this.ctx.strokeStyle = tile.stroke;
    this.ctx.lineWidth = 1;
    this.ctx.drawImage(tile.terrain.img,tile.x, tile.y, tile.width, tile.height);

    this.ctx.strokeRect(tile.x, tile.y, tile.width, tile.height);
    // this.ctx.stroke();
    // this.ctx.closePath();
    // this.ctx.
    if(tile.monster){
      this.ctx.drawImage(this.mToken, tile.x, tile.y, tile.width, tile.height);
    } else if(tile.treasure){
      this.ctx.drawImage(this.tToken, tile.x, tile.y, tile.width, tile.height);

    }



  }

  start(){
    this.renderInterval = setInterval(fat=>{
      // this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight);
      for(var x = 0; x < this.gridWidth; x ++){

        for(var y = 0; y < this.gridHeight; y++){
          this.draw(this.grid[x][y])
        }//end y loop
      }//end x loop
      for (var i = 0; i < this.rooms.length; i++) {
        this.rooms[i].paint(this.ctx, {
          hexcode: "rgba(10, 10, 10 , 0.5)",
          name:"blank tile",
          public: true,
          user:"admin"
        });
      }



    },20);

  }

  drawTile(eData) {
    if(this.drawing){
      var mapCanvas = this.canvas.getBoundingClientRect();
      var mouseX = eData.clientX - mapCanvas.left;
      var mouseY = eData.clientY - mapCanvas.top;
      mouseX = Math.floor(mouseX/this.tileWidth);//changed this.gridWidth to this.tileWidth
      mouseY = Math.floor(mouseY/this.tileHeight);

      if(this.editType === "terrain"){
        this.grid[mouseX][mouseY].terrain = this.terrain;
        console.log("draw terrain");
      } else if(this.editType === "monster"){
        console.log("draw monster");
        console.log(this.monster);
        this.grid[mouseX][mouseY].monster = this.monster;
      } else if(this.editType === "treasure"){
        console.log("draw treasure")
        this.grid[mouseX][mouseY].treasure = this.treasure;
      }
    }
  }
  showInfo(eData) {
    if(!this.drawing){
      var mapCanvas = this.canvas.getBoundingClientRect();
      var mouseX = eData.clientX - mapCanvas.left;
      var mouseY = eData.clientY - mapCanvas.top;
      mouseX = Math.floor(mouseX/this.tileWidth);//changed this.gridWidth to this.tileWidth
      mouseY = Math.floor(mouseY/this.tileHeight);
      if(mouseY < 0){
        mouseY = 0;
      }
      if(mouseX<0){
        mouseX = 0;
      }
      this.info = this.grid[mouseX][mouseY].terrain.name + ", "+ this.grid[mouseX][mouseY].monster.name +", "+ this.grid[mouseX][mouseY].treasure.name;
      console.log(this.grid[mouseX][mouseY]);
    }
  }

  newMap() {
    this.rooms= [];
    this.terrain = {
      hexcode: "rgba(100, 100, 100 , 0)",
      name:"blank tile",
      public: true,
      monster:this.monster,
      treasure: this.treasure,
      user:"admin"
    };
    this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight);

    this.ngOnInit();
  }

  isDrawing(bool, e){
    this.drawing = bool;
    if(bool){
      this.drawTile(e);
    }
  }
  monsterChange(e){
    this.monster = e;
  }
  treasureChange(e){
    this.treasure = e;
  }
  colorChange(e) {
    this.terrain = e;
    console.log(e);
  }

  saveMap(name){
    let savedMap = [];
    let x = 0;
    let y = 0;
    this.grid.forEach(row=>{
      savedMap.push([]);
      row.forEach(tile=>{
        let path = "../../assets/tiles/" + tile.terrain.img.src.substring(tile.terrain.img.src.lastIndexOf("/")+1);
        let savedTile = JSON.parse(JSON.stringify(tile));
        savedTile.terrain.img = path;
        console.log(savedTile);
        // tile.terrain.img = tile.terrain.img.src;
        //JSON.parse(JSON.stringify(object));
        savedMap[x].push(savedTile);

        y++;
      });
      x++;
    });
    console.log(savedMap);
    this.UserService.saveMap(name, this.rooms, savedMap);

  }

}
