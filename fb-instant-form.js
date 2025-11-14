(function () {
  if (window.FBInstantFormLoaded) return;
  window.FBInstantFormLoaded = true;

  /* ---------------------------------------------------
     1. 加入 CSS
  --------------------------------------------------- */
  var style = document.createElement('style');
  style.textContent = `
    .fbif-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.65);
      display: none;
      z-index: 999999;
      justify-content: center;
      align-items: center;
      padding: 10px;
      box-sizing: border-box;
    }
    .fbif-overlay.fbif-show { display: flex; }

    .fbif-phone-frame {
      width: 100%;
      max-width: 480px;
      height: 100%;
      max-height: 860px;
      background: #f0f2f5;
      border-radius: 26px;
      overflow: hidden;
      box-shadow:
        0 0 0 1px rgba(255,255,255,0.08),
        0 12px 35px rgba(0,0,0,0.6);
      position: relative;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
        "Helvetica Neue", Arial, "Noto Sans CJK TC", "PingFang TC",
        "Microsoft JhengHei", sans-serif;
    }
    @media (max-width: 480px) {
      .fbif-phone-frame { border-radius: 18px; max-height: 100%; }
    }

    .fbif-topbar {
      background: #1877f2;
      height: 44px;
      display: flex;
      align-items: center;
      padding: 0 12px;
      color: #fff;
      font-size: 16px;
      font-weight: 600;
      box-sizing: border-box;
    }
    .fbif-topbar-back,
    .fbif-topbar-close {
      font-size: 20px;
      cursor: pointer;
      padding: 4px 8px;
    }

    .fbif-content-scroll {
      height: calc(100% - 44px);
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      padding: 12px 12px 80px;
      box-sizing: border-box;
    }

    .fbif-page-header {
      background: #fff;
      border-radius: 12px;
      padding: 12px;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
    .fbif-page-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #d8dfea;
      margin-right: 10px;
    }

    .fbif-instant-form {
      margin-top: 10px;
      background: #fff;
      border-radius: 12px;
      padding: 14px 12px 16px;
      box-sizing: border-box;
    }

    .fbif-question-card {
      border-radius: 10px;
      border: 1px solid #e4e6eb;
      padding: 10px 9px 9px;
      margin-bottom: 10px;
      background: #f9fafb;
    }

    .fbif-input-text,
    .fbif-select-input,
    .fbif-textarea-input {
      width: 100%;
      border-radius: 8px;
      border: 1px solid #ccd0d5;
      padding: 8px 10px;
      font-size: 14px;
      outline: none;
      background: #fff;
      box-sizing: border-box;
    }
    .fbif-textarea-input { resize: vertical; min-height: 70px; }

    .fbif-bottom-bar {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 8px 12px 14px;
      background: linear-gradient(
        to top,
        #fff 0,
        #fff 70%,
        rgba(255, 255, 255, 0) 100%
      );
      box-sizing: border-box;
    }

    .fbif-cancel-btn,
    .fbif-submit-btn {
      width: 100%;
      border-radius: 999px;
      padding: 11px 0;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      margin-bottom: 8px;
    }

    .fbif-cancel-btn {
      background: #fff;
      border: 1px solid #ccd0d5;
      color: #050505;
    }
    .fbif-cancel-btn:active { background: #f2f2f2; }

    .fbif-submit-btn {
      border: none;
      background: #1877f2;
      color: #fff;
    }
    .fbif-submit-btn:active { opacity: 0.9; }
  `;
  document.head.appendChild(style);

  /* ---------------------------------------------------
     2. 建立 HTML 結構
  --------------------------------------------------- */
  var overlay = document.createElement('div');
  overlay.className = 'fbif-overlay';
  overlay.innerHTML = `
    <div class="fbif-phone-frame">
      <div class="fbif-topbar">
        <div class="fbif-topbar-back">←</div>
        <div style="flex: 1;">表單</div>
        <div class="fbif-topbar-close">✕</div>
      </div>

      <div class="fbif-content-scroll">
        <section class="fbif-page-header">
          <div class="fbif-page-avatar"></div>
          <div>
            <div style="font-size:14px;font-weight:600;">Margeek 超級商店</div>
            <div style="font-size:11px;color:#65676b;">贊助 · 1 小時前</div>
          </div>
        </section>

        <form class="fbif-instant-form" id="fbif-lead-form">
          <div style="font-size:18px;font-weight:700;">申請免費線上顧問諮詢</div>
          <div style="font-size:13px;color:#65676b;margin-bottom:10px;">
            填寫資料後，我們將透過電話或 LINE 與您聯繫。
          </div>

          <div class="fbif-question-card">
            <div>您的姓名 *</div>
            <input type="text" name="name" class="fbif-input-text" required>
          </div>

          <div class="fbif-question-card">
            <div>聯絡電話 *</div>
            <input type="tel" name="phone" class="fbif-input-text" required>
          </div>

          <div class="fbif-question-card">
            <div>LINE ID（選填）</div>
            <input type="text" name="lineId" class="fbif-input-text">
          </div>

          <div class="fbif-question-card">
            <div>您目前最想了解的內容？</div>
            <textarea name="note" class="fbif-textarea-input"></textarea>
          </div>

          <div class="fbif-question-card">
            <div>方便聯絡的時段</div>
            <select name="contactTime" class="fbif-select-input">
              <option value="">可擇一選填</option>
              <option value="morning">上午</option>
              <option value="afternoon">下午</option>
              <option value="night">晚上</option>
            </select>
          </div>
        </form>
      </div>

      <div class="fbif-bottom-bar">
        <button type="button" class="fbif-cancel-btn">取消</button>

        <button type="submit"
          form="fbif-lead-form"
          class="fbif-submit-btn">
          送出
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  /* ---------------------------------------------------
     3. 控制開關
  --------------------------------------------------- */
  function openOverlay() { overlay.classList.add('fbif-show'); }
  function closeOverlay() { overlay.classList.remove('fbif-show'); }

  overlay.querySelector('.fbif-topbar-back').addEventListener('click', closeOverlay);
  overlay.querySelector('.fbif-topbar-close').addEventListener('click', closeOverlay);
  overlay.querySelector('.fbif-cancel-btn').addEventListener('click', closeOverlay);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeOverlay();
  });

  window.FBInstantForm = {
    open: openOverlay,
    close: closeOverlay
  };

  // ❌ 不要自動 open()
})();
