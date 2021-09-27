// shortHbs$$.js

// ~~ Handlebars ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const $$hFn = (html) => Handlebars.compile(html);
const $$tFn = (Ttag) => Handlebars.compile(Ttag.innerHTML);
const $$qtFn = (ht) => {
  return Handlebars.compile($$q(ht).innerHTML)
};

const $$hFnC = (html, context) => Handlebars.compile(html)(context);
const $$hFnT = (html, v, trgt) =>
  (trgt.innerHTML = Handlebars.compile(html)(v));
const $$hFnqT = (html, v, trgt) =>
  $$q(trgt).innerHTML = Handlebars.compile(html)(v);

const $$qtFnqT = (ht, v, trgt) => {
  // console.log("$$qtFnqT -> $$qtFn(ht)(v)", $$qtFn(ht)(v))
  $$q(trgt).innerHTML = $$qtFn(ht)(v)
};
const $$d_qFnT = (ht, v, trgt) => {
  $$de(() => {
    $$qtFnqT(ht, v, trgt);
  });
};

const $$tPre = (pre_html) => Handlebars.templates[pre_html];

const $$tPreqT = (pre_html, v, trgt) => ($$q(trgt).innerHTML = $$tPre(pre_html)(v));
const $$d_qPreT = (pre_html, v, trgt) => {
  $$de(() => {
    $$tPreqT(pre_html, v, trgt);
  });
};

const $$preFnqT = (preFn, v, trgt) =>
  $$q(trgt).innerHTML = preFn(v);

const $$rPar = (na, html) => Handlebars.registerPartial(na, html);
const $$d_rPar = (na, html) => {
  $$de(() => {
    $$rPar(na, html);
  });
};

const $$rParFn = (na, fn) => Handlebars.registerPartial(na, fn);
const $$d_rParFn = (na, fn) => {
  $$de(() => {
    $$rParFn(na, fn);
  });
};

const $$rHS = (na, html) =>
  Handlebars.registerHelper(na, () => {
    return new Handlebars.SafeString(html);
  });

const $$d_rH = (na, html) => {
  $$de(() => {
    $$rH(na, html);
  });
};
