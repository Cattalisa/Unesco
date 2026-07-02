import React, { useState } from 'react';
import { Scan, Globe } from 'lucide-react';

const Popup = () => {
  const [status, setStatus] = useState('idle');
  const [language, setLanguage] = useState('English');

  const handleScan = async () => {
    setStatus('scanning');
    
    if (chrome && chrome.tabs) {
      // Open Side Panel first
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      await chrome.sidePanel.open({ windowId: tab.windowId });
      
      // Tell background script to start analysis
      chrome.runtime.sendMessage({ type: 'TRIGGER_ANALYSIS', tabId: tab.id, language: language });
      
      setTimeout(() => setStatus('done'), 1000);
      setTimeout(() => setStatus('idle'), 3000); // Reset after 3 seconds so they can scan again
    } else {
      // Mock for dev
      setTimeout(() => setStatus('done'), 1500);
    }
  };

  return (
    <div style={{ padding: '24px', textAlign: 'center', background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(12px)' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#F1F5F9', fontFamily: "'Outfit', sans-serif" }}>MindGuard</h2>
        <p style={{ margin: 0, fontSize: '12px', color: '#94A3B8' }}>AI Emotional Manipulation Detector</p>
      </div>

      <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', background: 'rgba(30, 41, 59, 0.8)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
        <Globe size={16} color="#94A3B8" style={{ marginRight: '8px' }} />
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          disabled={status !== 'idle'}
          style={{ 
            background: 'transparent', 
            color: '#E2E8F0', 
            border: 'none', 
            outline: 'none', 
            width: '100%', 
            fontSize: '13px',
            cursor: 'pointer',
            appearance: 'none'
          }}
        >
          <option value="English" style={{ background: '#1E293B' }}>English</option>
          <option value="Indonesian" style={{ background: '#1E293B' }}>Bahasa Indonesia</option>
          <option value="Spanish" style={{ background: '#1E293B' }}>Español</option>
          <option value="French" style={{ background: '#1E293B' }}>Français</option>
        </select>
      </div>

      <button 
        onClick={handleScan}
        disabled={status !== 'idle'}
        style={{
          width: '100%',
          padding: '12px',
          background: status === 'idle' ? 'linear-gradient(90deg, #3B82F6, #8B5CF6)' : '#334155',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: status === 'idle' ? 'pointer' : 'default',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          boxShadow: status === 'idle' ? '0 4px 14px 0 rgba(59, 130, 246, 0.39)' : 'none',
          transition: 'all 0.2s ease'
        }}
      >
        <Scan size={18} />
        {status === 'idle' ? 'Scan Current Page' : status === 'scanning' ? 'Scanning...' : 'Check Side Panel!'}
      </button>
      
      {status === 'done' && (
        <p style={{ marginTop: '16px', fontSize: '12px', color: '#10B981' }}>Analysis sent to side panel.</p>
      )}
    </div>
  );
};

export default Popup;
