function formatDate(dateString) {
     const date = new Date(dateString);
     const year = date.getFullYear();
     const month = String(date.getMonth() + 1).padStart(2, '0');
     const day = String(date.getDate()).padStart(2, '0');
     return `${year}-${month}-${day}`;
}

function formatDateWithTime(dateString) {
     const date = new Date(dateString);
     const year = date.getFullYear();
     const month = String(date.getMonth() + 1).padStart(2, "0");
     const day = String(date.getDate()).padStart(2, "0");
     const hour = date.getHours();
     const minute = String(date.getMinutes()).padStart(2, "0");
     const second = String(date.getSeconds()).padStart(2, "0");
     const ampm = hour >= 12 ? "PM" : "AM";
     const formattedHour = hour % 12 || 12;
     const formattedTime = `${formattedHour}:${minute}:${second} ${ampm}`;
     return `${year}-${month}-${day} ${formattedTime}`;
}

const format = { formatDate, formatDateWithTime }

export default format 