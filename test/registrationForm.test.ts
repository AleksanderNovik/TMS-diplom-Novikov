import { DataErrorMessage } from "../data/data.errorMessage";
import { DataVariables } from "../data/data.variables";
import { RegistrationForm } from "../src/registrationForm"

describe("RegistrationForm Tests", () => {
    let registrationForm: RegistrationForm;

    beforeEach(() => {
        registrationForm = new RegistrationForm();
    });

    test("Set valid email", () => {
        registrationForm.setEmail(DataVariables.alexEmail);
        expect(registrationForm.Email).toEqual(DataVariables.alexEmail);
    });

    test("Invalid email format", () => {
        expect(() => {
            registrationForm.setEmail(" ");
        }).toThrow(DataErrorMessage.invalidEmailError); 
    });

    test("Invalid email format with dot", () => {
        expect(() => {
            registrationForm.setEmail(". ");
        }).toThrow(DataErrorMessage.invalidEmailError); 
    });
    
    test("Set valid password", () => {
        registrationForm.setPassword(DataVariables.validPassword);
        expect(registrationForm.Password).toEqual(DataVariables.validPassword);
    });
    
    test("Invalid password with only letters", () => {
        expect(() => {
            registrationForm.setPassword("qasdefdw");
        }).toThrow(DataErrorMessage.invalidPasswordError);  
    });

    test("Invalid password with only symbols", () => {
        expect(() => {
            registrationForm.setPassword("%%%%%%%%");
        }).toThrow(DataErrorMessage.invalidPasswordError);  
    });

    test("Set valid password with only numbers", () => {
        registrationForm.setPassword("12345678");
        expect(registrationForm.Password).toEqual("12345678");
    });

    test("Invalid password length with only letters", () => {
        expect(() => {
            registrationForm.setPassword("qasdefd");
        }).toThrow(DataErrorMessage.invalidPasswordError);  
    });

    test("Invalid password length with only numbers", () => {
        expect(() => {
            registrationForm.setPassword("1234567");
        }).toThrow(DataErrorMessage.invalidPasswordError); 
    });

    test("Set valid username", () => {
        registrationForm.setUsername(DataVariables.validUserName);
        expect(registrationForm.Username).toEqual(DataVariables.validUserName);
    });

    test("Set valid username with spaces and letter at the end", () => {
        registrationForm.setUsername("         m");
        expect(registrationForm.Username).toEqual("         m");
    });

    test("Set valid username (with toContain)", () => {
        registrationForm.setUsername(DataVariables.validUserName);
        expect(registrationForm.Username).toContain(DataVariables.validUserName);
    });

    test("Empty username", () => {
        expect(() => {
            registrationForm.setUsername("");
        }).toThrow(DataErrorMessage.invalidUsernameError);
    });

    test("Set valid age", () => {
        registrationForm.setAge(25);
        expect(registrationForm.Age).toEqual(25);
    });

    test("Invalid age", () => {
        expect(() => {
            registrationForm.setAge(-3);
        }).toThrow(DataErrorMessage.invalidAgeError);
    });

    test("Invalid age with NaN", () => {
        expect(() => {
            registrationForm.setAge(NaN);
        }).toThrow(DataErrorMessage.invalidAgeError);
    });

    test("Boundary values. Age with value 0", () => {
        expect(() => {
            registrationForm.setAge(0);
        }).toThrow(DataErrorMessage.invalidAgeError);
    });

    test("Boundary values. Age with value 150", () => {
        expect(() => {
            registrationForm.setAge(150);
        }).toThrow(DataErrorMessage.invalidAgeError);
    });

    test("Boundary values. Age with value 149", () => {
        registrationForm.setAge(149);
        expect(registrationForm.Age).toEqual(149);
    });

    test("Boundary values. Age with value 1", () => {
        registrationForm.setAge(1);
        expect(registrationForm.Age).toEqual(1);
    });

    test("Fractional number greater than 149 and less than 150", () => {
        registrationForm.setAge(149.9);
        expect(registrationForm.Age).toEqual(149.9);
    });

    test("Register with all valid data, agree with terms", () => {
        registrationForm.setEmail(DataVariables.alexEmail);
        registrationForm.setPassword(DataVariables.validPassword);
        registrationForm.setUsername(DataVariables.validUserName);
        registrationForm.setAge(25);
        registrationForm.agreeWithTerms();
        const result = registrationForm.register();
        expect(registrationForm.Registered).toEqual(true);
        expect(result).toContain("Регистрация прошла успешно");
    });

    test("Do not agree with terms", () => { 
        registrationForm.setEmail(DataVariables.alexEmail);
        registrationForm.setPassword(DataVariables.validPassword);
        registrationForm.setUsername(DataVariables.validUserName);
        registrationForm.setAge(25);
        const result = registrationForm.register();
        expect(registrationForm.Registered).toEqual(false);
        expect(result).toEqual("Ошибка при регистрации:\n- Необходимо согласиться с условиями");
    });

    test("Age field is missing", () => {
        registrationForm.setEmail(DataVariables.alexEmail);
        registrationForm.setPassword(DataVariables.validPassword);
        registrationForm.setUsername(DataVariables.validUserName);
        registrationForm.agreeWithTerms();
        const result = registrationForm.register();
        expect(registrationForm.Registered).toEqual(false);
        expect(result).toEqual("Ошибка при регистрации:\n- Некорректный возраст");
    });

    test("Username field is missing", () => {
        registrationForm.setEmail(DataVariables.alexEmail);
        registrationForm.setPassword(DataVariables.validPassword);
        registrationForm.setAge(25);
        registrationForm.agreeWithTerms();
        const result = registrationForm.register();
        expect(registrationForm.Registered).toEqual(false);
        expect(result).toContain("Ошибка при регистрации:\n- Имя пользователя не должно быть пустым");
    });

    test("Password field is missing", () => {
        registrationForm.setEmail(DataVariables.alexEmail);
        registrationForm.setUsername(DataVariables.validUserName);
        registrationForm.setAge(25);
        registrationForm.agreeWithTerms();
        const result = registrationForm.register();
        expect(registrationForm.Registered).toEqual(false);
        expect(result).toContain("Ошибка при регистрации:\n- Пароль должен содержать не менее 8 символов и хотя бы одну цифру");
    });

    test("Email field is missing", () => {
        registrationForm.setPassword(DataVariables.validPassword);
        registrationForm.setUsername(DataVariables.validUserName);
        registrationForm.setAge(25);
        registrationForm.agreeWithTerms();
        const result = registrationForm.register();
        expect(registrationForm.Registered).toEqual(false);
        expect(result).toContain("Ошибка при регистрации:\n- Некорректный email");
    });

    test("Email and Password are missing", () => {
        registrationForm.setUsername(DataVariables.validUserName);
        registrationForm.setAge(25);
        registrationForm.agreeWithTerms();
        const result = registrationForm.register();
        expect(registrationForm.Registered).toEqual(false);
        expect(result).toContain("Ошибка при регистрации:\n- Некорректный email\n- Пароль должен содержать не менее 8 символов и хотя бы одну цифру");
    });

    test("Username and Age are missing", () => {
        registrationForm.setEmail(DataVariables.alexEmail);
        registrationForm.setPassword(DataVariables.validPassword);
        registrationForm.agreeWithTerms();
        const result = registrationForm.register();
        expect(registrationForm.Registered).toEqual(false);
        expect(result).toContain("Ошибка при регистрации:\n- Имя пользователя не должно быть пустым\n- Некорректный возраст");
    });

    test("Only agree with terms", () => {
        registrationForm.agreeWithTerms();
        const result = registrationForm.register();
        expect(registrationForm.Registered).toEqual(false);
        expect(result).toContain("Ошибка при регистрации:\n- Некорректный email\n- Пароль должен содержать не менее 8 символов и хотя бы одну цифру\n- Имя пользователя не должно быть пустым\n- Некорректный возраст");
    });

});
