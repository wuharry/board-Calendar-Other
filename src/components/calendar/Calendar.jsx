import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // 用於日視圖和月視圖
import timeGridPlugin from "@fullcalendar/timegrid"; // 用於週視圖
import listPlugin from "@fullcalendar/list"; // 用於列表視圖
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export default function Calendar({ data }) {
  const header = {
    left: "prev,next today", // 左邊放置上一頁、下一頁和今天
    center: "title", // 中間放置標題
    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek", // 右邊放置月、周、天、列表視圖
  };
  const [events, setEvents] = useState([]);

  useEffect(() => {
    for (let [key, value] of Object.entries(data)) {
      value.tasks.forEach((task) => {
        console.log("task", task);
        setEvents(() => [...events, task]);
      });
    }
    console.log("events", events);
  }, [data]);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin]} // 載入需要的插件
      headerToolbar={header} // 配置 Header
      initialView="dayGridMonth" // 預設顯示月視圖
      events={[
        { title: "event 1", date: "2025-04-01", constraint: "businessHours" },
        { title: "event 2", date: "2025-02-18", task: "businessHours" },
      ]}
    />
  );
}

Calendar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
