// background.js - Service Worker for MindGuard V2

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: false })
  .catch((error) => console.error(error));

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'TRIGGER_ANALYSIS') {
    const targetTabId = request.tabId || sender.tab.id;
    const language = request.language || "English";
    
    // Broadcast to side panel to show loading
    chrome.runtime.sendMessage({ type: 'START_ANALYSIS' });
    
    // Inject content script to extract text if not already there, then ask it for text
    chrome.scripting.executeScript({
      target: { tabId: targetTabId },
      function: extractTextFromPage,
    }).then((injectionResults) => {
      const pageText = injectionResults[0].result;
      if (!pageText) return;
      
      // Call our improved Python FastAPI Backend
      fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: pageText, language: language })
      })
      .then(res => res.json())
      .then(report => {
        // Send report to Side Panel
        chrome.runtime.sendMessage({ type: 'ANALYSIS_COMPLETE', payload: report });
        
        // Send manipulations back to content script to highlight them
        chrome.tabs.sendMessage(targetTabId, { type: 'HIGHLIGHT_MANIPULATIONS', manipulations: report.manipulations });
      })
      .catch(err => {
        console.error('Error contacting backend:', err);
      });
    });
  }
});

// Function to be injected into the page
function extractTextFromPage() {
  // Try to get main article content, fallback to body text
  const article = document.querySelector('article') || document.querySelector('main') || document.body;
  // Basic cleanup: remove scripts, styles, nav, footers
  const clone = article.cloneNode(true);
  const elementsToRemove = clone.querySelectorAll('script, style, nav, footer, header, aside, .ad, .advertisement');
  elementsToRemove.forEach(el => el.remove());
  
  return clone.innerText.substring(0, 5000); // Limit text for API limits
}
