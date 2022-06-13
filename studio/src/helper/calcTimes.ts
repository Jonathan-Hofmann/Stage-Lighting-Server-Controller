const NUM_LEDS  = 18;

export const calcTime = (id:string, speed: number, loop: number) => {
    let time = 0.00;
    switch (id) {
        case "A":
            time = ((NUM_LEDS*speed)*loop)/1000
            return(time);
            break;
        case "B":
            time = ((NUM_LEDS*speed)*loop)/1000
            return(time);
            break;
        case "C":
            time = ((speed*2)*loop)/1000
            return(time);
            break;
        case "D":
            time = ((speed*2)*loop)/1000
            return(time);
            break;
        case "E":
            return("[No Time]");
        case "F":
            return("[No Time]");
            break;
        case "G":
            time = ((speed*2)*loop)/1000
            return(time);
            break;
        case "H":
            time = ((speed*(NUM_LEDS-6))*loop)/1000
            return(time);
            break;
        case "I":
            time = ((speed*255)*loop)/1000
            return(time);
            break;
        case "J":
            time = ((speed*255)*loop)/1000
            return(time);
            break;
        case "K":
            time = ((speed*2)*loop)/1000
            return(time);
            break;
        default:
            return("N/A");
            break;
    }
}