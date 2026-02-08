let startTime = Date.now();
let lastUrl = "";

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    try {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        
        if (lastUrl && timeSpent > 2) { 
            saveActivity(lastUrl, timeSpent);
        }

        const tab = await chrome.tabs.get(activeInfo.tabId);
        
        // Use pendingUrl if url is empty (common on fast switches)
        const currentTabUrl = tab.url || tab.pendingUrl;

        if (currentTabUrl && currentTabUrl.startsWith("http")) {
            try {
                const urlObj = new URL(currentTabUrl);
                lastUrl = urlObj.hostname;
            } catch (e) {
                console.error("Invalid URL format:", currentTabUrl);
                lastUrl = "";
            }
        } else {
            lastUrl = ""; 
        }
        
        startTime = Date.now();
    } catch (err) {
        // Silently catch tab-not-found errors which happen when closing tabs quickly
        if (!err.message.includes("No tab with id")) {
            console.error("Extension Error:", err);
        }
    }
});

async function saveActivity(domain, duration) {
    try {
        await fetch('http://localhost:5000/api/activity', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ domain, duration })
        });
        console.log(`Logged ${duration}s on ${domain}`);
    } catch (e) {
        console.log("Backend offline.");
    }
}