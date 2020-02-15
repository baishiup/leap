cc.Class({
  extends: cc.Component,

  properties: {
    Shape: cc.Node,
    Particle: cc.ParticleSystem
  },

  // 初始化生成基础数据
  init() {
    this.config = this.generateConfig();
    this.Shape.opacity = 180;
    this.Shape.runAction(cc.fadeTo(0.8, 255));
    return this;
  },
  run() {
    this.setState();
    this.runAction();
    return this;
  },
  stop() {
    this.endCreateScore();
  },
  runAction() {
    let move = cc.moveBy(1, cc.v2(0, -this.config.shape.speed));
    let seq = cc.sequence(
      move,
      cc.callFunc(() => this.runAction())
    );
    this.Shape.runAction(seq);
  },
  generateConfig() {
    return {
      angle: -Math.random() * 360,
      acceleration: Score_Barriers_Acceleration,
      shape: {
        scale: randomScope(Score_Barriers_Scale_Min, Score_Barriers_Scale_Max),
        length: randomScope(Score_Barriers_Length_Min, Score_Barriers_Length_Max),
        speed: randomScope(Score_Barriers_Speed_Min, Score_Barriers_Speed_Max)
      }
    };
  },
  setState() {
    this.node.angle = this.config.angle;
    this.Shape.y = this.config.shape.length;
    this.Shape.scale = this.config.shape.scale;
  },
  onTouch() {
    GameData.addScore(1);
    GameView.updateGemeData();

    this.Shape.getComponent(cc.Sprite).spriteFrame = null;
    this.Particle.resetSystem();

    setTimeout(() => {
      this.node.destroy();
    }, 500);
  },
  update(dt) {}
});
