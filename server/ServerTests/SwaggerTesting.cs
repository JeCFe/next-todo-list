using Snapper;
using Snapper.Attributes;

namespace ServerTests;

using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
public class SwaggerTesting
{
    [Fact, UpdateSnapshots]
    public async void SnapshotTesting()
    {
        await using var application = new WebApplicationFactory<Program>();
        var client = application.WithWebHostBuilder(builder =>
        {
            builder.UseEnvironment("UnitTesting");
        }).CreateClient();
        var response = await client.GetAsync("/swagger/v1/swagger.json", CancellationToken.None);
        string actual = await response.Content.ReadAsStringAsync(CancellationToken.None);
        Assert.True(response.IsSuccessStatusCode, actual);
        actual.ShouldMatchSnapshot(SnapshotSettings.New().SnapshotFileName("api-spec"));
    }
}