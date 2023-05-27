#include <iostream>

int main() {
  using std::cin;
  using std::cout;
  using std::endl;

  unsigned total;

  cout << "Input pages: ";
  cin >> total;

  cout << "First: ";
  for (int i = 1; i <= total; i++) {
    if (i % 2 == 1) {
      if (i != 1) {
        cout << ",";
      }
      cout << i;
    }
  }
  cout << endl;
  cout << "Then: ";
  for (int i = 1; i <= total; i++) {
    if (i % 2 == 0) {
      if (i != 2) {
        cout << ",";
      }
      cout << i;
    }
  }
  cout << endl;

  return 0;
}
