import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

/**
 # YYYYMMDD = Datum (YYYY=jaar MM=maand DD=dag);
 # DDVEC    = Vectorgemiddelde windrichting in graden (360=noord, 90=oost, 180=zuid, 270=west, 0=windstil/variabel). Zie http://www.knmi.nl/kennis-en-datacentrum/achtergrond/klimatologische-brochures-en-boeken;
 # FHVEC    = Vectorgemiddelde windsnelheid (in 0.1 m/s). Zie http://www.knmi.nl/kennis-en-datacentrum/achtergrond/klimatologische-brochures-en-boeken;
 # FG       = Etmaalgemiddelde windsnelheid (in 0.1 m/s);
 # FHX      = Hoogste uurgemiddelde windsnelheid (in 0.1 m/s);
 # FHXH     = Uurvak waarin FHX is gemeten;
 # FHN      = Laagste uurgemiddelde windsnelheid (in 0.1 m/s);
 # FHNH     = Uurvak waarin FHN is gemeten;
 # FXX      = Hoogste windstoot (in 0.1 m/s);
 # FXXH     = Uurvak waarin FXX is gemeten;
 # TG       = Etmaalgemiddelde temperatuur (in 0.1 graden Celsius);
 # TN       = Minimum temperatuur (in 0.1 graden Celsius);
 # TNH      = Uurvak waarin TN is gemeten;
 # TX       = Maximum temperatuur (in 0.1 graden Celsius);
 # TXH      = Uurvak waarin TX is gemeten;
 # T10N     = Minimum temperatuur op 10 cm hoogte (in 0.1 graden Celsius);
 # T10NH    = 6-uurs tijdvak waarin T10N is gemeten; 6=0-6 UT, 12=6-12 UT, 18=12-18 UT, 24=18-24 UT
 # SQ       = Zonneschijnduur (in 0.1 uur) berekend uit de globale straling (-1 voor <0.05 uur);
 # SP       = Percentage van de langst mogelijke zonneschijnduur;
 # Q        = Globale straling (in J/cm2);
 # DR       = Duur van de neerslag (in 0.1 uur);
 # RH       = Etmaalsom van de neerslag (in 0.1 mm) (-1 voor <0.05 mm);
 # RHX      = Hoogste uursom van de neerslag (in 0.1 mm) (-1 voor <0.05 mm);
 # RHXH     = Uurvak waarin RHX is gemeten;
 # PG       = Etmaalgemiddelde luchtdruk herleid tot zeeniveau (in 0.1 hPa) berekend uit 24 uurwaarden;
 # PX       = Hoogste uurwaarde van de luchtdruk herleid tot zeeniveau (in 0.1 hPa);
 # PXH      = Uurvak waarin PX is gemeten;
 # PN       = Laagste uurwaarde van de luchtdruk herleid tot zeeniveau (in 0.1 hPa);
 # PNH      = Uurvak waarin PN is gemeten;
 # VVN      = Minimum opgetreden zicht; 0: <100 m, 1:100-200 m, 2:200-300 m,..., 49:4900-5000 m, 50:5-6 km, 56:6-7 km, 57:7-8 km,..., 79:29-30 km, 80:30-35 km, 81:35-40 km,..., 89: >70 km)
 # VVNH     = Uurvak waarin VVN is gemeten;
 # VVX      = Maximum opgetreden zicht; 0: <100 m, 1:100-200 m, 2:200-300 m,..., 49:4900-5000 m, 50:5-6 km, 56:6-7 km, 57:7-8 km,..., 79:29-30 km, 80:30-35 km, 81:35-40 km,..., 89: >70 km)
 # VVXH     = Uurvak waarin VVX is gemeten;
 # NG       = Etmaalgemiddelde bewolking (bedekkingsgraad van de bovenlucht in achtsten, 9=bovenlucht onzichtbaar);
 # UG       = Etmaalgemiddelde relatieve vochtigheid (in procenten);
 # UX       = Maximale relatieve vochtigheid (in procenten);
 # UXH      = Uurvak waarin UX is gemeten;
 # UN       = Minimale relatieve vochtigheid (in procenten);
 # UNH      = Uurvak waarin UN is gemeten;
 # EV24     = Referentiegewasverdamping (Makkink) (in 0.1 mm);

 */


@Injectable({
    providedIn: 'root'
})
export class MockService {

    public measurementData = [
        {
            "stn": "240",
            "yyyymmdd": "20200108",
            "ddvec": "",
            "fhvec": "",
            "fg": "63",
            "fhx": "",
            "fhxh": "",
            "fnh": "",
            "fhnh": "",
            "fxx": "",
            "fxxh": "",
            "tg": "104",
            "tn": "84",
            "tnh": "1",
            "tx": "122",
            "txh": "12",
            "t10n": "81",
            "t10nh": "6",
            "sq": "",
            "sp": "",
            "q": "",
            "dr": "",
            "rh": "",
            "rhx": "",
            "rhxh": "",
            "pg": "10207",
            "px": "",
            "pxh": "",
            "pn": "",
            "pnh": "",
            "vvn": "",
            "vvnh": "",
            "vvx": "",
            "vvxh": "",
            "ng": "8",
            "ug": "94",
            "ux": "",
            "uxh": "",
            "un": "",
            "unh": "",
            "ev24": "",
            "measurementid": "117547",
            "id": "602a8b126a7a90cd957cd0af"
        },
        {
            "stn": "240",
            "yyyymmdd": "20200107",
            "ddvec": "201",
            "fhvec": "59",
            "fg": "63",
            "fhx": "100",
            "fhxh": "24",
            "fnh": "40",
            "fhnh": "3",
            "fxx": "150",
            "fxxh": "24",
            "tg": "68",
            "tn": "29",
            "tnh": "8",
            "tx": "84",
            "txh": "24",
            "t10n": "17",
            "t10nh": "12",
            "sq": "31",
            "sp": "39",
            "q": "271",
            "dr": "3",
            "rh": "1",
            "rhx": "1",
            "rhxh": "18",
            "pg": "10230",
            "px": "10255",
            "pxh": "10",
            "pn": "10196",
            "pnh": "24",
            "vvn": "36",
            "vvnh": "22",
            "vvx": "65",
            "vvxh": "21",
            "ng": "5",
            "ug": "92",
            "ux": "97",
            "uxh": "8",
            "un": "85",
            "unh": "21",
            "ev24": "4",
            "measurementid": "117546",
            "id": "602a8b126a7a90cd957cd0fa"
        },
        {
            "stn": "240",
            "yyyymmdd": "20200106",
            "ddvec": "197",
            "fhvec": "54",
            "fg": "57",
            "fhx": "80",
            "fhxh": "11",
            "fnh": "30",
            "fhnh": "20",
            "fxx": "120",
            "fxxh": "11",
            "tg": "60",
            "tn": "33",
            "tnh": "19",
            "tx": "72",
            "txh": "12",
            "t10n": "22",
            "t10nh": "24",
            "sq": "32",
            "sp": "41",
            "q": "246",
            "dr": "10",
            "rh": "7",
            "rhx": "6",
            "rhxh": "23",
            "pg": "10233",
            "px": "10291",
            "pxh": "1",
            "pn": "10185",
            "pnh": "18",
            "vvn": "50",
            "vvnh": "23",
            "vvx": "75",
            "vvxh": "10",
            "ng": "7",
            "ug": "85",
            "ux": "95",
            "uxh": "23",
            "un": "72",
            "unh": "12",
            "ev24": "3",
            "measurementid": "117545",
            "id": "602a8b126a7a90cd957cd132"
        },
        {
            "stn": "240",
            "yyyymmdd": "20200105",
            "ddvec": "214",
            "fhvec": "46",
            "fg": "47",
            "fhx": "60",
            "fhxh": "15",
            "fnh": "30",
            "fhnh": "1",
            "fxx": "100",
            "fxxh": "16",
            "tg": "70",
            "tn": "62",
            "tnh": "17",
            "tx": "78",
            "txh": "11",
            "t10n": "59",
            "t10nh": "18",
            "sq": "0",
            "sp": "0",
            "q": "77",
            "dr": "0",
            "rh": "-1",
            "rhx": "-1",
            "rhxh": "1",
            "pg": "10325",
            "px": "10339",
            "pxh": "3",
            "pn": "10299",
            "pnh": "24",
            "vvn": "58",
            "vvnh": "16",
            "vvx": "70",
            "vvxh": "11",
            "ng": "8",
            "ug": "90",
            "ux": "95",
            "uxh": "2",
            "un": "81",
            "unh": "14",
            "ev24": "1",
            "measurementid": "117544",
            "id": "602a8b126a7a90cd957cd156"
        },
        {
            "stn": "240",
            "yyyymmdd": "20200104",
            "ddvec": "279",
            "fhvec": "60",
            "fg": "62",
            "fhx": "90",
            "fhxh": "11",
            "fnh": "20",
            "fhnh": "22",
            "fxx": "130",
            "fxxh": "9",
            "tg": "73",
            "tn": "53",
            "tnh": "4",
            "tx": "84",
            "txh": "14",
            "t10n": "43",
            "t10nh": "6",
            "sq": "3",
            "sp": "4",
            "q": "121",
            "dr": "25",
            "rh": "8",
            "rhx": "4",
            "rhxh": "21",
            "pg": "10295",
            "px": "10334",
            "pxh": "24",
            "pn": "10273",
            "pnh": "2",
            "vvn": "31",
            "vvnh": "20",
            "vvx": "65",
            "vvxh": "8",
            "ng": "8",
            "ug": "88",
            "ux": "97",
            "uxh": "20",
            "un": "83",
            "unh": "10",
            "ev24": "2",
            "measurementid": "117543",
            "id": "602a8b126a7a90cd957cd182"
        },
        {
            "stn": "240",
            "yyyymmdd": "20200103",
            "ddvec": "249",
            "fhvec": "48",
            "fg": "69",
            "fhx": "100",
            "fhxh": "11",
            "fnh": "30",
            "fhnh": "19",
            "fxx": "180",
            "fxxh": "11",
            "tg": "76",
            "tn": "42",
            "tnh": "21",
            "tx": "105",
            "txh": "11",
            "t10n": "23",
            "t10nh": "24",
            "sq": "0",
            "sp": "0",
            "q": "84",
            "dr": "56",
            "rh": "26",
            "rhx": "6",
            "rhxh": "13",
            "pg": "10184",
            "px": "10273",
            "pxh": "23",
            "pn": "10130",
            "pnh": "11",
            "vvn": "27",
            "vvnh": "12",
            "vvx": "70",
            "vvxh": "7",
            "ng": "7",
            "ug": "88",
            "ux": "96",
            "uxh": "12",
            "un": "76",
            "unh": "17",
            "ev24": "1",
            "measurementid": "117542",
            "id": "602a8b126a7a90cd957cd1a1"
        },
        {
            "stn": "240",
            "yyyymmdd": "20200102",
            "ddvec": "186",
            "fhvec": "55",
            "fg": "56",
            "fhx": "80",
            "fhxh": "24",
            "fnh": "40",
            "fhnh": "2",
            "fxx": "110",
            "fxxh": "23",
            "tg": "42",
            "tn": "14",
            "tnh": "2",
            "tx": "79",
            "txh": "24",
            "t10n": "14",
            "t10nh": "6",
            "sq": "0",
            "sp": "0",
            "q": "66",
            "dr": "0",
            "rh": "0",
            "rhx": "0",
            "rhxh": "1",
            "pg": "10230",
            "px": "10283",
            "pxh": "1",
            "pn": "10168",
            "pnh": "24",
            "vvn": "5",
            "vvnh": "1",
            "vvx": "64",
            "vvxh": "23",
            "ng": "8",
            "ug": "95",
            "ux": "98",
            "uxh": "1",
            "un": "88",
            "unh": "23",
            "ev24": "1",
            "measurementid": "117541",
            "id": "602a8b126a7a90cd957cd1da"
        },
        {
            "stn": "240",
            "yyyymmdd": "20200101",
            "ddvec": "174",
            "fhvec": "33",
            "fg": "38",
            "fhx": "50",
            "fhxh": "22",
            "fnh": "20",
            "fhnh": "1",
            "fxx": "70",
            "fxxh": "2",
            "tg": "19",
            "tn": "0",
            "tnh": "10",
            "tx": "31",
            "txh": "1",
            "t10n": "2",
            "t10nh": "12",
            "sq": "0",
            "sp": "0",
            "q": "80",
            "dr": "0",
            "rh": "0",
            "rhx": "0",
            "rhxh": "1",
            "pg": "10315",
            "px": "10342",
            "pxh": "1",
            "pn": "10288",
            "pnh": "24",
            "vvn": "2",
            "vvnh": "2",
            "vvx": "46",
            "vvxh": "21",
            "ng": "8",
            "ug": "96",
            "ux": "98",
            "uxh": "1",
            "un": "91",
            "unh": "21",
            "ev24": "1",
            "measurementid": "117540",
            "id": "602a8b126a7a90cd957cd218"
        },
        {
            "stn": "240",
            "yyyymmdd": "20191231",
            "ddvec": "67",
            "fhvec": "11",
            "fg": "23",
            "fhx": "40",
            "fhxh": "23",
            "fnh": "10",
            "fhnh": "10",
            "fxx": "70",
            "fxxh": "24",
            "tg": "52",
            "tn": "1",
            "tnh": "19",
            "tx": "88",
            "txh": "13",
            "t10n": "-21",
            "t10nh": "24",
            "sq": "53",
            "sp": "68",
            "q": "351",
            "dr": "0",
            "rh": "0",
            "rhx": "0",
            "rhxh": "1",
            "pg": "10336",
            "px": "10359",
            "pxh": "19",
            "pn": "10285",
            "pnh": "1",
            "vvn": "0",
            "vvnh": "19",
            "vvx": "67",
            "vvxh": "14",
            "ng": "8",
            "ug": "92",
            "ux": "99",
            "uxh": "21",
            "un": "74",
            "unh": "13",
            "ev24": "4",
            "measurementid": "117539",
            "id": "602a8b126a7a90cd957cd22c"
        },
        {
            "stn": "240",
            "yyyymmdd": "20191230",
            "ddvec": "211",
            "fhvec": "44",
            "fg": "48",
            "fhx": "60",
            "fhxh": "11",
            "fnh": "20",
            "fhnh": "24",
            "fxx": "90",
            "fxxh": "12",
            "tg": "45",
            "tn": "13",
            "tnh": "2",
            "tx": "72",
            "txh": "13",
            "t10n": "1",
            "t10nh": "6",
            "sq": "55",
            "sp": "71",
            "q": "375",
            "dr": "0",
            "rh": "0",
            "rhx": "0",
            "rhxh": "1",
            "pg": "10285",
            "px": "10317",
            "pxh": "1",
            "pn": "10264",
            "pnh": "17",
            "vvn": "58",
            "vvnh": "21",
            "vvx": "80",
            "vvxh": "4",
            "ng": "3",
            "ug": "75",
            "ux": "96",
            "uxh": "23",
            "un": "63",
            "unh": "12",
            "ev24": "5",
            "measurementid": "117538",
            "id": "602a8b126a7a90cd957cd252"
        }
    ];

    public stationData = [
        {
            "stn": 209,
            "lon": 4.518,
            "lat": 52.465,
            "alt": 0,
            "name": "IJMOND",
            "id": "602a620b64377485fb78f720"
        },
        {
            "stn": 215,
            "lon": 4.437,
            "lat": 52.141,
            "alt": -1.1,
            "name": "VOORSCHOTEN",
            "id": "602a620b64377485fb78f721"
        },
        {
            "stn": 240,
            "lon": 4.79,
            "lat": 52.318,
            "alt": -3.3,
            "name": "SCHIPHOL",
            "id": "602a620b64377485fb78f722"
        },
        {
            "stn": 242,
            "lon": 4.921,
            "lat": 53.241,
            "alt": 10.8,
            "name": "VLIELAND",
            "id": "602a620b64377485fb78f723"
        },
        {
            "stn": 248,
            "lon": 5.174,
            "lat": 52.634,
            "alt": 0.8,
            "name": "WIJDENES",
            "id": "602a620b64377485fb78f724"
        },
        {
            "stn": 225,
            "lon": 4.555,
            "lat": 52.463,
            "alt": 4.4,
            "name": "IJMUIDEN",
            "id": "602a620b64377485fb78f725"
        },
        {
            "stn": 249,
            "lon": 4.979,
            "lat": 52.644,
            "alt": -2.4,
            "name": "BERKHOUT",
            "id": "602a620b64377485fb78f726"
        },
        {
            "stn": 210,
            "lon": 4.43,
            "lat": 52.171,
            "alt": -0.2,
            "name": "VALKENBURG",
            "id": "602a620b64377485fb78f727"
        },
        {
            "stn": 235,
            "lon": 4.781,
            "lat": 52.928,
            "alt": 1.2,
            "name": "DEKOOY",
            "id": "602a620b64377485fb78f728"
        },
        {
            "stn": 260,
            "lon": 5.18,
            "lat": 52.1,
            "alt": 1.9,
            "name": "DEBILT",
            "id": "602a620b64377485fb78f729"
        },
        {
            "stn": 257,
            "lon": 4.603,
            "lat": 52.506,
            "alt": 8.5,
            "name": "WIJKAANZEE",
            "id": "602a620b64377485fb78f72a"
        },
        {
            "stn": 267,
            "lon": 5.384,
            "lat": 52.898,
            "alt": -1.3,
            "name": "STAVOREN",
            "id": "602a620b64377485fb78f72b"
        },
        {
            "stn": 269,
            "lon": 5.52,
            "lat": 52.458,
            "alt": -3.7,
            "name": "LELYSTAD",
            "id": "602a620b64377485fb78f72c"
        },
        {
            "stn": 265,
            "lon": 5.274,
            "lat": 52.13,
            "alt": 13.9,
            "name": "SOESTERBERG",
            "id": "602a620b64377485fb78f72d"
        }
        ];

    public cities  = {
        "cities": [
            "Haarlem",
            "Amsterdam"
        ]
    };
    public stations = {
        "stations": ["240"]
    };

    public user = {
        "cities": [],
        "stations": [
            "240"
        ],
        "email": "test@test.com",
        "id": "602a8d267029ef001ad0f123"
    };

    constructor() {
    }





}