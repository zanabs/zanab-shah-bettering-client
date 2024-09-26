import { Box, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"
import Markdown from "react-markdown";

export const AiSuggester = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [loadingAi, setLoadingAi] = useState(false);
    const [aiMessages, setAiMessages] = useState([]);

    useEffect(() => {
        const patient = localStorage.getItem('selectedPatient');
        if (patient) {
            setSelectedPatient(JSON.parse(patient)); 
        }
      }, []);

    const handleAiClick = async () => {
        setLoadingAi(true);
        const startThread = async () => {
            try {
              const response = await axios.get(`${apiUrl}/ai/start-thread`);
              console.log(response.data);
              return response.data;
            } catch (error) {
              console.error('Error fetching data from the server:', error);
            }
        };

        const sendMessage = async (threadId) => {
            console.log(1);
            try {
              const response = await axios.post(`${apiUrl}/ai/send-message`, {
                    threadId,
                    content: JSON.stringify(selectedPatient)
              });
              console.log(2);
            } catch (error) {
              console.error('Error fetching data from the server:', error);
            }
        };

        const runThread = async (threadId) => {
            console.log(2);
            try {
              const response = await axios.post(`${apiUrl}/ai/run`, {
                threadId
              });
              console.log(response);
              return response.data;
            } catch (error) {
              console.error('Error fetching data from the server:', error);
            }
            console.log(4);
        };

        const getMessages = async (threadId, run) => {
            console.log(run);
            try {
                if(run.status === 'incomplete') {
                    const response = await axios.post(`${apiUrl}/ai/poll`, {
                        threadId,
                        runId: run.id
                  });

                  getMessages(threadId, response.data.id);
                } else {
                    const response = await axios.post(`${apiUrl}/ai/messages`, {
                        threadId,
                        runStatus: 'completed'
                   });
                   return response.data;
                }
            } catch (error) {
              console.error('Error fetching data from the server:', error);
            }
        };
        const threadId = await startThread();
        console.log(threadId);
        await sendMessage(threadId);
        const run = await runThread(threadId);
        const messages = await getMessages(threadId, run);
        setAiMessages(messages);
        setLoadingAi(false);
    }

    return (
        <Box display={'flex'} justifyContent={'center'} alignItems={'left'} p={'5%'} flexDirection={'column'}>
            {!selectedPatient ? 
                <Button variant='contained'>Select a patient to refer</Button> : 
                <Box gap={2} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <Button variant='contained' onClick={handleAiClick}>Ask AI to make a suggestion based on the user's ({selectedPatient.name}) profile</Button>
                    {loadingAi && <CircularProgress />}
                </Box>
            }
            {aiMessages && aiMessages[1] && 
                <Box textAlign={'left'}>
                    <Markdown>{(aiMessages[1].content[0].text.value)}</Markdown>
                </Box>
            }
        </Box>
    )
}