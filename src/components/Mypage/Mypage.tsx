import React, { useState, useEffect } from "react";
import BasicButton from "../Tools/BasicButton";
import Menu from "../Menu/Menu";
import "./Mypage.css";

import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { auth, db } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";


import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const Mypage = () => {
  // Modalの開閉
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setStartDay("");
    setGoalDay("");
    setGoalWeight(null);
    setGoalBodyFat(null);
    setOpen(false)
  };

  // 目標入力フォーム
  const [startDay, setStartDay] = useState<any>("");
  const [goalDay, setGoalDay] = useState<any>("");
  const [goalWeight, setGoalWeight] = useState<number | null>(null);
  const [goalBodyFat, setGoalBodyFat] = useState<number | null>(null);

  const startDayChange = (e: any) => {
    e.preventDefault();
    setStartDay(e.target.value);
  };

  const goalDayChange = (e: any) => {
    e.preventDefault();
    setGoalDay(e.target.value);
  };

  const goalWeightChange = (e: any) => {
    e.preventDefault();
    setGoalWeight(parseFloat(e.target.value));
  };

  const goalBodyFatChange = (e: any) => {
    e.preventDefault();
    setGoalBodyFat(parseFloat(e.target.value));
  };

  // 目標のデータ管理
  const [goal, setGoal] = useState<any>(undefined);

  useEffect(() => {
    const goalData = collection(db, "goals");
    const q = query(goalData);
    onSnapshot(q, (snapshot: any) => {
      const getGoal = snapshot.docs.map((doc: any) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      })
      setGoal(getGoal && getGoal[0]);
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
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              目標を入力
            </Typography>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 2, width: "265px" },
              }}
            ><LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="トレーニング開始日"
              value={startDay}
              onChange={startDayChange}
              // renderInput={(params: any) => <TextField {...params} />}
            />
          </LocalizationProvider>
              {/* <TextField
                label="トレーニング開始日"
                variant="outlined"
                type="date"
                onChange={startDayChange}
              /> */}
              <TextField
                label="目標終了日"
                variant="outlined"
                type="date"
                onChange={goalDayChange}
              />
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
              />
            </Box>
            <p>※既存の目標は上書きされます</p>
            {goal ? (
              <BasicButton onClick={handleSaveClick}>目標を上書き保存</BasicButton>
            ) : (
              <BasicButton onClick={handleCreateClick}>目標を新規作成</BasicButton>
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
              <p>{}日</p>
              <p>{}kg</p>
              <p>{}％</p>
            </div>
          </div>
        </div>

        <div className="logout">
          <BasicButton onClick={handleLogout}>Logout</BasicButton>
        </div>
      </div>
    </>
  );
};

export default Mypage;
