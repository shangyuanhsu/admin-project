import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select/Select';
import { Checkbox } from '../../components/Checkbox/Checkbox';
import { Radio } from '../../components/Radio/Radio';
import { DatePicker, DateRangePicker } from '../../components/DatePicker/DatePicker';
import { Tabs } from '../../components/Tabs';
import { Accordion } from '../../components/Accordion';
import { Table, type Column } from '../../components/Table';
import { Pagination } from '../../components/Pagination';
import { useState } from 'react';

export const Components = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [activeTab, setActiveTab] = useState('tab1');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageLong, setCurrentPageLong] = useState(10);

  const accordionItems = [
    {
      id: 'item1',
      title: 'What is your refund policy?',
      content: 'If you are unhappy with your purchase for any reason, email us within 90 days and we will refund you in full, no questions asked.'
    },
    {
      id: 'item2', 
      title: 'Do you offer technical support?',
      content: 'Yes! We offer 24/7 technical support for all our enterprise customers. Standard plans include email support with 24h response time.'
    },
    {
      id: 'item3',
      title: 'Can I cancel my subscription?',
      content: 'Absolutely. You can cancel your subscription at any time from your account settings page. Your access will continue until the end of your billing period.'
    }
  ];

  interface UserData {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    phone: string;
    department: string;
    lastLogin: string;
    actions: string;
  }

  const tableData: UserData[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', phone: '+1 (555) 123-4567', department: 'Engineering', lastLogin: '2023-10-25', actions: 'Edit | Delete' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active', phone: '+1 (555) 987-6543', department: 'Marketing', lastLogin: '2023-10-24', actions: 'Edit | Delete' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive', phone: '+1 (555) 456-7890', department: 'Sales', lastLogin: '2023-09-15', actions: 'Edit | Delete' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Viewer', status: 'Pending', phone: '+1 (555) 789-0123', department: 'HR', lastLogin: '-', actions: 'Edit | Delete' },
  ];

  const tableColumns: Column<UserData>[] = [
    { key: 'name', header: 'User Name' },
    { key: 'email', header: 'Email Address' },
    { key: 'role', header: 'Role' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value) => (
        <span style={{ 
          padding: '2px 8px', 
          borderRadius: '12px', 
          fontSize: '0.75rem',
          backgroundColor: value === 'Active' ? '#dcfce7' : value === 'Inactive' ? '#f3f4f6' : '#fef9c3',
          color: value === 'Active' ? '#166534' : value === 'Inactive' ? '#374151' : '#854d0e'
        }}>
          {value}
        </span>
      )
    },
    { key: 'phone', header: 'Phone Number' },
    { key: 'department', header: 'Department' },
    { key: 'lastLogin', header: 'Last Login' },
    { key: 'actions', header: 'Actions', width: 120 },
  ];

  const tabsData = [
    { label: 'General', value: 'tab1' },
    { label: 'Profile', value: 'tab2' },
    { label: 'Settings', value: 'tab3' },
    { label: 'Notifications', value: 'tab4' },
    { label: 'Security', value: 'tab5' },
    { label: 'Integrations', value: 'tab6' },
    { label: 'API Keys', value: 'tab7' },
    { label: 'Billing', value: 'tab8' },
    { label: 'Team Members', value: 'tab9' },
    { label: 'Audit Log', value: 'tab10' },
  ];

  const selectOptions = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 'bold' }}>UI Components Gallery</h1>
      
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Buttons</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="primary" size="small">Small</Button>
          <Button variant="primary" size="medium">Medium</Button>
          <Button variant="primary" size="full">Full Width</Button>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Inputs</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
          <Input 
            title="Standard Input" 
            placeholder="Type something..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Input 
            title="Error State" 
            placeholder="Invalid input"
            isError={true}
            errorMessage="This field has an error"
          />
          <Input 
            title="Password" 
            type="password"
            placeholder="••••••"
          />
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Selects</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
          <Select
            title="Standard Select"
            placeholder="Choose an option..."
            options={selectOptions}
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
          />
          <Select
            title="Searchable Select"
            placeholder="Search options..."
            options={selectOptions}
            value={selectValue}
            searchable
            onChange={(e) => setSelectValue(e.target.value)}
          />
          <Select
            title="Error State"
            placeholder="Choose an option..."
            options={selectOptions}
            isError={true}
            errorMessage="Please make a selection"
          />
          <Select
            title="Disabled Select"
            options={selectOptions}
            disabled
            value="1"
          />
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Selection Controls</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem', color: '#666' }}>Checkbox</h3>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <Checkbox label="Remember me" />
              <Checkbox label="Checked state" defaultChecked />
              <Checkbox label="Disabled" disabled />
              <Checkbox label="Disabled Checked" disabled defaultChecked />
            </div>
          </div>

          <div>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem', color: '#666' }}>Radio</h3>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <Radio name="demo-radio" label="Option A" />
              <Radio name="demo-radio" label="Option B" defaultChecked />
              <Radio name="demo" label="Disabled" disabled />
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Date Pickers</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px' }}>
          <div>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem', color: '#666' }}>Single Date</h3>
            <DatePicker 
              title="Birthday" 
              onChange={(e) => console.log(e.target.value)} 
            />
          </div>

          <div>
             <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem', color: '#666' }}>Date Range</h3>
             <DateRangePicker
               startDate={startDate}
               endDate={endDate}
               onStartChange={(e) => setStartDate(e.target.value)}
               onEndChange={(e) => setEndDate(e.target.value)}
             />
             <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#888' }}>
               Selected: {startDate || '...'} to {endDate || '...'}
             </p>
          </div>

          <div>
             <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem', color: '#666' }}>With Time (HH:mm:ss)</h3>
             <DatePicker 
               title="Appointment" 
               showTime
               onChange={(e) => console.log(e.target.value)} 
             />
             <div style={{ marginTop: '1rem' }}></div>
             <DateRangePicker
               startTitle="Start Time"
               endTitle="End Time"
               startDate={startDateTime}
               endDate={endDateTime}
               showTime
               onStartChange={(e) => setStartDateTime(e.target.value)}
               onEndChange={(e) => setEndDateTime(e.target.value)}
             />
          </div>
        </div>
      </section>


      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Tabs</h2>
        <div style={{ maxWidth: '100%' }}>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem', color: '#666' }}>Scrollable Tabs (Responsive)</h3>
            <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#888' }}>
                Resize window to see mobile select view. Horizontal scroll on desktop.
            </p>
            <Tabs 
                options={tabsData} 
                value={activeTab} 
                onChange={(val) => setActiveTab(String(val))} 
            />
            <div style={{ padding: '1rem', marginTop: '1rem', background: '#f9f9f9', borderRadius: '8px' }}>
                Content for: <strong>{tabsData.find(t => t.value === activeTab)?.label}</strong>
            </div>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Accordion</h2>
        <div style={{ maxWidth: '600px' }}>
             <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem', color: '#666' }}>Standard Accordion</h3>
             <Accordion items={accordionItems} />
             
             <div style={{ height: '2rem' }}></div>
             
             <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem', color: '#666' }}>Allow Multiple Open</h3>
             <Accordion items={accordionItems} allowMultiple defaultExpanded={['item1']} />
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Table</h2>
        <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem', color: '#666' }}>Scrollable Table Example</h3>
        <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#888' }}>
          This table mimics a wide data set. The container is restricted to 800px to demonstrate horizontal scrolling.
        </p>
        <div>
             <Table 
                title="User Management" 
                columns={tableColumns} 
                data={tableData} 
             />
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Pagination</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
             <div>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem', color: '#666' }}>Few Pages (≤ 5)</h3>
                <Pagination 
                  currentPage={currentPage}
                  totalPages={5} 
                  onPageChange={setCurrentPage} 
                />
                <p style={{ marginTop: '0.5rem', color: '#888', fontSize: '0.875rem' }}>Current Page: {currentPage}</p>
             </div>

             <div>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem', color: '#666' }}>Many Pages (&gt; 5) with Ellipsis</h3>
                <Pagination 
                  currentPage={currentPageLong}
                  totalPages={20} 
                  onPageChange={setCurrentPageLong} 
                />
                 <p style={{ marginTop: '0.5rem', color: '#888', fontSize: '0.875rem' }}>Current Page: {currentPageLong}</p>
             </div>
        </div>
      </section>
    </div>
  );
};
