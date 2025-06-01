const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth();

function renderCalendar(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  let days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= lastDate; i++) days.push(i);

  const monthTitle = `${year}年${month + 1}月`;
  $("#calendarBody").append(
    `<tr><td colspan='7' class='month-title'>${monthTitle}</td></tr>`
  );

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

  // 絵文字復元
  $(".emojiSlot").each(function () {
    const id = $(this).attr("id");
    const savedEmoji = localStorage.getItem(id);
    if (savedEmoji) {
      $(this).text(savedEmoji);
    }
  });
}

// 初回描画
renderCalendar(currentYear, currentMonth);

// スクロール検知で次月描画
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

// スタンプパレット
$(document).on("click", ".emojiSlot", function (e) {
  const clickedCell = $(this);
  $("#stampPalette")
    .css({ top: e.pageY, left: e.pageX, display: "block" })
    .data("target", clickedCell);
});

$(document).on("click", ".emoji", function () {
  const content = $(this).html(); // ← .text() から .html() に変更
  const targetCell = $("#stampPalette").data("target");
  const id = targetCell.attr("id");

  if (content === "× スタンプ削除") {
    targetCell.html("");
    localStorage.removeItem(id);
  } else {
    targetCell.html(content); // ← .text() から .html() に変更
    localStorage.setItem(id, content);
  }
  $("#stampPalette").hide();
});

// パレット外クリックで非表示
$(document).on("click", function (e) {
  if (!$(e.target).closest(".emojiSlot, #stampPalette").length) {
    $("#stampPalette").hide();
  }
});
