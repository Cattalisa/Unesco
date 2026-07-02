import React, { useState, useEffect } from 'react';

const SidePanel = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Listen for messages from background script
    const messageListener = (message) => {
      try {
        if (message.type === 'START_ANALYSIS') {
          setLoading(true);
          setError(null);
        } else if (message.type === 'ANALYSIS_COMPLETE') {
          setReport(message.payload);
          setLoading(false);
        } else if (message.type === 'ANALYSIS_ERROR') {
          setError(message.payload);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error in message listener:", err);
      }
    };
    
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
      chrome.runtime.onMessage.addListener(messageListener);
      return () => {
        try {
          chrome.runtime.onMessage.removeListener(messageListener);
        } catch(e) {}
      };
    }
  }, []);

  // For testing purposes during development
  useEffect(() => {
    if (typeof chrome === 'undefined' || !chrome.runtime || !chrome.runtime.id) {
       setReport({
         overall_score: 85,
         manipulations: [
           {
             text: "You must act now or lose everything forever!",
             technique: "Fear Appeal",
             severity: "High",
             explanation: "Uses extreme language to trigger a panic response.",
             counter_tip: "Ask yourself if the threat is realistic."
           }
         ]
       });
    }
  }, []);

  const getSeverityStyle = (severity) => {
    const s = (severity || '').toLowerCase();
    if (s === 'high') return { borderLeft: '4px solid #FF3B30', bg: 'rgba(255, 59, 48, 0.1)', color: '#FF3B30' };
    if (s === 'medium') return { borderLeft: '4px solid #FF9500', bg: 'rgba(255, 149, 0, 0.1)', color: '#FF9500' };
    return { borderLeft: '4px solid #34C759', bg: 'rgba(52, 199, 89, 0.1)', color: '#34C759' };
  };

  return (
    <div style={{ 
      padding: '24px', 
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      color: '#E2E8F0',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)'
    }}>
      
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px', 
        marginBottom: '32px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        paddingBottom: '16px'
      }}>
        <div style={{ 
          width: '32px', height: '32px', borderRadius: '8px', 
          background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 'bold', fontSize: '18px', color: 'white'
        }}>M</div>
        <h1 style={{ 
          margin: 0, fontSize: '22px', fontWeight: 700, 
          letterSpacing: '0.5px',
          background: 'linear-gradient(90deg, #60A5FA, #A78BFA)', 
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' 
        }}>MindGuard AI</h1>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <div style={{ 
            width: '40px', height: '40px', 
            border: '3px solid rgba(96, 165, 250, 0.2)', 
            borderTopColor: '#60A5FA', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px auto'
          }}>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
          <p style={{ color: '#94A3B8', fontSize: '15px' }}>Scanning for emotional manipulation...</p>
        </div>
      ) : error ? (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #EF4444', borderRadius: '12px', padding: '16px' }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#FCA5A5' }}>Analysis Failed</h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#FECACA' }}>{error}</p>
        </div>
      ) : report ? (
        <div>
          {/* Score Card */}
          <div style={{ 
            background: 'rgba(30, 41, 59, 0.6)', 
            borderRadius: '16px', 
            padding: '24px', 
            marginBottom: '24px', 
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '15px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Manipulation Score
            </h2>
            <div style={{ 
              fontSize: '48px', 
              fontWeight: 800, 
              color: report.overall_score > 60 ? '#EF4444' : report.overall_score > 30 ? '#F59E0B' : '#10B981',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}>
              {report.overall_score}
            </div>
            <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: '#CBD5E1' }}>
              {report.overall_score > 60 ? 'High Risk! Read carefully.' : report.overall_score > 30 ? 'Moderate manipulation detected.' : 'Content looks objective.'}
            </p>
          </div>

          {/* Manipulations List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {report.manipulations.map((item, idx) => {
              const style = getSeverityStyle(item.severity);
              return (
                <div key={idx} style={{ 
                  background: 'rgba(30, 41, 59, 0.8)', 
                  borderRadius: '12px', 
                  borderLeft: style.borderLeft,
                  padding: '20px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <span style={{ fontWeight: 700, color: style.color, fontSize: '14px', textTransform: 'uppercase' }}>
                      {item.technique}
                    </span>
                    <span style={{ fontSize: '11px', background: style.bg, color: style.color, padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
                      {item.severity}
                    </span>
                  </div>
                  
                  <blockquote style={{ 
                    margin: '0 0 16px 0', 
                    fontStyle: 'italic', 
                    color: '#F1F5F9', 
                    fontSize: '15px',
                    lineHeight: '1.5',
                    background: 'rgba(0,0,0,0.2)',
                    padding: '12px',
                    borderRadius: '8px'
                  }}>
                    "{item.text}"
                  </blockquote>
                  
                  <p style={{ fontSize: '14px', color: '#CBD5E1', lineHeight: '1.6', margin: '0 0 16px 0' }}>
                    {item.explanation}
                  </p>
                  
                  <div style={{ 
                    background: 'rgba(56, 189, 248, 0.1)', 
                    border: '1px solid rgba(56, 189, 248, 0.2)',
                    padding: '12px', 
                    borderRadius: '8px' 
                  }}>
                    <strong style={{ display: 'block', fontSize: '12px', color: '#38BDF8', marginBottom: '4px', textTransform: 'uppercase' }}>
                      💡 MindGuard Tip
                    </strong>
                    <p style={{ margin: 0, fontSize: '13px', color: '#E0F2FE', lineHeight: '1.5' }}>
                      {item.counter_tip}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          marginTop: '80px', 
          padding: '40px 20px',
          background: 'rgba(255,255,255,0.02)',
          borderRadius: '16px',
          border: '1px dashed rgba(255,255,255,0.1)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛡️</div>
          <h3 style={{ margin: '0 0 8px 0', color: '#E2E8F0', fontWeight: 600 }}>Ready to Scan</h3>
          <p style={{ margin: 0, color: '#94A3B8', fontSize: '14px', lineHeight: '1.5' }}>
            Open the MindGuard popup menu and click "Scan Current Page" to analyze this article.
          </p>
        </div>
      )}
    </div>
  );
};

export default SidePanel;
