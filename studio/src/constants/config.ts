import { i_Color } from "../components/colorBox";

export const effects = [
    {
      name: 'Snow on Blue',
      id: 'A',
      speed: 100,
      loop: 1,
    },
    {
      name: 'One By One',
      id: 'B',
      speed: 100,
      loop: 1,
    },
    {
      name: 'Random (Multiple)',
      id: 'C',
      speed: 100,
      loop: 1,
    },
    {
      name: 'Shutter',
      id: 'D',
      speed: 100,
      loop: 1,
    },
    {
      name: 'Rainbow',
      id: 'E',
      speed: null,
      loop: 1,
    },
    {
      name: 'Rainbow + Random flash',
      id: 'F',
      speed: null,
      loop: 1,
    },
    {
      name: 'Left Right',
      id: 'G',
      speed: 100,
      loop: 1,
    },
    {
      name: 'Block',
      id: 'H',
      speed: 100,
      loop: 1,
    },
    {
      name: 'Flash - Fade In',
      id: 'I',
      speed: 3,
      loop: 1,
    },
    {
      name: 'Flash - Fade Out',
      id: 'J',
      speed: 3,
      loop: 1,
    },
    {
      name: 'Every 2nd Switch',
      id: 'K',
      speed: 100,
      loop: 1,
    }
];

export const colors:i_Color[] = [
    {
      name: "Weiß - Blau",
      id: "W",
      r1: "255",
      g1: "255",
      b1: "255",
      r2: "0",
      g2: "0",
      b2: "255"
    },
    {
        name: "Blau - Weiß",
        id: "W",
        r1: "0",
        g1: "0",
        b1: "255",
        r2: "255",
        g2: "255",
        b2: "255"
    },
    {
      name: "Grün - Weiß",
      id: "W",
      r1: "0",
      g1: "255",
      b1: "0",
      r2: "255",
      g2: "255",
      b2: "255"
    },
    {
      name: "Rot - Blau",
      id: "W",
      r1: "255",
      g1: "0",
      b1: "0",
      r2: "0",
      g2: "0",
      b2: "255"
    },
    {
      name: "Blau - Rot",
      id: "W",
      r1: "0",
      g1: "0",
      b1: "255",
      r2: "255",
      g2: "0",
      b2: "0"
    },
    {
      name: "Blau - Gelb",
      id: "W",
      r1: "0",
      g1: "0",
      b1: "255",
      r2: "241",
      g2: "196",
      b2: "50"
    },
    {
      name: "Pink - Gelb",
      id: "W",
      r1: "232",
      g1: "67",
      b1: "147",
      r2: "241",
      g2: "196",
      b2: "50"
    },
    /**
     * rgb(232, 67, 147)
     * Rot, Blau
     * Blau, Rot
     * Pink, Gelb
     * Gelb, Pink
     * Pink, Blau
     * Blau, Pink
     * Grün, Pink
     * Pink, Grün
     * Grün, Red
     * Red, Grün
     * Blau, grey
     * Blau, Grün (light)
     * Rot, Orange
     * Orange, Rot
     */
    // {
    //     name: "Schwarz",
    //     id: "S",
    //     r: "0",
    //     g: "0",
    //     b: "0"
    // },
    // {
    //     name: "Rot",
    //     id: "R",
    //     r: "255",
    //     g: "0",
    //     b: "0"
    // },
    // {
    //     name: "Grün",
    //     id: "G",
    //     r: "0",
    //     g: "255",
    //     b: "0"
    // },
    // {
    //     name: "Blau",
    //     id: "B",
    //     r: "0",
    //     g: "0",
    //     b: "255"
    // },
    // {
    //     name: "Lila",
    //     id: "L",
    //     r: "123",
    //     g: "46",
    //     b: "194"
    // },
    // {
    //     name: "Gelb",
    //     id: "Y",
    //     r: "242",
    //     g: "201",
    //     b: "76"
    // },
    // {
    //     name: "Pink",
    //     id: "P",
    //     r: "232",
    //     g: "40",
    //     b: "189"
    // },
    // {
    //     name: "Orange",
    //     id: "O",
    //     r: "242",
    //     g: "153",
    //     b: "74"
    // }
]