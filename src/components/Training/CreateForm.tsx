import { useState } from "react";
import { TrainingFormModalStyle, SpTrainingFormModalStyle } from "../Tools/ModalStyle"
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import BasicButton from "../Tools/BasicButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Box, TextField, Typography, IconButton, Modal, useMediaQuery } from "@mui/material";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const CreateForm = (props: any) => {
  const { openModal, handleClose } = props;
  // ブレークポイント
  const breakPoint: boolean = useMediaQuery("(max-width:600px)");

  // トレーニング入力フォーム
  const [day, setDay] = useState<any>(null);
  const [menu, setMenu] = useState([
    {
      name: "",
      time: "",
      count: "",
    },
  ]);

  const dayChange = (e: any) => {
    setDay(dayjs(e).format("YYYY/MM/DD"));
  };

  const updateMenu = (targetData: any) => {
    const newMenu = menu.map((m: any, index: number) => {
      return index === targetData.index
        ? { ...m, [targetData.key]: targetData.value }
        : m;
    });
    setMenu(newMenu);
  };

  const addForm = () => {
    setMenu([
      ...menu,
      {
        name: "",
        time: "",
        count: "",
      },
    ]);
  };

  const deleteForm = (targetIndex: any) => {
    const removedMenuData = menu.filter((_: any, index: number) => {
      return targetIndex !== index;
    });
    setMenu(removedMenuData);
  };

  const handleSaveClick = async (e: any) => {
    e.preventDefault();
    await addDoc(collection(db, "training"), {
      day,
      menu: [...menu],
    });
    setDay(null);
    setMenu([
      {
        name: "",
        time: "",
        count: "",
      },
    ]);
    handleClose();
  };

  return (
    <>
      <Modal open={openModal} onClose={handleClose}>
        <Box sx={breakPoint ? SpTrainingFormModalStyle : TrainingFormModalStyle}>
          <Typography variant="h6" component="h6">
            トレーニングを追加
          </Typography>
          <Box sx={{ m: 1, textAlign: "left" }}>
            <Box sx={{ marginBottom: "10px" }}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                dateFormats={{ monthAndYear: "YYYY年 MM月" }}
              >
                <DatePicker
                  label="トレーニング日"
                  inputFormat="YYYY/MM/DD"
                  value={day}
                  onChange={dayChange}
                  renderInput={(params: any) => (
                    <TextField
                      sx={{ width: {xs: "180px", sm: "220px"}, marginTop: "20px" }}
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>

              <IconButton
                onClick={addForm}
                sx={{ fontSize: {xs: "12px", sm: "16px"}, marginTop: "25px", marginLeft: "10px" }}
              >
                メニューを追加
                <AddCircleOutlineIcon />
              </IconButton>
            </Box>
            {menu &&
              menu.map((_, index) => (
                <Box key={index}  sx={{marginBottom: "15px"}}>
                  <TextField
                    sx={{ width: {xs: "340px", sm: "285px"}}}
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
                    value={menu[index].name}
                  />
                  <TextField
                    sx={{ width: {xs: "105px", sm: "110px"}}}
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
                    value={menu[index].time}
                  />
                  <TextField
                    sx={{ width: "80px" }}
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
                    value={menu[index].count}
                  />
                  <IconButton
                    onClick={() => deleteForm(index)}
                    sx={{ marginTop: "8px" }}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </Box>
              ))}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                marginTop: "32px",
              }}
            >
              <BasicButton onClick={handleSaveClick}>保存</BasicButton>
              <BasicButton onClick={handleClose}>キャンセル</BasicButton>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CreateForm;
