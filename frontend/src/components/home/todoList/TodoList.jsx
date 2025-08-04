import { useState } from "react";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../datepicker.css";
import { createPortal } from "react-dom";
import { MoreVertical, Check, Trash2, Pencil } from "lucide-react";

const DropdownMenu = ({ position, onEdit, onDelete, onDone, showDone }) => {
  const menu = (
    <div
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        zIndex: 9999,
      }}
      className="w-28 bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 text-sm text-white rounded-xl shadow-lg border border-amber-700 p-2"
    >
      <button
        className="w-full flex items-center px-2 py-1 text-sm text-white hover:text-amber-300 hover:bg-slate-800 rounded-full transition shadow hover:scale-105 duration-200"
        onClick={onEdit}
      >
        <Pencil size={14} className="mr-2 text-amber-400" /> Edit
      </button>
      <button
        className="w-full flex items-center px-2 py-1 text-sm text-red-400 hover:text-red-300 hover:bg-red-900 rounded-full transition shadow hover:scale-105 duration-200"
        onClick={onDelete}
      >
        <Trash2 size={14} className="mr-2 text-red-400" /> Remove
      </button>
      {showDone && (
        <button
          className="w-full flex items-center px-2 py-1 text-sm text-slate-200 hover:bg-purple-800 rounded-full transition shadow hover:scale-105 duration-200"
          onClick={onDone}
        >
          <Check size={14} className="mr-2 text-green-400" /> Done
        </button>
      )}
    </div>
  );

  return createPortal(menu, document.body);
};
const TodoList = () => {
  const [task, setTask] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [todos, setTodos] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

  const addTask = () => {
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
        text: task.trim(),
        date: formattedDate,
        time: formattedTime,
        completed: false,
      };

      if (editingIndex !== null) {
        const updated = [...todos];
        updated[editingIndex] = newTask;
        setTodos(updated);
        setEditingIndex(null);
      } else {
        setTodos([...todos, newTask]);
      }

      setTask("");
      setSelectedDate(null);
      setSelectedTime(null);
    }
  };
  const toggleComplete = (index) => {
    const updated = [...todos];
    updated[index].completed = true;
    setTodos(updated);
    setTimeout(() => {
      setTodos((prev) => prev.filter((_, i) => i !== index));
    }, 600);
  };

  const deleteTask = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    const todo = todos[index];
    setTask(todo.text);
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
    setEditingIndex(index);
  };

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
        onClick={addTask}
        className="w-1/2 flex items-center justify-center mx-auto py-1.5 rounded-full font-semibold text-sm bg-amber-600 hover:bg-amber-500 shadow-md hover:scale-105 transition duration-200"
      >
        {editingIndex !== null ? <>Save Task</> : <>Add Task</>}
      </button>

      <ul className="space-y-3 mt-4 text-sm text-slate-200 max-h-52 overflow-y-auto pr-1 scrollbar-hide">
        {todos.length === 0 ? (
          <p className="text-slate-500 italic">No tasks yet.</p>
        ) : (
          todos
            .sort(
              (a, b) =>
                new Date(`${a.date} ${a.time}`) -
                new Date(`${b.date} ${b.time}`)
            )
            .map((todo, idx) => {
              const deadline = new Date(`${todo.date} ${todo.time}`);
              const isOverdue = !todo.completed && deadline < new Date();

              return (
                <li
                  key={idx}
                  className={`relative p-3 rounded-md border border-amber-700 bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 shadow-md hover:border-purple-600 transition duration-200 group ${
                    todo.completed ? "opacity-50" : ""
                  }`}
                >
                  {/* Dropdown & buttons */}
                  <div className="absolute top-2 right-2 z-10">
                    <button
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setDropdownPos({
                          top: rect.bottom + window.scrollY + 4,
                          left: rect.right + window.scrollX - 130,
                        });
                        setMenuOpenIndex(menuOpenIndex === idx ? null : idx);
                      }}
                    >
                      <MoreVertical
                        className="text-slate-400 hover:text-white"
                        size={18}
                      />
                    </button>
                  </div>

                  {menuOpenIndex === idx && (
                    <DropdownMenu
                      position={dropdownPos}
                      onEdit={() => {
                        editTask(idx);
                        setMenuOpenIndex(null);
                      }}
                      onDelete={() => {
                        deleteTask(idx);
                        setMenuOpenIndex(null);
                      }}
                      onDone={() => {
                        toggleComplete(idx);
                        setMenuOpenIndex(null);
                      }}
                      showDone={!todo.completed}
                    />
                  )}

                  {/* Task Info */}
                  <div className="flex-1">
                    <p
                      className={`font-medium text-sm ${
                        todo.completed
                          ? "line-through text-slate-400"
                          : isOverdue
                          ? "text-red-500"
                          : "text-white"
                      }`}
                    >
                      🎯 {todo.text}
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
