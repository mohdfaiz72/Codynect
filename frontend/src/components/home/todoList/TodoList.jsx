import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import DropdownMenu from "./DropdownMenu";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../datepicker.css";
import { MoreVertical } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";
import {
  addTodo,
  deleteTodo,
  updateTodo,
  setTodos,
} from "../../../store/todoSlice";

const TodoList = () => {
  const [task, setTask] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const dispatch = useDispatch();

  const { todos, isLoaded } = useSelector((store) => store.todo);

  const fetchTask = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/todo/`, {
        withCredentials: true,
      });
      dispatch(setTodos(res.data.todos));
    } catch (err) {
      console.error(
        "Failed to fetch tasks: " + (err.response?.data?.message || err.message)
      );
    }
  };

  useEffect(() => {
    if (!isLoaded) {
      fetchTask();
    }
  }, []);

  const handleSubmitTask = (id) => {
    if (task.trim() !== "" && selectedDate && selectedTime) {
      const combinedDateTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        selectedTime.getHours(),
        selectedTime.getMinutes()
      );

      const formattedDate = format(combinedDateTime, "yyyy-MM-dd");
      const formattedTime = format(combinedDateTime, "hh:mm aa");

      const newTask = {
        task: task.trim(),
        date: formattedDate,
        time: formattedTime,
        isCompleted: false,
      };

      if (id !== null) {
        updateTask(id, newTask);
      } else {
        addTask(newTask);
      }
      setTask("");
      setSelectedDate(null);
      setSelectedTime(null);
    }
  };

  const addTask = async (newTask) => {
    try {
      const res = await axios.post(`${BASE_URL}/todo/`, newTask, {
        withCredentials: true,
      });
      dispatch(addTodo(res.data.todo));
    } catch (err) {
      console.error(
        "Failed to save: " + (err.response?.data?.message || err.message)
      );
    }
  };

  const updateTask = async (id, newTask) => {
    try {
      const res = await axios.patch(`${BASE_URL}/todo/${id}`, newTask, {
        withCredentials: true,
      });
      dispatch(updateTodo(res.data.todo));
      setEditingId(null);
    } catch (err) {
      console.error(
        "Failed to update: " + (err.response?.data?.message || err.message)
      );
    }
  };

  const CompleteTask = (id) => {
    const todo = todos.find((todo) => todo._id === id);
    if (!todo) return alert("Todo not found");
    const updatedTodo = { ...todo, isCompleted: true };
    dispatch(updateTodo(updatedTodo));
    setTimeout(() => {
      deleteTask(id);
    }, 600);
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/todo/${id}`, {
        withCredentials: true,
      });
      dispatch(deleteTodo(id));
    } catch (err) {
      console.error(
        "Failed to delete: " + (err.response?.data?.message || err.message)
      );
    }
  };

  const editTask = (id) => {
    const todo = todos.find((todo) => todo._id === id);
    setTask(todo.task);
    setSelectedDate(new Date(todo.date));
    const [hours, minutes, ampm] = todo.time
      .replace(/ /g, "")
      .match(/(\d+):(\d+)(am|pm)/i)
      .slice(1);
    const time = new Date();
    time.setHours(
      ampm.toLowerCase() === "pm"
        ? (parseInt(hours) % 12) + 12
        : parseInt(hours) % 12
    );
    time.setMinutes(parseInt(minutes));
    setSelectedTime(time);
    setEditingId(id);
  };

  function convertTo24Hour(time12h) {
    const [time, modifier] = time12h.split(" "); // e.g. ["09:30", "AM"]
    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }
    if (modifier.toUpperCase() === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    // pad hours if needed
    hours = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  return (
    <div className="bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 p-4 rounded-lg border border-amber-700">
      <h3 className="text-amber-400 font-semibold text-lg mb-3">
        ✅ My To-Do List
      </h3>

      <div className="space-y-2 mb-3">
        <input
          type="text"
          placeholder="Task name..."
          className="w-full bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 border border-amber-700 text-slate-200 text-sm px-3 py-1.5 rounded-md transition duration-200 outline-none focus:border-2 focus:border-purple-600"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <div className="flex flex-row gap-4 items-center mb-4">
          {/* 📅 Date Picker (date only) */}
          <div className="flex-1">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              showDateSelect
              popperPlacement="bottom-start"
              dateFormat="dd MMM yyyy"
              placeholderText="Select Date"
              className="w-full bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-sm text-amber-200 px-2 py-1.5 rounded border border-amber-700 outline-none"
              minDate={new Date()} // disables past dates
            />
          </div>

          {/* ⏰ Time Picker (time only) */}
          <div className="flex-1">
            <DatePicker
              selected={selectedTime}
              onChange={(time) => setSelectedTime(time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              placeholderText="Select Time"
              className="w-full bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-sm text-amber-200 px-2 py-1.5 rounded border border-amber-700 outline-none"
              minTime={
                selectedDate?.toDateString() === new Date().toDateString()
                  ? new Date()
                  : new Date(0, 0, 0, 0, 0)
              }
              maxTime={new Date(0, 0, 0, 23, 45)}
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => handleSubmitTask(editingId)}
        className="w-1/2 flex items-center justify-center mx-auto py-1.5 rounded-full font-semibold text-sm bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500 shadow-md hover:scale-105 transition duration-200"
      >
        {editingId !== null ? <>Save Task</> : <>Add Task</>}
      </button>

      <ul className="space-y-3 mt-4 text-sm text-slate-200 overflow-y-auto pr-1 scrollbar-hide">
        {todos.length === 0 ? (
          <p className="text-slate-500 italic">No tasks yet.</p>
        ) : (
          [...todos]
            .sort((a, b) => {
              const aTime24 = convertTo24Hour(a.time);
              const bTime24 = convertTo24Hour(b.time);

              const aDate = new Date(`${a.date}T${aTime24}`);
              const bDate = new Date(`${b.date}T${bTime24}`);

              return aDate - bDate;
            })

            .map((todo) => {
              const deadline = new Date(`${todo.date} ${todo.time}`);
              const isOverdue = !todo.isCompleted && deadline < new Date();

              return (
                <li
                  key={todo._id}
                  className={`relative p-3 rounded-md border border-amber-700 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 shadow-md hover:border-purple-600 transition duration-200 group ${
                    todo.isCompleted ? "opacity-50" : ""
                  }`}
                >
                  {/* Dropdown & buttons */}
                  <div className="absolute top-2 right-2 z-10">
                    <button
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setDropdownPos({
                          top: rect.bottom + window.scrollY - 4,
                          left: rect.right + window.scrollX - 120,
                        });
                        setMenuOpenId(
                          menuOpenId === todo._id ? null : todo._id
                        );
                      }}
                    >
                      <MoreVertical
                        className="text-slate-400 hover:text-white"
                        size={18}
                      />
                    </button>
                  </div>

                  {menuOpenId === todo._id && (
                    <DropdownMenu
                      position={dropdownPos}
                      onEdit={() => {
                        editTask(todo._id);
                        setMenuOpenId(null);
                      }}
                      onDelete={() => {
                        deleteTask(todo._id);
                        setMenuOpenId(null);
                      }}
                      onDone={() => {
                        CompleteTask(todo._id);
                        setMenuOpenId(null);
                      }}
                      showDone={!todo.isCompleted}
                    />
                  )}

                  {/* Task Info */}
                  <div className="flex-1">
                    <p
                      className={`font-medium text-sm ${
                        todo.isCompleted
                          ? "line-through text-slate-400"
                          : isOverdue
                          ? "text-red-500"
                          : "text-white"
                      }`}
                    >
                      🎯 {todo.task}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        isOverdue
                          ? "text-red-400 font-semibold"
                          : "text-amber-400"
                      }`}
                    >
                      ⏳{" "}
                      {format(
                        new Date(`${todo.date} ${todo.time}`),
                        "EEE, dd MMM yyyy, h:mm a"
                      )}
                      {isOverdue && " (Overdue)"}
                    </p>
                  </div>
                </li>
              );
            })
        )}
      </ul>
    </div>
  );
};

export default TodoList;
