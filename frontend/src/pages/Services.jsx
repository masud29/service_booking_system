import { useState, useEffect } from 'react';
import { servicesAPI, bookingsAPI } from '../services/api';
import Layout from '../components/Layout';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    service_id: '',
    booking_date: '',
  });
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await servicesAPI.getAll();
      setServices(response.data.services);
    } catch (error) {
      setError('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleBookService = (service) => {
    setSelectedService(service);
    setBookingData({
      service_id: service.id,
      booking_date: '',
    });
    setShowBookingModal(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);

    try {
      await bookingsAPI.create(bookingData);
      setShowBookingModal(false);
      setSelectedService(null);
      setBookingData({ service_id: '', booking_date: '' });
      // You could show a success message here
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create booking');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
          <div className="h4">Loading services...</div>
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
              <h1 className="h2 mb-2">Available Services</h1>
              <p className="text-muted">
                Browse our services and book appointments that suit your needs.
              </p>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="row">
            {services.map((service) => (
              <div key={service.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h5 className="card-title mb-0">{service.name}</h5>
                      <span className={`badge ${service.status ? 'bg-success' : 'bg-danger'}`}>
                        {service.status ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="card-text text-muted">{service.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="h4 text-primary mb-0">${service.price}</span>
                      {service.status && (
                        <button
                          onClick={() => handleBookService(service)}
                          className="btn btn-primary btn-sm"
                        >
                          Book Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedService && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Book {selectedService.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowBookingModal(false)}
                ></button>
              </div>
              <form onSubmit={handleBookingSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="booking_date" className="form-label">
                      Booking Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="booking_date"
                      name="booking_date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={bookingData.booking_date}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          booking_date: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowBookingModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={bookingLoading}
                  >
                    {bookingLoading ? 'Booking...' : 'Confirm Booking'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
} 