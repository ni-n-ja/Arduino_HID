#include <Keyboard.h>

void setup(void) {
  Serial.begin(9600);
  Keyboard.begin();
}

void keyWait() {
  while (Serial.available() <= 0)
    delay(1);
}

void loop(void) {
  char buf[1024];
  byte ch;
  
  keyWait();
  byte tp = Serial.read();
  switch (tp) {
  case 1:
    keyWait();
    ch = Serial.read();
    Keyboard.press(ch);
    sprintf(buf, "%02x", ch);
    Serial.println(buf);
    break;

  case 2:
    keyWait();
    ch = Serial.read();
    Keyboard.release(ch);
    sprintf(buf, "%02x", ch);
    Serial.println(buf);
    break;
  }
}
