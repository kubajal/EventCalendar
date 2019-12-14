using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace app.Data.Migrations
{
    public partial class UserMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "AspNetUsers",
                defaultValue: "",
                nullable: false);
            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "AspNetUsers",
                defaultValue: "",
                nullable: false);
            migrationBuilder.AddColumn<DateTime>(
                name: "TimeRegistered",
                table: "AspNetUsers",
                defaultValue: DateTime.Now,
                nullable: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn("FirstName", "AspNetUsers");
            migrationBuilder.DropColumn("LastName", "AspNetUsers");
            migrationBuilder.DropColumn("TimeRegistered", "AspNetUsers");
        }
    }
}
