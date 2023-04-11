import React, { useState, useReducer } from 'react'
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import BasicButton from '../Tools/BasicButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Box, TextField, Typography, IconButton } from '@mui/material';

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 520,
  bgcolor: "background.paper",
  border: "1px solid rgba(47, 132, 141, 0.8)",
  boxShadow: 24,
  padding: 4,
  textAlign: "center"
};

type Menu = {
  name: string
  time: number | null
  count: number | null
}

type MenuKeyValue = 
  |  {
      key: "name"
      value: string
    }
  |  {
      key: "time"
      value: number | null
    }
    |  {
      key: "count"
      value: number | null
    }

type RrducerAction = 
  | ({
      type: 'SET'
      index: number
    } & MenuKeyValue)
  | { type: 'ADD' }
  | {
      type: 'REMOVE'
      index: number
    }



const initialState: Menu = {
  name: "",
  time: null,
  count: null
}

const reducer = (state: Menu[], action: RrducerAction) => {
  switch (action.type) {
    // 現在の配列の後ろにオブジェクトを追加
    case "ADD" :
      return [...state, initialState];

    // 配列内のindexで指定したオブジェクトのkeyにvalueをセットする
    case "SET" :
      return [
        ...state.slice(0, action.index),
        { ...state[action.index], [action.key]: action.value },
        ...state.slice(action.index + 1),
      ]
    
    // 配列内のindexで指定したオブジェクトを配列から削除する
    case 'REMOVE':
      return [...state.slice(0, action.index), ...state.slice(action.index + 1)]

    default:
      return state
  }
};

const CreateForm = (props: any) => {
  const { handleClose } = props;

  const [state, dispatch] = useReducer(reducer, [initialState]);

  // トレーニング入力フォーム
  const [day, setDay] = useState<any>(null);
  // const [name, setName] = useState<string>("");
  // const [time, setTime] = useState<number | null>(null);
  // const [count, setCount] = useState<number | null>(null);
  // 項目ごとのオブジェクトを要素に持つ配列を作成
  // const [menu, setMenu] = useState<any>([]);

  const dayChange = (e: any) => {
    e.preventDefault();
    setDay(e.target.value);
  };

  // const nameChange = (e: any) => {
  //   e.preventDefault();
  //   setName(e.target.value);
  // };

  // const timeChange = (e: any) => {
  //   e.preventDefault();
  //   setTime(e.target.value);
  // };

  // const countChange = (e: any) => {
  //   e.preventDefault();
  //   setCount(e.target.value);
  // };

  const handleSaveClick = async () => {
    await addDoc(collection(db, "training"), {
      day,
      menu: [...state],
    });
    setDay(null);
    // setName("");
    // setTime(null);
    // setCount(null);
    handleClose();
  };

  return (
    <>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          トレーニングを追加
        </Typography>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, textAlign: "left", },
          }}
        >

        <Box>
          <TextField
            sx={{ width: "180px", marginTop: "20px" }}
            label="トレーニング日"
            variant="outlined"
            type="date"
            onChange={dayChange}
          />
        </Box>
          {state.map((_, index) => (
            <InputMenu
            index={index}
            inputs={inputs}
            dispatch={dispatch}
            key={index}
            />
          ))}
          <IconButton onClick={() => dispatch({ type: 'ADD' })}>
            メニューを追加<AddCircleOutlineIcon/>
          </IconButton>
          <BasicButton onClick={handleSaveClick}>保存</BasicButton>
        </Box>
      </Box>
    </>
  )
}


const InputMenu = ({
  index,
  inputs,
  dispatch,
}: {
  index: number
  inputs: Menu[]
  // お手本と型違う
  dispatch: React.Dispatch<any>
}) => {
  return (
    <>
      <Box>
        <TextField
          sx={{ width: "300px" }}
          label="メニュー"
          variant="outlined"
          type="text"
          onChange={(e) =>
            dispatch({
              type: 'set',
              index: index,
              key: 'name',
              value: e.target.value,
            })
          }
          value={inputs[index].name}
        />
        <TextField
          sx={{ width: "110px" }}
          label="時間(分)"
          variant="outlined"
          type="number"
          onChange={(e) =>
            dispatch({
              type: 'set',
              index: index,
              key: 'time',
              value: Number(e.target.value),
            })
          }
          value={inputs[index].time}
        />
        <TextField
          sx={{ width: "90px" }}
          label="回数"
          variant="outlined"
          type="number"
          onChange={(e) =>
            dispatch({
              type: 'set',
              index: index,
              key: 'count',
              value: Number(e.target.value),
            })
          }
          value={inputs[index].count}
        />
        <IconButton onClick={() => dispatch({ type: 'remove', index })}>
          <RemoveCircleOutlineIcon/>
        </IconButton>
      </Box>
    </>     
  )
}

{/* <Box sx={{display: "flex", flexDirection: "column"}}>
        <Box>
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
        <Box>
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
        <Box>
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
            sx={{ width: "90px", marginBottom: "20px" }}
            label="回数"
            variant="outlined"
            type="number"
            onChange={countChange}
          />
        </Box>
      </Box>       */}

export default CreateForm
