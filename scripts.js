const quoteContainer = document.getElementById("Quotes_container");
const quoteText = document.getElementById("Quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new_quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

//loader
//show Loading

function Loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

function newQuotes() {
  Loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  if (quote.text.length > 120) {
    quoteText.classList.add("long_quote");
  } else {
    quoteText.classList.remove("long_quote");
  }
  quoteText.textContent = quote.text;
  complete();
}
async function getQuotes() {
  Loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuotes();
  } catch (error) {
    //catch is here
  }
}
//tweet Quotes
function tweetQuote() {
  const twitterUrl = `https://twitter.com/internet/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

newQuoteBtn.addEventListener("click", newQuotes);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();
