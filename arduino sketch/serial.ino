#include <Keyboard.h>

void setup(void)
{
  Serial.begin(9600);
  Serial1.begin(9600);
  Keyboard.begin();
}

void keyWait()
{
  while (Serial.available() <= 0 || Serial.available() <= 0)
    delay(1);
}

void loop(void)
{
  char buf[1024];
  byte ch;

  keyWait();
  byte tp;
  if (0 < Serial.available())
  {
    tp = Serial.read();
  }
  else if (0 < Serial1.available())
  {
    tp = Serial1.read();
  }
  switch (tp)
  {
  case 1:
    keyWait();
    if (0 < Serial.available())
    {
      ch = Serial.read();
    }
    else if (0 < Serial1.available())
    {
      ch = Serial1.read();
    }
    Keyboard.press(ch);
    sprintf(buf, "%02x", ch);
    // Serial.println(buf);
    break;

  case 2:
    keyWait();
    if (0 < Serial.available())
    {
      ch = Serial.read();
    }
    else if (0 < Serial1.available())
    {
      ch = Serial1.read();
    }
    Keyboard.release(ch);
    sprintf(buf, "%02x", ch);
    // Serial.println(buf);
    break;
  }
}
