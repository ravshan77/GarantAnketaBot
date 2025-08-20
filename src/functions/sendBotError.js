const TELEGRAM_API = import.meta.env.VITE_SEND_ERROR_TO_TG_BOT

export function sendBotError(user, err, error_address) {
    const error_message = `<pre>
        <b>Eski Anketa botdan xato 👇 </b>
        <b>User:</b> ${user?.username ?? "Noma'lum"}
        <b>First name:</b> ${user?.first_name ?? "Noma'lum"} ${user?.last_name ?? "Noma'lum"}
        <b>Error Qayerdan?:</b> ${error_address}
        <b>Error Message:</b> ${err.message}
        <b>Error (full):</b> ${JSON.stringify(err)}
    </pre>`;

    fetch(TELEGRAM_API, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ 
            chat_id: 875290874, 
            text: error_message, 
            parse_mode: "HTML" 
        }),
    })
}