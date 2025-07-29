import { useState, useEffect } from 'react';
import { bookingsAPI } from '../services/api';
import Layout from '../components/Layout';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingsAPI.getAll();
      setBookings(response.data.bookings);
    } catch (error) {
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await bookingsAPI.delete(bookingId);
        fetchBookings(); // Refresh the list
      } catch (error) {
        setError('Failed to cancel booking');
      }
    }
  };

  const getStatusBadge = (status) => {
    const badgeClasses = {
      pending: 'bg-warning',
      confirmed: 'bg-success',
      cancelled: 'bg-danger',
      completed: 'bg-info',
    };
    return `badge ${badgeClasses[status] || 'bg-secondary'}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
          <div className="h4">Loading bookings...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="h2 mb-2">My Bookings</h1>
              <p className="text-muted">
                View and manage your service bookings.
              </p>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {bookings.length === 0 ? (
            <div className="text-center py-5">
              <div className="h4 text-muted">No bookings found</div>
              <p className="text-muted">
                You haven't made any bookings yet. Browse our services to get started!
              </p>
            </div>
          ) : (
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Price</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking.id}>
                          <td>
                            <div className="fw-bold">{booking.service.name}</div>
                            <small className="text-muted">{booking.service.description}</small>
                          </td>
                          <td>{formatDate(booking.booking_date)}</td>
                          <td>
                            <span className={getStatusBadge(booking.status)}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="fw-bold">${booking.service.price}</td>
                          <td>
                            {booking.status === 'pending' && (
                              <button
                                onClick={() => handleCancelBooking(booking.id)}
                                className="btn btn-outline-danger btn-sm"
                              >
                                Cancel
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 