using Microsoft.EntityFrameworkCore.Migrations;

namespace app.Data.Migrations
{
    public partial class EventMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Events",
                columns: new[] { "Id", "Name", "Description" },
                values: new object[] { 1, "Event 1", "Description 1" });
            migrationBuilder.InsertData(
                table: "Events",
                columns: new[] { "Id", "Name", "Description" },
                values: new object[] { 2, "Event 2", "Description 2" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Events");
        }
    }
}
