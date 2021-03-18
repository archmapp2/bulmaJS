// archLib.js

// ss: String, not selector
const $$Id0 = (ss) => {
  return document.getElementById(ss);
};
const $$Id = (ss) => {
  ss = ss.substring(0, 1) === '#' ? ss.substring(1) : ss;
  return document.getElementById(ss);
};
const $$cn = (ss) => document.getElementsByClassName(ss);
const $$cn1 = (ss) => document.getElementsByClassName(ss)[0];

const $$tn = (ss) => document.getElementsByTagName(ss);
const $$tn1 = (ss) => document.getElementsByTagName(ss)[0];

const $$na = (ss) => document.getElementsByName(ss);
const $$na1 = (ss) => document.getElementsByName(ss)[0];

// selector
const $$q = (sel) => document.querySelector(sel);
const $$qAll = (sel) => document.querySelectorAll(sel);

const $$ocL = (o, ss = 'is-active') => o.classList.toggle(ss);

const $$sBq = (btnId, { target, changeClass }, toggle) =>
  setBtn_q(btnId, { target, changeClass }, toggle);

const $$sBcn1 = (btnId, { target, changeClass }, toggle) =>
  setBtn_cn1(btnId, { target, changeClass }, toggle);

const $$sB = (btnId, { target, changeClass }, toggle) =>
  setBtn_TargetobjToggle(btnId, { target, changeClass }, toggle);

const $$sBe_target = (e_target, btnId, { target, changeClass }, toggle) => {
  setBtn_eTargetobjToggle(e_target, btnId, { target, changeClass }, toggle);
};
const $$de = (f) => {
  document.addEventListener('DOMContentLoaded', f);
};

const $$ogA = (o, ss) => o.getAttribute('data-' + ss);

const $$oe = (o, f) => {
  o.addEventListener('click', f);
};

const $$oes = (o, f) => {
  o.addEventListener('submit', f);
};

const $$qe = (ss, f) => {
  $$q(ss).addEventListener('click', f);
};

const $$qAe = (sel, f) => {
  $$qAll(sel).forEach((o) => o.addEventListener('click', () => f(o)))
};

// const $$ = () => {

// }

setBtn_q = function (
  btnId,
  { target, changeClass = 'is-active' },
  toggle = 'toggle'
) {
  $$q(btnId).addEventListener('click', function (e) {
    // console.log('e.target:', e.target);
    $$q(target).classList.toggle(changeClass);
  });
};

const $$oeSW = (
  btnId,
  { trgt, changeClass = 'is-active' },
  toggle = 'toggle',
  stopP = false
) => {
  switch (toggle) {
    case 'add':
      if (stopP === true)
        $$oe(btnId, function (e) {
          e.stopPropagation();
          trgt.classList.add(changeClass);
        });
      else $$oe(btnId, () => trgt.classList.add(changeClass));
      break;
    case 'remove':
      if (stopP === true)
        $$oe(btnId, function (e) {
          e.stopPropagation();
          trgt.classList.remove(changeClass);
        });
      else $$oe(btnId, () => trgt.classList.remove(changeClass));
      break;
    default:
      if (stopP === true)
        $$oe(btnId, (e) => {
          console.log(
            'e.target',
            e.target
            // e.target.textContent, // 空白文字も含む
            // e.target.innerText == e.target.innerText.trim()
          );
          console.log($$ogA(e.target, 'item'));
          // console.log(e.target.getAttribute('data-item'));

          e.stopPropagation();
          trgt.classList.toggle(changeClass);
        });
      // $$oe(btnId, function (e) {
      //   e.stopPropagation();
      //   trgt.classList.toggle(changeClass);
      // });
      else $$oe(btnId, () => trgt.classList.toggle(changeClass));
      break;
  }
};

const $$qoeSW = (
  btnId,
  { target, changeClass = 'is-active' },
  toggle = 'toggle'
) => {
  const trgt = $$q('target');

  switch (toggle) {
    case 'add':
      $$qe(btnId, () => trgt.classList.add(changeClass));
      break;
    case 'remove':
      $$qe(btnId, () => trgt.classList.remove(changeClass));
      break;
    default:
      $$qe(btnId, () => trgt.classList.toggle(changeClass));
      break;
  }
};

setBtn_cn1 = function (
  btnId,
  { target, changeClass = 'is-active' },
  toggle = 'toggle'
) {
  $$cn1(btnId).addEventListener('click', function (e) {
    // console.log('e.target:', e.target);
    $$cn1(target).classList.toggle(changeClass);
  });
};

// ///////////////////////////////////////
// btnId: id or class
// targetObj {target, changeClass = 'is-active'}
// toggle
setBtn_TargetobjToggle = function (
  btnId,
  { target, changeClass = 'is-active' },
  toggle = 'toggle'
) {
  // btnId: id or class
  let btnToggle = $$Id(btnId);
  if (!btnToggle) {
    btnToggle = $$cn1(btnId);
    if (!btnToggle) {
      console.log(`Can't find btnId: id nor class: ${btnToggle}`);
      return;
    }
  }

  if (!target) {
    console.log(`Not exist target: ${target}`);
    return;
  }

  // target: id or class
  let trgt = $$Id(target);
  if (!trgt) {
    trgt = $$cn1(target);
    if (!trgt) {
      console.log(`Can't find target: id nor class: ${trgt}`);
      return;
    }
  }

  switch (toggle) {
    case 'add':
      btnToggle.addEventListener('click', function () {
        trgt.classList.add(changeClass);
      });
      break;
    case 'remove':
      btnToggle.addEventListener('click', function () {
        trgt.classList.remove(changeClass);
      });
      break;
    default:
      btnToggle.addEventListener('click', function (e) {
        console.log('e.target:', e.target);
        trgt.classList.toggle(changeClass);
      });
      break;
  }
};

// function swT(btnToggle, {trgt, changeClass}, toggle) {
//     switch (toggle) {
//     case 'add':
//       $$oeq(btnToggle, () => {
//         trgt.classList.add(changeClass);
//       });
//       break;
//     case 'remove':
//       btnToggle.addEventListener('click', function () {
//         trgt.classList.remove(changeClass);
//       });
//       break;
//     default:
//       btnToggle.addEventListener('click', function (e) {
//         // console.log('e.target:', e.target);
//         trgt.classList.toggle(changeClass);
//       });
//       break;
//   }
// }

setBtn_eTargetobjToggle = function (
  e_target,
  btnId,
  { target, changeClass = 'is-active' },
  toggle = 'toggle'
) {
  // e_target: id or class
  let e_Target = $$Id(e_target);
  if (!e_Target) {
    e_Target = $$cn1(e_target);
    if (!e_Target) {
      console.log(`Can't find exId: id nor class: ${e_Target}`);
      return;
    }
  }
  // btnId: id or class
  let btnToggle = $$Id(btnId);
  if (!btnToggle) {
    btnToggle = $$cn1(btnId);
    if (!btnToggle) {
      console.log(`Can't find btnId: id nor class: ${btnToggle}`);
      return;
    }
  }

  if (!target) {
    console.log(`Not exist target: ${target}`);
    return;
  }

  // target: id or class
  let trgt = $$Id(target);
  if (!trgt) {
    trgt = $$cn1(target);
    if (!trgt) {
      console.log(`Can't find target: id nor class: ${trgt}`);
      return;
    }
  }

  switch (toggle) {
    case 'add':
      btnToggle.addEventListener('click', function () {
        if (e.target === e_Target) {
          trgt.classList.add(changeClass);
        }
      });
      break;
    case 'remove':
      btnToggle.addEventListener('click', function () {
        if (e.target === e_Target) {
          trgt.classList.remove(changeClass);
        }
      });
      break;
    default:
      btnToggle.addEventListener('click', function (e) {
        console.log('e.target:', e.target);
        console.log('e_Target:', e_Target);
        if (e.target === e_Target) {
          trgt.classList.toggle(changeClass);
        }
      });
      break;
  }
};
