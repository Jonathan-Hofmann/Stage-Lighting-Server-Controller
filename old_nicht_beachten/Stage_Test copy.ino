// #include <FastLED.h>
// // How many leds in your strip?
// #define NUM_LEDS_WINGS 65
// #define NUM_LEDS_TRIANGLE 13

// // For led chips like WS2812, which have a data line, ground, and power, you just
// // need to define DATA_PIN.  For led chipsets that are SPI based (four wires - data, clock,
// // ground, and power), like the LPD8806 define both DATA_PIN and CLOCK_PIN
// // Clock pin only needed for SPI based chipsets when not using hardware SPI
// #define RIGHT_WING 3
// #define LEFT_WING 2
// #define CLOCK_PIN 13

// #define BRIGHTNESS 255   /* Control the brightness of your leds */
// #define SATURATION 255   /* Control the saturation of your leds */

// // Define the array of leds
// CRGB leds[2][NUM_LEDS_WINGS];
// int incomingByte = 0;

// unsigned long on_time;
// unsigned long start_time;

// CRGB currentColor = CRGB(255,255,255);

// const unsigned int MAX_MESSAGE_LENGTH = 200;

// void setup() { 
//   Serial.begin(9600);
//   FastLED.addLeds<APA102, RIGHT_WING, CLOCK_PIN, RGB>(leds[0], NUM_LEDS_WINGS);  // BGR ordering is typical
//   FastLED.addLeds<APA102, LEFT_WING, CLOCK_PIN, RGB>(leds[1], NUM_LEDS_WINGS);  // BGR ordering is typical
//   randomSeed(analogRead(0));
// }

// void loop() {
//   updateOnTime();
//   // flash_fadeIn(5);

//   readData();
// // snowOnBlue(100, CRGB(255,255,255), CRGB(255,0,0));
// }

// void updateOnTime(){
//   on_time = millis();
// }

// void showTimeSpend(unsigned long old){
//   updateOnTime();
//   Serial.print(" - Effekt played in: ");
//   Serial.print(on_time-start_time);
//   Serial.println(" ms");
// }

// void testType(int s){
//   Serial.println(" - Typ: Int");
// }
// void testType(char s){
//   Serial.println(" - Typ: Char");
// }
// void testType(bool s){
//   Serial.println(" - Typ: Boolean");
// }

// /**
//  * @brief Reads all incoming data.
//  * 
//  */
// void readData(){
//   while (Serial.available() > 0)
//  {
//     //Create a place to hold the incoming message
//     static char message[MAX_MESSAGE_LENGTH];
//     static unsigned int message_pos = 0;

//     // for (int i = 0; i < MAX_MESSAGE_LENGTH; ++i){
//     //   message[i] = 'n';
//     // }

//     //Read the next available byte in the serial receive buffer
//     char inByte = Serial.read();

//     //Message coming in (check not terminating character) and guard for over message size
//     if ( inByte != '\n' && (message_pos < MAX_MESSAGE_LENGTH - 1) )
//     {
//       //Add the incoming byte to our message
//       Serial.print(inByte);
//       message[message_pos] = inByte;
//       message_pos++;
//     }
//     //Full message received...
//     else
//     {
//       //Add null character to string
//       message[message_pos] = '\0';

//       // decode message

//       char m[2];

//       int speed = String(message[4]).toInt()+(String(message[3]).toInt()*10)+(String(message[2]).toInt()*100);
//       int count = String(message[6]).toInt()+(String(message[5]).toInt()*10);

//       Serial.print(" | ");
//       Serial.print(speed);
//       Serial.print(" ms");
//       Serial.print(" | Loop: ");
//       Serial.print(count);
//       Serial.println(" x");

//       m[0] = message[0];
//       m[1] = message[1];

//       if(m[0] == 'E'){
//         for(int i = 0; i < count; i++){
//           switch(m[1]){
//           case 'A':
//             snowOnBlue(speed, CRGB(255,255,255), CRGB(255,0,0));
//             break;
//           case 'B':
//             oneByOne(speed);
//             break;
//           case 'C':
//             randomMultiple(NUM_LEDS_WINGS, speed);
//             break;
//           case 'D':
//             shutter(speed);
//             break;
//           case 'E':
//             rainbow();
//             break;
//           case 'F':
//             rainbow_flash();
//             break;
//           case 'G':
//             // leftRight(speed);
//             break;
//           case 'H':
//             block(speed);
//             break;
//           case 'I':
//             flash_fadeIn(speed);
//             break;
//           case 'J':
//             flash_fadeOut(speed);
//             break;
//           case 'K':
//             OnOff2nd(speed);
//             break;
//           case '-':
//             all_off(10);
//             break;
//           default: 
//             errorReply();
//             break;
//           }
//         }
//       } else if(m[0] == 'C'){
//         int r = String(message[3]).toInt()+(String(message[2]).toInt()*10)+(String(message[1]).toInt()*100);
//       }
//       //Reset for the next message
//       message_pos = 0;
//    }
//  }
// }

// /**

//     EFFECTS

// */

// /**
//  * @brief Turns all LEDs on and waits till time.
//  * 
//  * @param time in ms to wait.
//  */
// void all_on(int time){
//   start_time = on_time;
//   for (int j = 0; j < 255; j++) {
//     for (int i = 0; i < NUM_LEDS_WINGS; i++) {
//       leds[0][i] = currentColor; /* The higher the value 4 the less fade there is and vice versa */ 
//     }
//     FastLED.show();
//     delay(time); /* Change this to your hearts desire, the lower the value the faster your colors move (and vice versa) */
//   }
//   showTimeSpend(start_time);
// }

// /**
//  * @brief Turns all LEDs off and waits till time.
//  * 
//  * @param time in ms to wait.
//  */
// void all_off(int time){
//   start_time = on_time;
//   for (int j = 0; j < 255; j++) {
//     for (int i = 0; i < NUM_LEDS_WINGS; i++) {
//       leds[0][i] = CRGB(0,0,0); /* The higher the value 4 the less fade there is and vice versa */ 
//     }
//     FastLED.show();
//     delay(time); /* Change this to your hearts desire, the lower the value the faster your colors move (and vice versa) */
//   }
//   showTimeSpend(start_time);
// }

// /**
//  * @brief Turns all LEDs on smoothly.
//  * 
//  * @param speed the delay between each 'frame' of the animation. Total 255 Frames.
//  */
// void flash_fadeIn(int speed){
//   start_time = on_time;
//   for (int j = 0; j < 255; j++) {
//     for (int i = 0; i < NUM_LEDS_WINGS; i++) {
//       leds[0][i] = CHSV(255, SATURATION, j); /* The higher the value 4 the less fade there is and vice versa */ 
//     }
//     FastLED.show();
//     delay(speed); /* Change this to your hearts desire, the lower the value the faster your colors move (and vice versa) */
//   }
//   showTimeSpend(start_time);
// }

// /**
//  * @brief Turns all LEDs off smoothly.
//  * 
//  * @param speed the delay between each 'frame' of the animation. Total 255 Frames.
//  */
// void flash_fadeOut(int speed){
//   start_time = on_time;
//   for (int j = 0; j < NUM_LEDS_WINGS; j++) {
//     leds[0][j] = CHSV(255, SATURATION, 255); /* The higher the value 4 the less fade there is and vice versa */ 
//   }
//   for (int j = 255; j >= 0; j--) {
//     for (int i = 0; i < NUM_LEDS_WINGS; i++) {
//       leds[0][i] = CHSV(255, SATURATION, j); /* The higher the value 4 the less fade there is and vice versa */ 
//     }
//     FastLED.show();
//     delay(speed); /* Change this to your hearts desire, the lower the value the faster your colors move (and vice versa) */
//   }
//   showTimeSpend(start_time);
// }

// /**
//  * @brief Simulates a block traveling from one side to the other. 
//  * 
//  * @param speed in ns the delay between frames.
//  */
// void block(int speed){
//   start_time = on_time;
//   int size = 6;
//   int lastPos = 0;
//   for(int a = 0; a < NUM_LEDS_WINGS; a++){
//       for (int b = 0; b < NUM_LEDS_WINGS; b++) {
//         if(b > lastPos && b < (lastPos+6)){
//           leds[0][b] = CRGB(255,255,255);
//         } else{
//           leds[0][b] = CRGB(0,0,0);
//         }
//       }
//       FastLED.show();
    
//     ++lastPos;
//     delay(speed);
//   }
//   showTimeSpend(start_time);
// }

// /**
//  * @brief Splits LEDs in to sides and shows them after a delay
//  * 
//  * @deprecated Is hard to program because of uneven number of LEDs in each row.
//  * 
//  */
// void leftRight(int speed){
//   start_time = on_time;
//   for (int i = 0; i < NUM_LEDS_WINGS; i++) {
//     if(i < NUM_LEDS_WINGS/2){
//       leds[0][i] = CRGB(0,0,0);
//     } else {
//       leds[0][i] = CRGB(255,255,255);
//     }
//   }
//   FastLED.show();
//   delay(speed); /* Change this to your hearts desire, the lower the value the faster your colors move (and vice versa) */
//   for (int i = 0; i < NUM_LEDS_WINGS; i++) {
//     if(i < NUM_LEDS_WINGS/2){
//       leds[0][i] = CRGB(255,255,255);
//     } else {
//       leds[0][i] = CRGB(0,0,0);
//     }
//   }
//   FastLED.show();
//   delay(speed); /* Change this to your hearts desire, the lower the value the faster your colors move (and vice versa) */
//   showTimeSpend(start_time);
// }

// /**
//  * @brief Shows every 2nd LED and swithes after delay.
//  * 
//  * @param speed in ms is the delay for the switch.
//  */
// void OnOff2nd(int speed){
//   start_time = on_time;
//   for (int i = 0; i < NUM_LEDS_WINGS; i++) {
//     if(i % 2 == 0){
//       leds[0][i] = CRGB(0,0,0);
//     } else {
//       leds[0][i] = CRGB(255,255,255);
//     }
//   }
//   FastLED.show();
//   delay(speed); /* Change this to your hearts desire, the lower the value the faster your colors move (and vice versa) */
//   for (int i = 0; i < NUM_LEDS_WINGS; i++) {
//     if(i % 2 == 0){
//       leds[0][i] = CRGB(255,255,255);
//     } else {
//       leds[0][i] = CRGB(0,0,0);
//     }
//   }
//   FastLED.show();
//   delay(speed); /* Change this to your hearts desire, the lower the value the faster your colors move (and vice versa) */
//   showTimeSpend(start_time);
// }

// /**
//  * @brief Activates a Rainbow effect over the whole LED strip.
//  * 
//  */
// void rainbow(){
//   start_time = on_time;
//   for (int j = 0; j < 255; j++) {
//     for (int i = 0; i < NUM_LEDS_WINGS; i++) {
//       leds[0][i] = CHSV(i - (j * 2), SATURATION, BRIGHTNESS); /* The higher the value 4 the less fade there is and vice versa */ 
//     }
//     FastLED.show();
//     delay(25); /* Change this to your hearts desire, the lower the value the faster your colors move (and vice versa) */
//   }
//   showTimeSpend(start_time);
// }

// /**
//  * @brief Activates a Flashing Rainbow effect over the whole LED strip.
//  * 
//  */
// void rainbow_flash(){
//   start_time = on_time;
//   for (int j = 0; j < 255; j++) {
//     int onOfArr[NUM_LEDS_WINGS];

//     for (int m = 0; m < NUM_LEDS_WINGS; m++){
//       // Serial.println(random(2));
//       onOfArr[m] = random(2);
//     } 
//     for (int i = 0; i < NUM_LEDS_WINGS; i++) {
//       if(onOfArr[i] == 1){
//         leds[0][i] = CHSV(i - (j * 4), SATURATION, BRIGHTNESS);
//       } else{
//         leds[0][i] = CHSV(i - (j * 4), SATURATION, 0);
//       } /* The higher the value 4 the less fade there is and vice versa */ 
//     }
//     FastLED.show();
//     delay(60); /* Change this to your hearts desire, the lower the value the faster your colors move (and vice versa) */
//   }
//   showTimeSpend(start_time);
// }

// /**
//  * @brief shows if the received Message does not correspondont to the given syntax.
//  * 
//  */
// void errorReply(){
//   start_time = on_time;
//   for (int i = 0; i < NUM_LEDS_WINGS; i++){
//     leds[0][i] = CRGB(0,0,255);
//   }
//   FastLED.show();
//   showTimeSpend(start_time);
// }

// /**
//  * @brief shows Effect where one LED after another is displayed in a special color.
//  * 
//  * @param speed in ms is the delay between a step
//  * @param specialColor is the special color that moves
//  * @param mainColor is the background
//  */
// void snowOnBlue(int speed, CRGB specialColor, CRGB mainColor){
//   start_time = on_time;
//   for (int i = 0; i < NUM_LEDS_WINGS; i++){
//     leds[0][i] = mainColor;
//   }
//   FastLED.show();
    
//   for (int i = 0; i < NUM_LEDS_WINGS; i++){
//     leds[0][i] = specialColor;
//     if(i>0)leds[0][i-1] = mainColor;
//     FastLED.show();
//     delay(speed);
//   }
//   showTimeSpend(start_time);
// }

// /**
//  * @brief lets a color 'grow' to full size LED strip.
//  * 
//  * @param speed in ms is the delay between a move.
//  */
// void oneByOne(int speed) {
//   start_time = on_time;
// // Turn the LED on, then pause

//   for (int i = 0; i < NUM_LEDS_WINGS; i++){
//     leds[0][i] = currentColor;
//     FastLED.show();
//     delay(speed);
//   }
  
//   // Now turn the LED off, then pause
  
//   for (int i = 0; i < NUM_LEDS_WINGS; i++){
//     leds[0][i] = CRGB::Black;
//   }
//   FastLED.show();
//   delay(speed);
//   showTimeSpend(start_time);
// }

// /**
//  * @brief turns random LEDs on and off with a delay
//  * 
//  * @param max number of LEDs to be flashed. ()
//  * @param delay_ms is the delay (2x)
//  */
// void randomMultiple(int max, int delay_ms) {
//   start_time = on_time;
//   // Turn the LED on, then pause
//   int onOfArr[max];

//   for (int m = 0; m < max; m++){
//     // Serial.println(random(2));
//     onOfArr[m] = random(2);
//   } 

//   for (int i = 0; i < NUM_LEDS_WINGS; i++){
//     if(onOfArr[i]==0){
//       leds[0][i] = CRGB::Black;
//     } else{
//       leds[0][i] = CRGB(150,150,150);
//     }
//   }
//   FastLED.show();
//   delay(delay_ms);
//   // Now turn the LED off, then pause
  
//   for (int i = 0; i < NUM_LEDS_WINGS; i++){
//     leds[0][i] = CRGB::Black;
//   }
//   FastLED.show();
//   delay(delay_ms);
//   showTimeSpend(start_time);
// }

// /**
//  * @brief turns LED strip on and off with delay
//  * 
//  * @param speed in ms as the delay (2x)
//  */
// void shutter(int speed){
//   start_time = on_time;
//   for (int i = 0; i < NUM_LEDS_WINGS; i++){
//     leds[0][i] = CRGB(255,255,255);
//   }
//   FastLED.show();
//   delay(speed);
//   // Now turn the LED off, then pause
  
//   for (int i = 0; i < NUM_LEDS_WINGS; i++){
//     leds[0][i] = CRGB(0,0,0);
//   }
//   FastLED.show();
//   delay(speed);
//   showTimeSpend(start_time);
// }
