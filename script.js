document.addEventListener('DOMContentLoaded', function() {
    const calendarBody = document.querySelector('.calendar tbody');
    const monthYearDisplay = document.querySelector('.current-month-year');
  
    function generateCalendar(year, month) {
      calendarBody.innerHTML = ''; // Clear the previous rows
      monthYearDisplay.textContent = `${year}.${String(month + 1).padStart(2, '0')}`; // Set the month and year title
  
      const firstDayOfMonth = new Date(year, month, 1);
      let currentDayOfWeek = firstDayOfMonth.getDay();
      let currentDate = new Date(firstDayOfMonth);
  
      currentDate.setDate(currentDate.getDate() - currentDayOfWeek);
  
      for (let week = 0; week < 6; week++) {
        const row = document.createElement('tr');
        for (let day = 0; day < 7; day++) {
          const cell = document.createElement('td');
          const span = document.createElement('span'); // span 요소 생성
          const cellText = document.createTextNode(currentDate.getDate());
          span.appendChild(cellText); // span에 날짜 텍스트 추가
          cell.appendChild(span); // 셀에 span 추가
  
          if (currentDate.getMonth() !== month) {
            cell.classList.add('other-month');
          }
  
          row.appendChild(cell);
          currentDate.setDate(currentDate.getDate() + 1);
        }
        calendarBody.appendChild(row);
        if (currentDate.getMonth() !== month) break;
      }
  
      highlightToday(year, month);
    }
  
    function highlightToday(year, month) {
      const today = new Date();
      const todayDate = today.getDate();
      const todayMonth = today.getMonth();
      const todayYear = today.getFullYear();
  
      if (year === todayYear && month === todayMonth) {
        const spans = calendarBody.querySelectorAll('td span');
        for (let span of spans) {
          const cellDate = new Date(year, month, span.textContent);
          if (span.textContent == todayDate && cellDate.getMonth() === month) {
            span.classList.add('today-highlight');
          } else {
            span.classList.remove('today-highlight');
          }
        }
      } else {
        const spans = calendarBody.querySelectorAll('td span');
        for (let span of spans) {
          span.classList.remove('today-highlight');
        }
      }
    }
  
    document.querySelector('.today-button').addEventListener('click', function() {
      const today = new Date();
      generateCalendar(today.getFullYear(), today.getMonth());
    });
  
    document.querySelector('.prev-month').addEventListener('click', function() {
      const currentMonth = parseInt(monthYearDisplay.textContent.split('.')[1], 10) - 1;
      const currentYear = parseInt(monthYearDisplay.textContent.split('.')[0], 10);
      const newMonth = new Date(currentYear, currentMonth - 1);
      generateCalendar(newMonth.getFullYear(), newMonth.getMonth());
    });
  
    document.querySelector('.next-month').addEventListener('click', function() {
      const currentMonth = parseInt(monthYearDisplay.textContent.split('.')[1], 10) - 1;
      const currentYear = parseInt(monthYearDisplay.textContent.split('.')[0], 10);
      const newMonth = new Date(currentYear, currentMonth + 1);
      generateCalendar(newMonth.getFullYear(), newMonth.getMonth());
    });
  
    const today = new Date();
    generateCalendar(today.getFullYear(), today.getMonth());
  });
  