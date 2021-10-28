const {
  pascalCase,
} = require('change-case');

module.exports = (filename, methods) => [
  {
    name: `Tests/${pascalCase(filename)}Test.cs`,
    template: `using System;
using Xunit;

namespace Tests
{
    public class ${pascalCase(filename)}Test
    {
        [Fact]
        public void ShouldReturnSuccessMessage()
        {
            var mock = new ${pascalCase(filename)}Mock();
            Assert.Equal("Scenario A is a success", mock.TestMethod());
        }
    }
}`,
  },
  {
    name: `Tests/mocks/${pascalCase(filename)}Mock.cs`,
    template: `namespace Tests
{
    public class ${pascalCase(filename)}Mock
    {
        public string TestMethod()
        {
            return "Scenario A is a success";
        }
    }
}`,
  },
  {
    name: 'Tests/Tests.csproj',
    template: `<Project Sdk="Microsoft.NET.Sdk">

    <PropertyGroup>
        <TargetFrameworks>net5.0</TargetFrameworks>

        <IsPackable>false</IsPackable>
    </PropertyGroup>

    <ItemGroup>
        <PackageReference Include="Microsoft.NET.Test.Sdk" Version="16.9.4" />
        <PackageReference Include="xunit" Version="2.4.1" />
        <PackageReference Include="xunit.runner.visualstudio" Version="2.4.3">
            <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
            <PrivateAssets>all</PrivateAssets>
        </PackageReference>
        <PackageReference Include="coverlet.collector" Version="3.0.2">
            <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
            <PrivateAssets>all</PrivateAssets>
        </PackageReference>
    </ItemGroup>

</Project>`,
  },
];
