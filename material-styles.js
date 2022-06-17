function createRipple(_event, _rippleContainer, _rippleParent) {
  // 创建波纹元素
  let ripple = document.createElement("span");
  ripple.classList.add("md-ripple");
  // 获取，计算点击事件信息
  let rect = _rippleParent.getBoundingClientRect();
  let rippleX = _event.clientX - rect.left,
    rippleY = _event.clientY - rect.top;
  let rippleRadius = Math.max(Math.sqrt(rippleX ** 2 + rippleY ** 2), Math.sqrt((rect.width - rippleX) ** 2 + rippleY ** 2), Math.sqrt((rect.height - rippleY) ** 2 + rippleX ** 2), Math.sqrt((rect.width - rippleX) ** 2 + (rect.height - rippleY) ** 2));
  let rippleSize = rippleRadius * 2;
  let rippleSizeCentered = Math.sqrt(rect.width ** 2 + rect.height ** 2);
  let rippleCtrRadius = rippleSizeCentered / 2;
  // 向波纹容器添加容器
  _rippleContainer.appendChild(ripple);
  setTimeout(() => {
    ripple.classList.add("md-ripple--activing");
    ripple.style.cssText = `
--md-ripple-top: ${rippleY - rippleRadius}px;
--md-ripple-left: ${rippleX - rippleRadius}px;
--md-ripple-size: ${rippleSize}px;
--md-ripple-top-centered: ${rect.height / 2 - rippleCtrRadius}px;
--md-ripple-left-centered: ${rect.width / 2 - rippleCtrRadius}px;
--md-ripple-size-centered: ${rippleSizeCentered}px;`;
  }, 0);
  _rippleParent.addEventListener("mouseleave", () => {
    if (ripple) {
      this.destroyRipple(ripple);
    }
  });
  _rippleParent.addEventListener("mouseup", () => {
    if (ripple) {
      this.destroyRipple(ripple);
    }
  });
  _rippleParent.addEventListener("touchmove", () => {
    if (ripple) {
      this.destroyRipple(ripple);
    }
  });
  _rippleParent.addEventListener("touchend", () => {
    if (ripple) {
      this.destroyRipple(ripple);
    }
  });
}

function destroyRipple(_ripple) {
  setTimeout(() => {
    _ripple.classList.add("md-ripple--killing");
    setTimeout(() => {
      _ripple.remove();
    }, 240);
  }, 240);
}

addEventListener("DOMContentLoaded", () => {
  const rippleParents = document.querySelectorAll("[md-btn], [md-ripple]");

  for (let k in rippleParents) {
    if (Object.hasOwnProperty.call(rippleParents, k)) {
      let rippleContainer = document.createElement("div");
      rippleContainer.classList.add("md-ripple__container");
      rippleParents[k].appendChild(rippleContainer);
      // 点击检测
      rippleParents[k].addEventListener("pointerdown", (ev) => {
        createRipple(ev, rippleContainer, rippleParents[k]);
      });
      // 悬浮检测
      rippleParents[k].addEventListener("mouseover", () => {
        rippleContainer.classList.add("md-ripple--hovered");
      });
      rippleParents[k].addEventListener("mouseleave", () => {
        rippleContainer.classList.remove("md-ripple--hovered");
      });
      // 焦点检测
      rippleParents[k].addEventListener("focus-visible", () => {
        rippleContainer.classList.add("md-ripple--focused");
      });
      rippleParents[k].addEventListener("blur", () => {
        rippleContainer.classList.remove("md-ripple--focused");
      });
    }
  }
});
