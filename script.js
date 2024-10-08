const popUp = document.createElement("div");
popUp.className = "modal";

const form = document.querySelector("form");
form.className = "form";

const btn = document.querySelector(".btn");

const closeBtn = document.createElement("button");
closeBtn.className = "closeModalBtn";
closeBtn.type = "button";

const img = document.createElement("img");
img.src = "./images/close.svg";
img.width = "20";
img.height = "20";

const img1 = document.createElement("img");
img1.src = "./images/close.svg";
img1.width = "25";
img1.height = "25";
img1.className = "close_privacy";

const body = document.querySelector("body");

const container = document.querySelector(".container");

const alertOk = document.querySelector(".tab2");

const privacyPopUp = document.querySelector(".privacy_popup");

const sendBtn = document.getElementById("sendBtn");

const prevBtn = document.getElementById("prevBtn");

const nextBtn = document.getElementById("nextBtn");

const step = document.getElementsByClassName("step");

const tab = document.getElementsByClassName("tab");

const box = document.querySelector(".login-box");

const warn = document.querySelector(".warn");

const input = document.querySelector(".maskphone");

// const TOKEN = "5856059976:AAHi68Tu9T8jSghs6j6tlfVk1dZWWPw-PGc";

// const CHAT_ID = "-100169583301";

const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

privacyPopUp.append(img1);
closeBtn.append(img);
form.append(closeBtn);
popUp.append(form);
document.body.append(popUp);

btn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
popUp.addEventListener("click", closeModal);
form.addEventListener("click", (event) => event.stopPropagation());

function openModal() {
  popUp.style.display = "flex";
  body.style.overflow = "hidden";
}

function closeModal() {
  popUp.style.display = "none";
  body.style.overflow = "initial";
  body.style.overflowY = "hidden";
}

function openAlertOk() {
  body.style.overflow = "hidden";
  alertOk.style.display = "flex";
}

function closeAlertOk() {
  alertOk.style.display = "none";
  body.style.overflowY = "hidden";
  form.submit();
}

function openPrivacy() {
  container.style.display = "none";
  privacyPopUp.style.display = "flex";
  closeModal();
  body.style.overflow = "initial";
}

function closePrivacy() {
  container.style.display = "flex";
  privacyPopUp.style.display = "none";
  openModal();
}

form.addEventListener("submit", function (el) {
  el.preventDefault();

  let checkState = document.querySelector('input[name="name"]:checked').value;
  let checkState1 = document.querySelector('input[name="name1"]:checked').value;
  let checkState2 = document.querySelector('input[name="name2"]:checked').value;
  let checkState3 = document.querySelector('input[name="name3"]:checked').value;
  let checkState4 = document.querySelector('input[name="name4"]:checked').value;

  let message = `<b>ЗАЯВКА С САЙТА</b>\n\n`;
  message += `<b>Cпособ связи: </b>${checkState}\n`;
  message += `<b>Кому: </b>${checkState1}\n`;
  message += `<b>Состоит ли в реестре НРС: </b>${checkState2}\n`;
  message += `<b>Физ. или Юр.лицо: </b>${checkState3}\n`;
  message += `<b>С пол. конф.: </b>${checkState4}\n`;
  message += `<b>Телефон:  </b>${this.tel.value}`;
  axios
    .post(URL, {
      chat_id: CHAT_ID,
      parse_mode: "html",
      text: message,
    })
    .then((res) => {
      this.tel.value = "";
      let radio = document.getElementsByName("name");
      for (let i = 0; i < radio.length; i++) radio[i].checked = false;
      let radio1 = document.getElementsByName("name1");
      for (let i = 0; i < radio1.length; i++) radio1[i].checked = false;
      let radio2 = document.getElementsByName("name2");
      for (let i = 0; i < radio2.length; i++) radio2[i].checked = false;
      let radio3 = document.getElementsByName("name3");
      for (let i = 0; i < radio3.length; i++) radio3[i].checked = false;
      let radio4 = document.getElementsByName("name4");
      for (let i = 0; i < radio4.length; i++) radio4[i].checked = false;
      closeModal();
      openAlertOk();
    })
    .catch((err) => {
      alert(
        "Что-то пошло не так(((\nПерезагрузите страницу и попробуйте снова"
      );
    })
    .finally(() => {
      console.log("ok");
    });
});

let currentTab = 0;

showTab(currentTab);

function showTab(n) {
  tab[n].style.display = "block";
  if (n == 0) {
    prevBtn.style.display = "none";
    nextBtn.style.display = "inline";
  } else {
    sendBtn.style.display = "none";
    prevBtn.style.display = "inline";
    nextBtn.style.display = "inline";
  }
  if (n == tab.length - 1) {
    nextBtn.style.display = "none";
    prevBtn.style.display = "none";
    sendBtn.style.display = "inline-block";
    sendBtn.innerHTML = "ОТПРАВИТЬ";
  } else {
    nextBtn.innerHTML = "ВПЕРЕД";
  }
  fixStepIndicator(n);
}

function nextPrev(n) {
  if (n == 1 && !validateForm()) return false;
  tab[currentTab].style.display = "none";
  currentTab = currentTab + n;
  showTab(currentTab);
}

function validateForm() {
  let b;
  let valid = true;
  let checked = false;

  b = tab[currentTab].querySelectorAll('input[type="radio"]');

  if (b.length > 0) {
    for (let i = 0; i < b.length; i++) {
      if (b[i].checked) {
        checked = true;
        break;
      }
    }

    if (!checked) {
      box.className += " invalid";
      warn.style.display = "block";
      valid = false;
    }
  }

  if (valid) {
    step[currentTab].className += " finish";
    box.classList.remove("invalid");
    warn.style.display = "none";
  }
  return valid;
}

function fixStepIndicator(num) {
  for (let i = 0; i < step.length; ++i) {
    step[i].className = step[i].className.replace(" active", "");
  }
  step[num].className += " active";
}

document.addEventListener("DOMContentLoaded", function () {
  input.addEventListener("input", mask);
  input.addEventListener("focus", mask);
  input.addEventListener("blur", mask);

  function mask(event) {
    let blank = "+_ (___) ___-__-__";
    let i = 0;
    let val = this.value.replace(/\D/g, "").replace(/^8/, "7");

    this.value = blank.replace(/./g, function (char) {
      if (/[_\d]/.test(char) && i < val.length) return val.charAt(i++);

      return i >= val.length ? "" : char;
    });
  }
});
