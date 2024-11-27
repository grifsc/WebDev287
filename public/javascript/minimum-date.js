// Source https://youtu.be/uDQ5RyxYLGQ?si=W5qIRM8wFYbyo-q9
var date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
if (day < 10) {
    day = '0' + day;
}
if (month < 10) {
    month = '0' + month;
}
var year = date.getUTCFullYear();
var minDate = year + "-" + month + "-" + day;
document.getElementById("date").setAttribute("min", minDate);