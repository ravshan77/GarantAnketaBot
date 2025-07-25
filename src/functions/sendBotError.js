const TELEGRAM_API = import.meta.env.VITE_SEND_ERROR_TO_TG_BOT

export function sendBotError(user, err) {
    const error_message = `<pre>
        <b>Anketa botdan xato 👇 </b>
        <b>User:</b> ${user?.username}
        <b>First name:</b> ${user?.first_name}
        <b>Error Message:</b> ${err.message}
        <b>Error (full):</b> ${JSON.stringify(err)}
    </pre>`;

    fetch(TELEGRAM_API, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: 875290874, text: error_message, parse_mode: "HTML" }),
    })
    
}