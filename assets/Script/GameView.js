cc.Class({
  extends: cc.Component,

  properties: {
    TouchNode: cc.Node,
    Camera: cc.Camera,
    PlayerPrefab: cc.Prefab,
    PlayerContainer: cc.Node,
    Barriers: cc.Node,
    HandleView: cc.Node,
    OverMenus: cc.Node,
    ScoreLabel: cc.Label,
    LevelLabel: cc.Label,
    OverScoreLabel: cc.Label,
    OverMaxScoreLabel: cc.Label,
    PlayUI: cc.Node,
    PlayUIModal: cc.Node
  },

  onLoad() {
    GameView = this;
    this.GameData = this.node.getComponent("GameData");
    GameData = this.GameData;
    this.isHoldTouch = false;
    this.player = null;
    this.gameState = false;
    this.gameStart();
  },
  gameStart() {
    this.GameData.init();
    this.updateGemeData();

    this.onHandleViewHide();
    this.PlayUI.active = true;

    this.TouchNode.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.TouchNode.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.TouchNode.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);

    // barriers
    this.Barriers.getComponent("Barriers")
      .init()
      .run();

    // player
    if (this.player != null) {
      this.player.destroy();
      this.player = null;
    }
    this.player = cc.instantiate(this.PlayerPrefab);
    this.PlayerContainer.addChild(this.player);
    this.player
      .getComponent("Player")
      .init()
      .run();

    this.gameState = true;
  },
  gameOver() {
    this.GameData.saveData();
    this.gameState = false;
    this.PlayUI.active = false;
    this.TouchNode.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.TouchNode.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.TouchNode.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);

    // barriers
    this.Barriers.getComponent("Barriers").stop();

    // player
    this.player.getComponent("Player").handleDeath();

    this.isHoldTouch = false;

    this.onHandleViewShow();
  },
  onReGame() {
    this.gameStart();
  },
  onPause() {
    cc.director.pause();
    this.PlayUIModal.active = true;
  },
  onResume() {
    cc.director.resume();
    this.PlayUIModal.active = false;
  },
  onBackHome() {
    cc.director.resume();
    cc.director.loadScene("Home");
  },
  updateGemeData() {
    this.ScoreLabel.string = this.GameData.score;
    this.LevelLabel.string = "x" + this.GameData.level;
  },
  onHandleViewShow() {
    var spawn = cc.spawn(cc.scaleTo(0.3, 1, 1), cc.fadeTo(0.3, 255));
    this.OverMenus.runAction(spawn);

    // fontsize
    if (this.GameData.score > 9999) {
      this.OverScoreLabel.fontSize = 150;
      this.OverScoreLabel.lineHieght = 150;
    } else {
      this.OverScoreLabel.fontSize = 180;
      this.OverScoreLabel.lineHieght = 180;
    }

    this.OverScoreLabel.string = this.GameData.score;
    this.OverMaxScoreLabel.string = this.GameData.getRecord().maxScore;
  },
  onHandleViewHide() {
    this.OverMenus.scaleY = 0;
    this.OverMenus.opacity = 0;
  },

  onTouchStart() {
    this.isHoldTouch = true;
  },
  onTouchEnd() {
    this.isHoldTouch = false;
  },
  onHoldTouch() {
    this.player.getComponent("Player").addAngle();
  },
  onPlayerCollider(target) {
    if (!this.gameState) return;
    switch (target.node.group) {
      case ColliderGroup_Score:
        // 触发target的onTouch
        var acceleration;
        if (target.node.parent.name == "ScoreBarriers") {
          target.node.parent.getComponent("ScoreBarrier").onTouch();
          acceleration = target.node.parent.getComponent("ScoreBarrier").config.acceleration;
        } else {
          target.node.parent.parent.parent.parent.getComponent("DeathBarrier").onTouchScore();
          acceleration = target.node.parent.parent.parent.parent.getComponent("DeathBarrier").config.acceleration;
        }
        // 触发player的上抛事件
        this.player.getComponent("Player").changePlayState(true, acceleration);

        break;
      case ColliderGroup_Death:
        this.gameOver();
        break;
    }
  },
  AdjustCamera() {
    // player世界坐标
    let mat4 = this.player.getComponent("Player").Shape.getWorldMatrix(cc.mat4());
    let x = mat4.m12;
    let y = mat4.m13;

    // 高度
    let h = this.player.getComponent("Player").Shape.y;
    // gameview 缩放
    let scale = 0.853 - 0.0003 * h;
    // 0.3 - 0.8
    scale = scale > 0.8 ? 0.8 : scale;
    scale = scale < 0.3 ? 0.3 : scale;
    this.node.scale = scale;
    // 摄像机跟踪
    let r = 100; // 在摄像机上移动的圆形半径
    let angle = Math.abs(this.player.getComponent("Player").node.angle);
    let offx = cc.winSize.width / 2 + r * Number(Math.sin((angle * Math.PI) / 180).toFixed(4));
    let offy = cc.winSize.height / 2 + r * Number(Math.cos((angle * Math.PI) / 180).toFixed(4));
    this.Camera.node.x = x - offx;
    this.Camera.node.y = y - offy;
  },
  update(dt) {
    if (!this.gameState) return;

    if (this.isHoldTouch) {
      this.onHoldTouch();
    }
    this.AdjustCamera();
  }
});
