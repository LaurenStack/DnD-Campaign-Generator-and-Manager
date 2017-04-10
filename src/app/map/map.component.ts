import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  canvas = null;
  ctx = null;
  canvasWidth = 500;
  canvasHeight = 500;
  gridSize = 30;
  grid  = [];
  renderInterval = null;

  constructor() { }

  fill(size){

    for(var x = 0; x < size; x ++){
      this.grid.push([]);
      for(var y = 0; y < size; y++){
        var height = this.canvasHeight/size;
        var width = this.canvasWidth/size;

        this.grid[x].push({
          color:"rgba(80, 80, 80 , 0.5)",
          height: height,
          width: width,
          x: x*width,
          y: y*height,
          stroke:"#fff"
        });

      }//end y loop
    }//end x loop
  }//end fill

  ngOnInit() {
    this.canvas = document.getElementById("map");;
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

}
