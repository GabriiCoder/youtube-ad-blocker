chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [{
      id: 'adBlockRule',
      priority: 1,
      action: { type: 'block' },
      condition: {
        urlFilter: [
          '*://*.doubleclick.net/*',
          '*://*.googleadservices.com/*',
          '*://*.googlesyndication.com/*',
          '*://*.youtube.com/get_video_info*adformat=*',
          '*://*.youtube.com/api/stats/ads*',
          '*://*.youtube.com/ptracking*',
          '*://*.youtube.com/gen_204*ad_*',
          '*://*.youtube.com/pagead/*'
        ]
      }
    }]
  });
});