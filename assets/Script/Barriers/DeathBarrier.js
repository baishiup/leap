cc.Class({
  extends: cc.Component,

  properties: {
    Shape: cc.Node,

    CircleFrame: cc.SpriteFrame,
    SquareFrame: cc.SpriteFrame,
    TubeFrame: cc.SpriteFrame,

    CircleCollider: cc.Node,
    SquareCollider: cc.Node,
    TubeCollider: cc.Node
  },

  init() {
    this.config = this.generateConfig();
    this.Shape.opacity = 180;
    this.Shape.runAction(cc.fadeTo(0.8, 255));

    this.CircleCollider.active = false;
    this.SquareCollider.active = false;
    this.TubeCollider.active = false;

    return this;
  },
  run() {
    this.setState();
    return this;
  },
  setState() {
    this.node.angle = this.config.angle;
    this.Shape.y = this.config.shape.length;
    this.Shape.scale = this.config.shape.scale;
    this.Shape.getComponent(cc.Sprite).spriteFrame = this.config.frame;
    this.config.collider.active = true;
  },
  generateConfig() {
    var randomShape = [];
    if (Level >= Death_Barriers_Circle_StartLevel) {
      randomShape.push({
        type: "circle",
        frame: this.CircleFrame,
        collider: this.CircleCollider
      });
    }
    if (Level >= Death_Barriers_Square_StartLevel) {
      randomShape.push({
        type: "sqiare",
        frame: this.SquareFrame,
        collider: this.SquareCollider
      });
    }
    if (Level >= Death_Barriers_Tube_StartLevel) {
      randomShape.push({
        type: "sqiare",
        frame: this.TubeFrame,
        collider: this.TubeCollider
      });
    }
    var index = Math.round(randomScope(0, randomShape.length - 1));
    return {
      type: randomShape[index].type,
      frame: randomShape[index].frame,
      collider: randomShape[index].collider,

      angle: -Math.random() * 360,
      acceleration: Death_Barriers_Acceleration,
      shape: {
        scale: randomScope(Death_Barriers_Scale_Min, Death_Barriers_Scale_Max),
        length: randomScope(Death_Barriers_Length_Min, Death_Barriers_Length_Max),
        speed: randomScope(Death_Barriers_Speed_Min, Death_Barriers_Speed_Max),
        speedSelf: randomScope(Death_Barriers_Speed_Self_Min, Death_Barriers_Speed_Self_Max)
      }
    };
  },
  onTouchScore() {
    this.node.destroy();
  },
  update(dt) {}
});
