import React, { useEffect, useState } from "react";
import "./Training.css";
import Menu from "../Menu/Menu";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BasicButton from "../Tools/BasicButton";

import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "1px solid rgba(47, 132, 141, 0.8)",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const Training = () => {
  // firebaseから取得したtrainingのstate
  const [training, setTraining] = useState<any>([]);
  useEffect(() => {
    const trainingData = collection(db, "training");
    const q = query(trainingData);
    onSnapshot(q, (snapshot: any) => {
      setTraining(
        snapshot.docs.map((doc: any) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    });
  }, []);

  // Modalの開閉
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    setDay(null);
    setName("");
    setTime(null);
    setCount(null);
    setOpenModal(false);
  };

  // トレーニング入力フォーム
  const [day, setDay] = useState<any>(null);
  const [name, setName] = useState<string>("");
  const [time, setTime] = useState<number | null>(null);
  const [count, setCount] = useState<number | null>(null);
  // 項目ごとのオブジェクトを要素に持つ配列を作成
  const [menu, setMenu] = useState<any>([]);

  const dayChange = (e: any) => {
    e.preventDefault();
    setDay(e.target.value);
  };

  const nameChange = (e: any) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const timeChange = (e: any) => {
    e.preventDefault();
    setTime(e.target.value);
  };

  const countChange = (e: any) => {
    e.preventDefault();
    setCount(e.target.value);
  };

  const handleSaveClick = async () => {
    await addDoc(collection(db, "training"), {
      day,
      menu: [
        ...menu,
        {
          name,
          time,
          count,
        },
      ],
    });
    handleClose();
  };

  // テーブル
  const createData = (date: string) => {
    return {
      date,
      history: [
        {
          name: "ランニング",
          time: 40,
          count: null,
        },
        {
          name: "ランニング",
          time: 40,
          count: null,
        },
      ],
    };
  };

  const Row = (props: { row: any }) => {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <div className="tableFlex">
          <TableRow
            sx={{
              "& > *": { borderBottom: "none", fontSize: "18px" },
            }}
          >
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
              {row.day}
            </TableCell>
          </TableRow>

          {/* 右端表示、引数指定分からない */}
          <TableRow
            sx={{
              "& > *": { borderBottom: "none", fontSize: "18px" },
            }}
          >
            <TableCell>
              <EditIcon />
            </TableCell>
            <TableCell>
              <DeleteIcon />
            </TableCell>
          </TableRow>
        </div>

        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Menu</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Count</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.menu.map((historyRow: any) => (
                      <TableRow key={historyRow.name}>
                        <TableCell component="th" scope="row">
                          {historyRow.name}
                        </TableCell>
                        <TableCell>{historyRow.time}</TableCell>
                        <TableCell>{historyRow.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

  // trainingから日付だけ取り出す処理をすればいい？
  const rows = [createData("2023/4/1")];

  return (
    <>
      <Menu />
      <div className="container">
        <h1 className="pageTitle">Training</h1>
        <div className="button">
          <BasicButton onClick={handleOpen}>トレーニングを入力</BasicButton>
        </div>

        {/* テーブル */}
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "18px", letterSpacing: "1.5px" }}>
                  Training List
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {training.map((row: any) => (
                <Row key={row.day} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* モーダルウィンドウ */}
        <Modal
          open={openModal}
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
                "& > :not(style)": { m: 1, textAlign: "left" },
              }}
            >
              <TextField
                sx={{ width: "180px" }}
                label="トレーニング日"
                variant="outlined"
                type="date"
                onChange={dayChange}
              />
              <TextField
                sx={{ width: "300px" }}
                label="メニュー"
                variant="outlined"
                type="text"
                onChange={nameChange}
              />
              <TextField
                sx={{ width: "110px" }}
                label="時間(分)"
                variant="outlined"
                type="number"
                onChange={timeChange}
              />
              <TextField
                sx={{ width: "90px" }}
                label="回数"
                variant="outlined"
                type="number"
                onChange={countChange}
              />
            </Box>
            <BasicButton onClick={handleSaveClick}>保存</BasicButton>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Training;
