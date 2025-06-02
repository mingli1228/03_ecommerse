// /* 2506021134 */

const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth();

const renderedMonths = new Set(); // 描画済み年月セット

function renderCalendar(year, month) {
  const key = `${year}-${month}`;
  if (renderedMonths.has(key)) return; // すでに表示済みならスキップ
  renderedMonths.add(key);

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const monthTitle = `${year}年${month + 1}月`;

  let days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= lastDate; i++) days.push(i);

  // 月タイトル行を追加

  // let titleRow = `<tr><th class="month-title" colspan="7">${monthTitle}</th></tr>`;
  // $("#calendarBody").append(titleRow);

  let titleRow = "";
  if (titleRow === `${currentYear}年${currentMonth}月`) {
    let titleRow = `<tr><th class="month-title" colspan="7"><a name=#top>${monthTitle}</a></th></tr>`;
    $("#calendarBody").append(titleRow);
  } else {
    let titleRow = `<tr><th class="month-title" colspan="7">${monthTitle}</th></tr>`;
    $("#calendarBody").append(titleRow);
  }

  // 曜日行を追加
  const weekDays = ["日", "月", "火", "水", "木", "金", "土"];
  let weekdayRow =
    "<tr>" + weekDays.map((day) => `<th>${day}</th>`).join("") + "</tr>";
  $("#calendarBody").append(weekdayRow);

  // 日付セルを描画
  for (let i = 0; i < days.length; i += 7) {
    const week = days.slice(i, i + 7);
    let rowHtml = "<tr>";
    week.forEach((day) => {
      if (day === null) {
        rowHtml += "<td></td>";
      } else {
        let paddedMonth = String(month + 1).padStart(2, "0");
        let paddedDay = String(day).padStart(2, "0");
        let eachId = `${year}-${paddedMonth}-${paddedDay}`;
        rowHtml += `
          <td>
            <div class="dayBlock">
              <div class="eachCell date">${day}</div>
              <div class="eachCell emojiSlot" id="${eachId}_1"></div>
              <div class="eachCell emojiSlot" id="${eachId}_2"></div>
              <div class="eachCell emojiSlot" id="${eachId}_3"></div>
            </div>
          </td>
        `;
      }
    });
    rowHtml += "</tr>";
    $("#calendarBody").append(rowHtml);
  }

  // ローカルストレージから絵文字復元
  $(".emojiSlot").each(function () {
    const id = $(this).attr("id");
    const savedEmoji = localStorage.getItem(id);
    if (savedEmoji) {
      $(this).html(savedEmoji);
    }
  });
}

// 初期表示：今月と翌月
renderCalendar(currentYear, currentMonth);
let nextMonth = currentMonth + 1;
let nextYear = currentYear;
if (nextMonth > 11) {
  nextMonth = 0;
  nextYear++;
}
renderCalendar(nextYear, nextMonth);

// スクロールで次月追加
$(window).on("scroll", function () {
  if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentYear, currentMonth);
  }
});

// スタンプクリック時の表示
$(document).on("click", ".emojiSlot", function (e) {
  const clickedCell = $(this);
  $("#stampPalette")
    .css({ top: e.pageY, left: e.pageX, display: "block" })
    .data("target", clickedCell);
});

// 絵文字をセルに反映
$(document).on("click", ".emoji", function () {
  const content = $(this).html();
  const targetCell = $("#stampPalette").data("target");
  const id = targetCell.attr("id");

  if (content === "×スタンプ削除/閉じる") {
    targetCell.html("");
    localStorage.removeItem(id);
  } else {
    targetCell.html(content);
    localStorage.setItem(id, content);
  }
  $("#stampPalette").hide();
});

// 関係ないところクリックしたらパレットを閉じる
$(document).on("click", function (e) {
  if (!$(e.target).closest(".emojiSlot, #stampPalette").length) {
    $("#stampPalette").hide();
  }
});
