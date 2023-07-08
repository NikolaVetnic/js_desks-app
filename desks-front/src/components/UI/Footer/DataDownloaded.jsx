import React, { useEffect, useState } from "react";
import "./DataDownloaded.css";

const totalDownloadedPrettyPrint = (totalDownloaded) => {
    const totalDownloadedBytes = parseInt(totalDownloaded, 10);

    if (totalDownloadedBytes < 10000) {
        const value = `${(totalDownloadedBytes / 1024).toFixed(2)} KB`;
        return {
            value,
            className: "data-downloaded-green data-downloaded",
        };
    } else if (
        totalDownloadedBytes >= 10000 &&
        totalDownloadedBytes < 1000000
    ) {
        const value = `${(totalDownloadedBytes / 1024).toFixed(2)} KB`;
        return {
            value,
            className: "data-downloaded-yellow data-downloaded",
        };
    } else {
        const value = `${(totalDownloadedBytes / (1024 * 1024)).toFixed(2)} MB`;
        return {
            value,
            className: "data-downloaded-red data-downloaded",
        };
    }
};

const DataDownloaded = () => {
    const [totalDownloaded, setTotalDownloaded] = useState(
        localStorage.getItem("totalDownloaded") || 0
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const updatedTotalDownloaded =
                localStorage.getItem("totalDownloaded") || 0;
            setTotalDownloaded(updatedTotalDownloaded);
        }, 100); // Adjust the interval duration as needed

        return () => {
            clearInterval(interval);
        };
    }, []);

    const totalDownloadedFormatted =
        totalDownloadedPrettyPrint(totalDownloaded);

    return (
        <span className={`${totalDownloadedFormatted.className}`}>
            {totalDownloadedFormatted.value}
        </span>
    );
};

export default DataDownloaded;
