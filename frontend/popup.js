document.getElementById("analyze-btn").addEventListener("click", async () => {
    const statusDiv = document.getElementById("status");
    const spinner = document.getElementById("loading-spinner");
    const btn = document.getElementById("analyze-btn");

    btn.disabled = true;
    spinner.style.display = "block";
    statusDiv.innerHTML = '<span class="status-text">Reading article text...</span>';

    // Get active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) {
        statusDiv.innerHTML = '<span class="status-text" style="color: #ef4444;">Error: Active tab not found.</span>';
        btn.disabled = false;
        spinner.style.display = "none";
        return;
    }

    // Request content script to get text
    chrome.tabs.sendMessage(tab.id, { action: "get_page_content" }, async (response) => {
        if (!response || !response.text) {
            statusDiv.innerHTML = '<span class="status-text" style="color: #ef4444;">Error: Could not read page text. Make sure you are on a webpage.</span>';
            btn.disabled = false;
            spinner.style.display = "none";
            return;
        }

        statusDiv.innerHTML = '<span class="status-text">Analyzing with AI...</span>';
        try {
            const apiResponse = await fetch("http://localhost:8000/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: response.text })
            });

            if (!apiResponse.ok) {
                const errData = await apiResponse.json().catch(() => ({ detail: "API analysis failed." }));
                throw new Error(errData.detail || "API analysis failed.");
            }

            const data = await apiResponse.json();
            statusDiv.innerHTML = `<span class="status-text" style="color: #10b981;">Scan Complete! Score: ${data.overall_score}/100</span>`;

            // Save results locally for the side panel to read
            chrome.storage.local.set({ last_analysis: data }, () => {
                // Open the side panel
                chrome.sidePanel.open({ tabId: tab.id });
                // Send the highlights back to the content script
                chrome.tabs.sendMessage(tab.id, { action: "highlight_text", data: data });
                
                setTimeout(() => {
                    btn.disabled = false;
                    spinner.style.display = "none";
                }, 1000);
            });

        } catch (error) {
            statusDiv.innerHTML = `<span class="status-text" style="color: #ef4444;">Error: ${error.message}</span>`;
            btn.disabled = false;
            spinner.style.display = "none";
        }
    });
});
