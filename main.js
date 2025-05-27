// 1.ブラウザを開いた時点の年月日と曜日を取得
const today = new Date();
let year = today.getFullYear();
let month = today.getMonth();
let date = today.getDate();
// 日曜日＝0,月曜日=1
let weekday = today.getDay();

// 2.取得した年月日を含む月のカレンダーを表示する！
// テーブルにプロットする前に配列化
// 2-1.まずはその月の「最初の日が何曜日か」「最後の日が何日か←配列をどこまで続けるか」調べる
const firstDay = new Date(year, month, 1).getDay();
// 翌月の0日目＝当月の月末
const lastDate = new Date(year, month + 1, 0).getDate();
console.log(firstDay, lastDate);

// nullNam=nullが何個続くか。1日が火曜日なら、null=2.7で割った余り。
let days = [];
for (let i = 0; i < firstDay; i++) {
  days.push(null);
}
for (let i = 1; i <= lastDate; i++) {
  days.push(i);
}
console.log(days);

// カレンダーを7日で改行する
for (let i = 0; i < days.length; i += 7) {
  const week = days.slice(i, i + 7);
  let rowHtml = "<tr>";

  week.forEach((day) => {
    if (day === null) {
      rowHtml += "<td></td>";
    } else {
      rowHtml += `<td>${day}</td>`;
    }
  });
  rowHtml += "</tr>";
  $("#calendarBody").append(`${rowHtml}`);
}
// めも。appendは+=と似てる！！

// 2*2のセルの準備。まずはidを配列で生成する。
let baseId = `${year}-${month + 1}-${date}_`;
for (let i = 1; i < 4; i++) {
  let id = `${baseId}${i}`;
  console.log(id);
}
// 続きはstringからやること。
