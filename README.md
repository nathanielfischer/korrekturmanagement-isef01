# IU Korrekturmanagement System

Ein Protyp eines modernen Next.js-basierten Korrekturmanagement-Systems für die Verwaltung von Fehlermeldungen und Verbesserungsvorschlägen in Lernmaterialien.

## Inhaltsverzeichnis

- [Überblick](#überblick)
- [Technologie-Stack](#technologie-stack)
- [Anwendung](#verwendung)
- [Projektstruktur](#projektstruktur)

## Überblick

Das IU Korrekturmanagement System ist ein Prototyp für die Verwaltung von Korrekturen, Ergänzungen und Verbesserungsvorschlägen in Lernmaterialien. Es ermöglicht Benutzern das Melden von Fehlern, das Verfolgen des Bearbeitungsstatus und die effiziente Verwaltung durch die Zuweisung an eine verantwortlichen Person.

### Features

Benutzer können:

- ✅ Sich registrieren und anmelden
- ✅ Neue Fehlermeldungen erstellen mit detaillierten Kategorien
- ✅ Meldungen nach Status, Typ, Fach und Modul filtern
- ✅ Den Bearbeitungsstatus von Meldungen verfolgen
- ✅ Detailansichten einzelner Meldungen einsehen
- ✅ Den Status von Meldungen aktualisieren

### Demo

Dies ist ein Studentenprojekt und ein inoffizieller Prototyp - keine offizielle IU-Anwendung.

## Technologie-Stack

- **Framework:** Next.js 15 mit App Router
- **Styling:** Tailwind CSS 4
- **Authentifizierung:** NextAuth.js 5.0
- **Datenbank:** Neon PostgreSQL
- **Icons:** Heroicons
- **Deployment:** Vercel

## Anwendung

Die Anwendung ist unter [https://korrekturmanagement-isef01.vercel.app/](https://korrekturmanagement-isef01.vercel.app/) verfügbar.

### Authentifizierung

Das System verwendet NextAuth.js für die Benutzerauthentifizierung mit einem Credentials Provider. Benutzer können sich registrieren und anmelden.

### Meldungen erstellen

1. Nach der Anmeldung auf "Neue Meldung" klicken
2. Titel und Beschreibung eingeben
3. Fach, Modul, Quelle und Typ auswählen
4. Meldung speichern

### Übersicht & Filtermöglichkeiten

Das Dashboard bietet umfangreiche Filteroptionen:
- **Status:** Offen, In Bearbeitung, Erledigt, Abgelehnt
- **Typ:** Ergänzung, Fehler, Verbesserungsvorschlag
- **Fach:** Dynamisch aus der Datenbank geladen
- **Modul:** Abhängig vom gewählten Fach bzw. alle Module, falls kein Fach ausgewählt

### Status ändern

Auf eine Meldung klicken und auf der Detailseite den Status entsprechend ändern.

## Projektstruktur

```
├── app/
│   ├── auth/                # Authentifizierungsseiten
│   ├── dashboard/           # Hauptanwendung
│   │   ├── meldung/[id]/    # Detailansicht einzelner Meldungen
│   │   └── neue-meldung/    # Formular für neue Meldungen
│   ├── lib/                 # Utility-Funktionen und Server Actions
│   │   ├── actions.js       # Server Actions
│   │   ├── database.js      # Datenbankabfragen
│   │   └── helper.js        # Helper-Funktionen
│   └── ui/                  # Wiederverwendbare UI-Komponenten
├── public/                  # Statische Assets
├── auth.config.js           # NextAuth Konfiguration
├── auth.js                  # NextAuth Setup
├── middleware.js            # Route Protection
└── next.config.js           # Next.js Konfiguration
```

---

**Hinweis:** Dies ist ein Studenten-Projekt und keine offizielle IU-Anwendung.