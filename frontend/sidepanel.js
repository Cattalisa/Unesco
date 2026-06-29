document.addEventListener("DOMContentLoaded", () => {
    loadAnalysisData();

    // Bind scan buttons
    document.getElementById("sidepanel-scan-btn").addEventListener("click", runScan);
    document.getElementById("header-scan-btn").addEventListener("click", runScan);

    // Listen for focus requests from background.js (when inline highlight clicked)
    chrome.runtime.onMessage.addListener((request) => {
        if (request.action === "focus_highlight") {
            const cards = document.querySelectorAll(".card");
            cards.forEach(card => card.classList.remove("selected"));

            const targetCard = document.getElementById(`card-${request.id}`);
            if (targetCard) {
                targetCard.classList.add("selected");
                targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
        return true;
    });
});

// Watch for changes in storage (when user runs scan on a new page)
chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === "local" && changes.last_analysis) {
        loadAnalysisData();
    }
});

async function runScan() {
    const btnScan = document.getElementById("sidepanel-scan-btn");
    const btnHeader = document.getElementById("header-scan-btn");
    const spinner = document.getElementById("sidepanel-spinner");
    const statusDiv = document.getElementById("sidepanel-status");
    
    btnScan.disabled = true;
    btnHeader.disabled = true;
    btnScan.style.display = "none";
    spinner.style.display = "block";
    statusDiv.textContent = "Extracting article content...";
    
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab) throw new Error("Active tab not found.");
        
        chrome.tabs.sendMessage(tab.id, { action: "get_page_content" }, async (response) => {
            if (!response || !response.text) {
                showError("Could not read text. Please refresh the page and try again.");
                return;
            }
            
            statusDiv.textContent = "Analyzing with AI...";
            try {
                const apiResponse = await fetch("http://localhost:8000/analyze", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: response.text })
                });
                
                if (!apiResponse.ok) {
                    const errData = await apiResponse.json().catch(() => ({ detail: "API Analysis failed." }));
                    throw new Error(errData.detail || "API Analysis failed.");
                }
                
                const data = await apiResponse.json();
                
                // Save locally (will trigger loadAnalysisData via onChanged listener)
                chrome.storage.local.set({ last_analysis: data }, () => {
                    // Send highlights back
                    chrome.tabs.sendMessage(tab.id, { action: "highlight_text", data: data });
                    
                    // Reset status and buttons
                    statusDiv.textContent = "";
                    spinner.style.display = "none";
                    btnScan.style.display = "block";
                    btnScan.disabled = false;
                    btnHeader.disabled = false;
                });
                
            } catch (err) {
                showError(err.message);
            }
        });
        
    } catch (err) {
        showError(err.message);
    }
    
    function showError(msg) {
        statusDiv.innerHTML = `<span style="color: #ef4444;">Error: ${msg}</span>`;
        spinner.style.display = "none";
        btnScan.style.display = "block";
        btnScan.disabled = false;
        btnHeader.disabled = false;
    }
}

function loadAnalysisData() {
    chrome.storage.local.get("last_analysis", (data) => {
        const lastAnalysis = data.last_analysis;
        if (!lastAnalysis) return;

        document.getElementById("no-data").style.display = "none";
        document.getElementById("content-area").style.display = "block";
        
        const score = lastAnalysis.overall_score || 0;
        
        // Animate Score Number
        animateScoreNumber(score);
        
        // Update SVG Progress Ring
        updateProgressRing(score);
        
        // Set Risk Label & Color Scheme
        updateRiskLabel(score);

        // Render Cards
        const listDiv = document.getElementById("manipulation-list");
        listDiv.innerHTML = ""; // Clear existing

        const manipulations = lastAnalysis.manipulations || [];
        manipulations.forEach((item, index) => {
            const card = document.createElement("div");
            card.className = "card";
            card.id = `card-${index}`;

            // Determine border color based on score or specific techniques
            const cardColor = getSeverityColor(score);
            card.style.borderLeftColor = cardColor;

            card.innerHTML = `
                <div class="tech-header">
                    <div class="tech-title">⚠️ ${item.technique}</div>
                    <span class="tech-badge" style="background-color: ${cardColor}15; color: ${cardColor}; border: 1px solid ${cardColor}30;">
                        Active
                    </span>
                </div>
                <div class="tech-quote" style="border-left-color: ${cardColor};">"${item.text}"</div>
                <div class="tech-desc">${item.explanation}</div>
                <div class="tech-tip" style="background-color: ${cardColor}04; border-color: ${cardColor}20; color: ${lightenColor(cardColor, 40)};">
                    <span class="tip-label" style="color: ${cardColor};">💡 Tip:</span> ${item.counter_tip}
                </div>
            `;
            listDiv.appendChild(card);
        });
    });
}

function animateScoreNumber(targetScore) {
    const numEl = document.getElementById("score-number");
    let current = 0;
    if (targetScore === 0) {
        numEl.textContent = "0";
        return;
    }
    const duration = 1000; // 1s
    const stepTime = Math.abs(Math.floor(duration / targetScore));
    
    const timer = setInterval(() => {
        current += 1;
        numEl.textContent = current;
        if (current >= targetScore) {
            clearInterval(timer);
        }
    }, Math.max(stepTime, 10));
}

function updateProgressRing(score) {
    const circle = document.getElementById("score-circle");
    const circumference = 326.7; // 2 * Math.PI * 52
    
    // Set stroke color dynamically
    const color = getSeverityColor(score);
    circle.setAttribute("stroke", color);
    
    // Animate Dashoffset
    const offset = circumference - (score / 100 * circumference);
    circle.style.strokeDashoffset = offset;
}

function updateRiskLabel(score) {
    const labelEl = document.getElementById("score-label");
    let label = "Safe / Low Risk";
    let color = "#10b981"; // emerald
    
    if (score >= 70) {
        label = "Danger / Highly Manipulative";
        color = "#ef4444"; // red
    } else if (score >= 30) {
        label = "Warning / Moderate Risk";
        color = "#f59e0b"; // amber
    }
    
    labelEl.textContent = label;
    labelEl.style.color = color;
    labelEl.style.backgroundColor = `${color}15`;
    labelEl.style.border = `1px solid ${color}20`;
}

function getSeverityColor(score) {
    if (score >= 70) return "#ef4444"; // high
    if (score >= 30) return "#f59e0b"; // mid
    return "#10b981"; // low
}

// Helper to lighten a hex color slightly for text accessibility
function lightenColor(hex, percent) {
    let num = parseInt(hex.replace("#",""), 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        G = (num >> 8 & 0x00FF) + amt,
        B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<0?0:R:255)*0x10000 + (G<255?G<0?0:G:255)*0x100 + (B<255?B<0?0:B:255)).toString(16).slice(1);
}
