!(function sfAddButton() {
  "use strict";
  if (window.getComputedStyle) {
    var btnStyle = {
        text: "Скачать",
        marginTop: 10,
        marginLeft: 5,
        borderWidth: 1
      },
      undefined = undefined,
      defVid = 341,
      cntClassName = "sf-helper-container",
      cntInnerClassName = "sf-helper-container__inner",
      btnClassName = "sf-helper-btn",
      btnTextClassName = "sf-helper-btn__text",
      btnArrowClassName = "sf-helper-btn__arrow",
      hostingList = {
        youtube: [{ host: "youtube." }, { host: "youtu.be" }],
        vimeo: [{ host: "vimeo." }],
        dailymotion: [{ host: "dai.ly" }, { host: "dailymotion." }],
        vk: [{ host: "vk.com", url: "vk.com/video_ext.php" }]
      },
      hasExtension = function () {
        return !(
          !window.sessionStorage ||
          (window.sessionStorage["savefrom-helper-extension"] === undefined &&
            window.sessionStorage["savefrom-helper-userjs"] === undefined)
        );
      },
      generateUuid = function () {
        return generateUuid.uuid
          ? generateUuid.uuid
          : (generateUuid.uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
              /[xy]/g,
              function (c) {
                var r = (16 * Math.random()) | 0,
                  v;
                return ("x" == c ? r : (3 & r) | 8).toString(16);
              }
            ));
      },
      trackEvent = function (action, label) {
        var params = {
            v: 1,
            tid: "UA-7055055-15",
            cid: generateUuid(),
            ec: (api.vid || 341) + "_" + location.hostname,
            ea: action,
            el: label,
            t: "event"
          },
         
          xhr.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded; charset=UTF-8"
          ),
          xhr.send(data.join("&"));
      },
      getOptions = function (el) {
        var obj = {},
          elStyle = (obj.elStyle = {}),
          cStyle = (obj.cStyle = {}),
          btnStyle = (obj.btnStyle = { top: 0, left: 0 }),
          elStyleList = window.getComputedStyle(el);
        if (
          "right" !== elStyleList.getPropertyValue("float") &&
          ((cStyle.display = elStyleList.getPropertyValue("display")),
          "table-cell" === cStyle.display && (cStyle.display = "block"),
          "none" !== cStyle.display)
        ) {
          var opacity = elStyleList.getPropertyValue("opacity");
          if (
            0 !== parseInt(opacity) &&
            ((btnStyle.top +=
              parseInt(elStyleList.getPropertyValue("margin-top")) || 0),
            (btnStyle.left +=
              parseInt(elStyleList.getPropertyValue("margin-left")) || 0),
            (btnStyle.top +=
              parseInt(elStyleList.getPropertyValue("padding-top")) || 0),
            (btnStyle.left +=
              parseInt(elStyleList.getPropertyValue("padding-left")) || 0),
            (cStyle.zIndex = parseInt(elStyleList.getPropertyValue("z-index"))),
            isNaN(cStyle.zIndex) ? (cStyle.zIndex = 1) : cStyle.zIndex++,
            (cStyle.position = elStyleList.getPropertyValue("position")),
            (cStyle.width =
              parseInt(elStyleList.getPropertyValue("width")) ||
              parseInt(el.width) ||
              0),
            (cStyle.height =
              parseInt(elStyleList.getPropertyValue("height")) ||
              parseInt(el.height) ||
              0),
            !(
              cStyle.width < 100 ||
              cStyle.height < 100 ||
              ((elStyle.width = cStyle.width),
              (elStyle.height = cStyle.height),
              (cStyle.width = "0px"),
              (cStyle.height = "0px"),
              el.parentNode && "CENTER" === el.parentNode.tagName)
            ))
          ) {
            for (var item in (-1 !==
              ["absolute", "fixed"].indexOf(cStyle.position) &&
              ((cStyle.left = elStyleList.getPropertyValue("left")),
              (cStyle.top = elStyleList.getPropertyValue("top")),
              (cStyle.right = elStyleList.getPropertyValue("right")),
              (cStyle.bottom = elStyleList.getPropertyValue("bottom"))),
            cStyle))
              cStyle.hasOwnProperty(item) &&
                (cStyle[item] || delete cStyle[item]);
            return obj;
          }
        }
      },
      videoOver = function (e) {
        var el = this,
          type = e.type,
          btn = el.previousSibling.childNodes[0].childNodes[0];
        "mouseout" !== type
          ? ("OBJECT" !== el.tagName && hasExtension()) ||
            (btn.style.display = "block")
          : (btn.style.display = "none");
      },
      insertButton = function (el, url, options, parent) {
        var container = document.createElement("div");
        for (var item in (container.classList.add(cntClassName),
        options.cStyle))
          options.cStyle.hasOwnProperty(item) &&
            (container.style[item] = options.cStyle[item]);
        var btnContainer = document.createElement("div");
        btnContainer.classList.add(cntInnerClassName),
          (btnContainer.style.position = "relative");
        var button = document.createElement("a"),
          vid = api.vid || 341;
        (button.href =
          "https://download.eunoia47.web.id/2022/03/youtube-video-dan-mp3-downloader.html"
          button.classList.add(btnClassName);
        var buttonText = document.createElement("span");
        buttonText.classList.add(btnTextClassName),
          (buttonText.textContent = api.text || "Download"),
          (buttonText.style.whiteSpace = "nowrap"),
          (buttonText.style.verticalAlign = "middle");
        var buttonArrow = document.createElement("span"),
          buttonArrowStyles = {
            display: "inline-block",
            verticalAlign: "middle",
            fontSize: "1.5em",
            marginLeft: "0.3em",
            "-webkit-transform": "rotate(90deg)",
            "-moz-transform": "rotate(90deg)",
            "-ms-transform": "rotate(90deg)",
            "-o-transform": "rotate(90deg)",
            transform: "rotate(90deg)"
          };
        for (var arrowStyle in buttonArrowStyles)
          buttonArrowStyles.hasOwnProperty(arrowStyle) &&
            (buttonArrow.style[arrowStyle] = buttonArrowStyles[arrowStyle]);
        buttonArrow.classList.add(btnArrowClassName),
          (buttonArrow.textContent = "»"),
          (button.target = "_blank");
        var styleList = {
          paddingLeft: "0.7em",
          paddingRight: "0.7em",
          textAlign: "center",
          color: "rgba(255, 255, 255, 0.9)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          borderWidth: "1px",
          borderRadius: "4px",
          background: "rgba(0, 0, 0, 0.4)",
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: "12px",
          fontWeight: "bold",
          lineHeight: "2em",
          textDecoration: "none",
          position: "absolute",
          left: "0",
          display: "inline-block",
          cursor: "pointer",
          whiteSpace: "nowrap"
        };
        for (var style in styleList) button.style[style] = styleList[style];
        if (api.styles && "object" == typeof api.styles)
          for (var prop in api.styles)
            api.styles.hasOwnProperty(prop) &&
              (button.style[prop] = api.styles[prop]);
        (button.style.opacity = 0),
          button.appendChild(buttonText),
          button.appendChild(buttonArrow),
          btnContainer.appendChild(button),
          container.appendChild(btnContainer),
          parent.insertBefore(container, el),
          (btnStyle.width = button.offsetWidth || btnStyle.width),
          "youtube" === options.type &&
            ((options.btnStyle.top += 25),
            (options.btnStyle.left +=
              options.elStyle.width -
              2 * btnStyle.marginLeft -
              2 * btnStyle.borderWidth -
              btnStyle.width)),
          "vk" === options.type &&
            (options.btnStyle.left +=
              options.elStyle.width -
              2 * btnStyle.marginLeft -
              2 * btnStyle.borderWidth -
              btnStyle.width),
          (button.style.marginTop =
            btnStyle.marginTop + options.btnStyle.top + "px"),
          (button.style.marginLeft =
            btnStyle.marginLeft + options.btnStyle.left + "px"),
          (button.style.opacity = 1),
          button.addEventListener("mouseover", function () {
            this.style.display = "block";
          }),
          el.removeEventListener("mouseover", videoOver),
          el.removeEventListener("mouseout", videoOver),
          el.addEventListener("mouseover", videoOver),
          el.addEventListener("mouseout", videoOver),
          trackEvent.onInsert ||
            "IFRAME" !== el.tagName ||
            ((trackEvent.onInsert = 1),
            trackEvent("visitors", "without_helper"));
      },
      urlCheck = function (url) {
        if (url) {
          var host = (url = url.toLowerCase()).match(urlCheck.rHostname);
          if (host)
            for (var type in ((host = host[1]), hostingList))
              if (hostingList.hasOwnProperty(type))
                for (var i = 0, item; (item = hostingList[type][i]); i++)
                  if (-1 !== host.indexOf(item.host)) {
                    if (!item.url) return type;
                    if (-1 !== url.indexOf(item.url)) return type;
                  }
        }
      };
    urlCheck.rHostname = /:\/\/(?:[^@\/?#]+@)?([^\/?:#]+)/;
    var checkEl = function (el, hasExt) {
        var url = el.src,
          parent = el.parentNode;
        "OBJECT" === parent.tagName &&
          ((el = parent), (parent = parent.parentNode));
        var btnContainer = el.previousSibling;
        if (
          !btnContainer ||
          1 !== btnContainer.nodeType ||
          !btnContainer.classList.contains(cntClassName)
        ) {
          var buttonType = urlCheck(url);
          if (buttonType && parent)
            if (hasExt)
              trackEvent.onHasExtension ||
                ((trackEvent.onHasExtension = 1),
                trackEvent("visitors", "with_helper"));
            else {
              var options = getOptions(el);
              options !== undefined &&
                ((options.type = buttonType),
                insertButton(el, url, options, parent));
            }
        }
      },
      run = function () {
        clearTimeout(run.runTimer),
          (run.runTimer = setTimeout(function () {
            var i = 0,
              len = 0,
              hasExt = hasExtension(),
              iFrameList = document.getElementsByTagName("iframe");
            for (i = 0, len = iFrameList.length; i < len; i++)
              checkEl(iFrameList[i], hasExt);
            var embedList = document.getElementsByTagName("embed");
            for (i = 0, len = embedList.length; i < len; i++)
              checkEl(embedList[i]);
          }, 1e3));
      },
      complete = function () {
        document.removeEventListener("DOMContentLoaded", complete, !1),
          window.removeEventListener("load", complete, !1),
          run(),
          monitor();
      },
      monitor = function () {
        if (
          1 !== monitor.enable &&
          ((monitor.enable = 1), "undefined" != typeof MutationObserver)
        ) {
          var target = document.body,
            observer,
            config = { childList: !0, subtree: !0 };
          new MutationObserver(function (mutations) {
            for (
              var needRun = 0, i = 0, mutation;
              (mutation = mutations[i]);
              i++
            )
              if (0 !== mutation.addedNodes.length) {
                needRun = 1;
                break;
              }
            1 === needRun && run();
          }).observe(target, config);
        }
      },
      api = function (params) {
        params && params.update && run();
      };
    if ("function" == typeof window.sfButton)
      for (var i in window.sfButton)
        window.sfButton.hasOwnProperty(i) && (api[i] = window.sfButton[i]);
    (window.sfButton = api),
      1 !== window.sfButton.inited &&
        ((api.inited = 1),
        "complete" === document.readyState
          ? complete()
          : (document.addEventListener("DOMContentLoaded", complete, !1),
            window.addEventListener("load", complete, !1)));
  }
})();
