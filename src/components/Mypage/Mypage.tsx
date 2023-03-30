import React, { useState } from "react";
import BasicButton from "../Tools/BasicButton";
import Menu from "../Menu/Menu";
import "./Mypage.css";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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
};

const Mypage = () => {
  // Modalの開閉
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Menu />
      <div className="container">
        <h1 className="pageTitle">My Page</h1>
        <div className="button">
          <BasicButton onClick={handleOpen}>目標を設定</BasicButton>
        </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Modal>

        <div className="flexBox">
          {/* 目標 */}
          <div className="goalBox">
            <dl>
              <dt>トレーニングを始めた日</dt>
              <dd>ccc</dd>
              <dt>目標達成したい日</dt>
              <dd>ccc</dd>
              <dt>目標体重</dt>
              <dd>ccc</dd>
              <dt>目標体脂肪率</dt>
              <dd>ccc</dd>
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
          <BasicButton>Logout</BasicButton>
        </div>
      </div>
    </>
  );
};

export default Mypage;
