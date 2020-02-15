// set
cc.macro.ENABLE_WEBGL_ANTIALIAS = true;

// screen
window.GameView = null;

// local data

// level score height
window.Level = 1;
window.Score = 0;
window.MaxHeight = 0;
window.GameData = null;

// player
window.Player_Angle = 0; // 初始角度
window.Player_Length = 1000; // 初始高度
window.Player_Acceleration = 0; // 初始加速度
window.Player_ForceGravity = 2000; // 重力
window.Player_MoveBaseHeight = 800; // 移动的基准高度，player在任何高度移动的弧长都等于这个数值移动1度的距离

// score barrires
window.Score_Barriers_Length_Min = 250; // 到圆心最小距离
window.Score_Barriers_Length_Max = Score_Barriers_Length_Min + Level * 1000; // 到圆心最大距离
window.Score_Barriers_Scale_Max = 0.8; // 最大缩放比例
window.Score_Barriers_Scale_Min = 0.4; // 最小缩放比例
window.Score_Barriers_Speed_Max = 100; // 最大移动速度/s
window.Score_Barriers_Speed_Min = 10; // 最小移动速度/s
window.Score_Barriers_Acceleration = 1500; // 加速度
window.Score_Barriers_Frequency_Max = 800; // 最大生成频率/毫秒
window.Score_Barriers_Frequency_Min = 400; // 最小生成频率/毫秒

// death barriers
// circle:黑白圆形
// square:黑白方形
// tube:黑白长条
window.Death_Barriers_Length_Min = 600;
window.Death_Barriers_Length_Max = Death_Barriers_Length_Min + Level * 1000;
window.Death_Barriers_Scale_Max = 1;
window.Death_Barriers_Scale_Min = 0.7;
window.Death_Barriers_Speed_Max = 100; // 最大移动速度/s 移动圆心角度速度
window.Death_Barriers_Speed_Min = 10; // 最小移动速度/s
window.Death_Barriers_Speed_Self_Max = 90; // 自身角度移动速度(长条障碍)
window.Death_Barriers_Speed_Self_Min = 20; // 自身角度移动速度(长条障碍)
window.Death_Barriers_Acceleration = 0;
window.Death_Barriers_Frequency_Max = 3000;
window.Death_Barriers_Frequency_Min = 1500;

window.Death_Barriers_Circle_StartLevel = 1;
window.Death_Barriers_Square_StartLevel = 4;
window.Death_Barriers_Tube_StartLevel = 5;

// collider group
window.ColliderGroup_Score = "Score"; // 得分
window.ColliderGroup_Death = "Death"; // 死亡

// util
window.randomScope = function(min, max) {
  return min + Math.random() * (max - min);
};

// userData
window.userData = null;
