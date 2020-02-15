cc.Class({
  extends: cc.Component,

  properties: {
    GameRecord: cc.Node,
    MaxScore: cc.Label,
    MaxHeight: cc.Label,
    MaxLevel: cc.Label
  },
  onLoad() {
    this.GameData = this.node.getComponent("GameData");
    this.userData = this.GameData.getRecord();
    this.setGameData();
  },

  setGameData() {
    this.MaxScore.string = this.userData.maxScore;
    this.MaxHeight.string = this.userData.maxHeight + "米";
    this.MaxLevel.string = "x" + this.userData.maxLevel;
  },
  onChangeScreenGame() {
    cc.director.loadScene("Game");
  }

  // update (dt) {},
});
