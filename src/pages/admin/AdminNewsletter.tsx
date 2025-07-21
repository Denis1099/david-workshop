import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import DataTable from '../../components/admin/common/DataTable';
import { NewsletterLead, ContactedStatus } from '../../types/admin';
import { TableColumn, FilterOptions } from '../../types/admin';
import { NewsletterService } from '../../services/newsletterService';

const AdminNewsletter: React.FC = () => {
  const [leads, setLeads] = useState<NewsletterLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    status: [],
    search: ''
  });

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const data = await NewsletterService.fetchNewsletterLeads({
        status: filters.status as ContactedStatus[],
        search: filters.search
      });
      setLeads(data);
    } catch (error) {
      console.error('Error fetching newsletter leads:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [filters, fetchLeads]);

  const handleStatusChange = async (id: number, status: ContactedStatus) => {
    try {
      await NewsletterService.updateContactedStatus(id, status);
      fetchLeads();
    } catch (error) {
      console.error('Error updating contacted status:', error);
    }
  };

  const handleBulkStatusChange = async (status: ContactedStatus) => {
    if (selectedRows.length === 0) return;
    
    try {
      await NewsletterService.bulkUpdateContactedStatus(selectedRows, status);
      setSelectedRows([]);
      fetchLeads();
    } catch (error) {
      console.error('Error bulk updating contacted status:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את המנוי?')) {
      try {
        await NewsletterService.deleteNewsletterLead(id);
        fetchLeads();
      } catch (error) {
        console.error('Error deleting newsletter lead:', error);
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
      year: 'numeric'
    });
  };

  const columns: TableColumn[] = [
    {
      key: 'email',
      label: 'אימייל',
      sortable: true
    },
    {
      key: 'name',
      label: 'שם',
      sortable: true,
      render: (value) => value || '-'
    },
    {
      key: 'phone',
      label: 'טלפון',
      sortable: true,
      render: (value) => value || '-'
    },
    {
      key: 'source',
      label: 'מקור',
      render: (value) => {
        const sources = {
          'contact_form': 'טופס יצירת קשר',
          'newsletter_signup': 'הרשמה לניוזלטר',
          'referral': 'הפניה',
          'direct_inquiry': 'פנייה ישירה',
          'social_media': 'רשתות חברתיות'
        };
        return sources[value as keyof typeof sources] || value || '-';
      }
    },
    {
      key: 'contacted_status',
      label: 'סטטוס יצירת קשר',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs ${NewsletterService.getContactedStatusColor(value)}`}>
          {NewsletterService.getContactedStatusLabel(value)}
        </span>
      )
    },
    {
      key: 'date_added',
      label: 'תאריך הצטרפות',
      sortable: true,
      render: (value) => formatDate(value)
    },
    {
      key: 'actions',
      label: 'פעולות',
      render: (_, row) => (
        <div className="flex gap-2">
          <select
            value={row.contacted_status}
            onChange={(e) => handleStatusChange(row.id, e.target.value as ContactedStatus)}
            className="text-xs border border-gray-300 rounded py-1 focus:outline-none focus:ring-1 focus:ring-cta select-rtl"
            onClick={(e) => e.stopPropagation()}
          >
            <option value="not_contacted">לא נוצר קשר</option>
            <option value="contacted">נוצר קשר</option>
            <option value="responded">הגיב</option>
            <option value="unsubscribed">ביטל מנוי</option>
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
    const csvData = leads.map(lead => ({
      'אימייל': lead.email,
      'שם': lead.name || '',
      'טלפון': lead.phone || '',
      'מקור': lead.source || '',
      'סטטוס יצירת קשר': NewsletterService.getContactedStatusLabel(lead.contacted_status),
      'תאריך הצטרפות': formatDate(lead.date_added),
      'הערות': lead.notes || ''
    }));

    const headers = Object.keys(csvData[0]);
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => headers.map(header => `"${row[header as keyof typeof row]}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `newsletter_leads_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const getStatsForStatus = (status: ContactedStatus) => {
    return leads.filter(lead => lead.contacted_status === status).length;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="typo-section-title text-bg-primary">
            רשימת תפוצה
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
              <span className="typo-body-regular text-gray-700">סטטוס יצירת קשר:</span>
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
              {['not_contacted', 'contacted', 'responded', 'unsubscribed'].map(status => (
                <button
                  key={status}
                  onClick={() => handleStatusFilter(status)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${
                    filters.status?.includes(status)
                      ? 'bg-cta text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {NewsletterService.getContactedStatusLabel(status as ContactedStatus)}
                </button>
              ))}
            </div>
            
            <div className="flex-1 max-w-sm">
              <input
                type="text"
                placeholder="חיפוש לפי אימייל, שם או טלפון..."
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
                  onClick={() => handleBulkStatusChange('contacted')}
                  className="px-3 py-1 bg-blue-600 text-white rounded typo-body-small hover:bg-blue-700"
                >
                  סמן כנוצר קשר
                </button>
                <button
                  onClick={() => handleBulkStatusChange('responded')}
                  className="px-3 py-1 bg-green-600 text-white rounded typo-body-small hover:bg-green-700"
                >
                  סמן כהגיב
                </button>
                <button
                  onClick={() => handleBulkStatusChange('unsubscribed')}
                  className="px-3 py-1 bg-red-600 text-white rounded typo-body-small hover:bg-red-700"
                >
                  סמן כביטל מנוי
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
                {leads.length}
              </div>
              <div className="typo-body-small text-gray-600">
                סך הכל מנויים
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-center">
              <div className="typo-body-large font-bold text-gray-600">
                {getStatsForStatus('not_contacted')}
              </div>
              <div className="typo-body-small text-gray-600">
                לא נוצר קשר
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-center">
              <div className="typo-body-large font-bold text-blue-600">
                {getStatsForStatus('contacted')}
              </div>
              <div className="typo-body-small text-gray-600">
                נוצר קשר
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-center">
              <div className="typo-body-large font-bold text-green-600">
                {getStatsForStatus('responded')}
              </div>
              <div className="typo-body-small text-gray-600">
                הגיבו
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={leads}
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
            setSelectedRows(selected ? leads.map(l => l.id) : []);
          }}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminNewsletter;