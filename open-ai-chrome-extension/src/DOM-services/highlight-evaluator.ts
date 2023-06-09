
import { DOMMessage } from "../types";
 
// This script is built into content.js and injected into the page

let summaryEnabled = false;

const messagesFromReactAppListener = (
   msg: DOMMessage) => {
    if (msg.type === 'TOGGLE_SUMMARY_ENABLED'){
        summaryEnabled = msg.summaryEnabled;
    }
}
 
/**
* Fired when a message is sent from either an extension process or a content script.
*/
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);

document.addEventListener('mouseup', async () => {
    const selectedText = window.getSelection()?.toString();
    if (selectedText && summaryEnabled) {
        // Send the selected text to the extension's background script or popup
        await fetch('http://localhost:3002/highlights', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: selectedText })
        })
    }
});

export {};