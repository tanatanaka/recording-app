import { useState } from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import BasicButton from "../Tools/BasicButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Box, TextField, Typography, IconButton, Modal } from "@mui/material";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 556,
  bgcolor: "background.paper",
   border: "1px solid rgba(50, 87, 91, 0.8)",
  color: "rgba(50, 87, 91, 0.8)",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
  borderRadius: "5px",
};

const EditForm = (props: any) => {
  const { openEditModal, handleEditClose, editTraining } = props;
  console.log(editTraining.menu)

  // トレーニング編集フォーム
  const [day, setDay] = useState<any>(editTraining.day);
  // 上手くいかない　editTraining.menu is not iterable
  const [editedMenu, setEditedMenu] = useState<any>([...editTraining.menu]);
  // 選択したデータの中身を確認するため一時的に記述
  console.log(editTraining)

  const dayChange = (e: any) => {
    setDay(dayjs(e).format("YYYY/MM/DD"));
  };

  const updateMenu = (targetData: any) => {
    const newMenu = editedMenu.map((m: any, index: number) => {
      return index === targetData.index
        ? { ...m, [targetData.key]: targetData.value }
        : m;
    });
    setEditedMenu(newMenu);
  };

  const addForm = () => {
    setEditedMenu([
      ...editedMenu,
      {
        name: "",
        time: "",
        count: "",
      },
    ]);
  };

  const deleteForm = (targetIndex: any) => {
    const removedMenuData = editTraining.menu.filter((_: any, index: number) => {
      return targetIndex !== index;
    });
    setEditedMenu(removedMenuData);
  };

  const handleSaveClick = async (e: any) => {
    e.preventDefault();
    const updatedTraining = doc(db, "training", editTraining.id);
    await updateDoc(updatedTraining, {
      day,
      menu: [...editedMenu],
    });
    handleEditClose();
  };

  return (
    <>
      <Modal
        open={openEditModal}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h6">
            トレーニングを編集
          </Typography>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, textAlign: "left" },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                dateFormats={{ monthAndYear: "YYYY年 MM月" }}
              >
                <DatePicker
                  label="トレーニング日"
                  inputFormat="YYYY/MM/DD"
                  value={day}
                  onChange={dayChange}
                  renderInput={(params: any) => <TextField
                    sx={{ width: "180px", marginTop: "20px" }}
                    {...params} />}
                />
              </LocalizationProvider>

              <IconButton onClick={addForm} sx={{ fontSize: "16px" }}>
                メニューを追加
                <AddCircleOutlineIcon />
              </IconButton>
            </Box>
            {editedMenu &&
              editedMenu.map((_: any, index: any) => (
                <Box key={index}>
                  <TextField
                    sx={{ width: "300px" }}
                    label="メニュー"
                    variant="outlined"
                    type="text"
                    onChange={(e) =>
                      updateMenu({
                        index,
                        key: "name",
                        value: e.target.value,
                      })
                    }
                    value={editedMenu[index].name}
                  />
                  <TextField
                    sx={{ width: "110px" }}
                    label="時間(分)"
                    variant="outlined"
                    type="number"
                    onChange={(e) =>
                      updateMenu({
                        index,
                        key: "time",
                        value: parseFloat(e.target.value),
                      })
                    }
                    value={editedMenu[index].time}
                  />
                  <TextField
                    sx={{ width: "90px" }}
                    label="回数"
                    variant="outlined"
                    type="number"
                    onChange={(e) =>
                      updateMenu({
                        index,
                        key: "count",
                        value: parseFloat(e.target.value),
                      })
                    }
                    value={editedMenu[index].count}
                  />
                  <IconButton onClick={() => deleteForm(index)}>
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </Box>
              ))}
            <BasicButton onClick={handleSaveClick}>保存</BasicButton>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default EditForm
