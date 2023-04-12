import { useEffect, useState } from "react";
import Menu from "../Menu/Menu";
import "./Graph.css";
import dayjs from "dayjs";

import { Box, Typography, Modal, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { db } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";

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
import BasicButton from "../Tools/BasicButton";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid rgba(50, 87, 91, 0.8)",
  color: "rgba(50, 87, 91, 0.8)",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
  borderRadius: "5px",
};

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
  const [graphData, setGraphData] = useState<any>(undefined);
  useEffect(() => {
    const data = collection(db, "graph");
    const q = query(data);
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
  }, []);
  console.log(graphData);
  console.log(typeof graphData);
  const arr = [1, 2, 3, 4, 5, 6];
  console.log(arr);
  console.log(typeof arr);

  // Modalの開閉
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setDate(null);
    setWeight(null);
    setBodyFat(null);
    setOpen(false);
  };

  const [date, setDate] = useState<any>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const [bodyFat, setBodyFat] = useState<number | null>(null);
  const [updateButton, setUpdateButton] = useState<boolean>(false);
  const [updateTarget, setUpdateTarget] = useState<any>(undefined);

  const dateChange = (e: any) => {
    const inputDate = dayjs(e).format("YYYY-MM-DD");
    const targetData = graphData.find((data: any) => inputDate === data.date);
    setDate(inputDate)
    if (targetData) {
      setUpdateButton(true);
      setUpdateTarget(targetData);
    }
  };

  const weightChange = (e: any) => {
    e.preventDefault();
    setWeight(parseFloat(e.target.value));
  };

  const bodyFatChange = (e: any) => {
    e.preventDefault();
    setBodyFat(parseFloat(e.target.value));
  };

  const handleSaveClick = async (e: any) => {
    e.preventDefault();
    const updateData = doc(db, "graph", updateTarget && updateTarget.id);
    await updateDoc(updateData, {
      date,
      weight,
      bodyFat,
    });
    handleClose();
  };

  const handleCreateClick = async () => {
    await addDoc(collection(db, "graph"), {
      date,
      weight,
      bodyFat,
    });
    handleClose();
  };

  const options: any = {
    responsive: true,
    scales: {
      xAxes: [
        {
          display: true,
          type: "time",
          time: {
            unit: "day",
            displayFormats: {
              hour: "MM/DD",
            },
          },
          distribution: "series",
        },
      ],
    },
    plugins: {
      title: {
        display: true,
        text: "体重",
      },
    },
  };

  // const labelData =
  //   graphData &&
  //   graphData.map((data: any) => {
  //     return { date: data.date, value: data.weight };
  //   });

  const labels = [
    // ...labelData,
    { date: "2022-01-01", value: 10 },
    { date: "2022-01-02", value: 30 },
    { date: "2022-01-03", value: 70 },
  ];

  const data = {
    labels: labels.map((date) => dayjs(date.date).format("MM/DD")),
    datasets: [
      {
        label: "aaaaa",
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        data: labels.map((label) => label.value),
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
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              データを入力
            </Typography>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 2, width: "265px" },
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
                <BasicButton onClick={handleSaveClick}>
                  データを上書き保存
                </BasicButton>
              </>
            ) : (
              <BasicButton onClick={handleCreateClick}>
                データを保存
              </BasicButton>
            )}
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Graph;
