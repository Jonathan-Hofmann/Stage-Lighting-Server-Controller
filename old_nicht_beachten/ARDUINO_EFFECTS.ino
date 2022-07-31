
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
