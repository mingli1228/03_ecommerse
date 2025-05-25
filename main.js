const year = 2025;
const may = 4;
const june = 6;

// 月の最初の曜日を調べる
const firstDay = new Date(year, may, 1);
const startWeekday = firstDay.getDay();

// その月が何日まであるのか
const lastDay = new Date(year, may + 1, 0);
const totalDays = lastDay.getDate();

console.log(firstDay, totalDays);
