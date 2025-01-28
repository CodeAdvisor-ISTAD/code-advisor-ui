// Function to format the date
const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Extract day, month, year, hours, and minutes
    const day = date.getDate().toString().padStart(2, '0'); // Ensure two digits
    const month = date.toLocaleString('default', { month: 'short' }); // Get short month name (e.g., Nov)
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure two digits
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM/PM

    return `${day}-${month}-${year} ${hours}:${minutes}${ampm}`;
};

export default formatDate;