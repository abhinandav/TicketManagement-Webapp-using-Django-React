import { Link } from "react-router-dom";

function TicketList({ tickets }) {
    return (
      <div className="h-full min-h-screen w-full pt-12 p-4 mr-3">
        <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4  gap-5">
          {tickets.length > 0 ? tickets.map((ticket, index) => (
            <Link to={`ticket/${ticket.id}/`} key={index} className="m-5">
              <div className="rounded-xl bg-white p-6 text-center shadow-xl">
                <div
                  className={`mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full shadow-lg ${
                    ticket.priority === 'low'
                      ? 'bg-yellow-400'
                      : ticket.priority === 'medium'
                      ? 'bg-teal-400'
                      : 'bg-red-400'
                  } shadow-teal-500/40`}
                ></div>
                <div className="min-h-32">
                  <h1 className="text-darken mb-3 text-xl font-medium lg:px-4 capitalize break-words">
                    {ticket.title}
                  </h1>
                  <p className="px-4 text-gray-500"> Status :
                    <span className={`mx-2 capitalize ${
                      ticket.status === 'open'
                        ? 'text-green-400'
                        : ticket.status === 'resolved'
                        ? 'text-red-400'
                        : 'text-blue-400'
                    }`}>{ticket.status}</span>
                  </p>
                </div>
              </div>
            </Link>
            )) : (
              <tr>
                  <td colSpan="7" className="py-4 px-6 text-center text-gray-600">No tickets found.</td>
              </tr>
          )}
         
        </div>
      </div>
    );
}

export default TicketList;