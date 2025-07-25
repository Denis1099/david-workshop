import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import DataTable from '../../components/admin/common/DataTable';
import SeminarForm from '../../components/admin/seminars/SeminarForm';
import { Seminar, SeminarStatus } from '../../types/seminar';
import { TableColumn, FilterOptions } from '../../types/admin';
import { SeminarsService } from '../../services/seminarsService';

const AdminSeminars: React.FC = () => {
  const location = useLocation();
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSeminar, setEditingSeminar] = useState<Seminar | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    status: [],
    search: ''
  });

  // Check for 'new' query parameter to show form
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.get('new') === 'true') {
      setShowForm(true);
    }
  }, [location]);

  const fetchSeminars = useCallback(async () => {
    try {
      setLoading(true);
      const data = await SeminarsService.fetchAllSeminars({
        status: filters.status as SeminarStatus[]
      });
      setSeminars(data);
    } catch (error) {
      console.error('Error fetching seminars:', error);
    } finally {
      setLoading(false);
    }
  }, [filters.status]);

  useEffect(() => {
    fetchSeminars();
  }, [fetchSeminars]);

  const handleCreateSeminar = async (seminarData: Omit<Seminar, 'id' | 'created_at'>) => {
    try {
      await SeminarsService.createSeminar(seminarData);
      setShowForm(false);
      fetchSeminars();
    } catch (error) {
      console.error('Error creating seminar:', error);
    }
  };

  const handleUpdateSeminar = async (seminarData: Omit<Seminar, 'id' | 'created_at'>) => {
    if (!editingSeminar) return;
    
    try {
      await SeminarsService.updateSeminar(editingSeminar.id, seminarData);
      setEditingSeminar(null);
      setShowForm(false);
      fetchSeminars();
    } catch (error) {
      console.error('Error updating seminar:', error);
    }
  };

  const handleDeleteSeminar = async (id: number) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את הסדנה?')) {
      try {
        await SeminarsService.deleteSeminar(id);
        fetchSeminars();
      } catch (error) {
        console.error('Error deleting seminar:', error);
      }
    }
  };


  const handleStatusFilter = (status: string) => {
    setFilters(prev => ({
      ...prev,
      status: prev.status?.includes(status) ? [] : [status]
    }));
  };


  const handleBulkDelete = async () => {
    if (selectedRows.length === 0) return;
    
    if (!window.confirm(`האם אתה בטוח שברצונך למחוק ${selectedRows.length} סדנאות? פעולה זו בלתי הפיכה!`)) {
      return;
    }

    try {
      for (const id of selectedRows) {
        await SeminarsService.deleteSeminar(id);
      }
      setSelectedRows([]);
      fetchSeminars();
      alert(`${selectedRows.length} סדנאות נמחקו בהצלחה`);
    } catch (error) {
      console.error('Error deleting seminars:', error);
      alert('שגיאה במחיקת הסדנאות');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('he-IL');
  };

  const formatTime = (time: string) => {
    return time.slice(0, 5);
  };

  const columns: TableColumn[] = [
    {
      key: 'city',
      label: 'עיר',
      sortable: true
    },
    {
      key: 'date',
      label: 'תאריך',
      sortable: true,
      render: (value) => formatDate(value)
    },
    {
      key: 'time_start',
      label: 'שעה',
      render: (value, row) => `${formatTime(value)} - ${formatTime(row.time_end)}`
    },
    {
      key: 'venue_name',
      label: 'מקום',
      sortable: true
    },
    {
      key: 'current_participants',
      label: 'משתתפים',
      render: (value, row) => `${value}/${row.max_participants}`
    },
    {
      key: 'price',
      label: 'מחיר',
      render: (value) => `₪${value}`
    },
    {
      key: 'status',
      label: 'סטטוס',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs ${SeminarsService.getStatusColor(value)}`}>
          {SeminarsService.getStatusLabel(value)}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'פעולות',
      render: (_, row) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setEditingSeminar(row);
              setShowForm(true);
            }}
            className="text-blue-600 hover:text-blue-800 typo-body-small"
          >
            ערוך
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteSeminar(row.id);
            }}
            className="text-red-600 hover:text-red-800 typo-body-small"
          >
            מחק
          </button>
        </div>
      )
    }
  ];

  if (showForm) {
    return (
      <AdminLayout>
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="typo-section-title text-bg-primary">
              {editingSeminar ? 'עריכת סדנה' : 'יצירת סדנה חדשה'}
            </h1>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <SeminarForm
              seminar={editingSeminar || undefined}
              onSubmit={editingSeminar ? handleUpdateSeminar : handleCreateSeminar}
              onCancel={() => {
                setShowForm(false);
                setEditingSeminar(null);
              }}
            />
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="typo-section-title text-bg-primary">
            ניהול סדנאות
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-cta text-white typo-button-cta rounded-md hover:bg-cta/90"
          >
            הוסף סדנה
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <span className="typo-body-regular text-gray-700">סטטוס:</span>
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
              {['active', 'draft', 'sold_out', 'cancelled', 'completed'].map(status => (
                <button
                  key={status}
                  onClick={() => handleStatusFilter(status)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${
                    filters.status?.includes(status)
                      ? 'bg-cta text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {SeminarsService.getStatusLabel(status)}
                </button>
              ))}
            </div>
            
            <div className="flex-1 max-w-sm">
              <input
                type="text"
                placeholder="חיפוש..."
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
                  onClick={handleBulkDelete}
                  className="px-3 py-1 bg-red-600 text-white rounded typo-body-small hover:bg-red-700"
                >
                  מחק נבחרים
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <DataTable
          columns={columns}
          data={seminars}
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
            setSelectedRows(selected ? seminars.map(s => s.id) : []);
          }}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminSeminars;