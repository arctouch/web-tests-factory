package classname

import "testing"

func TestGetAge(t *testing.T) {
  got := GetAge()
  want := Mock_GetAge

  if got != want {
      t.Errorf("got %v, wanted %v, of type %s", got, want, "int")
  }
}
  func TestIsActive(t *testing.T) {
  got := IsActive()
  want := Mock_IsActive

  if got != want {
      t.Errorf("got %v, wanted %v, of type %s", got, want, "bool")
  }
}
  func TestSayHello(t *testing.T) {
  got := SayHello()
  want := Mock_SayHello

  if got != want {
      t.Errorf("got %v, wanted %v, of type %s", got, want, "string")
  }
}
