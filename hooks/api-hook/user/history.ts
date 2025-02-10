const createHistory = async (history) => {
  const response = await fetch(`/users/api/v1/history`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(history),
  });
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw data;
  }
};

export { createHistory };

// get history data
// const getHistoryData = async function getHistoryData(slug: string, page: number, size: number) {
//     const response = await fetch(`/api/v1/contents/slug/${slug}?page=${page}&size=${size}`);
//     const data = await response.json();

//     if (response.ok) {
//       return data;
//     } else {
//       throw data;
//     }
//   }

// get bookmark forum data
const getForumDataHistory = async function getForumDataHistory(
  slug: string,
  page: number,
  size: number
) {
  const response = await fetch(`/forums/api/v1/questions/slug/${slug}`);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw data;
  }
};

// get history data
const getHistory = async function getHistory() {
  const response = await fetch(`/users/api/v1/history`);
  const data = await response.json();

  if (response.ok) {
    return data;
  } else {
    throw data;
  }
};

const formatKhmerDate = (dateString: string) => {
  const date = new Date(dateString);

  // Days in Khmer
  const khmerDays = [
    "អាទិត្យ",
    "ច័ន្ទ",
    "អង្គារ",
    "ពុធ",
    "ព្រហស្បតិ៍",
    "សុក្រ",
    "សៅរ៍",
  ];

  // Months in Khmer
  const khmerMonths = [
    "មករា",
    "កុម្ភៈ",
    "មីនា",
    "មេសា",
    "ឧសភា",
    "មិថុនា",
    "កក្កដា",
    "សីហា",
    "កញ្ញា",
    "តុលា",
    "វិច្ឆិកា",
    "ធ្នូ",
  ];

  // Format the date
  const dateObj = new Date(dateString);
  const dayName = khmerDays[dateObj.getDay()];
  const day = dateObj.getDate().toString().replace(/./g, (char) => String.fromCharCode(0x17e0 + parseInt(char)));
  const month = khmerMonths[dateObj.getMonth()];
  const year = dateObj.getFullYear().toString().replace(/./g, (char) => String.fromCharCode(0x17e0 + parseInt(char)));

  return `ថ្ងៃ${dayName} ទី${day} ខែ${month} ឆ្នាំ ${year}`;
};

export { getHistory, getForumDataHistory, formatKhmerDate };
