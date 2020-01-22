package tests;

import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.SelenideElement;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.Test;

import static com.codeborne.selenide.Selectors.*;
import static com.codeborne.selenide.Selenide.*;
import static com.codeborne.selenide.Selenide.open;

public class APSItests {

    public static void main(String[] args) {
        System.out.println("Hello");
    }

    //Przed testem zmienic email i nazwe eventu
    private String email = "email.test16@test.pl";
    private String password = "Password1!";
    private String firstName = "First";
    private String lastName = "Last";
    private String eventName = "testEventName14";
    private String eventDescription = "testEventDescription2";

    @BeforeSuite
    public void setUp() {
        com.codeborne.selenide.Configuration.baseUrl = "https://apsi2019.azurewebsites.net";
        Configuration.startMaximized = true;
        open("/");
    }

    @Test(priority = 0)
    public void registerNewAccount(){
        $(byText("Register")).click();
        sleep(1000);
        insertRegisterData(this.email, this.password, this.firstName, this.lastName);
        $(byXpath("//button[@class='btn btn-primary']")).click();
        sleep(5000);
        Assert.assertTrue($(byText("Hello " + this.email)).exists());
    }

    @Test(priority = 1)
    public void createNewEvent(){
        $(byText("Events")).click();
        $(byXpath("//input[@formcontrolname='name']")).setValue(this.eventName);
        $(byXpath("//input[@formcontrolname='description']")).setValue(this.eventDescription);
        $(byText("Submit")).click();
        sleep(3000);
        SelenideElement table = $(byXpath("//table[@class='table table-striped']"));
        sleep(5000);
        Assert.assertTrue(table.$(byText(this.eventName)).exists());
        $(byText("ok")).click();
        sleep(2000);
    }

    @Test(priority = 2)
    public void deleteEvent(){
        $(byText("Cancel")).click();
        sleep(2000);
        $(byText("Events")).click();
        sleep(2000);
        SelenideElement table = $(byXpath("//table[@class='table table-striped']"));
        table.$(byText(this.eventName)).parent().$(byText("delete")).click();
        $(byText("Cancel")).click();
        sleep(2000);
        $(byText("Events")).click();
        sleep(2000);
        Assert.assertFalse(table.$(byText(this.eventName)).exists());
    }

    @Test(priority = 3)
    public void logout(){
        $(byText("Logout")).click();
        sleep(1000);
        Assert.assertTrue($(byText("You successfully logged out!")).exists());
        sleep(1000);
    }

    @Test(priority = 4)
    public void login(){
        $(byText("Login")).click();
        $(By.id("Input_Email")).setValue(email);
        $(By.id("Input_Password")).setValue(password);
        $(By.id("login-submit")).click();
        sleep(4000);
        Assert.assertTrue($(byText("Hello " + this.email)).exists());
    }

    private void insertRegisterData(String email, String password, String firstName, String lastName) {
        $(By.id("Input_Email")).setValue(email);
        $(By.id("Input_Password")).setValue(password);
        $(By.id("Input_ConfirmPassword")).setValue(password);
        $(By.id("Input_FirstName")).setValue(firstName);
        $(By.id("Input_LastName")).setValue(lastName);
    }
}
