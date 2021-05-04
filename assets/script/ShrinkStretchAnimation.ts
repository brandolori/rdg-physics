const {ccclass, property} = cc._decorator;

@ccclass
export default class HoverMouseAnimation extends cc.Component {

    @property
    //Max x scale during hovering 
    increaseFinalRatioX: number = 0;

    @property
    //Max y scale during hovering
    increaseFinalRatioY: number = 0;
    
    @property
    //Animation duration
    animationDuration: number = 0;

    //Initial node size
    initialSizeX: number = null;
    initialSizeY: number = null;

    onEnable(){
        //Save the initial node size
        this.initialSizeX = this.node.scaleX;
        this.initialSizeY = this.node.scaleY;

        cc.tween(this.node).repeatForever(
            cc.tween()
            .to(this.animationDuration, {scaleX: this.initialSizeX * this.increaseFinalRatioX, scaleY: this.initialSizeY * this.increaseFinalRatioY}, {easing: "quadInOut"})
            .to(this.animationDuration, {scaleX: this.initialSizeX, scaleY: this.initialSizeY}, {easing: "quadInOut"})
        ).start();
    }
}
