import "./Top.css";
import trainingImage from "./image/training_image.png"
import graphImage from "./image/graph_image.png"
import mypageImage from "./image/mypage_image.png"
import ContentsCard from "./ContentsCard";

import Typography from "@mui/material/Typography";
import Auth from "./Auth";

const Top = () => {
  return (
    <div className="body">
      <div className="flex">
        <div className="title">
          <h2>トレコード</h2>
          <p>Training×Recording</p>
        </div>

        <div className="formBox">
          <Auth />
        </div>
      </div>

      <div className="contents">
        <ContentsCard image={trainingImage}>
          <Typography gutterBottom variant="h5" component="div">
            1. トレーニング記録管理
          </Typography>
          <Typography variant="body2" color="text.secondary">
            トレーニングの内容を入力し、メニュー・時間・回数を日付ごとに管理できます！グラフとの併用で効果的なメニューの把握にも役立ちます。
          </Typography>
        </ContentsCard>

        <ContentsCard image={graphImage}>
          <Typography gutterBottom variant="h5" component="div">
            2. 体重・体脂肪管理
          </Typography>
          <Typography variant="body2" color="text.secondary">
            体重・体脂肪率を入力すると自動でグラフを作成します！細かな数値の変化を目視できるので、モチベーション維持に役立ちます。
          </Typography>
        </ContentsCard>

        <ContentsCard image={mypageImage}>
          <Typography gutterBottom variant="h5" component="div">
            3. 目標を登録できる
          </Typography>
          <Typography variant="body2" color="text.secondary">
            目標となる日付・体重・体脂肪率を入力するとグラフのデータをもとに目標までの数値を表示します！目標に近づいているのが実感できます。
          </Typography>
        </ContentsCard>
      </div>
    </div>
  );
};

export default Top;
