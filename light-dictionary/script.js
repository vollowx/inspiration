// abcdefg
// hijklmn
// opq
// rst
// uvw
// xyz

const _undefined = '该词典暂未收录';

const appStart = () => {
  const queryEl = document.querySelector('#query');
  const definitionEl = document.querySelector('#definition');
  const treeEl = document.querySelector('#tree');
  const XHR = new XMLHttpRequest();

  XHR.open('GET', './data.json');
  XHR.send();
  XHR.onload = () => {
    if (XHR.status === 200) {
      window._ = JSON.parse(XHR.responseText);
      treeEl.innerHTML = XHR.responseText;
    }
  };

  queryEl.addEventListener('input', () => {
    const query = queryEl.value;
    if (!query) {
      definitionEl.innerHTML = '空值';
      return;
    }
    try {
      const ans = eval(`_.${query.split('').join('.')}._`).join('<br>');
      if (definitionEl.innerHTML !== ans) {
        definitionEl.innerHTML = ans;
      }
    } catch (err) {
      if (definitionEl.innerHTML !== _undefined) {
        definitionEl.innerHTML = _undefined;
      }
    }
  });
};

addEventListener('DOMContentLoaded', appStart);
