cc.Class({
  extends: cc.Component,

  properties: {
    ScoreBarrierPrefab: cc.Prefab,
    DeathBarrierPerfab: cc.Prefab
  },

  init() {
    this.scoreTimer = null;
    this.deathTimer = null;
    this.node.destroyAllChildren();
    return this;
  },
  run() {
    this.createInitBarrier();
    this.startCreateScore();
    this.startCreateDeath();
  },

  stop() {
    this.endCreateScore();
  },

  createInitBarrier() {
    for (var i = 0; i < 16; i++) {
      let ScoreBarrier = cc.instantiate(this.ScoreBarrierPrefab);
      this.node.addChild(ScoreBarrier);
      let ScoreBarrierCom = ScoreBarrier.getComponent("ScoreBarrier");
      ScoreBarrierCom.init();
      ScoreBarrierCom.config.angle = (360 / 16) * i;
      ScoreBarrierCom.config.shape.length = Score_Barriers_Length_Min;
      ScoreBarrierCom.config.shape.scale = Score_Barriers_Scale_Max;
      ScoreBarrierCom.config.shape.speed = -Score_Barriers_Speed_Min;
      ScoreBarrierCom.run();
    }
  },
  startCreateScore() {
    this.scoreTimer = setTimeout(() => {
      let ScoreBarrier = cc.instantiate(this.ScoreBarrierPrefab);
      this.node.addChild(ScoreBarrier);
      ScoreBarrier.getComponent("ScoreBarrier")
        .init()
        .run();
      // 结束后再次创建
      this.startCreateScore();
    }, randomScope(Score_Barriers_Frequency_Min, Score_Barriers_Frequency_Max));
  },
  endCreateScore() {
    clearInterval(this.scoreTimer);
    clearInterval(this.deathTimer);
  },
  startCreateDeath() {
    this.deathTimer = setTimeout(() => {
      var death = cc.instantiate(this.DeathBarrierPerfab);
      this.node.addChild(death);

      var deathCom = death.getComponent("DeathBarrier");
      deathCom.init().run();
      this.startCreateDeath();
    }, randomScope(Death_Barriers_Frequency_Min, Death_Barriers_Frequency_Max));
  },
  update(dt) {}
});
