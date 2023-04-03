import React, { useState } from "react";
import "./Training.css";
import Menu from "../Menu/Menu";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BasicButton from "../Tools/BasicButton";

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

const Training = () => {
  // 入力したtrainingのstate
  const [training, setTraining] = useState<any>([]);

  // Modalの開閉
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // トレーニング入力フォーム
  const [day, setDay] = useState();
  const [menu, setMenu] = useState<string>("");

  const dayChange = (e: any) => {
    e.preventDefault();
    setDay(e.target.value);
  };

  const menuChange = (e: any) => {
    e.preventDefault();
    setMenu(e.target.value);
  };

  const handleSaveClick = () => {
    setTraining([
      ...training,
      {
        id: training.length + 1,
        date: day,
        menu: menu,
      },
    ]);
    setMenu("");
    handleClose();
  };

  // トレーニング詳細の開閉state
  const [detail, setDetail] = useState(false);

  const detailChange = () => {
    setDetail(!detail);
  };

  // 削除ボタン
  const handleDeleteClick = (id: any) => {
    const newTraining = training.filter((t: any) => {
      return t.id !== id
    })
    setTraining(newTraining);
  }

  // 編集ボタンを押したとき
  // 編集画面を開くかどうかのstate
  const [isEdit, setIsEdit] = useState<boolean>(false);

  // 編集用のtodoとしてセットするstate
  const [editTraining, setEditTraining] = useState<any>({});



  return (
    <>
      <Menu />
      <div className="container">
        <h1 className="pageTitle">Training</h1>
        <div className="button">
          <BasicButton onClick={handleOpen}>トレーニングを入力</BasicButton>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              トレーニングを追加
            </Typography>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 2, width: "265px" },
              }}
            >
              <TextField
                label="トレーニングをした日"
                variant="outlined"
                type="date"
                onChange={dayChange}
              />
              <TextField
                label="メニュー"
                variant="outlined"
                type="text"
                onChange={menuChange}
              />
            </Box>
            <Button onClick={handleSaveClick}>保存</Button>
          </Box>
        </Modal>

        {training.map((t: any) => (
          <div className="trainingList">
            <li key={t.id}>
              <button onClick={detailChange}>
                <ExpandMoreIcon />
              </button>
              <span>{t.date}</span>
              <button>
                <EditIcon />
              </button>
              <button onClick={() => handleDeleteClick(t.id)}>
                <DeleteIcon />
              </button>

              {detail && (
                <div className="detailList">
                  <li key={t.date}>{t.menu}</li>
                </div>
              )}
            </li>
          </div>
        ))}
      </div>
    </>
  );
};

export default Training;
