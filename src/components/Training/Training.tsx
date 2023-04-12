import React, { useEffect, useState } from "react";
import "./Training.css";
import Menu from "../Menu/Menu";

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
  Typography,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BasicButton from "../Tools/BasicButton";

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";
import CreateForm from "./CreateForm";
import EditForm from "./EditForm";

const Training = () => {
  // 登録用Modalの開閉
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

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

  // トレーニング削除
  const handleDeleteClick = async (id: string) => {
    await deleteDoc(doc(db, "training", id));
  };

  // 編集用Modalの開閉
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editTraining, setEditTrainig] = useState({});
  const handleEditOpen = (training: any) => {
    setOpenEditModal(true);
    setEditTrainig({ ...training });
  };
  const handleEditClose = () => setOpenEditModal(false);

  const Row = (props: { row: any }) => {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow
          sx={{
            "& > *": { borderBottom: "none", fontSize: "17px" },
          }}
        >
          <TableCell align="left">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            {row.day}
          </TableCell>
          <TableCell>
            <IconButton onClick={() => handleEditOpen(row)} >
              <EditIcon/>
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
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Menu</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Count</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.menu &&
                      row.menu.map((historyRow: any) => (
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
          sx={{ width: "90%", margin: "0 auto" }}
        >
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "18px", letterSpacing: "1.5px" }}>
                  Training List
                </TableCell>
                <TableCell />
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {training.length !== 0 ? (
                training.map((row: any) => <Row key={row.day} row={row} />)
              ) : (
                <TableRow>
                  <TableCell>トレーニング記録が未登録です</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <CreateForm openModal={openModal} handleClose={handleClose} />
        <EditForm
          openEditModal={openEditModal}
          handleEditClose={handleEditClose}
          editTraining={editTraining}
        />
      </div>
    </>
  );
};

export default Training;
