import { useEffect, useState } from "react";
import axios from "axios";
import {
  format,
  addDays,
  addMinutes,
  addWeeks,
  startOfWeek,
  subWeeks,
} from "date-fns";
import { BASE_URL } from "../../../utils/constants";

const ExploreEvents = () => {
  const [weekStart, setWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 0 }) // Week starts on Sunday
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventsByDate, setEventsByDate] = useState({});

  const fetchContests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/external/contests`);
      const data = res.data;

      const newEvents = {};

      for (const contest of data) {
        const start = addMinutes(contest.start, 330);
        const dateKey = format(start, "yyyy-MM-dd");
        if (!newEvents[dateKey]) newEvents[dateKey] = [];

        newEvents[dateKey].push({
          event: contest.event,
          start: format(start, "hh:mm a"),
          end: format(addMinutes(contest.end, 330), "hh:mm a"),
          href: contest.href,
          resource: contest.resource,
        });
      }

      setEventsByDate(newEvents);
    } catch (err) {
      console.error("Failed to fetch contests:", err);
    }
  };

  useEffect(() => {
    fetchContests();
  }, []);

  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const formattedSelected = format(selectedDate, "yyyy-MM-dd");
  const todaysEvents = eventsByDate[formattedSelected] || [];

  const goToNextWeek = () => setWeekStart((prev) => addWeeks(prev, 1));
  const goToPrevWeek = () => setWeekStart((prev) => subWeeks(prev, 1));

  const formatRange = () =>
    `${format(weekDates[0], "dd MMM")} - ${format(weekDates[6], "dd MMM")}`;

  return (
    <div className="bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900 p-4 rounded-lg border border-amber-700 mb-3">
      {/* Title */}
      <h3 className="text-amber-400 font-semibold mb-2 text-lg flex items-center gap-2">
        📅 Explore Events
      </h3>

      {/* Week Navigator */}
      <div className="flex items-center justify-between mb-2 px-2">
        <button
          onClick={goToPrevWeek}
          className="text-amber-400 hover:text-amber-200 text-2xl px-2"
        >
          &lt;
        </button>
        <span className="text-slate-300 text-sm">{formatRange()}</span>
        <button
          onClick={goToNextWeek}
          className="text-amber-400 hover:text-amber-200 text-2xl px-2"
        >
          &gt;
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 text-center mb-2">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
          <div key={day} className="text-xs text-slate-200">
            {day}
          </div>
        ))}
      </div>

      {/* Date Selector */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {weekDates.map((date, i) => {
          const isSelected = format(date, "yyyy-MM-dd") === formattedSelected;
          return (
            <button
              key={i}
              onClick={() => setSelectedDate(date)}
              className={`text-sm px-2 py-1 rounded-full transition duration-200 shadow-sm hover:scale-105 ${
                isSelected
                  ? "bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-500 text-slate-900 hover:to-amber-700"
                  : "bg-slate-800 hover:bg-slate-700 text-amber-300"
              }`}
            >
              {format(date, "dd")}
            </button>
          );
        })}
      </div>

      {/* Event List */}
      <div>
        <h4 className="text-sm text-amber-400 mb-2">
          Events on {format(selectedDate, "do MMMM, yyyy")}
        </h4>

        {todaysEvents.length > 0 ? (
          <div className="flex flex-col gap-3">
            {todaysEvents.map((event, i) => (
              <div
                key={i}
                className="border border-amber-700 rounded-md bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 shadow-md hover:border-purple-600 transition duration-200"
              >
                <div className="font-semibold text-amber-400 text-sm m-2">
                  🎯 {event.event}
                </div>

                <div className="text-xs text-slate-400 m-2">
                  🕒 {event.start} - {event.end}
                </div>

                <div className="text-xs m-2 text-purple-400">
                  🌐 Platform:{" "}
                  <a
                    href={event.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-300 hover:underline"
                  >
                    {event.resource}
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 italic text-sm">No events scheduled.</p>
        )}
      </div>
    </div>
  );
};

export default ExploreEvents;
