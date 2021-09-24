require "./class_name.rb"
require "./mocks/class_name_mock.rb"

describe ClassName do
    describe "#test_method" do

        before do
            @test_class = ClassName.new()
            @mocks = ClassNameMock.new()
        end


        it "puts the ordered book in customer's order history" do
            expect(@test_class.test_method).to eq(@mocks.mock_method_01_result)
        end
    end
end

