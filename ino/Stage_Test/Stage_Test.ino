#include <FastLED.h>

// How many leds in your strip?
#define NUM_LEDS 18

// For led chips like WS2812, which have a data line, ground, and power, you just
// need to define DATA_PIN.  For led chipsets that are SPI based (four wires - data, clock,
// ground, and power), like the LPD8806 define both DATA_PIN and CLOCK_PIN
// Clock pin only needed for SPI based chipsets when not using hardware SPI
#define DATA_PIN 3
#define CLOCK_PIN 13

// Define the array of leds
CRGB leds[NUM_LEDS];
int incomingByte = 0;

const unsigned int MAX_MESSAGE_LENGTH = 12;

void setup() { 
  Serial.begin(9600);
  FastLED.addLeds<APA102, DATA_PIN, CLOCK_PIN, RGB>(leds, NUM_LEDS);  // BGR ordering is typical
  //randomSeed(analogRead(0));
}

void loop() { 
  // Serial.println("Animation done.");
  // oneByOne(100);
  // specialOne(100, CRGB(255,255,255), CRGB(255,0,0));
  // randomMultiple(NUM_LEDS, 200);
  
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

  //Check to see if anything is available in the serial receive buffer
 while (Serial.available() > 0)
 {
   //Create a place to hold the incoming message
   static char message[MAX_MESSAGE_LENGTH];
   static unsigned int message_pos = 0;

   //Read the next available byte in the serial receive buffer
   char inByte = Serial.read();

   //Message coming in (check not terminating character) and guard for over message size
   if ( inByte != '\n' && (message_pos < MAX_MESSAGE_LENGTH - 1) )
   {
     //Add the incoming byte to our message
     message[message_pos] = inByte;
     message_pos++;
   }
   //Full message received...
   else
   {
     //Add null character to string
     message[message_pos] = '\0';

     //Print the message (or do other things)

      switch(message[1]){
        case 'A':
          specialOne(100, CRGB(255,255,255), CRGB(255,0,0));
          Serial.print("D");
          break;
        case 'B':
          oneByOne(100);
          break;
        case 'C':
          randomMultiple(NUM_LEDS, 100);
          break;
        case 'D':
          shutter(100);
          break;
        default: 
          shutter(200);
          break;
      }
     
      // if(message[1] == 'A'){
      //   specialOne(100, CRGB(255,255,255), CRGB(255,0,0));
      // } else{
        
      // }

     //Reset for the next message
     message_pos = 0;
   }
 }

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
