import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [UserService]
})
export class MapComponent implements OnInit {
  canvas = null;//: HTMLCanvasElement= null;
  // canvasSide: = 800
  ctx: CanvasRenderingContext2D = null;
  gridWidth:number = 36;
  gridHeight:number = 24;
  canvasWidth:number = 900;
  canvasHeight:number = 600;
  tileHeight: number = this.canvasHeight/this.gridHeight;
  tileWidth: number = this.canvasWidth/this.gridWidth;
  grid: Array<Array<any>> = [];
  renderInterval:number = null;
  drawing:boolean = false;
  terrain:object = {
    hexcode:"rgba(100, 100, 100 , 0.5)",
    name:"blank tile",
    public: true,
    user:"admin"
  };// = {"#000"};
  info:string = null;

  terrainArray:FirebaseListObservable<any[]>;

  constructor(private UserService: UserService) { }

  fill(){

    for(var x = 0; x < this.gridWidth; x ++){
      this.grid.push([]);
      for(var y = 0; y < this.gridHeight; y++){

        this.grid[x].push({
          color:"rgba(200, 200, 200 , 0.5)",
          height: this.tileHeight,
          width: this.tileWidth,
          x: x*this.tileWidth,
          y: y*this.tileHeight,
          stroke:"rgba(100, 100, 100,0.5)",
          terrain:this.terrain,
          room: null
        });

      }//end y loop
    }//end x loop
  }//end fill

  ngOnInit() {
    this.terrainArray = this.UserService.getTerrain();
    this.canvas = document.getElementById("map");
    this.ctx = this.canvas.getContext("2d");

    this.fill();
    this.start();
  }

  draw(tile){
    this.ctx.fillStyle = tile.terrain.hexcode;
    // this.ctx.strokeStyle = "white";
    this.ctx.strokeStyle = tile.stroke;
    this.ctx.lineWidth = 1;
    this.ctx.fillRect(tile.x, tile.y, tile.width, tile.height);
    this.ctx.strokeRect(tile.x, tile.y, tile.width, tile.height);
    // this.ctx.stroke();
    // this.ctx.closePath();
    // this.ctx.
  }

  start(){
    this.renderInterval = setInterval(fat=>{
      this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight);
      for(var x = 0; x < this.gridWidth; x ++){

        for(var y = 0; y < this.gridHeight; y++){
          this.draw(this.grid[x][y])
        }//end y loop
      }//end x loop
    },20);
  }

  drawTile(eData) {
    if(this.drawing){
      var mapCanvas = this.canvas.getBoundingClientRect();
      var mouseX = eData.clientX - mapCanvas.left;
      var mouseY = eData.clientY - mapCanvas.top;
      mouseX = Math.floor(mouseX/this.tileWidth);//changed this.gridWidth to this.tileWidth
      mouseY = Math.floor(mouseY/this.tileHeight);
      this.grid[mouseX][mouseY].terrain = this.terrain;
    }
  }
  showInfo(eData) {
    if(!this.drawing){
      var mapCanvas = this.canvas.getBoundingClientRect();
      var mouseX = eData.clientX - mapCanvas.left;
      var mouseY = eData.clientY - mapCanvas.top;
      mouseX = Math.floor(mouseX/this.tileWidth);//changed this.gridWidth to this.tileWidth
      mouseY = Math.floor(mouseY/this.tileHeight);
      this.info = this.grid[mouseX][mouseY].terrain.name;
    }
  }

  clearGrid() {
    location.reload();
  }

  isDrawing(bool, e){
    this.drawing = bool;
    if(bool){
      this.drawTile(e);
    }
  }

  colorChange(e) {
    this.terrain = e;
    console.log(e);
  }

}
