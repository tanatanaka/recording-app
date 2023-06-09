import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import "./Training.css";
import Menu from "../Menu/MenuBar";
import { auth, db } from "../../firebase";
import CreateForm from "./CreateForm";
import EditForm from "./EditForm";

import {
  Box,
  IconButton,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BasicButton from "../Tools/BasicButton";

const Training = () => {

  const [uid, setUid] = useState<string>("");
  const [training, setTraining] = useState<any>([]);
  const [openModal, setOpenModal] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [editTraining, setEditTraining] = useState({});

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
      const trainingData = collection(db, "users", uid, "training");
      const q = query(trainingData, orderBy("day", "desc"));
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
    }
  }, [uid]);
  
  const navigate = useNavigate();

  const handleOpen = () => setOpenModal(true);

  const handleClose = () => setOpenModal(false);
 
  const handleEditClose = () => setOpenEditModal(false);

  return (
    <>
      <Menu />
      <div className="container">
        <h1 className="pageTitle">Training</h1>
        <div className="button">
          <BasicButton onClick={handleOpen}>トレーニングを入力</BasicButton>
        </div>

        {/* テーブル */}
        <TableContainer
          component={Paper}
          sx={{ width: { xs: "100%", sm: "90%" }, margin: "0 auto" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "18px", letterSpacing: "1.5px" }}>
                  Training List
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {training.length !== 0 ? (
                training.map((row: any) => (
                  <Row
                    key={row.day}
                    row={row}
                    setEditTraining={setEditTraining}
                    setOpenEditModal={setOpenEditModal}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell>トレーニング記録が未登録です</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <CreateForm uid={uid} openModal={openModal} handleClose={handleClose} />
        <EditForm
          uid={uid}
          openEditModal={openEditModal}
          handleEditClose={handleEditClose}
          editTraining={editTraining}
        />
      </div>
    </>
  );
};

export default Training;

const Row = (props: any) => {
  const { row, setEditTraining, setOpenEditModal } = props;
  const [open, setOpen] = useState(false);

  // 編集用Modalの開閉
  const handleEditOpen = (training: any) => {
    setEditTraining({ ...training });
    setOpenEditModal(true);
  };

  // トレーニング削除
  const handleDeleteClick = async (id: string) => {
    await deleteDoc(doc(db, "training", id));
  };

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "none",
            fontSize: { xs: "14px", sm: "17px" },
          },
        }}
      >
        <TableCell align="left">
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          {row.day}
        </TableCell>
        <TableCell align="right" sx={{ borderBottom: "none" }}>
          <IconButton onClick={() => handleEditOpen(row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(row.id)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ whiteSpace: "nowrap" }}>
                    <TableCell sx={{ width: "70%" }}>Menu</TableCell>
                    <TableCell sx={{ width: "15%" }}>Time</TableCell>
                    <TableCell sx={{ width: "15%" }}>Count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.menu &&
                    row.menu.map((historyRow: any) => (
                      <TableRow
                        key={historyRow.name}
                        sx={{
                          "& > *": { fontSize: { xs: "10px", sm: "14px" } },
                        }}
                      >
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
