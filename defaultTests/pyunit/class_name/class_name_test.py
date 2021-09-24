import unittest

from mocks import Mocks

from class_name import ClassName

class ClassNameTest(unittest.TestCase):
    def setUp(self):
        self.test_class = ClassName()
        self.mocks = Mocks()

    def test_method_01(self):
        self.assertEqual(
            self.test_class.test_method(),
            self.mocks.mock_method_01_result(),
            'incorrect value'
        )

if __name__ == "__main__":
    unittest.main()

