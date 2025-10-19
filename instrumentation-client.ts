
//
// console.log("Global Analytics initialized!");
//
// function reportError(error: Error) {
//   console.log("Error event!:", error.message);
// };
//
// window.addEventListener('error', (event) => {
//   reportError(event.error);
//   console.log("from global event listener: ", event.error.message);
// });

// instrumentation-client.ts

console.log("Global Analytics initialized!");

function reportError(error: Error) {
  console.log("Error event:", error.message);
}

// Wait for the window to be ready
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    if (event.error) {
      reportError(event.error);
      console.log("from global event listener:", event.error.message);
    } else {
      console.log("Unhandled error:", event.message);
    }
  });

  // Test after listener is registered
  setTimeout(() => {
    throw new Error("Test event!");
  }, 0);
}

