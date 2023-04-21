import { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";

import { auth, db } from "../../firebase";
import Menu from "../Menu/MenuBar";
import "./Graph.css";
import { ModalStyle, SpModalStyle } from "../Tools/ModalStyle";
import BasicButton from "../Tools/BasicButton";

import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

import {
  Box,
  Typography,
  Modal,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const Graph = () => {
  const [uid, setUid] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [graphData, setGraphData] = useState<any>([]);

  const [date, setDate] = useState<any>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const [bodyFat, setBodyFat] = useState<number | null>(null);
  const [updateButton, setUpdateButton] = useState<boolean>(false);
  const [updateTarget, setUpdateTarget] = useState<any>(undefined);

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
      const q = query(
        collection(db, "users", uid, "graph"),
        orderBy("date", "asc")
      );
      onSnapshot(q, (snapshot: any) => {
        setGraphData(
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

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setDate(null);
    setWeight(null);
    setBodyFat(null);
    setOpen(false);
  };

  const dateChange = (e: any) => {
    const inputDate = dayjs(e).format("YYYY-MM-DD");
    const targetData = graphData.find((data: any) => inputDate === data.date);
    console.log(graphData.find((data: any) => inputDate === data.date));
    setDate(inputDate);
    if (targetData) {
      setUpdateButton(true);
      setUpdateTarget(targetData);
    } else {
      setUpdateButton(false);
    }
  };

  const weightChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setWeight(parseFloat(e.target.value));
  };

  const bodyFatChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setBodyFat(parseFloat(e.target.value));
  };

  const handleSaveClick = async (e: any) => {
    e.preventDefault();
    const updateData = doc(db, "users", uid, "graph", updateTarget.id);
    await updateDoc(updateData, {
      date,
      weight,
      bodyFat,
    });
    handleClose();
  };

  const handleCreateClick = async () => {
    await addDoc(collection(db, "users", uid, "graph"), {
      date,
      weight,
      bodyFat,
    });
    handleClose();
  };

  const options: any = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: true,
    plugins: {
      title: {
        display: false,
      },
    },
    scales: {
      weight: {
        type: "linear",
        display: true,
        position: "left",
      },
      bodyFat: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const data = {
    labels: graphData.map((date: any) => dayjs(date.date).format("MM/DD")),
    datasets: [
      {
        label: "体重",
        borderColor: "rgb(47, 132, 141)",
        backgroundColor: "rgba(47, 132, 141, 0.5)",
        data: graphData.map((label: any) => label.weight),
        yAxisID: "weight",
      },
      {
        label: "体脂肪率",
        borderColor: "rgb(220, 186, 220)",
        backgroundColor: "rgba(220, 186, 220, 0.5)",
        data: graphData.map((label: any) => label.bodyFat),
        yAxisID: "bodyFat",
      },
    ],
  };

  return (
    <div>
      <Menu />
      <div className="container">
        <h1 className="pageTitle">Graph</h1>
        <div className="graphButton">
          <BasicButton onClick={handleOpen}>
            体重・体脂肪率を記録する
          </BasicButton>
        </div>
        <div className="graph">
          <Line options={options} data={data} />
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={breakPoint ? SpModalStyle : ModalStyle}>
            <Typography variant="h6" component="h2">
              データを入力
            </Typography>
            <Box
              component="form"
              sx={{
                "& > :not(style)": {
                  m: 1,
                  width: { sx: "210px", sm: "265px" },
                },
                marginBottom: "20px",
              }}
            >
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                dateFormats={{ monthAndYear: "YYYY年 MM月" }}
              >
                <DatePicker
                  label="計測日"
                  inputFormat="YYYY/MM/DD"
                  value={date}
                  onChange={dateChange}
                  renderInput={(params: any) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <TextField
                label="体重"
                variant="outlined"
                type="number"
                onChange={weightChange}
              />
              <TextField
                label="体脂肪率"
                variant="outlined"
                type="number"
                onChange={bodyFatChange}
              />
            </Box>
            {updateButton ? (
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
                  ※既存のデータは上書きされます
                </Typography>
                <div className="saveButton">
                  <BasicButton onClick={handleSaveClick}>
                    データを上書き保存
                  </BasicButton>
                </div>
              </>
            ) : (
              <div className="saveButton">
                <BasicButton onClick={handleCreateClick}>
                  データを保存
                </BasicButton>
              </div>
            )}
            <BasicButton onClick={handleClose}>キャンセル</BasicButton>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Graph;
