import { useState } from "react";
import { formatDate } from "../../../../utils/timeUtils";

const BookingsRow = ({ booking, index }) => {
    return (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{booking.room}</td>
            <td>{booking.desk}</td>
            <td>{formatDate(booking.date)}</td>
            <td>{booking.timeFrom}</td>
            <td>{booking.timeTo}</td>
            <td>{booking.bookedBy}</td>
        </tr>
    );
};

const BookingsTableView = ({ bookings }) => {
    const [currentPage, setCurrentPage] = useState(1);

    if (!Array.isArray(bookings) || bookings.length === 0) {
        return <p>No bookings</p>;
    }

    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    //records for every page
    const records = bookings.slice(firstIndex, lastIndex);
    //number of pages
    const npage = Math.ceil(bookings.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);


    function nextPage(){
        if(currentPage !== npage){
            setCurrentPage(currentPage + 1);
        }
    }

    function prevPage(){
        if(currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function changeCurrPage(id){
        setCurrentPage(id);
    }

    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Room</th>
                        <th>Desk</th>
                        <th>Date</th>
                        <th>Time From</th>
                        <th>Time To</th>
                        <th>Booked By</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((booking, index) => (
                        <BookingsRow key={index} booking={booking} index={index} />
                    ))}
                </tbody>
            </table>
            <nav>
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <button  className="page-link" onClick={prevPage}>Prev</button>
                    </li>
                    {
                        numbers.map((n, i) => {
                            if(i === 4 && n.length > 7){
                                i = n.length-3;
                                return(
                                    <li>
                                        <button>...</button>
                                    </li>
                                )
                            }else{
                                return (
                                    <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                        <button  className="page-link" onClick={() => changeCurrPage(n)}>{n}</button>
                                    </li>
                                )
                            }
                        })
                    }
                    <li className="page-item">
                        <button  className="page-link" onClick={nextPage}>Next</button>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default BookingsTableView;
