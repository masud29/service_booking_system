import { useState, useEffect } from 'react';
import { adminAPI, servicesAPI } from '../services/api';
import Layout from '../components/Layout';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [serviceData, setServiceData] = useState({
    name: '',
    description: '',
    price: '',
    status: true,
  });
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    if (activeTab === 'bookings') {
      fetchBookings();
    } else {
      fetchServices();
    }
  }, [activeTab]);

  const fetchBookings = async () => {
    try {
      const response = await adminAPI.getAllBookings();
      setBookings(response.data.bookings);
    } catch (error) {
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await adminAPI.getAllServices();
      setServices(response.data.services);
    } catch (error) {
      setError('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateService = () => {
    setEditingService(null);
    setServiceData({
      name: '',
      description: '',
      price: '',
      status: true,
    });
    setShowServiceModal(true);
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setServiceData({
      name: service.name,
      description: service.description,
      price: service.price,
      status: service.status,
    });
    setShowServiceModal(true);
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        await servicesAPI.update(editingService.id, serviceData);
      } else {
        await servicesAPI.create(serviceData);
      }
      setShowServiceModal(false);
      fetchServices();
    } catch (error) {
      setError('Failed to save service');
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await servicesAPI.delete(serviceId);
        fetchServices();
      } catch (error) {
        setError('Failed to delete service');
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
          <div className="h4">Loading...</div>
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
              <h1 className="h2 mb-2">Admin Dashboard</h1>
              <p className="text-muted">
                Manage services and view all bookings.
              </p>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'bookings' ? 'active' : ''}`}
                onClick={() => setActiveTab('bookings')}
              >
                All Bookings
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'services' ? 'active' : ''}`}
                onClick={() => setActiveTab('services')}
              >
                Services
              </button>
            </li>
          </ul>

          {activeTab === 'bookings' && (
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Customer</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking.id}>
                          <td>
                            <div className="fw-bold">{booking.user.name}</div>
                            <small className="text-muted">{booking.user.email}</small>
                          </td>
                          <td>{booking.service.name}</td>
                          <td>{formatDate(booking.booking_date)}</td>
                          <td>
                            <span className={getStatusBadge(booking.status)}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="fw-bold">${booking.service.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="h4 mb-0">Services</h3>
                <button
                  onClick={handleCreateService}
                  className="btn btn-primary"
                >
                  Add Service
                </button>
              </div>

              <div className="card">
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Price</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {services.map((service) => (
                          <tr key={service.id}>
                            <td className="fw-bold">{service.name}</td>
                            <td>{service.description}</td>
                            <td className="fw-bold">${service.price}</td>
                            <td>
                              <span className={`badge ${service.status ? 'bg-success' : 'bg-danger'}`}>
                                {service.status ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td>
                              <button
                                onClick={() => handleEditService(service)}
                                className="btn btn-outline-primary btn-sm me-2"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteService(service.id)}
                                className="btn btn-outline-danger btn-sm"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Service Modal */}
      {showServiceModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowServiceModal(false)}
                ></button>
              </div>
              <form onSubmit={handleServiceSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="service_name" className="form-label">
                      Service Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="service_name"
                      name="name"
                      required
                      value={serviceData.name}
                      onChange={(e) =>
                        setServiceData({
                          ...serviceData,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="service_description" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="service_description"
                      name="description"
                      rows="3"
                      required
                      value={serviceData.description}
                      onChange={(e) =>
                        setServiceData({
                          ...serviceData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="service_price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="service_price"
                      name="price"
                      step="0.01"
                      min="0"
                      required
                      value={serviceData.price}
                      onChange={(e) =>
                        setServiceData({
                          ...serviceData,
                          price: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="service_status"
                        name="status"
                        checked={serviceData.status}
                        onChange={(e) =>
                          setServiceData({
                            ...serviceData,
                            status: e.target.checked,
                          })
                        }
                      />
                      <label className="form-check-label" htmlFor="service_status">
                        Active
                      </label>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowServiceModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingService ? 'Update' : 'Create'}
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