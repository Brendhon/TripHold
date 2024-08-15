import { Trip } from "@app/models";

export const MockTrips: Trip[] = [
  {
    id: "sdasdasdasdasd",
    country: {
      "name": "Belize",
      "key": "BZ",
      "flag": "https://flagcdn.com/bz.svg",
      "codes": [
        "BZ",
        "BLZ",
        "BIZ",
        "084"
      ],
      "capital": "Belmopan",
      "carSide": Side.Right,
      "currencies": [
        "BZD"
      ],
      "languages": [
        "Belizean Creole",
        "English",
        "Spanish"
      ],
      "population": 397621,
      "timezones": [
        "UTC-06:00"
      ],
      "namesIntl": {
        "en": "Belize",
        "pt": "Belize",
        "es": "Belice"
      }
    },
    endDate: new Date(),
    startDate: new Date(),
  },
  {
    id: "dkmflskdmflskdf",
    country: {
      "name": "Grenada",
      "key": "GD",
      "flag": "https://flagcdn.com/gd.svg",
      "codes": [
        "GD",
        "GRD",
        "GRN",
        "308"
      ],
      "capital": "St. George's",
      "carSide": Side.Left,
      "currencies": [
        "XCD"
      ],
      "languages": [
        "English"
      ],
      "population": 112519,
      "timezones": [
        "UTC-04:00"
      ],
      "namesIntl": {
        "en": "Grenada",
        "pt": "Granada",
        "es": "Grenada"
      }
    },
    endDate: new Date(),
    startDate: new Date(),
  },
  {
    id: "dsfasfsdf",
    country: {
      "name": "Brazil",
      "key": "BR",
      "flag": "https://flagcdn.com/br.svg",
      "codes": [
        "BR",
        "BRA",
        "BRA",
        "076"
      ],
      "capital": "Brasília",
      "carSide": Side.Right,
      "currencies": [
        "BRL"
      ],
      "languages": [
        "Portuguese"
      ],
      "population": 212559409,
      "timezones": [
        "UTC-05:00",
        "UTC-04:00",
        "UTC-03:00",
        "UTC-02:00"
      ],
      "namesIntl": {
        "en": "Brazil",
        "pt": "Brasil",
        "es": "Brasil"
      }
    },
    endDate: new Date(),
    startDate: new Date(),
  },
]