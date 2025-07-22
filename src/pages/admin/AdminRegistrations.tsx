import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import DataTable from '../../components/admin/common/DataTable';
import { Registration, PaymentStatus } from '../../types/admin';
import { TableColumn, FilterOptions } from '../../types/admin';
import { RegistrationsService } from '../../services/registrationsService';

const AdminRegistrations: React.FC = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    status: [],
    search: ''
  });

  const fetchRegistrations = useCallback(async () => {
    try {
      setLoading(true);
      const data = await RegistrationsService.fetchRegistrations({
        status: filters.status as PaymentStatus[],
        search: filters.search
      });
      setRegistrations(data);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  }, [filters.status, filters.search]);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const handleStatusChange = async (id: number, status: PaymentStatus) => {
    try {
      await RegistrationsService.updatePaymentStatus(id, status);
      fetchRegistrations();
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  const handleBulkStatusChange = async (status: PaymentStatus) => {
    if (selectedRows.length === 0) return;
    
    try {
      await RegistrationsService.bulkUpdatePaymentStatus(selectedRows, status);
      setSelectedRows([]);
      fetchRegistrations();
    } catch (error) {
      console.error('Error bulk updating payment status:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את ההרשמה?')) {
      try {
        await RegistrationsService.deleteRegistration(id);
        fetchRegistrations();
      } catch (error) {
        console.error('Error deleting registration:', error);
      }
    }
  };

  const handleStatusFilter = (status: string) => {
    setFilters(prev => ({
      ...prev,
      status: prev.status?.includes(status) ? [] : [status]
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('he-IL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const columns: TableColumn[] = [
    {
      key: 'name',
      label: 'שם',
      sortable: true
    },
    {
      key: 'email',
      label: 'אימייל',
      sortable: true
    },
    {
      key: 'phone',
      label: 'טלפון',
      sortable: true
    },
    {
      key: 'seminar',
      label: 'סדנה',
      render: (_, row) => row.seminar ? `${row.seminar.city} - ${new Date(row.seminar.date).toLocaleDateString('he-IL')}` : '-'
    },
    {
      key: 'payment_status',
      label: 'סטטוס תשלום',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs ${RegistrationsService.getPaymentStatusColor(value)}`}>
          {RegistrationsService.getPaymentStatusLabel(value)}
        </span>
      )
    },
    {
      key: 'registration_date',
      label: 'תאריך רישום',
      sortable: true,
      render: (value) => formatDate(value)
    },
    {
      key: 'actions',
      label: 'פעולות',
      render: (_, row) => (
        <div className="flex gap-2">
          <select
            value={row.payment_status}
            onChange={(e) => handleStatusChange(row.id, e.target.value as PaymentStatus)}
            className="text-xs border border-gray-300 rounded py-1 focus:outline-none focus:ring-1 focus:ring-cta select-rtl"
            onClick={(e) => e.stopPropagation()}
          >
            <option value="pending">ממתין לתשלום</option>
            <option value="paid">שולם</option>
            <option value="cancelled">בוטל</option>
            <option value="refunded">הוחזר</option>
          </select>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row.id);
            }}
            className="text-red-600 hover:text-red-800 typo-body-small"
          >
            מחק
          </button>
        </div>
      )
    }
  ];

  const exportToCSV = () => {
    const csvData = registrations.map(reg => ({
      'שם': reg.name,
      'אימייל': reg.email,
      'טלפון': reg.phone,
      'סדנה': reg.seminar ? `${reg.seminar.city} - ${new Date(reg.seminar.date).toLocaleDateString('he-IL')}` : '-',
      'סטטוס תשלום': RegistrationsService.getPaymentStatusLabel(reg.payment_status),
      'תאריך רישום': formatDate(reg.registration_date),
      'הערות': reg.notes || ''
    }));

    const headers = Object.keys(csvData[0]);
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => headers.map(header => `"${row[header as keyof typeof row]}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `registrations_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="typo-section-title text-bg-primary">
            ניהול הרשמות
          </h1>
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-green-600 text-white typo-button-regular rounded-md hover:bg-green-700"
          >
            ייצא לCSV
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <span className="typo-body-regular text-gray-700">סטטוס תשלום:</span>
              <button
                onClick={() => setFilters(prev => ({ ...prev, status: [] }))}
                className={`px-3 py-1 rounded-full text-xs transition-colors ${
                  !filters.status || filters.status.length === 0
                    ? 'bg-cta text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                הצג הכל
              </button>
              {['pending', 'paid', 'cancelled', 'refunded'].map(status => (
                <button
                  key={status}
                  onClick={() => handleStatusFilter(status)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${
                    filters.status?.includes(status)
                      ? 'bg-cta text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {RegistrationsService.getPaymentStatusLabel(status as PaymentStatus)}
                </button>
              ))}
            </div>
            
            <div className="flex-1 max-w-sm">
              <input
                type="text"
                placeholder="חיפוש לפי שם, אימייל או טלפון..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-cta focus:border-cta"
              />
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedRows.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="typo-body-regular text-blue-800">
                {selectedRows.length} פריטים נבחרו
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkStatusChange('paid')}
                  className="px-3 py-1 bg-green-600 text-white rounded typo-body-small hover:bg-green-700"
                >
                  סמן כשולם
                </button>
                <button
                  onClick={() => handleBulkStatusChange('pending')}
                  className="px-3 py-1 bg-yellow-600 text-white rounded typo-body-small hover:bg-yellow-700"
                >
                  סמן כממתין
                </button>
                <button
                  onClick={() => handleBulkStatusChange('cancelled')}
                  className="px-3 py-1 bg-red-600 text-white rounded typo-body-small hover:bg-red-700"
                >
                  סמן כבוטל
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-center">
              <div className="typo-body-large font-bold text-gray-900">
                {registrations.length}
              </div>
              <div className="typo-body-small text-gray-600">
                סך הכל הרשמות
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-center">
              <div className="typo-body-large font-bold text-green-600">
                {registrations.filter(r => r.payment_status === 'paid').length}
              </div>
              <div className="typo-body-small text-gray-600">
                תשלומים שולמו
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-center">
              <div className="typo-body-large font-bold text-yellow-600">
                {registrations.filter(r => r.payment_status === 'pending').length}
              </div>
              <div className="typo-body-small text-gray-600">
                תשלומים ממתינים
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-center">
              <div className="typo-body-large font-bold text-red-600">
                {registrations.filter(r => r.payment_status === 'cancelled').length}
              </div>
              <div className="typo-body-small text-gray-600">
                הרשמות בוטלו
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={registrations}
          loading={loading}
          selectedRows={selectedRows}
          onSelectRow={(id) => {
            setSelectedRows(prev => 
              prev.includes(id) 
                ? prev.filter(rowId => rowId !== id)
                : [...prev, id]
            );
          }}
          onSelectAll={(selected) => {
            setSelectedRows(selected ? registrations.map(r => r.id) : []);
          }}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminRegistrations;