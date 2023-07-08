const updateTotalDownloaded = (data) => {
    // calculate size of fetched data
    const size = JSON.stringify(data).length;

    // get current total from Local Storage (or 0 if it doesn't exist)
    const currentTotal = Number(localStorage.getItem("totalDownloaded") || 0);

    // store updated total in Local Storage
    localStorage.setItem("totalDownloaded", currentTotal + size);
};

export default updateTotalDownloaded;
