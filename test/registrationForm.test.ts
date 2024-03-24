import { DataErrorMessage } from "../data/data.errorMessage";
import { DataVariables } from "../data/data.variables";
import { RegistrationForm } from "../src/registrationForm"

describe("RegistrationForm Tests", () => {
    let registrationForm: RegistrationForm;

    beforeEach(() => {
        registrationForm = new RegistrationForm();
    });

    test("Set valid email", () => {
        registrationForm.setEmail(DataVariables.variableMail);
        expect(registrationForm.Email).toEqual(DataVariables.variableMail);
    });

    test("Invalid email format", () => {
        expect(() => {
            registrationForm.setEmail(DataVariables.variableMail2);
        }).toThrow(DataErrorMessage.errorText1); 
    });

    test("Invalid email format with dot", () => {
        expect(() => {
            registrationForm.setEmail(DataVariables.variableMail3);
        }).toThrow(DataErrorMessage.errorText1); 
    });
    
    test("Set valid password", () => {
        registrationForm.setPassword(DataVariables.variablePassword);
        expect(registrationForm.Password).toEqual(DataVariables.variablePassword);
    });
    
    test("Invalid password with only letters", () => {
        expect(() => {
            registrationForm.setPassword(DataVariables.variablePassword6);
        }).toThrow(DataErrorMessage.errorText2);  
    });

    test("Invalid password with only symbols", () => {
        expect(() => {
            registrationForm.setPassword(DataVariables.variablePassword5);
        }).toThrow(DataErrorMessage.errorText2);  
    });

    test("Set valid password with only numbers", () => {
        registrationForm.setPassword(DataVariables.variablePassword4);
        expect(registrationForm.Password).toEqual(DataVariables.variablePassword4);
    });

    test("Invalid password length with only letters", () => {
        expect(() => {
            registrationForm.setPassword(DataVariables.variablePassword3);
        }).toThrow(DataErrorMessage.errorText2);  
    });

    test("Invalid password length with only numbers", () => {
        expect(() => {
            registrationForm.setPassword(DataVariables.variablePassword2);
        }).toThrow(DataErrorMessage.errorText2); 
    });

    test("Set valid username", () => {
        registrationForm.setUsername(DataVariables.variableUserName);
        expect(registrationForm.Username).toEqual(DataVariables.variableUserName);
    });

    test("Set valid username with spaces and letter at the end", () => {
        registrationForm.setUsername(DataVariables.variableUserName2);
        expect(registrationForm.Username).toEqual(DataVariables.variableUserName2);
    });

    test("Set valid username (with toContain)", () => {
        registrationForm.setUsername(DataVariables.variableUserName);
        expect(registrationForm.Username).toContain(DataVariables.variableUserName);
    });

    test("Empty username", () => {
        expect(() => {
            registrationForm.setUsername(DataVariables.variableUserName3);
        }).toThrow(DataErrorMessage.errorText3);
    });

    test("Set valid age", () => {
        registrationForm.setAge(DataVariables.variableAge);
        expect(registrationForm.Age).toEqual(DataVariables.variableAge);
    });

    test("Invalid age", () => {
        expect(() => {
            registrationForm.setAge(DataVariables.variableAge2);
        }).toThrow(DataErrorMessage.errorText4);
    });

    test("Invalid age with NaN", () => {
        expect(() => {
            registrationForm.setAge(NaN);
        }).toThrow(DataErrorMessage.errorText4);
    });

    test("Boundary values. Age with value 0", () => {
        expect(() => {
            registrationForm.setAge(DataVariables.variableAge3);
        }).toThrow(DataErrorMessage.errorText4);
    });

    test("Boundary values. Age with value 150", () => {
        expect(() => {
            registrationForm.setAge(DataVariables.variableAge4);
        }).toThrow(DataErrorMessage.errorText4);
    });

    test("Boundary values. Age with value 149", () => {
        registrationForm.setAge(DataVariables.variableAge5);
        expect(registrationForm.Age).toEqual(DataVariables.variableAge5);
    });

    test("Boundary values. Age with value 1", () => {
        registrationForm.setAge(DataVariables.variableAge6);
        expect(registrationForm.Age).toEqual(DataVariables.variableAge6);
    });

    test("Fractional number greater than 149 and less than 150", () => {
        registrationForm.setAge(DataVariables.variableAge7);
        expect(registrationForm.Age).toEqual(DataVariables.variableAge7);
    });

    test("Register with all valid data, agree with terms", () => {
        registrationForm.setEmail(DataVariables.variableMail);
        registrationForm.setPassword(DataVariables.variablePassword);
        registrationForm.setUsername(DataVariables.variableUserName);
        registrationForm.setAge(DataVariables.variableAge);
        registrationForm.agreeWithTerms();
        const result = registrationForm.register();
        expect(registrationForm.Registered).toEqual(true);
        expect(result).toContain("Регистрация прошла успешно");
    });

    test("Do not agree with terms", () => { 
        registrationForm.setEmail(DataVariables.variableMail);
        registrationForm.setPassword(DataVariables.variablePassword);
        registrationForm.setUsername(DataVariables.variableUserName);
        registrationForm.setAge(DataVariables.variableAge);
        const result = registrationForm.register();
        expect(registrationForm.Registered).toEqual(false);
        expect(result).toEqual("Ошибка при регистрации:\n- Необходимо согласиться с условиями");
    });

    test("Age field is missing", () => {
        registrationForm.setEmail(DataVariables.variableMail);
        registrationForm.setPassword(DataVariables.variablePassword);
        registrationForm.setUsername(DataVariables.variableUserName);
        registrationForm.agreeWithTerms();
        const result = registrationForm.register();
        expect(registrationForm.Registered).toEqual(false);
        expect(result).toEqual("Ошибка при регистрации:\n- Некорректный возраст");
    });

    test("Username field is missing", () => {
        registrationForm.setEmail(DataVariables.variableMail);
        registrationForm.setPassword(DataVariables.variablePassword);
        registrationForm.setAge(DataVariables.variableAge);
        registrationForm.agreeWithTerms();
        const result = registrationForm.register();
        expect(registrationForm.Registered).toEqual(false);
        expect(result).toContain("Ошибка при регистрации:\n- Имя пользователя не должно быть пустым");
    });

    test("Password field is missing", () => {
        registrationForm.setEmail(DataVariables.variableMail);
        registrationForm.setUsername(DataVariables.variableUserName);
        registrationForm.setAge(DataVariables.variableAge);
        registrationForm.agreeWithTerms();
        const result = registrationForm.register();
        expect(registrationForm.Registered).toEqual(false);
        expect(result).toContain("Ошибка при регистрации:\n- Пароль должен содержать не менее 8 символов и хотя бы одну цифру");
    });

    test("Email field is missing", () => {
        registrationForm.setPassword(DataVariables.variablePassword);
        registrationForm.setUsername(DataVariables.variableUserName);
        registrationForm.setAge(DataVariables.variableAge);
        registrationForm.agreeWithTerms();
        const result = registrationForm.register();
        expect(registrationForm.Registered).toEqual(false);
        expect(result).toContain("Ошибка при регистрации:\n- Некорректный email");
    });

    test("Email and Password are missing", () => {
        registrationForm.setUsername(DataVariables.variableUserName);
        registrationForm.setAge(DataVariables.variableAge);
        registrationForm.agreeWithTerms();
        const result = registrationForm.register();
        expect(registrationForm.Registered).toEqual(false);
        expect(result).toContain("Ошибка при регистрации:\n- Некорректный email\n- Пароль должен содержать не менее 8 символов и хотя бы одну цифру");
    });

    test("Username and Age are missing", () => {
        registrationForm.setEmail(DataVariables.variableMail);
        registrationForm.setPassword(DataVariables.variablePassword);
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
