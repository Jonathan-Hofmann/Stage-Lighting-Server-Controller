#include <FastLED.h>
// How many leds in your strip?
#define NUM_LEDS 65

// For led chips like WS2812, which have a data line, ground, and power, you just
// need to define DATA_PIN.  For led chipsets that are SPI based (four wires - data, clock,
// ground, and power), like the LPD8806 define both DATA_PIN and CLOCK_PIN
// Clock pin only needed for SPI based chipsets when not using hardware SPI
#define DATA_PIN 3
#define CLOCK_PIN 13

#define BRIGHTNESS 255   /* Control the brightness of your leds */
#define SATURATION 255   /* Control the saturation of your leds */

// Define the array of leds
CRGB leds[NUM_LEDS];
int incomingByte = 0;

const unsigned int MAX_MESSAGE_LENGTH = 12;

void setup() { 
  Serial.begin(9600);
  FastLED.addLeds<APA102, DATA_PIN, CLOCK_PIN, RGB>(leds, NUM_LEDS);  // BGR ordering is typical
  randomSeed(analogRead(0));
}

void loop() {

  // flash_fadeIn(5);

  readData();
// snowOnBlue(100, CRGB(255,255,255), CRGB(255,0,0));
}



void testType(int s){
  Serial.println(" - Typ: Int");
}
void testType(char s){
  Serial.println(" - Typ: Char");
}
void testType(bool s){
  Serial.println(" - Typ: Boolean");
}

void readData(){
  while (Serial.available() > 0)
 {
    //Create a place to hold the incoming message
    static char message[MAX_MESSAGE_LENGTH];
    static unsigned int message_pos = 0;

    // for (int i = 0; i < MAX_MESSAGE_LENGTH; ++i){
    //   message[i] = 'n';
    // }

    //Read the next available byte in the serial receive buffer
    char inByte = Serial.read();

    //Message coming in (check not terminating character) and guard for over message size
    if ( inByte != '\n' && (message_pos < MAX_MESSAGE_LENGTH - 1) )
    {
      //Add the incoming byte to our message
      Serial.print(inByte);
      message[message_pos] = inByte;
      message_pos++;
    }
    //Full message received...
    else
    {
      //Add null character to string
      message[message_pos] = '\0';

      // decode message

      char m[2];

      int speed = String(message[4]).toInt()+(String(message[3]).toInt()*10)+(String(message[2]).toInt()*100);
      int count = String(message[6]).toInt()+(String(message[5]).toInt()*10);

      Serial.print(" | ");
      Serial.print(speed);
      Serial.print(" ms");
      Serial.print(" | Loop: ");
      Serial.print(count);
      Serial.println(" x");

      m[0] = message[0];
      m[1] = message[1];

      for(int i = 0; i < count; i++){
        switch(m[1]){
        case 'A':
          snowOnBlue(speed, CRGB(255,255,255), CRGB(255,0,0));
          break;
        case 'B':
          oneByOne(speed);
          break;
        case 'C':
          randomMultiple(NUM_LEDS, speed);
          break;
        case 'D':
          shutter(speed);
          break;
        case 'E':
          rainbow();
          break;
        case 'F':
          rainbow_flash();
          break;
        case 'G':
          leftRight(speed);
          break;
        case 'H':
          block(speed);
          break;
        case 'I':
          flash_fadeIn(speed);
          break;
        case 'J':
          flash_fadeOut(speed);
          break;
        case 'K':
          OnOff2nd(speed);
          break;
        case '-':
          off();
          break;
        default: 
          errorReply();
          break;
        }
      }
      //Reset for the next message
      message_pos = 0;
   }
 }
}

/**

    EFFECTS

*/

void flash_fadeIn(int speed){
  for (int j = 0; j < 255; j++) {
    for (int i = 0; i < NUM_LEDS; i++) {
      leds[i] = CHSV(255, SATURATION, j); /* The higher the value 4 the less fade there is and vice versa */ 
    }
    FastLED.show();
    delay(speed); /* Change this to your hearts desire, the lower the value the faster your colors move (and vice versa) */
  }
}

void flash_fadeOut(int speed){
  for (int j = 0; j < NUM_LEDS; j++) {
    leds[j] = CHSV(255, SATURATION, 255); /* The higher the value 4 the less fade there is and vice versa */ 
  }
  for (int j = 255; j >= 0; j--) {
    for (int i = 0; i < NUM_LEDS; i++) {
      leds[i] = CHSV(255, SATURATION, j); /* The higher the value 4 the less fade there is and vice versa */ 
    }
    FastLED.show();
    delay(speed); /* Change this to your hearts desire, the lower the value the faster your colors move (and vice versa) */
  }
}

void block(int speed){
  int size = 6;
  int lastPos = 0;
  for(int a = 0; a < NUM_LEDS-6; a++){
      for (int b = 0; b < NUM_LEDS; b++) {
        if(b > lastPos && b < (lastPos+6)){
          leds[b] = CRGB(255,255,255);
        } else{
          leds[b] = CRGB(0,0,0);
        }
        
      }
      FastLED.show();
    
    ++lastPos;
    delay(speed);
  }
}

void leftRight(int speed){
  for (int i = 0; i < NUM_LEDS; i++) {
    if(i < NUM_LEDS/2){
      leds[i] = CRGB(0,0,0);
    } else {
      leds[i] = CRGB(255,255,255);
    }
  }
  FastLED.show();
  delay(speed); /* Change this to your hearts desire, the lower the value the faster your colors move (and vice versa) */
  for (int i = 0; i < NUM_LEDS; i++) {
    if(i < NUM_LEDS/2){
      leds[i] = CRGB(255,255,255);
    } else {
      leds[i] = CRGB(0,0,0);
    }
  }
  FastLED.show();
  delay(speed); /* Change this to your hearts desire, the lower the value the faster your colors move (and vice versa) */
}

void OnOff2nd(int speed){
  for (int i = 0; i < NUM_LEDS; i++) {
    if(i % 2 == 0){
      leds[i] = CRGB(0,0,0);
    } else {
      leds[i] = CRGB(255,255,255);
    }
  }
  FastLED.show();
  delay(speed); /* Change this to your hearts desire, the lower the value the faster your colors move (and vice versa) */
  for (int i = 0; i < NUM_LEDS; i++) {
    if(i % 2 == 0){
      leds[i] = CRGB(255,255,255);
    } else {
      leds[i] = CRGB(0,0,0);
    }
  }
  FastLED.show();
  delay(speed); /* Change this to your hearts desire, the lower the value the faster your colors move (and vice versa) */
}

void rainbow(){
  for (int j = 0; j < 255; j++) {
    for (int i = 0; i < NUM_LEDS; i++) {
      leds[i] = CHSV(i - (j * 2), SATURATION, BRIGHTNESS); /* The higher the value 4 the less fade there is and vice versa */ 
    }
    FastLED.show();
    delay(25); /* Change this to your hearts desire, the lower the value the faster your colors move (and vice versa) */
  }
}

void rainbow_flash(){
  for (int j = 0; j < 255; j++) {
    int onOfArr[NUM_LEDS];

    for (int m = 0; m < NUM_LEDS; m++){
      // Serial.println(random(2));
      onOfArr[m] = random(2);
    } 
    for (int i = 0; i < NUM_LEDS; i++) {
      if(onOfArr[i] == 1){
        leds[i] = CHSV(i - (j * 4), SATURATION, BRIGHTNESS);
      } else{
        leds[i] = CHSV(i - (j * 4), SATURATION, 0);
      } /* The higher the value 4 the less fade there is and vice versa */ 
    }
    FastLED.show();
    delay(60); /* Change this to your hearts desire, the lower the value the faster your colors move (and vice versa) */
  }
}

void errorReply(){
  for (int i = 0; i < NUM_LEDS; i++){
    leds[i] = CRGB(0,0,255);
  }
  FastLED.show();
}

void snowOnBlue(int speed, CRGB specialColor, CRGB mainColor){
  for (int i = 0; i < NUM_LEDS; i++){
    leds[i] = mainColor;
  }
  FastLED.show();
    
  for (int i = 0; i < NUM_LEDS; i++){
    leds[i] = specialColor;
    if(i>0)leds[i-1] = mainColor;
    FastLED.show();
    delay(speed);
  }
}

void off(){
  for (int i = 0; i < NUM_LEDS; i++){
    leds[i] = CRGB(0,0,0);
  }
  FastLED.show();
}

void oneByOne(int speed) {
// Turn the LED on, then pause

  for (int i = 0; i < NUM_LEDS; i++){
    leds[i] = CRGB(0,255,0);
    FastLED.show();
    delay(speed);
  }
  
  // Now turn the LED off, then pause
  
  for (int i = 0; i < NUM_LEDS; i++){
    leds[i] = CRGB::Black;
  }
  FastLED.show();
  delay(speed);
}

void randomMultiple(int max, int delay_ms) {
  // Turn the LED on, then pause
  int onOfArr[max];

  for (int m = 0; m < max; m++){
    // Serial.println(random(2));
    onOfArr[m] = random(2);
  } 

  for (int i = 0; i < NUM_LEDS; i++){
    if(onOfArr[i]==0){
      leds[i] = CRGB::Black;
    } else{
      leds[i] = CRGB(150,150,150);
    }
  }
  FastLED.show();
  delay(delay_ms);
  // Now turn the LED off, then pause
  
  for (int i = 0; i < NUM_LEDS; i++){
    leds[i] = CRGB::Black;
  }
  FastLED.show();
  delay(delay_ms);
}

void shutter(int speed){
  for (int i = 0; i < NUM_LEDS; i++){
    leds[i] = CRGB(255,255,255);
  }
  FastLED.show();
  delay(speed);
  // Now turn the LED off, then pause
  
  for (int i = 0; i < NUM_LEDS; i++){
    leds[i] = CRGB(0,0,0);
  }
  FastLED.show();
  delay(speed);
}
