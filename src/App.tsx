import React, { useState, useMemo } from "react";
import {
  Shield,
  User,
  AlertTriangle,
  Send,
  Search,
  CheckCircle2,
  Clock,
  FileText,
  DollarSign,
  Briefcase,
  HelpCircle,
  FileSpreadsheet,
  Upload,
  Lock,
  Globe,
  Phone,
  Mail,
  Eye,
  Trash2,
  Users,
  ChevronRight,
  ShieldCheck,
  Building,
  Target,
  ArrowRight,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { translations } from "./translations";

interface FileAttachment {
  name: string;
  size: number;
  type: string;
  content?: string;
}

interface StatusHistoryItem {
  status: string;
  label: string;
  timestamp: string;
  description: string;
}

interface Report {
  id: string;
  createdAt: string;
  status: string;
  statusHistory: StatusHistoryItem[];
  victimName: string;
  victimPhone: string;
  victimEmail: string;
  victimCountry: string;
  scamCategory: string;
  scamDate: string;
  amount: string;
  currency: string;
  description: string;
  suspectName: string;
  suspectPhone: string;
  suspectEmail: string;
  suspectPlatform: string;
  suspectAccounts: string;
  files: FileAttachment[];
}

export default function App() {
  // Language State
  const [lang, setLang] = useState<string>(() => localStorage.getItem("app_lang") || "fr");
  const rawT = translations[lang] || translations["fr"];
  const t = useMemo(() => {
    const cleaned: Record<string, string> = {};
    for (const [key, value] of Object.entries(rawT)) {
      cleaned[key] = value.replace(/\s*\*$/, "");
    }
    return cleaned as unknown as typeof rawT;
  }, [rawT]);

  const changeLang = (newLang: string) => {
    setLang(newLang);
    localStorage.setItem("app_lang", newLang);
  };

  const COUNTRIES = [
    { code: "fr", flag: "🇫🇷", name: "France", langName: "Français" },
    { code: "pt", flag: "🇵🇹", name: "Portugal", langName: "Português" },
    { code: "it", flag: "🇮🇹", name: "Italie", langName: "Italiano" },
    { code: "hu", flag: "🇭🇺", name: "Hongrie", langName: "Magyar" },
    { code: "sk", flag: "🇸🇰", name: "Slovaquie", langName: "Slovenčina" },
    { code: "sl", flag: "🇸🇮", name: "Slovénie", langName: "Slovenščina" },
    { code: "fi", flag: "🇫🇮", name: "Finlande", langName: "Suomi" },
    { code: "cz", flag: "🇨🇿", name: "Rép. Tchèque", langName: "Čeština" },
    { code: "hr", flag: "🇭🇷", name: "Croatie", langName: "Hrvatski" },
    { code: "de", flag: "🇩🇪", name: "Allemagne", langName: "Deutsch" },
    { code: "pt", flag: "🇧🇷", name: "Brésil", langName: "Português (BR)" },
    { code: "en", flag: "🇺🇸", name: "USA", langName: "English (US)" },
    { code: "en", flag: "🇨🇦", name: "Canada", langName: "English (CA)" },
    { code: "nl", flag: "🇳🇱", name: "Pays-Bas", langName: "Nederlands" },
  ];

  const txtRefVal: Record<string, any> = {
    fr: {
      rembReady: "Remboursement disponible de",
      fundsSecured: "Les fonds dérobés ont été sécurisés sur notre compte de consignation militaire. Le mandat de restitution est prêt. Veuillez vous rapprocher de notre cellule de répartition.",
      demandTrans: "Demander le transfert de fonds",
      fees: "Frais : 0.00% (Pris en charge par l'État)",
      dossierDetails: "Détails du Signalement & Victime",
      victimName: "Nom de la victime :",
      countryConcerned: "Pays concerné :",
      phoneReg: "Téléphone enregistré :",
      scamCat: "Catégorie de fraude :",
      amtStolen: "Montant dérobé :",
      scamStory: "Récit des faits transmis :",
      suspectInfoTitle: "Informations Suspect en cours d'Investigation",
      susName: "Identité / Pseudonyme suspect :",
      platformUsed: "Plateforme utilisée :",
      susPhone: "Téléphone / WhatsApp de l'escroc :",
      susEmail: "E-mail suspecté :",
      susAccounts: "Comptes Financiers / Crypto ciblés :",
      noAccounts: "Aucun compte financier direct enregistré dans le dossier.",
      proofsAttached: "Pièces de preuve jointes :",
      filesCount: "fichier(s)",
      noReportMsg: "En attente de recherche de dossier",
      enterIdMsg: "Veuillez saisir votre numéro d'identifiant militaire ci-dessus pour afficher le statut détaillé des opérations et de remboursement de vos fonds.",
      alertRequest: "Demande de transfert enregistrée auprès de la cellule. Votre officier de liaison va prendre contact avec vous sous 24h.",
      footerNotice: "Ce portail d'investigations s'inscrit dans le cadre du traité intergouvernemental de lutte contre la cybercriminalité financière et le blanchiment d'argent. En vertu des décrets de protection des victimes de vols numériques, l'unité s'efforce de géolocaliser les suspects et de bloquer l'équivalent des fonds dérobés par voie de saisie administrative ou pénale d'actifs pour restitution de plein droit.",
      notifEncrypted: "🔒 Serveurs d'investigation officiels cryptés. Connexion sécurisée de bout en bout.",
      legalMentions: "Mention Légale",
      dataProtection: "Protection des Données",
      secAes: "Sécurisation AES-256",
      milAssistance: "Assistance Militaire",
      notComm: "Non communiqué",
      notSpec: "Non spécifié",
    },
    en: {
      rembReady: "Refund available for",
      fundsSecured: "The stolen funds have been secured in our military escrow account. The restitution order is ready. Please contact our distribution unit.",
      demandTrans: "Request Transfer of Funds",
      fees: "Fees: 0.00% (Sponsored by the State)",
      dossierDetails: "Report Details & Victim Info",
      victimName: "Victim's Name:",
      countryConcerned: "Country concerned:",
      phoneReg: "Registered phone:",
      scamCat: "Scam Category:",
      amtStolen: "Amount stolen:",
      scamStory: "Transmitted narrative of events:",
      suspectInfoTitle: "Suspect Information under Investigation",
      susName: "Suspect Identity / Pseudonym:",
      platformUsed: "Platform used:",
      susPhone: "Fraudster's Phone / WhatsApp:",
      susEmail: "Suspected Email:",
      susAccounts: "Targeted Financial / Crypto Accounts:",
      noAccounts: "No direct financial account registered in the file.",
      proofsAttached: "Attached pieces of evidence:",
      filesCount: "file(s)",
      noReportMsg: "Awaiting case search",
      enterIdMsg: "Please enter your unique military case ID above to view the detailed status of operations and asset restitution.",
      alertRequest: "Transfer request registered with our unit. Your liaison officer will contact you within 24 hours.",
      footerNotice: "This investigation portal is part of the intergovernmental treaty to fight cybercrime and money laundering. In accordance with digital theft protection decrees, the unit locates suspects and freezes assets for immediate restitution.",
      notifEncrypted: "🔒 Official encrypted investigation servers. End-to-end secure connection.",
      legalMentions: "Legal Notice",
      dataProtection: "Data Protection",
      secAes: "AES-256 Secured",
      milAssistance: "Military Assistance",
      notComm: "Not disclosed",
      notSpec: "Not specified",
    },
    pt: {
      rembReady: "Reembolso disponível de",
      fundsSecured: "Os fundos roubados foram protegidos em nossa conta militar especial. O mandado de restituição está pronto. Entre em contato com a nossa unidade.",
      demandTrans: "Solicitar Transferência de Fundos",
      fees: "Taxas: 0.00% (Suportado pelo Estado)",
      dossierDetails: "Detalhes da Denúncia e Vítima",
      victimName: "Nome da vítima:",
      countryConcerned: "País afetado:",
      phoneReg: "Telefone registrado:",
      scamCat: "Categoria de fraude:",
      amtStolen: "Valor roubado:",
      scamStory: "Relato dos fatos transmitido:",
      suspectInfoTitle: "Informações do Suspeito em Investigação",
      susName: "Identidade / Pseudônimo suspeito:",
      platformUsed: "Plataforma utilizada:",
      susPhone: "Telefone / WhatsApp do golpista:",
      susEmail: "E-mail suspeito:",
      susAccounts: "Contas Financeiras / Crypto visadas:",
      noAccounts: "Nenhuma conta financeira direta registrada no dossiê.",
      proofsAttached: "Documentos de provas anexados:",
      filesCount: "arquivo(s)",
      noReportMsg: "Aguardando pesquisa de dossiê",
      enterIdMsg: "Por favor, insira o seu ID militar acima para visualizar o status detalhado das operações e restituição de fundos.",
      alertRequest: "Solicitação de transferência registrada. Seu oficial de ligação entrará em contato em até 24 horas.",
      footerNotice: "Este portal de investigações faz parte do tratado intergovernamental de combate ao cibercrime e à lavagem de dinheiro. Sob os decretos de proteção à vítima, a unidade visa congelar ativos suspeitos para restituição imediata.",
      notifEncrypted: "🔒 Servidores oficiais de investigação criptografados. Conexão segura de ponta a ponta.",
      legalMentions: "Menções Legais",
      dataProtection: "Proteção de Dados",
      secAes: "Segurança AES-256",
      milAssistance: "Assistência Militar",
      notComm: "Não informado",
      notSpec: "Não especificado",
    },
    it: {
      rembReady: "Rimborso disponibile di",
      fundsSecured: "I fondi sottratti sono stati messi al sicuro sul nostro conto di deposito militare. Il mandato di restituzione è pronto. Contatta la nostra unità.",
      demandTrans: "Richiedi il Trasferimento dei Fondi",
      fees: "Commissioni: 0.00% (A carico dello Stato)",
      dossierDetails: "Dettagli della Segnalazione & Vittima",
      victimName: "Nome della vittima:",
      countryConcerned: "Paese interessato:",
      phoneReg: "Telefono registrato:",
      scamCat: "Categoria della truffa:",
      amtStolen: "Importo sottratto:",
      scamStory: "Resoconto dei fatti trasmesso:",
      suspectInfoTitle: "Informazioni sul Sospettato sotto Indagine",
      susName: "Identità / Pseudonimo sospetto:",
      platformUsed: "Piattaforma utilizzata:",
      susPhone: "Telefono / WhatsApp del truffatore:",
      susEmail: "E-mail sospetta:",
      susAccounts: "Conti Finanziari / Crypto mirati:",
      noAccounts: "Nessun conto finanziario registrato nella pratica.",
      proofsAttached: "Documenti di prova allegati:",
      filesCount: "file",
      noReportMsg: "In attesa di ricerca della pratica",
      enterIdMsg: "Inserisci il numero della tua pratica militare qui sopra per visualizzare lo stato dettagliato delle operazioni e del rimborso dei tuoi fondi.",
      alertRequest: "Richiesta di trasferimento registrata. Il tuo ufficiale di collegamento ti contatterà entro 24 ore.",
      footerNotice: "Questo portale di indagine fa parte del trattato intergovernativo per la lotta alla criminalità informatica e al riciclaggio di denaro. Ai sensi dei decreti di tutela, l'unità congela i beni del sospetto per la restituzione diretta.",
      notifEncrypted: "🔒 Server investigativi ufficiali crittografati. Connessione protetta end-to-end.",
      legalMentions: "Note Legali",
      dataProtection: "Protezione dei Dati",
      secAes: "Sicurezza AES-256",
      milAssistance: "Assistenza Militare",
      notComm: "Non comunicato",
      notSpec: "Non specificato",
    },
    de: {
      rembReady: "Rückerstattung verfügbar über",
      fundsSecured: "Die gestohlenen Gelder wurden auf unserem militärischen Treuhandkonto gesichert. Der Rückgabeauftrag ist bereit. Bitte kontaktieren Sie unsere Einheit.",
      demandTrans: "Geldrückgabe anfordern",
      fees: "Gebühren: 0,00 % (Vom Staat übernommen)",
      dossierDetails: "Falldetails & Opferinformationen",
      victimName: "Name des Opfers:",
      countryConcerned: "Betroffenes Land:",
      phoneReg: "Registrierte Telefonnummer:",
      scamCat: "Betrugsart:",
      amtStolen: "Gestohlener Betrag:",
      scamStory: "Übermittelter Tatbericht:",
      suspectInfoTitle: "Verdächtigen-Informationen unter Ermittlung",
      susName: "Identität / Pseudonym des Verdächtigen:",
      platformUsed: "Verwendete Plattform:",
      susPhone: "Telefon / WhatsApp des Betrügers:",
      susEmail: "Verdächtige E-Mail:",
      susAccounts: "Gezielte Finanz- / Kryptokonten:",
      noAccounts: "Kein direktes Finanzkonto im Fall registriert.",
      proofsAttached: "Beigefügte Beweismittel:",
      filesCount: "Datei(en)",
      noReportMsg: "Warten auf Fallsuche",
      enterIdMsg: "Bitte geben Sie oben Ihre militärische Fall-ID ein, um den detaillierten Status der Ermittlungen und die Rückerstattung anzuzeigen.",
      alertRequest: "Rückerstattungsanforderung registriert. Ihr Verbindungsoffizier wird sich innerhalb von 24 Stunden mit Ihnen in Verbindung setzen.",
      footerNotice: "Dieses Ermittlungsportal ist Teil des zwischenstaatlichen Abkommens zur Bekämpfung von Cyberkriminalität und Geldwäsche. Gemäß den Opferschutzverordnungen friert die Einheit Vermögenswerte zur schnellen Rückerstattung ein.",
      notifEncrypted: "🔒 Offizielle verschlüsselte Ermittlungsserver. Sichere End-to-End-Verbindung.",
      legalMentions: "Impressum",
      dataProtection: "Datenschutz",
      secAes: "AES-256 gesichert",
      milAssistance: "Militärische Hilfe",
      notComm: "Nicht angegeben",
      notSpec: "Nicht angegeben",
    },
    hu: {
      rembReady: "Visszatérítés elérhető:",
      fundsSecured: "Az ellopott pénzt biztonságba helyeztük a katonai számlánkon. A visszatérítési parancs kész. Kérjük, vegye fel a kapcsolatot az egységünkkel.",
      demandTrans: "Pénz átutalásának kérése",
      fees: "Díj: 0.00% (Az állam által átvállalva)",
      dossierDetails: "Bejelentés és áldozat részletei",
      victimName: "Áldozat neve:",
      countryConcerned: "Érintett ország:",
      phoneReg: "Regisztrált telefon:",
      scamCat: "Csalás kategória:",
      amtStolen: "Ellopott összeg:",
      scamStory: "Továbbított történet:",
      suspectInfoTitle: "Gyanúsított adatai nyomozás alatt",
      susName: "Gyanúsított neve / álneve:",
      platformUsed: "Használt platform:",
      susPhone: "Csaló telefonszáma / WhatsApp-ja:",
      susEmail: "Gyanús e-mail cím:",
      susAccounts: "Célzott banki / kripto számlák:",
      noAccounts: "Nincs regisztrált pénzügyi számla az ügyben.",
      proofsAttached: "Csatolt bizonyítékok:",
      filesCount: "fájl",
      noReportMsg: "Várakozás az ügy lekérdezésére",
      enterIdMsg: "Kérjük, adja meg katonai ügyszámát fent, hogy láthassa a nyomozás és a visszatérítés részletes állapotát.",
      alertRequest: "Átutalási igény regisztrálva. Összekötő tisztünk 24 órán bilinear felveszi Önnel a kapcsolatot.",
      footerNotice: "Ez a vizsgálati portál a kiberbűnözés és pénzmosás elleni kormányközi egyezmény része. Az áldozatvédelmi rendeletek értelmében az egység zárolja a vagyont az azonnali kártalanításhoz.",
      notifEncrypted: "🔒 Hivatalos titkosított vizsgálati szerverek. Teljesen biztonságos kapcsolat.",
      legalMentions: "Jogi nyilatkozat",
      dataProtection: "Adatvédelem",
      secAes: "AES-256 Titkosítás",
      milAssistance: "Katonai segítség",
      notComm: "Nincs megadva",
      notSpec: "Nincs megadva",
    },
    sk: {
      rembReady: "Vrátenie prostriedkov k dispozícii pre",
      fundsSecured: "Ukradnuté prostriedky boli zabezpečené na našom vojenskom viazanom účte. Príkaz na vrátenie je pripravený. Kontaktujte našu distribučnú jednotku.",
      demandTrans: "Požiadať o prevod prostriedkov",
      fees: "Poplatky: 0.00% (Hradené štátom)",
      dossierDetails: "Podrobnosti o nahlásení a obeti",
      victimName: "Meno obete:",
      countryConcerned: "Dotknutá krajina:",
      phoneReg: "Zaregistrovaný telefón:",
      scamCat: "Kategória podvodu:",
      amtStolen: "Ukradnutá suma:",
      scamStory: "Odoslaný popis udalostí:",
      suspectInfoTitle: "Informácie o podozrivom vo vyšetrovaní",
      susName: "Identita / pseudonym podozrivého:",
      platformUsed: "Použitá platforma:",
      susPhone: "Telefón / WhatsApp podvodníka:",
      susEmail: "Podozrivý e-mail:",
      susAccounts: "Cielené finančné / krypto účty:",
      noAccounts: "V spise nie je registrovaný žiadny priamy finančný účet.",
      proofsAttached: "Priložené dôkazy:",
      filesCount: "súbor(y)",
      noReportMsg: "Čakanie na vyhľadanie spisu",
      enterIdMsg: "Zadajte svoje jedinečné vojenské ID prípadu vyššie na zobrazenie podrobného stavu operácií a vrátenia majetku.",
      alertRequest: "Žiadosť o prevod bola zaregistrovaná. Váš spojovací dôstojník vás bude kontaktovať do 24 hodín.",
      footerNotice: "Tento vyšetrovací portál je súčasťou medzištátnej dohody o boji proti kybernetickej kriminalite a praniu špinavých peňazí. V súlade s nariadeniami o ochrane obetí jednotka zmrazuje majetok na okamžité vrátenie.",
      notifEncrypted: "🔒 Oficiálne šifrované vyšetrovacie servery. Zabezpečené spojenie end-to-end.",
      legalMentions: "Právne informácie",
      dataProtection: "Ochrana osobných údajov",
      secAes: "Zabezpečené pomocou AES-256",
      milAssistance: "Vojenská pomoc",
      notComm: "Neuvedené",
      notSpec: "Nešpecifikované",
    },
    sl: {
      rembReady: "Vračilo na voljo za",
      fundsSecured: "Ukradena sredstva so bila zavarovana na našem vojaškem depozitnem računu. Nalog za vračilo je pripravljen. Obrnite se na našo enoto za razdelitev.",
      demandTrans: "Zahtevaj prenos sredstev",
      fees: "Provizije: 0.00% (Krije država)",
      dossierDetails: "Podrobnosti prijave in žrtve",
      victimName: "Ime žrtve:",
      countryConcerned: "Zadevna država:",
      phoneReg: "Registriran telefon:",
      scamCat: "Kategorija goljufije:",
      amtStolen: "Ukraden znesek:",
      scamStory: "Posredovan opis dogodkov:",
      suspectInfoTitle: "Podatki o osumljencu v preiskavi",
      susName: "Identiteta / psevdonim osumljenca:",
      platformUsed: "Uporabljena platforma:",
      susPhone: "Telefon / WhatsApp goljufa:",
      susEmail: "Osumljeni e-poštni naslov:",
      susAccounts: "Ciljani finančni / kripto računi:",
      noAccounts: "V spisu ni registriranega neposrednega finančnega računa.",
      proofsAttached: "Priloženi dokazi:",
      filesCount: "datoteka/e",
      noReportMsg: "Čakanje na iskanje spisa",
      enterIdMsg: "Zgoraj vnesite svojo enolično vojaško identifikacijsko številko primera za ogled podrobnega stanja operacij in vračila sredstev.",
      alertRequest: "Zahteva za prenos je registrirana. Vaš častnik za zvezo vas bo kontaktiral v 24 urah.",
      footerNotice: "Ta preiskovalni portal je del medvladnega sporazuma o boju proti kibernetskemu kriminalu in pranju denarja. V skladu z odloki o zaščiti žrtev enota zamrzne premoženje za takojšnje vračilo.",
      notifEncrypted: "🔒 Uradni šifrirani preiskovalni strežniki. Varna povezava od konca do konca.",
      legalMentions: "Pravno obvestilo",
      dataProtection: "Varstvo podatkov",
      secAes: "Zaščiteno z AES-256",
      milAssistance: "Vojaška pomoč",
      notComm: "Ni sporočeno",
      notSpec: "Ni določeno",
    },
    fi: {
      rembReady: "Palautus saatavilla kohteelle",
      fundsSecured: "Epäillyn varastamat varat on turvattu sotilaallisella sulkutilillämme. Palautusmääräys on valmis. Ota yhteyttä jakeluyksikköömme.",
      demandTrans: "Pyydä varojen siirtoa",
      fees: "Kulut: 0.00% (Valtion tukema)",
      dossierDetails: "Raportin tiedot & uhrin tiedot",
      victimName: "Uhrin nimi:",
      countryConcerned: "Kyseessä oleva maa:",
      phoneReg: "Rekisteröity puhelin:",
      scamCat: "Huijauskategoria:",
      amtStolen: "Varastettu määrä:",
      scamStory: "Lähetetty tapahtumakuvaus:",
      suspectInfoTitle: "Epäillyn tiedot tutkinnassa",
      susName: "Epäillyn identiteetti / nimimerkki:",
      platformUsed: "Käytetty alusta:",
      susPhone: "Huijarin puhelin / WhatsApp:",
      susEmail: "Epäilty sähköposti:",
      susAccounts: "Kohdennetut pankki- / kryptotilit:",
      noAccounts: "Asiakirjaan ei ole rekisteröity suoria pankkititilejä.",
      proofsAttached: "Liitetyt todisteet:",
      filesCount: "tiedosto(a)",
      noReportMsg: "Odottaa asian hakua",
      enterIdMsg: "Syötä ainutlaatuinen sotilaallinen asiatunnuksesi ylhäältä nähdäksesi operaatioiden ja varojen palautuksen yksityiskohtaisen tilan.",
      alertRequest: "Siirtopyyntö rekisteröity yksikköömme. Yhteysupseerisi ottaa sinuun yhteyttä 24 tunnin kuluessa.",
      footerNotice: "Tämä tutkintaportaali on osa hallitustenvälistä sopimusta kyberrikollisuuden ja rahanpesun torjumiseksi. Digitaalisen varkauden suojapäätösten mukaisesti yksikkö jäädyttää varoja välitöntä palauttamista varten.",
      notifEncrypted: "🔒 Viralliset salatut tutkintapalvelimet. Päästä päähän suojattu yhteys.",
      legalMentions: "Oikeudellinen ilmoitus",
      dataProtection: "Tietosuoja",
      secAes: "AES-256 suojattu",
      milAssistance: "Sotilaallinen apu",
      notComm: "Ei ilmoitettu",
      notSpec: "Ei määritelty",
    },
    cz: {
      rembReady: "Vrácení peněz je k dispozici pro",
      fundsSecured: "Ukradené prostředky byly zajištěny na našem vojenském vázaném účtu. Příkaz k vrácení je připraven. Kontaktujte naši distribuční jednotku.",
      demandTrans: "Požádat o převod prostředků",
      fees: "Poplatky: 0.00% (Hrazeno státem)",
      dossierDetails: "Podrobnosti o nahlášení a oběti",
      victimName: "Jméno oběti:",
      countryConcerned: "Dotčená země:",
      phoneReg: "Registrovaný telefon:",
      scamCat: "Kategorie podvodu:",
      amtStolen: "Ukradená částka:",
      scamStory: "Odeslaný popis událostí:",
      suspectInfoTitle: "Informace o podezřelém ve vyšetřování",
      susName: "Identita / pseudonym podezřelého:",
      platformUsed: "Použitá platforma:",
      susPhone: "Telefon / WhatsApp podvodníka:",
      susEmail: "Podezřelý e-mail:",
      susAccounts: "Cílené finanční / krypto účty:",
      noAccounts: "Ve spisu není registrován žádný přímý finanční účet.",
      proofsAttached: "Přiložené důkazy:",
      filesCount: "soubor(y)",
      noReportMsg: "Čekání na vyhledání spisu",
      enterIdMsg: "Zadejte své jedinečné vojenské ID případu výše pro zobrazení podrobného stavu operací a vrácení majetku.",
      alertRequest: "Žádost o převod byla zaregistrována. Váš spojovací důstojník vás bude kontaktovat do 24 hodin.",
      footerNotice: "Tento vyšetřovací portál je součástí mezivládní dohody o boji proti kybernetické kriminalitě a praní špinavých peněz. V souladu s nařízeními o ochraně obětí jednotka zmrazuje majetek pro okamžité vrácení.",
      notifEncrypted: "🔒 Oficiální šifrované vyšetřovací servery. Zabezpečené spojení end-to-end.",
      legalMentions: "Právní informace",
      dataProtection: "Ochrana osobních údajů",
      secAes: "Zabezpečeno pomocí AES-256",
      milAssistance: "Vojenská pomoc",
      notComm: "Neuvedeno",
      notSpec: "Nespecifikováno",
    },
    hr: {
      rembReady: "Povrat novca dostupan za",
      fundsSecured: "Ukradena sredstva su osigurana na našem vojnom depozitnom računu. Nalog za povrat je spreman. Kontaktirajte našu distribucijsku jedinicu.",
      demandTrans: "Zatraži prijenos sredstava",
      fees: "Naknade: 0.00% (Pokriva država)",
      dossierDetails: "Pojedinosti o prijavi i žrtvi",
      victimName: "Ime žrtve:",
      countryConcerned: "Pogođena država:",
      phoneReg: "Registrirani telefon:",
      scamCat: "Kategorija prijevare:",
      amtStolen: "Ukradeni iznos:",
      scamStory: "Poslani opis događaja:",
      suspectInfoTitle: "Informacije o osumnjičeniku pod istragom",
      susName: "Identitet / pseudonim osumnjičenika:",
      platformUsed: "Korištena platforma:",
      susPhone: "Telefon / WhatsApp prevaranta:",
      susEmail: "Sumnjiva e-pošta:",
      susAccounts: "Ciljani financijski / kripto računi:",
      noAccounts: "U spisu nema registriranog izravnog financijskog računa.",
      proofsAttached: "Priloženi dokazi:",
      filesCount: "datoteka/e",
      noReportMsg: "Čekanje na pretraživanje spisa",
      enterIdMsg: "Gore unesite svoj jedinstveni vojni ID slučaja kako biste vidjeli detaljan status operacija i povrata sredstava.",
      alertRequest: "Zahtjev za prijenos je registriran. Vaš časnik za vezu kontaktirat će vas u roku od 24 sata.",
      footerNotice: "Ovaj istražni portal dio je međuvladinog sporazuma o borbi protiv kibernetičkog kriminala i pranja novca. U skladu s uredbama o zaštiti žrtava, jedinica zamrzava imovinu za trenutni povrat.",
      notifEncrypted: "🔒 Službeni šifrirani istražni poslužitelji. Sigurna veza s kraja na kraj.",
      legalMentions: "Pravne napomene",
      dataProtection: "Zaštita podataka",
      secAes: "Osigurano s AES-256",
      milAssistance: "Vojna pomoć",
      notComm: "Nije prijavljeno",
      notSpec: "Nije specificirano",
    },
    nl: {
      rembReady: "Terugbetaling beschikbaar voor",
      fundsSecured: "De gestolen gelden zijn veiliggesteld op onze militaire escrowrekening. De restitutiebeschikking is gereed. Neem contact op met onze distributie-eenheid.",
      demandTrans: "Vraag de overboeking van gelden aan",
      fees: "Kosten: 0.00% (Gedekt door de staat)",
      dossierDetails: "Details van de aangifte & slachtoffer",
      victimName: "Naam slachtoffer:",
      countryConcerned: "Betrokken land:",
      phoneReg: "Geregistreerde telefoon:",
      scamCat: "Categorie fraude:",
      amtStolen: "Gestolen bedrag:",
      scamStory: "Verzonden relaas van feiten:",
      suspectInfoTitle: "Informatie verdachte in onderzoek",
      susName: "Identiteit / pseudoniem verdachte:",
      platformUsed: "Gebruikt platform:",
      susPhone: "Telefoon / WhatsApp van oplichter:",
      susEmail: "Verdacht e-mailadres:",
      susAccounts: "Doelgerichte financiële / crypto-rekeningen:",
      noAccounts: "Geen directe financiële rekening geregistreerd in het dossier.",
      proofsAttached: "Bijgevoegde bewijsstukken:",
      filesCount: "bestand(en)",
      noReportMsg: "Wachtend op zoeken van dossier",
      enterIdMsg: "Voer hierboven uw unieke militaire dossier-ID in om de gedetailleerde status van operaties en terugbetaling van uw gelden te bekijken.",
      alertRequest: "Overboekingsverzoek geregistreerd. Uw verbindingsofficier neemt binnen 24 uur contact met u op.",
      footerNotice: "Dit onderzoeksportaal maakt deel uit van het intergouvernementele verdrag ter bestrijding van cybercriminaliteit en witwassen. Krachtens de decreten ter bescherming van slachtoffers streeft de eenheid ernaar activa te bevriezen voor onmiddellijke teruggave.",
      notifEncrypted: "🔒 Officiële gecodeerde onderzoeksservers. Veilige end-to-end verbinding.",
      legalMentions: "Juridische vermelding",
      dataProtection: "Gegevensbescherming",
      secAes: "Beveiligd met AES-256",
      milAssistance: "Militaire bijstand",
      notComm: "Niet meegedeeld",
      notSpec: "Niet gespecificeerd",
    }
  };

  const curTxt = txtRefVal[lang] || txtRefVal["en"];

  // Helper to translate statusHistory dynamically based on the current language (lang)
  const getTranslatedTimelineItem = (item: StatusHistoryItem) => {
    if (lang === "fr") {
      return {
        label: item.label,
        description: item.description
      };
    }
    
    if (item.status === "received" || item.label.includes("Reçu") || item.label.includes("Received")) {
      return {
        label: curTxt.noReportMsg ? (lang === "pt" ? "Dossiê Recebido e Registrado" : 
               lang === "it" ? "Fascicolo Ricevuto e Registrato" : 
               lang === "de" ? "Fall erhalten und registriert" : 
               lang === "hu" ? "Ügy regisztrálva és fogadva" : 
               lang === "sk" ? "Prípad bol prijatý a zaregistrovaný" : 
               lang === "sl" ? "Primer prejet in registriran" : 
               lang === "fi" ? "Asia vastaanotettu ja rekisteröity" : 
               lang === "cz" ? "Případ přijat a registrován" : 
               lang === "hr" ? "Predmet zaprimljen i registriran" : 
               lang === "nl" ? "Dossier ontvangen en geregisseerd" : "Case Received & Registered") : "Case Received & Registered",
        description: lang === "pt" ? "O dossiê foi registrado com sucesso no banco de dados da unidade de investigação militar de cibercrimes." : 
                     lang === "it" ? "Il fascicolo è stato registrato con successo nel database dell'unità di investigazione militare contro le frodi informatiche." : 
                     lang === "de" ? "Der Fall wurde erfolgreich in der Datenbank der militärischen Cyber-Ermittlungseinheit registriert." : 
                     lang === "hu" ? "Az ügyet sikeresen regisztrálták a katonai kiber-csalás elleni egység adatbázisában." : 
                     lang === "sk" ? "Prípad bol úspešne zaregistrovaný v databáze vojenskej kybernetickej vyšetrovacej jednotky." : 
                     lang === "sl" ? "Primer je bil uspešno registriran v bazi podatkov vojaške enote za kiber-preiskave." : 
                     lang === "fi" ? "Asia on rekisteröity onnistuneesti sotilaallisen kyberrikostutkintayksikön tietokantaan." : 
                     lang === "cz" ? "Případ byl úspěšně zaregistrován v databázi vojenské kybernetické vyšetřovací jednotky." : 
                     lang === "hr" ? "Predmet je uspješno registriran u bazi podataka vojne kibernetičke istražne jedinice." : 
                     lang === "nl" ? "Het dossier is succesvol geregistreerd in de database van de militaire cyber-fraude onderzoekseenheid." : "The case has been successfully registered in the database of the military cyber-fraud investigation unit."
      };
    }
    
    return {
      label: item.label,
      description: item.description
    };
  };

  // Contact Form State
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Unified Legal, Privacy & FAQ Info Modal State
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [activeInfoTab, setActiveInfoTab] = useState<"legal" | "privacy" | "faq">("legal");

  // Image Upload Custom Error
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setContactStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          subject: contactSubject,
          message: contactMessage
        })
      });
      if (response.ok) {
        setContactStatus("success");
        setContactName("");
        setContactEmail("");
        setContactSubject("");
        setContactMessage("");
        setTimeout(() => setContactStatus("idle"), 6000);
      } else {
        setContactStatus("error");
      }
    } catch (err) {
      setContactStatus("error");
    }
  };

  // Navigation & UI States
  const [activeTab, setActiveTab] = useState<"home" | "report" | "track">("home");
  const [successReportId, setSuccessReportId] = useState<string | null>(null);

  // Form State
  const [victimName, setVictimName] = useState("");
  const [victimPhone, setVictimPhone] = useState("");
  const [victimEmail, setVictimEmail] = useState("");
  const [victimCountry, setVictimCountry] = useState("France");
  
  const [scamCategory, setScamCategory] = useState("Arnaque Sentimentale (Romance Scam)");
  const [scamDate, setScamDate] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [description, setDescription] = useState("");

  const [suspectName, setSuspectName] = useState("");
  const [suspectPhone, setSuspectPhone] = useState("");
  const [suspectEmail, setSuspectEmail] = useState("");
  const [suspectPlatform, setSuspectPlatform] = useState("");
  const [suspectAccounts, setSuspectAccounts] = useState("");
  
  // File attachments state (simulated file metadata)
  const [attachedFiles, setAttachedFiles] = useState<FileAttachment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Tracking State
  const [searchId, setSearchId] = useState("");
  const [searchedReport, setSearchedReport] = useState<Report | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  // Handle simulated file additions
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files) as File[];
      const newFiles: FileAttachment[] = [];
      let hasSizeError = false;
      let hasCountError = false;
      let hasFormatError = false;

      const readFileAsBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (err) => reject(err);
          reader.readAsDataURL(file);
        });
      };

      for (const file of selectedFiles) {
        // Validate it is an image of any format or mime type
        const isImage = file.type.startsWith("image/") || /\.(jpg|jpeg|png|gif|webp|bmp|tiff|svg|heic|heif|raw|psd)$/i.test(file.name);
        if (!isImage) {
          hasFormatError = true;
          continue;
        }

        // Limit size to 25MB (25 * 1024 * 1024 bytes)
        if (file.size > 25 * 1024 * 1024) {
          hasSizeError = true;
          continue;
        }

        // Max 10 images
        if (attachedFiles.length + newFiles.length >= 10) {
          hasCountError = true;
          break;
        }

        try {
          const content = await readFileAsBase64(file);
          newFiles.push({
            name: file.name,
            size: file.size,
            type: file.type,
            content
          });
        } catch (error) {
          console.error("Error reading file:", error);
        }
      }

      if (hasFormatError) {
        setUploadError(
          lang === "fr" 
            ? "Erreur : Seuls les formats d'images sont acceptés (PNG, JPG, WEBP, GIF, etc.)." 
            : "Error: Only image formats are accepted (PNG, JPG, WEBP, GIF, etc.)."
        );
      } else if (hasSizeError) {
        setUploadError(
          lang === "fr" 
            ? "Erreur : Certaines images dépassent la taille limite de 25 Mo." 
            : "Error: Some images exceed the 25 MB size limit."
        );
      } else if (hasCountError) {
        setUploadError(
          lang === "fr" 
            ? "Erreur : Vous ne pouvez pas ajouter plus de 10 images au total." 
            : "Error: You cannot upload more than 10 images in total."
        );
      }

      if (newFiles.length > 0) {
        setAttachedFiles(prev => [...prev, ...newFiles]);
      }
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Submit report to the backend
  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    if (!victimName || !scamCategory || !amount || !description) {
      setSubmitError("Veuillez remplir tous les champs obligatoires marqués d'un astérisque (*).");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
          files: attachedFiles
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue lors du signalement.");
      }

      setSuccessReportId(data.reportId);
      
      // Clear form
      setVictimName("");
      setVictimPhone("");
      setVictimEmail("");
      setScamDate("");
      setAmount("");
      setDescription("");
      setSuspectName("");
      setSuspectPhone("");
      setSuspectEmail("");
      setSuspectPlatform("");
      setSuspectAccounts("");
      setAttachedFiles([]);
      
      // Redirect to success screen or track screen directly
      setActiveTab("track");
      setSearchId(data.reportId);
      // Automatically load the newly created report in search screen
      handleTrackReport(null, data.reportId);

    } catch (err: any) {
      setSubmitError(err.message || "Impossible de joindre le serveur d'investigation.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Search/Track Report by ID
  const handleTrackReport = async (e: React.FormEvent | null, directId?: string) => {
    if (e) e.preventDefault();
    const idToSearch = directId || searchId;
    if (!idToSearch) return;

    setIsSearching(true);
    setSearchError(null);
    setSearchedReport(null);

    try {
      const response = await fetch(`/api/reports/${idToSearch.trim()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Numéro de dossier introuvable.");
      }

      setSearchedReport(data);
    } catch (err: any) {
      setSearchError(err.message || "Une erreur s'est produite lors de la recherche.");
    } finally {
      setIsSearching(false);
    }
  };

  // Simulate official investigation steps progression
  const handleSimulateProgress = async () => {
    if (!searchedReport) return;
    setIsSimulating(true);

    try {
      const response = await fetch(`/api/reports/${searchedReport.id}/simulate-progress`, {
        method: "POST"
      });
      const data = await response.json();

      if (response.ok) {
        setSearchedReport(data);
      }
    } catch (err) {
      console.error("Simulation failed", err);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-amber-500 selection:text-slate-950">
      
      {/* FLAGS CONTAINER / CASE AT THE TOP */}
      <div className="bg-slate-900 border-b border-slate-800 py-3 px-4 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs text-slate-400 font-semibold uppercase tracking-wider">
            <Globe className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>Sélectionner la langue / Select language :</span>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {COUNTRIES.map((country, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => changeLang(country.code)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all ${
                  lang === country.code
                    ? "bg-amber-500 text-slate-950 shadow-lg scale-105 border border-amber-600"
                    : "bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800"
                }`}
                title={`${country.name} (${country.langName})`}
              >
                <span className="text-sm leading-none">{country.flag}</span>
                <span className="text-[11px] uppercase tracking-wide">{country.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* INSTITUTIONAL TOP BAR */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 text-[11px] py-2 px-4 flex justify-between items-center z-10">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsContactOpen(true)}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-2.5 py-1 rounded text-[10px] uppercase tracking-wider flex items-center space-x-1 transition-all duration-200 cursor-pointer shadow-md shadow-amber-500/10"
          >
            <Mail className="w-3 h-3" />
            <span>{t.contactTitle || "Contact"}</span>
          </button>
          <span className="text-slate-700">|</span>
          <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse" id="status-dot"></span>
          <span className="text-slate-400 font-medium tracking-wide uppercase hidden sm:inline">{t.topBar}</span>
        </div>
        <div className="hidden md:flex items-center space-x-4 text-slate-500">
          <span className="flex items-center"><Lock className="w-3.5 h-3.5 mr-1 text-emerald-400" /> {t.topBarSecured}</span>
          <span>|</span>
          <span>v4.3-Military-Pro</span>
        </div>
      </div>

      {/* HEADER HERO AREA */}
      <header className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800 shadow-xl py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-slate-800/80 rounded-xl border border-amber-500/40 shadow-inner flex items-center justify-center">
              <Shield className="w-10 h-10 text-amber-500" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-amber-500/10 text-amber-400 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border border-amber-500/20 tracking-wider">
                  {t.recovCell}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1">
                {t.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5 max-w-2xl font-light">
                {t.subtitle}
              </p>
            </div>
          </div>

          {/* MAIN TABS NAVIGATION */}
          <nav className="flex space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800 w-full md:w-auto">
            <button
              id="tab-home-btn"
              onClick={() => { setActiveTab("home"); setSuccessReportId(null); }}
              className={`flex-1 md:flex-initial px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                activeTab === "home"
                  ? "bg-amber-500 text-slate-950 shadow-lg"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Building className="w-4 h-4" />
              <span>{t.tabHome}</span>
            </button>
            <button
              id="tab-report-btn"
              onClick={() => { setActiveTab("report"); setSuccessReportId(null); }}
              className={`flex-1 md:flex-initial px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                activeTab === "report"
                  ? "bg-amber-500 text-slate-950 shadow-lg"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>{t.tabDenounce}</span>
            </button>
            <button
              id="tab-track-btn"
              onClick={() => { setActiveTab("track"); }}
              className={`flex-1 md:flex-initial px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                activeTab === "track"
                  ? "bg-amber-500 text-slate-950 shadow-lg"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Search className="w-4 h-4" />
              <span>{t.tabTrack}</span>
            </button>
          </nav>

        </div>
      </header>

      {/* CORE WRAPPER */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-8">

          {/* MAIN CONTENT WORKSPACE */}
          <div className="flex-grow min-w-0 space-y-8">

            {/* TAB 1: HOME PANEL */}
            {activeTab === "home" && (
              <div className="space-y-8 animate-fadeIn animate-duration-300" id="home-panel">
                
                {/* Urgent Official Warning */}
                <div className="bg-gradient-to-r from-red-950/40 to-slate-900 border border-red-500/30 rounded-2xl p-6 flex flex-col md:flex-row gap-5 items-start md:items-center">
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 self-start md:self-center">
                    <AlertTriangle className="w-8 h-8" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="text-base font-bold text-red-200 uppercase tracking-wide">
                      {t.warningTitle}
                    </h3>
                    <p className="text-sm text-slate-300 font-light leading-relaxed">
                      {t.warningText}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("report")}
                    className="w-full md:w-auto px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg text-xs uppercase tracking-wider transition-colors self-stretch md:self-auto text-center"
                  >
                    {t.warningBtn}
                  </button>
                </div>

                {/* Main informative grids */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Box 1: Why denounce / How it works */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
                      <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center space-x-2">
                        <ShieldCheck className="w-6 h-6 text-emerald-400" />
                        <span>{t.protocolTitle}</span>
                      </h2>
                      
                      <p className="text-slate-300 text-sm leading-relaxed font-light">
                        {t.protocolText}
                      </p>

                      {/* Flow Steps */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative group hover:border-slate-700 transition-colors">
                          <div className="text-xs font-bold text-amber-500 mb-2">{t.step1}</div>
                          <h4 className="text-sm font-bold text-white mb-1">{t.step1Title}</h4>
                          <p className="text-xs text-slate-400 font-light leading-relaxed">
                            {t.step1Desc}
                          </p>
                        </div>

                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative group hover:border-slate-700 transition-colors">
                          <div className="text-xs font-bold text-amber-500 mb-2">{t.step2}</div>
                          <h4 className="text-sm font-bold text-white mb-1">{t.step2Title}</h4>
                          <p className="text-xs text-slate-400 font-light leading-relaxed">
                            {t.step2Desc}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center space-x-3 text-xs text-slate-400">
                          <Users className="w-4 h-4 text-amber-500" />
                          <span><strong>1,200+</strong></span>
                        </div>
                        <button
                          onClick={() => setActiveTab("report")}
                          className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-xl text-sm hover:from-amber-400 hover:to-amber-500 transition-all shadow-md hover:shadow-amber-500/20 flex items-center justify-center space-x-2"
                        >
                          <span>{t.warningBtn}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>

                    </div>

                    {/* FAQ section */}
                    <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-4">
                      <h3 className="text-base font-bold text-white uppercase tracking-wider">{t.faqTitle}</h3>
                      
                      <div className="space-y-3">
                        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800/60">
                          <h5 className="text-sm font-semibold text-amber-400 mb-1">{t.faq1Q}</h5>
                          <p className="text-xs text-slate-300 font-light leading-relaxed">
                            {t.faq1A}
                          </p>
                        </div>

                        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800/60">
                          <h5 className="text-sm font-semibold text-amber-400 mb-1">{t.faq2Q}</h5>
                          <p className="text-xs text-slate-300 font-light leading-relaxed">
                            {t.faq2A}
                          </p>
                        </div>

                        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800/60">
                          <h5 className="text-sm font-semibold text-amber-400 mb-1">{t.faq3Q}</h5>
                          <p className="text-xs text-slate-300 font-light leading-relaxed">
                            {t.faq3A}
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Box 2: Right side / Stats widget & Fast tracking */}
                  <div className="space-y-6">
                    
                    {/* Status Quick Search widget */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none"></div>
                      
                      <h3 className="text-base font-bold text-white mb-2 flex items-center space-x-2">
                        <Search className="w-5 h-5 text-amber-500" />
                        <span>{t.quickTrackTitle}</span>
                      </h3>
                      <p className="text-xs text-slate-400 mb-4 font-light">
                        {t.quickTrackDesc}
                      </p>

                      <form onSubmit={(e) => { handleTrackReport(e); setActiveTab("track"); }} className="space-y-3">
                        <div>
                          <input
                            type="text"
                            placeholder={t.quickTrackPlaceholder}
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold py-2 rounded-lg text-xs tracking-wider uppercase transition-colors"
                        >
                          {t.quickTrackBtn}
                        </button>
                      </form>
                    </div>

                    {/* Military Operations Live Stats */}
                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">
                        {t.cellStatsTitle}
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-400">{t.stat1Label}</span>
                            <span className="text-emerald-400 font-bold">94.8%</span>
                          </div>
                          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: "94.8%" }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-400">{t.stat2Label}</span>
                            <span className="text-white font-bold">4.82M €</span>
                          </div>
                          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                            <div className="bg-amber-500 h-full rounded-full" style={{ width: "85%" }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-400">{t.stat3Label}</span>
                            <span className="text-rose-400 font-bold">342</span>
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>

              </div>
            )}

        {/* TAB 2: REPORT / DENOUNCE FORM */}
        {activeTab === "report" && (
          <div className="animate-fadeIn max-w-4xl mx-auto space-y-6" id="report-panel">
            
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center space-x-2">
                  <AlertTriangle className="w-6 h-6 text-amber-500" />
                  <span>{t.formTitle}</span>
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm font-light mt-1">
                  {t.formSubtitle}
                </p>
              </div>

              {submitError && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-xs sm:text-sm flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              <form onSubmit={handleSubmitReport} className="space-y-8 divide-y divide-slate-800">
                
                {/* SECTION 1: VICTIM INFORMATION */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{t.secVictim}</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {t.lblVictimName}
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Jean-Pierre Dupont"
                        value={victimName}
                        onChange={(e) => setVictimName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {t.lblVictimCountry}
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: France, Belgique, Canada, Suisse"
                        value={victimCountry}
                        onChange={(e) => setVictimCountry(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono">
                        {t.lblVictimPhone}
                      </label>
                      <input
                        type="tel"
                        placeholder=""
                        value={victimPhone}
                        onChange={(e) => setVictimPhone(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                      <p className="text-[10px] text-slate-500 mt-1">{t.lblVictimPhoneDesc}</p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {t.lblVictimEmail}
                      </label>
                      <input
                        type="email"
                        placeholder="Ex: jp.dupont@example.com"
                        value={victimEmail}
                        onChange={(e) => setVictimEmail(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                      <p className="text-[10px] text-slate-500 mt-1">{t.lblVictimEmailDesc}</p>
                    </div>
                  </div>
                </div>

                {/* SECTION 2: DETAILS OF SCAM / FRAUD */}
                <div className="space-y-4 pt-6">
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-2">
                    <DollarSign className="w-4 h-4" />
                    <span>{t.secScam}</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {t.lblScamCategory}
                      </label>
                      <select
                        value={scamCategory}
                        onChange={(e) => setScamCategory(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="Arnaque Sentimentale (Romance Scam)">{lang === "fr" ? "Arnaque Sentimentale (Romance Scam / Faux militaire / Médecin)" : "Romance Scam / Fake Soldier / Doctor"}</option>
                        <option value="Arnaque à l'Investissement (Crypto, Trading, Forex)">{lang === "fr" ? "Arnaque à l'Investissement (Crypto, Trading, Or, Forex)" : "Investment Scam (Crypto, Trading, Gold, Forex)"}</option>
                        <option value="Chantage Sexuel (Sextorsion)">{lang === "fr" ? "Chantage Sexuel (Sextorsion / Menaces)" : "Sextortion / Blackmail & Threat"}</option>
                        <option value="Arnaque aux Faux Frais et Prêts d'argent">{lang === "fr" ? "Arnaque aux Faux Frais de dossier, Prêts d'argent en ligne" : "Upfront Fee Scam / Online Loan Scam"}</option>
                        <option value="Usurpation d'identité d'avocats ou d'officiers">{lang === "fr" ? "Usurpation d'identité (Faux avocats de banque, Policiers)" : "Identity Theft (Fake lawyers, Banks, Police)"}</option>
                        <option value="Héritage Fictif ou Gains de loterie">{lang === "fr" ? "Héritage Fictif, Mandats Western Union suspectés" : "Inheritance / Lottery Scam"}</option>
                        <option value="Autre type de Cyber-fraude">{lang === "fr" ? "Autre Cyber-fraude" : "Other Cyber-fraud"}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {t.lblScamDate}
                      </label>
                      <input
                        type="date"
                        value={scamDate}
                        onChange={(e) => setScamDate(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {t.lblScamAmount}
                      </label>
                      <input
                        type="number"
                        placeholder="Ex: 12500"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {t.lblScamCurrency}
                      </label>
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="EUR">Euros (€)</option>
                        <option value="USD">Dollars US ($)</option>
                        <option value="CAD">Dollars Canadiens ($ CA)</option>
                        <option value="CHF">Francs Suisses (CHF)</option>
                        <option value="XOF">Francs CFA (XOF)</option>
                        <option value="USDT">USDT (Cryptomonnaie)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {t.lblScamUrgency}
                      </label>
                      <span className="inline-flex w-full items-center justify-center text-center px-3.5 py-2.5 rounded-lg text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        {t.lblScamUrgencyVal}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {t.lblScamDesc}
                    </label>
                    <textarea
                      rows={4}
                      placeholder={t.lblScamDescPlaceholder}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* SECTION 3: SUSPECT INFORMATION */}
                <div className="space-y-4 pt-6">
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-2">
                    <Target className="w-4 h-4 animate-pulse" />
                    <span>{t.secSuspect}</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {t.lblSuspectName}
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Franck Bernard, Dr James, Admin-Crypto-22"
                        value={suspectName}
                        onChange={(e) => setSuspectName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {t.lblSuspectPlatform}
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: WhatsApp, Telegram, Tinder, Site de trading frauduleux"
                        value={suspectPlatform}
                        onChange={(e) => setSuspectPlatform(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {t.lblSuspectPhone}
                      </label>
                      <input
                        type="text"
                        placeholder=""
                        value={suspectPhone}
                        onChange={(e) => setSuspectPhone(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        {t.lblSuspectEmail}
                      </label>
                      <input
                        type="email"
                        placeholder="Ex: suspect.email@gmail.com"
                        value={suspectEmail}
                        onChange={(e) => setSuspectEmail(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {t.lblSuspectAccounts}
                    </label>
                    <textarea
                      rows={2}
                      placeholder={t.lblSuspectAccountsPlaceholder}
                      value={suspectAccounts}
                      onChange={(e) => setSuspectAccounts(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* SECTION 4: FILE UPLOAD (PROOFS) */}
                <div className="space-y-4 pt-6">
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-2">
                    <Upload className="w-4 h-4" />
                    <span>{t.secProofs}</span>
                  </h3>

                  <div className="text-slate-400 text-xs font-light space-y-1">
                    <p>{t.lblProofsDesc}</p>
                    <p className="text-amber-500 font-semibold text-[11px] flex items-center gap-1 mt-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>
                        {lang === "fr" 
                          ? "Tout format d'image accepté (JPG, PNG, GIF, WEBP, etc.) • Jusqu'à 10 images • Max 25 Mo par image" 
                          : "Any image format accepted (JPG, PNG, GIF, WEBP, etc.) • Up to 10 images • Max 25 MB per image"}
                      </span>
                    </p>
                  </div>

                  <div className="border-2 border-dashed border-slate-800 hover:border-amber-500/50 rounded-2xl p-6 text-center transition-colors bg-slate-950/50 relative">
                    <input
                      type="file"
                      id="proof-files"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="proof-files" className="cursor-pointer space-y-3 block">
                      <div className="mx-auto w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-amber-400 border border-slate-800">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-slate-200 block">{t.proofsDropzone}</span>
                        <span className="text-xs text-slate-500">{t.proofsDropzoneSub}</span>
                      </div>
                      <span className="inline-block bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:bg-slate-800 transition-colors">
                        {t.proofsSelect}
                      </span>
                    </label>
                  </div>

                  {uploadError && (
                    <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3 rounded-xl text-xs flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                      <span>{uploadError}</span>
                    </div>
                  )}

                  {attachedFiles.length > 0 && (
                    <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {t.proofsReady} ({attachedFiles.length}) :
                      </div>
                      <div className="space-y-1 max-h-40 overflow-y-auto">
                        {attachedFiles.map((file, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs bg-slate-900/60 p-2 rounded border border-slate-800">
                            <span className="font-mono text-slate-300 truncate max-w-md">📄 {file.name}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-[10px] text-slate-500">({(file.size / 1024).toFixed(1)} KB)</span>
                              <button
                                type="button"
                                onClick={() => removeFile(idx)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* CONSENT & SUBMISSION */}
                <div className="pt-6 space-y-4">
                  <div className="flex items-start space-x-3 bg-amber-500/5 p-4 rounded-xl border border-amber-500/20 text-xs leading-relaxed text-slate-300 font-light">
                    <Shield className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>{t.secEngagement}</strong> {t.secEngagementText}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold py-4 rounded-xl text-sm sm:text-base tracking-wider uppercase transition-all shadow-lg hover:shadow-amber-500/10 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    id="submit-report-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                        <span>{t.btnSubmitSending}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>{t.btnSubmit}</span>
                      </>
                    )}
                  </button>
                </div>

              </form>

            </div>

          </div>
        )}

        {/* TAB 3: TRACK REPORT STATUS */}
        {activeTab === "track" && (
          <div className="animate-fadeIn max-w-4xl mx-auto space-y-6" id="track-panel">
            
            {/* SEARCH COMPONENT */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center space-x-2">
                  <Search className="w-6 h-6 text-amber-500" />
                  <span>{t.trackTitle}</span>
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm font-light mt-1">
                  {t.trackSubtitle}
                </p>
              </div>

              <form onSubmit={(e) => handleTrackReport(e)} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    required
                    placeholder={t.trackPlaceholder}
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-amber-500 font-mono tracking-wider"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSearching}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-55"
                >
                  {isSearching ? (
                    <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>{t.trackBtn}</span>
                    </>
                  )}
                </button>
              </form>

              {searchError && (
                <div className="bg-slate-950 border border-red-500/30 p-5 rounded-xl space-y-3">
                  <div className="flex items-center space-x-2 text-red-400">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold">{searchError}</span>
                  </div>
                  <div className="text-xs text-slate-400 font-light pl-7">
                    {t.trackAdvice}
                  </div>
                </div>
              )}
            </div>

            {/* SEACH RESULT CONTAINER */}
            {searchedReport ? (
              <div className="space-y-6">
                
                {/* STATUS BAR WITH BANNER */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
                  <div className="bg-gradient-to-r from-amber-500/20 to-slate-900/40 p-6 border-b border-slate-800 flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
                    <div>
                      <div className="text-xs font-mono text-slate-400">{t.trackDossier}</div>
                      <h3 className="text-lg sm:text-xl font-bold font-mono text-white mt-0.5">{searchedReport.id}</h3>
                      <p className="text-xs text-slate-400 font-light mt-1">{t.trackRegistered} {new Date(searchedReport.createdAt).toLocaleString(lang === "fr" ? "fr-FR" : "en-US")}</p>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-1.5">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider">{t.trackStatus}</span>
                      {searchedReport.status === "received" && (
                        <span className="bg-blue-500/10 text-blue-400 text-xs font-extrabold px-3.5 py-1.5 rounded-full border border-blue-500/20 flex items-center space-x-1.5">
                          <Clock className="w-3.5 h-3.5 animate-spin" />
                          <span>{lang === "fr" ? "Dossier Reçu et Enregistré" : (lang === "pt" ? "Dossiê Recebido" : lang === "it" ? "Fascicolo Ricevuto" : lang === "de" ? "Fall erhalten und registriert" : lang === "hu" ? "Ügy regisztrálva" : lang === "sk" ? "Prípad bol prijatý" : lang === "sl" ? "Primer prejet" : lang === "fi" ? "Asia vastaanotettu" : lang === "cz" ? "Případ přijat" : lang === "hr" ? "Predmet zaprimljen" : lang === "nl" ? "Dossier ontvangen" : "Case Received & Registered")}</span>
                        </span>
                      )}
                      {searchedReport.status === "analyzing" && (
                        <span className="bg-amber-500/10 text-amber-400 text-xs font-extrabold px-3.5 py-1.5 rounded-full border border-amber-500/20 flex items-center space-x-1.5">
                          <Search className="w-3.5 h-3.5 animate-pulse" />
                          <span>{lang === "fr" ? "Analyse Préliminaire Active" : (lang === "pt" ? "Análise Preliminar Ativa" : lang === "it" ? "Analisi Preliminare Attiva" : lang === "de" ? "Vorläufige Analyse Aktiv" : lang === "hu" ? "Előzetes elemzés aktív" : lang === "sk" ? "Predbežná analýza aktívna" : lang === "sl" ? "Preliminarna analiza aktivna" : lang === "fi" ? "Alkututkimus aktiivinen" : lang === "cz" ? "Předběžná analýza aktivní" : lang === "hr" ? "Preliminarna analiza aktivna" : lang === "nl" ? "Voorlopige analyse actief" : "Preliminary Analysis Active")}</span>
                        </span>
                      )}
                      {searchedReport.status === "investigation_launched" && (
                        <span className="bg-purple-500/10 text-purple-400 text-xs font-extrabold px-3.5 py-1.5 rounded-full border border-purple-500/20 flex items-center space-x-1.5">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>{lang === "fr" ? "Enquête Spéciale Ouverte" : (lang === "pt" ? "Inquérito Especial Aberto" : lang === "it" ? "Indagine Speciale Aperta" : lang === "de" ? "Sonderuntersuchung Eröffnet" : lang === "hu" ? "Különleges nyomozás" : lang === "sk" ? "Špeciálne vyšetrovanie" : lang === "sl" ? "Posebna preiskava" : lang === "fi" ? "Erityistutkinta" : lang === "cz" ? "Zvláštní vyšetřování" : lang === "hr" ? "Posebna istraga" : lang === "nl" ? "Speciaal onderzoek" : "Special Investigation Opened")}</span>
                        </span>
                      )}
                      {searchedReport.status === "active_tracking" && (
                        <span className="bg-indigo-500/10 text-indigo-400 text-xs font-extrabold px-3.5 py-1.5 rounded-full border border-indigo-500/20 flex items-center space-x-1.5">
                          <Target className="w-3.5 h-3.5 animate-pulse" />
                          <span>{lang === "fr" ? "Géolocalisation & Traçage Financier" : (lang === "pt" ? "Geolocalização" : lang === "it" ? "Geolocalizzazione" : lang === "de" ? "Geolokalisierung & Tracking" : lang === "hu" ? "Geolokalizáció" : lang === "sk" ? "Geolokácia" : lang === "sl" ? "Geolokalizacija" : lang === "fi" ? "Geolokaatio" : lang === "cz" ? "Geolokalizace" : lang === "hr" ? "Geolokalizacija" : lang === "nl" ? "Geolocatie" : "Geolocalization & Tracking")}</span>
                        </span>
                      )}
                      {searchedReport.status === "resolved" && (
                        <span className="bg-emerald-500/10 text-emerald-400 text-xs font-extrabold px-3.5 py-1.5 rounded-full border border-emerald-500/20 flex items-center space-x-1.5 animate-pulse">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{lang === "fr" ? "Succès - Restitution Prête" : (lang === "pt" ? "Sucesso - Reembolso Pronto" : lang === "it" ? "Rimborso Pronto" : lang === "de" ? "Rückerstattung bereit" : lang === "hu" ? "Visszatérítés kész" : lang === "sk" ? "Vrátenie pripravené" : lang === "sl" ? "Vračilo pripravljeno" : lang === "fi" ? "Palautus valmis" : lang === "cz" ? "Vrácení připraveno" : lang === "hr" ? "Povrat spreman" : lang === "nl" ? "Terugbetaling gereed" : "Success - Refund Ready")}</span>
                        </span>
                      )}
                    </div>
                  </div>



                  {/* ACTIVE TIMELINE */}
                  <div className="p-6 space-y-6">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.timelineTitle} :</h4>
                    
                    <div className="relative pl-6 border-l-2 border-slate-800 space-y-8">
                      {searchedReport.statusHistory.map((item, index) => {
                        const isLatest = index === 0;
                        const transItem = getTranslatedTimelineItem(item);
                        return (
                          <div key={index} className="relative group">
                            {/* Bullet dot */}
                            <div className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 bg-slate-950 transition-all ${
                              isLatest ? "border-amber-500 scale-125" : "border-slate-800"
                            }`}>
                              {isLatest && <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mx-auto mt-0.5 animate-ping"></div>}
                            </div>

                            {/* Info card */}
                            <div className={`p-4 rounded-xl border transition-all ${
                              isLatest ? "bg-slate-900/80 border-slate-800" : "bg-slate-950/40 border-slate-900/60"
                            }`}>
                              <div className="flex flex-col sm:flex-row justify-between gap-1 items-start sm:items-center">
                                <h5 className={`text-sm font-bold ${isLatest ? "text-amber-400" : "text-slate-400"}`}>
                                  {transItem.label}
                                </h5>
                                <span className="text-[10px] font-mono text-slate-500">{new Date(item.timestamp).toLocaleString(lang === "fr" ? "fr-FR" : "en-US")}</span>
                              </div>
                              <p className="text-xs text-slate-300 font-light mt-1.5 leading-relaxed">
                                {transItem.description}
                              </p>
                              
                              {/* Special Action Alert on Resolved */}
                              {item.status === "resolved" && (
                                <div className="mt-4 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl space-y-3">
                                  <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
                                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                                    <span>{curTxt.rembReady || "Refund available for"} {searchedReport.amount} {searchedReport.currency}</span>
                                  </div>
                                  <p className="text-[11px] text-slate-300 font-light leading-relaxed">
                                    {curTxt.fundsSecured || "The stolen funds have been secured on our military escrow account. The restitution order is ready. Contact our distribution unit."}
                                  </p>
                                  <div className="pt-1 flex items-center space-x-3">
                                    <button
                                      type="button"
                                      onClick={() => alert(curTxt.alertRequest || `Transfer request registered.`)}
                                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-[10px] uppercase tracking-wider transition-colors shadow"
                                    >
                                      {curTxt.demandTrans || "Request funds transfer"}
                                    </button>
                                    <span className="text-[10px] text-slate-400 font-mono">{curTxt.fees || "Fees: 0.00%"}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* DOSSIER RECAPITULATION GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Summary of Victim & Prejudicial details */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">{curTxt.dossierDetails || "Report & Victim Details"}</h4>
                    
                    <ul className="space-y-3 text-xs">
                      <li className="flex justify-between items-start">
                        <span className="text-slate-400">{curTxt.victimName || "Victim Name:"}</span>
                        <span className="text-white font-medium">{searchedReport.victimName}</span>
                      </li>
                      <li className="flex justify-between items-start">
                        <span className="text-slate-400">{curTxt.countryConcerned || "Country:"}</span>
                        <span className="text-white font-medium">{searchedReport.victimCountry}</span>
                      </li>
                      <li className="flex justify-between items-start">
                        <span className="text-slate-400 font-mono">{curTxt.phoneReg || "Phone:"}</span>
                        <span className="text-white font-mono">{searchedReport.victimPhone || curTxt.notComm || "Not communicated"}</span>
                      </li>
                      <li className="flex justify-between items-start">
                        <span className="text-slate-400">{curTxt.scamCat || "Scam category:"}</span>
                        <span className="text-amber-400 font-medium">{searchedReport.scamCategory}</span>
                      </li>
                      <li className="flex justify-between items-start">
                        <span className="text-slate-400">{curTxt.amtStolen || "Stolen amount:"}</span>
                        <span className="text-white font-bold">{searchedReport.amount} {searchedReport.currency}</span>
                      </li>
                      <li className="flex flex-col pt-1 border-t border-slate-800/40">
                        <span className="text-slate-400 mb-1">{curTxt.scamStory || "Sent Narrative:"}</span>
                        <p className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-300 leading-relaxed font-light text-[11px] max-h-32 overflow-y-auto">
                          {searchedReport.description}
                        </p>
                      </li>
                    </ul>
                  </div>

                  {/* Summary of Suspect info & files */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-2">{curTxt.suspectInfoTitle || "Suspect Information"}</h4>
                    
                    <ul className="space-y-3 text-xs">
                      <li className="flex justify-between items-start">
                        <span className="text-slate-400">{curTxt.susName || "Suspect Alias:"}</span>
                        <span className="text-rose-400 font-bold">{searchedReport.suspectName || curTxt.notSpec || "Not specified"}</span>
                      </li>
                      <li className="flex justify-between items-start">
                        <span className="text-slate-400">{curTxt.platformUsed || "Platform used:"}</span>
                        <span className="text-white font-medium">{searchedReport.suspectPlatform || curTxt.notSpec || "Not specified"}</span>
                      </li>
                      <li className="flex justify-between items-start font-mono">
                        <span className="text-slate-400">{curTxt.susPhone || "Suspect phone:"}</span>
                        <span className="text-white">{searchedReport.suspectPhone || curTxt.notSpec || "Not specified"}</span>
                      </li>
                      <li className="flex justify-between items-start">
                        <span className="text-slate-400">{curTxt.susEmail || "Suspected email:"}</span>
                        <span className="text-white font-medium">{searchedReport.suspectEmail || curTxt.notSpec || "Not specified"}</span>
                      </li>
                      <li className="flex flex-col pt-1 border-t border-slate-800/40">
                        <span className="text-slate-400 mb-1">{curTxt.susAccounts || "Suspect financial accounts:"}</span>
                        <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 whitespace-pre-wrap break-all max-h-24 overflow-y-auto">
                          {searchedReport.suspectAccounts || curTxt.noAccounts || "No account registered."}
                        </div>
                      </li>
                      <li className="flex justify-between items-center pt-2 border-t border-slate-800/40">
                        <span className="text-slate-400">{curTxt.proofsAttached || "Proofs attached:"}</span>
                        <span className="bg-slate-950 px-2.5 py-1 rounded text-[11px] font-bold text-slate-300">
                          {searchedReport.files.length} {curTxt.filesCount || "file(s)"}
                        </span>
                      </li>
                    </ul>
                  </div>

                </div>

              </div>
            ) : (
              <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-8 text-center space-y-3">
                <div className="mx-auto w-12 h-12 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-500">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">{curTxt.noReportMsg || "Waiting for case lookup"}</h4>
                  <p className="text-xs text-slate-400 font-light max-w-md mx-auto mt-1">
                    {curTxt.enterIdMsg || "Please enter your military case identifier above."}
                  </p>
                </div>
              </div>
            )}

          </div>
        )}

          </div>
        </div>
      </main>

      {/* INSTITUTIONAL FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-900 py-10 px-4 sm:px-6 lg:px-8 mt-12 text-slate-500 text-xs text-center space-y-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-amber-500/80" />
            <span className="font-bold text-slate-400 tracking-wide">{t.footerLine1}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-slate-400">
            <button 
              onClick={() => { setIsInfoOpen(true); setActiveInfoTab("legal"); }}
              className="hover:text-white transition-colors cursor-pointer text-xs font-normal"
            >
              {curTxt.legalMentions || "Mention Légale"}
            </button>
            <span>•</span>
            <button 
              onClick={() => { setIsInfoOpen(true); setActiveInfoTab("privacy"); }}
              className="hover:text-white transition-colors cursor-pointer text-xs font-normal"
            >
              {curTxt.dataProtection || "Protection des Données"}
            </button>
            <span>•</span>
            <button 
              onClick={() => { setIsInfoOpen(true); setActiveInfoTab("faq"); }}
              className="hover:text-white transition-colors cursor-pointer text-xs font-normal"
            >
              F.A.Q.
            </button>
            <span>•</span>
            <span className="text-slate-600 select-none">{curTxt.secAes || "Sécurisation AES-256"}</span>
            <span>•</span>
            <button 
              onClick={() => setIsContactOpen(true)}
              className="hover:text-amber-400 text-amber-500 font-bold transition-colors cursor-pointer flex items-center space-x-1"
            >
              <span>{curTxt.milAssistance || "Assistance Militaire"}</span>
            </button>
          </div>
        </div>
        <p className="max-w-4xl mx-auto leading-relaxed font-light text-slate-500 text-[10px]">
          {curTxt.footerNotice || t.footerLine2}
        </p>
        <div className="pt-2">
          <span className="bg-slate-900 px-3 py-1.5 rounded-full text-[10px] text-slate-400 font-medium inline-flex items-center">
            {curTxt.notifEncrypted || "🔒 Serveurs d'investigation officiels cryptés. Connexion sécurisée de bout en bout."}
          </span>
        </div>
      </footer>

      {/* CONTACT MODAL */}
      <AnimatePresence>
        {isContactOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl z-10 overflow-hidden"
            >
              {/* Top ambient light decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsContactOpen(false)}
                className="absolute top-4 right-4 p-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                  <Mail className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-wide">{t.contactTitle}</h3>
                  <p className="text-xs text-slate-400 font-light">{t.contactSubtitle}</p>
                </div>
              </div>

              <div className="h-[1px] bg-slate-800/60 my-4" />

              {/* Form */}
              <form onSubmit={(e) => { handleContactSubmit(e); }} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {t.contactName}
                  </label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Ex: John Doe"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 font-medium placeholder-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {t.contactEmail}
                  </label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="Ex: john@sec-mail.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 font-medium placeholder-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {t.contactSubject}
                  </label>
                  <input
                    type="text"
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    placeholder="Ex: Dossier MIL-..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 font-medium placeholder-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {t.contactMessage}
                  </label>
                  <textarea
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 font-light resize-none placeholder-slate-600"
                  ></textarea>
                </div>

                {contactStatus === "success" && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 text-xs text-emerald-400 leading-relaxed font-light">
                    {t.contactSuccess}
                  </div>
                )}

                {contactStatus === "error" && (
                  <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3 text-xs text-rose-400 leading-relaxed font-light">
                    {t.contactError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={contactStatus === "sending"}
                  className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/50 text-slate-950 font-extrabold py-2.5 px-4 rounded-lg text-xs tracking-wider uppercase transition-all duration-250 flex items-center justify-center space-x-2 shadow-md hover:shadow-amber-500/10 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{contactStatus === "sending" ? t.contactSending : t.contactSendBtn}</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* UNIFIED LEGAL, PRIVACY & FAQ INFO MODAL */}
      <AnimatePresence>
        {isInfoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsInfoOpen(false)}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl z-10 overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsInfoOpen(false)}
                className="absolute top-4 right-4 p-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer z-20"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title Header */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-slate-950 border border-slate-850 rounded-xl">
                  <Shield className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white tracking-wide uppercase">
                    {lang === "fr" ? "Centre d'Information Militaire & Légal" : "Military & Legal Information Center"}
                  </h2>
                  <p className="text-xs text-slate-400 font-light">
                    {lang === "fr" ? "Documents officiels, protection de la vie privée et questions fréquentes" : "Official documentation, privacy protection, and frequently asked questions"}
                  </p>
                </div>
              </div>

              {/* Interactive Tabs */}
              <div className="flex border-b border-slate-800/80 mb-6 pb-px overflow-x-auto gap-2">
                <button
                  onClick={() => setActiveInfoTab("legal")}
                  className={`px-4 py-2.5 rounded-t-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 flex items-center space-x-2 whitespace-nowrap ${
                    activeInfoTab === "legal"
                      ? "border-amber-500 text-amber-500 bg-amber-500/5 font-extrabold"
                      : "border-transparent text-slate-400 hover:text-white"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>{lang === "fr" ? "Mentions Légales" : "Legal Notice"}</span>
                </button>
                <button
                  onClick={() => setActiveInfoTab("privacy")}
                  className={`px-4 py-2.5 rounded-t-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 flex items-center space-x-2 whitespace-nowrap ${
                    activeInfoTab === "privacy"
                      ? "border-amber-500 text-amber-500 bg-amber-500/5 font-extrabold"
                      : "border-transparent text-slate-400 hover:text-white"
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>{lang === "fr" ? "Protection des Données" : "Data Protection"}</span>
                </button>
                <button
                  onClick={() => setActiveInfoTab("faq")}
                  className={`px-4 py-2.5 rounded-t-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 flex items-center space-x-2 whitespace-nowrap ${
                    activeInfoTab === "faq"
                      ? "border-amber-500 text-amber-500 bg-amber-500/5 font-extrabold"
                      : "border-transparent text-slate-400 hover:text-white"
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>{lang === "fr" ? "FAQ Complète" : "Full F.A.Q."}</span>
                </button>
              </div>

              {/* Scrollable Tab Content Container */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-4 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                
                {activeInfoTab === "legal" && (
                  <div className="space-y-4 animate-fadeIn animate-duration-200">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                      <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest">{lang === "fr" ? "1. ÉDITEUR DU PORTAIL" : "1. PORTAL PUBLISHER"}</h4>
                      <p>
                        {lang === "fr" 
                          ? "Ce portail d'investigations cyber-criminelles et d'assistance est édité par l'Unité Spéciale Conjointe Intergouvernementale de Recouvrement d'Actifs et d'Enquêtes Cyber-Militaires, agissant sous mandats militaires et de sécurité publique."
                          : "This cyber-criminal investigation and assistance portal is published by the Joint Intergovernmental Special Unit for Asset Recovery and Cyber-Military Investigations, acting under military and public safety warrants."}
                      </p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                      <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest">{lang === "fr" ? "2. HÉBERGEMENT HAUTEMENT SÉCURISÉ" : "2. HIGH-SECURITY HOSTING"}</h4>
                      <p>
                        {lang === "fr"
                          ? "L'hébergement de cette plateforme de signalement de haute sécurité est opéré sur des infrastructures militaires hautement sécurisées, utilisant des partitions de base de données cryptées avec l'algorithme de chiffrement souverain AES-256. Aucune donnée n'est accessible par les moteurs de recherche grand public."
                          : "The hosting of this high-security reporting platform is operated on highly secure military infrastructure, utilizing database partitions encrypted with the sovereign AES-256 encryption algorithm. No data is indexable or accessible by standard commercial search engines."}
                      </p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                      <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest">{lang === "fr" ? "3. CADRE JURIDIQUE ET MANDATS" : "3. LEGAL FRAMEWORK AND MANDATES"}</h4>
                      <p>
                        {lang === "fr"
                          ? "La cellule militaire spéciale intervient dans le cadre des protocoles de saisie financière d'actifs et de rapatriement d'avoirs dérobés à l'échelle internationale. Les actions coercitives (blocage de comptes bancaires, de portefeuilles de crypto-monnaies) sont exécutées sur base de requêtes de signalement authentifiées."
                          : "The special military unit operates within the framework of international asset seizure and restitution protocols. Coercive actions (freezing bank accounts, crypto wallets) are executed based on authenticated reporting queries."}
                      </p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                      <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest">{lang === "fr" ? "4. RESPONSABILITÉ ET EXCLUSION" : "4. LIABILITY AND DISCLAIMER"}</h4>
                      <p>
                        {lang === "fr"
                          ? "L'unité s'engage à employer tous les moyens de coercition financière et d'investigation tactique à sa disposition pour localiser et faire restituer les fonds volés. Cependant, la véracité des faits rapportés repose exclusivement sur la bonne foi du requérant. Toute dénonciation volontairement abusive est passible de sanctions pénales."
                          : "The unit is committed to using all financial coercion and tactical investigation means available to locate and return stolen funds. However, the accuracy of reported details relies on the petitioner's good faith. Any intentionally abusive or fraudulent reporting is punishable by law."}
                      </p>
                    </div>
                  </div>
                )}

                {activeInfoTab === "privacy" && (
                  <div className="space-y-4 animate-fadeIn animate-duration-200">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                        <Lock className="w-4 h-4" />
                        <span>{lang === "fr" ? "Données Protégées par Secret Défense" : "Data Protected by National Defense Secrets"}</span>
                      </div>
                      <p>
                        {lang === "fr"
                          ? "Chaque signalement, pièce d'identité, reçu ou capture d'écran transmis sur notre portail fait l'objet d'un chiffrement militaire immédiat à la source. Vos informations ne sont jamais divulguées aux suspects ciblés par les investigations."
                          : "Every report, ID proof, receipt, or screenshot transmitted on our portal is immediately encrypted at source with military grade algorithms. Your information is never disclosed to the suspects targeted by the investigations."}
                      </p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                      <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest">{lang === "fr" ? "1. CONFORMITÉ RGPD ET SÉCURITÉ" : "1. GDPR COMPLIANCE AND SECURITY"}</h4>
                      <p>
                        {lang === "fr"
                          ? "Bien qu'agissant sous mandat de sécurité souveraine, notre portail s'engage à respecter les principes directeurs de protection des données (RGPD). Vous disposez d'un droit permanent d'accès, d'édition et de retrait de vos pièces justificatives en transmettant votre numéro de dossier à l'officier de liaison via le formulaire de contact haut-gauche."
                          : "Although operating under sovereign security warrants, our portal strictly adheres to general data protection guidelines (GDPR). You possess a permanent right of access, amendment, and deletion of your files by contacting your liaison officer via the top-left contact form."}
                      </p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                      <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest">{lang === "fr" ? "2. ENREGISTREMENT TEMPORAIRE DES CONNEXIONS" : "2. TEMPORARY LOGGING OF CONNECTIONS"}</h4>
                      <p>
                        {lang === "fr"
                          ? "Afin d'éviter les requêtes malveillantes et de prémunir le serveur contre toute tentative de déni de service (DDoS), l'adresse IP et les métadonnées de connexion des requérants sont stockées de façon chiffrée pour une durée glissante de 90 jours maximum, avant purge totale définitive."
                          : "To mitigate malicious queries and safeguard our servers against denial of service (DDoS) attempts, IP addresses and connection metadata of applicants are stored in an encrypted state for a rolling duration of 90 days maximum, prior to permanent purge."}
                      </p>
                    </div>
                  </div>
                )}

                {activeInfoTab === "faq" && (
                  <div className="space-y-3 animate-fadeIn animate-duration-200">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                      <h4 className="text-xs font-bold text-amber-400 mb-1.5">
                        {lang === "fr" ? "Q1 : Qui opère réellement ce portail de signalement ?" : "Q1: Who actually operates this reporting portal?"}
                      </h4>
                      <p className="text-slate-300 text-xs">
                        {lang === "fr"
                          ? "Le portail est cogéré par une cellule intergouvernementale cyber-militaire d'investigation financière et de recouvrement d'actifs d'escroqueries numériques, travaillant en étroite collaboration avec les institutions bancaires internationales."
                          : "The portal is co-managed by an intergovernmental military-cyber financial investigation and asset recovery cell, working in direct coordination with international banking institutions."}
                      </p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                      <h4 className="text-xs font-bold text-amber-400 mb-1.5">
                        {lang === "fr" ? "Q2 : Quels sont les délais d'analyse et de gel des avoirs ?" : "Q2: What is the timeframe for investigation and freezing?"}
                      </h4>
                      <p className="text-slate-300 text-xs">
                        {lang === "fr"
                          ? "Dès la réception du signalement avec les justificatifs des transferts, les coordonnées bancaires ou de mobile money du suspect sont transmises aux banques affiliées sous 24h pour une saisie conservatoire immédiate."
                          : "Upon receipt of your report accompanied by proof of transfer, the bank accounts or mobile money details of the suspect are routed to partner banking institutions within 24 hours for immediate precautionary freeze."}
                      </p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                      <h4 className="text-xs font-bold text-amber-400 mb-1.5">
                        {lang === "fr" ? "Q3 : Comment suis-je notifié de la restitution ?" : "Q3: How am I notified of the restitution?"}
                      </h4>
                      <p className="text-slate-300 text-xs">
                        {lang === "fr"
                          ? "Votre officier de liaison militaire prendra contact direct avec vous via vos coordonnées (E-mail ou WhatsApp de préférence) sous 24h à 48h. Une fois le recouvrement validé, un virement bancaire officiel est organisé vers votre compte."
                          : "Your military liaison officer will make direct contact with you (preferably via Email or WhatsApp) within 24 to 48 hours. Once the recovery is validated, an official wire transfer is scheduled back to your account."}
                      </p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                      <h4 className="text-xs font-bold text-amber-400 mb-1.5">
                        {lang === "fr" ? "Q4 : Puis-je faire une dénonciation anonyme ?" : "Q4: Can I file an anonymous report?"}
                      </h4>
                      <p className="text-slate-300 text-xs">
                        {lang === "fr"
                          ? "Oui. Bien que les détails de contact du requérant soient nécessaires pour organiser le rapatriement des fonds à votre attention, l'enquête à l'encontre du suspect se fait de manière anonymisée. Le suspect n'aura jamais connaissance de votre identity."
                          : "Yes. Although your contact details are required in order to wire the recovered funds back to you, the investigation against the suspect is carried out with absolute anonymity. The target will never see your details."}
                      </p>
                    </div>
                  </div>
                )}

              </div>

              {/* Modal Footer */}
              <div className="h-[1px] bg-slate-800/60 my-4" />
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                <span>SYSTEM-REF: INFO-CENTER-MILSURV</span>
                <button
                  type="button"
                  onClick={() => setIsInfoOpen(false)}
                  className="bg-slate-950 hover:bg-slate-850 border border-slate-850 text-slate-300 px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors uppercase tracking-wider"
                >
                  {lang === "fr" ? "Fermer" : "Close"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
