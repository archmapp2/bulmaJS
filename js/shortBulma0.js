// shortLib.js

// ss: String, not selector
const $$Id0 = (ss) => {
  return document.getElementById(ss);
};
const $$Id = (ss) => {
  ss = ss.substring(0, 1) === '#' ? ss.substring(1) : ss;
  return document.getElementById(ss);
};

// selector
const $$q = (sel) => document.querySelector(sel);
const $$qAll = (sel) => document.querySelectorAll(sel);

const $$de = (f) => {
  document.addEventListener('DOMContentLoaded', f);
};

const $$qecL = (ss, ssT, cN = 'is-active', mN = 'toggle') => {
  $$qe(ss, (e) => {
    e.stopPropagation();
    $$qcL(ssT, cN, mN);
  });
};

const $$qe = (ss, f) => {
  $$oe($$q(ss), f);
};

const $$doe = (o, f) => {
  $$de(() => $$oe(o, f));
};

const $$dqoe = (sel, f) => {
  $$de(() => $$qe(sel, f));
};

const $$oe = (o, f) => {
  o.addEventListener('click', f);
};

const $$qe = (sel, f) => {
  $$oe($$q(sel), f);
};

const $$qAe = (sel, f) => {
  $$qAll(sel).forEach((o) => $$oe(o, f));
};

const $$qcL = (sel, cN = 'is-active', mN = 'toggle') =>
  $$q(sel).classList[mN](cN);

const $$ocL = (o, cN = 'is-active') => o.classList.toggle(cN);

const $$oes = (o, f) => {
  o.addEventListener('submit', f);
};

const $$ogA = (o, ss) => o.getAttribute('data-' + ss);
const $$ogD = (o, ss) => o.dataset[ss];
const $$qogA = (sel, ss) => $$q(sel).getAttribute('data-' + ss);
const $$qogD = (sel, ss) => $$q(sel).dataset[ss];

const $$ocLm = (
  o,
  { trgt, cN = 'is-active' },
  mN = 'toggle',
  stopP = true
) => {
  $$oe(o, (e) => {
    if (stopP) e.stopPropagation();
    trgt.classList[mN](cN);
  });
};

const $$oAcLm = (
  o,
  { trgts, cN = 'is-active' }, // trgts: array
  mN = 'toggle',
  stopP = true
) => {
  $$oe(o, (e) => {
    if (stopP) e.stopPropagation();
    trgts.forEach((t) => t.classList[mN](cN));
  });
};

const $$hbs = (ss, context) => Handlebars.compile(ss)(context);
const $$hbP = (ssP, context) => Handlebars.templates[ssP](context);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const $$bulmaMenu = (ss, ssT) => {
  $$qecL(ss, ssT);
  $$qecL('body', ssT, 'is-active', 'remove');
};


const $$bulmaTabs = (ssTabs, ssContent) => {
  const tabs = $$qAll(ssTabs);
  const boxes = $$qAll(ssContent);

  tabs.forEach((tab) => {
    const target = $$Id(tab.dataset.target);

    $$oe(tab, () => {
      $$bulmaTab(tabs, tab);
      $$bulmaTab(boxes, target, 'is-hidden');
    });
  });
};

// $$bulmaTabs('.tabs li', '#tab-content > div');

const $$bulmaTab = (items, target, cN = 'is-active') => {
  items.forEach((item) => {
    if (item === target) {
      $$ocL(item, cN, 'remove');
    } else {
      $$ocL(item, cN, 'add');
    }
  });
};
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const $$cn = (ss) => document.getElementsByClassName(ss);
const $$cn1 = (ss) => document.getElementsByClassName(ss)[0];

const $$tn = (ss) => document.getElementsByTagName(ss);
const $$tn1 = (ss) => document.getElementsByTagName(ss)[0];

const $$na = (ss) => document.getElementsByName(ss);
const $$na1 = (ss) => document.getElementsByName(ss)[0];
const $$sBq = (btnId, { target, changeClass }, toggle) =>
  setBtn_q(btnId, { target, changeClass }, toggle);

const $$sBcn1 = (btnId, { target, changeClass }, toggle) =>
  setBtn_cn1(btnId, { target, changeClass }, toggle);

const $$sB = (btnId, { target, changeClass }, toggle) =>
  setBtn_TargetobjToggle(btnId, { target, changeClass }, toggle);

const $$sBe_target = (e_target, btnId, { target, changeClass }, toggle) => {
  setBtn_eTargetobjToggle(e_target, btnId, { target, changeClass }, toggle);
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
