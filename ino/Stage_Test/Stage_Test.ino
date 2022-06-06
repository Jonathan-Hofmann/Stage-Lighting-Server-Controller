#include <FastLED.h>

// How many leds in your strip?
#define NUM_LEDS 6

// For led chips like WS2812, which have a data line, ground, and power, you just
// need to define DATA_PIN.  For led chipsets that are SPI based (four wires - data, clock,
// ground, and power), like the LPD8806 define both DATA_PIN and CLOCK_PIN
// Clock pin only needed for SPI based chipsets when not using hardware SPI
#define DATA_PIN 3
#define CLOCK_PIN 13

// Define the array of leds
CRGB leds[NUM_LEDS];
int incomingByte = 0;


void setup() { 
  Serial.begin(4800);
  FastLED.addLeds<APA102, DATA_PIN, CLOCK_PIN, RGB>(leds, NUM_LEDS);  // BGR ordering is typical
  //randomSeed(analogRead(0));
}

void loop() { 
  oneByOne(100);
  // specialOne(100, CRGB(255,255,255), CRGB(255,0,0));
  // shutter(50);
  // Serial.read();
  // if (Serial.available() > 0) {
  //   Serial.print("Device Ready. Waiting for Data...");
  //   // read the incoming byte:
  //   incomingByte = Serial.read();

  //   // say what you got:
  //   Serial.print("I received: ");
  //   Serial.println(incomingByte, DEC);
  //   Serial.println(incomingByte);

  //   // if()
  // }
}

void specialOne(int speed, CRGB specialColor, CRGB mainColor){
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
