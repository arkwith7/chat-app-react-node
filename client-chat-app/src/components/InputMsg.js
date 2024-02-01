import React from "react";
import SendIcon from "@material-ui/icons/Send";
import { Paper, InputBase, IconButton, Container } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import Button from "./Button";

import { PuffLoader } from "react-spinners";

// import { ColorPicker } from "./theme";

import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    borderRadius: 22.5,
    padding: "4px 8px",
    boxShadow: "0 3px 4px 0 rgba(0, 0, 0, 0.14)",
    width: "60%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    paddingLeft: theme.spacing(2),
    fontSize: 14,
  },
  iconButton: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(0.5),
    backgroundColor: "#2D9BF0",
    "&:hover": {
      backgroundColor: fade(theme.palette.secondary.main, 0.25),
    },
    "& svg": {
      fill: theme.palette.common.white,
    },
  },
  container: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "coral",
    textAlign: "center",
    padding: "20px",
  },
}));
const InputMsg = ({ setMessage, sendMessage, message }) => {
  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  const microphoneOn = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: 'ko-KR'
    });
    setMessage("");
    toast.success("Microphone On", { autoClose: 1500 });
  };

  const microphoneOff = () => {
    SpeechRecognition.stopListening();
    // setMessage(transcript); // 현재 transcript 값을 message 상태에 설정
    sendMessage(transcript); // sendMessage 함수 호출하여 메시지 전송
    resetTranscript();
      toast.error("Microphone Off", { autoClose: 1500 });
  };

  const resetParagraph = () => {
    resetTranscript();
    toast.info("Paragraph was reseted", { autoClose: 1500 });
  };

  const Microphone = () => {
    return (
      <Button
        color={!listening ? "black" : "danger"}
        onClick={!listening ? microphoneOn : microphoneOff}
      >
      {!listening ? (
        <MicIcon style={{ color: 'black' }} />
      ) : (
        <MicOffIcon style={{ color: 'black' }} />
      )}
      </Button>
    );
  };

  const classes = useStyles();

  return (
    <Container className={classes.container}>

      <Paper className={classes.root}>

        <InputBase
          className={classes.input}
          placeholder="Type your thoughts here...."
          inputProps={{ "aria-label": "type message" }}
          onChange={(e) => {
            setMessage(e.target.value);
            console.log(message);
          }}
          onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
          value={listening ? transcript : message}
        />
      </Paper>
      <Microphone />

      <IconButton
        className={classes.iconButton}
        aria-label="send"
        onClick={(e) => sendMessage(e)}
      >
        <SendIcon />
      </IconButton>
    </Container>
  );
};

export default InputMsg;
