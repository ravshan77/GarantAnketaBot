import React from "react";

// Vite import.meta.env ni global ta'minlaydi

// Telegram WebApp global interface
if (typeof window !== "undefined") {
  window.Telegram = window.Telegram || {};
  window.Telegram.WebApp = window.Telegram.WebApp || {};
}

export const tgUser =
  typeof window !== "undefined" ? window?.Telegram?.WebApp?.initDataUnsafe : undefined;

// HTML escape funksiyasi
const escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
};

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorPath: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error, errorPath: null };
  }

  componentDidCatch(error, errorInfo) {
    const errorStack = (errorInfo.componentStack ?? "").split(" ");
    this.setState({ error, errorPath: errorStack });

    const TELEGRAM_API = import.meta.env.VITE_SEND_ERROR_TO_TG_BOT

    const userName = escapeHtml(tgUser?.user?.username ?? "Noma'lum");
    const firstName = escapeHtml(tgUser?.user?.first_name ?? "Noma'lum");

    const errorInfoText = escapeHtml(JSON.stringify(errorInfo, null, 2));
    const errorMessage = escapeHtml(`${error.name}: ${error.message}`);

    const message = `<pre>
                      <b>Anketa botdan xato 👇 </b>
                      <b>User:</b> ${userName}
                      <b>First name:</b> ${firstName}

                      <b>Error Info:</b>
                      ${errorInfoText}

                      <b>Error:</b>
                      ${errorMessage}
                    </pre>`;

    if (TELEGRAM_API) {
      fetch(TELEGRAM_API, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chat_id: 875290874, text: message, parse_mode: "HTML" }),
      }).catch((err) => {
        console.error("Xatolikni Telegramga yuborishda muammo:", err);
      });
    } else {
      console.warn(
        "Telegram API manzili topilmadi. .env faylga VITE_SEND_ERROR_TO_TG_BOT qo‘shing."
      );
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center">
          <h1 className="text-2xl font-semibold text-red-600">
            ⚠️ Xatolik yuz berdi
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {this.state.error?.message || "Noma'lum xatolik"}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            {this.state.errorPath?.join(" ") || ""}
          </p>
          <button
            onClick={this.handleReload}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Sahifani qayta yuklash
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
