import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";

const h = React.createElement;
const PERSONALIZATION_ENDPOINT = "/api/personalization";

const series = [
  {
    id: "delight",
    title: "DELIGHT",
    url: "https://tiacandles.com/delight/",
    image:
      "https://tiacandles.com/content/images/38/356x298l85nn0/strawberry-cheescake-scented-candle-95533656758567.webp",
    alt: "DELIGHT scented candle",
    accent: "#d89b57",
    notes: {
      uk: ["печиво", "цитрус", "кориця", "ягоди"],
      en: ["cookie", "citrus", "cinnamon", "berries"],
    },
    copy: {
      uk: "Десертна палітра для подарунків, легких свят і теплих kitchen moments.",
      en: "A dessert palette for gifting, soft celebrations, and warm kitchen moments.",
    },
  },
  {
    id: "home",
    title: "HOME",
    url: "https://tiacandles.com/home-page/",
    image:
      "https://tiacandles.com/content/images/1/356x266l85nn0/fresh-linen-scented-candle-55621441398296.webp",
    alt: "HOME scented candle",
    accent: "#6c8068",
    notes: {
      uk: ["чиста білизна", "чай", "кашемір", "випічка"],
      en: ["fresh linen", "tea", "cashmere", "bakery"],
    },
    copy: {
      uk: "М'яка домашня серія для спальні, ванної, вітальні й щоденного затишку.",
      en: "A soft home series for bedrooms, baths, living rooms, and everyday calm.",
    },
  },
  {
    id: "intense",
    title: "INTENSE",
    url: "https://tiacandles.com/intense/",
    image:
      "https://tiacandles.com/content/images/41/356x353l85nn0/ancient-oak-scented-candle-39200835606671.webp",
    alt: "INTENSE scented candle",
    accent: "#5b4035",
    notes: {
      uk: ["дуб", "кава", "шкіра", "тютюн"],
      en: ["oak", "coffee", "leather", "tobacco"],
    },
    copy: {
      uk: "Глибша палітра для вечора, робочого столу й виразного інтер'єру.",
      en: "A deeper palette for evenings, work desks, and expressive interiors.",
    },
  },
];

const content = {
  uk: {
    navCollection: "Колекція",
    navPersonalize: "Персоналізація",
    navOrder: "Замовити",
    eyebrow: "Ароматичні свічки TIA",
    title: "Сучасні свічки для простору, подарунку й настрою.",
    subtitle:
      "Обери ароматичну серію, додай лазерне гравіювання на кришку або коробку й отримай подарунок, який відчувається особистим.",
    primary: "Дивитися серії",
    secondary: "Створити гравіювання",
    labLabel: "Scent matrix",
    labTitle: "Три палітри, десятки настроїв",
    introEyebrow: "Що це",
    introTitle: "Свічка як готова атмосфера.",
    intro:
      "TIA Candles поєднує аромат, мінімалістичний предметний дизайн і персоналізацію. Це не просто свічка на полиці, а деталь, яка робить простір теплішим і подарунок точнішим.",
    collectionEyebrow: "Серії",
    collectionTitle: "Кожна серія має власний характер.",
    openSeries: "Перейти до серії",
    personalizeEyebrow: "Laser engraving",
    personalizeTitle: "Додай персональний напис.",
    personalizeText:
      "Пройди кілька коротких кроків: введи напис, обери місце гравіювання і залиш контакт для підтвердження.",
    stepText: "Напис",
    stepPlace: "Місце",
    stepContact: "Контакт",
    engravingLabel: "Бажана персоналізація",
    engravingHint: "До 10 символів: ініціали, ім'я, дата або коротке слово.",
    placementTitle: "Де зробити гравіювання?",
    contactLabel: "Контакт для заявки",
    contactPlaceholder: "Телефон, email або Instagram",
    next: "Далі",
    back: "Назад",
    submitRequest: "Надіслати заявку",
    formReady: "Endpoint для заявки не підключений.",
    formSent: "Готово. Заявка надіслана.",
    formError: "Не вдалося надіслати. Перевір AWS endpoint або CORS.",
    sending: "Надсилаємо...",
    successTitle: "Заявку отримано",
    successText: "Ми отримали твої побажання щодо персоналізації та зв'яжемось при необхідності.",
    errorTitle: "Не вдалося надіслати",
    errorText: "Спробуй ще раз за кілька секунд або напиши нам напряму.",
    close: "Закрити",
    requestTitle: "Заявка на персоналізацію",
    requestEmpty: "Введи текст",
    requestText: "Напис",
    requestPlacement: "Нанесення",
    requestContact: "Контакт",
    lid: "Кришка",
    box: "Коробка",
    both: "Кришка + коробка",
    surface: "Поверхня",
    benefitsEyebrow: "Чому це працює",
    benefitsTitle: "Подарунок, який виглядає продуманим.",
    benefits: [
      ["Готовий до дарування", "Охайна подача, зрозуміла серія й персональний напис."],
      ["Палітра ароматів", "Від десертної легкості до чистого дому й глибоких intense-нот."],
      ["Лазерна деталь", "Ім'я, дата або коротке повідомлення на кришці чи коробці."],
    ],
    ctaTitle: "Обери серію, додай гравіювання, подаруй момент.",
    ctaButton: "Перейти до магазину",
  },
  en: {
    navCollection: "Collection",
    navPersonalize: "Personalization",
    navOrder: "Order",
    eyebrow: "TIA scented candles",
    title: "Modern candles for spaces, gifts, and moods.",
    subtitle:
      "Choose a fragrance series, add laser engraving to the lid or box, and make the gift feel personal.",
    primary: "Explore series",
    secondary: "Create engraving",
    labLabel: "Scent matrix",
    labTitle: "Three palettes, dozens of moods",
    introEyebrow: "What it is",
    introTitle: "A candle as ready-made atmosphere.",
    intro:
      "TIA Candles brings together fragrance, minimal object design, and personalization. It is not just a candle on a shelf, but a detail that makes a room warmer and a gift more precise.",
    collectionEyebrow: "Series",
    collectionTitle: "Each series has its own character.",
    openSeries: "Open series",
    personalizeEyebrow: "Laser engraving",
    personalizeTitle: "Add a personal inscription.",
    personalizeText:
      "Complete a few quick steps: enter the inscription, choose the engraving placement, and leave a contact for confirmation.",
    stepText: "Text",
    stepPlace: "Place",
    stepContact: "Contact",
    engravingLabel: "Desired personalization",
    engravingHint: "Up to 10 characters: initials, name, date, or a short word.",
    placementTitle: "Where should we engrave it?",
    contactLabel: "Contact for the request",
    contactPlaceholder: "Phone, email, or Instagram",
    next: "Next",
    back: "Back",
    submitRequest: "Send request",
    formReady: "The request endpoint is not connected.",
    formSent: "Done. The request has been sent.",
    formError: "Could not send it. Check the AWS endpoint or CORS.",
    sending: "Sending...",
    successTitle: "Request received",
    successText: "We received your personalization wishes and will contact you if needed.",
    errorTitle: "Could not send",
    errorText: "Please try again in a few seconds or message us directly.",
    close: "Close",
    requestTitle: "Personalization request",
    requestEmpty: "Enter text",
    requestText: "Text",
    requestPlacement: "Placement",
    requestContact: "Contact",
    lid: "Lid",
    box: "Box",
    both: "Lid + box",
    surface: "Surface",
    benefitsEyebrow: "Why it works",
    benefitsTitle: "A gift that looks considered.",
    benefits: [
      ["Ready to gift", "Clean presentation, a clear series, and a personal message."],
      ["Fragrance palette", "From dessert brightness to clean home comfort and deeper intense notes."],
      ["Laser detail", "A name, date, or short message on the lid or box."],
    ],
    ctaTitle: "Choose a series, add engraving, gift a moment.",
    ctaButton: "Visit the shop",
  },
};

function Header({ lang, setLang, t }) {
  return h(
    "header",
    { className: "site-header" },
    h("a", { className: "brand", href: "#top", "aria-label": "TIA Candles home" }, h("span", { className: "brand-mark" }, "TIA"), h("span", null, "Candles")),
    h("nav", { className: "nav-links", "aria-label": "Landing sections" }, h("a", { href: "#collection" }, t.navCollection), h("a", { href: "#personalize" }, t.navPersonalize), h("a", { href: "#order" }, t.navOrder)),
    h(
      "div",
      { className: "language-switcher", "aria-label": "Language" },
      ["uk", "en"].map((code) =>
        h(
          "button",
          {
            className: `language-btn ${lang === code ? "is-active" : ""}`,
            key: code,
            type: "button",
            onClick: () => setLang(code),
          },
          code === "uk" ? "UA" : "EN",
        ),
      ),
    ),
  );
}

function ScentMatrix({ activeSeries, lang, setActiveSeries, t }) {
  const active = series.find((item) => item.id === activeSeries) ?? series[0];
  return h(
    "div",
    { className: "scent-matrix", style: { "--active": active.accent } },
    h("div", { className: "matrix-top" }, h("span", null, t.labLabel), h("strong", null, t.labTitle)),
    h(
      "div",
      { className: "matrix-body" },
      h("div", { className: "matrix-orbit", "aria-hidden": "true" }, h("span"), h("span"), h("span")),
      h("figure", { className: "matrix-product" }, h("img", { src: active.image, alt: active.alt }), h("figcaption", null, active.title)),
      h("div", { className: "note-cluster" }, active.notes[lang].map((note) => h("span", { key: note }, note))),
    ),
    h(
      "div",
      { className: "matrix-tabs" },
      series.map((item) =>
        h(
          "button",
          {
            className: activeSeries === item.id ? "is-active" : "",
            key: item.id,
            style: { "--series": item.accent },
            type: "button",
            onClick: () => setActiveSeries(item.id),
          },
          item.title,
        ),
      ),
    ),
  );
}

function Hero(props) {
  const { activeSeries, lang, setActiveSeries, t } = props;
  return h(
    "section",
    { className: "hero", id: "top" },
    h("div", { className: "hero-copy" }, h("p", { className: "eyebrow" }, t.eyebrow), h("h1", null, t.title), h("p", { className: "hero-text" }, t.subtitle), h("div", { className: "hero-actions" }, h("a", { className: "button button-primary", href: "#collection" }, t.primary), h("a", { className: "button button-secondary", href: "#personalize" }, t.secondary))),
    h(ScentMatrix, { activeSeries, lang, setActiveSeries, t }),
  );
}

function Intro({ t }) {
  return h("section", { className: "intro section-band" }, h("div", null, h("p", { className: "eyebrow" }, t.introEyebrow), h("h2", null, t.introTitle)), h("p", null, t.intro));
}

function Collection({ lang, t, setActiveSeries }) {
  return h(
    "section",
    { className: "collection", id: "collection" },
    h("div", { className: "section-heading" }, h("p", { className: "eyebrow" }, t.collectionEyebrow), h("h2", null, t.collectionTitle)),
    h(
      "div",
      { className: "series-grid" },
      series.map((item) =>
        h(
          "article",
          { className: "series-card", key: item.id, style: { "--series": item.accent } },
          h("img", { src: item.image, alt: item.alt }),
          h(
            "div",
            { className: "series-content" },
            h("span", null, item.title),
            h("p", null, item.copy[lang]),
            h("div", { className: "note-row" }, item.notes[lang].map((note) => h("button", { key: note, type: "button", onClick: () => setActiveSeries(item.id) }, note))),
            h("a", { href: item.url, target: "_blank", rel: "noreferrer" }, t.openSeries),
          ),
        ),
      ),
    ),
  );
}

function Personalization({ engraving, placement, setEngraving, setPlacement, lang, t }) {
  const [step, setStep] = useState(1);
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState("idle");
  const [modal, setModal] = useState(null);
  const displayText = engraving.trim() || t.requestEmpty;
  const placementOptions = [
    ["lid", t.lid],
    ["box", t.box],
    ["both", t.both],
  ];
  const placementLabel = placementOptions.find(([id]) => id === placement)?.[1] ?? t.lid;
  const canContinueFromText = engraving.trim().length > 0;
  const canSubmit = canContinueFromText && contact.trim().length > 2;

  async function submitRequest(event) {
    event.preventDefault();
    if (!canSubmit) return;

    const endpoint = PERSONALIZATION_ENDPOINT.trim();
    const payload = {
      engraving: engraving.trim(),
      placement: placementLabel,
      contact: contact.trim(),
      language: lang.toUpperCase(),
      source: "TIA Candles landing",
      createdAt: new Date().toISOString(),
    };

    if (!endpoint) {
      setStatus("ready");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Request failed");
      setEngraving("");
      setPlacement("lid");
      setContact("");
      setStep(1);
      setStatus("idle");
      setModal({ title: t.successTitle, text: t.successText, type: "success" });
    } catch {
      setStatus("idle");
      setModal({ title: t.errorTitle, text: t.errorText, type: "error" });
    }
  }

  return h(
    React.Fragment,
    null,
    h(
      "section",
      { className: "personalize section-band", id: "personalize" },
      h(
        "div",
        { className: "personalize-copy" },
        h("p", { className: "eyebrow" }, t.personalizeEyebrow),
        h("h2", null, t.personalizeTitle),
        h("p", null, t.personalizeText),
        h(
          "form",
          { className: "personalization-form", name: "personalization-request", onSubmit: submitRequest },
          h(
            "div",
            { className: "form-steps", "aria-label": t.requestTitle },
            [[1, t.stepText], [2, t.stepPlace], [3, t.stepContact]].map(([id, label]) =>
              h("button", { className: `step-dot ${step === id ? "is-active" : ""}`, disabled: status === "sending", key: id, type: "button", onClick: () => setStep(id) }, h("span", null, id), label),
            ),
          ),
          h(
            "div",
            { className: "form-panel" },
            step === 1 &&
              h(
                React.Fragment,
                null,
                h("label", { htmlFor: "engravingText" }, t.engravingLabel),
                h("input", {
                  disabled: status === "sending",
                  id: "engravingText",
                  maxLength: 10,
                  name: "engraving",
                  type: "text",
                  value: engraving,
                  onChange: (event) => setEngraving(event.target.value.toUpperCase().slice(0, 10)),
                }),
                h("div", { className: "field-meta" }, h("small", null, t.engravingHint), h("span", null, `${engraving.length} / 10`)),
              ),
            step === 2 &&
              h(
                React.Fragment,
                null,
                h("p", { className: "panel-title" }, t.placementTitle),
                h(
                  "div",
                  { className: "placement-grid", role: "group", "aria-label": t.surface },
                  placementOptions.map(([id, label]) =>
                    h(
                      "button",
                      { className: `placement-card ${placement === id ? "is-active" : ""}`, disabled: status === "sending", key: id, type: "button", onClick: () => setPlacement(id) },
                      h("span", null, label),
                      h("small", null, id === "both" ? `${t.lid} / ${t.box}` : t.surface),
                    ),
                  ),
                ),
              ),
            step === 3 &&
              h(
                React.Fragment,
                null,
                h("label", { htmlFor: "contactText" }, t.contactLabel),
                h("input", {
                  disabled: status === "sending",
                  id: "contactText",
                  name: "contact",
                  placeholder: t.contactPlaceholder,
                  type: "text",
                  value: contact,
                  onChange: (event) => setContact(event.target.value),
                }),
              ),
          ),
          h(
            "div",
            { className: "form-actions" },
            h("button", { className: "button button-secondary", disabled: step === 1 || status === "sending", type: "button", onClick: () => setStep(Math.max(1, step - 1)) }, t.back),
            step < 3
              ? h("button", { className: "button button-primary", disabled: status === "sending" || (step === 1 && !canContinueFromText), type: "button", onClick: () => setStep(Math.min(3, step + 1)) }, t.next)
              : h("button", { className: "button button-primary", disabled: !canSubmit || status === "sending", type: "submit" }, status === "sending" ? t.sending : t.submitRequest),
          ),
          status === "ready" && h("p", { className: "submit-status" }, t.formReady),
        ),
      ),
      h(
        "div",
        { className: "personalization-request" },
        h("span", { className: "request-kicker" }, "TIA Candles"),
        h("h3", null, t.requestTitle),
        h(
          "dl",
          null,
          h("div", null, h("dt", null, t.requestText), h("dd", { className: engraving.trim() ? "" : "is-muted" }, displayText)),
          h("div", null, h("dt", null, t.requestPlacement), h("dd", null, placementLabel)),
          h("div", null, h("dt", null, t.requestContact), h("dd", { className: contact.trim() ? "" : "is-muted" }, contact.trim() || t.contactPlaceholder)),
        ),
        h("p", null, t.personalizeText),
      ),
    ),
    modal &&
      h(
        "div",
        { className: "status-modal", role: "dialog", "aria-modal": "true", "aria-labelledby": "personalizationStatusTitle" },
        h("div", { className: "status-modal-backdrop", onClick: () => setModal(null) }),
        h(
          "div",
          { className: `status-modal-card is-${modal.type}` },
          h("span", { className: "status-dot", "aria-hidden": "true" }),
          h("h3", { id: "personalizationStatusTitle" }, modal.title),
          h("p", null, modal.text),
          h("button", { className: "button button-primary", type: "button", onClick: () => setModal(null) }, t.close),
        ),
      ),
  );
}

function Benefits({ t }) {
  return h("section", { className: "benefits" }, h("div", { className: "section-heading" }, h("p", { className: "eyebrow" }, t.benefitsEyebrow), h("h2", null, t.benefitsTitle)), h("div", { className: "benefit-grid" }, t.benefits.map(([title, text], index) => h("div", { key: title }, h("span", null, String(index + 1).padStart(2, "0")), h("h3", null, title), h("p", null, text)))));
}

function FinalCta({ t }) {
  return h("section", { className: "final-cta", id: "order" }, h("img", { src: "https://tiacandles.com/content/images/10/2880x1152e90nn0/59074029254080.webp", alt: "TIA Candles collection" }), h("div", null, h("p", { className: "eyebrow" }, "TIA Candles"), h("h2", null, t.ctaTitle), h("a", { className: "button button-primary", href: "https://tiacandles.com/", target: "_blank", rel: "noreferrer" }, t.ctaButton)));
}

function App() {
  const [lang, setLang] = useState("uk");
  const [activeSeries, setActiveSeries] = useState("home");
  const [engraving, setEngraving] = useState("");
  const [placement, setPlacement] = useState("lid");
  const t = useMemo(() => content[lang], [lang]);

  return h(
    React.Fragment,
    null,
    h(Header, { lang, setLang, t }),
    h("main", null, h(Hero, { activeSeries, lang, setActiveSeries, t }), h(Intro, { t }), h(Collection, { lang, t, setActiveSeries }), h(Personalization, { engraving, placement, setEngraving, setPlacement, lang, t }), h(Benefits, { t }), h(FinalCta, { t })),
    h("footer", { className: "site-footer" }, h("span", null, "TIA Candles"), h("a", { href: "https://tiacandles.com/", target: "_blank", rel: "noreferrer" }, "tiacandles.com")),
  );
}

createRoot(document.getElementById("root")).render(h(App));
