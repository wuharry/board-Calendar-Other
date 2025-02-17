import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // 用於日視圖和月視圖
import timeGridPlugin from "@fullcalendar/timegrid"; // 用於週視圖
import listPlugin from "@fullcalendar/list"; // 用於列表視圖
//

export default function Calendar() {
  const header = {
    left: "prev,next today", // 左邊放置上一頁、下一頁和今天
    center: "title", // 中間放置標題
    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek", // 右邊放置月、周、天、列表視圖
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin]} // 載入需要的插件
      headerToolbar={header} // 配置 Header
      initialView="dayGridMonth" // 預設顯示月視圖
    />
  );
}
