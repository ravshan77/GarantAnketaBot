import { tgUser } from "../constants";
const TELEGRAM_API = import.meta.env.VITE_SEND_ERROR_TO_TG_BOT


export function sendBotError(err, error_address) {
    const error_message = `<pre>
        <b>Eski Anketa botdan xato 👇 </b>
        <b>User:</b> ${tgUser?.first_name ?? "Noma'lum"} ${tgUser?.last_name ?? "Noma'lum"}
        <b>User_name:</b> ${tgUser?.username ?? "Noma'lum"}
        <b>User_id:</b> ${tgUser?.id ?? "Noma'lum"}
        <b>Error Qayerdan?:</b> ${error_address}
        <b>Error Message:</b> ${err.message}
        <b>Error (full):</b> ${err}
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