// content.js - Scrapes text and performs inline highlighting

console.log("MindGuard Content Script loaded.");

// Listening for messages from popup or sidepanel
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "get_page_content") {
        const pageText = getArticleText();
        sendResponse({ text: pageText, url: window.location.href });
    } else if (request.action === "highlight_text") {
        const manipulations = request.data.manipulations || [];
        const score = request.data.overall_score || 0;
        applyHighlights(manipulations, score);
        sendResponse({ status: "success" });
    }
    return true;
});

// Smart article text extractor (ignoring menus, sidebars, ads, etc.)
function getArticleText() {
    // Common selectors for main content area on news sites
    const selectors = [
        "article",
        "[class*='article-body']",
        "[class*='entry-content']",
        "[class*='post-content']",
        "[class*='story-content']",
        "[class*='article-content']",
        "[id*='article-body']",
        "[id*='entry-content']",
        "[id*='post-content']"
    ];
    
    for (const selector of selectors) {
        const el = document.querySelector(selector);
        if (el && el.innerText && el.innerText.trim().length > 250) {
            console.log("MindGuard: Extracted article text from selector:", selector);
            return el.innerText.trim();
        }
    }
    
    // Fallback: Clone body, remove non-content tags, extract remaining text
    const bodyClone = document.body.cloneNode(true);
    const tagsToRemove = ["nav", "header", "footer", "aside", "script", "style", "iframe", "noscript", ".ads", "[class*='navigation']", "[class*='menu']"];
    
    tagsToRemove.forEach(selector => {
        try {
            const elements = bodyClone.querySelectorAll(selector);
            elements.forEach(el => el.remove());
        } catch (e) {
            // Ignore syntax errors for complex selectors
        }
    });
    
    console.log("MindGuard: Fallback extraction (cleaned body text)");
    return bodyClone.innerText ? bodyClone.innerText.trim() : "";
}

function applyHighlights(manipulations, score) {
    // Clear any existing highlights first
    const existing = document.querySelectorAll(".mg-highlight");
    existing.forEach(span => {
        const parent = span.parentNode;
        if (parent) {
            parent.replaceChild(document.createTextNode(span.textContent), span);
            parent.normalize(); // Join adjacent text nodes
        }
    });

    manipulations.forEach((item, index) => {
        const textToFind = item.text.trim();
        if (textToFind.length < 10) return; // Ignore very short phrases to avoid false matches
        walkAndHighlight(document.body, textToFind, item.technique, index, score);
    });
}

function walkAndHighlight(node, text, technique, id, score) {
    if (node.nodeType === Node.TEXT_NODE) {
        const textContent = node.nodeValue;
        const index = textContent.toLowerCase().indexOf(text.toLowerCase());
        
        if (index >= 0) {
            const parent = node.parentNode;
            if (parent && parent.tagName !== "SCRIPT" && parent.tagName !== "STYLE" && parent.tagName !== "TEXTAREA" && !parent.classList.contains("mg-highlight")) {
                const matchText = textContent.substring(index, index + text.length);
                const beforeText = textContent.substring(0, index);
                const afterText = textContent.substring(index + text.length);

                const beforeNode = document.createTextNode(beforeText);
                const afterNode = document.createTextNode(afterText);

                const highlightSpan = document.createElement("span");
                const isDanger = score >= 70;
                highlightSpan.className = `mg-highlight ${isDanger ? 'mg-highlight-danger' : ''}`;
                highlightSpan.dataset.tech = technique;
                highlightSpan.dataset.id = id;
                highlightSpan.appendChild(document.createTextNode(matchText));

                // Add event listener to send message to sidepanel when clicked
                highlightSpan.addEventListener("click", () => {
                    chrome.runtime.sendMessage({ action: "select_highlight", id: id });
                });

                parent.insertBefore(beforeNode, node);
                parent.insertBefore(highlightSpan, node);
                parent.insertBefore(afterNode, node);
                parent.removeChild(node);
            }
        }
    } else {
        for (let i = 0; i < node.childNodes.length; i++) {
            walkAndHighlight(node.childNodes[i], text, technique, id, score);
        }
    }
}
