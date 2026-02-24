#include <Arduino.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2); // I2C address 0x27
double currtime;
double lasttime = 0;
String strings[12];
int treshold = (int)(1022.0f / 10);
int last = -1;

void setup() {
  
  pinMode(A3, INPUT);
  Serial.begin(9600);
  lcd.init();
  lcd.backlight();
  strings[0] = String(0) + String(": Crown tower");
  strings[1] = String("   rotterdam");
  for(int i = 2; i < 12; i++) {
    strings[i] = String(i -1) + String(": dummy data");
  }

}

void loop() {

  float in = analogRead(A3);
  Serial.println(in);
  currtime = millis();
  int i = (int)(in /treshold); 
  if(currtime > lasttime + 100 && last != i) {
    lcd.clear();
    lcd.print(strings[i]);
    lcd.setCursor(0,1);
    lcd.print(strings[i + 1]);
    last = i;

    lasttime = currtime;
  }
  

}