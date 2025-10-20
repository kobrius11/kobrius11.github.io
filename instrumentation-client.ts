import { Log } from '@/lib/message'
// Global message
console.log("Global Analytics initialized!");

// Error event listener
// Should Build a message and report it
window.addEventListener('error', (event) => {
  const message = Log.error(event.message)
  message.report()
});


