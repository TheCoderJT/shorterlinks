const input = document.getElementById("url");
const btn = document.getElementById("btn");
const inputContainer = document.querySelector(".input");
let userInput = "";
let shortLink = `https://api.shrtco.de/v2/shorten?url=${userInput}`;
const shareLinkP = document.getElementById("shareLinkP");
const shareLinkA = document.getElementById("shortenLinkP");
const shortLinkA = document.getElementById("shortenLinkA");
const shortLinkP = document.getElementById("shortenLinkP");
const infoHero = document.querySelector(".input__link__info");
const loading = document.querySelector(".loading");
const notAUrl = document.querySelector(".notvalidurl");

btn.addEventListener("click", (e) => {
  userInput = e.target.previousElementSibling.value;
  if (isValidURL(userInput)) {
    loading.style.display = "flex";
    const data = fetchAPI(userInput);
  } else {
    const urlValid = notAUrl.classList.remove("hide");
    urlValid ? notAUrl.classList.add("hide") : null;
    setTimeout(() => {
      notAUrl.classList.add("hide");
    }, 3000);
  }
});

input.addEventListener("input", (e) => {
  if (e.target.value.length === 0) {
    infoHero.classList.add("hide");
  }
});

const fetchAPI = async (url) => {
  try {
    const resp = await fetch(shortLink + url, { method: "GET" });
    const data = await resp.json();
    setText(data);
    loading.style.display = "none";
    infoHero.classList.remove("hide");
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

const setText = async (data) => {
  shareLinkP.innerText = await data.result.share_link;
  shareLinkA.setAttribute("href", await data.result.share_link);
  shareLinkA.pathname = await data.result.share_link;
  shortLinkP.innerText = await data.result.short_link;
  shortLinkA.setAttribute("href", await data.result.short_link);
  shortLinkA.pathname = await data.result.short_link;
};

function isValidURL(string) {
  let res = string.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res !== null;
}
