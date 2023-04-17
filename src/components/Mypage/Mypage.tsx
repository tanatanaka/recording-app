import { useState, useEffect } from "react";
import BasicButton from "../Tools/BasicButton";
import Menu from "../Menu/MenuBar";
import "./Mypage.css";
import { ModalStyle, SpModalStyle } from "../Tools/ModalStyle";
import dayjs from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { auth, db } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Modal,
  TextField,
  useMediaQuery,
} from "@mui/material";

const Mypage = () => {
  // Modalの開閉
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setStartDay(null);
    setGoalDay(null);
    setGoalWeight(null);
    setGoalBodyFat(null);
    setOpen(false);
  };

  // ブレークポイント
  const breakPoint: boolean = useMediaQuery("(max-width:600px)");

  // 目標入力フォーム
  const [startDay, setStartDay] = useState<any>(null);
  const [goalDay, setGoalDay] = useState<any>(null);
  const [goalWeight, setGoalWeight] = useState<number | null>(null);
  const [goalBodyFat, setGoalBodyFat] = useState<number | null>(null);

  const startDayChange = (e: any) => {
    setStartDay(dayjs(e).format("YYYY/MM/DD"));
  };

  const goalDayChange = (e: any) => {
    setGoalDay(dayjs(e).format("YYYY/MM/DD"));
  };

  const goalWeightChange = (e: any) => {
    e.preventDefault();
    setGoalWeight(parseFloat(e.target.value));
  };

  const goalBodyFatChange = (e: any) => {
    e.preventDefault();
    setGoalBodyFat(parseFloat(e.target.value));
  };

  // 目標
  const [goal, setGoal] = useState<any>(undefined);
  // 現在
  const [now, setNow] = useState<any>(undefined);

  useEffect(() => {
    // 目標データ取得
    const goalData = collection(db, "goals");
    const goalQuery = query(goalData);
    onSnapshot(goalQuery, (snapshot: any) => {
      const getGoal = snapshot.docs.map((doc: any) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setGoal(getGoal && getGoal[0]);
    });

    // graphの最新データのみ取得
    const nowData = collection(db, "graph");
    const graphQuery = query(nowData, orderBy("date", "desc"));
    onSnapshot(graphQuery, (snapshot: any) => {
      const getNow = snapshot.docs.map((doc: any) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setNow(getNow && getNow.shift());
    });
  }, []);

  // データがあれば上書き、なければ新規保存
  const handleSaveClick = async (e: any) => {
    e.preventDefault();
    const updateGoals = doc(db, "goals", goal && goal.id);
    await updateDoc(updateGoals, {
      startDay,
      goalDay,
      goalWeight,
      goalBodyFat,
    });
    handleClose();
  };

  const handleCreateClick = async () => {
    await addDoc(collection(db, "goals"), {
      startDay,
      goalDay,
      goalWeight,
      goalBodyFat,
    });
    handleClose();
  };

  // 目標まで
  const calcDateDiff = () => {
    const dayjs = require("dayjs");
    const nowDate = dayjs();
    const goalDate = dayjs(goal && goal.goalDay);

    const formatNowDate = nowDate.format("YYYY/MM/DD");
    const formatGoalDate = goalDate.format("YYYY/MM/DD");
    const sameDate = formatNowDate === formatGoalDate;
    const date = goalDate.diff(nowDate, "day", false);
    if (date < 0) {
      return "目標の日を過ぎました！";
    } else if (sameDate) {
      return "目標の日になりました！";
    } else if (date === 0) {
      return `${date + 1} 日`;
    } else if (!date) {
      return "目標達成したい日が未登録です";
    } else {
      return `${date + 1} 日`;
    }
  };

  const calcWeightDiff = () => {
    const nowWeight = now ? now.weight : false;
    const goalWeight = goal ? goal.goalWeight : false;
    const w = nowWeight - goalWeight;
    const weight = parseFloat(w.toFixed(1));
    if (!weight || !nowWeight || !goalWeight) {
      return "目標または現在の数値が登録されていません";
    } else if (w <= 0) {
      return "目標達成！！";
    } else {
      return `${weight} kg`;
    }
  };

  const calcBodyFatDiff = () => {
    const nowBodyFat = now ? now.bodyFat : false;
    const goalBodyFat = goal ? goal.goalBodyFat : false;
    const f = nowBodyFat - goalBodyFat;
    const bodyFat = parseFloat(f.toFixed(1));
    if (!bodyFat || !nowBodyFat || !goalBodyFat) {
      return "目標または現在の数値が登録されていません";
    } else if (f <= 0) {
      return "目標達成！！";
    } else {
      return `${bodyFat} %`;
    }
  };
  const dateDiff = calcDateDiff();
  const weightDiff = calcWeightDiff();
  const bodyFatDiff = calcBodyFatDiff();

  // ログアウト
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth);
    navigate("/");
  };

  return (
    <>
      <Menu />
      <div className="container">
        <h1 className="pageTitle">My Page</h1>
        <div className="button">
          <BasicButton onClick={handleOpen}>目標を入力</BasicButton>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={breakPoint ? SpModalStyle : ModalStyle}>
            <Typography variant="h6" component="h2">
              目標を入力
            </Typography>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: {xs: "180px", sm: "265px"}  },
              }}
            >
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                dateFormats={{ monthAndYear: "YYYY年 MM月" }}
              >
                <DatePicker
                  label="トレーニング開始日"
                  inputFormat="YYYY/MM/DD"
                  value={startDay}
                  onChange={startDayChange}
                  renderInput={(params: any) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                dateFormats={{ monthAndYear: "YYYY年 MM月" }}
              >
                <DatePicker
                  label="終了目標日"
                  inputFormat="YYYY/MM/DD"
                  value={goalDay}
                  onChange={goalDayChange}
                  renderInput={(params: any) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <TextField
                label="目標体重"
                variant="outlined"
                type="number"
                onChange={goalWeightChange}
              />
              <TextField
                label="目標体脂肪率"
                variant="outlined"
                type="number"
                onChange={goalBodyFatChange}
                sx={{ marginBottom: "10px" }}
              />
            </Box>

            {goal ? (
              <>
                <Typography
                  sx={{
                    color: "black",
                    opacity: 0.8,
                    fontSize: "13px",
                    letterSpacing: "1px",
                    marginTop: "15px",
                  }}
                >
                  ※既存の目標は上書きされます
                </Typography>
                <BasicButton onClick={handleSaveClick}>
                  目標を上書き保存
                </BasicButton>
              </>
            ) : (
              <BasicButton onClick={handleCreateClick}>
                目標を新規作成
              </BasicButton>
            )}
          </Box>
        </Modal>

        <div className="flexBox">
          {/* 目標 */}
          <div className="goalBox">
            <dl>
              <div className="goals">
                <dt>トレーニングを始めた日</dt>
                <dd>{goal && goal.startDay}</dd>
              </div>
              <div className="goals">
                <dt>目標達成したい日</dt>
                <dd>{goal && goal.goalDay}</dd>
              </div>
              <div className="goals">
                <dt>目標体重</dt>
                <dd>{goal && goal.goalWeight}kg</dd>
              </div>
              <div className="goals">
                <dt>目標体脂肪率</dt>
                <dd>{goal && goal.goalBodyFat}%</dd>
              </div>
            </dl>
          </div>
          {/* 目標まであと */}
          <div className="goalBox">
            <h2>目標まであと・・・</h2>
            <div className="achieveGoal">
              <p>{dateDiff}</p>
              <p>{weightDiff}</p>
              <p>{bodyFatDiff}</p>
            </div>
          </div>
        </div>

        <div className="logout">
          <BasicButton onClick={handleLogout}>ログアウト</BasicButton>
        </div>
      </div>
    </>
  );
};

export default Mypage;
