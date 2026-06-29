// background.js - Manages extension service worker tasks

chrome.runtime.onInstalled.addListener(() => {
    console.log("MindGuard Extension Installed.");
});

// Configure side panel behavior to open on action click
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "select_highlight") {
        // Broadcast the focus event to the sidepanel
        chrome.runtime.sendMessage({ action: "focus_highlight", id: request.id });
    }
    return true;
});
