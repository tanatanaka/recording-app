import { useState, useEffect, ChangeEvent } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import BasicButton from "../Tools/BasicButton";
import Menu from "../Menu/MenuBar";
import "./Mypage.css";
import { ModalStyle, SpModalStyle } from "../Tools/ModalStyle";
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
import { onAuthStateChanged, signOut } from "firebase/auth";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Box,
  Typography,
  Modal,
  TextField,
  useMediaQuery,
} from "@mui/material";

const Mypage = () => {
  const [open, setOpen] = useState<boolean>(false);

  const [startDay, setStartDay] = useState<any>(null);
  const [goalDay, setGoalDay] = useState<any>(null);
  const [goalWeight, setGoalWeight] = useState<number | null>(null);
  const [goalBodyFat, setGoalBodyFat] = useState<number | null>(null);

  const [goal, setGoal] = useState<any>(undefined);
  const [now, setNow] = useState<any>(undefined);
  const [uid, setUid] = useState<string>("");

  const breakPoint: boolean = useMediaQuery("(max-width:600px)");

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    if (uid) {
      onSnapshot(collection(db, "users", uid, "goals"), (snapshot: any) => {
        const getGoal = snapshot.docs.map((doc: any) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setGoal(getGoal && getGoal[0]);
      });

      const graphQuery = query(
        collection(db, "users", uid, "graph"),
        orderBy("date", "desc")
      );
      onSnapshot(graphQuery, (snapshot: any) => {
        const getNow = snapshot.docs.map((doc: any) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setNow(getNow && getNow.shift());
      });
    }
  }, [uid]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setStartDay(null);
    setGoalDay(null);
    setGoalWeight(null);
    setGoalBodyFat(null);
    setOpen(false);
  };  

  const startDayChange = (e: any) => {
    setStartDay(dayjs(e).format("YYYY/MM/DD"));
  };

  const goalDayChange = (e: any) => {
    setGoalDay(dayjs(e).format("YYYY/MM/DD"));
  };

  const goalWeightChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setGoalWeight(parseFloat(e.target.value));
  };

  const goalBodyFatChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setGoalBodyFat(parseFloat(e.target.value));
  };

  const handleSaveClick = async (e: any) => {
    e.preventDefault();
    const updateGoals = doc(db, "users", uid, "goals", goal.id);
    await updateDoc(updateGoals, {
      startDay,
      goalDay,
      goalWeight,
      goalBodyFat,
    });
    handleClose();
  };

  const handleCreateClick = async () => {
    await addDoc(collection(db, "users", uid, "goals"), {
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

    if (!date || !goal) {
      return <p className="changeGoalfont">目標達成したい日が未登録です</p>;
    } else if (sameDate) {
      return <p className="changeGoalfont">目標の日になりました！</p>;
    } else if (date === 0) {
      return <p>{`${date + 1} 日`}</p>;
    } else if (date < 0) {
      return <p className="changeGoalfont">目標の日を過ぎました</p>;
    } else {
      return <p>{`${date + 1} 日`}</p>;
    }
  };

  const calcWeightDiff = () => {
    const nowWeight = now ? now.weight : false;
    const goalWeight = goal ? goal.goalWeight : false;
    const w = nowWeight - goalWeight;
    const weight = parseFloat(w.toFixed(1));
    if (!nowWeight || !goalWeight) {
      return <p className="changeGoalfont">目標または現在の数値が未登録です</p>;
    } else if (w <= 0) {
      return <p>目標達成！！</p>;
    } else {
      return <p>{`${weight} kg`}</p>;
    }
  };

  const calcBodyFatDiff = () => {
    const nowBodyFat = now ? now.bodyFat : false;
    const goalBodyFat = goal ? goal.goalBodyFat : false;
    const f = nowBodyFat - goalBodyFat;
    const bodyFat = parseFloat(f.toFixed(1));
    if (!bodyFat || !nowBodyFat || !goalBodyFat) {
      return <p className="changeGoalfont">目標または現在の数値が未登録です</p>;
    } else if (f <= 0) {
      return <p>目標達成！！</p>;
    } else {
      return <p>{`${bodyFat} %`}</p>;
    }
  };
  const dateDiff = calcDateDiff();
  const weightDiff = calcWeightDiff();
  const bodyFatDiff = calcBodyFatDiff();

  const handleLogout = async () => {
    await signOut(auth);
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
                "& > :not(style)": {
                  m: 1,
                  width: { xs: "180px", sm: "265px" },
                },
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
                onChange={(e)=>goalWeightChange(e)}
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
              {dateDiff}
              {weightDiff}
              {bodyFatDiff}
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
