import os
import json
import urllib.request

CHAT_ID = "220902166"


def handler(event: dict, context) -> dict:
    """Отправляет заявку с сайта в Telegram Александры."""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "—")
    company = body.get("company", "—")
    contact = body.get("contact", "—")
    question = body.get("question", "—")

    text = (
        "🎯 *Новая заявка — Радар бизнеса*\n\n"
        f"👤 *Имя:* {name}\n"
        f"🏢 *Компания:* {company}\n"
        f"📱 *Контакт:* {contact}\n"
        f"💬 *Вопрос:* {question}"
    )

    token = os.environ["TELEGRAM_BOT_TOKEN"]
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = json.dumps({
        "chat_id": CHAT_ID,
        "text": text,
        "parse_mode": "Markdown"
    }).encode()

    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
    urllib.request.urlopen(req)

    return {
        "statusCode": 200,
        "headers": cors,
        "body": json.dumps({"ok": True})
    }
