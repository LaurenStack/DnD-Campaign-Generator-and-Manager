import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  canvas = null;//: HTMLCanvasElement= null;
  ctx: CanvasRenderingContext2D = null;
  canvasWidth:number = 500;
  canvasHeight:number = 500;
  gridSize:number = 30;
  tileHeight: number = this.canvasHeight/this.gridSize;
  tileWidth: number = this.canvasWidth/this.gridSize;
  grid: Array<Array<any>> = [];
  renderInterval:number = null;
  drawing:boolean = false;
  color:string = "#000";

  constructor() { }

  fill(size){

    for(var x = 0; x < size; x ++){
      this.grid.push([]);
      for(var y = 0; y < size; y++){

        this.grid[x].push({
          color:"rgba(200, 200, 200 , 0.5)",
          height: this.tileHeight,
          width: this.tileWidth,
          x: x*this.tileWidth,
          y: y*this.tileHeight,
          stroke:"rgba(100, 100, 100,0.5)"
        });

      }//end y loop
    }//end x loop
  }//end fill

  ngOnInit() {
    this.canvas = document.getElementById("map");
    this.ctx = this.canvas.getContext("2d");

    this.fill(this.gridSize);
    this.start();
  }

  draw(tile){
    this.ctx.fillStyle = tile.color;
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
      for(var x = 0; x < this.gridSize; x ++){

        for(var y = 0; y < this.gridSize; y++){
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
      mouseX = Math.floor(mouseX/this.tileWidth);//changed this.gridSize to this.tileWidth
      mouseY = Math.floor(mouseY/this.tileHeight);
      this.grid[mouseX][mouseY].color = this.color;
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
    this.color = e;
    console.log(e);
  }

}
