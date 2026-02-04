import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select/Select';
import { Checkbox } from '../../components/Checkbox/Checkbox';
import { Radio } from '../../components/Radio/Radio';
import { DatePicker, DateRangePicker } from '../../components/DatePicker/DatePicker';
import { Tabs } from '../../components/Tabs';
import { Accordion } from '../../components/Accordion';
import { useState } from 'react';

export const Components = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [activeTab, setActiveTab] = useState('tab1');

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
    </div>
  );
};
