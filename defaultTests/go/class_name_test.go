package class_name

import "testing"

func TestAdd(t *testing.T){

    got := TestMethod()
    want := MockMethod_01Result

    if got != want {
        t.Errorf("got %q, wanted %q", got, want)
    }
}