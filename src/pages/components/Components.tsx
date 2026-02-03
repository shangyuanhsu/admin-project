import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useState } from 'react';

export const Components = () => {
  const [inputValue, setInputValue] = useState('');

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
    </div>
  );
};
