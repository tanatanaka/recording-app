import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
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
  border: "1px solid rgba(47, 132, 141, 0.8)",
  boxShadow: 24,
  padding: 4,
  textAlign: "center",
};

type Menu = [
  {
    name: string;
    time: number | null;
    count: number | null;
  }
];

const CreateForm = (props: any) => {
  const { openModal, handleClose } = props;

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

  const deleteForm = (targetIndex: number) => {
    const removedMenuData = menu.filter((_: any, index: number) => {
      return targetIndex !== index;
    });
    setMenu(removedMenuData);
  };

  const handleSaveClick = async () => {
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
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h6">
            トレーニングを追加
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
            {menu &&
              menu.map((_, index) => (
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
                    value={menu[index].name}
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
                    value={menu[index].time}
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
                    value={menu[index].count}
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

export default CreateForm;
