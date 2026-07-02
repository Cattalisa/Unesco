// content.js - DOM Highlighter for MindGuard V2

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'HIGHLIGHT_MANIPULATIONS') {
    highlightTextInDOM(request.manipulations);
  }
});

function highlightTextInDOM(manipulations) {
  if (!manipulations || manipulations.length === 0) return;
  
  // Inject CSS for the highlights if not already injected
  if (!document.getElementById('mindguard-css')) {
    const style = document.createElement('style');
    style.id = 'mindguard-css';
    style.textContent = `
      .mg-highlight {
        background-color: rgba(239, 68, 68, 0.2);
        border-bottom: 2px dashed #EF4444;
        cursor: pointer;
        transition: all 0.2s ease;
        position: relative;
        display: inline;
      }
      .mg-highlight.mg-medium {
        background-color: rgba(249, 115, 22, 0.2);
        border-bottom: 2px dashed #F97316;
      }
      .mg-highlight:hover {
        background-color: rgba(239, 68, 68, 0.4);
        transform: scale(1.02);
      }
      .mg-highlight.mg-medium:hover {
        background-color: rgba(249, 115, 22, 0.4);
      }
    `;
    document.head.appendChild(style);
  }

  // Simple text search and replace with <mark> tags (Note: Real world requires complex text-node traversal to not break HTML)
  // For this MVP, we use window.find as a safe built-in browser API
  
  // Clear selection first
  window.getSelection().removeAllRanges();
  
  manipulations.forEach(man => {
    // Determine class based on severity
    let className = 'mg-highlight';
    if (man.severity?.toLowerCase() === 'medium' || man.severity?.toLowerCase() === 'low') {
      className += ' mg-medium';
    }
    
    // Fallback: simple text replacement in body if window.find is blocked (dangerous but works for MVP)
    // A better approach is using TreeWalker, but this is a starter template.
    try {
      if(window.find(man.text, false, false, true, false, true, false)) {
        const selection = window.getSelection();
        if(selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const mark = document.createElement('mark');
          mark.className = className;
          mark.title = `MindGuard: ${man.technique}`;
          range.surroundContents(mark);
        }
      }
    } catch(e) {
      console.log('MindGuard: Could not highlight', man.text);
    }
  });
  
  window.getSelection().removeAllRanges();
}
