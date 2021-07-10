"use strict";

import Graphics from '../../graphics/index.mjs';
import OpenXum from '../../openxum/gui.mjs';
import Coordinates from "../../../openxum-core/games/splits/coordinates.mjs";
import Color from "../../../openxum-core/games/splits/color.mjs";
import Move from "../../../openxum-core/games/splits/move.mjs";
import MoveType from "../../../openxum-core/games/splits/move_type.mjs";
import Phase from "../../../openxum-core/games/splits/phase.mjs";

class Gui extends OpenXum.Gui {
    constructor(c, e, l, g) {
        super(c, e, l, g);
        this.coordinate_board_souris;
        this._dimension = 0;
        this.player;
        this.margeX;
        this.margeY;
        this.compteur = 0;
        this.orientation = 0;
        this._x = 0;
        this._y = 0;
        this.indice = [];
        this.tableau = this._engine._gameboard.getBoardGraph();
        this._nbTourPlacement = 0;
        this._numberClic = -1;
        this.amountPiece = 0;
        this._moveFrom = new Coordinates(0, 0);
        this._moveTo = new Coordinates(0, 0);
        this.borders;
        this._rule_of_game();
    }
    draw() {
        this._context.strokeStyle = "#000000";
        this._context.fillStyle = "#EEEEEE";
        this.tableau = this._engine._gameboard.getBoardGraph();
        Graphics.board.draw_round_rect(this._context, 0, 0, this._canvas.width, this._canvas.height, 17, true, true);
        this.indice = this._engine._minMax();
        this._context.textAlign = "start";
        this._context.textBaseline = "middle";
        this._context.font = 30+"px Georgia";
        if(this._engine.current_color() !== 0){
            this.player =  "Red";
        }
        else{
            this.player =  "White";
        }
        this._context.fillStyle = "#000000";
        this._context.fillText("Current Player:"+this.player,150,20);
        this._context.textAlign = "end";
        this._draw_grid(this.indice[0],this.indice[1]);
    }
    _marge(){
        this.margeX = -(this._engine._gameboard.getBoard(new Coordinates(18, 15)).getColumn() * this.size * (2 / 3));
        this.margeY = -(this._engine._gameboard.getBoard(new Coordinates(16, 16)).getLine() * this.size * (8 / 6));
        if (this._engine._gameboard.getBoard(new Coordinates(18, 15)).getColumn() < this.indice[0] && this._engine._gameboard.getBoard(new Coordinates(17, 15)).getLine() === this.indice[3]) {
            this.margeX = -(this.indice[0] * this.size * (2 / 3));
            this.margeY = -(3 / 2) * (this.indice[1] * this.size * (7 / 6));
        }
        if (this._engine._gameboard.getBoard(new Coordinates(16, 16)).getColumn() > this.indice[2] && this._engine._gameboard.getBoard(new Coordinates(17, 15)).getLine() === this.indice[3]) {
            this.margeX = -(this.indice[2] * this.size);
            this.margeY = -(3 / 2) * (this.indice[1] * this.size);
        }
        if (this._engine._gameboard.getBoard(new Coordinates(18, 15)).getColumn() < this.indice[0]) {
            this.margeX = -(this.indice[0] * this.size * (1 / 3));
        }
        if (this._engine._gameboard.getBoard(new Coordinates(16, 16)).getLine() < this.indice[1]) {
            this.margeY = -(this.indice[1] * this.size * (7 / 6));
        }
        if (this._engine._gameboard.getBoard(new Coordinates(16, 16)).getColumn() > this.indice[2]) {
            this.margeX = -(this.indice[2] * this.size);
        }
        if (this._engine._gameboard.getBoard(new Coordinates(17, 15)).getLine() > this.indice[3]) {
            this.margeY = -(this.indice[1] * this.size);
        }
    }
    _draw_grid(indice_x,indice_y) {
        if (indice_x < indice_y) {
            this.size = (this._canvas.width) / (7 / 4 * this.indice[0]);
        }
        else {
            this.size = (this._canvas.width) / (7 / 4 * this.indice[1]);
        }
        this._marge();
        this.k = 0;
        this.l = 0;
        while (this.tableau[this.k] !== undefined) {
            this.xx = ((this.tableau[this.k].getColumn() * 2 * this.size) * 3 / 4);
            this.yy = ((this.tableau[this.k].getLine() * Math.sqrt(3) * this.size) + ((Math.sqrt(3) * this.xx / 3)));
            this._draw_hexagone(this.xx + (this.margeX), this.yy + (this.margeY));
            if (this.tableau[this.k].getOwner() === Color.WHITE) {
                this._draw_pion_white(this.xx + (this.margeX), this.yy + (this.margeY), this.tableau[this.k].getStack().getHeight());
            }
            else if (this.tableau[this.k].getOwner() === Color.RED) {
                this._draw_pion_red(this.xx + (this.margeX), this.yy + (this.margeY), this.tableau[this.k].getStack().getHeight());
            }
            this.k = this.k + 1;
            this.l = this.l + 1;
        }
    }
    _draw_hexagone_color(x,y,z){
        this._context.moveTo(x + this.size  * Math.cos(0), y + this.size  * Math.sin(0));
        this._context.beginPath();
        for (let side = 0; side < 7; side++) {
            this.angle_deg = 60 * side;
            this.angle_rad = Math.PI/180*this.angle_deg;
            this._context.lineTo(x + this.size * Math.cos(this.angle_rad), y + this.size * Math.sin(this.angle_rad));
        }
        this._context.fillStyle = z;
        this._context.closePath();
        this._context.fill();
        this._context.stroke();
    }
    _draw_hexagone(x,y) {
        this._context.moveTo(x + this.size  * Math.cos(0), y + this.size  * Math.sin(0));
        this._context.beginPath();
        for (let side = 0; side < 7; side++) {
            this.angle_deg = 60 * side;
            this.angle_rad = Math.PI / 180 * this.angle_deg;
            this._context.lineTo(x + this.size * Math.cos(this.angle_rad), y + this.size * Math.sin(this.angle_rad));
        }
        this.grd = this._context.createLinearGradient(x,y,x+(this.size/2),y+(this.size/2));
        this.grd.addColorStop(0,"#008800");
        this.grd.addColorStop(0.25,"#009900");
        this.grd.addColorStop(0.5,"#00AA00");
        this.grd.addColorStop(0.75,"#00BB00");
        this.grd.addColorStop(1,"#00CC00");
        this._context.fillStyle = this.grd;
        this._context.closePath();
        this._context.fill();
        this._context.stroke();
    }
    _draw_pion_white(x,y,z){
        this._context.beginPath();
        this.grd = this._context.createRadialGradient(x,y,(this.size/2),x+(this.size/2),y+(this.size/2),(this.size/2));
        this.grd.addColorStop(0,"#CCCCCC");
        this.grd.addColorStop(0.75,"#DFDFDF");
        this.grd.addColorStop(1,"#FFFFFF");
        this._context.fillStyle = this.grd;
        this._context.arc(x,y,(this.size/2),0,2*Math.PI);
        this._context.closePath();
        this._context.fill();
        this._context.stroke();
        this._context.beginPath();
        this._context.fillStyle = "#000000";
        this._context.textAlign = "start";
        this._context.textBaseline = "middle";
        this._context.font = (this.size/1.5)+"px Impact";
        this._context.fillText(z,x-(this.size/3),y+(this.size/20));
        this._context.textAlign = "end";
        this._context.closePath();
    }
    _draw_pion_red(x,y,z){
        this._context.beginPath();
        this.grd = this._context.createRadialGradient(x,y,(this.size/2),x+(this.size/2),y+(this.size/2),(this.size/2));
        this.grd.addColorStop(0,"#CC0000");
        this.grd.addColorStop(0.75,"#DF0000");
        this.grd.addColorStop(1,"#FF0000");
        this._context.fillStyle = this.grd;
        this._context.arc(x,y,(this.size/2),0,2*Math.PI);
        this._context.closePath();
        this._context.fill();
        this._context.stroke();
        this._context.beginPath();
        this._context.fillStyle = "#000000";
        this._context.textAlign = "start";
        this._context.textBaseline = "middle";
        this._context.font = (this.size/1.5)+"px Impact";
        this._context.fillText(z,x-(this.size/3),y+(this.size/20));
        this._context.textAlign = "end";
        this._context.closePath();
    }
    _draw_cursor(x,y){
        this._context.beginPath();
        this._context.fillStyle = "#000000";
        this._context.textAlign = "start";
        this._context.textBaseline = "middle";
        this._context.font = "bold "+(this.size/1.2)+"px Impact";
        this._context.fillText("X",x-(this.size/4),y+(this.size/20));
        this._context.textAlign = "end";
        this._context.closePath();
    }
    _draw_next_pion(x,y){
        this._context.beginPath();
        this.grd = this._context.createRadialGradient(x,y,(this.size/2),x+(this.size/2),y+(this.size/2),(this.size/2));
        this.grd.addColorStop(0,"#00C2FF");
        this.grd.addColorStop(0.75,"#00D2FF");
        this.grd.addColorStop(1,"#00E2FF");
        this._context.fillStyle = this.grd;
        this._context.arc(x,y,(this.size/2),0,2*Math.PI);
        this._context.closePath();
        this._context.fill();
        this._context.stroke();
    }
    get_move() {
	let move;
	if(this.tableau.length < 32){
		move = new Move(MoveType.PUT_MAP,Color.WHITE,null,new Coordinates(this._selected_cell.column,this._selected_cell.line),null, this.orientation,null); 
	}
	if(this.tableau.length === 32){
                if(this._engine._phase === Phase.IN_GAME){
			this._numberClic++;
                	if(this._numberClic%2 === 0 && this._engine._phase !== Phase.FINISH) {
                    		this._moveFrom = new Coordinates(this._selected_cell.column, this._selected_cell.line);
                    		this.amountPiece = this._choose_number();
                	}else {
                    		this._moveTo = new Coordinates(this._selected_cell.column, this._selected_cell.line);	
                    		move = new Move(MoveType.PUT_PIECE, this._engine.getCurrentColor(), this._moveFrom, this._moveTo, this.amountPiece, null, null);
                    		this.amountPiece = 0;
                    		this._winner();
                	}
		}
                if(this._engine._phase === Phase.FIRST_PLACEMENT){
                    this._nbTourPlacement++;
                    if(this._nbTourPlacement > 1 && this._nbTourPlacement < 4){
                    move = new Move(null,this._engine.getCurrentColor(),null,new Coordinates(this._selected_cell.column,this._selected_cell.line),null,null,null);
                    }
                }
	}
	return move
    }

    is_animate() {
        return false;
    }

    is_remote() {
        return false;
    }

    move(move, color) {
        this._manager.play();
    }

    unselect() {
    }

    set_canvas(c) {
        super.set_canvas(c);
        this._canvas.addEventListener("click", (e) => {
            this._on_click(e);
            if(this._engine._gameboard.getBoard(this._moveFrom).getOwner() === this._engine.current_color()){
                this.borders = this._engine._getBorderFrom(this._moveFrom);
                for(let i = 0; i < this.borders.length; i++){
                    this._preview_next_pos(this.borders[i].get_pos_x(),this.borders[i].get_pos_y());
                }
            }
        });
        addEventListener("keypress",(e) =>{
            const touche = e.key;
            if(this.compteur === -1){
                this.compteur = 11;
            }
            if(touche === "q"){
                this.orientation = this.compteur;
                if(this.compteur >= 0){
                    this.compteur++;
                }
                if(this.compteur >= 12){
                    this.compteur = 0;
                }
                this._preview_tile();
            }
            if(touche === "d"){
                this.orientation = this.compteur;
                if(this.compteur >= 0){
                    this.compteur--;
                }
                this._preview_tile();
            }

        });
        this._canvas.addEventListener("mousemove", (e) => {
            this.coordinate_board_souris = this._get_click_position(e);
            if (this.tableau.length < 32) {
                this._preview_tile();
            }
            else if(this._nbTourPlacement < 3){
                this._preview_piece();
            }
            else{
                this._preview_cursor();
            }
            if(this._engine._gameboard.getBoard(this._moveFrom).getOwner() === this._engine.current_color()){
                this.borders = this._engine._getBorderFrom(this._moveFrom);
                for(let i = 0; i < this.borders.length; i++){
                    this._preview_next_pos(this.borders[i].get_pos_x(),this.borders[i].get_pos_y());
                }
            }
        });
        this.draw();
    }
    _winner(){
        if(this._engine._phase === Phase.FINISH){
            this._context.fillStyle = "#000000";
            let w = this._engine.winner_is();
            let winner = "";
            this._context.textAlign = "start";
            this._context.textBaseline = "middle";
            this._context.font = 30+"px Georgia";
            if(w === 0) winner = "White";
            if(w === 1) winner = "Red";
            if (confirm("the winner is " + winner)) {
                window.location.reload(true);
            }
            this._context.fillText("Winner :"+winner,150,60);
            this._context.textAlign = "end";
        }
    }
    _preview_tile(){
        this.draw();
        this._color_first_tile = "rgba(255,0,0,0.5)";
        this._color_other_tile = "rgba(145,51,51,0.5)";
        this.xpos = ((this.coordinate_board_souris.x*2*this.size)*3/4);
        this.ypos = ((this.coordinate_board_souris.y*Math.sqrt(3)*this.size)+((Math.sqrt(3)*((this.coordinate_board_souris.x*2*this.size)*3/4)/3)));
        this._tab_temp = this._engine._generateTile(new Coordinates(this.coordinate_board_souris.x,this.coordinate_board_souris.y),this.orientation);
        this._draw_hexagone_color(this.xpos+this.margeX,this.ypos+this.margeY,this._color_first_tile);
        for(let i = 0; i < this._tab_temp.length; i++){
            this._draw_hexagone_color(((this._tab_temp[i].get_pos_x()*2*this.size)*3/4)+this.margeX,(((this._tab_temp[i].get_pos_y()*Math.sqrt(3)*this.size)+((Math.sqrt(3)*((this._tab_temp[i].get_pos_x()*2*this.size)*3/4)/3))))+this.margeY,this._color_other_tile);
        }
    }
    _preview_piece(){
        this.draw();
        if(this._engine.current_color() === 0) {
            this.xpos = ((this.coordinate_board_souris.x * 2 * this.size) * 3 / 4);
            this.ypos = ((this.coordinate_board_souris.y * Math.sqrt(3) * this.size) + ((Math.sqrt(3) * ((this.coordinate_board_souris.x * 2 * this.size) * 3 / 4) / 3)));
            this._tab_temp = this._engine._generateTile(new Coordinates(this.coordinate_board_souris.x, this.coordinate_board_souris.y), this.orientation);
            this._draw_pion_white(this.xpos + this.margeX, this.ypos + this.margeY," ");
        }
        else{
            this.xpos = ((this.coordinate_board_souris.x*2*this.size)*3/4);
            this.ypos = ((this.coordinate_board_souris.y*Math.sqrt(3)*this.size)+((Math.sqrt(3)*((this.coordinate_board_souris.x*2*this.size)*3/4)/3)));
            this._tab_temp = this._engine._generateTile(new Coordinates(this.coordinate_board_souris.x,this.coordinate_board_souris.y),this.orientation);
            this._draw_pion_red(this.xpos+this.margeX,this.ypos+this.margeY," ");
        }
    }
    _preview_cursor(){
        this.draw();
        this.xpos = ((this.coordinate_board_souris.x*2*this.size)*3/4);
        this.ypos = ((this.coordinate_board_souris.y*Math.sqrt(3)*this.size)+((Math.sqrt(3)*((this.coordinate_board_souris.x*2*this.size)*3/4)/3)));
        this._draw_cursor(this.xpos + this.margeX, this.ypos + this.margeY);
    }
    _preview_next_pos(x,y){
        this.xpos = ((x*2*this.size)*3/4);
        this.ypos = ((y*Math.sqrt(3)*this.size)+((Math.sqrt(3)*((x*2*this.size)*3/4)/3)));
        this._draw_next_pion(this.xpos + this.margeX, this.ypos + this.margeY);
    }
    _hex_round(x, y) {
        return this._cube_to_axial(this._cube_round(this._axial_to_cube(x, y)));
    }
    _cube_to_axial({rx,ry,rz}){
        let _x = rx;
        let _y = rz;
        return {_x, _y};
    }
    _axial_to_cube(x, y) {
        let _x = x;
        let _z = y;
        let _y = -_x-_z;
        return {_x,_y, _z};
    }
    _cube_round({_x, _y, _z}) {
        let rx = Math.round(_x);
        let ry = Math.round(_y);
        let rz = Math.round(_z);
        let x_diff = Math.abs(rx - _x);
        let y_diff = Math.abs(ry - _y);
        let z_diff = Math.abs(rz - _z);
        if (x_diff > y_diff && x_diff > z_diff){
            rx = -ry-rz;
        }
        else if( y_diff > z_diff){
            ry = -rx-rz;
        }
        else{
            rz = -rx-ry;
        }
        return {rx,ry,rz};
    }
    _get_click_position(e) {
        const rect = this._canvas.getBoundingClientRect();
        this._pixel_to_board_x = (((2./3*(e.clientX  -(rect.left+(this.margeX))))/(this.size)));
        this._pixel_to_board_y = ((((-1./3*(e.clientX  -(rect.left+(this.margeX))))+((Math.sqrt(3)/3)*(e.clientY -(rect.top+this.margeY ))))/(this.size)));
        const coordinates = this._hex_round(this._pixel_to_board_x,this._pixel_to_board_y);
        return {x: coordinates._x, y: coordinates._y};
    }
    _compute_coordinates(x, y) {
        return {
            column: x,
            line: y
        };
    }
    _on_click(event) {
        this.coordinate_board_souris = this._get_click_position(event);
        this._selected_cell = this._compute_coordinates(this.coordinate_board_souris.x,this.coordinate_board_souris.y);
        if (this.tableau.length < 32){

	this._manager.play();
        }
        if(this.tableau.length === 32){
                if(this._nbTourPlacement >= 3 && this._engine._phase !== Phase.FINISH){
                    this._engine._phase = Phase.IN_GAME;
                }
		else if(this._engine._phase === Phase.FINISH){
			        this._nbTourPlacement = 0;	
		}	
		this._manager.play();
        }
        this.draw();

    }
    _rule_of_game(){
        let textFr = "Règle du jeu \n"+"Le plateau se forme en emboitant des tuiles un joueur après l'autre \n"+"Pour touner les tuiles il faut appuyer sur 'q' ou 'd' \n";
        textFr += "Les deux joueurs possèdent un pile de 16 pions au départ \n"+"Le joueur Blanc commence en mettant ses pions sur un des bords du plateau \n";
        textFr += "Le but du jeu est de former le plus grand troupeau de pion tout en bloquant le joueur adverse \n";
        let textEn = "\n Rule of the game \n"+"The board is formed by interlocking tiles one player after another \n"+"To tilt the tiles, press 'q' or 'd \n";
        textEn += "Both players have a stack of 16 pawns at the start \n"+"The White player starts by putting his pieces on one of the board edges \n";
        textEn += "The object of the game is to form the largest herd of pawn while blocking the opposing player \n";
        alert(textFr+textEn);
    }

    _choose_number() {
        return prompt("Nombre de piece a déplacer =");
    }
}

export default Gui;

