export default class HystModal {
  constructor(props) {
    let defaultConfig = {
      backscroll: true,
      linkAttributeName: 'data-modal-error',
      closeOnOverlay: true,
      closeOnEsc: true,
      closeOnButton: true,
      waitTransitions: false,
      catchFocus: true,
      fixedSelectors: "*[data-hystfixed]",
      beforeOpen: () => { },
      afterClose: () => { },
    }
    this.config = Object.assign(defaultConfig, props);
    if (this.config.linkAttributeName) {
      this.init();
    }
    this._closeAfterTransition = this._closeAfterTransition.bind(this);
  }

  static _shadow = false;

  init() {
    this.isOpened = false;
    this.openedWindow = false;
    this.starter = false,
      this._nextWindows = false;
    this._scrollPosition = 0;
    this._reopenTrigger = false;
    this._overlayChecker = false,
      this._isMoved = false;
    this._focusElements = [
      'a[href]',
      'area[href]',
      'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
      'select:not([disabled]):not([aria-hidden])',
      'textarea:not([disabled]):not([aria-hidden])',
      'button:not([disabled]):not([aria-hidden])',
      'iframe',
      'object',
      'embed',
      '[contenteditable]',
      '[tabindex]:not([tabindex^="-"])'
    ];
    this._modalBlock = false;

    if (!HystModal._shadow) {
      HystModal._shadow = document.createElement('button');
      HystModal._shadow.classList.add('modal-shadow');
      document.body.appendChild(HystModal._shadow);
    }
    this.eventsFeeler();
  }

  eventsFeeler() {
    document.addEventListener("click", function (e) {
      const clickedlink = e.target.closest("[" + this.config.linkAttributeName + "]");
      if (!this._isMoved && clickedlink) {
        e.preventDefault();
        this.starter = clickedlink;
        let targetSelector = this.starter.getAttribute(this.config.linkAttributeName);
        this._nextWindows = document.querySelector(targetSelector);
        this.open();
        return;
      }
      if (this.config.closeOnButton && e.target.closest('[data-hystclose]')) {
        this.close();
        return;
      }
    }.bind(this));

    if (this.config.closeOnOverlay) {
      document.addEventListener('mousedown', function (e) {
        if (!this._isMoved && (e.target instanceof Element) && !e.target.classList.contains('modal-wrapper')) return;
        this._overlayChecker = true;
      }.bind(this));

      document.addEventListener('mouseup', function (e) {
        if (!this._isMoved && (e.target instanceof Element) && this._overlayChecker && e.target.classList.contains('modal-wrapper')) {
          e.preventDefault();
          !this._overlayChecker;
          this.close();
          return;
        }
        this._overlayChecker = false;
      }.bind(this));
    };

    window.addEventListener("keydown", function (e) {
      if (!this._isMoved && this.config.closeOnEsc && e.which == 27 && this.isOpened) {
        e.preventDefault();
        this.close();
        return;
      }
      if (!this._isMoved && this.config.catchFocus && e.which == 9 && this.isOpened) {
        this.focusCatcher(e);
        return;
      }
    }.bind(this));
  }

  open(selector) {
    if (selector) {
      if (typeof (selector) === "string") {
        this._nextWindows = document.querySelector(selector);
      } else {
        this._nextWindows = selector;
      }
    }
    if (!this._nextWindows) {
      console.log("Warinig: hustModal selector is not found");
      return;
    }
    if (this.isOpened) {
      this._reopenTrigger = true;
      this.close();
      return;
    }
    this.openedWindow = this._nextWindows;
    this._modalBlock = this.openedWindow.querySelector('.modal-window');
    this.config.beforeOpen(this);
    this._bodyScrollControl();
    HystModal._shadow.classList.add("modal-shadow--show");
    this.openedWindow.classList.add("modal-error--active");
    this.openedWindow.setAttribute('aria-hidden', 'false');
    if (this.config.catchFocus) this.focusContol();
    this.isOpened = true;
  }

  close() {
    if (!this.isOpened) {
      return;
    }
    if (this.config.waitTransitions) {
      this.openedWindow.classList.add("modal-error--moved");
      this._isMoved = true;
      this.openedWindow.addEventListener("transitionend", this._closeAfterTransition);
      this.openedWindow.classList.remove("modal-error--active");
    } else {
      this.openedWindow.classList.remove("modal-error--active");
      this._closeAfterTransition();
    }
  }

  _closeAfterTransition() {
    this.openedWindow.classList.remove("modal-error--moved");
    this.openedWindow.removeEventListener("transitionend", this._closeAfterTransition);
    this._isMoved = false;
    HystModal._shadow.classList.remove("modal-shadow--show");
    this.openedWindow.setAttribute('aria-hidden', 'true');

    if (this.config.catchFocus) this.focusContol();
    this._bodyScrollControl();
    this.isOpened = false;
    this.openedWindow.scrollTop = 0;
    this.config.afterClose(this);

    if (this._reopenTrigger) {
      this._reopenTrigger = false;
      this.open();
    }
  }

  focusContol() {
    const nodes = this.openedWindow.querySelectorAll(this._focusElements);
    if (this.isOpened && this.starter) {
      this.starter.focus();
    } else {
      if (nodes.length) nodes[0].focus();
    }
  }

  focusCatcher(e) {
    const nodes = this.openedWindow.querySelectorAll(this._focusElements);
    const nodesArray = Array.prototype.slice.call(nodes);
    if (!this.openedWindow.contains(document.activeElement)) {
      nodesArray[0].focus();
      e.preventDefault();
    } else {
      const focusedItemIndex = nodesArray.indexOf(document.activeElement)
      console.log(focusedItemIndex);
      if (e.shiftKey && focusedItemIndex === 0) {
        nodesArray[nodesArray.length - 1].focus();
        e.preventDefault();
      }
      if (!e.shiftKey && focusedItemIndex === nodesArray.length - 1) {
        nodesArray[0].focus();
        e.preventDefault();
      }
    }
  }

  _bodyScrollControl() {
    if (!this.config.backscroll) return;

    // collect fixel selectors to array
    let fixedSelectors = Array.prototype.slice.call(document.querySelectorAll(this.config.fixedSelectors));

    let html = document.documentElement;
    if (this.isOpened === true) {
      html.classList.remove("modal-opened");
      html.style.marginRight = "";
      fixedSelectors.map((el) => {
        el.style.marginRight = "";
      });
      window.scrollTo(0, this._scrollPosition);
      html.style.top = "";
      return;
    }
    this._scrollPosition = window.pageYOffset;
    let marginSize = window.innerWidth - html.clientWidth;
    html.style.top = -this._scrollPosition + "px";

    if (marginSize) {
      html.style.marginRight = marginSize + "px";
      fixedSelectors.map((el) => {
        el.style.marginRight = parseInt(getComputedStyle(el).marginRight) + marginSize + "px";
      });
    }
    html.classList.add("modal-opened");
  }
}
