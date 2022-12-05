import { useEffect, useState } from "react";
import {
  Image,
  Container,
  Box,
  Stack,
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
} from "@chakra-ui/react";
import header from "./chronic cutie.jpg";
import "./index.css";
import { Checkbox } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import axios from "axios";
function App() {
  const [tasks, setTasks] = useState([]);
  const [taskLabel, setTaskLabel] = useState("");
  const [taskBadge, setTaskBadge] = useState("");

  const fetchTasks = async () => {
    let tasks = await axios.get("http://localhost:8080/tasks");
    console.log(tasks);
    setTasks(tasks.data);
  };

  const handleChange = async (e, task) => {
    e.preventDefault();
    let newTasks = [...tasks];
    if (e.target.checked) {
      task.completed = true;
    } else {
      task.completed = false;
    }
    newTasks.map((t) => {
      if (t._id === task._id) {
        return t;
      }
      return task;
    });
    setTasks(newTasks);
    await axios.patch(`http://localhost:8080/tasks/${task._id}/completed`, {
      completed: e.target.checked,
    });
  };

  const handleSubmitTask = async () => {
    let newTask = { label: taskLabel, img_src: taskBadge, completed: false };
    console.log(newTask);
    await axios.post("http://localhost:8080/tasks", newTask);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container bg="#B2A1ED" w="100%" p={4} color="white" centerContent>
      <Box bg="#B2A1ED" w="100%" p={4} color="white">
        <Image
          w="100vw"
          objectFit="fill"
          src={header}
          alt="Chronic Cutie Beanie"
        />
      </Box>
      <Stack bg="#AA7FD8" w="80vw" p={4} spacing={4}>
        <FormControl>
          <FormLabel>Cute Thing To Do</FormLabel>
          <Input
            onChange={(e) => setTaskLabel(e.target.value)}
            value={taskLabel}
            type="text"
            color="white"
          />
          <FormHelperText color="#AD1D5B">
            Whatever it is you need to do.
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Cute Badge of Completion</FormLabel>
          <Input
            onChange={(e) => setTaskBadge(e.target.value)}
            value={taskBadge}
            type="text"
            color="white"
          />
          <FormHelperText color="#AD1D5B">
            Fun Badge for cuteness (URL to image)
          </FormHelperText>
        </FormControl>
        <Button onClick={handleSubmitTask} colorScheme="blue">
          Add Cute Task
        </Button>
      </Stack>
      <Box w="85vw" p={4} color="white">
        {tasks.map((task) => {
          return (
            <Container
              key={task._id}
              bg="#713AA1"
              w="100%"
              p={4}
              color="white"
              centerContent
            >
              <Checkbox
                isChecked={task.completed}
                colorScheme="green"
                onChange={(e) => handleChange(e, task)}
              >
                {task.label}
              </Checkbox>
              {task.completed && (
                <Image
                  w="100vw"
                  objectFit="fill"
                  src={task.img_src}
                  alt={task.label}
                />
              )}
            </Container>
          );
        })}
      </Box>
    </Container>
  );
}

export default App;
