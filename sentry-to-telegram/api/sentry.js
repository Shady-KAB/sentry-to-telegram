export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  const TELEGRAM_TOKEN = "8150555743:AAGI0xIfYrgLzIrWLtrniUmUGMh1CMdT3kI";
  const CHAT_ID = "-1002160289692";

  const { project, title, url } = req.body || {};

  const text = `🚨 *Ошибка в проекте:* ${project}\n📄 _${title}_\n🔗 [Открыть в Sentry](${url})`;

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "Markdown",
      }),
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Telegram error:", error);
    res.status(500).json({ ok: false });
  }
}
