cc.Class({
  extends: cc.Component,

  properties: {},
  onLoad() {
    cc.director.getCollisionManager().enabled = true;
  },
  onCollisionEnter(other, self) {
    GameView.onPlayerCollider(other);
  }
});
