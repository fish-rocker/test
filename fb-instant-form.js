(function () {
  if (window.FBInstantFormLoaded) return;
  window.FBInstantFormLoaded = true;

  // ========= 1. 注入 CSS =========
  var style = document.createElement('style');
  style.id = 'fb-instant-form-style';
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

    .fbif-overlay.fbif-show {
      display: flex;
    }

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
      .fbif-phone-frame {
        border-radius: 18px;
        max-height: 100%;
      }
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

    .fbif-topbar-back {
      font-size: 20px;
      margin-right: 10px;
      cursor: pointer;
    }

    .fbif-topbar-title {
      flex: 1;
    }

    .fbif-topbar-close {
      font-size: 18px;
      cursor: pointer;
      padding: 4px 6px;
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
      box-sizing: border-box;
    }

    .fbif-page-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #d8dfea;
      margin-right: 10px;
      flex-shrink: 0;
    }

    .fbif-page-title-wrap {
      flex: 1;
    }

    .fbif-page-name {
      font-size: 14px;
      font-weight: 600;
      color: #050505;
    }

    .fbif-page-meta {
      font-size: 11px;
      color: #65676b;
      margin-top: 2px;
    }

    .fbif-sponsored-tag {
      font-size: 11px;
      color: #65676b;
    }

    .fbif-instant-form {
      margin-top: 10px;
      background: #fff;
      border-radius: 12px;
      padding: 14px 12px 16px;
      box-sizing: border-box;
    }

    .fbif-form-header-title {
      font-size: 18px;
      font-weight: 700;
      color: #050505;
      margin-bottom: 4px;
    }

    .fbif-form-header-desc {
      font-size: 13px;
      color: #65676b;
      line-height: 1.5;
      margin-bottom: 10px;
    }

    .fbif-progress-text {
      font-size: 11px;
      color: #65676b;
      margin-bottom: 8px;
    }

    .fbif-progress-bar-wrap {
      background: #e4e6eb;
      border-radius: 999px;
      height: 6px;
      overflow: hidden;
      margin-bottom: 14px;
    }

    .fbif-progress-bar-inner {
      width: 60%;
      height: 100%;
      background: #1877f2;
    }

    .fbif-question-card {
      border-radius: 10px;
      border: 1px solid #e4e6eb;
      padding: 10px 9px 9px;
      margin-bottom: 10px;
      background: #f9fafb;
      box-sizing: border-box;
    }

    .fbif-question-label {
      font-size: 13px;
      color: #050505;
      margin-bottom: 6px;
    }

    .fbif-question-required {
      color: #f02849;
      margin-left: 2px;
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

    .fbif-input-text:focus,
    .fbif-select-input:focus,
    .fbif-textarea-input:focus {
      border-color: #1877f2;
    }

    .fbif-textarea-input {
      resize: vertical;
      min-height: 70px;
    }

    .fbif-helper-text {
      font-size: 11px;
      color: #65676b;
      margin-top: 4px;
    }

    .fbif-options-group {
      margin-top: 4px;
    }

    .fbif-option-row {
      display: flex;
      align-items: center;
      padding: 5px 4px;
      border-radius: 8px;
    }

    .fbif-option-row input {
      margin-right: 8px;
    }

    .fbif-option-label {
      font-size: 13px;
      color: #050505;
    }

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

    .fbif-submit-btn {
      width: 100%;
      border-radius: 999px;
      border: none;
      padding: 11px 0;
      font-size: 15px;
      font-weight: 600;
      background: #1877f2;
      color: #fff;
      cursor: pointer;
    }

    .fbif-submit-btn:active {
      opacity: 0.9;
    }

    .fbif-privacy-note {
      margin-top: 4px;
      font-size: 10px;
      color: #65676b;
      text-align: center;
      line-height: 1.3;
    }

    .fbif-privacy-note a {
      color: #1877f2;
      text-decoration: none;
    }
  `;
  document.head.appendChild(style);

  // ========= 2. 建立 HTML 結構 =========
  var overlay = document.createElement('div');
  overlay.className = 'fbif-overlay';
  overlay.innerHTML = `
    <div class="fbif-phone-frame">
      <div class="fbif-topbar">
        <div class="fbif-topbar-back">←</div>
        <div class="fbif-topbar-title">表單</div>
        <div class="fbif-topbar-close">✕</div>
      </div>

      <div class="fbif-content-scroll">
        <!-- 粉專資訊 -->
        <section class="fbif-page-header">
          <div class="fbif-page-avatar"></div>
          <div class="fbif-page-title-wrap">
            <div class="fbif-page-name">Margeek 超級商店</div>
            <div class="fbif-page-meta">
              <span class="fbif-sponsored-tag">贊助</span> · 1 小時前
            </div>
          </div>
        </section>

        <!-- Instant Form 區域 -->
        <form class="fbif-instant-form" id="fbif-lead-form">
          <div class="fbif-form-header-title">申請免費線上顧問諮詢</div>
          <div class="fbif-form-header-desc">
            請填寫以下資料，我們將透過電話或 LINE 與您聯繫，協助評估您的店家是否適合經營蝦皮 / 線上通路。
          </div>

          <div class="fbif-progress-text">步驟 1 / 1 · 基本資料</div>
          <div class="fbif-progress-bar-wrap">
            <div class="fbif-progress-bar-inner"></div>
          </div>

          <!-- 問題 1：姓名 -->
          <div class="fbif-question-card">
            <div class="fbif-question-label">
              您的姓名<span class="fbif-question-required">*</span>
            </div>
            <input
              type="text"
              class="fbif-input-text"
              name="name"
              placeholder="例：王小明"
              required
            />
          </div>

          <!-- 問題 2：電話 -->
          <div class="fbif-question-card">
            <div class="fbif-question-label">
              聯絡電話<span class="fbif-question-required">*</span>
            </div>
            <input
              type="tel"
              class="fbif-input-text"
              name="phone"
              placeholder="例：0912-345-678"
              required
            />
            <div class="fbif-helper-text">請填寫手機號碼，以便顧問與您聯絡。</div>
          </div>

          <!-- 問題 3：LINE ID -->
          <div class="fbif-question-card">
            <div class="fbif-question-label">
              LINE ID（選填）
            </div>
            <input
              type="text"
              class="fbif-input-text"
              name="lineId"
              placeholder="若方便用 LINE 聯絡請填寫"
            />
          </div>

          <!-- 問題 4：目前店家狀態（單選） -->
          <div class="fbif-question-card">
            <div class="fbif-question-label">
              您目前的營運狀態是？<span class="fbif-question-required">*</span>
            </div>
            <div class="fbif-options-group">
              <label class="fbif-option-row">
                <input type="radio" name="status" value="offline" required />
                <span class="fbif-option-label">只有實體門市，還沒有線上通路</span>
              </label>
              <label class="fbif-option-row">
                <input type="radio" name="status" value="both" />
                <span class="fbif-option-label">已有實體門市，也有簡單網路銷售</span>
              </label>
              <label class="fbif-option-row">
                <input type="radio" name="status" value="online-only" />
                <span class="fbif-option-label">以線上銷售為主，沒有實體店面</span>
              </label>
              <label class="fbif-option-row">
                <input type="radio" name="status" value="planning" />
                <span class="fbif-option-label">正在規劃創業 / 還沒開始</span>
              </label>
            </div>
          </div>

          <!-- 問題 5：想了解的內容 -->
          <div class="fbif-question-card">
            <div class="fbif-question-label">
              您目前最想了解的內容是？（可簡單說明）
            </div>
            <textarea
              class="fbif-textarea-input"
              name="note"
              placeholder="例：想知道我的品項適不適合進蝦皮、需要準備多少成本…"
            ></textarea>
          </div>

          <!-- 問題 6：聯絡時段（下拉） -->
          <div class="fbif-question-card">
            <div class="fbif-question-label">
              方便聯絡的時段
            </div>
            <select class="fbif-select-input" name="contactTime">
              <option value="">可擇一選填</option>
              <option value="morning">上午（09:30–12:00）</option>
              <option value="afternoon">下午（13:30–18:00）</option>
              <option value="night">晚上（18:00–21:00）</option>
            </select>
          </div>
        </form>
      </div>

      <div class="fbif-bottom-bar">
        <button type="submit" form="fbif-lead-form" class="fbif-submit-btn">
          送出
        </button>
        <div class="fbif-privacy-note">
          點擊「送出」即表示您同意我們的
          <a href="#">隱私權政策</a>，您的資料僅供本次諮詢使用，不會提供給第三方。
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // ========= 3. 控制開關 =========
  function openOverlay() {
    overlay.classList.add('fbif-show');
  }

  function closeOverlay() {
    overlay.classList.remove('fbif-show');
  }

  // 點左上 ← 或右上 ✕ 關閉
  overlay.querySelector('.fbif-topbar-back')
    .addEventListener('click', closeOverlay);
  overlay.querySelector('.fbif-topbar-close')
    .addEventListener('click', closeOverlay);

  // 按 ESC 關閉
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeOverlay();
  });

  // 你可以在外面呼叫 window.FBInstantForm.open() / close()
  window.FBInstantForm = {
    open: openOverlay,
    close: closeOverlay
  };

  // 載入後自動打開一次（如果你想改成按鈕觸發，就把這行註解掉）
  openOverlay();
})();
