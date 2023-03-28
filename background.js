const extensions = "https://meet.google.com";

const micOnToText = (micOn) => {
  if (micOn) {
    return "ON";
  }

  return "OFF";
};

const inAllTabs = (fn) => {
  chrome.tabs.query({}, function (tabs) {
    tabs.forEach(function (tab) {
      fn(tab);
    });
  });
};

const muteMic = (tab) => {
  if (tab.url.startsWith(extensions)) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: true },
      files: ["scripts/mute.js"],
    });
  }
};

const unmuteMic = (tab) => {
  if (tab.url.startsWith(extensions)) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: true },
      files: ["scripts/unmute.js"],
    });
  }
};

const listenClicks = (tab) => {
  if (tab.url.startsWith(extensions)) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: true },
      files: ["scripts/listen-click.js"],
    });
  }
};

const synchronizeState = (micOn) => {
  chrome.storage.session.set({ micOn });

  chrome.action.setBadgeText({
    text: micOnToText(micOn),
  });

  chrome.action.setBadgeTextColor({
    color: "white",
  });

  chrome.action.setBadgeBackgroundColor({
    color: micOn ? "#3C4043" : "#EA4335",
  });

  if (micOn) {
    inAllTabs(unmuteMic);
  } else {
    inAllTabs(muteMic);
  }
};

chrome.runtime.onInstalled.addListener(async () => {
  synchronizeState(true);
  inAllTabs(listenClicks);
});

chrome.runtime.onMessage.addListener((message) => {
  synchronizeState(message.micOn);
});

chrome.action.onClicked.addListener(async () => {
  const state = await chrome.storage.session.get(["micOn"]);
  synchronizeState(!state?.micOn);
});
