cc.Class({
  extends: cc.Component,

  properties: {
    Shape: cc.Node,
    Cable: cc.Graphics,
    Eyes: cc.Node
  },

  init() {
    this.node.angle = Player_Angle; // 初始角度
    this.Shape.y = Player_Length; // 初始高度
    this.acceleration = Player_Acceleration; // 初始加速度
    this.forceGravity = Player_ForceGravity; // 重力
    // 移动的基准高度，player在任何高度移动的弧长都等于这个数值移动1度的距离 移动1度的弧长 2*PI*800 / 360
    this.basisMoveL = (2 * Math.PI * Player_MoveBaseHeight) / 360;

    this.currentPlayStateTime = 0; // 状态时间
    this.currentPlayStateStartY = 0; // 状态发生时y的位置
    this.currentPlayState = false; // 状态
    this.isDeath = false;

    this.shapeActionScaleUp = false; // 形状变化
    this.shapeActionScaleDown = false; // 形状变化

    this.eyesActionUp = false; // 眼睛变化
    this.eyesActionDown = false; // 眼睛变化

    return this;
  },
  run() {
    this.changePlayState(true);
  },
  // player到圆心的连接线
  drawCable() {
    this.Cable.clear();
    this.Cable.lineWidth = 3;
    this.Cable.strokeColor = cc.Color.WHITE;
    this.Cable.moveTo(0, 0);
    this.Cable.lineTo(this.Shape.x, this.Shape.y);
    this.Cable.stroke();
  },
  handleDeath() {
    this.isDeath = true;
  },
  changePlayState(state, acceleration) {
    this.currentPlayState = state;
    this.currentPlayStateTime = 0;
    this.currentPlayStateStartY = this.Shape.y;
    if (acceleration) {
      this.acceleration = acceleration;
    }
  },
  addAngle() {
    var moveAngle = this.basisMoveL / ((2 * Math.PI * this.Shape.y) / 360);
    this.node.angle -= moveAngle;
    if (this.node.angle <= -360) {
      this.node.angle = this.node.angle + 360;
      GameData.addLevel();
      GameView.updateGemeData();
    }
  },
  handleEyesAction(type) {
    if (type == "up") {
      if (this.eyesActionUp == false) {
        this.eyesActionUp = true;
        this.eyesActionDown = false;
        this.Eyes.runAction(cc.moveTo(0.1, cc.v2(0, 7)));
      }
    }
    if (type == "down") {
      if (this.eyesActionDown == false) {
        this.eyesActionUp = false;
        this.eyesActionDown = true;
        this.Eyes.runAction(cc.moveTo(0.1, cc.v2(0, -7)));
      }
    }
  },
  handleShapeScaleAction(type) {
    if (type == "up") {
      if (this.shapeActionScaleUp == false) {
        this.shapeActionScaleUp = true;
        this.shapeActionScaleDown = false;
        this.Shape.runAction(cc.scaleTo(0.1, 0.6, 1));
      }
    }
    if (type == "down") {
      if (this.shapeActionScaleDown == false) {
        this.shapeActionScaleDown = true;
        this.shapeActionScaleUp = false;
        this.Shape.runAction(cc.scaleTo(0.2, 0.8, 0.8));
      }
    }
  },
  // 计算位移
  calculateDisplacement() {
    // s＝v0t－gt2
    this.Shape.y = this.currentPlayStateStartY + this.acceleration * this.currentPlayStateTime - (this.forceGravity * Math.pow(this.currentPlayStateTime, 2)) / 2;
    GameData.recordCurrentHeight(this.Shape.y);
    GameView.updateGemeData();
  },
  // 计算速度
  calculateSpeed() {
    // v1＝v0－gt
    let speed = this.acceleration - this.forceGravity * this.currentPlayStateTime;

    if (this.currentPlayState) {
      if (speed > 400) {
        // 向上加速
        this.handleEyesAction("up");
        this.handleShapeScaleAction("up");
      } else if (speed <= 400 && speed > 0) {
        // 向上减速
        this.handleShapeScaleAction("down");
      } else if (speed <= 0 && speed > -100) {
        // 开始向下
        this.handleEyesAction("down");
      } else if (speed <= -100) {
        // 向下加速
      }
    }
  },

  update(dt) {
    if (this.isDeath) return;
    if (this.currentPlayState) {
      this.currentPlayStateTime += dt;
      this.drawCable();
      this.calculateSpeed();
      this.calculateDisplacement();
    }
  }
});
