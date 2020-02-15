cc.Class({
  extends: cc.Component,
  properties: {},
  onLoad() {
    this.init();
  },
  init() {
    this.level = Level;
    this.score = Score;
    this.maxHeight = MaxHeight;
  },
  getRecord() {
    // data = {
    //   gameTime: 0, // 总游戏时长
    //   maxScore: 0, // 最高分
    //   maxHeight: 0, // 最远距离
    //   maxLevel: 0 // 最高等级
    // };
    var localdata = cc.sys.localStorage.getItem("gameRecord");
    return Object.assign(
      {
        gameTime: 0,
        maxScore: 0,
        maxHeight: 0,
        maxLevel: 0
      },
      localdata == undefined || localdata == null || localdata == "" ? {} : JSON.parse(localdata)
    );
  },
  saveData() {
    var data = this.getRecord();

    data.maxScore = data.maxScore < this.score ? this.score : data.maxScore;
    data.maxHeight = data.maxHeight < this.maxHeight ? Math.floor(this.maxHeight / 100) : data.maxHeight;
    data.maxLevel = data.maxLevel < this.level ? this.level : data.maxLevel;
    data.gameTime = 0;
    cc.sys.localStorage.setItem("gameRecord", JSON.stringify(data));
  },
  addScore(x) {
    this.score += this.level * x;
  },
  addLevel() {
    this.level++;
  },
  recordCurrentHeight(height) {
    if (height > this.maxHeight) {
      this.maxHeight = height;
    }
  }
});
